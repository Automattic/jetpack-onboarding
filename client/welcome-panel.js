var React = require('react'),
    WelcomeWidget = require('./components/welcome-widget.jsx'),
    Paths = require('./constants/jetpack-start-paths'),
    SetupProgressStore = require('./stores/setup-progress-store');

module.exports = function() {
    jQuery(document).ready(function () {

    	SetupProgressStore.init([
			{
			  name: "Sign up",
			  completed: true,
			  repeatable: false
			},
			{
			  name: 'Create admin account',
			  completed: true,
			  repeatable: false
			},
			{
			  name: 'Verify email address',
			  completed: true,
			  repeatable: false
			},
			{
			  name: 'Site title',
			  slug: Paths.SITE_TITLE_STEP_SLUG,
			  repeatable: true,
			  welcomeView: require('./components/site-title-step.jsx')
			},
			{
			  name: 'Pick a layout',
			  slug: Paths.LAYOUT_STEP_SLUG,
			  repeatable: true,
			  welcomeView: require('./components/layout-step.jsx')
			},
			{
			  name: 'Stats & Monitoring',
			  slug: Paths.STATS_MONITORING_STEP_SLUG,
			  repeatable: true,
			  welcomeView: require('./components/stats-monitoring-step.jsx'),
			},
			{ 
			  name: "Pick a design", 
			  slug: Paths.DESIGN_STEP_SLUG,
			  repeatable: true,
			  welcomeView: require('./components/design-step.jsx'), 
			  themes: JPS.themes
			},
			{ 
			  name: "Get some traffic", 
			  slug: Paths.TRAFFIC_STEP_SLUG,
			  repeatable: true,
			  welcomeView: require('./components/get-traffic-step.jsx') 
			},
			{ 
			  name: "Advanced settings", 
			  slug: Paths.ADVANCED_STEP_SLUG,
			  repeatable: true,
			  welcomeView: require('./components/advanced-settings-step.jsx')
			}
		]);

        React.render(
          React.createElement(WelcomeWidget, {}), document.getElementById('jps-welcome-panel')
        );
    });
}