

$("#death").click(function(){

	window.localStorage.setItem("valeur",'Death Match');
	window.location.href = "../game_selector/index.html";
	
});
$("#tournament").click(function(){
	window.localStorage.setItem("valeur",'Tournament');
	window.location.href = "../tournament_host/index.html";
	
});

$("#singleBTN").click(function(){
	window.location.href = "../single_mod/index.html";
	
});