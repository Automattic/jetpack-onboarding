var React = require('react'),
    WelcomeWidget = require('./components/welcome-widget.jsx'),
    Paths = require('./constants/jetpack-start-paths'),
    SetupProgressStore = require('./stores/setup-progress-store'),
    DataStore = require('./stores/data-store');

module.exports = function() {
    jQuery(document).ready(function () {

    	SetupProgressStore.init([
    		// NOTE: You can have "static: true" to include un-clickable 
    		// prefilled steps that act as though they've already been completed
			// {
			// 	name: "Sign up",
			// 	completed: true,
			// 	static: true
			// },
			{
				name: 'Site title',
				slug: Paths.SITE_TITLE_STEP_SLUG,
				welcomeView: require('./components/site-title-step.jsx')
			},
			{
				name: 'Pick a layout',
				slug: Paths.LAYOUT_STEP_SLUG,
				welcomeView: require('./components/layout-step.jsx')
			},
			{ 
				name: "Pick a design", 
				slug: Paths.DESIGN_STEP_SLUG,
				welcomeView: require('./components/design-step.jsx'), 
			},
			{
				name: 'Enable modules',
				slug: Paths.JETPACK_MODULES_STEP_SLUG,
				welcomeView: require('./components/jetpack-jumpstart-step.jsx')
			},
			{ 
				name: "Advanced settings", 
				slug: Paths.ADVANCED_STEP_SLUG,
				welcomeView: require('./components/advanced-settings-step.jsx'),
				includeInProgress: false
			}
		]);

        React.render(
          React.createElement(WelcomeWidget, {}), document.getElementById('jps-welcome-panel')
        );
    });
}