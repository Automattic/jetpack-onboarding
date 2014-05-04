<div class="options-box">
	<?php foreach ( self::get_site_types() as $site_type  ): ?>
		<a href="#setup/step/select_theme" class="option site-type" data-site-type="<?php echo  $site_type['name'] ?>"><span class="big-icon fa <?php echo $site_type['icon_class']; ?>"></span><?php echo $site_type['title']; ?></a>
	<?php endforeach; ?>
</div>
