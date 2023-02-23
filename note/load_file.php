<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    $file = $_FILES['file'];
    $content = file_get_contents($file['tmp_name']);
    echo "$content";
?>