<?php ?>
<div id="header-toolbar-div">
<table id="header-toolbar-table"><tr><td>
<a href="home.php" style="float: left; margin-top: 5px; margin-left: 16px;top: 40px; font-size: 30px;font-family: 'Roboto', sans-serif;">Bizviewz</a>
</td>
<td>
	<ul class="header_toolbar" >
	<?php if(isset($_POST['username'])) { ?>
	<li class="welcome">Hello ! <?php echo $_POST['username'] ?></li>	
	<li class="wlecome"><a href="#" class="level1 tooltip-viewport-bottom"><span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;setting</span></a></li>
	
	<li class="welcome"><a href="login.php" class="level1"><span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;signout</span></a></li></ul>
	    <!-- <a id="company_contact"  style="float: right;"> contact +919000000011 </a> -->
	<?php } else { ?>
	<li class="wlecome"><a href="home.php" class="level1"><span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Home</span></a></li>
	<li class="wlecome"><a href="about_us.php" class="level1"><span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;About Us</span></a></li>
	
	<li class="wlecome"><a href="contact_us.php" class="level1 tooltip-viewport-bottom"><span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Contact Us</span></a></li>
	
	<li class="welcome"><a href="login.php" class="level1"><span>|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sign In</span></a></li></ul>
  <?php } ?>
</td>
<!-- <tr><td>
  <p id="company_contact"  style="float: right;"> contact +919000000011 </p>
</td> -->
</table>

</div>



