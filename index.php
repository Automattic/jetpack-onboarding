<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title><?php _e( 'Jetpack Start' ); ?></title>
	<link rel="stylesheet" type="text/css" href="<?php echo plugins_url( 'css/jetpack-start.css', __FILE__ ); ?>" />
	<link rel="stylesheet" type="text/css" href='//fonts.googleapis.com/css?family=Open+Sans:400italic,400,600,700'>
	<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">
	<?php wp_print_scripts(); ?>
</head>
<body>

<?php $steps = Jetpack_Start::get_steps(); ?>

<header>
	<span class="genericon genericon-wordpress"></span>
	<div class="progress">
		<span><?php _e( 'WordPress setup wizard' ) ?></span>
		<ul>
		<?php foreach ( $steps as $slug => $label ) : ?>
			<li class="step-<?php echo esc_attr( $slug ); ?>" title="<?php echo esc_attr( $label ); ?>"></li>
		<?php endforeach; ?>
		</ul>
	</div>
</header>

<?php foreach ( $step as $slug => $label ) : ?>
<section class="step-<?php echo esc_attr( $slug ); ?>" data-step="step-<?php echo esc_attr( $slug ); ?>"
	<div class="container">
		<?php if ( ! empty( $label ) ) : ?>
			<h1><?php echo esc_html( $label ); ?></h1>
		<?php endif; ?>
		<?php do_action( "jetpack-start_step-{$slug}" ); ?>
	</div>
</section>
<?php endforeach; ?>

<section class="step-2" data-step="2">
	<div class="container">
		<h1><?php _e( 'Choose a design' ); ?></h1>
		<p class="step-description"><?php _e( 'To get started, select from one of the four themes below. You can always change it later (there are 250+ themes to choose from).' ) ?></p>
		<script id="themes_template" type="text/template">
			<% _.each(themes,function(theme) { %>
				<div class="theme" data-theme="<%= theme.stylesheet %>" data-site_type="<%= site_type %>" style="background-image:url('<%= theme.img_preview %>');background-size: 100%;">
					<div class="theme-buttons">
						<a href="<%= theme.demo_url %>" class="button button-large theme-preview" target="_blank"><span class="small-icon fa fa-external-link"></span><?php _e( 'Preview' ) ?></a>
					</div>
				</div>
			<% }); %>
		</script>
		<div class="themes-box"></div>
	</div>
</section>

<?php
global $publicize;
function is_connected( $service ) {
	global $publicize;
	if ( ! is_object( $publicize ) ) {
		return false;
	}
	$connections = $publicize->get_connections( $service );
	return ! empty( $connections );
}
$services = array(
	array( 'name' => 'facebook', 'title' => __( 'Facebook'), 'short' => 'fb' ),
	array( 'name' => 'twitter', 'title' => __( 'Twitter'), 'short' => 'tw' ),
);

$connected = false;
foreach( $services as $key => $service ) {
	if ( ! is_object( $publicize ) ) {
		continue;
	}
	$services[ $key ]['connected'] = is_connected( $service['name'] );
	$services[ $key ]['connect_url'] = $publicize->connect_url( $service['name'] );
	$connected = $services[ $key ]['connected'] || $connected;
}
?>
<section class="step-3" data-step="3">
	<div class="container">
		<h1><?php _e( 'Every website needs an audience!' ) ?></h1>
		<p class="step-description"><?php _e( 'Share your favorite posts effortlessly on Facebook and Twitter.' ) ?></p>
		<div class="social-box">
			<?php foreach( $services as $service ): ?>
				<a href="<?php echo esc_url( $service['connect_url'] ); ?>" class="social-link <?php echo $service['short']; ?><?php if ( $service['connected'] ) : ?> connected<?php endif ?>" target="_top" data-social="<?php echo $service['name'] ?>">
						<span class="wrap">
							<span class="fa fa-<?php echo $service['name']; ?>"></span>
							<span class="title"><?php echo ( $service['connected'] ) ? __( 'Connected' ) : sprintf( __( 'Connect to %s' ), $service['title'] );  ?></span>
						</span>
				</a>
			<?php endforeach; ?>
		</div>
		<?php if ( $connected ) : ?>
			<a href="<?php echo home_url(); ?>" class="button button-primary button-hero submit"><span class="med-icon fa fa-angle-double-right"></span><?php _e( 'All done, visit your site' ) ?></a>
		<?php else : ?>
			<div class="skip"><?php printf( __( 'or, <a href="%s">skip this step</a>'), home_url() ); ?></div>
		<?php endif ?>
	</div>
</section>
</body>
</html>
