var React = require('react'),
    BackboneReact = require('backbone-react'),
    WelcomeWidget = require('./components/welcome-widget.jsx');

module.exports = function() {
    jQuery(document).ready(function () {
        React.render(
          React.createElement(WelcomeWidget, {}), document.getElementById('jps-welcome-panel')
        );
    });
}