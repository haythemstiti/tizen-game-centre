var id = 0;
var choicepage= true;
var userid = window.localStorage.getItem("id");
var tournament = window.localStorage.getItem("tournament_id");
function connected() {
	fetch("tournament.php-GET-"+tournament);
}
function recieved(data)
{
	if (data.trim() == "SENT")
		{
			window.location.href = "../tournament/index.html";
		}
	var tournaments = "<table style=\"width:100%; text-align: center;\"><tr><th>Name</th><th>Games</th><th>Score</th></tr>";
	obj = JSON.parse(data);
	obj.tournament_info.guests.forEach(function (element, index, array){
		if (element != undefined)
		{
		tournaments += "<tr>";
		tournaments += "<td>"+element.pseudo+"</td>";
		tournaments += "<td>"+element.score+"</td>";
		tournaments += "<td>"+element.score+"</td>";
		tournaments += "</tr>";}
	});
	tournament+="</table>"
	$("#content").html(tournaments);
	$("#info").html("<h4>By "+obj.tournament_info.host_info.pseudo+"</h4>");
	$("#titleyo").html(obj.tournament_info.tname);
	
}


$(document).ready(function (){
	var interval = setInterval(function(){
		fetch("tournament.php-GET-all");
	}, 6000);

		


	});