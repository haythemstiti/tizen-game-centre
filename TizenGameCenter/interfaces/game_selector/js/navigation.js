

$("#tic").click(function(){
	game = window.localStorage.setItem("game_name","tic_tac_toe");
	window.location.href ="../game_host/index.html";
});

$("#battle").click(function(){
	game = window.localStorage.setItem("game_name","battle");
	window.location.href ="../game_host/index.html";
});

$("#quiz").click(function(){
	game = window.localStorage.setItem("game_name","quiz-it");
	window.location.href ="../game_host/index.html";
});

$("#vt").click(function(){
	game = window.localStorage.setItem("game_name","vache_tauraux");
	window.location.href ="../game_host/index.html";
});



