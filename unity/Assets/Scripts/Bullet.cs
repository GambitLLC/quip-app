using Mirror;
using UnityEngine;

public class Bullet : NetworkBehaviour
{
    private Rigidbody rb;
    public float customGravity = -1.5f;
    
    [SyncVar]
    private bool didHit = false;
    
    private GameObject parentObject;

    public void Start()
    {
        rb = GetComponent<Rigidbody>();

        if (rb != null)
        {
            rb.useGravity = false;
        }
        
        parentObject = transform.parent.gameObject;
        var tank = parentObject.transform.Find("tank");
        var body = tank.Find("Body");
        var turret = tank.Find("Turret");
        
        var bodyCollider = body.GetComponent<Collider>();
        var turretCollider = turret.GetComponent<Collider>();
        var selfCollider = GetComponent<Collider>();
        
        //make sure the bullet is not colliding with the tank that shot it
        Physics.IgnoreCollision(bodyCollider, selfCollider);
        Physics.IgnoreCollision(turretCollider, selfCollider);
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
