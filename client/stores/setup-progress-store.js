/*
 * Store which manages and persists setup wizard progress
 */

var AppDispatcher = require('../dispatcher/app-dispatcher'),
  EventEmitter = require('events').EventEmitter,
  JPSConstants = require('../constants/jetpack-start-constants'),
  Paths = require('../constants/jetpack-start-paths'),
  assign = require('object-assign'),
  WPAjax = require('../utils/wp-ajax'),
  FlashActions = require('../actions/flash-actions');

var CHANGE_EVENT = 'change';

//XXX TODO: maybe this should just be plain JSON
var _steps = [
  {
    name: "Sign up",
    completed: true,
    repeatable: false
  },
  {
    name: 'Create admin account',
    completed: true,
    repeatable: false
  },
  {
    name: 'Verify email address',
    completed: true,
    repeatable: false
  },
  {
    name: 'Site title',
    slug: Paths.SITE_TITLE_STEP_SLUG,
    repeatable: true,
    welcomeView: require('../components/site-title-step.jsx')
  },
  {
    name: 'Pick a layout',
    slug: Paths.LAYOUT_STEP_SLUG,
    repeatable: true,
    welcomeView: require('../components/layout-step.jsx')
  },
  {
    name: 'Stats & Monitoring',
    slug: Paths.STATS_MONITORING_STEP_SLUG,
    repeatable: true,
    welcomeView: require('../components/stats-monitoring-step.jsx'),
  },
  { 
    name: "Pick a design", 
    slug: Paths.DESIGN_STEP_SLUG,
    repeatable: true,
    welcomeView: require('../components/design-step.jsx'), 
    themes: JPS.themes
  },
  { 
    name: "Get some traffic", 
    slug: Paths.TRAFFIC_STEP_SLUG,
    repeatable: true,
    welcomeView: require('../components/get-traffic-step.jsx') 
  },
  { 
    name: "Advanced settings", 
    slug: Paths.ADVANCED_STEP_SLUG,
    repeatable: true,
    welcomeView: require('../components/advanced-settings-step.jsx')
  }
];

// set the completion status of each step from JPS.step_status hash
_steps.forEach( function(step) {
  if ( typeof step.completed == 'undefined' ) {
    step.completed = JPS.step_status[step.slug] || false;  
  }
}); 

// set location to first pending step, if not set
ensureValidStepSlug();  

function complete(step) {

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

function skip(step) {

}

function next(step) {
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
  var pendingStep = _.findWhere( _steps, { completed: false } );
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
    return getStepFromSlug( currentStepSlug() );
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
      next(action.slug);
      SetupProgressStore.emitChange();
      break;

    case JPSConstants.STEP_COMPLETE:
      complete(action.slug);
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