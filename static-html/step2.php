<?php $step = 2; ?>
<?php include_once('inc/header.php'); ?>
	<section>
		<form action="step3.php" method="post">
			<div class="container">
				<h1>Choose a design</h1>
				<p class="step-description">You can always change it later (there are 100+ themes to choose from).</p>
				<div class="themes-box">
					<div class="theme active" data-theme="theme1">
						<div class="theme-buttons">
							<a href="#" class="button theme-preview"><span class="small-icon fa fa-external-link"></span>Preview</a>
						</div>
					</div>
					<div class="theme" data-theme="theme2">
						<div class="theme-buttons">
							<a href="#" class="button theme-preview"><span class="small-icon fa fa-external-link"></span>Preview</a>
						</div>
					</div>
					<div class="theme" data-theme="theme3">
						<div class="theme-buttons">
							<a href="#" class="button theme-preview"><span class="small-icon fa fa-external-link"></span>Preview</a>
						</div>
					</div>
					<div class="theme" data-theme="theme4">
						<div class="theme-buttons">
							<a href="#" class="button theme-preview"><span class="small-icon fa fa-external-link"></span>Preview</a>
						</div>
					</div>
				</div>
				<input type="hidden" class="step" name="step" value="2" />
				<input type="hidden" class="theme-selected" name="theme-selected" value="theme1" />
				<a href="" class="button button-primary button-hero submit"><span class="med-icon fa fa-angle-double-right"></span>Next, activate Jetpack</a>
			</div>
		</form>
	</section>
<?php include_once('inc/footer.php'); ?>