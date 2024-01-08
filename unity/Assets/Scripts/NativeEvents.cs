using System;
using UnityEngine;

namespace NativeEvents
{
    [Serializable]
    public struct GameStartMessage
    {
        public string type;
        public string player;
        public string enemy;
        
        public GameStartMessage(string player, string enemy)
        {
            this.type = "gameStart";
            this.player = player;
            this.enemy = enemy;
        }
    }

    [Serializable]
    public struct GameEndMessage
    {
        public string type;
        public string winner;
        
        public GameEndMessage(string winner)
        {
            this.type = "gameEnd";
            this.winner = winner;
        }
    }
}