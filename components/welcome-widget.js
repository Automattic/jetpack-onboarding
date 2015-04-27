var React = require('react'),
	BackboneReact = require('backbone-react'),
	WelcomeSection = require('./welcome-section'),
	WelcomeMenu = require('./welcome-menu');

module.exports = React.createClass({displayName: "exports",
	// see: http://magalhas.github.io/backbone-react-component/

 	mixins: [Backbone.React.Component.mixin],
  	render: function() {
	    return (
			React.createElement("div", {className: "getting-started"}, 
				React.createElement("div", {className: "getting-started__intro"}, 
					React.createElement("h3", null, "Welcome to your new WordPress site!"), 

					React.createElement("p", {className: "getting-started__subhead"}, "Let's get your new site set up as quickly as possible.")
				), 

				React.createElement(WelcomeSection, {model: this.props.model}), 
				React.createElement(WelcomeMenu, {model: this.props.model})
			)
    	);
	}
});