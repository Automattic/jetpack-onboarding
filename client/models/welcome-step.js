var React = require('react');

// base class for welcome steps
module.exports = Backbone.Model.extend({
	defaults: {
		// has a value been selected / action been taken from within JPS?
		completed: false,
		// has it been viewed?
		viewed: false,
		// has it been skipped?
		skipped: false,
		// is the feature actually configured? (sometimes this is true even if they haven't done the step, e.g. theme)
		configured: false
	},

	initialize: function() {
		if ( this.attributes.slug == null ) {
			this.attributes.slug = this.attributes.name.toLowerCase().replace(/ /g,'-').replace(/[^\w-]+/g,'');
		}
	},
	
	// is this step repeatable? For example, "create admin account" perhaps _should_ only be done once, but "Site Title" can be repeated
	// this is something you'd typically set in a superclass
	repeatable: function() { return true; },

	name: function() { return this.get('name'); },

	slug: function() { return this.get('slug'); },

	status: function() {
		if ( this.get('completed') ) {
			return "completed";
		} else if ( this.get('skipped') ) {
			return "skipped";
		} else { 
			return ""; 
		}
	},

	//this feels weirdly coupled. FIXME
	welcomeView: function() {
		return React.createElement(this.attributes.welcomeView, {model: this});
	}
});