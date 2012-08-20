<!DOCTYPE html>
<html>
<head>
<title>phonephonephone</title>
<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script
<script src="http://js.pusher.com/1.12/pusher.min.js"></script>
<script src="js/phonephonephone.js"></script>
<script type="text/javascript">
$(function() {
    // Enable pusher logging - don't include this in production
    Pusher.log = function(message) {
      if (window.console && window.console.log) window.console.log(message);
    };

    // Flash fallback logging - don't include this in production
    WEB_SOCKET_DEBUG = true;

    // set up auth
    Pusher.channel_auth_endpoint = '/pusher_auth.php';

    // init
	var pusher = new Pusher('a4e27d5e92ed73bd5abe');
	var channel = pusher.subscribe('presence-test');

	channel.bind('pusher:subscription_succeeded', function() {
		console.log('subscribed successfully');
	});
	
	$(document).ready(function () {   
		// need DOM in place for this to make sense
		var streamer = new phonephonephone(channel);
	});
});
</script>
</head>
<body>
</body>
</html>