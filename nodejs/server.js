var config = {
		port: 8000,
		twilio: {
			accountSid: 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
			authToken: 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy',
			appSid: 'APzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz'
		}
	},
	express = require('express'),
	url = require('url'),
	TwilioCapability = require('./lib/TwilioCapability'),
	app = express.createServer(
		express.static(__dirname + '/public')
	);

app.configure(function() {
	app.set('views', __dirname + '/views');
	app.set('view engine', 'jade');
});

app.get('/', function(req, res) {
	res.render('index');
});

app.get('/token', function(req, res) {
	var clientName = url.parse(req.url, true).query.clientName || 'test',
		capability = new TwilioCapability(config.twilio.accountSid, config.twilio.authToken);
	capability
		.allowClientOutgoing(config.twilio.appSid)
		.allowClientIncoming(clientName);
	res.send({
		clientName: clientName,
		token: capability.generateToken()
	});
});

app.listen(config.port);
