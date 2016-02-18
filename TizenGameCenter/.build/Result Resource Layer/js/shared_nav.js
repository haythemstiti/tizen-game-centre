function gotoMM()
{
	window.sessionStorage.setItem("joined",null);
	window.localStorage.removeItem("game_id");
	window.localStorage.removeItem("game_name");
	window.location.href="../game_type/index.html";
	
	}