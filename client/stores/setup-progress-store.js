/*
 * Store which manages and persists setup wizard progress
 */

var AppDispatcher = require('../dispatcher/app-dispatcher'),
  EventEmitter = require('events').EventEmitter,
  JPSConstants = require('../constants/jetpack-start-constants'),
  Paths = require('../constants/jetpack-start-paths'),
  WPAjax = require('../utils/wp-ajax'),
  FlashActions = require('../actions/flash-actions'),
  SpinnerActions = require('../actions/spinner-actions');

var CHANGE_EVENT = 'change';

var _steps;

function setSteps(steps) {

  // set the completion status of each step to the saved values
  steps.forEach( function(step) {
    // default values for skipped, completed and static
    if ( typeof( step.completed ) === 'undefined' ) {
      step.completed = (JPS.step_status[step.slug] && JPS.step_status[step.slug].completed) || false;  
    }

    if ( typeof( step.skipped ) === 'undefined' ) {
      step.skipped = (JPS.step_status[step.slug] && JPS.step_status[step.slug].skipped) || false;  
    }

    if ( typeof( step.static ) === 'undefined' ) {
      step.static = false;
    }

    // default value for includeInProgress
    if ( typeof( step.includeInProgress ) === 'undefined') {
      step.includeInProgress = true;
    }
  }); 
  
  _steps = steps;
  
  // set location to first pending step, if not set
  ensureValidStepSlug(); 
}

function complete(stepSlug, opts) {

  var force = (typeof(opts) === 'undefined') ? false : opts.force;

  var step = getStepFromSlug(stepSlug);

  if ( ! step.completed ) {
    SpinnerActions.show();
    WPAjax.
      post(JPS.step_actions.complete, { step: stepSlug }).
      done( function(data) {
        //XXX TODO: set completion data from response
        step.completed = true;
        step.skipped = false;
        selectNextPendingStep();
      }).
      fail( function(msg) {
        FlashActions.error(msg);
      }).
      always( function() { 
        SpinnerActions.hide(); 
        SetupProgressStore.emitChange(); 
      });
  } else if ( force ) {
    step.skipped = false;
    selectNextPendingStep();
  }
}

function skip() {
  var stepSlug = currentStepSlug();
  var step = getStepFromSlug(stepSlug);

  if ( ! step.skipped ) {
    SpinnerActions.show();
    WPAjax.
      post(JPS.step_actions.skip, { step: stepSlug }).
      done( function(data) {
        //XXX TODO: set completion data from response
        step.skipped = true;
        selectNextPendingStep();
      }).
      fail( function(msg) {
        FlashActions.error(msg);
      }).
      always( function() { 
        SpinnerActions.hide(); 
        SetupProgressStore.emitChange(); 
      });
  }
}

function getStepFromSlug( stepSlug ) {
  var currentStep = null;
  _.each( _steps, function( step ) {
    if( step.slug === stepSlug ) {
      currentStep = step;
    }
  });
  return currentStep;
}

function ensureValidStepSlug() {
  var stepSlug = currentStepSlug();
  if ( ! ( stepSlug && getStepFromSlug( stepSlug ) ) ) {
    selectNextPendingStep();
  }
}

function selectNextPendingStep() {
  var pendingStep = _.findWhere( _steps, { completed: false, skipped: false } );
  if ( pendingStep != null ) {
    select(pendingStep.slug); // also sets the window location hash
  }
}

function currentStepSlug() {
  if ( window.location.hash.indexOf('#welcome/steps') === 0 ) {
    var parts = window.location.hash.split('/');
    var stepSlug = parts[parts.length-1];
    return stepSlug;
  } else {
    return null;
  }
}

function select(stepSlug) {
  window.location.hash = 'welcome/steps/'+stepSlug;
}

//reset everything back to defaults
function reset() {
  JPS.step_status = {};
  _.where( _steps, { static: false} ).forEach( function ( step ) { 
    step.completed = false;
    step.skipped = false;
  } );
}

var SetupProgressStore = _.extend({}, EventEmitter.prototype, {

  init: function(steps) {
    setSteps(steps);
  },

  areAllComplete: function() {
    var complete = true;
    _.each( _steps ), function( step ) {
      if ( ! step.complete() ) {
        complete = false;
      }
    }
    return complete;
  },

  getAllSteps: function() {
    return _steps;
  },

  emitChange: function() {
    this.emit( CHANGE_EVENT );
  },

  getCurrentStep: function() {
    return getStepFromSlug( currentStepSlug() );
  },

  getProgressPercent: function() {
  	var numSteps = _.where( _steps, { includeInProgress: true } ).length;
    var completedSteps = _.where( _steps, { includeInProgress: true, completed: true } ).length;
    var percentComplete = (completedSteps / numSteps) * 100;
    var output = Math.round(percentComplete / 10) * 10;
    return output;
  },

  addChangeListener: function(callback) {
    this.on( CHANGE_EVENT, callback );
  },

  removeChangeListener: function(callback) {
    this.removeListener( CHANGE_EVENT, callback );
  }
});

// Update the UI when the window hash changes
// jQuery(window).on('hashchange', function() {
//   SetupProgressStore.emitChange();
// });

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case JPSConstants.STEP_SELECT:
      select(action.slug);
      SetupProgressStore.emitChange();
      break;

    case JPSConstants.STEP_NEXT:
      selectNextPendingStep();
      SetupProgressStore.emitChange();
      break;

    case JPSConstants.STEP_COMPLETE:
      complete(action.slug);
      SetupProgressStore.emitChange();
      break;

    case JPSConstants.STEP_COMPLETE_AND_NEXT:
      complete(action.slug, {force: true});
      SetupProgressStore.emitChange();
      break;

    case JPSConstants.RESET_DATA:
      reset();
      SetupProgressStore.emitChange();
      break;

    case JPSConstants.STEP_SKIP:
      skip();
      SetupProgressStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = SetupProgressStore;