$(function() {
	$('#number').hide();
	$("#log").text("Please enter your name");
	$('#name').blur(function() {
		$("#log").text("Requesting token");
		$.getJSON('/token', { clientName: $(this).val() }, function(data) {
			Twilio.Device.setup(data.token);
			Twilio.Device.ready(function(device) {
				$("#log").text("User '" + data.clientName + "' is ready");
				$('#name').hide();
				$('#number').show();
			});
			Twilio.Device.error(function(error) {
				$("#log").text("Error: " + error.message);
			});
			Twilio.Device.connect(function(conn) {
				$("#log").text("Successfully established call");
			});
			Twilio.Device.disconnect(function(conn) {
				$("#log").text("Call ended");
			});
			Twilio.Device.incoming(function(conn) {
				$("#log").text("Incoming call from " + conn.parameters.From);
				conn.status; // => "pending"
				conn.accept();
				conn.status; // => "connecting"
			});
			$('.call').click(function() {
				var params =  {
					PhoneNumber: $("#number").val()
				};
				$("#log").text("Calling " + params.PhoneNumber);
				Twilio.Device.connect(params);
			});
			$('.hangup').click(function() {
				Twilio.Device.disconnectAll();
			});
		});
	});
});
