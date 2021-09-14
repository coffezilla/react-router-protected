<?php

// access
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: GET,HEAD,OPTIONS,POST,PUT');
header('Access-Control-Allow-Headers: Authorization');
header("Cache-Control: no-store, no-cache, must-revalidate, max-age=0");
header("Cache-Control: post-check=0, pre-check=0", false);
header("Pragma: no-cache");


//conecta ao banco
error_reporting(0);
date_default_timezone_set('America/Sao_Paulo');

// JWT config
$JWTServerkey = '123123';

// JWT key data
$httpHeaderData = apache_request_headers();
if(isset($httpHeaderData['authorization']) || isset($httpHeaderData['Authorization'])) {
    $clientToken = isset($httpHeaderData['authorization']) ? $httpHeaderData['authorization'] : $httpHeaderData['Authorization'];
}

//
function createJWTAuth($email, $key) {

    $header = [
        'alg' => 'HS256',
        'typ' => 'JWT'
    ];
    $header = json_encode($header);
    $header = base64UrlEncode($header);
    
    $payload = [
        'iss' => 'bhxsites',
        'email' => $email
    ];
    $payload = json_encode($payload);
    $payload = base64UrlEncode($payload);
    
    $signature = hash_hmac('sha256', $header . "." . $payload , $key , true );
    $signature = base64UrlEncode($signature);
   

    return $header.".".$payload.".".$signature;
}

//
function verifyAuth($headerToken, $key) {


            
    $bearer = explode (' ', $headerToken);
    $isValidAuth = 0;

    $token = explode('.', $bearer[1]);
    $header = $token[0];
    $payload = $token[1];
    $sign = $token[2];

    $valid = hash_hmac('sha256', $header . "." . $payload , $key , true);
    $valid = base64UrlEncode($valid);


    if ($sign == $valid) {
        return true;
    } else {
        return false;
    }
}


//
function base64UrlEncode ($value) {
    $b64 = base64_encode($value);
    if ($b64 === false) {
        return false;
    }
    $url = strtr($b64, '+/', '-_');
    return rtrim($url, '=');
}


