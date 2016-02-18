var num=0;
var i=1;
var userid = window.localStorage.getItem("id");
var gameid = window.localStorage.getItem("game_id");
var joined = window.sessionStorage.getItem("joined");
var block = true;
var fetching_thread;

tizen.power.request("SCREEN", "SCREEN_NORMAL");

function getNumber()
{
	fetch("action2.php-GET-game_id="+gameid+"&number=1");
	}
function waitForOpp()
{
	//CHANGE TO DYNAMIC VALUE
	fetch("action2.php-GET-game_id="+gameid+"&last_date="+date);
}

function recieved(data)
{

	if (data.trim().split("-")[0] == "SENT")
	{
		block = false;
		clearInterval(fetching_thread);
		window.sessionStorage.setItem("lastTime",JSON.parse(data.trim().split("-")[1]).date);
		window.location.href='./game.html';
	}

	
	
	
}

$('td').click(function(){
	if($(this).attr('class')=="notclicked"){
		
	if(i<=1000){
	num += $(this).attr('id') * i;
	$('#number').html(num);
	i*=10;
	$(this).attr("class","clicked");
	}
}
});

$('#go').click(function(){
	if (num/1000 < 1) return;
	if (block) return;
	//window.localStorage.setItem('number',num);
	//window.location.href='./game.html';
	block = true;
	window.localStorage.setItem('mynumber',num);
	if (joined)
	window.location.href='./game.html';
	else 
		fetch("action_vt.php-POST-{\"id_user\" : \""+userid+"\",\"id_game\" : \""+gameid+"\",\"hisnumber\" : \""+num+"\"}");  
	
});

$('#tapToStart').click(function(){
	
	$("#tapToStart").hide();
	$(".contents").show();
});


function connected()
{
	if (!joined || (joined == null))
	{
			block = false;
		}
	if (joined)

		{
		
			fetch("action2.php-GET-game_id="+gameid+"&number=1");
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
			fetching_thread = setInterval(getNumber, 5000);
		}

	}
	