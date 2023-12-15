using UnityEngine;

public class EventManager: MonoBehaviour
{
    public static event TankHitAction OnTankHit;
    public static event EndGameAction OnEndGame;
    
    public delegate void TankHitAction(GameObject tank);
    public delegate void EndGameAction(int winner);
    
    public static void TankHit(GameObject tank)
    {
        OnTankHit?.Invoke(tank);
    }
    
    public static void EndGame(int winner)
    {
        OnEndGame?.Invoke(winner);
    }
}
