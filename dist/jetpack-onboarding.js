webpackJsonp([1],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var WelcomePanel = __webpack_require__(3);
	
	WelcomePanel();

/***/ },
/* 1 */,
/* 2 */,
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4),
	    ReactDOM = __webpack_require__(156),
	    WelcomeWidget = __webpack_require__(157),
	    Paths = __webpack_require__(167),
	    SetupProgressStore = __webpack_require__(158);
	
	module.exports = function () {
		jQuery(document).ready(function () {
	
			SetupProgressStore.init([
			// NOTE: You can have "static: true" to include un-clickable
			// prefilled steps that act as though they've already been completed
			// {
			// 	name: "Sign up",
			// 	completed: true,
			// 	static: true
			// },
			{
				name: 'Site title',
				slug: Paths.SITE_TITLE_STEP_SLUG,
				welcomeView: __webpack_require__(213)
			}, {
				name: 'Is this a blog?',
				slug: Paths.IS_BLOG_STEP_SLUG,
				welcomeView: __webpack_require__(215)
			}, {
				name: 'Set your homepage',
				slug: Paths.HOMEPAGE_STEP_SLUG,
				welcomeView: __webpack_require__(216)
			}, {
				name: "Contact Info",
				slug: Paths.CONTACT_PAGE_STEP_SLUG,
				welcomeView: __webpack_require__(217)
			}, {
				name: 'Enable Jetpack',
				slug: Paths.JETPACK_MODULES_STEP_SLUG,
				neverSkip: true, // don't skip this even if it's been completed
				welcomeView: __webpack_require__(218)
			}, {
				name: "Review settings",
				slug: Paths.REVIEW_STEP_SLUG,
				welcomeView: __webpack_require__(221),
				includeInProgress: false
			}]);
	
			ReactDOM.render(React.createElement(WelcomeWidget, {}), document.getElementById('jpo-welcome-panel'));
		});
	};

