<!DOCTYPE HTML>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width">
<title>BizViewz</title>
<link href="css/header_footer.css" rel="stylesheet" type="text/css">
<link href="css/main.css" rel="stylesheet" type="text/css">
<!--[if lte IE 8]>
<script type="text/javascript" src="javascript/html5.js"></script>
<![endif]-->
<script src="http://code.jquery.com/jquery-1.11.2.js"></script>
<link href='http://fonts.googleapis.com/css?family=Roboto:300' rel='stylesheet' type='text/css'>
<link rel="stylesheet" href="https://code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
<script src="http://code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
<!-- <script type="text/javascript" src="js/function.js" ></script> -->
</head>
<?php include("header.php"); ?>


 <div id="login" class="container">
    <div class="contentHeader"><h1>Login</h1></div>
    <div class="content">
    <form Method="post" Action="index.php">
      <label>Username</label>
        <input id="username" type="text" name="username" placeholder="Email Address" value="">
        <br>
        <br>

      <label>Password</label>
      <input id="password" type="password"  name="password" placeholder="Password" value="">
      <br>
      <br>
      <div class="login_actions" style="padding-right:0">
        <button id="login_button" type="Submit" class="btn btn-green" tabindex="3" name="loginSubmit">Login</button>
      </div>
    </form>
     </div>
</html>
