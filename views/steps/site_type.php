<script type="text/template" id="site_type_template">
<div class="options-box">
	<?php foreach ( Jetpack_Start_Step_Site_Type::get_site_types() as $site_type  ): ?>
		<a href="#setup/step/select_theme" class="option site-type" data-site-type="<?php echo  $site_type['name'] ?>"><span class="big-icon fa <?php echo $site_type['icon_class']; ?>"></span><?php echo $site_type['title']; ?></a>
	<?php endforeach; ?>
</div>
</script>

<script>
	(function( $ ) {
		var StepView = JetpackStartStepView.extend({

			template_id: '#site_type_template',

			siteTypes : new Backbone.Collection( _JetpackStart['site_types'] ),

			selectSiteType: function ( event ) {
				var siteTypeName = $( event.currentTarget ).attr( 'data-site-type' );
				this.siteType = this.siteTypes.findWhere( { name: siteTypeName } )

				jetpackStartWizard.getStep( 'select_theme' ).setThemes( this.siteType.get( 'themes' ) );

				var data = {
					action: 'jetpackstart_set_site_type',
					site_type: siteTypeName
				};

				$.post( _JetpackStart['ajaxurl'], data );
				this.goToNextStep( event );
			},

			events: {
				"click .site-type": "selectSiteType"
			}
		})

		jetpackStartWizard.addStep( new JetpackStartStep({ view: StepView, slug: 'site_type' }));
	}) ( jQuery );
</script>