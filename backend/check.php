<?php 

header('Content-Type: application/json; charset=UTF-8');

// JWT auth
include "connect/auth.php";

$dataResponse = array();
$dataResponse['status'] = 1;
$dataResponse['message'] = '';
$errors = array();

$currentTimestamp = Date('Y-m-d H:i:s');
$userEmail = addslashes(trim($_GET['email']));

$isAuth = verifyAuth($clientToken, $JWTServerkey);


if($isAuth) {

	  $emailValidation = createJWTAuth($userEmail, $JWTServerkey);
    
    if('Bearer '.$emailValidation === $clientToken) {
			$dataResponse['timestamp'] = $currentTimestamp;
			$dataResponse['status'] = 1;
			$dataResponse['email'] = $userEmail;
			$dataResponse['token'] = $emailValidation;
			$dataResponse['message'] = 'Valid Token and valid Email';
    } else {
			$dataResponse['timestamp'] = $currentTimestamp;
			$dataResponse['status'] = 3;
			$dataResponse['message'] = 'Valid Token but invalid email';
    }
} else {
	$dataResponse['timestamp'] = $currentTimestamp;
	$dataResponse['status'] = 2;
	$dataResponse['message'] = 'Invalid Token';
}

$resultadosJson = json_encode($dataResponse);
echo $resultadosJson;
