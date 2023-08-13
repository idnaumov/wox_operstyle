mp.events.add('Chat_sendMessage::SERVER', (player, text) => {
	player.call('Hud_addString::CLIENT',[`${player.name} говорит: ${text}`])
})

function sendLocal(player,text,range) {
    // mp.players.forEachInRange(player.position, range,
	// 	(player) => {
	 		player.call('Hud_addString::CLIENT',[text])
	// 	}
	// );
}

function send(player,text) {
    player.call('Hud_addString::CLIENT', [text]);
}


function sendAll(text) {
	mp.players.forEach(player => {
		player.call('Hud_addString::CLIENT', [text]);
	})
}

function addNotify(player, type, text, time) {
    player.call('HUD_addNotify::CLIENT', [type, text, time]);
}

mp.events.add('Hud_addNotify::SERVER',addNotify)
mp.events.add('Hud_chatSendLocal::SERVER',addNotify)
mp.events.add('Hud_chatSendMessage::SERVER',send)

module.exports.send = send;
module.exports.sendLocal = sendLocal;
module.exports.sendAll = sendAll;
module.exports.addNotify = addNotify;