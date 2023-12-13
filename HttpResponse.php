<?php
require 'database.php';

class HttpResponse
{
    private $connection;

    public function __construct() 
    {
        $this->connection = Database::getConnection();
    }

    private function getData($query) 
    {
        try {
            $result = $this->connection->query($query);
            header('Content-Type: application/json');

            if(empty($result)) {
                http_response_code(400);
                return json_encode([]);
            }
    
            $data = $result->fetchAll(PDO::FETCH_ASSOC);
            http_response_code(200);
            return json_encode($data);
        } catch (PDOException $e) {
            http_response_code(400);
            return json_encode([]);
        }     
    }

    public function getShirtsData()
    {
        return $this->getData("SELECT id_shirts, brand, price FROM shirts");
    }

    public function getCommentsData()
    {
        return $this->getData("SELECT * FROM comments");
    }
}