/***/ },
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */,
/* 18 */,
/* 19 */,
/* 20 */,
/* 21 */,
/* 22 */,
/* 23 */,
/* 24 */,
/* 25 */,
/* 26 */,
/* 27 */,
/* 28 */,
/* 29 */,
/* 30 */,
/* 31 */,
/* 32 */,
/* 33 */,
/* 34 */,
/* 35 */,
/* 36 */,
/* 37 */,
/* 38 */,
/* 39 */,
/* 40 */,
/* 41 */,
/* 42 */,
/* 43 */,
/* 44 */,
/* 45 */,
/* 46 */,
/* 47 */,
/* 48 */,
/* 49 */,
/* 50 */,
/* 51 */,
/* 52 */,
/* 53 */,
/* 54 */,
/* 55 */,
/* 56 */,
/* 57 */,
/* 58 */,
/* 59 */,
/* 60 */,
/* 61 */,
/* 62 */,
/* 63 */,
/* 64 */,
/* 65 */,
/* 66 */,
/* 67 */,
/* 68 */,
/* 69 */,
/* 70 */,
/* 71 */,
/* 72 */,
/* 73 */,
/* 74 */,
/* 75 */,
/* 76 */,
/* 77 */,
/* 78 */,
/* 79 */,
/* 80 */,
/* 81 */,
/* 82 */,
/* 83 */,
/* 84 */,
/* 85 */,
/* 86 */,
/* 87 */,
/* 88 */,
/* 89 */,
/* 90 */,
/* 91 */,
/* 92 */,
/* 93 */,
/* 94 */,
/* 95 */,
/* 96 */,
/* 97 */,
/* 98 */,
/* 99 */,
/* 100 */,
/* 101 */,
/* 102 */,
/* 103 */,
/* 104 */,
/* 105 */,
/* 106 */,
/* 107 */,
/* 108 */,
/* 109 */,
/* 110 */,
/* 111 */,
/* 112 */,
/* 113 */,
/* 114 */,
/* 115 */,
/* 116 */,
/* 117 */,
/* 118 */,
/* 119 */,
/* 120 */,
/* 121 */,
/* 122 */,
/* 123 */,
/* 124 */,
/* 125 */,
/* 126 */,
/* 127 */,
/* 128 */,
/* 129 */,
/* 130 */,
/* 131 */,
/* 132 */,
/* 133 */,
/* 134 */,
/* 135 */,
/* 136 */,
/* 137 */,
/* 138 */,
/* 139 */,
/* 140 */,
/* 141 */,
/* 142 */,
/* 143 */,
/* 144 */,
/* 145 */,
/* 146 */,
/* 147 */,
/* 148 */,
/* 149 */,
/* 150 */,
/* 151 */,
/* 152 */,
/* 153 */,
/* 154 */,
/* 155 */,
/* 156 */,
/* 157 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4),
	    SetupProgressStore = __webpack_require__(158),
	    SetupProgressActions = __webpack_require__(166),
	    SpinnerStore = __webpack_require__(174),
	    SpinnerActions = __webpack_require__(173),
	    DataStore = __webpack_require__(175),
	    Flash = __webpack_require__(176),
	    GetStarted = __webpack_require__(178);
	
	function getSetupProgress() {
		return {
			newUser: SetupProgressStore.isNewUser(),
			showSpinner: SpinnerStore.showing(),
			spinnerMessage: SpinnerStore.getMessage(),
			currentStep: SetupProgressStore.getCurrentStep(),
			allSteps: SetupProgressStore.getAllSteps(),
			progressPercent: SetupProgressStore.getProgressPercent()
		};
	}
	
	// TODO: visual "saving" for this.state.saving
	module.exports = React.createClass({
		displayName: 'WelcomeWidget',
	
		componentDidMount: function componentDidMount() {
			SetupProgressStore.addChangeListener(this._onChange);
			SpinnerStore.addChangeListener(this._onSpinnerChange);
			DataStore.addChangeListener(this._onDataChange);
		},
	
		componentWillUnmount: function componentWillUnmount() {
			SetupProgressStore.removeChangeListener(this._onChange);
			SpinnerStore.removeChangeListener(this._onSpinnerChange);
			DataStore.removeChangeListener(this._onDataChange);
		},
	
		_onChange: function _onChange() {
			this.setState(getSetupProgress());
		},
	
		_onSpinnerChange: function _onSpinnerChange() {
			this.setState({ showSpinner: SpinnerStore.showing(), spinnerMessage: SpinnerStore.getMessage() });
		},
	
		_onDataChange: function _onDataChange() {
			this.setState({ saving: DataStore.isSaving() });
		},
	
		getInitialState: function getInitialState() {
			return getSetupProgress();
		},
	
		handleReset: function handleReset(e) {
			e.preventDefault();
			SetupProgressActions.resetData();
		},
	
		handleShowSpinner: function handleShowSpinner(e) {
			e.preventDefault();
			SpinnerActions.show("Testing spinner");
		},
	
		handleHideSpinner: function handleHideSpinner(e) {
			e.preventDefault();
			SpinnerActions.hide();
		},
	
		render: function render() {
			return React.createElement(
				'div',
				null,
				this._renderDebug(),
				React.createElement(
					'div',
					{ className: 'welcome__wrapper clear' },
					this._renderSpinner(),
					React.createElement(
						'div',
						{ className: 'welcome__container' },
						React.createElement(Flash, null),
						this._renderSection()
					)
				)
			);
		},
	
		_renderSection: function _renderSection() {
			if (this.state.newUser) {
				return React.createElement(GetStarted, null);
			} else {
				return this._renderCurrentView();
			}
		},
	
		_renderDebug: function _renderDebug() {
			if (JPS.debug) {
				return React.createElement(
					'div',
					{ className: 'welcome__debug' },
					React.createElement(
						'a',
						{ href: '#', className: 'button', onClick: this.handleReset },
						'Reset Wizard'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', onClick: this.handleShowSpinner },
						'Show spinner'
					),
					React.createElement(
						'a',
						{ href: '#', className: 'button', onClick: this.handleHideSpinner },
						'Hide spinner'
					)
				);
			} else {
				return null;
			}
		},
	
		_renderSpinner: function _renderSpinner() {
			if (this.state.showSpinner) {
				return React.createElement(
					'div',
					{ className: 'welcome__loading-overlay' },
					React.createElement(
						'div',
						{ className: 'welcome__loading-message' },
						React.createElement('img', { className: 'welcome__loading-spinner', src: JPS.base_url + '/img/spinner-2x.gif', width: '16px', height: '16px' }),
						'  ',
						this.state.spinnerMessage
					)
				);
			} else {
				return null;
			}
		},
	
		_renderCurrentView: function _renderCurrentView() {
			if (this.state.currentStep) {
				return React.createElement(this.state.currentStep.welcomeView, null);
			} else {
				return React.createElement(
					'h3',
					null,
					'Nothing'
				);
			}
		}
	
	});

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Store which manages and persists setup wizard progress
	 */
	
	'use strict';
	
	var AppDispatcher = __webpack_require__(159),
	    EventEmitter = __webpack_require__(163).EventEmitter,
	    JPSConstants = __webpack_require__(164);
	
	var CHANGE_EVENT = 'change';
	
	var _steps,
	    _started = JPS.started;
	
	function setSteps(steps) {
	
	  // set the completion status of each step to the saved values
	  steps.forEach(function (step) {
	    // default values for skipped, completed and static
	    if (typeof step.completed === 'undefined') {
	      step.completed = JPS.step_status[step.slug] && JPS.step_status[step.slug].completed || false;
	    }
	
	    if (typeof step.skipped === 'undefined') {
	      step.skipped = JPS.step_status[step.slug] && JPS.step_status[step.slug].skipped || false;
	    }
	
	    if (typeof step['static'] === 'undefined') {
	      step['static'] = false;
	    }
	
	    // set to 'true' if you want the wizard to move to this step even if it's been completed
	    // by default completed steps are skipped
	    if (typeof step.neverSkip === 'undefined') {
	      step.neverSkip = false;
	    }
	
	    // default value for includeInProgress
	    if (typeof step.includeInProgress === 'undefined') {
	      step.includeInProgress = true;
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
	  var step = _getStepFromSlug(stepSlug);
	  step.completed = true;
	  step.skipped = false;
	}
	
	function skip() {
	  var stepSlug = currentStepSlug();
	  var step = _getStepFromSlug(stepSlug);
	  step.skipped = true;
	  selectNextPendingStep();
	}
	
	function _getStepFromSlug(stepSlug) {
	  var currentStep = null;
	  _.each(_steps, function (step) {
	    if (step.slug === stepSlug) {
	      currentStep = step;
	    }
	  });
	  return currentStep;
	}
	
	function ensureValidStepSlug() {
	  var stepSlug = currentStepSlug();
	  if (!(stepSlug && _getStepFromSlug(stepSlug))) {
	
	    var pendingStep = _getNextPendingStep();
	    if (pendingStep !== null) {
	      var hash = 'welcome/steps/' + pendingStep.slug;
	      window.history.pushState(null, document.title, window.location.pathname + '#' + hash);
	    }
	  }
	}
	
	function selectNextPendingStep() {
	  var pendingStep = _getNextPendingStep();
	  if (pendingStep !== null) {
	    select(pendingStep.slug); // also sets the window location hash
	  }
	}
	
	function _getNextPendingStep() {
	  // if the _next_ step is neverSkip, we proceed to it
	  var stepIndex = currentStepIndex();
	  if (stepIndex !== false) {
	    if (_steps[stepIndex + 1] && _steps[stepIndex + 1].neverSkip === true) {
	      return _steps[stepIndex + 1];
	    }
	  }
	
	  // otherwise find the next uncompleted, unskipped step
	  var nextPendingStep = _.findWhere(_steps, { completed: false, skipped: false });
	  return nextPendingStep;
	}
	
	function getPendingStepAfter(fromStep) {}
	
	function currentStepSlug() {
	  if (window.location.hash.indexOf('#welcome/steps') === 0) {
	    var parts = window.location.hash.split('/');
	    var stepSlug = parts[parts.length - 1];
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
	  for (var i = 0; i < _steps.length; i++) {
	    if (_steps[i].slug === slug) {
	      return i;
	    }
	  }
	  return false;
	}
	
	function select(stepSlug) {
	  var hash = 'welcome/steps/' + stepSlug;
	  window.history.pushState(null, document.title, window.location.pathname + '#' + hash);
	}
	
	//reset everything back to defaults
	function reset() {
	  JPS.step_status = {};
	  _.where(_steps, { 'static': false }).forEach(function (step) {
	    step.completed = false;
	    step.skipped = false;
	  });
	  _started = false;
	}
	
	var SetupProgressStore = _.extend({}, EventEmitter.prototype, {
	
	  init: function init(steps) {
	    setSteps(steps);
	  },
	
	  getAllSteps: function getAllSteps() {
	    return _steps;
	  },
	
	  isNewUser: function isNewUser() {
	    return !_started;
	  },
	
	  emitChange: function emitChange() {
	    this.emit(CHANGE_EVENT);
	  },
	
	  getCurrentStep: function getCurrentStep() {
	    return _getStepFromSlug(currentStepSlug());
	  },
	
	  getNextPendingStep: function getNextPendingStep() {
	    return _getNextPendingStep(); // delegate
	  },
	
	  getStepFromSlug: function getStepFromSlug(slug) {
	    return _getStepFromSlug(slug); // delegate
	  },
	
	  getProgressPercent: function getProgressPercent() {
	    var numSteps = _.where(_steps, { includeInProgress: true }).length;
	    var completedSteps = _.where(_steps, { includeInProgress: true, completed: true }).length;
	    var percentComplete = completedSteps / numSteps * 90 + 10;
	    var output = Math.round(percentComplete / 10) * 10;
	    return output;
	  },
	
	  addChangeListener: function addChangeListener(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },
	
	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  }
	});
	
	// force a navigation refresh when the URL changes
	window.addEventListener("popstate", function () {
	  SetupProgressStore.emitChange();
	});
	
	// Register callback to handle all updates
	AppDispatcher.register(function (action) {
	
	  switch (action.actionType) {
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

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * AppDispatcher
	 *
	 * A singleton that operates as the central hub for application updates.
	 */
	
	'use strict';
	
	var Dispatcher = __webpack_require__(160).Dispatcher;
	
	module.exports = new Dispatcher();

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */
	
	module.exports.Dispatcher = __webpack_require__(161);


/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule Dispatcher
	 * 
	 * @preventMunge
	 */
	
	'use strict';
	
	exports.__esModule = true;
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	var invariant = __webpack_require__(162);
	
	var _prefix = 'ID_';
	
	/**
	 * Dispatcher is used to broadcast payloads to registered callbacks. This is
	 * different from generic pub-sub systems in two ways:
	 *
	 *   1) Callbacks are not subscribed to particular events. Every payload is
	 *      dispatched to every registered callback.
	 *   2) Callbacks can be deferred in whole or part until other callbacks have
	 *      been executed.
	 *
	 * For example, consider this hypothetical flight destination form, which
	 * selects a default city when a country is selected:
	 *
	 *   var flightDispatcher = new Dispatcher();
	 *
	 *   // Keeps track of which country is selected
	 *   var CountryStore = {country: null};
	 *
	 *   // Keeps track of which city is selected
	 *   var CityStore = {city: null};
	 *
	 *   // Keeps track of the base flight price of the selected city
	 *   var FlightPriceStore = {price: null}
	 *
	 * When a user changes the selected city, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'city-update',
	 *     selectedCity: 'paris'
	 *   });
	 *
	 * This payload is digested by `CityStore`:
	 *
	 *   flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'city-update') {
	 *       CityStore.city = payload.selectedCity;
	 *     }
	 *   });
	 *
	 * When the user selects a country, we dispatch the payload:
	 *
	 *   flightDispatcher.dispatch({
	 *     actionType: 'country-update',
	 *     selectedCountry: 'australia'
	 *   });
	 *
	 * This payload is digested by both stores:
	 *
	 *   CountryStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       CountryStore.country = payload.selectedCountry;
	 *     }
	 *   });
	 *
	 * When the callback to update `CountryStore` is registered, we save a reference
	 * to the returned token. Using this token with `waitFor()`, we can guarantee
	 * that `CountryStore` is updated before the callback that updates `CityStore`
	 * needs to query its data.
	 *
	 *   CityStore.dispatchToken = flightDispatcher.register(function(payload) {
	 *     if (payload.actionType === 'country-update') {
	 *       // `CountryStore.country` may not be updated.
	 *       flightDispatcher.waitFor([CountryStore.dispatchToken]);
	 *       // `CountryStore.country` is now guaranteed to be updated.
	 *
	 *       // Select the default city for the new country
	 *       CityStore.city = getDefaultCityForCountry(CountryStore.country);
	 *     }
	 *   });
	 *
	 * The usage of `waitFor()` can be chained, for example:
	 *
	 *   FlightPriceStore.dispatchToken =
	 *     flightDispatcher.register(function(payload) {
	 *       switch (payload.actionType) {
	 *         case 'country-update':
	 *         case 'city-update':
	 *           flightDispatcher.waitFor([CityStore.dispatchToken]);
	 *           FlightPriceStore.price =
	 *             getFlightPriceStore(CountryStore.country, CityStore.city);
	 *           break;
	 *     }
	 *   });
	 *
	 * The `country-update` payload will be guaranteed to invoke the stores'
	 * registered callbacks in order: `CountryStore`, `CityStore`, then
	 * `FlightPriceStore`.
	 */
	
	var Dispatcher = (function () {
	  function Dispatcher() {
	    _classCallCheck(this, Dispatcher);
	
	    this._callbacks = {};
	    this._isDispatching = false;
	    this._isHandled = {};
	    this._isPending = {};
	    this._lastID = 1;
	  }
	
	  /**
	   * Registers a callback to be invoked with every dispatched payload. Returns
	   * a token that can be used with `waitFor()`.
	   */
	
	  Dispatcher.prototype.register = function register(callback) {
	    var id = _prefix + this._lastID++;
	    this._callbacks[id] = callback;
	    return id;
	  };
	
	  /**
	   * Removes a callback based on its token.
	   */
	
	  Dispatcher.prototype.unregister = function unregister(id) {
	    !this._callbacks[id] ?  false ? invariant(false, 'Dispatcher.unregister(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	    delete this._callbacks[id];
	  };
	
	  /**
	   * Waits for the callbacks specified to be invoked before continuing execution
	   * of the current callback. This method should only be used by a callback in
	   * response to a dispatched payload.
	   */
	
	  Dispatcher.prototype.waitFor = function waitFor(ids) {
	    !this._isDispatching ?  false ? invariant(false, 'Dispatcher.waitFor(...): Must be invoked while dispatching.') : invariant(false) : undefined;
	    for (var ii = 0; ii < ids.length; ii++) {
	      var id = ids[ii];
	      if (this._isPending[id]) {
	        !this._isHandled[id] ?  false ? invariant(false, 'Dispatcher.waitFor(...): Circular dependency detected while ' + 'waiting for `%s`.', id) : invariant(false) : undefined;
	        continue;
	      }
	      !this._callbacks[id] ?  false ? invariant(false, 'Dispatcher.waitFor(...): `%s` does not map to a registered callback.', id) : invariant(false) : undefined;
	      this._invokeCallback(id);
	    }
	  };
	
	  /**
	   * Dispatches a payload to all registered callbacks.
	   */
	
	  Dispatcher.prototype.dispatch = function dispatch(payload) {
	    !!this._isDispatching ?  false ? invariant(false, 'Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.') : invariant(false) : undefined;
	    this._startDispatching(payload);
	    try {
	      for (var id in this._callbacks) {
	        if (this._isPending[id]) {
	          continue;
	        }
	        this._invokeCallback(id);
	      }
	    } finally {
	      this._stopDispatching();
	    }
	  };
	
	  /**
	   * Is this Dispatcher currently dispatching.
	   */
	
	  Dispatcher.prototype.isDispatching = function isDispatching() {
	    return this._isDispatching;
	  };
	
	  /**
	   * Call the callback stored with the given id. Also do some internal
	   * bookkeeping.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._invokeCallback = function _invokeCallback(id) {
	    this._isPending[id] = true;
	    this._callbacks[id](this._pendingPayload);
	    this._isHandled[id] = true;
	  };
	
	  /**
	   * Set up bookkeeping needed when dispatching.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._startDispatching = function _startDispatching(payload) {
	    for (var id in this._callbacks) {
	      this._isPending[id] = false;
	      this._isHandled[id] = false;
	    }
	    this._pendingPayload = payload;
	    this._isDispatching = true;
	  };
	
	  /**
	   * Clear bookkeeping used for dispatching.
	   *
	   * @internal
	   */
	
	  Dispatcher.prototype._stopDispatching = function _stopDispatching() {
	    delete this._pendingPayload;
	    this._isDispatching = false;
	  };
	
	  return Dispatcher;
	})();
	
	module.exports = Dispatcher;

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 *
	 * @providesModule invariant
	 */
	
	"use strict";
	
	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */
	
	var invariant = function (condition, format, a, b, c, d, e, f) {
	  if (false) {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }
	
	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error('Minified exception occurred; use the non-minified dev environment ' + 'for the full error message and additional helpful warnings.');
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error('Invariant Violation: ' + format.replace(/%s/g, function () {
	        return args[argIndex++];
	      }));
	    }
	
	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};
	
	module.exports = invariant;

/***/ },
/* 163 */
/***/ function(module, exports) {

	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.
	
	function EventEmitter() {
	  this._events = this._events || {};
	  this._maxListeners = this._maxListeners || undefined;
	}
	module.exports = EventEmitter;
	
	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;
	
	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._maxListeners = undefined;
	
	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	EventEmitter.defaultMaxListeners = 10;
	
	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function(n) {
	  if (!isNumber(n) || n < 0 || isNaN(n))
	    throw TypeError('n must be a positive number');
	  this._maxListeners = n;
	  return this;
	};
	
	EventEmitter.prototype.emit = function(type) {
	  var er, handler, len, args, i, listeners;
	
	  if (!this._events)
	    this._events = {};
	
	  // If there is no 'error' event listener then throw.
	  if (type === 'error') {
	    if (!this._events.error ||
	        (isObject(this._events.error) && !this._events.error.length)) {
	      er = arguments[1];
	      if (er instanceof Error) {
	        throw er; // Unhandled 'error' event
	      }
	      throw TypeError('Uncaught, unspecified "error" event.');
	    }
	  }
	
	  handler = this._events[type];
	
	  if (isUndefined(handler))
	    return false;
	
	  if (isFunction(handler)) {
	    switch (arguments.length) {
	      // fast cases
	      case 1:
	        handler.call(this);
	        break;
	      case 2:
	        handler.call(this, arguments[1]);
	        break;
	      case 3:
	        handler.call(this, arguments[1], arguments[2]);
	        break;
	      // slower
	      default:
	        args = Array.prototype.slice.call(arguments, 1);
	        handler.apply(this, args);
	    }
	  } else if (isObject(handler)) {
	    args = Array.prototype.slice.call(arguments, 1);
	    listeners = handler.slice();
	    len = listeners.length;
	    for (i = 0; i < len; i++)
	      listeners[i].apply(this, args);
	  }
	
	  return true;
	};
	
	EventEmitter.prototype.addListener = function(type, listener) {
	  var m;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events)
	    this._events = {};
	
	  // To avoid recursion in the case that type === "newListener"! Before
	  // adding it to the listeners, first emit "newListener".
	  if (this._events.newListener)
	    this.emit('newListener', type,
	              isFunction(listener.listener) ?
	              listener.listener : listener);
	
	  if (!this._events[type])
	    // Optimize the case of one listener. Don't need the extra array object.
	    this._events[type] = listener;
	  else if (isObject(this._events[type]))
	    // If we've already got an array, just append.
	    this._events[type].push(listener);
	  else
	    // Adding the second element, need to change to array.
	    this._events[type] = [this._events[type], listener];
	
	  // Check for listener leak
	  if (isObject(this._events[type]) && !this._events[type].warned) {
	    if (!isUndefined(this._maxListeners)) {
	      m = this._maxListeners;
	    } else {
	      m = EventEmitter.defaultMaxListeners;
	    }
	
	    if (m && m > 0 && this._events[type].length > m) {
	      this._events[type].warned = true;
	      console.error('(node) warning: possible EventEmitter memory ' +
	                    'leak detected. %d listeners added. ' +
	                    'Use emitter.setMaxListeners() to increase limit.',
	                    this._events[type].length);
	      if (typeof console.trace === 'function') {
	        // not supported in IE 10
	        console.trace();
	      }
	    }
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.on = EventEmitter.prototype.addListener;
	
	EventEmitter.prototype.once = function(type, listener) {
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  var fired = false;
	
	  function g() {
	    this.removeListener(type, g);
	
	    if (!fired) {
	      fired = true;
	      listener.apply(this, arguments);
	    }
	  }
	
	  g.listener = listener;
	  this.on(type, g);
	
	  return this;
	};
	
	// emits a 'removeListener' event iff the listener was removed
	EventEmitter.prototype.removeListener = function(type, listener) {
	  var list, position, length, i;
	
	  if (!isFunction(listener))
	    throw TypeError('listener must be a function');
	
	  if (!this._events || !this._events[type])
	    return this;
	
	  list = this._events[type];
	  length = list.length;
	  position = -1;
	
	  if (list === listener ||
	      (isFunction(list.listener) && list.listener === listener)) {
	    delete this._events[type];
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	
	  } else if (isObject(list)) {
	    for (i = length; i-- > 0;) {
	      if (list[i] === listener ||
	          (list[i].listener && list[i].listener === listener)) {
	        position = i;
	        break;
	      }
	    }
	
	    if (position < 0)
	      return this;
	
	    if (list.length === 1) {
	      list.length = 0;
	      delete this._events[type];
	    } else {
	      list.splice(position, 1);
	    }
	
	    if (this._events.removeListener)
	      this.emit('removeListener', type, listener);
	  }
	
	  return this;
	};
	
	EventEmitter.prototype.removeAllListeners = function(type) {
	  var key, listeners;
	
	  if (!this._events)
	    return this;
	
	  // not listening for removeListener, no need to emit
	  if (!this._events.removeListener) {
	    if (arguments.length === 0)
	      this._events = {};
	    else if (this._events[type])
	      delete this._events[type];
	    return this;
	  }
	
	  // emit removeListener for all listeners on all events
	  if (arguments.length === 0) {
	    for (key in this._events) {
	      if (key === 'removeListener') continue;
	      this.removeAllListeners(key);
	    }
	    this.removeAllListeners('removeListener');
	    this._events = {};
	    return this;
	  }
	
	  listeners = this._events[type];
	
	  if (isFunction(listeners)) {
	    this.removeListener(type, listeners);
	  } else if (listeners) {
	    // LIFO order
	    while (listeners.length)
	      this.removeListener(type, listeners[listeners.length - 1]);
	  }
	  delete this._events[type];
	
	  return this;
	};
	
	EventEmitter.prototype.listeners = function(type) {
	  var ret;
	  if (!this._events || !this._events[type])
	    ret = [];
	  else if (isFunction(this._events[type]))
	    ret = [this._events[type]];
	  else
	    ret = this._events[type].slice();
	  return ret;
	};
	
	EventEmitter.prototype.listenerCount = function(type) {
	  if (this._events) {
	    var evlistener = this._events[type];
	
	    if (isFunction(evlistener))
	      return 1;
	    else if (evlistener)
	      return evlistener.length;
	  }
	  return 0;
	};
	
	EventEmitter.listenerCount = function(emitter, type) {
	  return emitter.listenerCount(type);
	};
	
	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	
	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	
	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	
	function isUndefined(arg) {
	  return arg === void 0;
	}


/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var keyMirror = __webpack_require__(165);
	
	module.exports = keyMirror({
		STEP_COMPLETE: null,
		STEP_GET_STARTED: null,
		STEP_SELECT: null,
		STEP_NEXT: null,
		STEP_SKIP: null,
		SITE_SET_TITLE: null,
		SITE_SET_DESCRIPTION: null,
		SITE_SAVE_TITLE_AND_DESCRIPTION: null,
		SITE_CONTACT_PAGE_ID: null,
		SITE_SET_THEME: null,
		SITE_INSTALL_THEME: null,
		SITE_JETPACK_CONFIGURED: null,
		SITE_JETPACK_MODULE_ENABLED: null,
		SITE_JETPACK_MODULE_DISABLED: null,
		SITE_JETPACK_JUMPSTART_ENABLED: null,
		SITE_JETPACK_ADD_MODULES: null,
		SITE_SET_LAYOUT: null,
	
		SITE_CREATE_CONTACT_US_PAGE: null,
		SITE_CREATE_LAYOUT_PAGES: null,
	
		SAVE_STARTED: null,
		SAVE_FINISHED: null,
	
		SET_FLASH: null,
		UNSET_FLASH: null,
		FLASH_SEVERITY_NOTICE: null,
		FLASH_SEVERITY_ERROR: null,
	
		RESET_DATA: null,
	
		SHOW_SPINNER: null,
		HIDE_SPINNER: null
	});

/***/ },
/* 165 */
/***/ function(module, exports) {

	/**
	 * Copyright 2013-2014 Facebook, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 *
	 */
	
	"use strict";
	
	/**
	 * Constructs an enumeration with keys equal to their value.
	 *
	 * For example:
	 *
	 *   var COLORS = keyMirror({blue: null, red: null});
	 *   var myColor = COLORS.blue;
	 *   var isColorValid = !!COLORS[myColor];
	 *
	 * The last line could not be performed if the values of the generated enum were
	 * not equal to their keys.
	 *
	 *   Input:  {key1: val1, key2: val2}
	 *   Output: {key1: key1, key2: key2}
	 *
	 * @param {object} obj
	 * @return {object}
	 */
	var keyMirror = function(obj) {
	  var ret = {};
	  var key;
	  if (!(obj instanceof Object && !Array.isArray(obj))) {
	    throw new Error('keyMirror(...): Argument must be an object.');
	  }
	  for (key in obj) {
	    if (!obj.hasOwnProperty(key)) {
	      continue;
	    }
	    ret[key] = key;
	  }
	  return ret;
	};
	
	module.exports = keyMirror;


/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var AppDispatcher = __webpack_require__(159),
	    JPSConstants = __webpack_require__(164),
	    Paths = __webpack_require__(167),
	    FlashActions = __webpack_require__(168),
	    SiteActions = __webpack_require__(169),
	    WPAjax = __webpack_require__(171),
	    SpinnerActions = __webpack_require__(173),
	    SetupProgressStore = __webpack_require__(158),
	    SiteStore = __webpack_require__(170);
	
	var SetupProgressActions = {
		resetData: function resetData() {
			WPAjax.post(JPS.site_actions.reset_data).fail(function (msg) {
				FlashActions.error("Failed to save data: " + msg);
			});
			AppDispatcher.dispatch({
				actionType: JPSConstants.RESET_DATA
			});
		},
	
		completeStep: function completeStep(slug, meta) {
			var step = SetupProgressStore.getStepFromSlug(slug);
	
			AppDispatcher.dispatch({
				actionType: JPSConstants.STEP_COMPLETE,
				slug: slug
			});
	
			// NOTE: this needs to come after the dispatch, so that the completion %
			// is already updated and can be included in the metadata
			return this._recordStepComplete(step, meta);
		},
	
		completeAndNextStep: function completeAndNextStep(slug, meta) {
			this.completeStep(slug, meta).always((function () {
				// getCurrentStep _should_ return the correct step slug for the 'next' step here...
				// this needs to be in the callback because otherwise there's a chance
				// that COMPLETE could be registered in analytics after VIEWED
				this._recordStepViewed(SetupProgressStore.getCurrentStep());
			}).bind(this));
	
			AppDispatcher.dispatch({
				actionType: JPSConstants.STEP_NEXT
			});
		},
	
		// mark current step as skipped and move on
		skipStep: function skipStep() {
			FlashActions.unset();
	
			var step = SetupProgressStore.getCurrentStep();
	
			if (!step.skipped) {
				this._recordStepSkipped(step);
			}
	
			AppDispatcher.dispatch({
				actionType: JPSConstants.STEP_SKIP
			});
		},
	
		setCurrentStep: function setCurrentStep(stepSlug) {
			FlashActions.unset();
			AppDispatcher.dispatch({
				actionType: JPSConstants.STEP_SELECT,
				slug: stepSlug
			});
			this._recordStepViewed({ slug: stepSlug });
		},
	
		getStarted: function getStarted(siteType) {
			WPAjax.post(JPS.step_actions.start, { siteType: siteType }).fail(function (msg) {
				FlashActions.error(msg);
			});
	
			AppDispatcher.dispatch({
				actionType: JPSConstants.STEP_GET_STARTED
			});
		},
	
		closeJPO: function closeJPO() {
			SpinnerActions.show("");
			WPAjax.post(JPS.step_actions.close).fail(function (msg) {
				SpinnerActions.hide();
				FlashActions.error(msg);
			}).always(function () {
				window.location.reload();
			});
		},
	
		disableJPO: function disableJPO() {
			SpinnerActions.show("");
			WPAjax.post(JPS.step_actions.disable).fail(function (msg) {
				SpinnerActions.hide();
				FlashActions.error(msg);
			}).always(function () {
				window.location.reload();
			});
		},
	
		// moves on to the next step, but doesn't mark it as "skipped"
		selectNextStep: function selectNextStep() {
			FlashActions.unset();
			AppDispatcher.dispatch({
				actionType: JPSConstants.STEP_NEXT
			});
			this._recordStepViewed(SetupProgressStore.getCurrentStep());
		},
	
		submitTitleStep: function submitTitleStep(title, description) {
			SiteActions.saveTitleAndDescription(title, description);
			this.completeAndNextStep(Paths.SITE_TITLE_STEP_SLUG);
		},
	
		submitLayoutStep: function submitLayoutStep(layout) {
			SiteActions.setLayout(layout).done((function () {
				var step = SetupProgressStore.getStepFromSlug(Paths.IS_BLOG_STEP_SLUG);
				if (!step.completed) {
					this.completeStep(Paths.IS_BLOG_STEP_SLUG);
				}
				this.completeAndNextStep(Paths.HOMEPAGE_STEP_SLUG);
			}).bind(this));
		},
	
		confirmHomepageStep: function confirmHomepageStep(layout) {
			this.completeStep(Paths.IS_BLOG_STEP_SLUG);
			this.setCurrentStep(Paths.HOMEPAGE_STEP_SLUG);
		},
	
		createContactPage: function createContactPage(contactPage) {
			SiteActions.createContactUsPage(contactPage);
			this.completeStep(Paths.CONTACT_PAGE_STEP_SLUG);
			this.selectNextStep();
		},
	
		skipContactPageBuild: function skipContactPageBuild() {
			this.completeAndNextStep(Paths.CONTACT_PAGE_STEP_SLUG);
		},
	
		submitJetpackJumpstart: function submitJetpackJumpstart() {
			SiteActions.enableJumpstart().done((function () {
				this.completeStep(Paths.JETPACK_MODULES_STEP_SLUG);
			}).bind(this));
		},
	
		setActiveTheme: function setActiveTheme(theme) {
			SiteActions.setActiveTheme(theme).done((function () {
				this.completeStep(Paths.DESIGN_STEP_SLUG, {
					themeId: theme.id
				});
			}).bind(this));
		},
	
		saveDesignStep: function saveDesignStep() {
			this.completeAndNextStep(Paths.DESIGN_STEP_SLUG, {
				themeId: SiteStore.getActiveThemeId()
			});
		},
	
		_recordStepViewed: function _recordStepViewed(step) {
			// record analytics to say we viewed the next step
			return WPAjax.post(JPS.step_actions.view, {
				step: step.slug
			}, {
				quiet: true
			});
		},
	
		_recordStepComplete: function _recordStepComplete(step, meta) {
			if (typeof meta === 'undefined') {
				meta = {};
			}
	
			meta.completion = SetupProgressStore.getProgressPercent();
	
			return WPAjax.post(JPS.step_actions.complete, {
				step: step.slug,
				data: meta
			}).fail(function (msg) {
				FlashActions.error(msg);
			});
		},
	
		_recordStepSkipped: function _recordStepSkipped(step) {
			return WPAjax.post(JPS.step_actions.skip, {
				step: step.slug
			}).fail(function (msg) {
				FlashActions.error(msg);
			});
		}
	};
	
	module.exports = SetupProgressActions;

/***/ },
/* 167 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = {
		// steps
		SITE_TITLE_STEP_SLUG: 'title',
		IS_BLOG_STEP_SLUG: 'is-blog',
		HOMEPAGE_STEP_SLUG: 'homepage',
		TRAFFIC_STEP_SLUG: 'traffic',
		STATS_MONITORING_STEP_SLUG: 'stats-monitoring',
		DESIGN_STEP_SLUG: 'design',
		ADVANCED_STEP_SLUG: 'advanced',
		REVIEW_STEP_SLUG: 'review',
		JETPACK_MODULES_STEP_SLUG: 'jetpack',
		CONTACT_PAGE_STEP_SLUG: 'contact-page'
	};

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var AppDispatcher = __webpack_require__(159),
	    JPSConstants = __webpack_require__(164);
	
	var FlashActions = {
		notice: function notice(msg) {
			AppDispatcher.dispatch({
				actionType: JPSConstants.SET_FLASH,
				message: msg,
				severity: JPSConstants.FLASH_SEVERITY_NOTICE
			});
		},
	
		error: function error(msg) {
			AppDispatcher.dispatch({
				actionType: JPSConstants.SET_FLASH,
				message: msg,
				severity: JPSConstants.FLASH_SEVERITY_ERROR
			});
		},
	
		unset: function unset() {
			AppDispatcher.dispatch({
				actionType: JPSConstants.UNSET_FLASH
			});
		}
	};
	
	module.exports = FlashActions;

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var AppDispatcher = __webpack_require__(159),
	    JPSConstants = __webpack_require__(164),
	    SiteStore = __webpack_require__(170),
	    FlashActions = __webpack_require__(168),
	    SpinnerActions = __webpack_require__(173),
	    WPAjax = __webpack_require__(171);
	
	var SiteActions = {
		setTitle: function setTitle(title) {
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_SET_TITLE,
				title: title
			});
		},
	
		setDescription: function setDescription(description) {
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_SET_DESCRIPTION,
				description: description
			});
		},
	
		saveTitleAndDescription: function saveTitleAndDescription(title, description) {
	
			WPAjax.post(JPS.site_actions.set_title, { title: title, description: description }).fail(function (msg) {
				FlashActions.error("Error setting title: " + msg);
			});
	
			jQuery('#wp-admin-bar-site-name .ab-item').html(title);
	
			// FlashActions.notice( "Set title to '"+title+"' and description to '"+description+"'" );
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_SAVE_TITLE_AND_DESCRIPTION,
				title: title,
				description: description
			});
	
			return jQuery.Deferred().resolve(); // XXX HACK
		},
	
		setContactPageId: function setContactPageId(contactPageID) {
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_CONTACT_PAGE_ID,
				contactPageID: contactPageID
			});
		},
	
		_installTheme: function _installTheme(theme) {
			if (!theme.installed) {
				SpinnerActions.show("Installing '" + theme.name + "'");
				return WPAjax.post(JPS.site_actions.install_theme, { themeId: theme.id }).done(function () {
					theme.installed = true;
					AppDispatcher.dispatch({
						actionType: JPSConstants.SITE_INSTALL_THEME,
						theme: theme
					});
				}).fail(function (msg) {
					FlashActions.error("Server error installing theme: " + msg);
				}).always(function () {
					SpinnerActions.hide();
				});
			} else {
				return jQuery.Deferred().resolve();
			}
		},
	
		_activateTheme: function _activateTheme(theme) {
			WPAjax.post(JPS.site_actions.set_theme, { themeId: theme.id }).fail(function (msg) {
				FlashActions.error("Server error setting theme: " + msg);
			});
	
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_SET_THEME,
				themeId: theme.id
			});
		},
	
		setActiveTheme: function setActiveTheme(theme) {
	
			this._installTheme(theme).done((function () {
				this._activateTheme(theme);
			}).bind(this));
	
			return jQuery.Deferred().resolve(); // XXX HACK
		},
	
		setLayout: function setLayout(layoutName) {
	
			WPAjax.post(JPS.site_actions.set_layout, { layout: layoutName }).done(function (page_info) {
				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_CREATE_LAYOUT_PAGES,
					data: page_info
				});
			}).fail(function (msg) {
				FlashActions.error("Error setting layout: " + msg);
			});
	
			// FlashActions.notice("Set layout to "+layoutName);
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_SET_LAYOUT,
				layout: layoutName
			});
	
			return jQuery.Deferred().resolve(); // XXX HACK
		},
	
		createContactUsPage: function createContactUsPage(contactPage) {
	
			return WPAjax.post(JPS.site_actions.build_contact_page, { buildContactPage: contactPage }).done(function (page_info) {
				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_CREATE_CONTACT_US_PAGE,
					data: page_info
				});
			}).fail(function (msg) {
				FlashActions.error("Error creating contact us page: " + msg);
			});
		},
	
		skipContactPageBuild: function skipContactPageBuild() {
			// FlashActions.notice( "Build the contact us page" );
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_CREATE_CONTACT_US_PAGE
			});
	
			return jQuery.Deferred().resolve(); // XXX HACK
		},
	
		configureJetpack: function configureJetpack(return_to_step) {
			return WPAjax.post(JPS.site_actions.configure_jetpack, { return_to_step: return_to_step }).done(function (data) {
				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_JETPACK_CONFIGURED
				});
	
				if (data.next) {
					window.location.replace(data.next);
				}
			}).fail(function (msg) {
				FlashActions.error("Error enabling Jetpack: " + msg);
			});
		},
	
		activateJetpackModule: function activateJetpackModule(module_slug) {
	
			WPAjax.post(JPS.site_actions.activate_jetpack_modules, { modules: [module_slug] }).fail(function (msg) {
				FlashActions.error("Error activating Jetpack module: " + msg);
			});
	
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_JETPACK_MODULE_ENABLED,
				slug: module_slug
			});
	
			return jQuery.Deferred().resolve(); // XXX HACK
		},
	
		deactivateJetpackModule: function deactivateJetpackModule(module_slug) {
	
			WPAjax.post(JPS.site_actions.deactivate_jetpack_modules, { modules: [module_slug] }).fail(function (msg) {
				FlashActions.error("Error deactivating Jetpack module: " + msg);
			});
	
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_JETPACK_MODULE_DISABLED,
				slug: module_slug
			});
	
			return jQuery.Deferred().resolve(); // XXX HACK
		},
	
		loadAllJetpackModules: function loadAllJetpackModules() {
			if (SiteStore.getJetpackAdditionalModules().length === 0) {
				return WPAjax.post(JPS.site_actions.list_jetpack_modules).done(function (all_modules) {
					AppDispatcher.dispatch({
						actionType: JPSConstants.SITE_JETPACK_ADD_MODULES,
						modules: all_modules
					});
				}).fail(function (msg) {
					FlashActions.error("Error fetching all Jetpack modules: " + msg);
				});
			} else {
				return jQuery.Deferred().resolve(); // XXX HACK
			}
		},
	
		enableJumpstart: function enableJumpstart() {
			WPAjax.post(JPS.site_actions.activate_jetpack_modules, { modules: SiteStore.getJumpstartModuleSlugs() }).fail(function (msg) {
				FlashActions.error("Error activating Jetpack modules: " + msg);
			});
	
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_JETPACK_JUMPSTART_ENABLED
			});
	
			return jQuery.Deferred().resolve(); // XXX HACK
		}
	};
	
	module.exports = SiteActions;

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * Store which manages and persists site information
	 */
	
	'use strict';
	
	var AppDispatcher = __webpack_require__(159),
	    EventEmitter = __webpack_require__(163).EventEmitter,
	    JPSConstants = __webpack_require__(164),
	    WPAjax = __webpack_require__(171);
	
	var CHANGE_EVENT = 'change';
	
	var layout = JPS.steps.layout.current;
	
	function setTitle(newTitle) {
	  JPS.bloginfo.name = newTitle;
	}
	
	function setDescription(newDescription) {
	  JPS.bloginfo.description = newDescription;
	}
	
	function setActiveTheme(activeThemeId) {
	  JPS.themes.forEach(function (theme) {
	    if (theme.id === activeThemeId) {
	      theme.active = true;
	    } else {
	      theme.active = false;
	    }
	  });
	}
	
	function installedTheme(theme) {
	  JPS.themes.unshift(theme);
	  JPS.themes = JPS.themes.slice(0, 3);
	}
	
	function setJetpackModuleActivated(slug) {
	  if (_.indexOf(JPS.jetpack.active_modules, slug) === -1) {
	    JPS.jetpack.active_modules.push(slug);
	  }
	}
	
	function setJetpackModuleDectivated(slug) {
	  var index = _.indexOf(JPS.jetpack.active_modules, slug);
	  if (index >= 0) {
	    JPS.jetpack.active_modules.splice(index, 1);
	  }
	}
	
	function setJetpackAdditionalModules(modules) {
	  JPS.jetpack.additional_modules = _.filter(modules, function (module) {
	    return _.indexOf(JPS.jetpack.jumpstart_modules.map(function (mod) {
	      return mod.slug;
	    }), module.slug) === -1;
	  });
	}
	
	function setLayout(layoutName) {
	  layout = layoutName; // XXX TODO: get this value dynamically from the server!
	}
	
	function setJetpackConfigured() {
	  JPS.jetpack.configured = true;
	}
	
	function setJetpackJumpstartActivated() {
	  JPS.jetpack.jumpstart_modules.forEach(function (module) {
	    setJetpackModuleActivated(module.slug);
	  });
	}
	
	function setContactUsPage(pageInfo) {
	  JPS.steps.contact_page = pageInfo;
	}
	
	function setLayoutPages(pageInfo) {
	  JPS.steps.layout.welcomeEditUrl = pageInfo.welcome;
	  JPS.steps.layout.postsEditUrl = pageInfo.posts;
	}
	
	var SiteStore = _.extend({}, EventEmitter.prototype, {
	
	  getTitle: function getTitle() {
	    return JPS.bloginfo.name;
	  },
	
	  getDescription: function getDescription() {
	    return JPS.bloginfo.description;
	  },
	
	  getContactPageURL: function getContactPageURL() {
	    return JPS.steps.contact_page && JPS.steps.contact_page.url;
	  },
	
	  getContactPageEditURL: function getContactPageEditURL() {
	    if (JPS.steps.contact_page && JPS.steps.contact_page.editUrl) {
	      return JPS.steps.contact_page.editUrl.replace('&amp;', '&');
	    }
	  },
	
	  getWelcomePageEditURL: function getWelcomePageEditURL() {
	    if (JPS.steps.layout && JPS.steps.layout.welcomeEditUrl) {
	      return JPS.steps.layout.welcomeEditUrl.replace('&amp;', '&');
	    }
	  },
	
	  getNewsPageEditURL: function getNewsPageEditURL() {
	    if (JPS.steps.layout && JPS.steps.layout.postsEditUrl) {
	      return JPS.steps.layout.postsEditUrl.replace('&amp;', '&');
	    }
	  },
	
	  getThemes: function getThemes() {
	    return JPS.themes;
	  },
	
	  getActiveThemeId: function getActiveThemeId() {
	    for (var i = 0; i < JPS.themes.length; i++) {
	      var theme = JPS.themes[i];
	      if (theme.active) {
	        return theme.id;
	      }
	    }
	    return null;
	  },
	
	  getJetpackConfigured: function getJetpackConfigured() {
	    return JPS.jetpack.configured;
	  },
	
	  getActiveModuleSlugs: function getActiveModuleSlugs() {
	    return JPS.jetpack.active_modules;
	  },
	
	  isJetpackModuleEnabled: function isJetpackModuleEnabled(slug) {
	    return _.indexOf(JPS.jetpack.active_modules, slug) >= 0;
	  },
	
	  getJetpackAdditionalModules: function getJetpackAdditionalModules() {
	    return JPS.jetpack.additional_modules;
	  },
	
	  getJumpstartModuleSlugs: function getJumpstartModuleSlugs() {
	    return JPS.jetpack.jumpstart_modules.map(function (module) {
	      return module.slug;
	    });
	  },
	
	  getJumpstartModules: function getJumpstartModules() {
	    return JPS.jetpack.jumpstart_modules;
	  },
	
	  getJetpackSettingsUrl: function getJetpackSettingsUrl() {
	    return JPS.steps.advanced_settings && JPS.steps.advanced_settings.jetpack_modules_url;
	  },
	
	  getPopularThemes: function getPopularThemes() {
	    return WPAjax.post(JPS.site_actions.get_popular_themes, {}, { quiet: true });
	  },
	
	  getJetpackJumpstartEnabled: function getJetpackJumpstartEnabled() {
	    for (var i = 0; i < JPS.jetpack.jumpstart_modules.length; i++) {
	      var module = JPS.jetpack.jumpstart_modules[i];
	      if (!this.isJetpackModuleEnabled(module.slug)) {
	        return false;
	      }
	    }
	    return true;
	  },
	
	  getLayout: function getLayout() {
	    return layout;
	  },
	
	  emitChange: function emitChange() {
	    this.emit(CHANGE_EVENT);
	  },
	
	  addChangeListener: function addChangeListener(callback) {
	    this.on(CHANGE_EVENT, callback);
	  },
	
	  removeChangeListener: function removeChangeListener(callback) {
	    this.removeListener(CHANGE_EVENT, callback);
	  }
	});
	
	// Register callback to handle all updates
	AppDispatcher.register(function (action) {
	
	  switch (action.actionType) {
	    case JPSConstants.SITE_SET_TITLE:
	      setTitle(action.title);
	      SiteStore.emitChange();
	      break;
	
	    case JPSConstants.SITE_SET_DESCRIPTION:
	      setDescription(action.description);
	      SiteStore.emitChange();
	      break;
	
	    case JPSConstants.SITE_SAVE_TITLE_AND_DESCRIPTION:
	      setTitle(action.title);
	      setDescription(action.description);
	      SiteStore.emitChange();
	      break;
	
	    case JPSConstants.SITE_SET_THEME:
	      setActiveTheme(action.themeId);
	      SiteStore.emitChange();
	      break;
	
	    case JPSConstants.SITE_INSTALL_THEME:
	      installedTheme(action.theme);
	      SiteStore.emitChange();
	      break;
	
	    case JPSConstants.SITE_JETPACK_CONFIGURED:
	      setJetpackConfigured();
	      SiteStore.emitChange();
	      break;
	
	    case JPSConstants.SITE_JETPACK_ADD_MODULES:
	      setJetpackAdditionalModules(action.modules);
	      SiteStore.emitChange();
	      break;
	
	    case JPSConstants.SITE_JETPACK_MODULE_ENABLED:
	      setJetpackModuleActivated(action.slug);
	      SiteStore.emitChange();
	      break;
	
	    case JPSConstants.SITE_JETPACK_MODULE_DISABLED:
	      setJetpackModuleDectivated(action.slug);
	      SiteStore.emitChange();
	      break;
	
	    case JPSConstants.SITE_JETPACK_JUMPSTART_ENABLED:
	      setJetpackJumpstartActivated();
	      SiteStore.emitChange();
	      break;
	
	    case JPSConstants.SITE_SET_LAYOUT:
	      setLayout(action.layout);
	      SiteStore.emitChange();
	      break;
	
	    case JPSConstants.SITE_CREATE_CONTACT_US_PAGE:
	      setContactUsPage(action.data);
	      SiteStore.emitChange();
	      break;
	
	    case JPSConstants.SITE_CREATE_LAYOUT_PAGES:
	      setLayoutPages(action.data);
	      SiteStore.emitChange();
	      break;
	
	    default:
	    // no op
	  }
	});
	
	module.exports = SiteStore;

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 * A simple wrapper for calls to WP's "ajaxurl".
	 *
	 * This exists because WP's wp_send_json_error doesn't actually send an error code, but rather
	 * a 200 OK response with a structure like this:
	 * {success: false, data: "something went wrong"}
	 *
	 * So this class smoothes the difference between 50x errors and WP's error object.
	 *
	 * For convenience, this returns a jQuery.Deferred object which can have .done() 
	 * and .fail() methods chained onto it, similar to jQuery.post's "success" and "fail"
	 *
	 * Also, it accepts an "action" param instead of a URL, since all WP ajax requests
	 * actually go via the same URL with different parameters, and it invokes callbacks with
	 * just the "data" portion of WP's ajax payload, rather than the whole structure.
	 * 
	 **/
	
	'use strict';
	
	var DataActions = __webpack_require__(172);
	
	var WPAjax = (function () {
	
		return {
			post: function post(action, payload, options) {
				options = typeof options !== 'undefined' ? options : {};
				payload = typeof payload !== 'undefined' ? payload : {};
				var data = _.extend(payload, { action: action, nonce: JPS.nonce });
	
				var deferred = jQuery.Deferred();
	
				// passing quiet: true allows page navigation before this request has finished.
				// this is also handy when you're calling from within a Dispatch cycle, as it
				// no longer triggers an additional Dispatch (which would cause an error)
				if (!options.quiet) {
					DataActions.requestStarted();
				}
	
				jQuery.post(ajaxurl, data).success(function (response) {
					if (!response.success) {
						deferred.reject(response.data);
					} else {
						deferred.resolve(response.data);
					}
				}).fail(function () {
					deferred.reject("Server error");
				}).always(function () {
					if (!options.quiet) {
						DataActions.requestFinished();
					}
				});
	
				return deferred;
			}
		};
	})();
	
	module.exports = WPAjax;

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var AppDispatcher = __webpack_require__(159),
	    JPSConstants = __webpack_require__(164);
	
	var DataActions = {
		requestStarted: function requestStarted() {
			AppDispatcher.dispatch({
				actionType: JPSConstants.SAVE_STARTED
			});
		},
	
		requestFinished: function requestFinished() {
			AppDispatcher.dispatch({
				actionType: JPSConstants.SAVE_FINISHED
			});
		}
	};
	
	module.exports = DataActions;

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var AppDispatcher = __webpack_require__(159),
	    JPSConstants = __webpack_require__(164);
	
	var SpinnerActions = {
		show: function show(msg) {
			AppDispatcher.dispatch({
				actionType: JPSConstants.SHOW_SPINNER,
				message: msg
			});
		},
	
		hide: function hide() {
			AppDispatcher.dispatch({
				actionType: JPSConstants.HIDE_SPINNER
			});
		},
	
		showAsync: function showAsync(msg) {
			AppDispatcher.dispatch({
				actionType: JPSConstants.SHOW_ASYNC_SPINNER,
				message: msg
			});
		},
	
		hideAsync: function hideAsync() {
			AppDispatcher.dispatch({
				actionType: JPSConstants.HIDE_ASYNC_SPINNER
			});
		}
	};
	
	module.exports = SpinnerActions;

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var AppDispatcher = __webpack_require__(159),
	    EventEmitter = __webpack_require__(163).EventEmitter,
	    JPSConstants = __webpack_require__(164);
	
	var CHANGE_EVENT = 'change';
	
	var spinnerEnabled = false,
	    spinnerMessage = null;
	
	function show(message) {
		spinnerEnabled = true;
		spinnerMessage = message;
	}
	
	function hide() {
		spinnerEnabled = false;
		spinnerMessage = null;
	}
	
	var SpinnerStore = _.extend({}, EventEmitter.prototype, {
		showing: function showing() {
			return spinnerEnabled;
		},
	
		getMessage: function getMessage() {
			return spinnerMessage;
		},
	
		addChangeListener: function addChangeListener(callback) {
			this.on(CHANGE_EVENT, callback);
		},
	
		removeChangeListener: function removeChangeListener(callback) {
			this.removeListener(CHANGE_EVENT, callback);
		},
	
		emitChange: function emitChange() {
			this.emit(CHANGE_EVENT);
		}
	});
	
	AppDispatcher.register(function (action) {
	
		switch (action.actionType) {
			case JPSConstants.SHOW_SPINNER:
				show(action.message);
				SpinnerStore.emitChange();
				break;
	
			case JPSConstants.HIDE_SPINNER:
				hide();
				SpinnerStore.emitChange();
				break;
	
			default:
			// no op
		}
	});
	
	module.exports = SpinnerStore;

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var AppDispatcher = __webpack_require__(159),
	    EventEmitter = __webpack_require__(163).EventEmitter,
	    JPSConstants = __webpack_require__(164);
	
	/*
	 * This is a refcounted save monitor which warns if you try to leave the page while the data is still saving
	 */
	
	var _currentSaves = 0,
	    jpoTimeout,
	    CHANGE_EVENT = 'change';
	
	function incrementSaveCounter() {
		_currentSaves = _currentSaves + 1;
	}
	
	function decrementSaveCounter() {
		_currentSaves = _currentSaves - 1;
	}
	
	var DataStore = _.extend({}, EventEmitter.prototype, {
		isSaving: function isSaving() {
			return _currentSaves > 0;
		},
	
		addChangeListener: function addChangeListener(callback) {
			this.on(CHANGE_EVENT, callback);
		},
	
		removeChangeListener: function removeChangeListener(callback) {
			this.removeListener(CHANGE_EVENT, callback);
		},
	
		emitChange: function emitChange() {
			this.emit(CHANGE_EVENT);
		}
	});
	
	jQuery(window).on('beforeunload', function () {
		if (DataStore.isSaving()) {
			jpoTimeout = setTimeout(function () {
				// alert('You stayed');
				// noop
			}, 1000);
			return "Your site changes are still saving.";
		}
	});
	
	jQuery(window).on('unload', function () {
		clearTimeout(jpoTimeout);
	});
	
	AppDispatcher.register(function (action) {
	
		switch (action.actionType) {
			case JPSConstants.SAVE_STARTED:
				incrementSaveCounter();
				DataStore.emitChange();
				break;
	
			case JPSConstants.SAVE_FINISHED:
				decrementSaveCounter();
				DataStore.emitChange();
				break;
	
			default:
			// no op
		}
	});
	
	module.exports = DataStore;

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Displays a flash message, if set.
	 * JSON structure:
	 * { severity: 'notice', message: 'My message' }
	 *
	 * Valid severities:
	 * - error, notice
	 */
	
	'use strict';
	
	var React = __webpack_require__(4),
	    FlashStore = __webpack_require__(177);
	
	function getFlashState() {
		return FlashStore.getFlash();
	}
	
	var Flash = React.createClass({
		displayName: 'Flash',
	
		componentDidMount: function componentDidMount() {
			FlashStore.addChangeListener(this._onChange);
		},
	
		componentWillUnmount: function componentWillUnmount() {
			FlashStore.removeChangeListener(this._onChange);
		},
	
		_onChange: function _onChange() {
			this.setState(getFlashState());
		},
	
		getInitialState: function getInitialState() {
			return getFlashState();
		},
	
		render: function render() {
			if (this.state.message) {
				return React.createElement(
					'div',
					{ className: this.state.severity + ' updated' },
					this.state.message
				);
			} else {
				return null;
			}
		}
	});
	
	module.exports = Flash;

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var AppDispatcher = __webpack_require__(159),
	    EventEmitter = __webpack_require__(163).EventEmitter,
	    JPSConstants = __webpack_require__(164);
	
	var CHANGE_EVENT = 'change';
	var message, severity;
	
	function setFlash(newMessage, newSeverity) {
		message = newMessage;
		severity = newSeverity;
	}
	
	var FlashStore = _.extend({}, EventEmitter.prototype, {
		getFlash: function getFlash() {
			var severityString;
	
			switch (severity) {
				case JPSConstants.FLASH_SEVERITY_ERROR:
					severityString = 'error';
					break;
				case JPSConstants.FLASH_SEVERITY_NOTICE:
					severityString = 'notice';
					break;
				default:
				//noop
			}
			return { message: message, severity: severityString };
		},
	
		addChangeListener: function addChangeListener(callback) {
			this.on(CHANGE_EVENT, callback);
		},
	
		removeChangeListener: function removeChangeListener(callback) {
			this.removeListener(CHANGE_EVENT, callback);
		},
	
		emitChange: function emitChange() {
			this.emit(CHANGE_EVENT);
		}
	});
	
	AppDispatcher.register(function (action) {
	
		switch (action.actionType) {
			case JPSConstants.SET_FLASH:
				setFlash(action.message, action.severity);
				FlashStore.emitChange();
				break;
	
			case JPSConstants.UNSET_FLASH:
				setFlash(null, null);
				FlashStore.emitChange();
				break;
	
			default:
			// no op
		}
	});
	
	module.exports = FlashStore;

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4),
	    SetupProgressStore = __webpack_require__(158),
	    SetupProgressActions = __webpack_require__(166),
	    Button = __webpack_require__(179);
	
	function getSetupState() {
		return {};
	}
	
	var GetStarted = React.createClass({
		displayName: 'GetStarted',
	
		componentDidMount: function componentDidMount() {
			SetupProgressStore.addChangeListener(this._onChange);
		},
	
		componentWillUnmount: function componentWillUnmount() {
			SetupProgressStore.removeChangeListener(this._onChange);
		},
	
		_onChange: function _onChange() {
			this.setState(getSetupState());
		},
	
		getInitialState: function getInitialState() {
			return getSetupState();
		},
	
		handleGetStarted: function handleGetStarted(sitePurpose, e) {
			e.preventDefault();
			SetupProgressActions.getStarted(sitePurpose);
		},
	
		handleNoThanks: function handleNoThanks(e) {
			e.preventDefault();
			SetupProgressActions.disableJPO();
		},
	
		render: function render() {
			return React.createElement(
				'div',
				{ className: 'welcome__get-started--intro' },
				React.createElement(
					'div',
					{ className: 'welcome__get-started--wrapper' },
					React.createElement(
						'h1',
						null,
						'Welcome to WordPress'
					),
					React.createElement('br', null),
					React.createElement(
						'h2',
						{ className: 'welcome__callout welcome__get-started--callout' },
						'What kind of site can we help you set up?'
					),
					React.createElement(
						'p',
						null,
						React.createElement(
							Button,
							{ onClick: this.handleGetStarted.bind(this, "business"), primary: true },
							'Business'
						),
						React.createElement(
							Button,
							{ onClick: this.handleGetStarted.bind(this, "personal"), primary: true },
							'Personal'
						)
					),
					React.createElement(
						'p',
						null,
						React.createElement(
							'a',
							{ href: '', onClick: this.handleNoThanks },
							'I don\'t need help'
						)
					)
				),
				React.createElement('img', { className: 'welcome__get-started-image', src: JPS.base_url + '/img/jpo-welcome.png' })
			);
		}
	});
	
	module.exports = GetStarted;

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * External dependencies
	 */
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	var _react = __webpack_require__(4);
	
	var _react2 = _interopRequireDefault(_react);
	
	var _lodashAssign = __webpack_require__(180);
	
	var _lodashAssign2 = _interopRequireDefault(_lodashAssign);
	
	var _classnames = __webpack_require__(209);
	
	var _classnames2 = _interopRequireDefault(_classnames);
	
	var _lodashNoop = __webpack_require__(210);
	
	var _lodashNoop2 = _interopRequireDefault(_lodashNoop);
	
	__webpack_require__(211);
	
	exports['default'] = _react2['default'].createClass({
	
		displayName: 'Button',
	
		propTypes: {
			disabled: _react2['default'].PropTypes.bool,
			compact: _react2['default'].PropTypes.bool,
			primary: _react2['default'].PropTypes.bool,
			scary: _react2['default'].PropTypes.bool,
			type: _react2['default'].PropTypes.string,
			href: _react2['default'].PropTypes.string,
			onClick: _react2['default'].PropTypes.func,
			borderless: _react2['default'].PropTypes.bool
		},
	
		getDefaultProps: function getDefaultProps() {
			return {
				disabled: false,
				type: 'button',
				onClick: _lodashNoop2['default'],
				borderless: false
			};
		},
	
		render: function render() {
			var element = this.props.href ? 'a' : 'button';
			var buttonClasses = (0, _classnames2['default'])({
				'dops-button': true,
				'is-compact': this.props.compact,
				'is-primary': this.props.primary,
				'is-scary': this.props.scary,
				'is-borderless': this.props.borderless
			});
	
			var props = (0, _lodashAssign2['default'])({}, this.props, {
				className: (0, _classnames2['default'])(this.props.className, buttonClasses)
			});
	
			return _react2['default'].createElement(element, props, this.props.children);
		}
	});
	module.exports = exports['default'];

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(181),
	    createAssigner = __webpack_require__(185),
	    keys = __webpack_require__(198);
	
	/**
	 * Assigns own enumerable properties of source objects to the destination
	 * object. Source objects are applied from left to right. Subsequent sources
	 * overwrite property assignments of previous sources.
	 *
	 * **Note:** This method mutates `object` and is loosely based on
	 * [`Object.assign`](https://mdn.io/Object/assign).
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The destination object.
	 * @param {...Object} [sources] The source objects.
	 * @returns {Object} Returns `object`.
	 * @example
	 *
	 * function Foo() {
	 *   this.c = 3;
	 * }
	 *
	 * function Bar() {
	 *   this.e = 5;
	 * }
	 *
	 * Foo.prototype.d = 4;
	 * Bar.prototype.f = 6;
	 *
	 * _.assign({ 'a': 1 }, new Foo, new Bar);
	 * // => { 'a': 1, 'c': 3, 'e': 5 }
	 */
	var assign = createAssigner(function(object, source) {
	  copyObject(source, keys(source), object);
	});
	
	module.exports = assign;


/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var copyObjectWith = __webpack_require__(182);
	
	/**
	 * Copies properties of `source` to `object`.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @returns {Object} Returns `object`.
	 */
	function copyObject(source, props, object) {
	  return copyObjectWith(source, props, object);
	}
	
	module.exports = copyObject;


/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(183);
	
	/**
	 * This function is like `copyObject` except that it accepts a function to
	 * customize copied values.
	 *
	 * @private
	 * @param {Object} source The object to copy properties from.
	 * @param {Array} props The property names to copy.
	 * @param {Object} [object={}] The object to copy properties to.
	 * @param {Function} [customizer] The function to customize copied values.
	 * @returns {Object} Returns `object`.
	 */
	function copyObjectWith(source, props, object, customizer) {
	  object || (object = {});
	
	  var index = -1,
	      length = props.length;
	
	  while (++index < length) {
	    var key = props[index];
	
	    var newValue = customizer
	      ? customizer(object[key], source[key], key, object, source)
	      : source[key];
	
	    assignValue(object, key, newValue);
	  }
	  return object;
	}
	
	module.exports = copyObjectWith;


/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(184);
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Assigns `value` to `key` of `object` if the existing value is not equivalent
	 * using [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * for equality comparisons.
	 *
	 * @private
	 * @param {Object} object The object to modify.
	 * @param {string} key The key of the property to assign.
	 * @param {*} value The value to assign.
	 */
	function assignValue(object, key, value) {
	  var objValue = object[key];
	  if ((!eq(objValue, value) ||
	        (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) ||
	      (value === undefined && !(key in object))) {
	    object[key] = value;
	  }
	}
	
	module.exports = assignValue;


/***/ },
/* 184 */
/***/ function(module, exports) {

	/**
	 * Performs a [`SameValueZero`](http://ecma-international.org/ecma-262/6.0/#sec-samevaluezero)
	 * comparison between two values to determine if they are equivalent.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 * var other = { 'user': 'fred' };
	 *
	 * _.eq(object, object);
	 * // => true
	 *
	 * _.eq(object, other);
	 * // => false
	 *
	 * _.eq('a', 'a');
	 * // => true
	 *
	 * _.eq('a', Object('a'));
	 * // => false
	 *
	 * _.eq(NaN, NaN);
	 * // => true
	 */
	function eq(value, other) {
	  return value === other || (value !== value && other !== other);
	}
	
	module.exports = eq;


/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(186),
	    rest = __webpack_require__(194);
	
	/**
	 * Creates a function like `_.assign`.
	 *
	 * @private
	 * @param {Function} assigner The function to assign values.
	 * @returns {Function} Returns the new assigner function.
	 */
	function createAssigner(assigner) {
	  return rest(function(object, sources) {
	    var index = -1,
	        length = sources.length,
	        customizer = length > 1 ? sources[length - 1] : undefined,
	        guard = length > 2 ? sources[2] : undefined;
	
	    customizer = typeof customizer == 'function'
	      ? (length--, customizer)
	      : undefined;
	
	    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
	      customizer = length < 3 ? undefined : customizer;
	      length = 1;
	    }
	    object = Object(object);
	    while (++index < length) {
	      var source = sources[index];
	      if (source) {
	        assigner(object, source, index, customizer);
	      }
	    }
	    return object;
	  });
	}
	
	module.exports = createAssigner;


/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(184),
	    isArrayLike = __webpack_require__(187),
	    isIndex = __webpack_require__(193),
	    isObject = __webpack_require__(191);
	
	/**
	 * Checks if the given arguments are from an iteratee call.
	 *
	 * @private
	 * @param {*} value The potential iteratee value argument.
	 * @param {*} index The potential iteratee index or key argument.
	 * @param {*} object The potential iteratee object argument.
	 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
	 */
	function isIterateeCall(value, index, object) {
	  if (!isObject(object)) {
	    return false;
	  }
	  var type = typeof index;
	  if (type == 'number'
	      ? (isArrayLike(object) && isIndex(index, object.length))
	      : (type == 'string' && index in object)) {
	    return eq(object[index], value);
	  }
	  return false;
	}
	
	module.exports = isIterateeCall;


/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(188),
	    isFunction = __webpack_require__(190),
	    isLength = __webpack_require__(192);
	
	/**
	 * Checks if `value` is array-like. A value is considered array-like if it's
	 * not a function and has a `value.length` that's an integer greater than or
	 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	 * @example
	 *
	 * _.isArrayLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLike(document.body.children);
	 * // => true
	 *
	 * _.isArrayLike('abc');
	 * // => true
	 *
	 * _.isArrayLike(_.noop);
	 * // => false
	 */
	function isArrayLike(value) {
	  return value != null &&
	    !(typeof value == 'function' && isFunction(value)) && isLength(getLength(value));
	}
	
	module.exports = isArrayLike;


/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(189);
	
	/**
	 * Gets the "length" property value of `object`.
	 *
	 * **Note:** This function is used to avoid a [JIT bug](https://bugs.webkit.org/show_bug.cgi?id=142792)
	 * that affects Safari on at least iOS 8.1-8.3 ARM64.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {*} Returns the "length" value.
	 */
	var getLength = baseProperty('length');
	
	module.exports = getLength;


/***/ },
/* 189 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.property` without support for deep paths.
	 *
	 * @private
	 * @param {string} key The key of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function baseProperty(key) {
	  return function(object) {
	    return object == null ? undefined : object[key];
	  };
	}
	
	module.exports = baseProperty;


/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(191);
	
	/** `Object#toString` result references. */
	var funcTag = '[object Function]',
	    genTag = '[object GeneratorFunction]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `Function` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isFunction(_);
	 * // => true
	 *
	 * _.isFunction(/abc/);
	 * // => false
	 */
	function isFunction(value) {
	  // The use of `Object#toString` avoids issues with the `typeof` operator
	  // in Safari 8 which returns 'object' for typed array constructors, and
	  // PhantomJS 1.9 which returns 'function' for `NodeList` instances.
	  var tag = isObject(value) ? objectToString.call(value) : '';
	  return tag == funcTag || tag == genTag;
	}
	
	module.exports = isFunction;


/***/ },
/* 191 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is the [language type](https://es5.github.io/#x8) of `Object`.
	 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
	 * @example
	 *
	 * _.isObject({});
	 * // => true
	 *
	 * _.isObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isObject(_.noop);
	 * // => true
	 *
	 * _.isObject(null);
	 * // => false
	 */
	function isObject(value) {
	  var type = typeof value;
	  return !!value && (type == 'object' || type == 'function');
	}
	
	module.exports = isObject;


/***/ },
/* 192 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/**
	 * Checks if `value` is a valid array-like length.
	 *
	 * **Note:** This function is loosely based on [`ToLength`](http://ecma-international.org/ecma-262/6.0/#sec-tolength).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	 * @example
	 *
	 * _.isLength(3);
	 * // => true
	 *
	 * _.isLength(Number.MIN_VALUE);
	 * // => false
	 *
	 * _.isLength(Infinity);
	 * // => false
	 *
	 * _.isLength('3');
	 * // => false
	 */
	function isLength(value) {
	  return typeof value == 'number' &&
	    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	
	module.exports = isLength;


/***/ },
/* 193 */
/***/ function(module, exports) {

	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	
	/**
	 * Checks if `value` is a valid array-like index.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	 */
	function isIndex(value, length) {
	  value = (typeof value == 'number' || reIsUint.test(value)) ? +value : -1;
	  length = length == null ? MAX_SAFE_INTEGER : length;
	  return value > -1 && value % 1 == 0 && value < length;
	}
	
	module.exports = isIndex;


/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(195),
	    toInteger = __webpack_require__(196);
	
	/** Used as the `TypeError` message for "Functions" methods. */
	var FUNC_ERROR_TEXT = 'Expected a function';
	
	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeMax = Math.max;
	
	/**
	 * Creates a function that invokes `func` with the `this` binding of the
	 * created function and arguments from `start` and beyond provided as an array.
	 *
	 * **Note:** This method is based on the [rest parameter](https://mdn.io/rest_parameters).
	 *
	 * @static
	 * @memberOf _
	 * @category Function
	 * @param {Function} func The function to apply a rest parameter to.
	 * @param {number} [start=func.length-1] The start position of the rest parameter.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var say = _.rest(function(what, names) {
	 *   return what + ' ' + _.initial(names).join(', ') +
	 *     (_.size(names) > 1 ? ', & ' : '') + _.last(names);
	 * });
	 *
	 * say('hello', 'fred', 'barney', 'pebbles');
	 * // => 'hello fred, barney, & pebbles'
	 */
	function rest(func, start) {
	  if (typeof func != 'function') {
	    throw new TypeError(FUNC_ERROR_TEXT);
	  }
	  start = nativeMax(start === undefined ? (func.length - 1) : toInteger(start), 0);
	  return function() {
	    var args = arguments,
	        index = -1,
	        length = nativeMax(args.length - start, 0),
	        array = Array(length);
	
	    while (++index < length) {
	      array[index] = args[start + index];
	    }
	    switch (start) {
	      case 0: return func.call(this, array);
	      case 1: return func.call(this, args[0], array);
	      case 2: return func.call(this, args[0], args[1], array);
	    }
	    var otherArgs = Array(start + 1);
	    index = -1;
	    while (++index < start) {
	      otherArgs[index] = args[index];
	    }
	    otherArgs[start] = array;
	    return apply(func, this, otherArgs);
	  };
	}
	
	module.exports = rest;


/***/ },
/* 195 */
/***/ function(module, exports) {

	/**
	 * A faster alternative to `Function#apply`, this function invokes `func`
	 * with the `this` binding of `thisArg` and the arguments of `args`.
	 *
	 * @private
	 * @param {Function} func The function to invoke.
	 * @param {*} thisArg The `this` binding of `func`.
	 * @param {...*} args The arguments to invoke `func` with.
	 * @returns {*} Returns the result of `func`.
	 */
	function apply(func, thisArg, args) {
	  var length = args.length;
	  switch (length) {
	    case 0: return func.call(thisArg);
	    case 1: return func.call(thisArg, args[0]);
	    case 2: return func.call(thisArg, args[0], args[1]);
	    case 3: return func.call(thisArg, args[0], args[1], args[2]);
	  }
	  return func.apply(thisArg, args);
	}
	
	module.exports = apply;


/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(197);
	
	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0,
	    MAX_INTEGER = 1.7976931348623157e+308;
	
	/**
	 * Converts `value` to an integer.
	 *
	 * **Note:** This function is loosely based on [`ToInteger`](http://www.ecma-international.org/ecma-262/6.0/#sec-tointeger).
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to convert.
	 * @returns {number} Returns the converted integer.
	 * @example
	 *
	 * _.toInteger(3);
	 * // => 3
	 *
	 * _.toInteger(Number.MIN_VALUE);
	 * // => 0
	 *
	 * _.toInteger(Infinity);
	 * // => 1.7976931348623157e+308
	 *
	 * _.toInteger('3');
	 * // => 3
	 */
	function toInteger(value) {
	  if (!value) {
	    return value === 0 ? value : 0;
	  }
	  value = toNumber(value);
	  if (value === INFINITY || value === -INFINITY) {
	    var sign = (value < 0 ? -1 : 1);
	    return sign * MAX_INTEGER;
	  }
	  var remainder = value % 1;
	  return value === value ? (remainder ? value - remainder : value) : 0;
	}
	
	module.exports = toInteger;


/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(190),
	    isObject = __webpack_require__(191);
	
	/** Used as references for various `Number` constants. */
	var NAN = 0 / 0;
	
	/** Used to match leading and trailing whitespace. */
	var reTrim = /^\s+|\s+$/g;
	
	/** Used to detect bad signed hexadecimal string values. */
	var reIsBadHex = /^[-+]0x[0-9a-f]+$/i;
	
	/** Used to detect binary string values. */
	var reIsBinary = /^0b[01]+$/i;
	
	/** Used to detect octal string values. */
	var reIsOctal = /^0o[0-7]+$/i;
	
	/** Built-in method references without a dependency on `root`. */
	var freeParseInt = parseInt;
	
	/**
	 * Converts `value` to a number.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {number} Returns the number.
	 * @example
	 *
	 * _.toNumber(3);
	 * // => 3
	 *
	 * _.toNumber(Number.MIN_VALUE);
	 * // => 5e-324
	 *
	 * _.toNumber(Infinity);
	 * // => Infinity
	 *
	 * _.toNumber('3');
	 * // => 3
	 */
	function toNumber(value) {
	  if (isObject(value)) {
	    var other = isFunction(value.valueOf) ? value.valueOf() : value;
	    value = isObject(other) ? (other + '') : other;
	  }
	  if (typeof value != 'string') {
	    return value === 0 ? value : +value;
	  }
	  value = value.replace(reTrim, '');
	  var isBinary = reIsBinary.test(value);
	  return (isBinary || reIsOctal.test(value))
	    ? freeParseInt(value.slice(2), isBinary ? 2 : 8)
	    : (reIsBadHex.test(value) ? NAN : +value);
	}
	
	module.exports = toNumber;


/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(199),
	    baseKeys = __webpack_require__(200),
	    indexKeys = __webpack_require__(201),
	    isArrayLike = __webpack_require__(187),
	    isIndex = __webpack_require__(193),
	    isPrototype = __webpack_require__(208);
	
	/**
	 * Creates an array of the own enumerable property names of `object`.
	 *
	 * **Note:** Non-object values are coerced to objects. See the
	 * [ES spec](http://ecma-international.org/ecma-262/6.0/#sec-object.keys)
	 * for more details.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.keys(new Foo);
	 * // => ['a', 'b'] (iteration order is not guaranteed)
	 *
	 * _.keys('hi');
	 * // => ['0', '1']
	 */
	function keys(object) {
	  var isProto = isPrototype(object);
	  if (!(isProto || isArrayLike(object))) {
	    return baseKeys(object);
	  }
	  var indexes = indexKeys(object),
	      skipIndexes = !!indexes,
	      result = indexes || [],
	      length = result.length;
	
	  for (var key in object) {
	    if (baseHas(object, key) &&
	        !(skipIndexes && (key == 'length' || isIndex(key, length))) &&
	        !(isProto && key == 'constructor')) {
	      result.push(key);
	    }
	  }
	  return result;
	}
	
	module.exports = keys;


/***/ },
/* 199 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/** Built-in value references. */
	var getPrototypeOf = Object.getPrototypeOf;
	
	/**
	 * The base implementation of `_.has` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHas(object, key) {
	  // Avoid a bug in IE 10-11 where objects with a [[Prototype]] of `null`,
	  // that are composed entirely of index properties, return `false` for
	  // `hasOwnProperty` checks of them.
	  return hasOwnProperty.call(object, key) ||
	    (typeof object == 'object' && key in object && getPrototypeOf(object) === null);
	}
	
	module.exports = baseHas;


/***/ },
/* 200 */
/***/ function(module, exports) {

	/* Built-in method references for those with the same name as other `lodash` methods. */
	var nativeKeys = Object.keys;
	
	/**
	 * The base implementation of `_.keys` which doesn't skip the constructor
	 * property of prototypes or treat sparse arrays as dense.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the array of property names.
	 */
	function baseKeys(object) {
	  return nativeKeys(Object(object));
	}
	
	module.exports = baseKeys;


/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(202),
	    isArguments = __webpack_require__(203),
	    isArray = __webpack_require__(206),
	    isLength = __webpack_require__(192),
	    isString = __webpack_require__(207);
	
	/**
	 * Creates an array of index keys for `object` values of arrays,
	 * `arguments` objects, and strings, otherwise `null` is returned.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array|null} Returns index keys, else `null`.
	 */
	function indexKeys(object) {
	  var length = object ? object.length : undefined;
	  if (isLength(length) &&
	      (isArray(object) || isString(object) || isArguments(object))) {
	    return baseTimes(length, String);
	  }
	  return null;
	}
	
	module.exports = indexKeys;


/***/ },
/* 202 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.times` without support for iteratee shorthands
	 * or max array length checks.
	 *
	 * @private
	 * @param {number} n The number of times to invoke `iteratee`.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the array of results.
	 */
	function baseTimes(n, iteratee) {
	  var index = -1,
	      result = Array(n);
	
	  while (++index < n) {
	    result[index] = iteratee(index);
	  }
	  return result;
	}
	
	module.exports = baseTimes;


/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(204);
	
	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	
	/**
	 * Checks if `value` is likely an `arguments` object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArguments(function() { return arguments; }());
	 * // => true
	 *
	 * _.isArguments([1, 2, 3]);
	 * // => false
	 */
	function isArguments(value) {
	  // Safari 8.1 incorrectly makes `arguments.callee` enumerable in strict mode.
	  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
	    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
	}
	
	module.exports = isArguments;


/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(187),
	    isObjectLike = __webpack_require__(205);
	
	/**
	 * This method is like `_.isArrayLike` except that it also checks if `value`
	 * is an object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is an array-like object, else `false`.
	 * @example
	 *
	 * _.isArrayLikeObject([1, 2, 3]);
	 * // => true
	 *
	 * _.isArrayLikeObject(document.body.children);
	 * // => true
	 *
	 * _.isArrayLikeObject('abc');
	 * // => false
	 *
	 * _.isArrayLikeObject(_.noop);
	 * // => false
	 */
	function isArrayLikeObject(value) {
	  return isObjectLike(value) && isArrayLike(value);
	}
	
	module.exports = isArrayLikeObject;


/***/ },
/* 205 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is object-like. A value is object-like if it's not `null`
	 * and has a `typeof` result of "object".
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	 * @example
	 *
	 * _.isObjectLike({});
	 * // => true
	 *
	 * _.isObjectLike([1, 2, 3]);
	 * // => true
	 *
	 * _.isObjectLike(_.noop);
	 * // => false
	 *
	 * _.isObjectLike(null);
	 * // => false
	 */
	function isObjectLike(value) {
	  return !!value && typeof value == 'object';
	}
	
	module.exports = isObjectLike;


/***/ },
/* 206 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is classified as an `Array` object.
	 *
	 * @static
	 * @memberOf _
	 * @type {Function}
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isArray([1, 2, 3]);
	 * // => true
	 *
	 * _.isArray(document.body.children);
	 * // => false
	 *
	 * _.isArray('abc');
	 * // => false
	 *
	 * _.isArray(_.noop);
	 * // => false
	 */
	var isArray = Array.isArray;
	
	module.exports = isArray;


