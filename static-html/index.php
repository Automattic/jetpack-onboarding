<?php $step = 1; ?>
<?php include_once('inc/header.php'); ?>
	<section>
		<form action="step2.php" method="post">
			<div class="container">
				<h1>What type of site are you building?</h1>
				<div class="options-box">
					<a href="#" class="option active" data-option="business-website"><span class="big-icon fa fa-building-o"></span>Business Website</a>
					<a href="#" class="option" data-option="business-blog"><span class="big-icon fa fa-briefcase"></span>Business Blog</a>
					<a href="#" class="option" data-option="personal-blog"><span class="big-icon fa fa-edit"></span>Personal Blog</a>
					<a href="#" class="option" data-option="photo-blog"><span class="big-icon fa fa-camera"></span>Photo Blog</a>
					<a href="#" class="option" data-option="about-me-page"><span class="big-icon fa fa-user"></span>About Me Page</a>
					<a href="#" class="option" data-option="family-blog"><span class="big-icon fa fa-group"></span>Family Blog</a>
				</div>
				<input type="hidden" class="step" name="step" value="1" />
				<input type="hidden" class="option-selected" name="option-selected" value="business-website" />
				<a href="#" class="button button-primary button-hero submit"><span class="med-icon fa fa-angle-double-right"></span>Next, choose a design</a>
			</div>
		</form>
	</section>
<?php include_once('inc/footer.php'); ?>