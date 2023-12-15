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
        Debug.Log($"id: {id}, playerId: {playerId}");
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
        Debug.Log($"playerId: {playerId}");
        ShowScreen(playerId == winnerId);
    }

    [Client]
    void ShowScreen(bool isWinner)
    {
        var canvas = GameObject.Find("Canvas");
        if (canvas == null) return;
        
        var screen = Instantiate(isWinner ? victoryPrefab : defeatPrefab, canvas.transform);
        screen.transform.SetAsLastSibling();
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
