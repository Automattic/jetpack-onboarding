
<div class="getting-started">
	<div class="getting-started__intro">
		<h3><?php _e( 'Welcome to your new WordPress site!', 'jetpack-start' ); ?></h3>
		<p class="getting-started__subhead"><?php _e( 'Pick a site type you want to set up and we’ll give you some handy tips.', 'jetpack-start' ); ?></p>
	</div>

	<div class="getting-started__sections">
		<div class="welcome__section" tabindex="0">
			<h4 class="tab__toggle"><a href=""><?php _e( 'Business Site' ); ?></a></h4>
			<p><?php _e( 'A professional site for your business that your customers will love.', 'jetpack-start' ); ?></p>
		</div>
		<div class="welcome__details tab__section">
			<ul>
				<li>
					<h5>1. <?php _e( 'Create a few pages', 'jetpack-start' ); ?></h5>
					<p><?php _e( 'You probably need pages such as Features, Products, Services, or Contact Us.', 'jetpack-start' ); ?></p>
					<a class="button-primary" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'business_add_page' ); ?>"><?php _e( 'Add some pages', 'jetpack-start' ); ?></a>
				</li>
				<li>
					<h5>2. <?php _e( 'Create your home page', 'jetpack-start' ); ?></h5>
					<p><?php _e( 'Welcome your visitors with a great looking page that explains what your business is about. Then, ', 'jetpack-start' ); ?><a href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'options-reading.php#front-static-pages' ), 'business_front_page' ); ?>"><?php _e( 'set your front page to static.', 'jetpack-start' ); ?></a></p>
					<a class="button-primary" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'business_front_page' ); ?>"><?php _e( 'Create a home page', 'jetpack-start' ); ?></a>
				</li>

				<li>
					<h5>3. <?php _e( 'Turn off Comments', 'jetpack-start' ); ?></h5>
					<p><?php _e( 'Turn commenting off by default so visitors can’t comment on your company&rsquo;s pages.', 'jetpack-start' ); ?></p>
					<a class="button-primary" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'options-discussion.php' ), 'business_comments_off' ); ?>"><?php _e( 'Disable comments', 'jetpack-start' ); ?></a>
				</li>

				<li>
					<h5>4. <?php _e( 'Fine tune it', 'jetpack-start' ); ?></h5>
					<p><?php _e( 'Customize your site’s colors, fonts, frontpage and other settings. Or completely change your theme!', 'jetpack-start' ); ?></p>
					<a class="button-primary" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( wp_customize_url(), 'business_customize' ); ?>"><?php _e( 'Customize', 'jetpack-start' ); ?></a>
				</li>
			</ul>
		</div>

		<div class="welcome__section" tabindex="0">
			<h4 class="tab__toggle"><a href=""><?php _e( 'Personal Site', 'jetpack-start' ); ?></a></h4>
			<p><?php _e( 'Showcase your skills, work, experience or resumé.', 'jetpack-start' ); ?></p>
		</div>
		<div class="welcome__details tab__section">
			<ul>
				<li>
					<h5>1. Add an About Page</h5>
					<?php _e( 'Tell the world who your are: your profession, passions, skills and how to be contacted.', 'jetpack-start' ); ?>
					<br /><br />
					<?php printf( '<a class="button button-primary" href="%s">' . __( 'Create Page', 'jetpack-start' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'personal_add_page' ) ); ?>
				</li>

				<li>
					<h5>2. Create a Front Page</h5>
					<?php _e( 'Welcome your visitors with a great looking page that explains what your site is about.', 'jetpack-start' ); ?>
					<br /><br />
					<a class="button button-primary" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'options-reading.php#front-static-pages' ), 'personal_front_page' ); ?>"><?php _e( 'Edit Settings', 'jetpack-start' ); ?></a>
				</li>

				<li>
					<h5>3. Create a Portfolio</h5>
					<?php _e( 'Starting an online portfolio is as straightforward as checking an option in your dashboard. ', 'jetpack-start' ); ?>
					<br /><br />
					<a class="button button-primary" href="http://en.blog.wordpress.com/2014/04/11/portfolios-on-wordpress-com/" target="_blank"><?php _e( 'Learn how' ); ?></a>
				</li>

				<li>
					<h5>4. Fine Tune It</h5>
					<?php _e( 'Customize your site’s colors, fonts, frontpage and other settings. Or completely change your theme!', 'jetpack-start' ); ?>
					<br /><br />
					<a class="button button-primary" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( wp_customize_url(), 'personal_customize' ); ?>"><?php _e( 'Customize', 'jetpack-start' ); ?></a>
				</li>
			</ul>
		</div>

		<div class="welcome__section" tabindex="0">
			<h4 class="tab__toggle"><a href=""><?php _e( 'Blog', 'jetpack-start' ); ?></a></h4>
			<p><?php _e( 'Share your thoughts or the content you love with the world.', 'jetpack-start' ); ?></p>
		</div>
		<div class="welcome__details tab__section">
			<ul>
				<li>
					<h5>1. Add Blog Posts</h5>
					<?php _e( 'Start building your blog archives – write an intro post, share a video clip or a link.', 'jetpack-start' ); ?>
					<br /><br />
					<a class="button button-primary" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php' ), 'blog_add_post' ); ?>"><?php _e( 'Add blog posts', 'jetpack-start' ); ?></a>
				</li>

				<li>
					<h5>2. Publicize Your Work</h5>
					<?php if ( class_exists( 'Jetpack' ) ) :  ?>
						<?php _e( 'Connect your social media accounts to “Publicize” to promote your posts effortlessly.', 'jetpack-start' ); ?>
						<br /><br />
						<?php if ( Jetpack::is_active() && Jetpack::is_module_active('publicize') ) : ?>
						<a class="button button-primary" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'options-general.php?page=sharing' ), 'blog_use_publicize' ); ?>"><?php _e( 'Publicize your work', 'jetpack-start' ); ?></a>
						<?php else : ?>
						<a class="button button-primary" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'admin.php?page=jetpack' ), 'blog_use_publicize_non_active' ); ?>"><?php _e( 'Publicize your work', 'jetpack-start' ); ?></a>
						<?php endif; ?>

					<?php else : ?>
						<?php _e( 'Connect Jetpack to publcise your posts, get free stats, and more.', 'jetpack-start' ); ?>
						<br /><br />
						<a class="button button-primary" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( wp_nonce_url( admin_url( 'plugins.php?action=activate&plugin=jetpack%2Fjetpack.php' ), 'activate-plugin_jetpack/jetpack.php' ) , 'blog_activate_jetpack' ); ?>"><?php _e( 'Connect Jetpack', 'jetpack-start' ); ?></a>
					<?php endif; ?>
				</li>

				<li>
					<h5>3. Add Widgets</h5>
					<?php _e( 'Choose what you’d like visitors to see in your sidebar: Twitter feed, archives, and more...', 'jetpack-start' ); ?>
					<br /><br />
					<a class="button button-primary" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'widgets.php' ), 'blog_widgets' ); ?>"><?php _e( 'Manage Widgets', 'jetpack-start' ); ?></a>

				</li>

				<li>
					<h5>4. Fine Tune It</h5>
					<?php _e( 'Customize your site’s colors, fonts, frontpage and other settings. Or completely change your theme!', 'jetpack-start' ); ?>
					<br /><br />
					<a class="button button-primary" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( wp_customize_url(), 'blog_customize' ); ?>"><?php _e( 'Customize', 'jetpack-start' ); ?></a>
				</li>

			</ul>
		</div>
	</div>
</div>
