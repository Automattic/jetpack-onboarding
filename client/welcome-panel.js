var React = require('react'),
    BackboneReact = require('backbone-react'),
    WelcomeWidget = require('./components/welcome-widget.jsx'),
    WelcomeWizardModel = require('./models/welcome-wizard');

module.exports = function() {
    jQuery(document).ready(function () {
        React.render(
          React.createElement(WelcomeWidget, {model: new WelcomeWizardModel()}), document.getElementById('jps-welcome-panel')
        );
    });
}