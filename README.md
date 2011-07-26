# TwilioCapability for JavaScript

Node.js implementation coming soon.

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


See [demo.html](https://raw.github.com/chadsmith/TwilioCapability-js/master/demo.html) for a full example.
