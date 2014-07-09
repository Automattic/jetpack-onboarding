<?php if ( ! defined( 'ABSPATH' ) ) exit; ?>
<!DOCTYPE html>
<html>
<head>
	<meta http-equiv="content-type" content="text/html; charset=utf-8" />
	<title><?php _e( 'Jetpack Start', 'jetpack-start' ); ?></title>
	<meta name="viewport" content="width=device-width">

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
		<ul></ul>
	</div>
</header>

<div id="wizard"></div>

<script id="step-template" type="text/template">
<section class="step">
	<div class="container">
	</div>
</section>
</script>

<?php foreach ( $steps as $step ) : ?>
	<?php do_action( "jetpack-start_step-{$step->slug}", $step ); ?>
<?php endforeach; ?>

</body>
</html>
