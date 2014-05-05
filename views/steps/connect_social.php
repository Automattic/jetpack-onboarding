<p class="step-description"><?php _e( 'Share your favorite posts effortlessly on Facebook and Twitter.', 'jetpack-start' ) ?></p>
		<div class="social-box">
			<?php $connected = false; ?>
			<?php foreach( Jetpack_Start_Step_Connect_Social::get_social_services() as $service ): ?>
				<a href="<?php echo esc_url( $service['connect_url'] ); ?>" class="social-link <?php echo $service['short']; ?><?php if ( $service['connected'] ) : ?> connected<?php endif ?>" target="_top" data-social="<?php echo $service['name'] ?>">
						<span class="wrap">
							<span class="fa fa-<?php echo $service['name']; ?>"></span>
							<span class="title"><?php echo ( $service['connected'] ) ? __( 'Connected', 'jetpack-start' ) : sprintf( __( 'Connect to %s', 'jetpack-start' ), $service['title'] );  ?></span>
						</span>
				</a>
			<?php
				if ( $service['connected'] ) $connected = true;
			endforeach; ?>
		</div>


		<?php if ( $connected ) : ?>
			<a href="<?php echo home_url(); ?>" class="button button-primary button-hero submit"><span class="med-icon fa fa-angle-double-right"></span><?php _e( 'All done, visit your site', 'jetpack-start' ) ?></a>
		<?php else : ?>
			<div class="skip"><?php printf( __( 'or, <a href="%s">skip this step</a>', 'jetpack-start' ), home_url() ); ?></div>
		<?php endif ?>
