<?php

// Got this function from StackOverflow, can't seem to find the answer anymore, but tyvm
function curl_get_contents($url) {
  $ch = curl_init($url);
  curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 2);
  curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
  curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
  curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
  curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
  $data = curl_exec($ch);
  curl_close($ch);
  return $data;
}

  if ($_GET['ip']) {
    $ip = $_GET['ip'];
  } else {
    $ip = null;
  }
  $endpoint = '/setup/eureka_info';
  $port = ':8008';
  $url = 'http://' . $ip . $port . $endpoint . '?rand=' . rand();
  // echo $url;


  header('Content-Type: application/json');

  $content =  curl_get_contents($url);

  if(empty($content)) {
    $content = '{"error":"Empty Response or Timeout", "ip":"' . $ip . '", "url":"' . $url . '"}';
    echo $content;
  } else if ($content[0] !== "{") {
    $content = '{"error":"Invalid JSON", "ip":"' . $ip . '", "url":"' . $url . '"}';
    echo $content;
  } else {
    echo $content;
  }
?>
