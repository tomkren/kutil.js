<?php

$url = $_POST['url'];
$str = file_get_contents($url);
echo $str;


?>