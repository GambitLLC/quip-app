using Mirror;
using TMPro;
using UnityEngine;

[RequireComponent(typeof(Rigidbody))]
public class TankMovement : NetworkBehaviour
{
    private Camera camera;
    
    private Joystick joyStickMove;
    private Joystick joyStickShoot;
    
    private GameObject parentObject;
    
    private Transform turret;
    private Transform body;
    
    private Rigidbody rb;

    private Vector3 cameraOffset = new Vector3(0, 4, -5);
    private Vector3 cameraEulerOffset = new Vector3(30, 0, 0);

    public int maxSpeed = 10;
    public int acceleration = 30;
    
    public GameObject bulletPrefab;
    private Vector3 bulletOffset = new Vector3(0.0f, 0.07f, 0.875f);
    public float bulletSpeed = 20f;
    
    //joystick flag
    private bool isPressed = false;
    
    //bullet shooting interval
    private float serverTimer = 0f;
    public float interval = 1f; // Set the interval in seconds
    
    //health
    [SyncVar]
    public int health = 100;
    public TextMeshPro healthText;
    private Vector3 textOffset;
    
    private bool isValid = true;

    [SyncVar] 
    public bool isPlayer2 = false;

    // Start is called before the first frame update
    void Start()
    {
        parentObject = transform.parent.gameObject;
        
        if (isLocalPlayer)
        {
            if (isPlayer2)
            {
                //update the camera offset
                cameraOffset = new Vector3(0, 4, 5);
                cameraEulerOffset = new Vector3(30, 180, 0);
            }
            
            camera = Camera.main;
            joyStickMove = GameObject.Find("Canvas/MovementJoystick").GetComponent<FixedJoystick>();
            joyStickShoot = GameObject.Find("Canvas/ShootingJoystick").GetComponent<FixedJoystick>();
            
            camera.transform.position = transform.position + cameraOffset;
            camera.transform.eulerAngles = cameraEulerOffset;
        }

        //register the tank hit event listener
        if (isServer) EventManager.OnTankHit += HandleTankHit;

        if (camera == null)
        {
            Debug.LogError("TankMovement: Turret or Body not found!");
            isValid = false;
        }
        
        textOffset = healthText.transform.position - transform.position;
        
        rb = GetComponentInChildren<Rigidbody>();
        
        //find the child named "Turret" under the tank
        turret = transform.Find("Turret");
        //find the child named "Body" under the tank
        body = transform.Find("Body");
    }

    private void OnDestroy()
    {
        if (isServer) EventManager.OnTankHit -= HandleTankHit;
    }

    [Server]
    private void HandleTankHit(GameObject tank)
    {
        if (tank != gameObject) return;
        
        health -= 25;
        UpdateHealthText(health);

        if (health <= 0)
        {
            //get the gameObjects parent
            var parent = gameObject.transform.parent;
            
            //destroy the tank (parent)
            NetworkServer.Destroy(parent.gameObject);
            EventManager.EndGame(isPlayer2 ? 1 : 2);
        }
    }

    [ClientRpc]
    private void UpdateHealthText(int newHealth)
    {
        healthText.text = $"{newHealth}/100";
    }

    [Command]
    private void CmdShootBullet()
    {
        if (serverTimer < interval) return;
        if (bulletPrefab == null) return;
        
        //spawn the bullet as a child of the parentObject
        var rotatedTransform = turret.rotation * bulletOffset;
        var bullet = Instantiate(bulletPrefab, turret.position + rotatedTransform, turret.rotation, parentObject.transform);
        bullet.transform.SetAsLastSibling();

        NetworkServer.Spawn(bullet);
        bullet.GetComponent<Rigidbody>().velocity = bullet.transform.forward * bulletSpeed;

        serverTimer = 0f;
    }

    private void Update()
    {
        serverTimer += Time.deltaTime;
        
        //update the text position to follow the tank
        healthText.transform.position = transform.position + textOffset;

        if (!isLocalPlayer)
        {
            healthText.transform.localEulerAngles = new Vector3(0, 180, 0);
        }

        if (!isPressed) return;

        //call the shoot bullet RPC
        CmdShootBullet();
    }

    private void FixedUpdate()
    {
        if (!isLocalPlayer) return;
        if (!isValid) return;

        // -- Tank Movement --
        float horizontal = joyStickMove.Horizontal;
        float vertical = joyStickMove.Vertical;
        Vector3 movement = new Vector3(horizontal, 0.0f, vertical);
        
        //if player2 rotate the joystick input 180 degrees
        if (isPlayer2) movement = Quaternion.Euler(0, 180, 0) * movement;

        if (movement.magnitude > 0.1)
        {
            rb.AddForce(body.forward * acceleration);
            body.rotation = Quaternion.Lerp(body.rotation, Quaternion.LookRotation(movement), 0.08f);
        }
        
        //set a maximum speed
        rb.velocity = Vector3.ClampMagnitude(rb.velocity, maxSpeed);
        
        // -- Turret Rotation --
        //use joystickShoot to rotate the tank
        float horizontalShoot = joyStickShoot.Horizontal;
        float verticalShoot = joyStickShoot.Vertical;
        Vector3 shoot = new Vector3(horizontalShoot, 0.0f, verticalShoot);
        
        //if player2 rotate the joystick input 180 degrees
        if (isPlayer2) shoot = Quaternion.Euler(0, 180, 0) * shoot;

        if (shoot.magnitude > 0.1)
        {
            isPressed = true;
            turret.rotation = Quaternion.Lerp(turret.rotation, Quaternion.LookRotation(shoot), 0.08f);
        } else
        {
            isPressed = false;
        }

        // -- Camera --
        //make the camera follow the player
        camera.transform.position = Vector3.Slerp(camera.transform.position, transform.position + cameraOffset, 0.2f);
    }
}
