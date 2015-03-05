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

		<!-- Enable Stats -->
		<div class="welcome__section hidden" id="welcome__stats">
			<h4><?php _e( 'Enable stats and monitoring', 'jetpack-start' ); ?></h4>

			<div class="welcome__connect">
				<?php if ( class_exists( 'Jetpack' ) ) :  ?>
					<?php _e( 'You have successfully connected Jetpack for stats, monitoring, and more!', 'jetpack-start' ); ?>
					<p class="submit">
						<input type="submit" name="save" class="button button-primary button-large" value="Continue">
					</p>
				<?php else : ?>
					<?php _e( 'Connect Jetpack to enable free stats, site monitoring, and more.', 'jetpack-start' ); ?>
					<br /><br />
					<a class="download-jetpack" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( wp_nonce_url( admin_url( 'plugins.php?action=activate&plugin=jetpack%2Fjetpack.php' ), 'activate-plugin_jetpack/jetpack.php' ) , 'blog_activate_jetpack' ); ?>"><?php _e( 'Connect Jetpack', 'jetpack-start' ); ?></a>
				<?php endif; ?>
			</div>
		</div>

		<!-- Pick a design -->
		<div class="welcome__section hidden" id="welcome__design">
			<h4><?php _e( 'Pick a design', 'jetpack-start' ); ?></h4>
			<h5><?php _e( 'Select from one of the themes below. You can always change it later to one of the over 250 themes.', 'jetpack-start' ); ?></h5>
			<p class="submit">
				<input type="submit" name="save" class="button button-primary button-large" value="Save">
			</p>
		</div>

		<!-- Get web traffic -->
		<div class="welcome__section hidden" id="welcome__traffic">
			<h4>Get web traffic</h4>

			<div class="welcome__connect">

				<?php if ( class_exists( 'Jetpack' ) ) :  ?>
					<?php _e( 'Connect your social media accounts to "Publicize" to promote your posts effortlessly.', 'jetpack-start' ); ?>
					<br />
					<?php if ( Jetpack::is_active() && Jetpack::is_module_active('publicize') ) : ?>
						<a class="button button-primary button-large" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'options-general.php?page=sharing' ), 'blog_use_publicize' ); ?>"><?php _e( 'Publicize your work', 'jetpack-start' ); ?></a>
					<?php else : ?>
						<a class="button button-primary button-large" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'admin.php?page=jetpack' ), 'blog_use_publicize_non_active' ); ?>"><?php _e( 'Publicize your work', 'jetpack-start' ); ?></a>
					<?php endif; ?>

				<?php else : ?>

					<?php _e( 'Connect Jetpack to publcise your posts, get free stats, and more.', 'jetpack-start' ); ?>
					<br /><br />
					<a class="download-jetpack" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( wp_nonce_url( admin_url( 'plugins.php?action=activate&plugin=jetpack%2Fjetpack.php' ), 'activate-plugin_jetpack/jetpack.php' ) , 'blog_activate_jetpack' ); ?>"><?php _e( 'Connect Jetpack', 'jetpack-start' ); ?></a>

				<?php endif; ?>
				<p>
					<input type="submit" name="save" class="skip-step" value="Continue">
				</p>
			</div>
		</div>

		<!-- Advanced settings -->
		<div class="welcome__section hidden" id="welcome__advanced">
			<h4>Advanced settings</h4>

			<ul class="welcome__advanced">
				<li>
					<h5><?php _e( 'Configure Jetpack Settings', 'jetpack-start' ); ?></h5>
					<?php _e( 'View all Jetpack features like customization tools, enhanced security, speed boosts, and more.', 'jetpack-start' ); ?>
					<br>
					<a class="button button-primary button-large" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'admin.php?page=jetpack_modules' ), 'jetpack_modules' ); ?>"><?php _e( 'View Jetpack features', 'jetpack-start' ); ?></a>
				</li>

				<li>
					<h5><?php _e( 'Add Widgets', 'jetpack-start' ); ?></h5>
					<?php _e( 'Choose what you’d like visitors to see in your sidebar: Twitter feed, archives, and more...', 'jetpack-start' ); ?>
					<br>
					<a class="button button-primary button-large" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'widgets.php' ), 'blog_widgets' ); ?>"><?php _e( 'Manage Widgets', 'jetpack-start' ); ?></a>
				</li>

				<li>
					<h5><?php _e( 'Fine Tune Your Site', 'jetpack-start' ); ?></h5>
					<?php _e( 'Customize your site’s colors, fonts, frontpage and other settings. Or completely change your theme!', 'jetpack-start' ); ?>
					<br>
					<a class="button button-primary button-large" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( wp_customize_url(), 'blog_customize' ); ?>"><?php _e( 'Customize', 'jetpack-start' ); ?></a>
				</li>

				<li>
					<h5><?php _e( 'Create a Portfolio', 'jetpack-start' ); ?></h5>
					<?php _e( 'Starting an online portfolio is as straightforward as checking an option in your dashboard. ', 'jetpack-start' ); ?>
					<br>
					<a class="button button-primary button-large" href="http://en.blog.wordpress.com/2014/04/11/portfolios-on-wordpress-com/" target="_blank"><?php _e( 'Learn how' ); ?></a>
				</li>
			</ul>

		</div>
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
			<li><?php _e( 'Get some traffic', 'jetpack-start' ); ?></li>
			<li><?php _e( 'Advanced settings', 'jetpack-start' ); ?></li>
		</ol>
	</div>
</div>
