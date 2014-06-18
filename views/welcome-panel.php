<div class="getting-started">
	<div class="getting-started__intro">
		<h3><?php _e( 'Welcome to WordPress!', 'jetpack-start' ); ?></h3>
		<p class="getting-started__subhead"><?php _e( 'Get started building your new:', 'jetpack-start' ); ?></p>
	</div>

	<div class="getting-started__sections">
		<div class="welcome__section active" tabindex="0">
			<h4 class="tab__toggle"><?php _e( 'Business Site' ); ?></h4>
			<p><?php _e( 'So you want a professional site for your business describing your products and services? Get started by:', 'jetpack-start' ); ?></p>
		</div>
		<ul class="welcome__details tab__section">
			<li>
				<h5><a href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'add_page' ); ?>"><?php _e( 'Adding some pages', 'jetpack-start' ); ?></a></h5>
				<?php _e( 'Before tweaking your design, we recommend creating a few simple pages first, e.g. "Home Page", "About" and "Products".', 'jetpack-start' ); ?>
			</li>
			<li>
				<h5><a href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'options-reading.php#front-static-pages' ), 'select_home_page' ); ?>"><?php _e( 'Creating a front page', 'jetpack-start' ); ?></a></h5>
				<?php _e( 'If you want visitors to always see the same home page, choose one of the pages you created to be the front page.', 'jetpack-start' ); ?>
			</li>

			<li>
				<h5><a href="http://en.support.wordpress.com/making-a-business-website/" target="_blank"><?php _e( 'Learning more', 'jetpack-start' ); ?></a></h5>
				<?php printf( __( 'Read our "<a href="%s" target="_blank">Making a Business Website</a>" article for more
				tips on how to create a great business site with WordPress.', 'jetpack-start' ), 'http://en.support.wordpress.com/making-a-business-website/' ); ?>

			</li>
		</ul>

		<div class="welcome__section" tabindex="0">
			<h4 class="tab__toggle"><?php _e( 'Personal Site', 'jetpack-start' ); ?></h4>
			<p><?php _e( 'Tell the world about your work, your experience and your skills. You might find it useful to:', 'jetpack-start' ); ?></p>
		</div>
		<ul class="welcome__details tab__section">
			<li>
				<h5><?php printf( '<a href="%s">' . __( 'Add an "About" page', 'jetpack-start' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'add_page' ) ); ?></h5>
				<?php _e( 'Describe who you are, your interests, hobbies and experiences. You could then create a page for your CV or your Portfolio.', 'jetpack-start' ); ?>
			</li>

			<li>
				<h5><a href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( wp_customize_url(), 'customize' ); ?>"><?php _e( 'Customize Your site', 'jetpack-start' ); ?></a></h5>
				<?php _e( 'Customize the colours, fonts and images of your website.', 'jetpack-start' ); ?>

				<?php if ( current_user_can( 'install_themes' ) || ( current_user_can( 'switch_themes' ) && count( wp_get_themes( array( 'allowed' => true ) ) ) > 1 ) ) : ?>
					<?php printf( __( 'Or <a href="%s">change your theme completely</a>!', 'jetpack-start' ), Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'themes.php' ), 'themes' ) ); ?>
				<?php endif; ?>
			</li>

			<li>
				<h5><a href="http://en.blog.wordpress.com/2014/04/11/portfolios-on-wordpress-com/" target="_blank"><?php _e( 'Learn more' ); ?></a></h5>
				<?php printf( __( 'Read our "<a href="%s" target="_blank">Portfolios on WordPress.com</a>" article describing
				how to create stunning portfolios on WordPress.', 'jetpack-start' ), 'http://en.blog.wordpress.com/2014/04/11/portfolios-on-wordpress-com/' ); ?>
			</li>
		</ul>

		<div class="welcome__section" tabindex="0">
			<h4 class="tab__toggle"><?php _e( 'Blog', 'jetpack-start' ); ?></h4>
			<p><?php _e( 'A blog is a type of website that shows that newest content at the top of the page. Follow these steps to get started:', 'jetpack-start' ); ?></p>
		</div>
		<ul class="welcome__details tab__section">
			<li>
				<h5><a href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php' ), 'add_post' ); ?>"><?php _e( 'Add blog posts', 'jetpack-start' ); ?></a></h5>
				<?php _e( 'Express yourself! Write something, share a video, post a link, or showcase your travel photos.', 'jetpack-start' ); ?>
			</li>

			<li>
				<?php if ( class_exists( 'Jetpack' ) ) :  ?>
					<?php if ( Jetpack::is_active() && Jetpack::is_module_active('publicize') ) : ?>
					<h5><a href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'options-general.php?page=sharing' ), 'use_publicize' ); ?>"><?php _e( 'Publicize your work', 'jetpack-start' ); ?></a></h5>
					<?php else : ?>
					<h5><a href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'admin.php?page=jetpack' ), 'use_publicize_non_active' ); ?>"><?php _e( 'Publicize your work', 'jetpack-start' ); ?></a></h5>
					<?php endif; ?>
					<?php _e( 'Effortlessly promote your content by connecting to Twitter, Facebook, Google+, LinkedIn, Tumblr or Path!', 'jetpack-start' ); ?>
				<?php else : ?>
					<h5><a href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( wp_nonce_url( admin_url( 'plugins.php?action=activate&plugin=jetpack%2Fjetpack.php' ), 'activate-plugin_jetpack/jetpack.php' ) , 'activate_jetpack' ); ?>"><?php _e( 'Connect Jetpack', 'jetpack-start' ); ?></a></h5>
					<?php _e( 'Connect Jetpack to publcise your posts, get free stats, and more.', 'jetpack-start' ); ?>
				<?php endif; ?>
			</li>

			<li>
				<h5><a href="http://en.support.wordpress.com/widgets/" target="_blank"><?php _e( 'Learn more', 'jetpack-start' ); ?></a></h5>
				<?php printf( __( 'Read our <a href="%s" target="_blank">Widgets article</a> to learn about how to add cool stuff to your blog\'s sidebar.', 'jetpack-start' ), 'http://en.support.wordpress.com/widgets/' ); ?>
			</li>
		</ul>
	</div>
</div>
