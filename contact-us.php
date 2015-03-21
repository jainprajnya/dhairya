<!DOCTYPE html>
<html xmlns="https://www.w3.org/1999/xhtml">
<head> 
<meta http-equiv="Content-Type" content="application/x-www-form-urlencoded; charset=utf-8"/> 
<meta http-equiv="Access-Control-Allow-Origin" content="*" />
<title>Bizviewz Loading</title>
<link href="css/header_footer.css" rel="stylesheet" type="text/css">
<link href='https://fonts.googleapis.com/css?family=Roboto:300' rel='stylesheet' type='text/css'>
	<!-- <script src="jquery/jquery-1.11.1.js"></script> -->
	<script src="https://code.jquery.com/jquery-1.11.2.js"></script>
	<link rel="stylesheet" href="https://code.jquery.com/ui/1.11.2/themes/smoothness/jquery-ui.css">
	  
	  <script src="https://code.jquery.com/ui/1.11.2/jquery-ui.js"></script>
<link href='https://fonts.googleapis.com/css?family=Roboto:300' rel='stylesheet' type='text/css'>
<link href="css/extra.css" rel="stylesheet" type="text/css">
<link href="css/main.css" rel="stylesheet" type="text/css">
<script type="text/javascript" src="js/function_others.js" ></script>
</head>
<body>


<?php include("header.php"); ?>
<div id="contact-us">
	Please fill out the contact form below. One of our Bizviewz representatives will contact you soon.
 <br>
 <br>
 <table id="contactus-table">
 	<tr><td class="contactus-label">Name: </td><td class="contactus-data"><input  class="contectustext" type="text"></td></tr>
 	<tr><td class="contactus-label">Email Id:</td><td  class="contactus-data"><input class="contectustext" type="text"></td></tr>
 	<tr><td class="contactus-label">City:</td><td class="contactus-data"> <input class="contectustext" type="text"></td></tr>
 	<tr><td class="contactus-label">Buisness Type:</td><td class="contactus-data"><input class="contectustext" type="text"></td></tr>
 	<tr ><td class="contactus-label">Comments</td><td class="contactus-data"><textarea style="margin-top:20px;" rows="4" cols="27"></textarea></td></tr>
 	<tr><td class="contactus-label"></td><td class="contactus-data"><button type="button" class="button" style="margin-right:25px;">Submit</button><button type="button" class="button">Cancel</button></td></tr>
 </table>

</div>
<?php include("footer.php"); ?>
</div>
</body>
<!-- </div> -->
</html>