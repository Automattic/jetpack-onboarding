var WelcomeStepModel = require('./welcome-step'),
  StatsMonitoringStepView = require('../components/stats-monitoring-step.jsx');

module.exports = WelcomeStepModel.extend({
  defaults: _.extend({}, WelcomeStepModel.prototype.defaults, { name: "Stats & Monitoring", welcomeView: StatsMonitoringStepView })
});