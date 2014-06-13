<style>

.welcome-panel .welcome-panel-column ul {
	margin:0 0 20px 0;
}

.welcome-panel .welcome-panel-column:first-child ul {
	margin:0 20px 20px 0;
}

.welcome-panel .welcome-panel-column:first-child {
	width: 32%;
}


.welcome-panel .middle-column {
	margin-right: 20px;
}
.welcome-panel .welcome-panel-column li {
	list-style: none; margin:0; padding: 10px; font-size: 13px;
	line-height: 1.5; border: solid 1px; border-bottom: none;
	font-size: 11px;
}

.welcome-panel .welcome-panel-column li:first-child {
	border-radius: 5px 5px 0 0;
}

.welcome-panel .welcome-panel-column li:last-child {
	border-radius: 0 0 5px 5px;
	border-bottom: solid 1px;
}


.welcome-panel .welcome-panel-column ul.create-business li {
	background: #e8f4ff;
	border-color: #d2e9fe;
}

.welcome-panel .welcome-panel-column ul.create-business li:hover {
	background: #d2e9fe;
}

.welcome-panel .welcome-panel-column ul.create-personal li {
	background: #ffefcc;
	border-color: #ffda89;
}

.welcome-panel .welcome-panel-column ul.create-personal li:hover {
	background: #ffda89;
}

.welcome-panel .welcome-panel-column ul.create-blog li {
	background: #f6faea;
	border-color: #cfd6b7;
}

.welcome-panel .welcome-panel-column ul.create-blog li:hover {
	background: #cfd6b7;
}


.welcome-panel .welcome-panel-column li strong a {
	text-decoration: underline;
}

.welcome-panel .welcome-panel-column li strong {
	font-size: 13px;
	display: block;
	margin-bottom: 4px;
	padding: 0;
}


</style>

<div class="welcome-panel-content">
	<h3><?php _e( 'Welcome to WordPress! Get started with:' ); ?></h3>
	<!--p class="about-description"><?php _e( 'What are you creating?' ); ?></p-->
	<div class="welcome-panel-column-container">
		<div class="welcome-panel-column">
			<h4><?php _e( 'Creating a Business Site' ); ?></h4>
			<p><?php _e( 'So you want a professional site for your business describing your products and services? Get started by:'); ?></p>

			<ul class="create-business">
				<li>
					<strong><?php printf( '<a href="%s">' . __( 'Adding some pages...' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'add_page' ) ); ?></strong>
					Before tweaking your design, we recommend creating a few simple pages first, e.g. "Home Page", "About" and "Products".
				</li>
				<li>
					<strong><a href="/">Creating a front page...</a></strong>
					If you want visitors to always see the same home page, choose one of the pages you created to be the front page.
				</li>
				
				<li>
					<strong>Learning more</strong>
					Read our "<a href="http://en.support.wordpress.com/making-a-business-website/" target="_blank">Making a Business Website</a>" article for more
					tips on how to create a great business site with WordPress.

				</li>
			</ul>
			
		</div>
		<div class="welcome-panel-column middle-column">
			<h4><?php _e( 'Creating a Personal Site' ); ?></h4>
			<p><?php _e( 'Tell the world about your work, your experience and your skills. You might find it useful to:'); ?></p>
			<ul class="create-personal">
				<li>
					<strong><?php printf( '<a href="%s">' . __( 'Add an "About" page...' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'add_page' ) ); ?></strong>
					Describe who you are, your interests, hobbies and experiences. You could then create a page for your CV or your Portfolio.
				</li>

				<li>
					<strong><a href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( wp_customize_url(), 'customize' ); ?>"><?php _e( 'Customize Your Site...' ); ?></a></strong>
					Customize the colours, fonts and images of your website. 

					<?php if ( current_user_can( 'install_themes' ) || ( current_user_can( 'switch_themes' ) && count( wp_get_themes( array( 'allowed' => true ) ) ) > 1 ) ) : ?>
						<?php printf( __( 'Or <a href="%s">change your theme completely</a>!' ), Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'themes.php' ), 'themes' ) ); ?>
					<?php endif; ?>
				</li>

				<li>
					<strong>Learning more</strong>
					Read our "<a href="http://en.blog.wordpress.com/2014/04/11/portfolios-on-wordpress-com/" target="_blank">Portfolios on WordPress.com</a>" article describing
					how to create stunning portfolios on WordPress.
				</li>
			</ul>
		</div>
		<div class="welcome-panel-column welcome-panel-last">
			<h4><?php _e( 'Creating a Blog' ); ?></h4>
			<p><?php _e( 'A blog is a type of website that shows that newest content at the top of the page. Follow these steps to get started:'); ?></p>
			<ul class="create-blog">
				<li>
					<strong><?php printf( '<a href="%s">' . __( 'Add blog posts...' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php' ), 'add_post' ) ); ?></strong>
					Express yourself! Write something, share a video, post a link, or showcase your travel photos.
				</li>

				<li>
					<strong><?php printf( '<a href="%s">' . __( 'Publicize your work...' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'add_page' ) ); ?></strong>
					Effortlessly promote your content by connecting to Twitter, Facebook, Google+, LinkedIn, Tumblr or Path!
				</li>

				<li>
					<strong>Learning more</strong>
					Read our <a href="http://en.support.wordpress.com/widgets/" target="_blank">Widgets article</a> to learn about how to add cool stuff to your blog's sidebar.
				</li>
			</ul>
		</div>
	</div>
</div>
