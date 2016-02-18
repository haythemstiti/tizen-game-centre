var gameid = window.localStorage.getItem("game_id");
var joined = window.sessionStorage.getItem("joined");
var fetching_thread;
var userid = window.localStorage.getItem("id");
var date = 0;
var over = false;
var move = 99;
var state = 0;



function connected()
{
	if (joined)
	{
		fetching_thread = setInterval(waitForOppShips, 1500);
	}
	else  if (!joined || (joined == null))
	{
		
	}
}
function sendMove()
{
	tmp = "{ \"bigShip\" : {\"p1\" : ["+mine.bigShip.p1[0]+","+mine.bigShip.p1[1]+"],\"p2\" : ["+mine.bigShip.p2[0]+","+mine.bigShip.p2[1]+"], \"p3\" : ["+mine.bigShip.p3[0]+","+mine.bigShip.p3[1]+"]}, \"smallShip\" :  {\"p1\" : ["+mine.smallShip.p1[0]+","+mine.smallShip.p1[1]+"],\"p2\" : ["+mine.smallShip.p2[0]+","+mine.smallShip.p2[1]+"]}}";
	fetch("action.php-POST_BATTLE-{\"id_user\" : \""+userid+"\",\"id_game\" : \""+gameid+"\",\"value\" : {\"myships\" : "+tmp+", \"moves\" : \""+move+"\" } }");
}
function waitForOppShips()
{
	//CHANGE TO DYNAMIC VALUE
	fetch("action.php-GET-game_id="+gameid+"&last_date="+date);
}
function recieved(data)
{
	if (data.trim().split("-")[0] == "SENT")
	{
		date = parseInt(JSON.parse(data.trim().split("-")[1]).date);
		block = true;
		clearInterval(fetching_thread);
		fetching_thread = setInterval(waitForOppShips, 1500);
		if (over) fetch("game.php-DELETE-"+gameid);
		return;
	}
	if (data.trim() == "DELETED")
	{
		tizen.power.release("SCREEN");
		switch(state)
		{
		case 1:
			window.location.href="../you_draw/index.html";
			break;
		case 2:
			window.location.href="../you_win/index.html";
			break;
		case 3:
			window.location.href="../you_lose/index.html";
			break;
		}
	}
	if (JSON.parse(data.trim()).status == "ok")
	{
		clearInterval(fetching_thread);
		var tmp = JSON.parse(data.trim());
		tmp.actions.forEach(function (element, index, array){
			//CHANGE TO DYNAMIC VALUE
			if (element.user != userid)
				{
					enemy = element.value.myships;
					overlay.hide();
					clearInterval(fetching_thread);
					i = Math.floor(parseInt(element.value.moves)/10);
					j = Math.floor(parseInt(element.value.moves)%10);
					$("#mine tr:nth-child("+i+") td:nth-child("+j+")").addClass('chosen');
					
					
					
					if (mine.bigShip.p1[0] == i && mine.bigShip.p1[1] == j) 
						$("#mine tr:nth-child("+i+") td:nth-child("+j+")").addClass("hit");
					if (mine.bigShip.p2[0] == i && mine.bigShip.p2[1] == j) 
						$("#mine tr:nth-child("+i+") td:nth-child("+j+")").addClass("hit");
					if (mine.bigShip.p3[0] == i && mine.bigShip.p3[1] == j) 
						$("#mine tr:nth-child("+i+") td:nth-child("+j+")").addClass("hit");
					if (mine.smallShip.p1[0] == i && mine.smallShip.p1[1] == j) 
						$("#mine tr:nth-child("+i+") td:nth-child("+j+")").addClass("hit");
					if (mine.smallShip.p2[0] == i && mine.smallShip.p2[1] == j) 
						$("#mine tr:nth-child("+i+") td:nth-child("+j+")").addClass("hit");
					block = false;
					//verify_winning();
					$("#mine tr td").unbind();
					var mycount = 0;
					$("#mine .hit").each(function (element){
						mycount ++;
					});
					if (mycount == 5) 
						{
							block = true;
							if (over) fetch("game.php-DELETE-"+gameid);
							state=3;
							over = true;
						}
					if (!block) bindEmAllMine();
					return;
				}
		});
	}
}