<?php
require 'config.php';

class Database
{
    public static function getConnection()
    {
        global $env;

        $host = $env['DATABASE']['host'];
        $dbname = $env['DATABASE']['dbname'];
        $user = $env['DATABASE']['user'];
        $password = $env['DATABASE']['password'];
    
        $connection = new PDO("mysql:host=$host;dbname=$dbname", $user, $password);
        $connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        
        return $connection;
    }
}
