var React = require('react'),
	BackboneReact = require('backbone-react');

module.exports = React.createClass({displayName: "exports",
	mixins: [Backbone.React.Component.mixin],

	render: function() {
		return (
			React.createElement("div", {className: "welcome__section", id: "welcome__site-title"}, 
				React.createElement("h4", null, "Set your site title"), 

				React.createElement("form", null, 
					React.createElement("input", {type: "text", name: "site_title", id: "site-title", autocomplete: "off", value: this.props.model.get('title'), 
					       placeholder: "Site Title (this can be changed later)"}), 					       

					React.createElement("p", {className: "submit"}, 
						React.createElement("input", {type: "submit", name: "save", className: "button button-primary button-large", value: "Save"}), 
						React.createElement("a", {className: "skip", href: "#"}, "Skip this step")
					)
				), 
				React.createElement("div", {className: "welcome__helper"}, 
					"Stuck? Here are some ideas to get you going:", 
					React.createElement("ul", null, 
						React.createElement("li", null, 
							React.createElement("small", null, React.createElement("em", null, "Your company name: \"ACME Consulting\""))
						), 
						React.createElement("li", null, 
							React.createElement("small", null, 
								React.createElement("em", null, "What you do: \"Quality gardening tools by ACME\"")
							)
						), 
						React.createElement("li", null, 
							React.createElement("small", null, 
								React.createElement("em", null, "What you will write about: \"Richard\\'s Travel Blog\"")
							)
						)
					)
				)
			)
		);
	}
});