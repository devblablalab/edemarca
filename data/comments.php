<?php 
    require '../HttpResponse.php';
    $response = new HttpResponse();
    echo $response->getCommentsData();