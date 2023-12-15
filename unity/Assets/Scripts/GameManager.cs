using System;
using System.Collections;
using System.Collections.Generic;
using Mirror;
using UnityEngine;

public class GameManager : NetworkBehaviour
{
    public GameObject victoryPrefab;
    public GameObject defeatPrefab;

    private int playerId = 0;
    
    [ClientRpc]
    public void RpcSetPlayerId(int id)
    {
        if (playerId != 0) return;
        playerId = id;
    }

    [Server]
    void HandleGameEnd(int winnerId)
    {
        RpcHandleGameEnd(winnerId);
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
        NativeCall.sendMessage("postGame");
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
