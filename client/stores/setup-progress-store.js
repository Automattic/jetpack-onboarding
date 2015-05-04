/*
 * Store which manages and persists setup wizard progress
 */

var AppDispatcher = require('../dispatcher/app-dispatcher'),
  EventEmitter = require('events').EventEmitter,
  JPSConstants = require('../constants/jetpack-start-constants'),
  Paths = require('../constants/jetpack-start-paths'),
  WPAjax = require('../utils/wp-ajax'),
  FlashActions = require('../actions/flash-actions');

var CHANGE_EVENT = 'change';

//XXX TODO: maybe this should just be plain JSON
var _steps;

function setSteps(steps) {
  // set the completion status of each step from JPS.step_status hash
  steps.forEach( function(step) {
    if ( typeof step.completed == 'undefined' ) {
      step.skipped = false;
      step.completed = JPS.step_status[step.slug] || false;  
    }
  }); 
  
  _steps = steps;
  
  // set location to first pending step, if not set
  ensureValidStepSlug(); 
}

function complete(step) {

  if ( ! getStepFromSlug(step).completed ) {
    WPAjax.post(JPS.step_actions.complete, { step: step })
      .done( function(data) {
        //XXX TODO: set completion data from response
        getStepFromSlug(step).completed = true;
        selectNextPendingStep();
      })
      .fail( function(msg) {
        FlashActions.error(msg);
      });  
  }
}

function skip() {
  getStepFromSlug( currentStepSlug() ).skipped = true;
  next();
}

function next() {
  selectNextPendingStep();
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
  if ( window.location.hash.startsWith('#welcome/steps')) {
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
    this.emit(CHANGE_EVENT);
  },

  getCurrentStep: function() {
    return getStepFromSlug( currentStepSlug() );
  },

  getProgressPercent: function() {
  	var numSteps = _steps.length;
    var completedSteps = _.where(_steps, {completed: true}).length;
    var percentComplete = (completedSteps / numSteps) * 100;

    return Math.round(percentComplete / 10) * 10;
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
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
      next();
      SetupProgressStore.emitChange();
      break;

    case JPSConstants.STEP_COMPLETE:
      complete(action.slug);
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