/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(206),
	    isObjectLike = __webpack_require__(205);
	
	/** `Object#toString` result references. */
	var stringTag = '[object String]';
	
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;
	
	/**
	 * Checks if `value` is classified as a `String` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isString('abc');
	 * // => true
	 *
	 * _.isString(1);
	 * // => false
	 */
	function isString(value) {
	  return typeof value == 'string' ||
	    (!isArray(value) && isObjectLike(value) && objectToString.call(value) == stringTag);
	}
	
	module.exports = isString;


/***/ },
/* 208 */
/***/ function(module, exports) {

	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	
	/**
	 * Checks if `value` is likely a prototype object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	 */
	function isPrototype(value) {
	  var Ctor = value && value.constructor,
	      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;
	
	  return value === proto;
	}
	
	module.exports = isPrototype;


/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2015 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */
	
	(function () {
		'use strict';
	
		var hasOwn = {}.hasOwnProperty;
	
		function classNames () {
			var classes = '';
	
			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;
	
				var argType = typeof arg;
	
				if (argType === 'string' || argType === 'number') {
					classes += ' ' + arg;
				} else if (Array.isArray(arg)) {
					classes += ' ' + classNames.apply(null, arg);
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes += ' ' + key;
						}
					}
				}
			}
	
			return classes.substr(1);
		}
	
		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },
