#pragma strict

function Start () {

}

function Update () {

}

/*
* Polecenia menu
*/
function ExitGame(){
	#if UNITY_EDITOR
    	UnityEditor.EditorApplication.isPlaying = false;
    #elif UNITY_WEBPLAYER
    	Application.OpenURL(webplayerQuitURL);
    #else
    	Application.Quit();
    #endif
}

function ResetLevel(){
	Application.LoadLevelAsync(Application.loadedLevelName);
}
/**/