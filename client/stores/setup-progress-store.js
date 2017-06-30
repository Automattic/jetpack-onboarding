/*
 * Store which manages and persists setup wizard progress
 */

var AppDispatcher = require('../dispatcher/app-dispatcher'),
  EventEmitter = require('events').EventEmitter,
  JPSConstants = require('../constants/jetpack-onboarding-constants');

var urlTools = require( 'url' );

var CHANGE_EVENT = 'change';

var _steps, _started = JPS.started; 

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

    // set to 'true' if you want the wizard to move to this step even if it's been completed
    // by default completed steps are skipped
    if ( typeof( step.neverSkip ) === 'undefined' ) {
      step.neverSkip = false;
    }

    // default value for includeInProgress
    if ( typeof( step.includeInProgress ) === 'undefined') {
      step.includeInProgress = true;
    }

    if ( typeof( step.enabled ) === 'undefined' ) {
      step.enabled = (JPS.step_enabled[step.slug]) || false;  
    }
  }); 
  
  _steps = steps;
  
  // set location to first pending step, if not set
  ensureValidStepSlug(); 
}

function setStarted() {
  _started = true;
  selectNextPendingStep();
}

function complete(stepSlug) {
  var step = getStepFromSlug(stepSlug);
  step.completed = true;
  step.skipped = false;
}

function skip() {
  var stepSlug = currentStepSlug();
  var step = getStepFromSlug(stepSlug);
  step.skipped = true;
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

function getUrlWithStepHash( hash ) {
  var url = urlTools.parse( window.location.href );
  return url.path + '#' + hash;
}

function ensureValidStepSlug() {
  var stepSlug = currentStepSlug();
  if ( ! ( stepSlug && getStepFromSlug( stepSlug ) ) ) {

    var pendingStep = getNextPendingStep();
    if ( pendingStep !== null ) {
      var hash = 'welcome/steps/'+pendingStep.slug;
      window.history.pushState(null, document.title, getUrlWithStepHash( hash ) );
    }    
  }
}

function selectNextPendingStep() {
  var pendingStep = getNextPendingStep();
  if ( pendingStep !== null ) {
    select(pendingStep.slug); // also sets the window location hash
  }
}

function getNextPendingStep() {
  // if the _next_ step is neverSkip, we proceed to it
  var stepIndex = currentStepIndex();
  if ( stepIndex !== false ) {
    if ( _steps[stepIndex+1] && _steps[stepIndex+1].enabled && _steps[stepIndex+1].neverSkip === true ) {
      return _steps[stepIndex+1];
    }
  }

  // otherwise find the next uncompleted, unskipped step
  var nextPendingStep = _.findWhere( _steps, { enabled: true, completed: false, skipped: false } );
  return nextPendingStep;
}

function getPendingStepAfter( fromStep ) {

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

function currentStepIndex() {
  var slug = currentStepSlug();
  return getStepIndex(slug);
}

function getStepIndex(slug) {
  for ( var i=0; i<_steps.length; i++ ) {
    if ( _steps[i].slug === slug ) {
      return i;
    }
  }
  return false;
}

function select(stepSlug) {
  var hash = 'welcome/steps/'+stepSlug;
  window.history.pushState(null, document.title, getUrlWithStepHash( hash ) );
}

//reset everything back to defaults
function reset() {
  JPS.step_status = {};
  _.where( _steps, { static: false} ).forEach( function ( step ) { 
    step.completed = false;
    step.skipped = false;
  } );
  _started = false;
}

var SetupProgressStore = _.extend({}, EventEmitter.prototype, {

  init: function(steps) {
    setSteps(steps);
  },

  getAllSteps: function() {
    return _steps;
  },

  isNewUser: function() {
    return !_started;
  },

  emitChange: function() {
    this.emit( CHANGE_EVENT );
  },

  getCurrentStep: function() {
    return getStepFromSlug( currentStepSlug() );
  },

  getNextPendingStep: function() {
    return getNextPendingStep(); // delegate
  },

  getStepFromSlug: function(slug) {
    return getStepFromSlug( slug ); // delegate
  },

  getProgressPercent: function() {
  	var numSteps = _.where( _steps, { includeInProgress: true } ).length;
    var completedSteps = _.where( _steps, { includeInProgress: true, completed: true } ).length;
    var percentComplete = (completedSteps / numSteps) * 90 + 10;
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

// force a navigation refresh when the URL changes
window.addEventListener("popstate", function(){
    SetupProgressStore.emitChange();
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  
  switch(action.actionType) {
    case JPSConstants.STEP_GET_STARTED:
      setStarted();
      SetupProgressStore.emitChange();
      break;

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