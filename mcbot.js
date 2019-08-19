const Discord = require("discord.js");
const mcping = require('mc-ping-updated');
const client = new Discord.Client();
const settings = require('./config.json');

var mcIP = settings.ip; // Your MC server IP
var mcPort = settings.port; // Your MC server port

function update() {

	mcping(mcIP, function(err, res) {
		var status = 'Server offline';
		if (err) {
			console.error(err);

			client.user.setStatus('dnd')
			//.then(console.log)
				.catch(console.error);

		} else {
			// Success!
			console.log(res.description.text);
			if((res.description.text =="&cWe are under maintenance.")||(res.players.online>=res.players.max)){
				client.user.setStatus('idle')
				//.then(console.log)
					.catch(console.error);
			}else{
				client.user.setStatus('online')
				//.then(console.log)
					.catch(console.error);
			}

			status = ' ' + res.players.online + '  of  ' + res.players.max;
		}

		client.user.setActivity(status, { type: 'PLAYING' })
			.then(presence => console.log(status))
			.catch(console.error);

	});
}

client.on("ready", () => {
	console.log("I am ready!");
	client.setInterval(update,5000);
});

client.login(settings.token);
