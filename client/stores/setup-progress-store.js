/*
 * Store which manages and persists setup wizard progress
 */

var AppDispatcher = require('../dispatcher/app-dispatcher');
var EventEmitter = require('events').EventEmitter;
var JPSConstants = require('../constants/jetpack-start-constants');
var DummyWelcomeStepModel = require('../models/dummy-welcome-step'),
	SiteTitleStepModel = require('../models/site-title-step'),
	LayoutStepModel = require('../models/layout-step'),
	StatsMonitoringStepModel = require('../models/stats-monitoring-step'),
	DesignStepModel = require('../models/design-step'),
	GetTrafficStepModel = require('../models/get-traffic-step'),
	AdvancedSettingsStepModel = require('../models/advanced-settings-step');
var assign = require('object-assign');


var CHANGE_EVENT = 'change';

var _steps = [
	new DummyWelcomeStepModel({ name: "Sign up" }),
	new DummyWelcomeStepModel({ name: "Create admin account" }),
	new DummyWelcomeStepModel({ name: "Verify email address" }),
	new SiteTitleStepModel(),
	new LayoutStepModel(),
	new StatsMonitoringStepModel(),
	new DesignStepModel(),
	new GetTrafficStepModel(),
	new AdvancedSettingsStepModel()
];

var currentStepSlug;

var pendingStep = _.findWhere( _steps, { completed: false } );
if ( pendingStep != null ) {
  currentStepSlug = pendingStep.slug(); // also sets the window location hash
}

function complete(step) {

}

function skip(step) {

}

function select(stepSlug) {
  currentStepSlug = stepSlug;
}

var SetupProgressStore = assign({}, EventEmitter.prototype, {

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  areAllComplete: function() {
    var complete = true;
    _.each( _steps ), function( step ) {
      if ( ! step.complete() ) {
        complete = false;
      }
    }
    return complete;
  },

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getAllSteps: function() {
    return _steps;
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  getCurrentStep: function() {
    var currentStep;
    _.each( _steps, function( step ) {
      if( step.slug() == currentStepSlug ) {
        currentStep = step;
      }
    });
    return currentStep;
  },

  getProgressPercent: function() {
  	var numSteps = _steps.length;
    var completedSteps = _.where(_steps, {completed: true}).length;
    var percentComplete = (completedSteps / numSteps) * 100;

    return Math.round(percentComplete / 10) * 10;
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case JPSConstants.STEP_SELECT:
      select(action.slug);
      SetupProgressStore.emitChange();
      break;

    case JPSConstants.STEP_COMPLETE:
      complete(action.text);
      SetupProgressStore.emitChange();
      break;

    case JPSConstants.STEP_SKIPPED:
      skip(action.text);
      SetupProgressStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = SetupProgressStore;