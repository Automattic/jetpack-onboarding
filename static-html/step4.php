<?php $step = 4; ?>
<?php include_once('inc/header.php'); ?>
	<section>
		<form action="step5.php" method="post">
			<div class="container">
				<h1>Every site needs an audience</h1>
				<p class="step-description">Automatically share select links to new posts on Facebook and Twitter.</p>
				<div class="social-box">
					<a href="#" class="social-link fb" data-service="facebook"><span class="wrap"><span class="fa fa-facebook"></span><span class="title">Connect to Facebook</span></span></a>
					<a href="#" class="social-link tw" data-service="twitter"><span class="wrap"><span class="fa fa-twitter"></span><span class="title">Connect to Twitter</span></span></a>
				</div>
				<input type="hidden" class="step" name="step" value="2" />
				<input type="hidden" class="theme-selected" name="theme-selected" value="theme1" />
				<div class="skip">or, <a href="step5.php">skip this step</a></div>
				<a href="step5.php" class="button button-primary button-hero submit"><span class="med-icon fa fa-angle-double-right"></span>All done, visit your site</a>
			</div>
		</form>
	</section>
<?php include_once('inc/footer.php'); ?>