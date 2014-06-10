<div class="welcome-panel-content">
	<h3><?php _e( 'Welcome to WordPress!' ); ?></h3>
	<p class="about-description"><?php _e( 'We&#8217;ve assembled some links to get you started:' ); ?></p>
	<div class="welcome-panel-column-container">
		<div class="welcome-panel-column">
			<h4><?php _e( 'Get Started' ); ?></h4>
			<a class="button button-primary button-hero load-customize hide-if-no-customize" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( wp_customize_url(), 'customize' ); ?>"><?php _e( 'Customize Your Site' ); ?></a>
			<a class="button button-primary button-hero hide-if-customize" href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'themes.php' ), 'themes' ); ?>"><?php _e( 'Customize Your Site' ); ?></a>
			<?php if ( current_user_can( 'install_themes' ) || ( current_user_can( 'switch_themes' ) && count( wp_get_themes( array( 'allowed' => true ) ) ) > 1 ) ) : ?>
				<p class="hide-if-no-customize"><?php printf( __( 'or, <a href="%s">change your theme completely</a>' ), Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'themes.php' ), 'themes' ) ); ?></p>
			<?php endif; ?>
		</div>
		<div class="welcome-panel-column">
			<h4><?php _e( 'Next Steps' ); ?></h4>
			<ul>
				<?php if ( 'page' == get_option( 'show_on_front' ) && ! get_option( 'page_for_posts' ) ) : ?>
					<li><?php printf( '<a href="%s" class="welcome-icon welcome-edit-page">' . __( 'Edit your front page' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( get_edit_post_link( get_option( 'page_on_front' ) ), 'edit_front_page' ) ); ?></li>
					<li><?php printf( '<a href="%s" class="welcome-icon welcome-add-page">' . __( 'Add additional pages' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'add_page' ) ); ?></li>
				<?php elseif ( 'page' == get_option( 'show_on_front' ) ) : ?>
					<li><?php printf( '<a href="%s" class="welcome-icon welcome-edit-page">' . __( 'Edit your front page' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( get_edit_post_link( get_option( 'page_on_front' ) ), 'edit_front_page' ) ); ?></li>
					<li><?php printf( '<a href="%s" class="welcome-icon welcome-add-page">' . __( 'Add additional pages' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'add_page' ) ); ?></li>
					<li><?php printf( '<a href="%s" class="welcome-icon welcome-write-blog">' . __( 'Add a blog post' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php' ), 'add_post' ) ); ?></li>
				<?php else : ?>
					<li><?php printf( '<a href="%s" class="welcome-icon welcome-write-blog">' . __( 'Write your first blog post' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php' ), 'add_post' ) ); ?></li>
					<li><?php printf( '<a href="%s" class="welcome-icon welcome-add-page">' . __( 'Add an About page' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'add_page' ) ); ?></li>
				<?php endif; ?>
				<li><?php printf( '<a href="%s" class="welcome-icon welcome-view-site">' . __( 'View your site' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( home_url( '/' ), 'visite_site' ) ); ?></li>
			</ul>
		</div>
		<div class="welcome-panel-column welcome-panel-last">
			<h4><?php _e( 'More Actions' ); ?></h4>
			<ul>
				<?php if ( current_theme_supports( 'widgets' ) || current_theme_supports( 'menus' ) ) : ?>
					<li><div class="welcome-icon welcome-widgets-menus"><?php
							if ( current_theme_supports( 'widgets' ) && current_theme_supports( 'menus' ) ) {
								printf( __( 'Manage <a href="%1$s">widgets</a> or <a href="%2$s">menus</a>' ),
									Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'widgets.php' ), 'widgets' ), Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'nav-menus.php' ), 'manage_menus' ) );
							} elseif ( current_theme_supports( 'widgets' ) ) {
								echo '<a href="' . Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'widgets.php' ), 'widgets' ). '">' . __( 'Manage widgets' ) . '</a>';
							} else {
								echo '<a href="' . Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'nav-menus.php' ), 'manage_menus' ) . '">' . __( 'Manage menus' ) . '</a>';
							}
							?></div></li>
				<?php endif; ?>
				<?php if ( current_user_can( 'manage_options' ) ) : ?>
					<li><?php printf( '<a href="%s" class="welcome-icon welcome-comments">' . __( 'Turn comments on or off' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'options-discussion.php' ), 'option-discussion' ) ); ?></li>
				<?php endif; ?>
				<li><?php printf( '<a href="%s" class="welcome-icon welcome-learn-more">' . __( 'Learn more about getting started' ) . '</a>', __( 'http://codex.wordpress.org/First_Steps_With_WordPress' ) ); ?></li>
			</ul>
		</div>
	</div>
</div>
