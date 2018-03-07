



var socket = io.connect('http://192.168.2.33:7070',{'forceNew': true});

socket.on('messages', function(data){
	console.log(data);
	render(data);
});

function render(data){
	var html = data.map(function(messages, index){
		return (`
				<div class = "message" >
					<strong> ${messages.nickname}</strong> dice :
					<p>${messages.text}</p>
				</div>
			`);

	}).join('');

	var div_msgs=document.getElementById('message');
	div_msgs.innerHTML = html;
	div_msgs.scrollTop = div_msgs.scrollHeight;
}

function addMessage(e) {
	var messages = {
		nickname: document.getElementById('nickname').value,
		text: document.getElementById('text').value
	};
	
	document.getElementById('nickname').style.display = 'none';
	socket.emit('add-message', messages);

	return false;
}