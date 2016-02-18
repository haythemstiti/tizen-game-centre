var game = window.localStorage.getItem("game_name");
var id = 0;
var choicepage= true;
var userid = window.localStorage.getItem("id");
function connected() {
	fetch("game.phpall-GET-gamename="+game);
}
function recieved(data)
{
	if (data.trim() == "SENT")
		{
		if (game=="tic_tac_toe")
			window.location.href = "../"+game+"/choice.html";
		else if (game=="battle")
			window.location.href = "../"+game+"/choose.html";
		else
			window.location.href = "../"+game+"/index.html";
		}
	var games = "";
	obj = JSON.parse(data);
	obj.games.forEach(function (element, index, array){
		if (element != undefined)
		{
		games += "<li  class=\"li-has-multiline\" id=\""+element.game_info.gid+"\" class=\"game\"><a onclick=\"gotogame("+element.game_info.gid+",'"+element.game_info.gname+"')\">";
		var gameimg = "";
		var truegamename= "";
		if (element.game_info.gname == "tic_tac_toe")
			{
				truegamename = "Tic Tac Toe";
				gameimg = "tictactoe.png";
			}
		if (element.game_info.gname == "battle")
		{
			truegamename = "Battleship";
			gameimg = "battleship.png";
		}
		games += "<img src=\"../game_selector/images/"+gameimg+"\" class=\"sidepic\">"+truegamename;
		games += "<span class=\"li-text-sub\">By "+element.host_info.pseudo+"</span></a></li>";}
	});
	$("#gameslist").html(games);
	
}
function gotogame(id,name)
{
	window.sessionStorage.setItem("joined",true);
	window.localStorage.setItem("game_id",id);
	fetch("game.php-PUT-"+id+"-"+userid);
	}
$(document).ready(function (){
var interval = setInterval(function(){
	fetch("game.phpall-GET-gamename="+game);
}, 6000);

	


});
