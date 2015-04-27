var React = require('react'),
	BackboneReact = require('backbone-react');

module.exports = React.createClass({
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			<h3>View for Layout</h3>
		);
	}
});