<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title><?php _e( 'Jetpack Start', 'jetpack-start' ); ?></title>

	<link rel="stylesheet" type="text/css" href="<?php echo JETPACK_START_BASE_URL .  '/css/jetpack-start.css'; ?>" /> 
	<link rel="stylesheet" type="text/css" href="//fonts.googleapis.com/css?family=Open+Sans:400italic,400,600,700">
	<link rel="stylesheet" type="text/css" href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css">

	<?php wp_print_scripts(); ?>
</head>
<body>

<?php $steps = Jetpack_Start::get_steps(); ?>

<header>
	<span class="genericon genericon-wordpress"></span>
	<div class="progress">
		<span><?php _e( 'WordPress Setup Wizard', 'jetpack-start' ) ?></span>
		<ul>
		<?php foreach ( $steps as $step ) : extract($step); ?>
			<li data-step="<?php echo esc_attr( $slug ); ?>" title="<?php echo esc_attr( $label ); ?>"></li>
		<?php endforeach; ?>
		</ul>
	</div>
</header>

<div id="wizard"></div>

<script id="step-template" type="text/template">
<section class="step" data-step="<?php echo esc_attr( $slug ); ?>">
	<div class="container">
		<?php if ( ! empty( $label ) ) : ?>
			<h1><?php echo esc_html( $label ); ?></h1>
		<?php endif; ?>
	</div>
</section>
</script>

<?php foreach ( $steps as $step ) : extract($step); ?>
	<?php do_action( "jetpack-start_step-{$slug}" ); ?>
<?php endforeach; ?>

</body>
</html>
