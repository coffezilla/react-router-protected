<?php 

header('Content-Type: application/json; charset=UTF-8');

// JWT auth
include "connect/auth.php";

$dataResponse = array();
$dataResponse['status'] = 0;
$dataResponse['message'] = '';
$errors = array();

// var
$userEmail = addslashes(trim($_POST['email']));
$userEmail = str_replace(" ", "", $userEmail);

$userPassword = addslashes(trim($_POST['password']));
$userPassword = str_replace(" ", "", $userPassword);
$userPasswordMd5 = md5($userPassword);
$currentTimestamp = Date('Y-m-d H:i:s');

// creating new token JWT
$token = createJWTAuth($userEmail, $JWTServerkey);

// verify
$validInputs = false;

// check input
if( $userEmail != '' && strlen($userEmail) >= 3 && $userPassword != '' && strlen($userPassword) >= 3 ) {
    $validInputs = true;
} else {
    $dataResponse['message'] = 'Empty field not allowed';
    $dataResponse['status'] = 2;
}

if($validInputs) {

    // fake database return
    $DATABASE_PASSWORD = md5('123');
    $DATABASE_EMAIL = 'foo@mail.com';

    if( $DATABASE_EMAIL == $userEmail && $DATABASE_PASSWORD == $userPasswordMd5) {

        $dataResponse['token'] = $token;
        $dataResponse['timestamp'] = $currentTimestamp;

        $dataResponse['user'] = array(
            'id' => 1,
            'email' => $userEmail,
        );
        $dataResponse['status'] = 1;    
        $dataResponse['message'] = 'Logged';

    } else {
        $dataResponse['message'] = 'Invalid E-mail or Password';
        $dataResponse['status'] = 3;
    }
}

$resultadosJson = json_encode($dataResponse);
echo $resultadosJson;
