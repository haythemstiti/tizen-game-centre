var turn = 1;
var gameid = window.localStorage.getItem("game_id");
var joined = window.sessionStorage.getItem("joined");
var block = true;
var fetching_thread;
var userid = window.localStorage.getItem("id");
var date = 0;
var clicked = new Array();
var overlay;
var over = false;
var state = 0;


tizen.power.request("SCREEN", "SCREEN_NORMAL");

function verify_winning(){ 
//	alert('verif');
	if(clicked.length == 9)
		{
		state = 1;
		block = true;
		over = true;
		fetch("game.php-DELETE-"+gameid);
		}
	if((($('#1').attr('class')==window.localStorage.getItem("choice")) && 
			( $('#2').attr('class')== window.localStorage.getItem("choice")) && 
			($('#3').attr('class')== window.localStorage.getItem("choice")))
		|| (($('#1').attr('class')== window.localStorage.getItem("choice"))
				&& ( $('#4').attr('class')== window.localStorage.getItem("choice"))
				&& ($('#7').attr('class')== window.localStorage.getItem("choice")))
				|| (($('#4').attr('class')== window.localStorage.getItem("choice"))
						&& ( $('#5').attr('class')== window.localStorage.getItem("choice"))
						&& ($('#6').attr('class')== window.localStorage.getItem("choice")))
						|| (($('#8').attr('class')== window.localStorage.getItem("choice"))
								&& ( $('#9').attr('class')== window.localStorage.getItem("choice"))
								&& ($('#7').attr('class')== window.localStorage.getItem("choice")))
								|| (($('#2').attr('class')== window.localStorage.getItem("choice"))
										&& ( $('#5').attr('class')== window.localStorage.getItem("choice"))
										&& ($('#8').attr('class')== window.localStorage.getItem("choice")))
										|| (($('#3').attr('class')== window.localStorage.getItem("choice"))
												&& ( $('#6').attr('class')== window.localStorage.getItem("choice"))
												&& ($('#9').attr('class')== window.localStorage.getItem("choice")))
												|| (($('#1').attr('class')== window.localStorage.getItem("choice"))
														&& ( $('#5').attr('class')== window.localStorage.getItem("choice"))
														&& ($('#9').attr('class')== window.localStorage.getItem("choice")))
														|| (($('#3').attr('class')== window.localStorage.getItem("choice"))
																&& ( $('#5').attr('class')== window.localStorage.getItem("choice"))
																&& ($('#7').attr('class')== window.localStorage.getItem("choice")))){
		fetch("game.php-DELETE-"+gameid);
		state=2;
		over = true;
		block=true;
	}
	if((($('#1').attr('class')==window.localStorage.getItem("notchoice")) && 
			( $('#2').attr('class')== window.localStorage.getItem("notchoice")) && 
			($('#3').attr('class')== window.localStorage.getItem("notchoice")))
		|| (($('#1').attr('class')== window.localStorage.getItem("notchoice"))
				&& ( $('#4').attr('class')== window.localStorage.getItem("notchoice"))
				&& ($('#7').attr('class')== window.localStorage.getItem("notchoice")))
				|| (($('#4').attr('class')== window.localStorage.getItem("notchoice"))
						&& ( $('#5').attr('class')== window.localStorage.getItem("notchoice"))
						&& ($('#6').attr('class')== window.localStorage.getItem("notchoice")))
						|| (($('#8').attr('class')== window.localStorage.getItem("notchoice"))
								&& ( $('#9').attr('class')== window.localStorage.getItem("notchoice"))
								&& ($('#7').attr('class')== window.localStorage.getItem("notchoice")))
								|| (($('#2').attr('class')== window.localStorage.getItem("notchoice"))
										&& ( $('#5').attr('class')== window.localStorage.getItem("notchoice"))
										&& ($('#8').attr('class')== window.localStorage.getItem("notchoice")))
										|| (($('#3').attr('class')== window.localStorage.getItem("notchoice"))
												&& ( $('#6').attr('class')== window.localStorage.getItem("notchoice"))
												&& ($('#9').attr('class')== window.localStorage.getItem("notchoice")))
												|| (($('#1').attr('class')== window.localStorage.getItem("notchoice"))
														&& ( $('#5').attr('class')== window.localStorage.getItem("notchoice"))
														&& ($('#9').attr('class')== window.localStorage.getItem("notchoice")))
														|| (($('#3').attr('class')== window.localStorage.getItem("notchoice"))
																&& ( $('#5').attr('class')== window.localStorage.getItem("notchoice"))
																&& ($('#7').attr('class')== window.localStorage.getItem("notchoice")))){
		
		fetch("game.php-DELETE-"+gameid);
		state=3;
		over = true;
		block = true;
	}
}
function connected()
{
	if (joined)
	{
		block = true;
		var opts = {
				lines: 13, // The number of lines to draw
				length: 11, // The length of each line
				width: 5, // The line thickness
				radius: 17, // The radius of the inner circle
				corners: 1, // Corner roundness (0..1)
				rotate: 0, // The rotation offset
				color: '#FFF', // #rgb or #rrggbb
				speed: 1, // Rounds per second
				trail: 60, // Afterglow percentage
				shadow: false, // Whether to render a shadow
				hwaccel: false, // Whether to use hardware acceleration
				className: 'spinner', // The CSS class to assign to the spinner
				zIndex: 2e9, // The z-index (defaults to 2000000000)
				top: 'auto', // Top position relative to parent in px
				left: 'auto' // Left position relative to parent in px
			};
			var target = document.createElement("div");
			document.body.appendChild(target);
			var spinner = new Spinner(opts).spin(target);
			overlay = iosOverlay({
				text: "Waiting for opponent..",
				spinner: spinner
			});
		fetching_thread = setInterval(waitForOpp, 1500);
	}
else if (!joined || (joined == null))
	{
		block = false;
	}
	
	}
