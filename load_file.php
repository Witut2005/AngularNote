<?php
    header('Access-Control-Allow-Origin: *');
    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $file = $_FILES['givenFile'];
    $content = file_get_contents($file['tmp_name']);
    echo "$content";
    //$content = file_get_contents($file['tmp_name']);
    //echo "$content";
?>
