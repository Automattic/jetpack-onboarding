var React = require('react'),
	WelcomeSection = require('./welcome-section.jsx'),
	WelcomeMenu = require('./welcome-menu.jsx'),
	WelcomeProgressBar = require('./welcome-progress-bar.jsx');

module.exports = React.createClass({
	// see: http://magalhas.github.io/backbone-react-component/

 	mixins: [Backbone.React.Component.mixin],
  	render: function() {
	    return (
			<div className="getting-started">
				<div className="getting-started__intro">
					<h3>You're almost done!</h3>

					<p className="getting-started__subhead">Take these steps to supercharge your WordPress site.</p>
				</div>

				<WelcomeSection model={this.props.model}/>
				<WelcomeMenu model={this.props.model}/>
			</div>
    	);
	}
});