function recieved(data)
{
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
	if (data.trim().split("-")[0] == "SENT")
		{
			date = parseInt(JSON.parse(data.trim().split("-")[1]).date);
			block = true;
			fetching_thread = setInterval(waitForOpp, 1500);
			return;
		}
	if (JSON.parse(data.trim()).status == "ok")
	{
		clearInterval(fetching_thread);
		var tmp = JSON.parse(data.trim());
		tmp.actions.forEach(function (element, index, array){
			//CHANGE TO DYNAMIC VALUE
			if (element.user != userid)
				{
				overlay.hide();
					clearInterval(fetching_thread);
					//clicked.push(element.value.id);
					$("#"+element.value.id).html('<img src ="images/'+window.localStorage.getItem("notchoice")+'.png">');
					$("#"+element.value.id).attr("class",window.localStorage.getItem("notchoice"));
					block = false;
					verify_winning();
					return;
				}
		});
		return;
	}
}

function waitForOpp()
{
	//CHANGE TO DYNAMIC VALUE
	fetch("action.php-GET-game_id="+gameid+"&last_date="+date);
}

$('td').click(function(){
	
	if (!block && clicked.indexOf($(this).attr('id')) == -1)
		{
		block = true;
		if (!over)
			{
		var opts = {
				lines: 13, // The number of lines to draw
				length: 11, // The length of each line
				width: 5, // The line thickness
				radius: 17, // The radius of the inner circle
				corners: 1, // Corner roundness (0..1)
				rotate: 0, // The rotation offset
				color: '#FFF', // #rgb or #rrggbb
				speed: 1, // Rounds per second
				trail: 60, // Afterglow percentage
				shadow: false, // Whether to render a shadow
				hwaccel: false, // Whether to use hardware acceleration
				className: 'spinner', // The CSS class to assign to the spinner
				zIndex: 2e9, // The z-index (defaults to 2000000000)
				top: 'auto', // Top position relative to parent in px
				left: 'auto' // Left position relative to parent in px
			};
			var target = document.createElement("div");
			document.body.appendChild(target);
			var spinner = new Spinner(opts).spin(target);
			overlay = iosOverlay({
				text: "Waiting for opponent..",
				spinner: spinner
			});
			}
		clicked.push($(this).attr('id'));
	//CHANGE TO DYNAMIC VALUE
	fetch("action.php-POST-{\"id_user\" : \""+userid+"\",\"id_game\" : \""+gameid+"\",\"value\" : \""+$(this).attr('id')+"\"}");  
	if ($(this).attr('class') == ""){
	//	alert(window.localStorage.getItem("choice"));
		$(this).html('<img src ="images/'+window.localStorage.getItem("choice")+'.png">');
		$(this).attr("class",window.localStorage.getItem("choice"));
	//	alert($(this).attr("class"));
		verify_winning();
		
		
	}
		}
});