var block = true;
var game = window.localStorage.getItem("game_name");
var userid = window.localStorage.getItem("id");
function connected()
	{
		block = false;
		}
function recieved(data)
{
	
}

$("#join").bind('click', function(e) {
	if (block) return;
	
	window.location.href= "../games_list/index.html";
});
$("#create").bind('click', function(e) {
	
	window.localStorage.setItem("created","true");
	if (game=="tic_tac_toe")
	{window.location.href = "../"+game+"/choice.html";}
	else if (game=="battle")
		window.location.href = "../"+game+"/choose.html";
	else
		{window.location.href = "../"+game+"/index.html";}
		});

