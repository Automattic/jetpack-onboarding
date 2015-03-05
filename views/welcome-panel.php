<div class="getting-started__progress">
	<div class="progress__bar">
		<span></span>
	</div>
	<span class="progress__percent">30</span>% done
</div>

<div class="getting-started">
	<div class="getting-started__intro">
		<h3><?php _e( 'Welcome to your new WordPress site!', 'jetpack-start' ); ?></h3>

		<p class="getting-started__subhead"><?php _e( 'Let\'s get your new site set up as quickly as possible.', 'jetpack-start' ); ?></p>
	</div>

	<div class="getting-started__sections">

		<!-- Set Your Title -->
		<div class="welcome__section" id="welcome__site-title">
			<h4><?php _e( 'Set your site title', 'jetpack-start' ); ?></h4>

			<form>
				<input type="text" name="site_title" id="site-title" autocomplete="off"
				       placeholder="<?php _e( 'Site Title (this can be changed later)', 'jetpack-start' ); ?>"/>

				<p class="submit">
					<input type="submit" name="save" class="button button-primary button-large" value="Save"/>
				</p>
			</form>
			<div class="welcome__helper">
				<?php _e( 'Stuck? Here are some ideas to get you going:', 'jetpack-start' ); ?>
				<ul>
					<li>
						<small><em><?php _e( 'Your company name: "ACME Consulting"', 'jetpack-start' ); ?></em></small>
					</li>
					<li>
						<small>
							<em><?php _e( 'What you do: "Quality gardening tools by ACME"', 'jetpack-start' ); ?></em>
						</small>
					</li>
					<li>
						<small>
							<em><?php _e( 'What you will write about: "Richard\'s Travel Blog"', 'jetpack-start' ); ?></em>
						</small>
					</li>
				</ul>
			</div>
		</div>

		<!-- Pick a layout -->
		<div class="welcome__section hidden" id="welcome__layout">
			<h4><?php _e( 'Pick a layout', 'jetpack-start' ); ?></h4>

			<form method="post">
				<label>
					<input type="radio" name="site_layout" value="website"
					       checked/> <?php _e( 'Website', 'jetpack-start' ); ?>
					<p class="description"><?php _e( 'Choose this one if you\'re creating a site for your company that will rarely change', 'jetpack-start' ); ?></p>
				</label>
				<br>
				<label>
					<input type="radio" name="site_layout"
					       value="site-blog"/> <?php _e( 'Website with a blog', 'jetpack-start' ); ?>
					<p class="description"><?php _e( 'Choose this one if you\'re creating a company or personal site that will also have a blog or news section', 'jetpack-start' ); ?></p>
				</label>
				<br>
				<label>
					<input type="radio" name="site_layout" value="blog"/> <?php _e( 'Just a blog', 'jetpack-start' ); ?>
					<p class="description"><?php _e( 'Choose this one if you want a site that will constantly show new content (articles, photos, videos, etc.)', 'jetpack-start' ); ?></p>
				</label>

				<p class="submit">
					<input type="submit" name="save" class="button button-primary button-large" value="Save">
				</p>
			</form>
		</div>


		<div class="getting-started__steps">
			<h3><?php _e( 'Your Progress' ); ?></h3>
			<ol>
				<li class="completed"><?php _e( 'Sign up', 'jetpack-start' ); ?></li>
				<li class="completed"><?php _e( 'Create admin account', 'jetpack-start' ); ?></li>
				<li class="completed"><?php _e( 'Verify email address', 'jetpack-start' ); ?></li>
				<li class="current"><?php _e( 'Set site title', 'jetpack-start' ); ?></li>
				<li><?php _e( 'Pick a layout', 'jetpack-start' ); ?></li>
				<li><?php _e( 'Enable stats &amp; monitoring', 'jetpack-start' ); ?></li>
				<li><?php _e( 'Pick a design', 'jetpack-start' ); ?></li>
				<li><?php _e( 'Create content', 'jetpack-start' ); ?></li>
				<li><?php _e( 'Get some traffic', 'jetpack-start' ); ?></li>
				<li><?php _e( 'Advanced settings', 'jetpack-start' ); ?></li>
			</ol>
		</div>
	</div>
</div>
