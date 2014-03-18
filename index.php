<?php include_once('inc/header.php'); ?>
<section class="step-1" data-step="1">
	<div class="container">
	  <h1><?php _e( 'What type of site are you building?' ); ?></h1>
	  <div class="options-box">
		<?php	foreach ( Jetpack_Start::get_site_types() as $site_type => $site_type_details ): ?>
		  <a href="#setup/step/1/<?php echo $site_type; ?>" class="option"><span class="big-icon fa <?php echo $site_type_details['icon_class']; ?>"></span><?php echo $site_type_details['title']; ?></a>
		<?php	endforeach; ?>
	  </div>
	  <a href="#setup/step/2" class="button button-primary button-hero submit"><span class="med-icon fa fa-angle-double-right"></span><?php _e( 'Next, choose a design' ) ?></a>
	</div>
</section>

<section class="step-2" data-step="2">
	<div class="container">
		<h1><?php _e( 'Choose a design' ); ?></h1>
		<p class="step-description"><?php _e( 'You can always change it later (there are 100+ themes to choose from).' ) ?></p>
    <script id="themes_template" type="text/template">
		<% _.each(themes,function(theme) { %>
			<div class="theme" data-theme="<%= theme.stylesheet %>" style="background-image:url('<%= theme.img_preview %>');background-size: 100%;">
				<div class="theme-buttons">
					<a href="#" class="button theme-preview"><span class="small-icon fa fa-external-link"></span><?php _e( 'Preview' ) ?></a>
				</div>
			</div>
		<% }); %>
		</script>
		<div class="themes-box"></div>
    <a href="<?php echo Jetpack::init()->build_connect_url() ?>" class="button button-primary button-hero submit"><span class="med-icon fa fa-angle-double-right"></span><?php _e( 'Next, activate Jetpack' ) ?></a>
  </div>
</section>

<?php
global $publicize;
function is_connected( $service ) {
	global $publicize;
	$connections = $publicize->get_connections( $service );
	return ! empty( $connections );
}
$services = array(
	'facebook' => array( 'title' => __( 'Facebook'), 'short' => 'fb' ),
	'twitter' => array( 'title' => __( 'Twitter'), 'short' => 'tw' ),
);
?>
<section class="step-4" data-step="4">
		<div class="container">
			<h1><?php _e( 'Every site needs an audience' ) ?></h1>
			<p class="step-description"><?php _e( 'Automatically share select links to new posts on Facebook and Twitter.' ) ?></p>
			<div class="social-box">
				<?php foreach( $services as $service => $service_details ): ?>
				<a href="<?php echo esc_url( $publicize->connect_url( $service ) ); ?>" class="social-link <?php echo $service_details['short']; ?><?php if ( is_connected( $service ) ) : ?> connected<?php endif ?>" target="_top">
						<span class="wrap">
							<span class="fa fa-<?php echo $service; ?>"></span>
							<span class="title"><?php echo ( is_connected( $service ) ) ? __( 'Connected' ) : sprintf( __( 'Connect to %s' ), $service_details['title'] );  ?></span>
						</span>
				</a>
				<?php endforeach; ?>
			</div>
			<div class="skip"><?php printf( __( 'or, <a href="%s">skip this step</a>'), home_url() ); ?></div>
			<a href="<?php echo home_url(); ?>" class="button button-primary button-hero submit"><span class="med-icon fa fa-angle-double-right"></span><?php _e( 'All done, visit your site' ) ?></a>
		</div>
</section>
<?php include_once('inc/footer.php'); ?>
