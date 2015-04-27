var React = require('react'),
	BackboneReact = require('backbone-react');

module.exports = React.createClass({displayName: "exports",
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			React.createElement("h3", null, "View for Layout")
		);
	}
});