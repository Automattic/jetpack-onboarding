var React = require( 'react' ),
	WelcomeWidget = require( './components/page' ),
	Paths = require( './constants/jetpack-onboarding-paths' ),
	SetupProgressStore = require( 'stores/setup-progress-store' );

module.exports = function() {
	jQuery( document ).ready( function () {

		SetupProgressStore.init( [
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
				welcomeView: require('./components/steps/site-title')
			},
			{
				name: 'Is this a blog?',
				slug: Paths.IS_BLOG_STEP_SLUG,
				welcomeView: require('./components/steps/layout')
			},
			{
				name: 'Set your homepage',
				slug: Paths.HOMEPAGE_STEP_SLUG,
				welcomeView: require('./components/steps/homepage')
			},
			{
				name: "Contact Info",
				slug: Paths.CONTACT_PAGE_STEP_SLUG,
				welcomeView: require('./components/steps/contact')
			},
			{
				name: 'Enable Jetpack',
				slug: Paths.JETPACK_MODULES_STEP_SLUG,
				neverSkip: true, // don't skip this even if it's been completed
				welcomeView: require('./components/steps/jetpack-jumpstart'),
			},
			{
				name: "Review settings",
				slug: Paths.REVIEW_STEP_SLUG,
				welcomeView: require('./components/steps/review'),
				includeInProgress: false
			}
		] );

		React.render(
			React.createElement( WelcomeWidget, {} ), document.getElementById( 'jpo-welcome-panel' )
		);
	} );
};