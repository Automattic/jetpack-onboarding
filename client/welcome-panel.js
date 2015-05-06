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
			  static: true
			},
			{
			  name: 'Create admin account',
			  completed: true,
			  static: true
			},
			{
			  name: 'Verify email address',
			  completed: true,
			  static: true
			},
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
			  name: 'Stats & Monitoring',
			  slug: Paths.STATS_MONITORING_STEP_SLUG,
			  welcomeView: require('./components/stats-monitoring-step.jsx'),
			},
			{ 
			  name: "Pick a design", 
			  slug: Paths.DESIGN_STEP_SLUG,
			  welcomeView: require('./components/design-step.jsx'), 
			  themes: JPS.themes
			},
			{ 
			  name: "Get some traffic", 
			  slug: Paths.TRAFFIC_STEP_SLUG,
			  welcomeView: require('./components/get-traffic-step.jsx') 
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