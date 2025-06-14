using Mirror;
using UnityEngine;
using NativeEvents;

public class GameManager : NetworkBehaviour
{
    public GameObject victoryPrefab;
    public GameObject defeatPrefab;

    private int playerId = 0;
    
    [SyncVar]
    private int winnerId = 0;

    [ClientRpc]
    public void RpcSetPlayerId(int id)
    {
        if (playerId != 0) return;
        playerId = id;
        
        //send message to react native that the player id has been set
        NativeCall.sendObject(
            new GameStartMessage(id.ToString(), (id == 1 ? "2" : "1"))
        );
    }

    [Server]
    void HandleGameEnd(int winnerId)
    {
        this.winnerId = winnerId;
        RpcHandleGameEnd(winnerId);
        
        //reset the game after 5 seconds
        Invoke("Reset", 5f);
    }

    [ClientRpc]
    void RpcHandleGameEnd(int winnerId)
    {
        ShowScreen(playerId == winnerId);
    }

    [Client]
    void ShowScreen(bool isWinner)
    {
        var canvas = GameObject.Find("Canvas");
        if (canvas == null) return;
        
        var screen = Instantiate(isWinner ? victoryPrefab : defeatPrefab, canvas.transform);
        screen.transform.SetAsLastSibling();
        
        //after 5 seconds, send message to react native to go to post game screen
        Invoke(nameof(GoToPostGameScreen), 5f);
    }

    [Client]
    void GoToPostGameScreen()
    {
        NativeCall.sendObject(new GameEndMessage(winnerId.ToString()));
    }

    [Server]
    private void Reset()
    {
        //stop the server
        TankNetworkManager.singleton.StopServer();
        
        //start the server
        TankNetworkManager.singleton.StartServer();
    }

    // Start is called before the first frame update
    void Start()
    {
        if (isServer) EventManager.OnEndGame += HandleGameEnd;
    }

    private void OnDestroy()
    {
        if (isServer) EventManager.OnEndGame -= HandleGameEnd;
    }

    // Update is called once per frame
    void Update()
    {
        
    }
}
