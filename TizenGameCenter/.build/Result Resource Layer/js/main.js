
window.onload = function () {
    // TODO:: Do your initialization job

    // add eventListener for tizenhwkey
    document.addEventListener('tizenhwkey', function(e) {
        if(e.keyName == "back")
            tizen.application.getCurrentApplication().exit();
    });

    setInterval(function(){
      $("#taptostart").toggle();
    },1000);

    $("body").click(function(){
    	window.location.href = "interfaces/please-log-in/index.html";
    });
    
};
