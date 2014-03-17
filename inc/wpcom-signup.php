<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title></title>
	<link rel="stylesheet" type="text/css" href="../css/jetpack-start.css" />
	<link rel="stylesheet" type="text/css" href='http://fonts.googleapis.com/css?family=Open+Sans:400italic,400,600,700'>
	<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">
</head>
<body class="signup">
	<form action="../step4.php" method="post" target="_parent">
		<div class="jetpack-signup">
			<div class="col-wrap">
				<p>Enable Jetpack on your website now by <span class="signing-up">signing up for a free</span><span class="logging-in">logging into your</span> WordPress.com account.</p>
				<label>
					<span class="signing-up">Email</span><span class="logging-in">Email or Username</span>
					<input type="text" name="email" value="" placeholder="john.doe@example.com" />
				</label>
				<label>
					Enter a password
					<input type="text" name="password" value="" placeholder="" />
				</label>
			</div>
		</div>
		<div class="jetpack-login">
			<a href="#" class="signing-up">I already have a WordPress.com account?</a>
			<a href="#" class="logging-in">Sign up for a new WordPress.com account.</a>
		</div>
		<input type="hidden" class="step" name="step" value="3" />
		<a href="#" class="button button-primary button-hero submit"><span class="med-icon fa fa-angle-double-right"></span>Next, Setup social media</a>
	</form>
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"></script>
	<script type="text/javascript" src="../js/jetpack-start.js"></script>
</body>
</html>