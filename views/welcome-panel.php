<style>
/* Tabs! */
.tab__section {
	display: none;
}

.welcome__section.active + .tab__section {
	display: block;
}

.getting-started * {
	-webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}

.getting-started {
	margin: 0 -10px;
	font-size: 0;
}

.getting-started__intro {
	padding: 0 30px;
}

.getting-started h3 {
	margin: 9px 0 6px;
	font-size: 30px;
}

.getting-started__subhead {
	margin: 0 0 36px;
	font-size: 20px;
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

.welcome__section:hover,
.welcome__section:focus {
	/*background: #fafafa;*/
}

.welcome__section.active {
	position: relative;
	border-color: #eee;
	background: #fafafa;
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
	border-bottom: 14px solid #fafafa;
}

.welcome__details {
	float: left;
	margin-top: 15px;
	width: 100%;
	border-top: 1px solid #eee;
	background: #fafafa;
	color: #777;
	text-align: left;
}

.welcome__details h5 {
	margin: 0 0 6px;
	font-size: 16px;
}

.welcome__details li {
	float: left;
	margin: 0;
	padding: 19px 30px 25px;
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
@media (max-width: 767px) {
	.welcome__section {
		margin: 0;
		width: 100%;
		max-width: none;
		min-height: 0;
	}
	.welcome__details {
		float: none;
		overflow: hidden;
		padding: 10px 0 12px;
		border-bottom: 1px solid #eee;
	}
	.welcome__details:last-child {
		border-bottom: 0;
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
			$('.welcome__section').click(function() {
				$('.welcome__section.active').removeClass('active');
				$(this).toggleClass('active');
				return false;
			});
		});
	}) ( jQuery );
</script>

<div class="getting-started">
	<div class="getting-started__intro">
		<h3><?php _e( 'Welcome to WordPress!' ); ?></h3>
		<p class="getting-started__subhead"><?php _e( 'Get started building your new:' ); ?></p>
	</div>

	<div class="getting-started__sections">
		<div class="welcome__section active" tabindex="0">
			<h4 class="tab__toggle"><?php _e( 'Business Site' ); ?></h4>
			<p><?php _e( 'So you want a professional site for your business describing your products and services? Get started by:'); ?></p>
		</div>
		<ul class="welcome__details tab__section">
			<li>
				<h5><?php printf( '<a href="%s">' . __( 'Adding some pages' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'add_page' ) ); ?></h5>
				Before tweaking your design, we recommend creating a few simple pages first, e.g. "Home Page", "About" and "Products".
			</li>
			<li>
				<h5><a href="/">Creating a front page</a></h5>
				If you want visitors to always see the same home page, choose one of the pages you created to be the front page.
			</li>

			<li>
				<h5><a href="http://en.support.wordpress.com/making-a-business-website/" target="_blank">Learning more</a></h5>
				Read our "<a href="http://en.support.wordpress.com/making-a-business-website/" target="_blank">Making a Business Website</a>" article for more
				tips on how to create a great business site with WordPress.

			</li>
		</ul>

		<div class="welcome__section" tabindex="0">
			<h4 class="tab__toggle"><?php _e( 'Personal Site' ); ?></h4>
			<p><?php _e( 'Tell the world about your work, your experience and your skills. You might find it useful to:'); ?></p>
		</div>
		<ul class="welcome__details tab__section">
			<li>
				<h5><?php printf( '<a href="%s">' . __( 'Add an "About" page' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'add_page' ) ); ?></h5>
				Describe who you are, your interests, hobbies and experiences. You could then create a page for your CV or your Portfolio.
			</li>

			<li>
				<h5><a href="<?php echo Jetpack_Start_Welcome_Panel::add_action_arg( wp_customize_url(), 'customize' ); ?>"><?php _e( 'Customize Your site' ); ?></a></h5>
				Customize the colours, fonts and images of your website.

				<?php if ( current_user_can( 'install_themes' ) || ( current_user_can( 'switch_themes' ) && count( wp_get_themes( array( 'allowed' => true ) ) ) > 1 ) ) : ?>
					<?php printf( __( 'Or <a href="%s">change your theme completely</a>!' ), Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'themes.php' ), 'themes' ) ); ?>
				<?php endif; ?>
			</li>

			<li>
				<h5><a href="http://en.blog.wordpress.com/2014/04/11/portfolios-on-wordpress-com/" target="_blank">Learn more</a></h5>
				Read our "<a href="http://en.blog.wordpress.com/2014/04/11/portfolios-on-wordpress-com/" target="_blank">Portfolios on WordPress.com</a>" article describing
				how to create stunning portfolios on WordPress.
			</li>
		</ul>

		<div class="welcome__section" tabindex="0">
			<h4 class="tab__toggle"><?php _e( 'Blog' ); ?></h4>
			<p><?php _e( 'A blog is a type of website that shows that newest content at the top of the page. Follow these steps to get started:'); ?></p>
		</div>
		<ul class="welcome__details tab__section">
			<li>
				<h5><?php printf( '<a href="%s">' . __( 'Add blog posts' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php' ), 'add_post' ) ); ?></h5>
				Express yourself! Write something, share a video, post a link, or showcase your travel photos.
			</li>

			<li>
				<h5><?php printf( '<a href="%s">' . __( 'Publicize your work' ) . '</a>', Jetpack_Start_Welcome_Panel::add_action_arg( admin_url( 'post-new.php?post_type=page' ), 'add_page' ) ); ?></h5>
				Effortlessly promote your content by connecting to Twitter, Facebook, Google+, LinkedIn, Tumblr or Path!
			</li>

			<li>
				<h5><a href="http://en.support.wordpress.com/widgets/" target="_blank">Learn more</a></h5>
				Read our <a href="http://en.support.wordpress.com/widgets/" target="_blank">Widgets article</a> to learn about how to add cool stuff to your blog's sidebar.
			</li>
		</ul>
	</div>
</div>
