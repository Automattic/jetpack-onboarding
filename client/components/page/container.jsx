var React = require( 'react' );

var WelcomeSection = React.createClass( {
	render: function() {
		var { ...other } = this.props;
		return (
			<div { ...other } className="welcome__section">
				{ this.props.children }
			</div>
		);
	}
} );

module.exports = WelcomeSection;
