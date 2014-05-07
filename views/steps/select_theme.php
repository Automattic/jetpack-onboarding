<p class="step-description"><?php _e( 'To get started, select from one of the four themes below. You can always change it later (there are over 250 themes to choose from).', 'jetpack-start' ) ?></p>
		<div class="themes-box"></div>

		<script id="themes_template" type="text/template">
			<% _.each( themes, function( theme ) { %>
				<div class="theme" data-theme="<%= theme.stylesheet %>" data-site-type="<%= site_type %>" style="background-image:url('<%= theme.img_preview %>');background-size: 100%;">
					<div class="theme-buttons">
						<a href="<%= theme.demo_url %>" class="button button-large theme-preview" target="_blank"><span class="small-icon fa fa-external-link"></span><?php _e( 'Preview', 'jetpack-start' ) ?></a>
						<a href="" class="button button-primary button-large theme-select"><span class="small-icon fa fa-arrow-circle-o-right"></span><?php _e( 'Select Theme', 'jetpack-start' ) ?></a>
					</div>
				</div>
			<% }); %>
		</script>


