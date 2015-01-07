<!DOCTYPE HTML>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width">
<title>ABC-XYZ</title>
<link href="css/header_footer.css" rel="stylesheet" type="text/css">
<link href="css/main.css" rel="stylesheet" type="text/css">
<!--[if lte IE 8]>
<script type="text/javascript" src="javascript/html5.js"></script>
<![endif]-->
</head>
<?php header('Access-Control-Allow-Origin: *'); ?>
<?php include("header.php"); ?>


 <div id="login" class="container">
    <div class="contentHeader"><h1>Login</h1></div>
    <div class="content">
    <form action="index.php" method="post" accept-charset="utf-8">
      <label>Username</label>
        <input id="username" type="text" placeholder="Email Address" value="">
        <br>
        <br>

      <label>Password</label>
      <input id="password" type="password" placeholder="Password" value="">
      <br>
      <br>
      <div class="login_actions" style="padding-right:0">
        <button type="submit" class="btn btn-green" tabindex="3" name="loginSubmit">Login</button>
      </div>
    </form>
     </div>
</html>
