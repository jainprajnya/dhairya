<!DOCTYPE HTML>
<html>

<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="viewport" content="width=device-width">
<title>ABC-XYZ</title>
<link href="css/desktop.css" rel="stylesheet" type="text/css">
<!--[if lte IE 8]>
<script type="text/javascript" src="javascript/html5.js"></script>
<![endif]-->
</head>

  <header id="header">
      <h1>LOGO-COMPANY NAME</h1>
  </header>

 <div id="login" class="container">

  <div id="login_panel" class="grid-16 flame-bar">

    <div class="contentHeader"><h1>Login</h1></div>
    <div class="content">
    <form action="index.php" method="post" accept-charset="utf-8">
      <div class="login_fields clearfix">
      <div class="field-group " id="username">
      <label>Email Address</label>
      <div class="field">
        <input name="username" type="text" placeholder="Email Address" value="">
        <div id="username" class="msg notify notify-error" style="display: none;"></div>
      </div>
      <div class="catchall"></div>
      </div> <!-- .field-group -->

      <div class="field-group " id="password">
      <label>Password</label>
      <div class="field">
          <input name="password" type="password" placeholder="Password" value="">
          <label></label>
          <div id="password" class="msg notify notify-error" style="display: none;"></div>
      </div>

      <div class="catchall"></div>
      </div> <!-- .field-group -->

      </div> <!-- .login_fields -->

      <div class="login_actions" style="padding-right:0">
        <button type="submit" class="btn btn-green" tabindex="3" name="loginSubmit">Click Here to Login</button>
      </div>
    </form>
  </div>

  <div id="flame-sep"></div>
  </div> <!-- #login_panel -->
    <div id="forgot-password" class="grid-8">
      <div class="contentHeader">
        <h2>Forgot Password?</h2>
      </div>
    <div class="content">
        <a href="/recover">Click Here To Reset Password</a>
      </div>
  </div>
    <div id="not-member" class="not-member"><a href="/signup.php" style="font-size: 36px; font-weight: bold; color:#960804; text-decoration: none;">Not a Member yet?<div style="font-size: 24px; margin: 10px 0 0px;">Click here to sign up!</div></a></div>

<br class="clear">
</div>
  
   <?php include("footer.php"); ?>

</html>
