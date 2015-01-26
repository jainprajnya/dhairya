<?php ?>
<div id="header-toolbar-div">
<table id="header-toolbar-table"><tr><td>
<p style="float: left; margin-top: 5px; margin-left: 16px;top: 40px; font-size: 30px;color:white;font-family: 'Roboto', sans-serif;">BizViewz</p>
</td>
<td>
	<ul class="header_toolbar" >
	<?php if(isset($_POST['username'])) { ?>
	<div id="username" style="visibility:hidden;height:0px;"><?php echo $_POST['username']; ?></div>
	<div id="password" style="visibility:hidden;height:0px;"><?php echo $_POST['password']; ?></div>
	<li class="welcome">Welcome  <?php $a=preg_split('/@/',$_POST['username']);echo ucwords(strtolower($a[0]));  ?> !</li>	
	<li class="wlecome"><a href="#" class="level1 tooltip-viewport-bottom"><span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Setting</span></a></li>
	
	<li class="welcome"><a href="login.php" class="level1"><span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Signout</span></a></li></ul>
	    <a id="company_contact"  style="float: right;"> Call us at +919900195062 </a>
	     <!-- <tr><td>
  <p id="company_contact"  style="float: right;"> contact +919000000011 </p>
</td> -->
	<?php } else { ?>
	<li class="wlecome"><a href="home.php" class="level1"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home</span></a></li>
	<li class="wlecome"><a href="about-us.php" class="level1"><span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;About Us</span></a></li>
	
	<li class="wlecome"><a href="contact-us.php" class="level1 tooltip-viewport-bottom"><span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Contact Us</span></a></li>
	
	<li class="welcome"><a href="login.php" class="level1"><span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign In</span></a></li></ul>
  <?php } ?>
</td>

</table>

</div>



