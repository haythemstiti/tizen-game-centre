var game = window.localStorage.getItem("game_name");
var userid = window.localStorage.getItem("id");
var block = true;
if (window.localStorage.getItem("created") != null) block = false; 

function connected()
{
	
	block = false;
	}

function recieved(data)
{
	if (data.trim().split("-")[0] == "SENT")
		{
		window.localStorage.setItem("game_id",data.trim().split("-")[1]);
		window.location.href = "index.html"	
}
}

$('#circle').click(function(){
	if (block) return;
	window.localStorage.setItem("choice","circle");
	window.localStorage.setItem("notchoice","x");
	createAndGo();
});
$('#x').click(function(){
	if (block) return;
	window.localStorage.setItem("choice","x");
	window.localStorage.setItem("notchoice","circle");
	createAndGo();
	
});

function createAndGo()
{

	if (block) return;
	if (window.localStorage.getItem("created") != null) fetch("game.php-POST-{\"name\" : \""+game+"\",\"desc\" : \"0\",\"id_host\" : \""+userid+"\"}");
	else window.location.href = "index.html";
	block = true;

}