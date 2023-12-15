using System;
using System.Collections;
using System.Collections.Generic;
using System.Runtime.InteropServices;
using UnityEngine.UI;
using UnityEngine;

public class NativeAPI {
#if UNITY_IOS && !UNITY_EDITOR
  [DllImport("__Internal")]
  public static extern void sendMessageToMobileApp(string message);
#endif
}

public class NativeCall
{
    //platform agnostic send message (only works on ios for now)
    public static void sendMessage(string message)
    {
        switch (Application.platform)
        {
            case RuntimePlatform.Android:
                throw new NotImplementedException("Android support not yet implemented!");
            
            case RuntimePlatform.IPhonePlayer:
                #if UNITY_IOS && !UNITY_EDITOR
                     NativeAPI.sendMessageToMobileApp(message);        
                #endif
            
            default:
                throw new NotImplementedException($"${Application.platform} not supported!");
        }
    }
}
