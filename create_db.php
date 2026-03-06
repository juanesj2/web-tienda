<?php
try {
    $pdo = new PDO('mysql:host=127.0.0.1;port=3306', 'electronica_unitron', 'electronicaunitron666666');
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->exec('CREATE DATABASE IF NOT EXISTS web_tienda');
    echo "Database created successfully\n";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}