/* 210 */
/***/ function(module, exports) {

	/**
	 * A no-operation function that returns `undefined` regardless of the
	 * arguments it receives.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.noop(object) === undefined;
	 * // => true
	 */
	function noop() {
	  // No operation performed.
	}
	
	module.exports = noop;


/***/ },
/* 211 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 212 */,
/* 213 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4),
	    SiteActions = __webpack_require__(169),
	    SiteStore = __webpack_require__(170),
	    WelcomeSection = __webpack_require__(214),
	    Button = __webpack_require__(179),
	    SetupProgressActions = __webpack_require__(166);
	
	function getSiteTitleState() {
		return {
			title: SiteStore.getTitle(),
			description: SiteStore.getDescription()
		};
	}
	
	var SiteTitleStep = React.createClass({
		displayName: 'SiteTitleStep',
	
		componentDidMount: function componentDidMount() {
			SiteStore.addChangeListener(this._onChange);
		},
	
		componentWillUnmount: function componentWillUnmount() {
			SiteStore.removeChangeListener(this._onChange);
		},
	
		_onChange: function _onChange() {
			this.setState(getSiteTitleState());
		},
	
		getInitialState: function getInitialState() {
			return getSiteTitleState();
		},
	
		handleChangeTitle: function handleChangeTitle(e) {
			this.setState({ title: e.currentTarget.value });
		},
	
		handleChangeDescription: function handleChangeDescription(e) {
			this.setState({ description: e.currentTarget.value });
		},
	
		handleSubmit: function handleSubmit(e) {
			e.preventDefault();
			SetupProgressActions.submitTitleStep(this.state.title, this.state.description);
		},
	
		render: function render() {
			return React.createElement(
				WelcomeSection,
				{ id: 'welcome__site-title' },
				React.createElement(
					'h1',
					null,
					'Let\'s launch your new website'
				),
				React.createElement(
					'p',
					{ className: 'welcome__callout welcome__site-title--callout' },
					'Name and describe your website'
				),
				React.createElement(
					'form',
					{ onSubmit: this.handleSubmit, className: 'welcome__site-title--form' },
					React.createElement(
						'label',
						{ htmlFor: 'site_title' },
						'Site Title'
					),
					React.createElement('input', { type: 'text', name: 'site_title', id: 'site-title', autoComplete: 'off', onChange: this.handleChangeTitle, value: this.state.title, placeholder: 'e.g. My WordPress site', required: true }),
					React.createElement(
						'label',
						{ htmlFor: 'site_description' },
						'Site Description'
					),
					React.createElement('input', { type: 'text', name: 'site_description', id: 'site-description', autoComplete: 'off', onChange: this.handleChangeDescription, value: this.state.description, placeholder: 'e.g. Just another WordPress blog', required: true }),
					React.createElement(
						Button,
						{ className: 'welcome-submit', primary: true, type: 'submit' },
						'Next Step'
					)
				)
			);
		}
	});
	
	module.exports = SiteTitleStep;

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var React = __webpack_require__(4);
	
	var WelcomeSection = React.createClass({
		displayName: "WelcomeSection",
	
		render: function render() {
			var other = _objectWithoutProperties(this.props, []);
	
			return React.createElement(
				"div",
				_extends({}, other, { className: "welcome__section" }),
				this.props.children
			);
		}
	});
	
	module.exports = WelcomeSection;

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4),
	    SiteStore = __webpack_require__(170),
	    Button = __webpack_require__(179),
	    WelcomeSection = __webpack_require__(214),
	    SetupProgressActions = __webpack_require__(166);
	
	function getSiteLayoutState() {
		return {
			site_title: SiteStore.getTitle(),
			layout: SiteStore.getLayout()
		};
	}
	
	var LayoutStep = React.createClass({
		displayName: 'LayoutStep',
	
		componentDidMount: function componentDidMount() {
			SiteStore.addChangeListener(this._onChange);
		},
	
		componentWillUnmount: function componentWillUnmount() {
			SiteStore.removeChangeListener(this._onChange);
		},
	
		_onChange: function _onChange() {
			this.setState(getSiteLayoutState());
		},
	
		getInitialState: function getInitialState() {
			return getSiteLayoutState();
		},
	
		handleIsBlog: function handleIsBlog() {
			SetupProgressActions.confirmHomepageStep();
		},
	
		handleNotBlog: function handleNotBlog() {
			SetupProgressActions.submitLayoutStep('website');
		},
	
		render: function render() {
			return React.createElement(
				WelcomeSection,
				{ id: 'welcome__layout' },
				React.createElement(
					'h1',
					null,
					'Let\'s launch ',
					React.createElement(
						'em',
						null,
						this.state.site_title
					)
				),
				React.createElement(
					'p',
					{ className: 'welcome__callout welcome__layout--callout' },
					'Are you going to update your site with news or blog posts?'
				),
				React.createElement(
					'p',
					null,
					React.createElement(
						Button,
						{ onClick: this.handleIsBlog, primary: true },
						'Yes'
					),
					React.createElement(
						Button,
						{ onClick: this.handleNotBlog },
						'Nope'
					)
				)
			);
		}
	});
	
	module.exports = LayoutStep;

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4),
	    classNames = __webpack_require__(209),
	    SiteStore = __webpack_require__(170),
	    Button = __webpack_require__(179),
	    WelcomeSection = __webpack_require__(214),
	    SetupProgressActions = __webpack_require__(166);
	
	function getSiteLayoutState() {
		return {
			site_title: SiteStore.getTitle(),
			layout: SiteStore.getLayout(),
			siteScreenshot: JPS.base_url + '/img/jpo-layout-static.jpg',
			blogScreenshot: JPS.base_url + '/img/jpo-layout-news.jpg'
		};
	}
	
	var HomepageStep = React.createClass({
		displayName: 'HomepageStep',
	
		componentDidMount: function componentDidMount() {
			SiteStore.addChangeListener(this._onChange);
		},
	
		componentWillUnmount: function componentWillUnmount() {
			SiteStore.removeChangeListener(this._onChange);
		},
	
		_onChange: function _onChange() {
			this.setState(getSiteLayoutState());
		},
	
		getInitialState: function getInitialState() {
			return getSiteLayoutState();
		},
	
		handleSetLayout: function handleSetLayout(e) {
			var layout = jQuery(e.currentTarget).val();
			this.setState({ layout: layout });
			SetupProgressActions.submitLayoutStep(layout);
		},
	
		skipStep: function skipStep(e) {
			e.preventDefault();
			var layout = 'blog';
			this.setState({ layout: layout });
			SetupProgressActions.submitLayoutStep(layout);
		},
	
		render: function render() {
			return React.createElement(
				WelcomeSection,
				{ id: 'welcome__homepage' },
				React.createElement(
					'h1',
					null,
					'Let\'s launch ',
					React.createElement(
						'em',
						null,
						this.state.site_title
					)
				),
				React.createElement(
					'p',
					{ className: 'welcome__callout welcome__homepage--callout' },
					'What should visitors see on your homepage?'
				),
				React.createElement(
					'form',
					null,
					React.createElement(
						'div',
						{ className: 'welcome__homepage-cols' },
						React.createElement(
							'div',
							{ className: classNames({ 'welcome__homepage-col': true, 'is-selected': this.state.layout === 'blog' }) },
							React.createElement(
								'label',
								null,
								React.createElement('input', { type: 'radio', name: 'site_layout', value: 'blog', checked: this.state.layout === 'blog', onChange: this.handleSetLayout, className: 'screen-reader-text' }),
								React.createElement('img', { src: this.state.blogScreenshot }),
								React.createElement(
									'p',
									null,
									'Most recent news or updates'
								)
							)
						),
						React.createElement(
							'div',
							{ className: classNames({ 'welcome__homepage-col': true, 'is-selected': this.state.layout === 'site-blog' }) },
							React.createElement(
								'label',
								null,
								React.createElement('input', { type: 'radio', name: 'site_layout', value: 'site-blog', checked: this.state.layout === 'site-blog', onChange: this.handleSetLayout, className: 'screen-reader-text' }),
								React.createElement('img', { src: this.state.siteScreenshot }),
								React.createElement(
									'p',
									null,
									'A static welcome page'
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'welcome__submit' },
						React.createElement(
							Button,
							{ className: 'welcome__skip-link', onClick: this.skipStep },
							'Skip this step'
						)
					)
				)
			);
		}
	});
	
	module.exports = HomepageStep;

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4),
	    SiteStore = __webpack_require__(170),
	    Button = __webpack_require__(179),
	    WelcomeSection = __webpack_require__(214),
	    SetupProgressActions = __webpack_require__(166);
	
	function getSiteContactState() {
		return {
			site_title: SiteStore.getTitle(),
			contactPageURL: SiteStore.getContactPageURL(),
			contactPageScreenshot: JPS.base_url + '/img/jpo-contact.jpg'
		};
	}
	
	var ContactPageStep = React.createClass({
		displayName: 'ContactPageStep',
	
		componentDidMount: function componentDidMount() {
			SiteStore.addChangeListener(this._onChange);
		},
	
		componentWillUnmount: function componentWillUnmount() {
			SiteStore.removeChangeListener(this._onChange);
		},
	
		_onChange: function _onChange() {
			this.setState(getSiteContactState());
		},
	
		getInitialState: function getInitialState() {
			return getSiteContactState();
		},
	
		handleBuildContact: function handleBuildContact(e) {
			e.preventDefault();
			SetupProgressActions.createContactPage();
		},
	
		handleSubmit: function handleSubmit(e) {
			e.preventDefault();
			SetupProgressActions.skipContactPageBuild();
		},
	
		handleContinue: function handleContinue(e) {
			e.preventDefault();
			SetupProgressActions.selectNextStep();
		},
	
		render: function render() {
			return React.createElement(
				WelcomeSection,
				{ id: 'welcome__contact' },
				React.createElement(
					'h1',
					null,
					'Let\'s launch ',
					React.createElement(
						'em',
						null,
						this.state.site_title
					)
				),
				this.state.contactPageURL ? this._renderWithContactPage() : this._renderWithoutContactPage()
			);
		},
	
		_renderWithContactPage: function _renderWithContactPage() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'p',
					{ className: 'welcome__callout welcome__contact--callout welcome__contact-exists--callout' },
					'View your starter ',
					React.createElement(
						'a',
						{ href: this.state.contactPageURL, target: '_blank' },
						'Contact Us'
					),
					' page.'
				),
				React.createElement(
					'p',
					{ className: 'welcome__contact-submit' },
					React.createElement(
						Button,
						{ primary: true, onClick: this.handleContinue },
						'Next Step →'
					)
				)
			);
		},
	
		_renderWithoutContactPage: function _renderWithoutContactPage() {
			return React.createElement(
				'div',
				{ className: 'welcome__contact' },
				React.createElement(
					'p',
					{ className: 'welcome__callout welcome__contact--callout welcome__contact-build--callout' },
					'Build a ',
					React.createElement(
						'em',
						null,
						'starter'
					),
					' "Contact Us" page?'
				),
				React.createElement('img', { src: this.state.contactPageScreenshot }),
				React.createElement(
					'div',
					{ className: 'welcome__submit' },
					React.createElement(
						Button,
						{ primary: true, onClick: this.handleBuildContact },
						'Yes'
					),
					React.createElement(
						Button,
						{ onClick: this.handleSubmit },
						'No Thanks'
					)
				)
			);
		}
	});
	
	module.exports = ContactPageStep;

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4),
	    SkipButton = __webpack_require__(219),
	    SiteStore = __webpack_require__(170),
	    SiteActions = __webpack_require__(169),
	    Paths = __webpack_require__(167),
	    ContentBox = __webpack_require__(220),
	    WelcomeSection = __webpack_require__(214),
	    SetupProgressActions = __webpack_require__(166),
	    SpinnerStore = __webpack_require__(174),
	    Button = __webpack_require__(179);
	
	function getJetpackState() {
		return {
			site_title: SiteStore.getTitle(),
			jetpackConfigured: SiteStore.getJetpackConfigured(),
			jumpstartEnabled: SiteStore.getJetpackJumpstartEnabled(),
			modulesEnabled: SiteStore.getActiveModuleSlugs(),
			settingsUrl: SiteStore.getJetpackSettingsUrl()
		};
	}
	
	var JetpackJumpstart = React.createClass({
		displayName: 'JetpackJumpstart',
	
		componentDidMount: function componentDidMount() {
			SiteStore.addChangeListener(this._onChange);
		},
	
		componentWillUnmount: function componentWillUnmount() {
			SiteStore.removeChangeListener(this._onChange);
		},
	
		_onChange: function _onChange() {
			this.setState(getJetpackState());
		},
	
		getInitialState: function getInitialState() {
			var state = getJetpackState();
			state.showMoreModules = false;
			state.jetpackConnecting = false;
			return state;
		},
	
		handleJetpackConnect: function handleJetpackConnect(e) {
			e.preventDefault();
	
			this.setState({ jetpackConnecting: true });
			SiteActions.configureJetpack(Paths.REVIEW_STEP_SLUG).always((function () {
				this.setState({ jetpackConnecting: false });
			}).bind(this));
		},
	
		handleNext: function handleNext(e) {
			e.preventDefault();
	
			SetupProgressActions.completeAndNextStep(Paths.JETPACK_MODULES_STEP_SLUG);
		},
	
		render: function render() {
			return React.createElement(
				WelcomeSection,
				{ id: 'welcome__jetpack' },
				React.createElement(
					'h1',
					null,
					'Let\'s launch ',
					React.createElement(
						'em',
						null,
						this.state.site_title
					)
				),
				React.createElement(
					'p',
					{ className: 'welcome__callout welcome__jetpack--callout' },
					'Connect your Jetpack profile to improve security, track stats, and grow traffic'
				),
				this.state.jetpackConfigured ? React.createElement(
					'div',
					null,
					React.createElement(
						'p',
						null,
						'Congratulations! You\'ve enabled Jetpack and unlocked dozens of powerful features.'
					),
					React.createElement(
						'p',
						null,
						React.createElement(
							'a',
							{ href: this.state.settingsUrl },
							'Check out the settings page…'
						)
					),
					React.createElement(
						'div',
						{ className: 'welcome__submit' },
						React.createElement(
							Button,
							{ primary: true, onClick: this.handleNext },
							'Next Step'
						)
					)
				) : React.createElement(
					'div',
					{ className: 'welcome__submit' },
					React.createElement(
						Button,
						{ disabled: this.state.jetpackConnecting, onClick: this.handleJetpackConnect, primary: true },
						this.state.jetpackConnecting ? 'Connecting' : 'Connect',
						' to WordPress.com'
					),
					!this.state.jetpackConnecting && React.createElement(SkipButton, null)
				),
				React.createElement(
					'div',
					{ className: 'jetpack_connect_info' },
					React.createElement(
						'h2',
						null,
						'Grow and Track Your Community'
					),
					React.createElement('img', { src: JPS.base_url + '/img/stats-example-sm.png' }),
					React.createElement(
						'p',
						null,
						'Jetpack provides Stats, insights and visitor information.'
					),
					React.createElement(
						'p',
						null,
						'Use Jetpack tools like Publicize, Sharing, Subscribing and Related Posts to increase traffic, and onsite engagement.'
					)
				),
				React.createElement(
					'div',
					{ className: 'jetpack_connect_info' },
					React.createElement(
						'h2',
						null,
						'Increase Security and Site Speed'
					),
					React.createElement('img', { src: JPS.base_url + '/img/feature-photon-sm.jpg' }),
					React.createElement(
						'p',
						null,
						'Gain peace of mind with Protect, the tool that has blocked billions of login attacks on millions of sites.'
					),
					React.createElement(
						'p',
						null,
						'Photon utilizes the state-of-the-art WordPress.com content delivery network to load your gorgeous images super fast optimized for any device, and it’s completely free.'
					)
				)
			);
		}
	});
	
	module.exports = JetpackJumpstart;

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4),
	    SetupProgressStore = __webpack_require__(158),
	    SetupProgressActions = __webpack_require__(166),
	    Button = __webpack_require__(179);
	
	function getSetupProgress() {
		return {
			completed: SetupProgressStore.getCurrentStep().completed
		};
	}
	
	var SkipButton = React.createClass({
		displayName: 'SkipButton',
	
		componentDidMount: function componentDidMount() {
			SetupProgressStore.addChangeListener(this._onChange);
		},
	
		componentWillUnmount: function componentWillUnmount() {
			SetupProgressStore.removeChangeListener(this._onChange);
		},
	
		_onChange: function _onChange() {
			this.setState(getSetupProgress());
		},
	
		getInitialState: function getInitialState() {
			return getSetupProgress();
		},
	
		handleSkip: function handleSkip(e) {
			e.preventDefault();
			SetupProgressActions.skipStep();
		},
	
		render: function render() {
			var completed = this.state.completed;
			if (completed) {
				return null;
			} else {
				return React.createElement(
					Button,
					{ className: 'welcome__skip-step', href: '#', onClick: this.handleSkip },
					'Not now'
				);
			}
		}
	});
	
	module.exports = SkipButton;

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var React = __webpack_require__(4);
	
	var ContentBox = React.createClass({
		displayName: "ContentBox",
	
		render: function render() {
			return React.createElement(
				"div",
				{ className: "welcome__content-box clear" },
				this.props.children
			);
		}
	});
	
	module.exports = ContentBox;

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var React = __webpack_require__(4),
	    Button = __webpack_require__(179),
	    SiteStore = __webpack_require__(170),
	    Paths = __webpack_require__(167),
	    Dashicon = __webpack_require__(222),
	    SetupProgressActions = __webpack_require__(166),
	    WelcomeSection = __webpack_require__(214);
	
	function getSiteState() {
		return {
			site_title: SiteStore.getTitle(),
			contactUrl: SiteStore.getContactPageEditURL(),
			welcomeUrl: SiteStore.getWelcomePageEditURL(),
			newsUrl: SiteStore.getNewsPageEditURL(),
			isJPConnected: SiteStore.getJetpackConfigured(),
			layout: SiteStore.getLayout()
		};
	}
	
	var AdvancedSettingsStep = React.createClass({
		displayName: 'AdvancedSettingsStep',
	
		getInitialState: function getInitialState() {
			return getSiteState();
		},
	
		componentDidMount: function componentDidMount() {
			SiteStore.addChangeListener(this._onChange);
		},
	
		componentWillUnmount: function componentWillUnmount() {
			SiteStore.removeChangeListener(this._onChange);
		},
	
		_onChange: function _onChange() {
			this.setState(getSiteState());
		},
	
		handleSkipTo: function handleSkipTo(slug, event) {
			event.preventDefault();
			SetupProgressActions.setCurrentStep(slug);
		},
	
		handleDismiss: function handleDismiss(event) {
			event.preventDefault();
			SetupProgressActions.closeJPO();
		},
	
		render: function render() {
			var contactProps = {};
			if (this.state.contactUrl) {
				contactProps.href = this.state.contactUrl;
			} else {
				contactProps.href = '#';
				contactProps.onClick = this.handleSkipTo.bind(this, Paths.CONTACT_PAGE_STEP_SLUG);
			}
			return React.createElement(
				WelcomeSection,
				{ id: 'welcome__review' },
				React.createElement(
					'div',
					{ className: 'welcome__dismiss' },
					React.createElement(
						'a',
						{ href: '#', onClick: this.handleDismiss },
						React.createElement(Dashicon, { name: 'dismiss' }),
						React.createElement(
							'span',
							{ className: 'screen-reader-text' },
							'Dismiss'
						)
					)
				),
				React.createElement(
					'h1',
					null,
					'Let\'s launch ',
					React.createElement(
						'em',
						null,
						this.state.site_title
					)
				),
				React.createElement(
					'p',
					{ className: 'welcome__callout welcome__review--callout' },
					'Great Work!'
				),
				React.createElement(
					'div',
					{ className: 'welcome__review-cols' },
					React.createElement(
						'div',
						{ className: 'welcome__review-col' },
						React.createElement(
							'ul',
							{ className: 'welcome__review-list' },
							React.createElement(
								'li',
								null,
								React.createElement(Dashicon, { name: 'yes' }),
								' Title and description ',
								React.createElement(
									'a',
									{ href: '#', onClick: this.handleSkipTo.bind(this, Paths.SITE_TITLE_STEP_SLUG) },
									'(edit)'
								)
							),
							React.createElement(
								'li',
								null,
								React.createElement(Dashicon, { name: 'yes' }),
								' Homepage layout ',
								React.createElement(
									'a',
									{ href: '#', onClick: this.handleSkipTo.bind(this, Paths.IS_BLOG_STEP_SLUG) },
									'(edit)'
								),
								this.state.layout !== 'blog' ? React.createElement(
									'ul',
									null,
									React.createElement(
										'li',
										null,
										React.createElement(
											'a',
											{ href: this.state.welcomeUrl },
											'Edit your Welcome page'
										)
									),
									this.state.layout !== 'website' ? React.createElement(
										'li',
										null,
										React.createElement(
											'a',
											{ href: this.state.newsUrl },
											'Edit your News and Updates page'
										)
									) : null
								) : null
							),
							React.createElement(
								'li',
								null,
								React.createElement(Dashicon, { name: 'yes' }),
								' ',
								React.createElement(
									'em',
									null,
									'Contact Us'
								),
								' page ',
								React.createElement(
									'a',
									contactProps,
									'(edit)'
								)
							),
							React.createElement(
								'li',
								null,
								React.createElement(Dashicon, { name: 'yes' }),
								this.state.isJPConnected ? React.createElement(
									'a',
									{ href: JPS.steps.advanced_settings.jetpack_dash },
									'Jetpack: '
								) : React.createElement(
									'a',
									{ href: '#', onClick: this.handleSkipTo.bind(this, Paths.JETPACK_MODULES_STEP_SLUG) },
									'Connect Jetpack: '
								),
								'increase visitors and improve security'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'welcome__review-col welcome__review-themes' },
						React.createElement('img', { src: JPS.base_url + '/img/jpo-themes.png' }),
						React.createElement(
							'p',
							null,
							React.createElement(
								Button,
								{ href: JPS.steps.advanced_settings.customize_url },
								'Customize your site'
							)
						)
					)
				)
			);
		}
	});
	
	module.exports = AdvancedSettingsStep;

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	// simple noticon wrapper
	
	'use strict';
	
	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };
	
	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }
	
	var React = __webpack_require__(4);
	
	var Dashicon = React.createClass({
		displayName: 'Dashicon',
	
		propTypes: {
			name: React.PropTypes.string.isRequired
		},
	
		render: function render() {
			var _props = this.props;
			var name = _props.name;
	
			var other = _objectWithoutProperties(_props, ['name']);
	
			return React.createElement(
				'span',
				_extends({ className: 'dashicons dashicons-' + name }, other),
				this.props.children
			);
		}
	});
	
	module.exports = Dashicon;

/***/ }
]);
//# sourceMappingURL=jetpack-onboarding.js.map