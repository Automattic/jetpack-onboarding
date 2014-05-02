<div class="options-box">
	<?php foreach ( self::get_site_types() as $site_type  ): ?>
		<a href="#setup/step/2/<?php echo $site_type['name']; ?>" class="option"><span class="big-icon fa <?php echo $site_type['icon_class']; ?>"></span><?php echo $site_type['title']; ?></a>
	<?php endforeach; ?>
</div>
