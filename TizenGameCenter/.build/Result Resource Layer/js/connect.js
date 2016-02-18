$(document).ready(function(){
	connect();
});

var connected=false;
var jsondata="";
var SAAgent = null;
var SASocket = null;
var CHANNELID = 104;
var ProviderAppName = "HelloAccessoryProvider";


function onerror(err) {
	console.log("err [" + err.name + "] msg[" + err.message  + "]");
}

var agentCallback = {
	onconnect : function(socket) {
		SASocket = socket;
		SASocket.setSocketStatusListener(function(reason){
			console.log("Service connection lost, Reason : [" + reason + "]");
			disconnect();
		});
	},
	onerror : onerror
};

var peerAgentFindCallback = {
	onpeeragentfound : function(peerAgent) {
		try {
			if (peerAgent.appName == ProviderAppName) {
				SAAgent.setServiceConnectionListener(agentCallback);
				SAAgent.requestServiceConnection(peerAgent);
			} else {
				alert("Not expected app!! : " + peerAgent.appName);
			}
		} catch(err) {
			console.log("exception [" + err.name + "] msg[" + err.message + "]");
		}
	},
	onerror : onerror
}

function onsuccess(agents) {
	try {
		if (agents.length > 0) {
			SAAgent = agents[0];
			
			SAAgent.setPeerAgentFindListener(peerAgentFindCallback);
			SAAgent.findPeerAgents();
		} else {
			alert("Not found SAAgent!!");
		}
	} catch(err) {
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
	}
}

function connect() {
	if (SASocket) {
        return false;
    }
	try {
		webapis.sa.requestSAAgent(onsuccess, onerror);
		connect=true;
	} catch(err) {
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
	}
}