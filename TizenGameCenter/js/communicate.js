function fetch(args) {
	try {
		SASocket.setDataReceiveListener(onreceive);
		SASocket.sendData(CHANNELID, args);
		console.log('fetching sucess');
	} catch(err) {
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
	}
}

function disconnect() {
	try {
		if (SASocket != null) {
			SASocket.close();
			SASocket = null;
			createHTML("closeConnection");
		}
	} catch(err) {
		console.log("exception [" + err.name + "] msg[" + err.message + "]");
	}
}

function onreceive(channelId, data) {
	jsondata = data;
}