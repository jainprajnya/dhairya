<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head> 
<meta http-equiv="Content-Type" content="application/x-www-form-urlencoded; charset=utf-8"/> 
<meta http-equiv="Access-Control-Allow-Origin" content="*" />
<title>Using Highcharts with PHP and MySQL</title>
<link href="css/header_footer.css" rel="stylesheet" type="text/css">
<link href="css/extra.css" rel="stylesheet" type="text/css">
</head>
<body>
<div id="container">

<?php include("header.php"); ?>
<div id="contact-us">
	<p> Contact</p>
<form>
	<label>Name</label>
        <input id="name" type="text" value="">
        <br>
        <br>

      <label>Email/Mobile</label>
      <input id="contact" type="text" value="">
      <br>
      <br>
      <label>City</label>
      <input id="city" type="text" value="">
      <br>
		<br>
      <label>Business Type</label>
      <input id="contact" type="text" value="">
      <br>
      <br>
      <label>Comment</label>
      <input id="comment" type="text" value="">
      <br>

      <br>
      <br>
      <div class="login_actions" style="padding-right:0">
        <button type="submit" class="btn btn-green" tabindex="3" name="loginSubmit">Submit</button>
         <button type="submit" class="btn btn-green" tabindex="3" name="loginSubmit">Cancel</button>
      </div>
    </form>
</div>
<?php include("footer.php"); ?>
</div>
</body>
<!-- </div> -->
</html>