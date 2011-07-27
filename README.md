# TwilioCapability for JavaScript

## Client side implementation

Do not use in a production environment!

	<script src="TwilioCapability.js"></script>
	<script>
		var accountSid = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
		var authToken  = 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy';
		var appSid     = 'APzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';
		var clientName = 'jenny';

		var capability = new TwilioCapability(accountSid, authToken);
		capability.allowClientOutgoing(appSid);
		capability.allowClientIncoming(clientName);

		var token = capability.generateToken();

		Twilio.Device.setup(token);
	</script>


See [client-side/demo.html](https://github.com/chadsmith/TwilioCapability-js/blob/master/client-side/demo.html) for a full example.

## Node.js implementation

	var TwilioCapability = require('./lib/TwilioCapability');

	var accountSid = 'ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx';
	var authToken  = 'yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy';
	var appSid     = 'APzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz';
	var clientName = 'jenny';

	var capability = new TwilioCapability(accountSid, authToken);
	capability.allowClientOutgoing(appSid);
	capability.allowClientIncoming(clientName);

	var token = capability.generateToken();

See [nodejs/server.js](https://github.com/chadsmith/TwilioCapability-js/blob/master/nodejs/server.js) for a full example.
