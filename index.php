<!DOCTYPE html>
<html>
<head>
<title>phonephonephone</title>
<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script
<script src="http://js.pusher.com/1.12/pusher.min.js"></script>
<script src="js/phonephonephone.js"></script>
<script type="text/javascript">
$(function() {
	var pusher = new Pusher('a4e27d5e92ed73bd5abe');
	var channel = pusher.subscribe('test');
	var streamer = new phonephonephone(channel);
	$(document).ready(function () {   
	});
});
</script>
</head>
<body>
</body>
</html>