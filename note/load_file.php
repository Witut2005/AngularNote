<?php

    header('Access-Control-Allow-Origin: *');
    error_reporting(E_ALL);
    // ini_set('display_errors', 1);
    session_start();

    $host = 'localhost';
    $db_user = 'root';
    $db_pass = '';
    $db_name = 'note';


    if (isset($_FILES['givenFile']))
    {
      $file = $_FILES['givenFile'];
      $content = file_get_contents($file['tmp_name']);
      $_SESSION['content'] = $content;
      echo "$content";
    }

    $note_data = new mysqli($host, $db_user, $db_pass, $db_name);
    if($note_data->connect_errno == 0)
    {
      $content = $_SESSION['content'];
      $sql_insert_query = "INSERT INTO data (data.data) VALUES ('$content')";
      @$note_data->query("$sql_insert_query"); 
      $note_data->close();
    }


    session_unset();

?>
