<style>
/* Tabs! */
.tab__section {
	display: none;
}

.welcome__section.active + .tab__section {
	display: block;
}

/* Styles! */
.welcome-panel {
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: -20px;
	z-index: 50;
	margin: 0;
	padding: 0;
	border: 0;
	background: #f9f9f9;
	-webkit-box-shadow: none;
	box-shadow: none;
}

.welcome-panel .welcome-panel-close {
	top: 0;
	right: 13px;
}

.getting-started * {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

.getting-started {
	font-size: 0;
}

.getting-started h3 {
	margin:58px 0 17px;
	font-size: 41px;
	text-align: center;
}

.getting-started__subhead {
	margin: 0 0 66px;
	color: #666;
	font-size: 18px;
	line-height: 1.6;
	text-align: center;
}

.getting-started__sections {
	text-align: center;
}

.getting-started h4 {
	margin: 0;
	font-size: 20px;
}

.welcome__section {
	display: inline-block;
	margin: 0 1%;
	padding: 15px 20px;
	border: 1px solid transparent;
	width: 31.333%;
	max-width: 310px;
	text-align: left;
	vertical-align: top;
	cursor: pointer;
}

.welcome__section.active {
	position: relative;
	border-color: #eee;
	background: #fff;
	-webkit-box-shadow: 0 1px 1px rgba(0,0,0,.04);
	box-shadow: 0 1px 1px rgba(0,0,0,.04);
}

.welcome__section.active:before,
.welcome__section.active:after {
	content: '';
	position: absolute;
	top: 100%;
	left: 50%;
	margin-top: 3px;
	margin-left: -13px;
	border-left: 13px solid transparent;
	border-right: 13px solid transparent;
	border-bottom: 13px solid #eee;
}

.welcome__section.active:after {
	margin-top: 4px;
	margin-left: -14px;
	border-left: 14px solid transparent;
	border-right: 14px solid transparent;
	border-bottom: 14px solid #fff;
}

.welcome__details {
	float: left;
	margin: 15px 30px;
	border: 1px solid #eee;
	background: #fff;
	color: #777;
	text-align: left;
	-webkit-box-shadow: 0 1px 1px rgba(0,0,0,.04);
	box-shadow: 0 1px 1px rgba(0,0,0,.04);
}

.welcome__details h5 {
	margin: 0 0 6px;
	font-size: 16px;
}

.welcome__details li {
	float: left;
	margin: 0;
	padding: 30px 33px 35px;
	width: 33.333%;
	font-size: 13px;
	line-height: 1.5;
}

@media (max-width: 1080px) {
	.welcome__section {
		min-height: 162px;
	}
}

@media (max-width: 925px) {
	.welcome__section {
		min-height: 182px;
	}
}

@media (max-width: 782px) {
	.welcome-panel {
		left: -10px;
	}
}

@media (max-width: 767px) {
	.welcome__section {
		display: block;
		margin: 0 30px;
		width: auto;
		max-width: none;
		min-height: 0;
	}

	.welcome__details {
		float: none;
		overflow: hidden;
		padding: 10px 0 12px;
	}

	.welcome__details li {
		float: none;
		padding: 7px 22px;
		width: 100%;
		min-height: 0;
	}
}
</style>

<script type="text/javascript">
	(function( $ ) {
		$(document).ready(function() {
			$('.welcome__section').focus(function() {
				$('.welcome__section.active').removeClass('active');
				$(this).toggleClass('active');
				return false;
			});
		});
	}) ( jQuery );
</script>

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
				<h5><?php printf( '<a href="%s">' . __( 'Adding some pages', 'jetpack-start' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'add_page' ) ); ?></h5>
				<?php _e( 'Before tweaking your design, we recommend creating a few simple pages first, e.g. "Home Page", "About" and "Products".', 'jetpack-start' ); ?>
			</li>
			<li>
				<h5><a href="/"><?php _e( 'Creating a front page', 'jetpack-start' ); ?></a></h5>
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
				<h5><?php printf( '<a href="%s">' . __( 'Add blog posts', 'jetpack-start' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php' ), 'add_post' ) ); ?></h5>
				<?php _e( 'Express yourself! Write something, share a video, post a link, or showcase your travel photos.', 'jetpack-start' ); ?>
			</li>

			<li>
				<h5><?php printf( '<a href="%s">' . __( 'Publicize your work', 'jetpack-start' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'add_page' ) ); ?></h5>
				<?php _e( 'Effortlessly promote your content by connecting to Twitter, Facebook, Google+, LinkedIn, Tumblr or Path!', 'jetpack-start' ); ?>
			</li>

			<li>
				<h5><a href="http://en.support.wordpress.com/widgets/" target="_blank"><?php _e( 'Learn more', 'jetpack-start' ); ?></a></h5>
				<?php printf( __( 'Read our <a href="%s" target="_blank">Widgets article</a> to learn about how to add cool stuff to your blog\'s sidebar.', 'jetpack-start' ), 'http://en.support.wordpress.com/widgets/' ); ?>
			</li>
		</ul>
	</div>
</div>
