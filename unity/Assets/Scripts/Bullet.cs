using Mirror;
using UnityEngine;

public class Bullet : NetworkBehaviour
{
    private Rigidbody rb;
    public float customGravity = -1.5f;
    
    [SyncVar]
    private bool didHit = false;
    
    [SyncVar]
    public int playerId = 0;

    [Server]
    public void IgnoreCollision(Collider other)
    {
        Physics.IgnoreCollision(other, GetComponent<Collider>());
    }
    
    public void Start()
    {
        rb = GetComponent<Rigidbody>();

        if (rb != null)
        {
            rb.useGravity = false;
        }
        
        Debug.Log($"Bullet: PlayerId: {playerId}");

        //disable bullet collision with the tank that shot it (client-sided)
        if (isClient)
        {
            var collider = GetComponent<Collider>();
            
            //find all the game objects with the tag "Tank"
            var tanks = GameObject.FindGameObjectsWithTag("Tank");
            foreach (var tank in tanks)
            {
                var isPlayer2 = tank.GetComponent<TankMovement>().isPlayer2;
                var body = tank.transform.Find("Body");
                var turret = tank.transform.Find("Turret");

                if (playerId == 1 && !isPlayer2)
                {
                    Physics.IgnoreCollision(body.GetComponent<Collider>(), collider);
                    Physics.IgnoreCollision(turret.GetComponent<Collider>(), collider);
                }
                
                if (playerId == 2 && isPlayer2)
                {
                    Physics.IgnoreCollision(body.GetComponent<Collider>(), collider);
                    Physics.IgnoreCollision(turret.GetComponent<Collider>(), collider);
                }
            }
        }
    }

    private void FixedUpdate()
    {
        var gravity = customGravity * Vector3.up;
        rb.AddForce(gravity, ForceMode.Acceleration);
        
        //out of bounds check
        if (transform.position.y < -10)
        {
            Destroy(gameObject);
        }
    }

    [ServerCallback]
    private void OnCollisionEnter(Collision other)
    {
        if (other.gameObject.CompareTag("Floor"))
        {
            didHit = true;
            
            // Destroy the bullet
            Destroy(gameObject);
        }

        if (!didHit && other.gameObject.CompareTag("Tank"))
        {
            didHit = true;
            
            //emit the tank hit event
            EventManager.TankHit(other.gameObject);
        }
    }
}
