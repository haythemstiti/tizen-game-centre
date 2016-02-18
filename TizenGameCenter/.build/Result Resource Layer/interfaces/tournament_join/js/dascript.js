var id = 0;
var choicepage= true;
var userid = window.localStorage.getItem("id");
function connected() {
	fetch("tournament.php-GET-all");
}
function recieved(data)
{
	if (data.trim() == "SENT")
		{
			window.location.href = "../tournament/index.html";
		}
	var tournaments = "";
	obj = JSON.parse(data);
	obj.tournaments.forEach(function (element, index, array){
		if (element != undefined)
		{
		tournaments += "<li  class=\"li-has-multiline\" id=\""+element.tid+"\" class=\"game\"><a onclick=\"gotogame("+element.tid+",'"+element.tname+"')\">";
		var gameimg = "";
		var truegamename= "";
		tournaments += element.tname;
		tournaments += "<span class=\"li-text-sub\">By "+element.host_info.pseudo+"</span>";
		tournaments += "<span class=\"li-text-sub\">Current players "+element.guests.length+"</span></a></li>";}
	});
	$("#gameslist").html(tournaments);
	
}
function gotogame(id,name)
{
	window.localStorage.setItem("tournament_id",id);
	window.location.href = "../join_tournament/index.html";
	}
$(document).ready(function (){
var interval = setInterval(function(){
	fetch("tournament.php-GET-all");
}, 6000);

	


});
