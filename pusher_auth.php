<?php
define("APP_KEY", 'a4e27d5e92ed73bd5abe'); // DEACTIVATED: supply valid pusher api key here
define("APP_SECRET", '82afbc5625bd4770f584'); // DEACTIVATED
define("APP_ID", '24922'); // DEACTIVATED
require_once 'lib/Pusher-PHP/lib/Pusher.php';

$pusher = new Pusher(APP_KEY, APP_SECRET, APP_ID);
$client_id = bin2hex(openssl_random_pseudo_bytes(64));
$presence_data = array(); // something about screen position here?

header("Access-Control-Allow-Origin: *");
echo $pusher->presence_auth($_POST['channel_name'], $_POST['socket_id'], $client_id, $presence_data);
