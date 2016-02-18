var num=0;
var i=1;
var j=1000;
var k=0;
var ntauraux= 0;
var nvaches=0;
var nvaches=0;
var historyNumbers = new Array();
var historyResults = new Array();
var historyNumbersAD = new Array();
var historyResultsAD = new Array();
var joined = window.sessionStorage.getItem("joined");
var userid = window.localStorage.getItem("id");
var gameid = window.localStorage.getItem("game_id");
var date = parseInt(window.sessionStorage.getItem("lastTime"))+1;
var block = true;
var overlay;
//var number = localStorage.getItem('number');
var number;
$('td').click(function(){
	if (block) return;
	if($(this).attr('class')=="notclicked"){
		
	if(i<=1000){
	num += $(this).attr('id') * i;
	$('#number').html(num);
	i*=10;
	$(this).attr("class","clicked");
	}
}
});


function recieved(data)
{
	alert(data);
	if (data)
	{
		if (JSON.parse(data).status == "ko") return;
		overlay.hide();
		block = false;
		clearInterval(fetching_thread);
		window.sessionStorage.setItem("lastTime",JSON.parse(data).actions[0].date);
		if (parseInt(JSON.parse(data).actions[0].value.hisnumber) == null || !parseInt(JSON.parse(data).actions[0].value.hisnumber))
			{
			number = parseInt(JSON.parse(data).actions[0].value.hisnumber);
				return; 
			}
		num = parseInt(JSON.parse(data).actions[0].value.number);
		ntauraux = 0;
		nvaches = 0;
		while(k<4){

			if(Math.floor(number/j)%10==(Math.floor(num/j)%10) ){
				ntauraux++;
			}
			else if(Math.floor(number/j)%10 == (Math.floor(num/(j/10))%10)){
				nvaches++;
			}
			else if(Math.floor(number/j)%10 == (Math.floor(num/(j/100))%10)){
				nvaches++;
			}
			else if(Math.floor(number/j)%10 == (Math.floor(num/(j/1000))%10)){
				nvaches++;
			}
			else if(Math.floor(number/j)%10 == (Math.floor(num/(j*10))%10)){
				nvaches++;
			}
			else if(Math.floor(number/j)%10 == (Math.floor(num/(j*100))%10)){
				nvaches++;
			}
			else if(Math.floor(number/j)%10 == (Math.floor(num/(j*1000))%10)){
				nvaches++;
			}
			j /= 10;
			k++;
		}
		historyNumbersAD.unshift(num);
		historyResultsAD.unshift(''+ntauraux+' tauraux '+nvaches+' vaches');
		msg = "<table>";
		$.each(historyNumbersAD,function(index, value){
			msg+="<tr><td>"+historyNumbersAD[index]+"</td><td>"+historyResultsAD[index]+"</td></tr>";
		});
		msg += "</table>"
		$("#historyListAD").html(msg);
		clearInterval(fetching_thread);
	}
	
}



function getNumber()
{
	fetch("action.php-GET-game_id="+gameid+"&last_date="+date);
	}

$('#guess').click(function(){
	if (num/1000 < 1) return;
	if (block) return;
	ntauraux = 0;
	nvaches = 0;

	
	while(k<4){

		if(Math.floor(number/j)%10==(Math.floor(num/j)%10) ){
			ntauraux++;
		}
		else if(Math.floor(number/j)%10 == (Math.floor(num/(j/10))%10)){
			nvaches++;
		}
		else if(Math.floor(number/j)%10 == (Math.floor(num/(j/100))%10)){
			nvaches++;
		}
		else if(Math.floor(number/j)%10 == (Math.floor(num/(j/1000))%10)){
			nvaches++;
		}
		else if(Math.floor(number/j)%10 == (Math.floor(num/(j*10))%10)){
			nvaches++;
		}
		else if(Math.floor(number/j)%10 == (Math.floor(num/(j*100))%10)){
			nvaches++;
		}
		else if(Math.floor(number/j)%10 == (Math.floor(num/(j*1000))%10)){
			nvaches++;
		}
		j /= 10;
		k++;
	}
	$('#pad tr td').each(function(){
		$(this).attr("class","notclicked");
		});
	$('#result').html(''+ntauraux+' tauraux '+nvaches+' vaches');
	historyNumbers.unshift(num);
	historyResults.unshift(''+ntauraux+' tauraux '+nvaches+' vaches');
	msg = "<table>";
	$.each(historyNumbers,function(index, value){
		msg+="<tr><td>"+historyNumbers[index]+"</td><td>"+historyResults[index]+"</td></tr>";
	});
	msg += "</table>"
	$("#historyList").html(msg);
	//$('table').html("<tr> <td id=\"1\" class=\"notclicked\">1</td> <td id=\"2\" class=\"notclicked\">2</td> <td id=\"3\" class=\"notclicked\">3</td></tr><tr><td id=\"4\" class=\"notclicked\">4</td><td id=\"5\" class=\"notclicked\">5</td><td id=\"6\" class=\"notclicked\">6</td></tr><tr><td id=\"7\" class=\"notclicked\">7</td><td id=\"8\" class=\"notclicked\">8</td><td id=\"9\" class=\"notclicked\">9</td></tr>");
//	console.log($('table').html());
	k=0;
	j=1000;
	num=0;
	i=1;
});

function connected()
{
	alert(gameid);
	if (!joined || (joined == null))
	{
			
			fetch("action.php-GET-game_id="+gameid+"&last_date="+date);
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
			fetching_thread = setInterval(getNumber, 500);
		}
	if (joined)

		{
		block = false;
			
		}

	}
