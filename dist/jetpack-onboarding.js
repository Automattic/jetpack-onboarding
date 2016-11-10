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
	    ReactDOM = __webpack_require__(33),
	    WelcomeWidget = __webpack_require__(166),
	    Paths = __webpack_require__(175),
	    SetupProgressStore = __webpack_require__(167);

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
				welcomeView: __webpack_require__(258)
			}, {
				name: 'Is this a blog?',
				slug: Paths.IS_BLOG_STEP_SLUG,
				welcomeView: __webpack_require__(262)
			}, {
				name: 'Set your homepage',
				slug: Paths.HOMEPAGE_STEP_SLUG,
				welcomeView: __webpack_require__(263)
			}, {
				name: 'Contact Info',
				slug: Paths.CONTACT_PAGE_STEP_SLUG,
				welcomeView: __webpack_require__(264)
			}, {
				name: 'Enable Jetpack',
				slug: Paths.JETPACK_MODULES_STEP_SLUG,
				neverSkip: true, // don't skip this even if it's been completed
				welcomeView: __webpack_require__(265)
			}, {
				name: 'Business Address',
				slug: Paths.BUSINESS_ADDRESS_SLUG,
				welcomeView: __webpack_require__(268)
			}, {
				name: 'WooCommerce',
				slug: Paths.WOOCOMMERCE_SLUG,
				welcomeView: __webpack_require__(269)
			}, {
				name: 'Existing Store',
				slug: Paths.EXISTING_STORE_STEP_SLUG,
				welcomeView: __webpack_require__(270)
			}, {
				name: 'Review settings',
				slug: Paths.REVIEW_STEP_SLUG,
				welcomeView: __webpack_require__(366),
				includeInProgress: false,
				neverSkip: true
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
/* 157 */,
/* 158 */,
/* 159 */,
/* 160 */,
/* 161 */,
/* 162 */,
/* 163 */,
/* 164 */,
/* 165 */,
/* 166 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    SetupProgressStore = __webpack_require__(167),
	    SetupProgressActions = __webpack_require__(174),
	    SpinnerStore = __webpack_require__(219),
	    SpinnerActions = __webpack_require__(218),
	    DataStore = __webpack_require__(220),
	    Flash = __webpack_require__(221),
	    GetStarted = __webpack_require__(223);

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
						'\xA0\xA0',
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
/* 167 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	 * Store which manages and persists setup wizard progress
	 */

	var AppDispatcher = __webpack_require__(168),
	    EventEmitter = __webpack_require__(171).EventEmitter,
	    JPSConstants = __webpack_require__(172);

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
	  _.where(_steps, { static: false }).forEach(function (step) {
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
/* 168 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

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

	var Dispatcher = __webpack_require__(169).Dispatcher;

	module.exports = new Dispatcher();

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Copyright (c) 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	module.exports.Dispatcher = __webpack_require__(170);


/***/ },
/* 170 */
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

	var invariant = __webpack_require__(10);

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
/* 171 */
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
	      } else {
	        // At least give some kind of context to the user
	        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
	        err.context = er;
	        throw err;
	      }
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
/* 172 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var keyMirror = __webpack_require__(173);

	module.exports = keyMirror({
		STEP_COMPLETE: null,
		STEP_GET_STARTED: null,
		STEP_SELECT: null,
		STEP_NEXT: null,
		STEP_SKIP: null,
		SITE_SET_TITLE: null,
		SITE_SET_TYPE: null,
		SITE_SET_DESCRIPTION: null,
		SITE_ADD_BUSINESS_ADDRESS: null,
		SITE_INSTALL_WOOCOMMERCE: null,
		SITE_INSTALL_WOOCOMMERCE_SUCCESS: null,
		SITE_INSTALL_WOOCOMMERCE_FAIL: null,
		SITE_REDIRECT_TO_WOOCOMMERCE_SETUP: null,
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
/* 173 */
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
/* 174 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(168),
	    JPSConstants = __webpack_require__(172),
	    Paths = __webpack_require__(175),
	    FlashActions = __webpack_require__(176),
	    SiteActions = __webpack_require__(177),
	    WPAjax = __webpack_require__(216),
	    SpinnerActions = __webpack_require__(218),
	    SetupProgressStore = __webpack_require__(167),
	    SiteStore = __webpack_require__(215);

	var SetupProgressActions = {
		resetData: function resetData() {
			WPAjax.post(JPS.site_actions.reset_data).fail(function (msg) {
				FlashActions.error("Failed to save data: " + msg);
			});
			AppDispatcher.dispatch({
				actionType: JPSConstants.RESET_DATA
			});
		},

		completeStepNoRecord: function completeStepNoRecord(slug) {
			// Sometimes we want to mark a step as complete without recording the completion in our tracking data.
			var step = SetupProgressStore.getStepFromSlug(slug);
			AppDispatcher.dispatch({
				actionType: JPSConstants.STEP_COMPLETE,
				slug: slug
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
			this.completeStep(slug, meta).always(function () {
				// getCurrentStep _should_ return the correct step slug for the 'next' step here...
				// this needs to be in the callback because otherwise there's a chance
				// that COMPLETE could be registered in analytics after VIEWED
				this._recordStepViewed(SetupProgressStore.getCurrentStep());
			}.bind(this));

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

			SiteActions.setType(siteType);

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

		submitBusinessAddress: function submitBusinessAddress(businessAddress) {
			SiteActions.saveBusinessAddress(businessAddress);
			this.completeStep(Paths.BUSINESS_ADDRESS_SLUG);
			this.setCurrentStep(Paths.WOOCOMMERCE_SLUG);
		},

		submitLayoutStep: function submitLayoutStep(layout) {
			SiteActions.setLayout(layout).done(function () {
				var step = SetupProgressStore.getStepFromSlug(Paths.IS_BLOG_STEP_SLUG);
				if (!step.completed) {
					this.completeStep(Paths.IS_BLOG_STEP_SLUG);
				}
				this.completeAndNextStep(Paths.HOMEPAGE_STEP_SLUG);
			}.bind(this));
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
			SiteActions.enableJumpstart().done(function () {
				this.completeStep(Paths.JETPACK_MODULES_STEP_SLUG);
			}.bind(this));
		},

		setActiveTheme: function setActiveTheme(theme) {
			SiteActions.setActiveTheme(theme).done(function () {
				this.completeStep(Paths.DESIGN_STEP_SLUG, {
					themeId: theme.id
				});
			}.bind(this));
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
/* 175 */
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
		CONTACT_PAGE_STEP_SLUG: 'contact-page',
		BUSINESS_ADDRESS_SLUG: 'business-address',
		WOOCOMMERCE_SLUG: 'woocommerce',
		EXISTING_STORE_STEP_SLUG: 'existing-store'
	};

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(168),
	    JPSConstants = __webpack_require__(172);

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
/* 177 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _assign = __webpack_require__(178);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var AppDispatcher = __webpack_require__(168),
	    JPSConstants = __webpack_require__(172),
	    SiteStore = __webpack_require__(215),
	    FlashActions = __webpack_require__(176),
	    SpinnerActions = __webpack_require__(218),
	    WPAjax = __webpack_require__(216);

	var SiteActions = {
		setTitle: function setTitle(title) {
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_SET_TITLE,
				title: title
			});
		},

		setType: function setType(type) {
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_SET_TYPE,
				type: type
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

		saveBusinessAddress: function saveBusinessAddress(businessAddress) {
			WPAjax.post(JPS.site_actions.add_business_address, businessAddress).fail(function (msg) {
				FlashActions.error("Error setting title: " + msg);
			});

			var business_address_1 = businessAddress.business_address_1,
			    business_address_2 = businessAddress.business_address_2,
			    business_city = businessAddress.business_city,
			    business_name = businessAddress.business_name,
			    business_state = businessAddress.business_state,
			    business_zip = businessAddress.business_zip;


			JPS.bloginfo = (0, _assign2['default'])({}, JPS.bloginfo, { business_address_1: business_address_1, business_address_2: business_address_2, business_city: business_city, business_name: business_name, business_state: business_state, business_zip: business_zip });

			// FlashActions.notice( "Set title to '"+title+"' and description to '"+description+"'" );
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_ADD_BUSINESS_ADDRESS,
				address: businessAddress
			});

			return jQuery.Deferred().resolve(); // XXX HACK
		},

		redirectToWooCommerceSetup: function redirectToWooCommerceSetup() {
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_REDIRECT_TO_WOOCOMMERCE_SETUP
			});
		},

		installWooCommerce: function installWooCommerce() {
			SpinnerActions.show("Installing WooCommerce");
			AppDispatcher.dispatch({
				actionType: JPSConstants.SITE_INSTALL_WOOCOMMERCE
			});
			return WPAjax.post(JPS.site_actions.install_woocommerce).done(function () {
				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_INSTALL_WOOCOMMERCE_SUCCESS
				});
			}).fail(function (msg) {
				AppDispatcher.dispatch({
					actionType: JPSConstants.SITE_INSTALL_WOOCOMMERCE_FAIL
				});
				FlashActions.error(msg);
			}).always(function () {
				SpinnerActions.hide();
			});
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

			this._installTheme(theme).done(function () {
				this._activateTheme(theme);
			}.bind(this));

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

			/****************
	  
	  complete step
	  
	  *********************/

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
/* 178 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(179), __esModule: true };

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(180);
	module.exports = __webpack_require__(183).Object.assign;

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.3.1 Object.assign(target, source)
	var $export = __webpack_require__(181);

	$export($export.S + $export.F, 'Object', {assign: __webpack_require__(196)});

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

	var global    = __webpack_require__(182)
	  , core      = __webpack_require__(183)
	  , ctx       = __webpack_require__(184)
	  , hide      = __webpack_require__(186)
	  , PROTOTYPE = 'prototype';

	var $export = function(type, name, source){
	  var IS_FORCED = type & $export.F
	    , IS_GLOBAL = type & $export.G
	    , IS_STATIC = type & $export.S
	    , IS_PROTO  = type & $export.P
	    , IS_BIND   = type & $export.B
	    , IS_WRAP   = type & $export.W
	    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
	    , expProto  = exports[PROTOTYPE]
	    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
	    , key, own, out;
	  if(IS_GLOBAL)source = name;
	  for(key in source){
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if(own && key in exports)continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function(C){
	      var F = function(a, b, c){
	        if(this instanceof C){
	          switch(arguments.length){
	            case 0: return new C;
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if(IS_PROTO){
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library` 
	module.exports = $export;

/***/ },
/* 182 */
/***/ function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
	if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ },
/* 183 */
/***/ function(module, exports) {

	var core = module.exports = {version: '2.4.0'};
	if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(185);
	module.exports = function(fn, that, length){
	  aFunction(fn);
	  if(that === undefined)return fn;
	  switch(length){
	    case 1: return function(a){
	      return fn.call(that, a);
	    };
	    case 2: return function(a, b){
	      return fn.call(that, a, b);
	    };
	    case 3: return function(a, b, c){
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function(/* ...args */){
	    return fn.apply(that, arguments);
	  };
	};

/***/ },
/* 185 */
/***/ function(module, exports) {

	module.exports = function(it){
	  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
	  return it;
	};

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

	var dP         = __webpack_require__(187)
	  , createDesc = __webpack_require__(195);
	module.exports = __webpack_require__(191) ? function(object, key, value){
	  return dP.f(object, key, createDesc(1, value));
	} : function(object, key, value){
	  object[key] = value;
	  return object;
	};

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

	var anObject       = __webpack_require__(188)
	  , IE8_DOM_DEFINE = __webpack_require__(190)
	  , toPrimitive    = __webpack_require__(194)
	  , dP             = Object.defineProperty;

	exports.f = __webpack_require__(191) ? Object.defineProperty : function defineProperty(O, P, Attributes){
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if(IE8_DOM_DEFINE)try {
	    return dP(O, P, Attributes);
	  } catch(e){ /* empty */ }
	  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
	  if('value' in Attributes)O[P] = Attributes.value;
	  return O;
	};

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(189);
	module.exports = function(it){
	  if(!isObject(it))throw TypeError(it + ' is not an object!');
	  return it;
	};

/***/ },
/* 189 */
/***/ function(module, exports) {

	module.exports = function(it){
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(191) && !__webpack_require__(192)(function(){
	  return Object.defineProperty(__webpack_require__(193)('div'), 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(192)(function(){
	  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
	});

/***/ },
/* 192 */
/***/ function(module, exports) {

	module.exports = function(exec){
	  try {
	    return !!exec();
	  } catch(e){
	    return true;
	  }
	};

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(189)
	  , document = __webpack_require__(182).document
	  // in old IE typeof document.createElement is 'object'
	  , is = isObject(document) && isObject(document.createElement);
	module.exports = function(it){
	  return is ? document.createElement(it) : {};
	};

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(189);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function(it, S){
	  if(!isObject(it))return it;
	  var fn, val;
	  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
	  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
	  throw TypeError("Can't convert object to primitive value");
	};

/***/ },
/* 195 */
/***/ function(module, exports) {

	module.exports = function(bitmap, value){
	  return {
	    enumerable  : !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable    : !(bitmap & 4),
	    value       : value
	  };
	};

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	// 19.1.2.1 Object.assign(target, source, ...)
	var getKeys  = __webpack_require__(197)
	  , gOPS     = __webpack_require__(212)
	  , pIE      = __webpack_require__(213)
	  , toObject = __webpack_require__(214)
	  , IObject  = __webpack_require__(201)
	  , $assign  = Object.assign;

	// should work with symbols and should have deterministic property order (V8 bug)
	module.exports = !$assign || __webpack_require__(192)(function(){
	  var A = {}
	    , B = {}
	    , S = Symbol()
	    , K = 'abcdefghijklmnopqrst';
	  A[S] = 7;
	  K.split('').forEach(function(k){ B[k] = k; });
	  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
	}) ? function assign(target, source){ // eslint-disable-line no-unused-vars
	  var T     = toObject(target)
	    , aLen  = arguments.length
	    , index = 1
	    , getSymbols = gOPS.f
	    , isEnum     = pIE.f;
	  while(aLen > index){
	    var S      = IObject(arguments[index++])
	      , keys   = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S)
	      , length = keys.length
	      , j      = 0
	      , key;
	    while(length > j)if(isEnum.call(S, key = keys[j++]))T[key] = S[key];
	  } return T;
	} : $assign;

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys       = __webpack_require__(198)
	  , enumBugKeys = __webpack_require__(211);

	module.exports = Object.keys || function keys(O){
	  return $keys(O, enumBugKeys);
	};

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

	var has          = __webpack_require__(199)
	  , toIObject    = __webpack_require__(200)
	  , arrayIndexOf = __webpack_require__(204)(false)
	  , IE_PROTO     = __webpack_require__(208)('IE_PROTO');

	module.exports = function(object, names){
	  var O      = toIObject(object)
	    , i      = 0
	    , result = []
	    , key;
	  for(key in O)if(key != IE_PROTO)has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while(names.length > i)if(has(O, key = names[i++])){
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};

/***/ },
/* 199 */
/***/ function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function(it, key){
	  return hasOwnProperty.call(it, key);
	};

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(201)
	  , defined = __webpack_require__(203);
	module.exports = function(it){
	  return IObject(defined(it));
	};

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(202);
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function(it){
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};

/***/ },
/* 202 */
/***/ function(module, exports) {

	var toString = {}.toString;

	module.exports = function(it){
	  return toString.call(it).slice(8, -1);
	};

/***/ },
/* 203 */
/***/ function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function(it){
	  if(it == undefined)throw TypeError("Can't call method on  " + it);
	  return it;
	};

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(200)
	  , toLength  = __webpack_require__(205)
	  , toIndex   = __webpack_require__(207);
	module.exports = function(IS_INCLUDES){
	  return function($this, el, fromIndex){
	    var O      = toIObject($this)
	      , length = toLength(O.length)
	      , index  = toIndex(fromIndex, length)
	      , value;
	    // Array#includes uses SameValueZero equality algorithm
	    if(IS_INCLUDES && el != el)while(length > index){
	      value = O[index++];
	      if(value != value)return true;
	    // Array#toIndex ignores holes, Array#includes - not
	    } else for(;length > index; index++)if(IS_INCLUDES || index in O){
	      if(O[index] === el)return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(206)
	  , min       = Math.min;
	module.exports = function(it){
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};

/***/ },
/* 206 */
/***/ function(module, exports) {

	// 7.1.4 ToInteger
	var ceil  = Math.ceil
	  , floor = Math.floor;
	module.exports = function(it){
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(206)
	  , max       = Math.max
	  , min       = Math.min;
	module.exports = function(index, length){
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(209)('keys')
	  , uid    = __webpack_require__(210);
	module.exports = function(key){
	  return shared[key] || (shared[key] = uid(key));
	};

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

	var global = __webpack_require__(182)
	  , SHARED = '__core-js_shared__'
	  , store  = global[SHARED] || (global[SHARED] = {});
	module.exports = function(key){
	  return store[key] || (store[key] = {});
	};

/***/ },
/* 210 */
/***/ function(module, exports) {

	var id = 0
	  , px = Math.random();
	module.exports = function(key){
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};

/***/ },
/* 211 */
/***/ function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');

/***/ },
/* 212 */
/***/ function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 213 */
/***/ function(module, exports) {

	exports.f = {}.propertyIsEnumerable;

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(203);
	module.exports = function(it){
	  return Object(defined(it));
	};

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _assign = __webpack_require__(178);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	 * Store which manages and persists site information
	 */

	var AppDispatcher = __webpack_require__(168),
	    EventEmitter = __webpack_require__(171).EventEmitter,
	    JPSConstants = __webpack_require__(172),
	    WPAjax = __webpack_require__(216);

	var CHANGE_EVENT = 'change';

	var layout = JPS.steps.layout.current;

	function setType(newType) {
		JPS.bloginfo.type = newType;
	}

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

	function setShopStatus() {
		JPS.bloginfo = (0, _assign2['default'])({}, JPS.bloginfo, { is_shop: true });
	}

	function setWooCommerceStatus() {
		JPS.woocommerce_status = true;
		JPS.bloginfo = (0, _assign2['default'])({}, JPS.bloginfo, { redirect_to_woocommerce_setup: true });
	}

	function setWooCommerceRedirectStatus() {
		JPS.bloginfo = (0, _assign2['default'])({}, JPS.bloginfo, { redirect_to_woocommerce_setup: false });
	}

	var SiteStore = _.extend({}, EventEmitter.prototype, {

		getTitle: function getTitle() {
			return JPS.bloginfo.name;
		},

		getType: function getType() {
			return JPS.bloginfo.type;
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

		getWooCommerceStatus: function getWooCommerceStatus() {
			return JPS.woocommerce_status;
		},

		getWooCommerceSetupUrl: function getWooCommerceSetupUrl() {
			return JPS.steps.advanced_settings.woocommerce_setup_url;
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

		getPluginsUrl: function getPluginsUrl() {
			return JPS.steps.advanced_settings.plugins_url;
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
			case JPSConstants.SITE_SET_TYPE:
				setType(action.type);
				SiteStore.emitChange();
				break;

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

			case JPSConstants.SITE_INSTALL_WOOCOMMERCE:
				setShopStatus();
				SiteStore.emitChange();
				break;

			case JPSConstants.SITE_INSTALL_WOOCOMMERCE_SUCCESS:
				setWooCommerceStatus();
				SiteStore.emitChange();
				break;

			case JPSConstants.SITE_REDIRECT_TO_WOOCOMMERCE_SETUP:
				setWooCommerceRedirectStatus();
				SiteStore.emitChange();
				break;

			default:
			// no op
		}
	});

	module.exports = SiteStore;

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

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

	var DataActions = __webpack_require__(217);

	var WPAjax = function () {

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
	}();

	module.exports = WPAjax;

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(168),
	    JPSConstants = __webpack_require__(172);

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
/* 218 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(168),
	    JPSConstants = __webpack_require__(172);

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
/* 219 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(168),
	    EventEmitter = __webpack_require__(171).EventEmitter,
	    JPSConstants = __webpack_require__(172);

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
/* 220 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(168),
	    EventEmitter = __webpack_require__(171).EventEmitter,
	    JPSConstants = __webpack_require__(172);

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
/* 221 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Displays a flash message, if set.
	 * JSON structure:
	 * { severity: 'notice', message: 'My message' }
	 *
	 * Valid severities:
	 * - error, notice
	 */

	var React = __webpack_require__(4),
	    FlashStore = __webpack_require__(222);

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
/* 222 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var AppDispatcher = __webpack_require__(168),
	    EventEmitter = __webpack_require__(171).EventEmitter,
	    JPSConstants = __webpack_require__(172);

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
/* 223 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    SetupProgressStore = __webpack_require__(167),
	    SetupProgressActions = __webpack_require__(174),
	    Button = __webpack_require__(224),
	    Paths = __webpack_require__(175);

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

			if ('personal' === sitePurpose) {
				// We want to mark business only steps as complete, so they don't linger as pending steps
				// within the personal flow.
				SetupProgressActions.completeStepNoRecord(Paths.BUSINESS_ADDRESS_SLUG);
				SetupProgressActions.completeStepNoRecord(Paths.WOOCOMMERCE_SLUG);
			}

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
/* 224 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _assign = __webpack_require__(225);

	var _assign2 = _interopRequireDefault(_assign);

	var _classnames = __webpack_require__(254);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _noop = __webpack_require__(255);

	var _noop2 = _interopRequireDefault(_noop);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/**
	 * External dependencies
	 */
	__webpack_require__(256);

	exports.default = _react2.default.createClass({

		displayName: 'Button',

		propTypes: {
			disabled: _react2.default.PropTypes.bool,
			compact: _react2.default.PropTypes.bool,
			primary: _react2.default.PropTypes.bool,
			scary: _react2.default.PropTypes.bool,
			type: _react2.default.PropTypes.string,
			href: _react2.default.PropTypes.string,
			onClick: _react2.default.PropTypes.func,
			borderless: _react2.default.PropTypes.bool
		},

		getDefaultProps: function getDefaultProps() {
			return {
				disabled: false,
				type: 'button',
				onClick: _noop2.default,
				borderless: false
			};
		},
		render: function render() {
			var element = this.props.href ? 'a' : 'button';
			var buttonClasses = (0, _classnames2.default)({
				'dops-button': true,
				'is-compact': this.props.compact,
				'is-primary': this.props.primary,
				'is-scary': this.props.scary,
				'is-borderless': this.props.borderless
			});

			var props = (0, _assign2.default)({}, this.props, {
				className: (0, _classnames2.default)(this.props.className, buttonClasses)
			});

			return _react2.default.createElement(element, props, this.props.children);
		}
	});
	module.exports = exports['default'];

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

	var copyObject = __webpack_require__(226),
	    createAssigner = __webpack_require__(230),
	    keys = __webpack_require__(243);

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
/* 226 */
/***/ function(module, exports, __webpack_require__) {

	var copyObjectWith = __webpack_require__(227);

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
/* 227 */
/***/ function(module, exports, __webpack_require__) {

	var assignValue = __webpack_require__(228);

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
/* 228 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(229);

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
/* 229 */
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
/* 230 */
/***/ function(module, exports, __webpack_require__) {

	var isIterateeCall = __webpack_require__(231),
	    rest = __webpack_require__(239);

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
/* 231 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(229),
	    isArrayLike = __webpack_require__(232),
	    isIndex = __webpack_require__(238),
	    isObject = __webpack_require__(236);

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
/* 232 */
/***/ function(module, exports, __webpack_require__) {

	var getLength = __webpack_require__(233),
	    isFunction = __webpack_require__(235),
	    isLength = __webpack_require__(237);

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
/* 233 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(234);

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
/* 234 */
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
/* 235 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(236);

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
/* 236 */
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
/* 237 */
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
/* 238 */
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
/* 239 */
/***/ function(module, exports, __webpack_require__) {

	var apply = __webpack_require__(240),
	    toInteger = __webpack_require__(241);

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
/* 240 */
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
/* 241 */
/***/ function(module, exports, __webpack_require__) {

	var toNumber = __webpack_require__(242);

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
/* 242 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(235),
	    isObject = __webpack_require__(236);

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
/* 243 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(244),
	    baseKeys = __webpack_require__(245),
	    indexKeys = __webpack_require__(246),
	    isArrayLike = __webpack_require__(232),
	    isIndex = __webpack_require__(238),
	    isPrototype = __webpack_require__(253);

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
/* 244 */
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
/* 245 */
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
/* 246 */
/***/ function(module, exports, __webpack_require__) {

	var baseTimes = __webpack_require__(247),
	    isArguments = __webpack_require__(248),
	    isArray = __webpack_require__(251),
	    isLength = __webpack_require__(237),
	    isString = __webpack_require__(252);

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
/* 247 */
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
/* 248 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLikeObject = __webpack_require__(249);

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
/* 249 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(232),
	    isObjectLike = __webpack_require__(250);

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
/* 250 */
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
/* 251 */
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
/* 252 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(251),
	    isObjectLike = __webpack_require__(250);

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
/* 253 */
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
/* 254 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
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
/* 255 */
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
/* 256 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 257 */,
/* 258 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    SiteActions = __webpack_require__(177),
	    SiteStore = __webpack_require__(215),
	    WelcomeSection = __webpack_require__(259),
	    Button = __webpack_require__(224),
	    SetupProgressActions = __webpack_require__(174);

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
						'div',
						{ className: 'welcome__submit' },
						React.createElement(
							Button,
							{ primary: true, type: 'submit' },
							'Next Step'
						)
					)
				)
			);
		}
	});

	module.exports = SiteTitleStep;

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _extends2 = __webpack_require__(260);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(261);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(4);

	var WelcomeSection = React.createClass({
		displayName: "WelcomeSection",

		render: function render() {
			var other = (0, _objectWithoutProperties3["default"])(this.props, []);

			return React.createElement(
				"div",
				(0, _extends3["default"])({}, other, { className: "welcome__section" }),
				this.props.children
			);
		}
	});

	module.exports = WelcomeSection;

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _assign = __webpack_require__(178);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _assign2.default || function (target) {
	  for (var i = 1; i < arguments.length; i++) {
	    var source = arguments[i];

	    for (var key in source) {
	      if (Object.prototype.hasOwnProperty.call(source, key)) {
	        target[key] = source[key];
	      }
	    }
	  }

	  return target;
	};

/***/ },
/* 261 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;

	exports.default = function (obj, keys) {
	  var target = {};

	  for (var i in obj) {
	    if (keys.indexOf(i) >= 0) continue;
	    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
	    target[i] = obj[i];
	  }

	  return target;
	};

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    SiteStore = __webpack_require__(215),
	    Button = __webpack_require__(224),
	    WelcomeSection = __webpack_require__(259),
	    SetupProgressActions = __webpack_require__(174);

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
/* 263 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    classNames = __webpack_require__(254),
	    SiteStore = __webpack_require__(215),
	    Button = __webpack_require__(224),
	    WelcomeSection = __webpack_require__(259),
	    SetupProgressActions = __webpack_require__(174);

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
/* 264 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    SiteStore = __webpack_require__(215),
	    Button = __webpack_require__(224),
	    WelcomeSection = __webpack_require__(259),
	    SetupProgressActions = __webpack_require__(174),
	    Paths = __webpack_require__(175);

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
			SetupProgressActions.completeStepNoRecord(Paths.CONTACT_PAGE_STEP_SLUG);
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
						'Next Step \u2192'
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
/* 265 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    SkipButton = __webpack_require__(266),
	    SiteStore = __webpack_require__(215),
	    SiteActions = __webpack_require__(177),
	    Paths = __webpack_require__(175),
	    ContentBox = __webpack_require__(267),
	    WelcomeSection = __webpack_require__(259),
	    SetupProgressActions = __webpack_require__(174),
	    SpinnerStore = __webpack_require__(219),
	    Button = __webpack_require__(224);

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

		handleJetpackConnect: function handleJetpackConnect(event) {
			event.preventDefault();
			var path = JPS.bloginfo.type === 'business' ? Paths.BUSINESS_ADDRESS_SLUG : Paths.REVIEW_STEP_SLUG;

			this.setState({ jetpackConnecting: true });
			SiteActions.configureJetpack(path).always(function () {
				this.setState({ jetpackConnecting: false });
			}.bind(this));
		},

		handleNext: function handleNext(event) {
			event.preventDefault();
			SetupProgressActions.completeStepNoRecord(Paths.JETPACK_MODULES_STEP_SLUG);
			SetupProgressActions.selectNextStep();
		},

		handleSkip: function handleSkip() {
			SetupProgressActions.skipStep();
			if (JPS.bloginfo.type !== 'business') {
				return SetupProgressActions.setCurrentStep(Paths.REVIEW_STEP_SLUG);
			}
			return SetupProgressActions.setCurrentStep(Paths.BUSINESS_ADDRESS_SLUG);
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
							'Check out the settings page\u2026'
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
						{
							disabled: this.state.jetpackConnecting,
							onClick: this.handleJetpackConnect,
							primary: true },
						this.state.jetpackConnecting ? 'Connecting' : 'Connect',
						' to WordPress.com'
					),
					!this.state.jetpackConnecting && React.createElement(SkipButton, { handleSkip: this.handleSkip })
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
						'Photon utilizes the state-of-the-art WordPress.com content delivery network to load your gorgeous images super fast optimized for any device, and it\u2019s completely free.'
					)
				)
			);
		}
	});

	module.exports = JetpackJumpstart;

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    SetupProgressStore = __webpack_require__(167),
	    SetupProgressActions = __webpack_require__(174),
	    Button = __webpack_require__(224);

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

			if (this.props.handleSkip) {
				return this.props.handleSkip();
			}

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
/* 267 */
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
/* 268 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _assign = __webpack_require__(178);

	var _assign2 = _interopRequireDefault(_assign);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var React = __webpack_require__(4),
	    SkipButton = __webpack_require__(266),
	    SiteStore = __webpack_require__(215),
	    WelcomeSection = __webpack_require__(259),
	    SetupProgressActions = __webpack_require__(174),
	    Button = __webpack_require__(224);

	function getJetpackState() {
		return {
			site_title: SiteStore.getTitle(),
			jetpackConfigured: SiteStore.getJetpackConfigured(),
			jumpstartEnabled: SiteStore.getJetpackJumpstartEnabled(),
			modulesEnabled: SiteStore.getActiveModuleSlugs(),
			settingsUrl: SiteStore.getJetpackSettingsUrl()
		};
	}

	module.exports = React.createClass({
		displayName: 'exports',


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
			var _JPS$bloginfo = JPS.bloginfo,
			    business_address_1 = _JPS$bloginfo.business_address_1,
			    business_address_2 = _JPS$bloginfo.business_address_2,
			    business_city = _JPS$bloginfo.business_city,
			    business_state = _JPS$bloginfo.business_state,
			    business_zip = _JPS$bloginfo.business_zip;

			var business_name = JPS.bloginfo.business_name;
			if ('undefined' === typeof business_name) {
				business_name = state.site_title;
			}
			state = (0, _assign2['default'])({}, state, { business_address_1: business_address_1, business_address_2: business_address_2, business_city: business_city, business_name: business_name, business_state: business_state, business_zip: business_zip });
			return state;
		},

		handleChange: function handleChange(e) {
			var newValue = {};
			if ('checkbox' === e.currentTarget.type) {
				newValue[e.currentTarget.name] = e.currentTarget.checked;
			} else {
				newValue[e.currentTarget.name] = e.currentTarget.value;
			}
			this.setState(newValue);
		},

		handleSubmit: function handleSubmit(e) {
			e.preventDefault();
			SetupProgressActions.submitBusinessAddress(this.state);
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
					'Add your business address (if you have one)'
				),
				React.createElement(
					'form',
					{ onSubmit: this.handleSubmit, className: 'welcome__business-address--form' },
					React.createElement('input', { className: 'welcome__business-address--input', type: 'text', name: 'business_name', id: 'business-name', value: this.state.business_name, onChange: this.handleChange, placeholder: 'Business Name: Jack\'s Pizza shop', required: true }),
					React.createElement('input', { className: 'welcome__business-address--input', type: 'text', name: 'business_address_1', id: 'business-address-1', value: this.state.business_address_1, onChange: this.handleChange, placeholder: 'Address: Pizza street', required: true }),
					React.createElement('input', { className: 'welcome__business-address--input', type: 'text', name: 'business_address_2', id: 'business-address-2', value: this.state.business_address_2, onChange: this.handleChange, placeholder: 'Address: Pizza street 2' }),
					React.createElement('input', { className: 'welcome__business-address--input', type: 'text', name: 'business_city', id: 'business-city', value: this.state.business_city, onChange: this.handleChange, placeholder: 'City', required: true }),
					React.createElement('input', { className: 'welcome__business-address--input', type: 'text', name: 'business_state', id: 'business-state', value: this.state.business_state, onChange: this.handleChange, placeholder: 'State' }),
					React.createElement('input', { className: 'welcome__business-address--input', type: 'text', name: 'business_zip', id: 'business-zip', value: this.state.business_zip, onChange: this.handleChange, placeholder: 'Zip', required: true }),
					React.createElement(
						'div',
						{ className: 'welcome__button-container' },
						React.createElement(
							Button,
							{ className: 'welcome-submit', primary: true, type: 'submit' },
							'Next Step'
						),
						React.createElement(SkipButton, null)
					)
				)
			);
		}
	});

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    SkipButton = __webpack_require__(266),
	    SiteStore = __webpack_require__(215),
	    SetupProgressActions = __webpack_require__(174),
	    WelcomeSection = __webpack_require__(259),
	    SiteActions = __webpack_require__(177),
	    Paths = __webpack_require__(175),
	    Button = __webpack_require__(224);

	function getJetpackState() {
		var _JPS$bloginfo = JPS.bloginfo,
		    is_shop = _JPS$bloginfo.is_shop,
		    redirect_to_woocommerce_setup = _JPS$bloginfo.redirect_to_woocommerce_setup;

		return {
			site_title: SiteStore.getTitle(),
			wooCommerceStatus: SiteStore.getWooCommerceStatus(),
			wooCommerceSetupUrl: SiteStore.getWooCommerceSetupUrl(),
			is_shop: is_shop,
			redirect_to_woocommerce_setup: redirect_to_woocommerce_setup
		};
	}

	module.exports = React.createClass({
		displayName: 'exports',


		componentDidMount: function componentDidMount() {
			SiteStore.addChangeListener(this._onChange);
			JPS.shownWoocommerceStep = true;
		},

		componentWillUnmount: function componentWillUnmount() {
			SiteStore.removeChangeListener(this._onChange);
		},

		_onChange: function _onChange() {
			this.setState(getJetpackState());
			if (this.state.wooCommerceStatus && this.state.redirect_to_woocommerce_setup) {
				window.setTimeout(this.goToWooSetup, 10);
			}
		},

		getInitialState: function getInitialState() {
			return getJetpackState();
		},

		goToWooSetup: function goToWooSetup() {
			jQuery(window).off('beforeunload');
			SiteActions.redirectToWooCommerceSetup();
			SetupProgressActions.completeStep(Paths.WOOCOMMERCE_SLUG);
			window.location = this.state.wooCommerceSetupUrl;
		},

		goToJpoReview: function goToJpoReview() {
			SetupProgressActions.setCurrentStep(Paths.REVIEW_STEP_SLUG);
		},

		goToMigrateStep: function goToMigrateStep() {
			SetupProgressActions.setCurrentStep(Paths.EXISTING_STORE_STEP_SLUG);
		},

		handleSubmit: function handleSubmit(event) {
			event.preventDefault();
			SiteActions.installWooCommerce();
		},

		renderInstall: function renderInstall() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'p',
					{ className: 'welcome__callout welcome__jetpack--callout' },
					'Are you looking to sell online?'
				),
				React.createElement(
					'form',
					{ onSubmit: this.handleSubmit, className: 'welcome__woocommerce--form' },
					React.createElement(
						'div',
						{ className: 'welcome__button-container' },
						React.createElement(
							Button,
							{ className: 'welcome-submit', primary: true, type: 'submit' },
							'Install WooCommerce'
						),
						React.createElement(SkipButton, { handleSkip: this.goToJpoReview })
					)
				)
			);
		},

		renderAlreadyInstalled: function renderAlreadyInstalled() {
			return React.createElement(
				'div',
				null,
				React.createElement(
					'p',
					{ className: 'welcome__callout welcome__jetpack--callout' },
					'WooCommerce is ready to go'
				),
				React.createElement(
					'div',
					{ className: 'welcome__button-container' },
					React.createElement(
						Button,
						{ className: 'welcome-submit', primary: true, onClick: this.goToWooSetup },
						'Setup your store'
					),
					React.createElement(
						Button,
						{ onClick: this.goToMigrateStep },
						'Not right now'
					)
				)
			);
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
				this.state.wooCommerceStatus ? this.renderAlreadyInstalled() : this.renderInstall()
			);
		}
	});

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    SiteStore = __webpack_require__(215),
	    SetupProgressActions = __webpack_require__(174),
	    WelcomeSection = __webpack_require__(259),
	    Paths = __webpack_require__(175),
	    Button = __webpack_require__(224);

	var SelectDropdown = __webpack_require__(271),
	    DropdownItem = __webpack_require__(357);

	function getJetpackState() {
		var is_shop = JPS.bloginfo.is_shop;

		return {
			site_title: SiteStore.getTitle(),
			wooCommerceStatus: SiteStore.getWooCommerceStatus(),
			wooCommerceSetupUrl: SiteStore.getWooCommerceSetupUrl(),
			is_shop: is_shop
		};
	}

	var platforms = ['Shopify', 'BigCommerce', 'Magento', 'WooCommerce', 'osCommerce', 'Wix', 'Other'];

	module.exports = React.createClass({
		displayName: 'exports',


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
			return getJetpackState();
		},

		submitStorePlatform: function submitStorePlatform(platform) {
			SetupProgressActions.completeStep(Paths.EXISTING_STORE_STEP_SLUG, { platform: platform });
			this.goToJpoReview();
		},

		goToJpoReview: function goToJpoReview() {
			SetupProgressActions.setCurrentStep(Paths.REVIEW_STEP_SLUG);
		},

		render: function render() {
			var _this = this;

			if (!this.state.wooCommerceStatus) {
				this.goToJpoReview();
			}

			var platformSelections = platforms.map(function (platform, i) {
				return React.createElement(
					DropdownItem,
					{ key: i, onClick: function onClick() {
							_this.submitStorePlatform(platform);
						} },
					platform
				);
			});

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
					'Do you already have an existing e-commerce store?'
				),
				React.createElement(
					'div',
					{ className: 'welcome__existing-store--button-container welcome__button-container' },
					React.createElement(
						SelectDropdown,
						{ selectedText: 'Yes, it\'s powered by\u2026', className: 'welcome__existing-store--dropdown' },
						platformSelections
					),
					React.createElement(
						Button,
						{ primary: true },
						'Next'
					),
					React.createElement(
						Button,
						null,
						'Nope'
					)
				)
			);
		}
	});

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _reactDom = __webpack_require__(33);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _find = __webpack_require__(272);

	var _find2 = _interopRequireDefault(_find);

	var _filter = __webpack_require__(350);

	var _filter2 = _interopRequireDefault(_filter);

	var _findIndex = __webpack_require__(353);

	var _findIndex2 = _interopRequireDefault(_findIndex);

	var _map = __webpack_require__(354);

	var _map2 = _interopRequireDefault(_map);

	var _result = __webpack_require__(356);

	var _result2 = _interopRequireDefault(_result);

	var _classnames = __webpack_require__(254);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _item = __webpack_require__(357);

	var _item2 = _interopRequireDefault(_item);

	var _separator = __webpack_require__(363);

	var _separator2 = _interopRequireDefault(_separator);

	var _label = __webpack_require__(364);

	var _label2 = _interopRequireDefault(_label);

	var _count = __webpack_require__(358);

	var _count2 = _interopRequireDefault(_count);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @ssr-ready **/

	/**
	 * External Dependencies
	 */


	/**
	 * Internal dependencies
	 */


	__webpack_require__(365);

	/**
	 * Module variables
	 */
	var Component = _react2.default.Component,
	    PropTypes = _react2.default.PropTypes;

	var noop = function noop() {};

	/**
	 * SelectDropdown
	 */

	var SelectDropdown = function (_Component) {
		_inherits(SelectDropdown, _Component);

		function SelectDropdown(props) {
			_classCallCheck(this, SelectDropdown);

			// bounds
			var _this = _possibleConstructorReturn(this, (SelectDropdown.__proto__ || Object.getPrototypeOf(SelectDropdown)).call(this, props));

			_this.navigateItem = _this.navigateItem.bind(_this);
			_this.toggleDropdown = _this.toggleDropdown.bind(_this);
			_this.handleOutsideClick = _this.handleOutsideClick.bind(_this);

			// state
			var initialState = { isOpen: false };

			if (props.options.length) {
				initialState.selected = _this.getInitialSelectedItem(props);
			}

			_this.state = initialState;
			return _this;
		}

		_createClass(SelectDropdown, [{
			key: 'componentWillMount',
			value: function componentWillMount() {
				this.setState({
					instanceId: ++SelectDropdown.instances
				});
			}
		}, {
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(nextProps) {
				if (this.state.isOpen) {
					this.closeDropdown();
				}

				if (typeof this.state.selected !== 'undefined' && this.props.initialSelected !== nextProps.initialSelected) {
					this.setState({ selected: nextProps.initialSelected });
				}
			}
		}, {
			key: 'componentWillUnmount',
			value: function componentWillUnmount() {
				window.removeEventListener('click', this.handleOutsideClick);
			}
		}, {
			key: 'componentDidUpdate',
			value: function componentDidUpdate(prevProps, prevState) {
				if (this.state.isOpen) {
					window.addEventListener('click', this.handleOutsideClick);
				} else {
					window.removeEventListener('click', this.handleOutsideClick);
				}

				if (this.state.isOpen !== prevState.isOpen) {
					this.props.onToggle({
						target: this,
						open: this.state.isOpen
					});
				}
			}
		}, {
			key: 'getInitialSelectedItem',
			value: function getInitialSelectedItem(props) {
				props = props || this.props;

				if (props.initialSelected) {
					return props.initialSelected;
				}

				if (!props.options.length) {
					return;
				}

				var selectedItem = (0, _find2.default)(props.options, function (value) {
					return !value.isLabel;
				});
				return selectedItem && selectedItem.value;
			}
		}, {
			key: 'dropdownOptions',
			value: function dropdownOptions() {
				var refIndex = 0;
				var self = this;

				if (this.props.children) {
					// add keys and refs to children
					return _react2.default.Children.map(this.props.children, function (child, index) {
						if (!child) {
							return null;
						}

						var newChild = _react2.default.cloneElement(child, {
							ref: child.type === _item2.default ? 'item-' + refIndex : null,
							key: 'item-' + index,
							onClick: function onClick(event) {
								self.refs.dropdownContainer.focus();
								if (typeof child.props.onClick === 'function') {
									child.props.onClick(event);
								}
							}
						});

						if (child.type === _item2.default) {
							refIndex++;
						}

						return newChild;
					}, this);
				}

				return this.props.options.map(function (item, index) {
					if (!item) {
						return _react2.default.createElement(_separator2.default, {
							key: 'dropdown-separator-' + this.state.instanceId + '-' + index
						});
					}

					if (item.isLabel) {
						return _react2.default.createElement(
							_label2.default,
							{
								key: 'dropdown-label-' + this.state.instanceId + '-' + index
							},
							item.label
						);
					}

					var dropdownItem = _react2.default.createElement(
						_item2.default,
						{
							key: 'dropdown-item-' + this.state.instanceId + '-' + item.value,
							ref: 'item-' + refIndex,
							selected: this.state.selected === item.value,
							onClick: this.onSelectItem(item),
							path: item.path
						},
						item.label
					);

					refIndex++;

					return dropdownItem;
				}, this);
			}
		}, {
			key: 'render',
			value: function render() {
				var dropdownClasses = {
					'dops-select-dropdown': true,
					'is-compact': this.props.compact,
					'is-open': this.state.isOpen
				};

				if (this.props.className) {
					this.props.className.split(' ').forEach(function (className) {
						dropdownClasses[className] = true;
					});
				}

				var dropdownClassName = (0, _classnames2.default)(dropdownClasses);
				var selectedText = this.props.selectedText ? this.props.selectedText : (0, _result2.default)((0, _find2.default)(this.props.options, { value: this.state.selected }), 'label');

				return _react2.default.createElement(
					'div',
					{ style: this.props.style, className: dropdownClassName },
					_react2.default.createElement(
						'div',
						{
							ref: 'dropdownContainer',
							className: 'dops-select-dropdown__container',
							valueLink: this.props.valueLink,
							onKeyDown: this.navigateItem,
							tabIndex: this.props.tabIndex || 0,
							'aria-haspopup': 'true',
							'aria-owns': 'select-submenu-' + this.state.instanceId,
							'aria-controls': 'select-submenu-' + this.state.instanceId,
							'aria-expanded': this.state.isOpen,
							onClick: this.toggleDropdown
						},
						_react2.default.createElement(
							'div',
							{
								id: 'select-dropdown-' + this.state.instanceId,
								className: 'dops-select-dropdown__header'
							},
							_react2.default.createElement(
								'span',
								{ className: 'dops-select-dropdown__header-text' },
								selectedText,
								'number' === typeof this.props.selectedCount && _react2.default.createElement(_count2.default, { count: this.props.selectedCount })
							)
						),
						_react2.default.createElement(
							'ul',
							{
								id: 'select-submenu-' + this.state.instanceId,
								className: 'dops-select-dropdown__options',
								role: 'menu',
								'aria-labelledby': 'select-dropdown-' + this.state.instanceId,
								'aria-expanded': this.state.isOpen
							},
							this.dropdownOptions()
						)
					)
				);
			}
		}, {
			key: 'toggleDropdown',
			value: function toggleDropdown() {
				this.setState({
					isOpen: !this.state.isOpen
				});
			}
		}, {
			key: 'openDropdown',
			value: function openDropdown() {
				this.setState({
					isOpen: true
				});
			}
		}, {
			key: 'closeDropdown',
			value: function closeDropdown() {
				if (this.state.isOpen) {
					delete this.focused;
					this.setState({
						isOpen: false
					});
				}
			}
		}, {
			key: 'onSelectItem',
			value: function onSelectItem(option) {
				return this.selectItem.bind(this, option);
			}
		}, {
			key: 'selectItem',
			value: function selectItem(option) {
				if (!option) {
					return;
				}

				if (this.props.onSelect) {
					this.props.onSelect(option);
				}

				this.setState({
					selected: option.value
				});

				this.refs.dropdownContainer.focus();
			}
		}, {
			key: 'navigateItem',
			value: function navigateItem(event) {
				switch (event.keyCode) {
					case 9:
						//tab
						this.navigateItemByTabKey(event);
						break;
					case 32: // space
					case 13:
						// enter
						event.preventDefault();
						this.activateItem();
						break;
					case 38:
						// up arrow
						event.preventDefault();
						this.focusSibling('previous');
						this.openDropdown();
						break;
					case 40:
						// down arrow
						event.preventDefault();
						this.focusSibling('next');
						this.openDropdown();
						break;
					case 27:
						// escape
						event.preventDefault();
						this.closeDropdown();
						this.refs.dropdownContainer.focus();
						break;
				}
			}
		}, {
			key: 'navigateItemByTabKey',
			value: function navigateItemByTabKey(event) {
				var direction;
				if (!this.state.isOpen) {
					return;
				}
				event.preventDefault();
				direction = event.shiftKey ? 'previous' : 'next';
				this.focusSibling(direction);
			}
		}, {
			key: 'activateItem',
			value: function activateItem() {
				if (!this.state.isOpen) {
					return this.openDropdown();
				}
				document.activeElement.click();
			}
		}, {
			key: 'focusSibling',
			value: function focusSibling(direction) {
				var increment, items, focusedIndex, newIndex;

				// the initial up-arrow/down-arrow should only open the menu
				if (!this.state.isOpen) {
					return;
				}

				if (this.props.options.length) {
					items = (0, _map2.default)((0, _filter2.default)(this.props.options, function (item) {
						return item && !item.isLabel;
					}), 'value');

					focusedIndex = typeof this.focused === 'number' ? this.focused : items.indexOf(this.state.selected);
				} else {
					items = (0, _filter2.default)(this.props.children, function (item) {
						return item.type === _item2.default;
					});

					focusedIndex = typeof this.focused === 'number' ? this.focused : (0, _findIndex2.default)(items, function (item) {
						return item.props.selected;
					});
				}

				increment = direction === 'previous' ? -1 : 1;
				newIndex = focusedIndex + increment;

				if (newIndex >= items.length || newIndex < 0) {
					return;
				}

				_reactDom2.default.findDOMNode(this.refs['item-' + newIndex].refs.itemLink).focus();
				this.focused = newIndex;
			}
		}, {
			key: 'handleOutsideClick',
			value: function handleOutsideClick(event) {
				if (!_reactDom2.default.findDOMNode(this.refs.dropdownContainer).contains(event.target)) {
					this.closeDropdown();
				}
			}
		}]);

		return SelectDropdown;
	}(Component);

	;

	SelectDropdown.defaultProps = {
		options: [],
		onSelect: noop,
		onToggle: noop,
		style: {}
	};

	SelectDropdown.propTypes = {
		selectedText: PropTypes.string,
		selectedCount: PropTypes.number,
		initialSelected: PropTypes.string,
		className: PropTypes.string,
		style: PropTypes.object,
		onSelect: PropTypes.func,
		onToggle: PropTypes.func,
		focusSibling: PropTypes.func,
		tabIndex: PropTypes.number,
		options: PropTypes.arrayOf(PropTypes.shape({
			value: PropTypes.string.isRequired,
			label: PropTypes.string.isRequired,
			path: PropTypes.string
		}))
	};

	// statics
	SelectDropdown.instances = 0;

	exports.default = SelectDropdown;
	module.exports = exports['default'];

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(273),
	    baseFind = __webpack_require__(278),
	    baseFindIndex = __webpack_require__(279),
	    baseIteratee = __webpack_require__(280),
	    isArray = __webpack_require__(251);

	/**
	 * Iterates over elements of `collection`, returning the first element
	 * `predicate` returns truthy for. The predicate is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	 * @returns {*} Returns the matched element, else `undefined`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'age': 36, 'active': true },
	 *   { 'user': 'fred',    'age': 40, 'active': false },
	 *   { 'user': 'pebbles', 'age': 1,  'active': true }
	 * ];
	 *
	 * _.find(users, function(o) { return o.age < 40; });
	 * // => object for 'barney'
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.find(users, { 'age': 1, 'active': true });
	 * // => object for 'pebbles'
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.find(users, ['active', false]);
	 * // => object for 'fred'
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.find(users, 'active');
	 * // => object for 'barney'
	 */
	function find(collection, predicate) {
	  predicate = baseIteratee(predicate, 3);
	  if (isArray(collection)) {
	    var index = baseFindIndex(collection, predicate);
	    return index > -1 ? collection[index] : undefined;
	  }
	  return baseFind(collection, predicate, baseEach);
	}

	module.exports = find;


/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

	var baseForOwn = __webpack_require__(274),
	    createBaseEach = __webpack_require__(277);

	/**
	 * The base implementation of `_.forEach` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array|Object} Returns `collection`.
	 */
	var baseEach = createBaseEach(baseForOwn);

	module.exports = baseEach;


/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

	var baseFor = __webpack_require__(275),
	    keys = __webpack_require__(243);

	/**
	 * The base implementation of `_.forOwn` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Object} Returns `object`.
	 */
	function baseForOwn(object, iteratee) {
	  return object && baseFor(object, iteratee, keys);
	}

	module.exports = baseForOwn;


/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

	var createBaseFor = __webpack_require__(276);

	/**
	 * The base implementation of `baseForIn` and `baseForOwn` which iterates
	 * over `object` properties returned by `keysFunc` invoking `iteratee` for
	 * each property. Iteratee functions may exit iteration early by explicitly
	 * returning `false`.
	 *
	 * @private
	 * @param {Object} object The object to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @param {Function} keysFunc The function to get the keys of `object`.
	 * @returns {Object} Returns `object`.
	 */
	var baseFor = createBaseFor();

	module.exports = baseFor;


/***/ },
/* 276 */
/***/ function(module, exports) {

	/**
	 * Creates a base function for methods like `_.forIn`.
	 *
	 * @private
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseFor(fromRight) {
	  return function(object, iteratee, keysFunc) {
	    var index = -1,
	        iterable = Object(object),
	        props = keysFunc(object),
	        length = props.length;

	    while (length--) {
	      var key = props[fromRight ? length : ++index];
	      if (iteratee(iterable[key], key, iterable) === false) {
	        break;
	      }
	    }
	    return object;
	  };
	}

	module.exports = createBaseFor;


/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

	var isArrayLike = __webpack_require__(232);

	/**
	 * Creates a `baseEach` or `baseEachRight` function.
	 *
	 * @private
	 * @param {Function} eachFunc The function to iterate over a collection.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {Function} Returns the new base function.
	 */
	function createBaseEach(eachFunc, fromRight) {
	  return function(collection, iteratee) {
	    if (collection == null) {
	      return collection;
	    }
	    if (!isArrayLike(collection)) {
	      return eachFunc(collection, iteratee);
	    }
	    var length = collection.length,
	        index = fromRight ? length : -1,
	        iterable = Object(collection);

	    while ((fromRight ? index-- : ++index < length)) {
	      if (iteratee(iterable[index], index, iterable) === false) {
	        break;
	      }
	    }
	    return collection;
	  };
	}

	module.exports = createBaseEach;


/***/ },
/* 278 */
/***/ function(module, exports) {

	/**
	 * The base implementation of methods like `_.find` and `_.findKey`, without
	 * support for iteratee shorthands, which iterates over `collection` using
	 * `eachFunc`.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {Function} eachFunc The function to iterate over `collection`.
	 * @param {boolean} [retKey] Specify returning the key of the found element instead of the element itself.
	 * @returns {*} Returns the found element or its key, else `undefined`.
	 */
	function baseFind(collection, predicate, eachFunc, retKey) {
	  var result;
	  eachFunc(collection, function(value, key, collection) {
	    if (predicate(value, key, collection)) {
	      result = retKey ? key : value;
	      return false;
	    }
	  });
	  return result;
	}

	module.exports = baseFind;


/***/ },
/* 279 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.findIndex` and `_.findLastIndex` without
	 * support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {Function} predicate The function invoked per iteration.
	 * @param {boolean} [fromRight] Specify iterating from right to left.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function baseFindIndex(array, predicate, fromRight) {
	  var length = array.length,
	      index = fromRight ? length : -1;

	  while ((fromRight ? index-- : ++index < length)) {
	    if (predicate(array[index], index, array)) {
	      return index;
	    }
	  }
	  return -1;
	}

	module.exports = baseFindIndex;


/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

	var baseMatches = __webpack_require__(281),
	    baseMatchesProperty = __webpack_require__(333),
	    identity = __webpack_require__(347),
	    isArray = __webpack_require__(251),
	    property = __webpack_require__(348);

	/**
	 * The base implementation of `_.iteratee`.
	 *
	 * @private
	 * @param {*} [value=_.identity] The value to convert to an iteratee.
	 * @returns {Function} Returns the iteratee.
	 */
	function baseIteratee(value) {
	  var type = typeof value;
	  if (type == 'function') {
	    return value;
	  }
	  if (value == null) {
	    return identity;
	  }
	  if (type == 'object') {
	    return isArray(value)
	      ? baseMatchesProperty(value[0], value[1])
	      : baseMatches(value);
	  }
	  return property(value);
	}

	module.exports = baseIteratee;


/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsMatch = __webpack_require__(282),
	    getMatchData = __webpack_require__(328);

	/**
	 * The base implementation of `_.matches` which doesn't clone `source`.
	 *
	 * @private
	 * @param {Object} source The object of property values to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatches(source) {
	  var matchData = getMatchData(source);
	  if (matchData.length == 1 && matchData[0][2]) {
	    var key = matchData[0][0],
	        value = matchData[0][1];

	    return function(object) {
	      if (object == null) {
	        return false;
	      }
	      return object[key] === value &&
	        (value !== undefined || (key in Object(object)));
	    };
	  }
	  return function(object) {
	    return object === source || baseIsMatch(object, source, matchData);
	  };
	}

	module.exports = baseMatches;


/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(283),
	    baseIsEqual = __webpack_require__(314);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.isMatch` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Object} object The object to inspect.
	 * @param {Object} source The object of property values to match.
	 * @param {Array} matchData The property names, values, and compare flags to match.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
	 */
	function baseIsMatch(object, source, matchData, customizer) {
	  var index = matchData.length,
	      length = index,
	      noCustomizer = !customizer;

	  if (object == null) {
	    return !length;
	  }
	  object = Object(object);
	  while (index--) {
	    var data = matchData[index];
	    if ((noCustomizer && data[2])
	          ? data[1] !== object[data[0]]
	          : !(data[0] in object)
	        ) {
	      return false;
	    }
	  }
	  while (++index < length) {
	    data = matchData[index];
	    var key = data[0],
	        objValue = object[key],
	        srcValue = data[1];

	    if (noCustomizer && data[2]) {
	      if (objValue === undefined && !(key in object)) {
	        return false;
	      }
	    } else {
	      var stack = new Stack,
	          result = customizer ? customizer(objValue, srcValue, key, object, source, stack) : undefined;

	      if (!(result === undefined
	            ? baseIsEqual(srcValue, objValue, customizer, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG, stack)
	            : result
	          )) {
	        return false;
	      }
	    }
	  }
	  return true;
	}

	module.exports = baseIsMatch;


/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

	var stackClear = __webpack_require__(284),
	    stackDelete = __webpack_require__(285),
	    stackGet = __webpack_require__(288),
	    stackHas = __webpack_require__(290),
	    stackSet = __webpack_require__(292);

	/**
	 * Creates a stack cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function Stack(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add functions to the `Stack` cache.
	Stack.prototype.clear = stackClear;
	Stack.prototype['delete'] = stackDelete;
	Stack.prototype.get = stackGet;
	Stack.prototype.has = stackHas;
	Stack.prototype.set = stackSet;

	module.exports = Stack;


/***/ },
/* 284 */
/***/ function(module, exports) {

	/**
	 * Removes all key-value entries from the stack.
	 *
	 * @private
	 * @name clear
	 * @memberOf Stack
	 */
	function stackClear() {
	  this.__data__ = { 'array': [], 'map': null };
	}

	module.exports = stackClear;


/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

	var assocDelete = __webpack_require__(286);

	/**
	 * Removes `key` and its value from the stack.
	 *
	 * @private
	 * @name delete
	 * @memberOf Stack
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function stackDelete(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocDelete(array, key) : data.map['delete'](key);
	}

	module.exports = stackDelete;


/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(287);

	/** Used for built-in method references. */
	var arrayProto = Array.prototype;

	/** Built-in value references. */
	var splice = arrayProto.splice;

	/**
	 * Removes `key` and its value from the associative array.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function assocDelete(array, key) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    return false;
	  }
	  var lastIndex = array.length - 1;
	  if (index == lastIndex) {
	    array.pop();
	  } else {
	    splice.call(array, index, 1);
	  }
	  return true;
	}

	module.exports = assocDelete;


/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

	var eq = __webpack_require__(229);

	/**
	 * Gets the index at which the first occurrence of `key` is found in `array`
	 * of key-value pairs.
	 *
	 * @private
	 * @param {Array} array The array to search.
	 * @param {*} key The key to search for.
	 * @returns {number} Returns the index of the matched value, else `-1`.
	 */
	function assocIndexOf(array, key) {
	  var length = array.length;
	  while (length--) {
	    if (eq(array[length][0], key)) {
	      return length;
	    }
	  }
	  return -1;
	}

	module.exports = assocIndexOf;


/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

	var assocGet = __webpack_require__(289);

	/**
	 * Gets the stack value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf Stack
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function stackGet(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocGet(array, key) : data.map.get(key);
	}

	module.exports = stackGet;


/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(287);

	/**
	 * Gets the associative array value for `key`.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function assocGet(array, key) {
	  var index = assocIndexOf(array, key);
	  return index < 0 ? undefined : array[index][1];
	}

	module.exports = assocGet;


/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

	var assocHas = __webpack_require__(291);

	/**
	 * Checks if a stack value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf Stack
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function stackHas(key) {
	  var data = this.__data__,
	      array = data.array;

	  return array ? assocHas(array, key) : data.map.has(key);
	}

	module.exports = stackHas;


/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(287);

	/**
	 * Checks if an associative array value for `key` exists.
	 *
	 * @private
	 * @param {Array} array The array to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function assocHas(array, key) {
	  return assocIndexOf(array, key) > -1;
	}

	module.exports = assocHas;


/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

	var MapCache = __webpack_require__(293),
	    assocSet = __webpack_require__(312);

	/** Used as the size to enable large array optimizations. */
	var LARGE_ARRAY_SIZE = 200;

	/**
	 * Sets the stack `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf Stack
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the stack cache object.
	 */
	function stackSet(key, value) {
	  var data = this.__data__,
	      array = data.array;

	  if (array) {
	    if (array.length < (LARGE_ARRAY_SIZE - 1)) {
	      assocSet(array, key, value);
	    } else {
	      data.array = null;
	      data.map = new MapCache(array);
	    }
	  }
	  var map = data.map;
	  if (map) {
	    map.set(key, value);
	  }
	  return this;
	}

	module.exports = stackSet;


/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

	var mapClear = __webpack_require__(294),
	    mapDelete = __webpack_require__(304),
	    mapGet = __webpack_require__(308),
	    mapHas = __webpack_require__(310),
	    mapSet = __webpack_require__(311);

	/**
	 * Creates a map cache object to store key-value pairs.
	 *
	 * @private
	 * @constructor
	 * @param {Array} [values] The values to cache.
	 */
	function MapCache(values) {
	  var index = -1,
	      length = values ? values.length : 0;

	  this.clear();
	  while (++index < length) {
	    var entry = values[index];
	    this.set(entry[0], entry[1]);
	  }
	}

	// Add functions to the `MapCache`.
	MapCache.prototype.clear = mapClear;
	MapCache.prototype['delete'] = mapDelete;
	MapCache.prototype.get = mapGet;
	MapCache.prototype.has = mapHas;
	MapCache.prototype.set = mapSet;

	module.exports = MapCache;


/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

	var Hash = __webpack_require__(295),
	    Map = __webpack_require__(300);

	/**
	 * Removes all key-value entries from the map.
	 *
	 * @private
	 * @name clear
	 * @memberOf MapCache
	 */
	function mapClear() {
	  this.__data__ = {
	    'hash': new Hash,
	    'map': Map ? new Map : [],
	    'string': new Hash
	  };
	}

	module.exports = mapClear;


/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(296);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Creates an hash object.
	 *
	 * @private
	 * @constructor
	 * @returns {Object} Returns the new hash object.
	 */
	function Hash() {}

	// Avoid inheriting from `Object.prototype` when possible.
	Hash.prototype = nativeCreate ? nativeCreate(null) : objectProto;

	module.exports = Hash;


/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(297);

	/* Built-in method references that are verified to be native. */
	var nativeCreate = getNative(Object, 'create');

	module.exports = nativeCreate;


/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

	var isNative = __webpack_require__(298);

	/**
	 * Gets the native function at `key` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {string} key The key of the method to get.
	 * @returns {*} Returns the function if it's native, else `undefined`.
	 */
	function getNative(object, key) {
	  var value = object == null ? undefined : object[key];
	  return isNative(value) ? value : undefined;
	}

	module.exports = getNative;


/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

	var isFunction = __webpack_require__(235),
	    isHostObject = __webpack_require__(299),
	    isObjectLike = __webpack_require__(250);

	/** Used to match `RegExp` [syntax characters](http://ecma-international.org/ecma-262/6.0/#sec-patterns). */
	var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;

	/** Used to detect host constructors (Safari > 5). */
	var reIsHostCtor = /^\[object .+?Constructor\]$/;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/** Used to detect if a method is native. */
	var reIsNative = RegExp('^' +
	  funcToString.call(hasOwnProperty).replace(reRegExpChar, '\\$&')
	  .replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
	);

	/**
	 * Checks if `value` is a native function.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
	 * @example
	 *
	 * _.isNative(Array.prototype.push);
	 * // => true
	 *
	 * _.isNative(_);
	 * // => false
	 */
	function isNative(value) {
	  if (value == null) {
	    return false;
	  }
	  if (isFunction(value)) {
	    return reIsNative.test(funcToString.call(value));
	  }
	  return isObjectLike(value) &&
	    (isHostObject(value) ? reIsNative : reIsHostCtor).test(value);
	}

	module.exports = isNative;


/***/ },
/* 299 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a host object in IE < 9.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
	 */
	function isHostObject(value) {
	  // Many host objects are `Object` objects that can coerce to strings
	  // despite having improperly defined `toString` methods.
	  var result = false;
	  if (value != null && typeof value.toString != 'function') {
	    try {
	      result = !!(value + '');
	    } catch (e) {}
	  }
	  return result;
	}

	module.exports = isHostObject;


/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(297),
	    root = __webpack_require__(301);

	/* Built-in method references that are verified to be native. */
	var Map = getNative(root, 'Map');

	module.exports = Map;


/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(module, global) {var checkGlobal = __webpack_require__(303);

	/** Used to determine if values are of the language type `Object`. */
	var objectTypes = {
	  'function': true,
	  'object': true
	};

	/** Detect free variable `exports`. */
	var freeExports = (objectTypes[typeof exports] && exports && !exports.nodeType)
	  ? exports
	  : undefined;

	/** Detect free variable `module`. */
	var freeModule = (objectTypes[typeof module] && module && !module.nodeType)
	  ? module
	  : undefined;

	/** Detect free variable `global` from Node.js. */
	var freeGlobal = checkGlobal(freeExports && freeModule && typeof global == 'object' && global);

	/** Detect free variable `self`. */
	var freeSelf = checkGlobal(objectTypes[typeof self] && self);

	/** Detect free variable `window`. */
	var freeWindow = checkGlobal(objectTypes[typeof window] && window);

	/** Detect `this` as the global object. */
	var thisGlobal = checkGlobal(objectTypes[typeof this] && this);

	/**
	 * Used as a reference to the global object.
	 *
	 * The `this` value is used if it's the global object to avoid Greasemonkey's
	 * restricted `window` object, otherwise the `window` object is used.
	 */
	var root = freeGlobal ||
	  ((freeWindow !== (thisGlobal && thisGlobal.window)) && freeWindow) ||
	    freeSelf || thisGlobal || Function('return this')();

	module.exports = root;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(302)(module), (function() { return this; }())))

/***/ },
/* 302 */
/***/ function(module, exports) {

	module.exports = function(module) {
		if(!module.webpackPolyfill) {
			module.deprecate = function() {};
			module.paths = [];
			// module.parent = undefined by default
			module.children = [];
			module.webpackPolyfill = 1;
		}
		return module;
	}


/***/ },
/* 303 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is a global object.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {null|Object} Returns `value` if it's a global object, else `null`.
	 */
	function checkGlobal(value) {
	  return (value && value.Object === Object) ? value : null;
	}

	module.exports = checkGlobal;


/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(300),
	    assocDelete = __webpack_require__(286),
	    hashDelete = __webpack_require__(305),
	    isKeyable = __webpack_require__(307);

	/**
	 * Removes `key` and its value from the map.
	 *
	 * @private
	 * @name delete
	 * @memberOf MapCache
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function mapDelete(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashDelete(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map['delete'](key) : assocDelete(data.map, key);
	}

	module.exports = mapDelete;


/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

	var hashHas = __webpack_require__(306);

	/**
	 * Removes `key` and its value from the hash.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to remove.
	 * @returns {boolean} Returns `true` if the entry was removed, else `false`.
	 */
	function hashDelete(hash, key) {
	  return hashHas(hash, key) && delete hash[key];
	}

	module.exports = hashDelete;


/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(296);

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Checks if a hash value for `key` exists.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function hashHas(hash, key) {
	  return nativeCreate ? hash[key] !== undefined : hasOwnProperty.call(hash, key);
	}

	module.exports = hashHas;


/***/ },
/* 307 */
/***/ function(module, exports) {

	/**
	 * Checks if `value` is suitable for use as unique object key.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is suitable, else `false`.
	 */
	function isKeyable(value) {
	  var type = typeof value;
	  return type == 'number' || type == 'boolean' ||
	    (type == 'string' && value != '__proto__') || value == null;
	}

	module.exports = isKeyable;


/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(300),
	    assocGet = __webpack_require__(289),
	    hashGet = __webpack_require__(309),
	    isKeyable = __webpack_require__(307);

	/**
	 * Gets the map value for `key`.
	 *
	 * @private
	 * @name get
	 * @memberOf MapCache
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function mapGet(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashGet(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.get(key) : assocGet(data.map, key);
	}

	module.exports = mapGet;


/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(296);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * Gets the hash value for `key`.
	 *
	 * @private
	 * @param {Object} hash The hash to query.
	 * @param {string} key The key of the value to get.
	 * @returns {*} Returns the entry value.
	 */
	function hashGet(hash, key) {
	  if (nativeCreate) {
	    var result = hash[key];
	    return result === HASH_UNDEFINED ? undefined : result;
	  }
	  return hasOwnProperty.call(hash, key) ? hash[key] : undefined;
	}

	module.exports = hashGet;


/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(300),
	    assocHas = __webpack_require__(291),
	    hashHas = __webpack_require__(306),
	    isKeyable = __webpack_require__(307);

	/**
	 * Checks if a map value for `key` exists.
	 *
	 * @private
	 * @name has
	 * @memberOf MapCache
	 * @param {string} key The key of the entry to check.
	 * @returns {boolean} Returns `true` if an entry for `key` exists, else `false`.
	 */
	function mapHas(key) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    return hashHas(typeof key == 'string' ? data.string : data.hash, key);
	  }
	  return Map ? data.map.has(key) : assocHas(data.map, key);
	}

	module.exports = mapHas;


/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(300),
	    assocSet = __webpack_require__(312),
	    hashSet = __webpack_require__(313),
	    isKeyable = __webpack_require__(307);

	/**
	 * Sets the map `key` to `value`.
	 *
	 * @private
	 * @name set
	 * @memberOf MapCache
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 * @returns {Object} Returns the map cache object.
	 */
	function mapSet(key, value) {
	  var data = this.__data__;
	  if (isKeyable(key)) {
	    hashSet(typeof key == 'string' ? data.string : data.hash, key, value);
	  } else if (Map) {
	    data.map.set(key, value);
	  } else {
	    assocSet(data.map, key, value);
	  }
	  return this;
	}

	module.exports = mapSet;


/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

	var assocIndexOf = __webpack_require__(287);

	/**
	 * Sets the associative array `key` to `value`.
	 *
	 * @private
	 * @param {Array} array The array to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function assocSet(array, key, value) {
	  var index = assocIndexOf(array, key);
	  if (index < 0) {
	    array.push([key, value]);
	  } else {
	    array[index][1] = value;
	  }
	}

	module.exports = assocSet;


/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

	var nativeCreate = __webpack_require__(296);

	/** Used to stand-in for `undefined` hash values. */
	var HASH_UNDEFINED = '__lodash_hash_undefined__';

	/**
	 * Sets the hash `key` to `value`.
	 *
	 * @private
	 * @param {Object} hash The hash to modify.
	 * @param {string} key The key of the value to set.
	 * @param {*} value The value to set.
	 */
	function hashSet(hash, key, value) {
	  hash[key] = (nativeCreate && value === undefined) ? HASH_UNDEFINED : value;
	}

	module.exports = hashSet;


/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqualDeep = __webpack_require__(315),
	    isObject = __webpack_require__(236),
	    isObjectLike = __webpack_require__(250);

	/**
	 * The base implementation of `_.isEqual` which supports partial comparisons
	 * and tracks traversed objects.
	 *
	 * @private
	 * @param {*} value The value to compare.
	 * @param {*} other The other value to compare.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {boolean} [bitmask] The bitmask of comparison flags.
	 *  The bitmask may be composed of the following flags:
	 *     1 - Unordered comparison
	 *     2 - Partial comparison
	 * @param {Object} [stack] Tracks traversed `value` and `other` objects.
	 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	 */
	function baseIsEqual(value, other, customizer, bitmask, stack) {
	  if (value === other) {
	    return true;
	  }
	  if (value == null || other == null || (!isObject(value) && !isObjectLike(other))) {
	    return value !== value && other !== other;
	  }
	  return baseIsEqualDeep(value, other, baseIsEqual, customizer, bitmask, stack);
	}

	module.exports = baseIsEqual;


/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

	var Stack = __webpack_require__(283),
	    equalArrays = __webpack_require__(316),
	    equalByTag = __webpack_require__(318),
	    equalObjects = __webpack_require__(323),
	    getTag = __webpack_require__(324),
	    isArray = __webpack_require__(251),
	    isHostObject = __webpack_require__(299),
	    isTypedArray = __webpack_require__(327);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    objectTag = '[object Object]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;

	/**
	 * A specialized version of `baseIsEqual` for arrays and objects which performs
	 * deep comparisons and tracks traversed objects enabling objects with circular
	 * references to be compared.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function baseIsEqualDeep(object, other, equalFunc, customizer, bitmask, stack) {
	  var objIsArr = isArray(object),
	      othIsArr = isArray(other),
	      objTag = arrayTag,
	      othTag = arrayTag;

	  if (!objIsArr) {
	    objTag = getTag(object);
	    if (objTag == argsTag) {
	      objTag = objectTag;
	    } else if (objTag != objectTag) {
	      objIsArr = isTypedArray(object);
	    }
	  }
	  if (!othIsArr) {
	    othTag = getTag(other);
	    if (othTag == argsTag) {
	      othTag = objectTag;
	    } else if (othTag != objectTag) {
	      othIsArr = isTypedArray(other);
	    }
	  }
	  var objIsObj = objTag == objectTag && !isHostObject(object),
	      othIsObj = othTag == objectTag && !isHostObject(other),
	      isSameTag = objTag == othTag;

	  if (isSameTag && !(objIsArr || objIsObj)) {
	    return equalByTag(object, other, objTag, equalFunc, customizer, bitmask);
	  }
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	  if (!isPartial) {
	    var objIsWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
	        othIsWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

	    if (objIsWrapped || othIsWrapped) {
	      return equalFunc(objIsWrapped ? object.value() : object, othIsWrapped ? other.value() : other, customizer, bitmask, stack);
	    }
	  }
	  if (!isSameTag) {
	    return false;
	  }
	  stack || (stack = new Stack);
	  return (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, bitmask, stack);
	}

	module.exports = baseIsEqualDeep;


/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

	var arraySome = __webpack_require__(317);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for arrays with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Array} array The array to compare.
	 * @param {Array} other The other array to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} [stack] Tracks traversed `array` and `other` objects.
	 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
	 */
	function equalArrays(array, other, equalFunc, customizer, bitmask, stack) {
	  var index = -1,
	      isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      isUnordered = bitmask & UNORDERED_COMPARE_FLAG,
	      arrLength = array.length,
	      othLength = other.length;

	  if (arrLength != othLength && !(isPartial && othLength > arrLength)) {
	    return false;
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(array);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(array, other);

	  // Ignore non-index properties.
	  while (++index < arrLength) {
	    var arrValue = array[index],
	        othValue = other[index];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, arrValue, index, other, array, stack)
	        : customizer(arrValue, othValue, index, array, other, stack);
	    }
	    if (compared !== undefined) {
	      if (compared) {
	        continue;
	      }
	      result = false;
	      break;
	    }
	    // Recursively compare arrays (susceptible to call stack limits).
	    if (isUnordered) {
	      if (!arraySome(other, function(othValue) {
	            return arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack);
	          })) {
	        result = false;
	        break;
	      }
	    } else if (!(arrValue === othValue || equalFunc(arrValue, othValue, customizer, bitmask, stack))) {
	      result = false;
	      break;
	    }
	  }
	  stack['delete'](array);
	  return result;
	}

	module.exports = equalArrays;


/***/ },
/* 317 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.some` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {boolean} Returns `true` if any element passes the predicate check, else `false`.
	 */
	function arraySome(array, predicate) {
	  var index = -1,
	      length = array.length;

	  while (++index < length) {
	    if (predicate(array[index], index, array)) {
	      return true;
	    }
	  }
	  return false;
	}

	module.exports = arraySome;


/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(319),
	    Uint8Array = __webpack_require__(320),
	    mapToArray = __webpack_require__(321),
	    setToArray = __webpack_require__(322);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/** `Object#toString` result references. */
	var boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    symbolTag = '[object Symbol]';

	var arrayBufferTag = '[object ArrayBuffer]';

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolValueOf = Symbol ? symbolProto.valueOf : undefined;

	/**
	 * A specialized version of `baseIsEqualDeep` for comparing objects of
	 * the same `toStringTag`.
	 *
	 * **Note:** This function only supports comparing values with tags of
	 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {string} tag The `toStringTag` of the objects to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalByTag(object, other, tag, equalFunc, customizer, bitmask) {
	  switch (tag) {
	    case arrayBufferTag:
	      if ((object.byteLength != other.byteLength) ||
	          !equalFunc(new Uint8Array(object), new Uint8Array(other))) {
	        return false;
	      }
	      return true;

	    case boolTag:
	    case dateTag:
	      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
	      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
	      return +object == +other;

	    case errorTag:
	      return object.name == other.name && object.message == other.message;

	    case numberTag:
	      // Treat `NaN` vs. `NaN` as equal.
	      return (object != +object) ? other != +other : object == +other;

	    case regexpTag:
	    case stringTag:
	      // Coerce regexes to strings and treat strings primitives and string
	      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
	      return object == (other + '');

	    case mapTag:
	      var convert = mapToArray;

	    case setTag:
	      var isPartial = bitmask & PARTIAL_COMPARE_FLAG;
	      convert || (convert = setToArray);

	      // Recursively compare objects (susceptible to call stack limits).
	      return (isPartial || object.size == other.size) &&
	        equalFunc(convert(object), convert(other), customizer, bitmask | UNORDERED_COMPARE_FLAG);

	    case symbolTag:
	      return !!Symbol && (symbolValueOf.call(object) == symbolValueOf.call(other));
	  }
	  return false;
	}

	module.exports = equalByTag;


/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(301);

	/** Built-in value references. */
	var Symbol = root.Symbol;

	module.exports = Symbol;


/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

	var root = __webpack_require__(301);

	/** Built-in value references. */
	var Uint8Array = root.Uint8Array;

	module.exports = Uint8Array;


/***/ },
/* 321 */
/***/ function(module, exports) {

	/**
	 * Converts `map` to an array.
	 *
	 * @private
	 * @param {Object} map The map to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function mapToArray(map) {
	  var index = -1,
	      result = Array(map.size);

	  map.forEach(function(value, key) {
	    result[++index] = [key, value];
	  });
	  return result;
	}

	module.exports = mapToArray;


/***/ },
/* 322 */
/***/ function(module, exports) {

	/**
	 * Converts `set` to an array.
	 *
	 * @private
	 * @param {Object} set The set to convert.
	 * @returns {Array} Returns the converted array.
	 */
	function setToArray(set) {
	  var index = -1,
	      result = Array(set.size);

	  set.forEach(function(value) {
	    result[++index] = value;
	  });
	  return result;
	}

	module.exports = setToArray;


/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

	var baseHas = __webpack_require__(244),
	    keys = __webpack_require__(243);

	/** Used to compose bitmasks for comparison styles. */
	var PARTIAL_COMPARE_FLAG = 2;

	/**
	 * A specialized version of `baseIsEqualDeep` for objects with support for
	 * partial deep comparisons.
	 *
	 * @private
	 * @param {Object} object The object to compare.
	 * @param {Object} other The other object to compare.
	 * @param {Function} equalFunc The function to determine equivalents of values.
	 * @param {Function} [customizer] The function to customize comparisons.
	 * @param {number} [bitmask] The bitmask of comparison flags. See `baseIsEqual` for more details.
	 * @param {Object} [stack] Tracks traversed `object` and `other` objects.
	 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
	 */
	function equalObjects(object, other, equalFunc, customizer, bitmask, stack) {
	  var isPartial = bitmask & PARTIAL_COMPARE_FLAG,
	      objProps = keys(object),
	      objLength = objProps.length,
	      othProps = keys(other),
	      othLength = othProps.length;

	  if (objLength != othLength && !isPartial) {
	    return false;
	  }
	  var index = objLength;
	  while (index--) {
	    var key = objProps[index];
	    if (!(isPartial ? key in other : baseHas(other, key))) {
	      return false;
	    }
	  }
	  // Assume cyclic values are equal.
	  var stacked = stack.get(object);
	  if (stacked) {
	    return stacked == other;
	  }
	  var result = true;
	  stack.set(object, other);

	  var skipCtor = isPartial;
	  while (++index < objLength) {
	    key = objProps[index];
	    var objValue = object[key],
	        othValue = other[key];

	    if (customizer) {
	      var compared = isPartial
	        ? customizer(othValue, objValue, key, other, object, stack)
	        : customizer(objValue, othValue, key, object, other, stack);
	    }
	    // Recursively compare objects (susceptible to call stack limits).
	    if (!(compared === undefined
	          ? (objValue === othValue || equalFunc(objValue, othValue, customizer, bitmask, stack))
	          : compared
	        )) {
	      result = false;
	      break;
	    }
	    skipCtor || (skipCtor = key == 'constructor');
	  }
	  if (result && !skipCtor) {
	    var objCtor = object.constructor,
	        othCtor = other.constructor;

	    // Non `Object` object instances with different constructors are not equal.
	    if (objCtor != othCtor &&
	        ('constructor' in object && 'constructor' in other) &&
	        !(typeof objCtor == 'function' && objCtor instanceof objCtor &&
	          typeof othCtor == 'function' && othCtor instanceof othCtor)) {
	      result = false;
	    }
	  }
	  stack['delete'](object);
	  return result;
	}

	module.exports = equalObjects;


/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

	var Map = __webpack_require__(300),
	    Set = __webpack_require__(325),
	    WeakMap = __webpack_require__(326);

	/** `Object#toString` result references. */
	var mapTag = '[object Map]',
	    objectTag = '[object Object]',
	    setTag = '[object Set]',
	    weakMapTag = '[object WeakMap]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/** Used to resolve the decompiled source of functions. */
	var funcToString = Function.prototype.toString;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/** Used to detect maps, sets, and weakmaps. */
	var mapCtorString = Map ? funcToString.call(Map) : '',
	    setCtorString = Set ? funcToString.call(Set) : '',
	    weakMapCtorString = WeakMap ? funcToString.call(WeakMap) : '';

	/**
	 * Gets the `toStringTag` of `value`.
	 *
	 * @private
	 * @param {*} value The value to query.
	 * @returns {string} Returns the `toStringTag`.
	 */
	function getTag(value) {
	  return objectToString.call(value);
	}

	// Fallback for IE 11 providing `toStringTag` values for maps, sets, and weakmaps.
	if ((Map && getTag(new Map) != mapTag) ||
	    (Set && getTag(new Set) != setTag) ||
	    (WeakMap && getTag(new WeakMap) != weakMapTag)) {
	  getTag = function(value) {
	    var result = objectToString.call(value),
	        Ctor = result == objectTag ? value.constructor : null,
	        ctorString = typeof Ctor == 'function' ? funcToString.call(Ctor) : '';

	    if (ctorString) {
	      switch (ctorString) {
	        case mapCtorString: return mapTag;
	        case setCtorString: return setTag;
	        case weakMapCtorString: return weakMapTag;
	      }
	    }
	    return result;
	  };
	}

	module.exports = getTag;


/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(297),
	    root = __webpack_require__(301);

	/* Built-in method references that are verified to be native. */
	var Set = getNative(root, 'Set');

	module.exports = Set;


/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

	var getNative = __webpack_require__(297),
	    root = __webpack_require__(301);

	/* Built-in method references that are verified to be native. */
	var WeakMap = getNative(root, 'WeakMap');

	module.exports = WeakMap;


/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

	var isLength = __webpack_require__(237),
	    isObjectLike = __webpack_require__(250);

	/** `Object#toString` result references. */
	var argsTag = '[object Arguments]',
	    arrayTag = '[object Array]',
	    boolTag = '[object Boolean]',
	    dateTag = '[object Date]',
	    errorTag = '[object Error]',
	    funcTag = '[object Function]',
	    mapTag = '[object Map]',
	    numberTag = '[object Number]',
	    objectTag = '[object Object]',
	    regexpTag = '[object RegExp]',
	    setTag = '[object Set]',
	    stringTag = '[object String]',
	    weakMapTag = '[object WeakMap]';

	var arrayBufferTag = '[object ArrayBuffer]',
	    float32Tag = '[object Float32Array]',
	    float64Tag = '[object Float64Array]',
	    int8Tag = '[object Int8Array]',
	    int16Tag = '[object Int16Array]',
	    int32Tag = '[object Int32Array]',
	    uint8Tag = '[object Uint8Array]',
	    uint8ClampedTag = '[object Uint8ClampedArray]',
	    uint16Tag = '[object Uint16Array]',
	    uint32Tag = '[object Uint32Array]';

	/** Used to identify `toStringTag` values of typed arrays. */
	var typedArrayTags = {};
	typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
	typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
	typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
	typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
	typedArrayTags[uint32Tag] = true;
	typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
	typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
	typedArrayTags[dateTag] = typedArrayTags[errorTag] =
	typedArrayTags[funcTag] = typedArrayTags[mapTag] =
	typedArrayTags[numberTag] = typedArrayTags[objectTag] =
	typedArrayTags[regexpTag] = typedArrayTags[setTag] =
	typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a typed array.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isTypedArray(new Uint8Array);
	 * // => true
	 *
	 * _.isTypedArray([]);
	 * // => false
	 */
	function isTypedArray(value) {
	  return isObjectLike(value) &&
	    isLength(value.length) && !!typedArrayTags[objectToString.call(value)];
	}

	module.exports = isTypedArray;


/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

	var isStrictComparable = __webpack_require__(329),
	    toPairs = __webpack_require__(330);

	/**
	 * Gets the property names, values, and compare flags of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the match data of `object`.
	 */
	function getMatchData(object) {
	  var result = toPairs(object),
	      length = result.length;

	  while (length--) {
	    result[length][2] = isStrictComparable(result[length][1]);
	  }
	  return result;
	}

	module.exports = getMatchData;


/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(236);

	/**
	 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` if suitable for strict
	 *  equality comparisons, else `false`.
	 */
	function isStrictComparable(value) {
	  return value === value && !isObject(value);
	}

	module.exports = isStrictComparable;


/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

	var baseToPairs = __webpack_require__(331),
	    keys = __webpack_require__(243);

	/**
	 * Creates an array of own enumerable key-value pairs for `object` which
	 * can be consumed by `_.fromPairs`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @returns {Array} Returns the new array of key-value pairs.
	 * @example
	 *
	 * function Foo() {
	 *   this.a = 1;
	 *   this.b = 2;
	 * }
	 *
	 * Foo.prototype.c = 3;
	 *
	 * _.toPairs(new Foo);
	 * // => [['a', 1], ['b', 2]] (iteration order is not guaranteed)
	 */
	function toPairs(object) {
	  return baseToPairs(object, keys(object));
	}

	module.exports = toPairs;


/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(332);

	/**
	 * The base implementation of `_.toPairs` and `_.toPairsIn` which creates an array
	 * of key-value pairs for `object` corresponding to the property names of `props`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} props The property names to get values for.
	 * @returns {Object} Returns the new array of key-value pairs.
	 */
	function baseToPairs(object, props) {
	  return arrayMap(props, function(key) {
	    return [key, object[key]];
	  });
	}

	module.exports = baseToPairs;


/***/ },
/* 332 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.map` for arrays without support for iteratee
	 * shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function arrayMap(array, iteratee) {
	  var index = -1,
	      length = array.length,
	      result = Array(length);

	  while (++index < length) {
	    result[index] = iteratee(array[index], index, array);
	  }
	  return result;
	}

	module.exports = arrayMap;


/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

	var baseIsEqual = __webpack_require__(314),
	    get = __webpack_require__(334),
	    hasIn = __webpack_require__(341);

	/** Used to compose bitmasks for comparison styles. */
	var UNORDERED_COMPARE_FLAG = 1,
	    PARTIAL_COMPARE_FLAG = 2;

	/**
	 * The base implementation of `_.matchesProperty` which doesn't clone `srcValue`.
	 *
	 * @private
	 * @param {string} path The path of the property to get.
	 * @param {*} srcValue The value to match.
	 * @returns {Function} Returns the new function.
	 */
	function baseMatchesProperty(path, srcValue) {
	  return function(object) {
	    var objValue = get(object, path);
	    return (objValue === undefined && objValue === srcValue)
	      ? hasIn(object, path)
	      : baseIsEqual(srcValue, objValue, undefined, UNORDERED_COMPARE_FLAG | PARTIAL_COMPARE_FLAG);
	  };
	}

	module.exports = baseMatchesProperty;


/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(335);

	/**
	 * Gets the value at `path` of `object`. If the resolved value is
	 * `undefined` the `defaultValue` is used in its place.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c': 3 } }] };
	 *
	 * _.get(object, 'a[0].b.c');
	 * // => 3
	 *
	 * _.get(object, ['a', '0', 'b', 'c']);
	 * // => 3
	 *
	 * _.get(object, 'a.b.c', 'default');
	 * // => 'default'
	 */
	function get(object, path, defaultValue) {
	  var result = object == null ? undefined : baseGet(object, path);
	  return result === undefined ? defaultValue : result;
	}

	module.exports = get;


/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

	var baseCastPath = __webpack_require__(336),
	    isKey = __webpack_require__(340);

	/**
	 * The base implementation of `_.get` without support for default values.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to get.
	 * @returns {*} Returns the resolved value.
	 */
	function baseGet(object, path) {
	  path = isKey(path, object) ? [path + ''] : baseCastPath(path);

	  var index = 0,
	      length = path.length;

	  while (object != null && index < length) {
	    object = object[path[index++]];
	  }
	  return (index && index == length) ? object : undefined;
	}

	module.exports = baseGet;


/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(251),
	    stringToPath = __webpack_require__(337);

	/**
	 * Casts `value` to a path array if it's not one.
	 *
	 * @private
	 * @param {*} value The value to inspect.
	 * @returns {Array} Returns the cast property path array.
	 */
	function baseCastPath(value) {
	  return isArray(value) ? value : stringToPath(value);
	}

	module.exports = baseCastPath;


/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

	var toString = __webpack_require__(338);

	/** Used to match property names within property paths. */
	var rePropName = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]/g;

	/** Used to match backslashes in property paths. */
	var reEscapeChar = /\\(\\)?/g;

	/**
	 * Converts `string` to a property path array.
	 *
	 * @private
	 * @param {string} string The string to convert.
	 * @returns {Array} Returns the property path array.
	 */
	function stringToPath(string) {
	  var result = [];
	  toString(string).replace(rePropName, function(match, number, quote, string) {
	    result.push(quote ? string.replace(reEscapeChar, '$1') : (number || match));
	  });
	  return result;
	}

	module.exports = stringToPath;


/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

	var Symbol = __webpack_require__(319),
	    isSymbol = __webpack_require__(339);

	/** Used as references for various `Number` constants. */
	var INFINITY = 1 / 0;

	/** Used to convert symbols to primitives and strings. */
	var symbolProto = Symbol ? Symbol.prototype : undefined,
	    symbolToString = Symbol ? symbolProto.toString : undefined;

	/**
	 * Converts `value` to a string if it's not one. An empty string is returned
	 * for `null` and `undefined` values. The sign of `-0` is preserved.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to process.
	 * @returns {string} Returns the string.
	 * @example
	 *
	 * _.toString(null);
	 * // => ''
	 *
	 * _.toString(-0);
	 * // => '-0'
	 *
	 * _.toString([1, 2, 3]);
	 * // => '1,2,3'
	 */
	function toString(value) {
	  // Exit early for strings to avoid a performance hit in some environments.
	  if (typeof value == 'string') {
	    return value;
	  }
	  if (value == null) {
	    return '';
	  }
	  if (isSymbol(value)) {
	    return Symbol ? symbolToString.call(value) : '';
	  }
	  var result = (value + '');
	  return (result == '0' && (1 / value) == -INFINITY) ? '-0' : result;
	}

	module.exports = toString;


/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

	var isObjectLike = __webpack_require__(250);

	/** `Object#toString` result references. */
	var symbolTag = '[object Symbol]';

	/** Used for built-in method references. */
	var objectProto = Object.prototype;

	/**
	 * Used to resolve the [`toStringTag`](http://ecma-international.org/ecma-262/6.0/#sec-object.prototype.tostring)
	 * of values.
	 */
	var objectToString = objectProto.toString;

	/**
	 * Checks if `value` is classified as a `Symbol` primitive or object.
	 *
	 * @static
	 * @memberOf _
	 * @category Lang
	 * @param {*} value The value to check.
	 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
	 * @example
	 *
	 * _.isSymbol(Symbol.iterator);
	 * // => true
	 *
	 * _.isSymbol('abc');
	 * // => false
	 */
	function isSymbol(value) {
	  return typeof value == 'symbol' ||
	    (isObjectLike(value) && objectToString.call(value) == symbolTag);
	}

	module.exports = isSymbol;


/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

	var isArray = __webpack_require__(251);

	/** Used to match property names within property paths. */
	var reIsDeepProp = /\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,
	    reIsPlainProp = /^\w*$/;

	/**
	 * Checks if `value` is a property name and not a property path.
	 *
	 * @private
	 * @param {*} value The value to check.
	 * @param {Object} [object] The object to query keys on.
	 * @returns {boolean} Returns `true` if `value` is a property name, else `false`.
	 */
	function isKey(value, object) {
	  if (typeof value == 'number') {
	    return true;
	  }
	  return !isArray(value) &&
	    (reIsPlainProp.test(value) || !reIsDeepProp.test(value) ||
	      (object != null && value in Object(object)));
	}

	module.exports = isKey;


/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

	var baseHasIn = __webpack_require__(342),
	    hasPath = __webpack_require__(343);

	/**
	 * Checks if `path` is a direct or inherited property of `object`.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 * @example
	 *
	 * var object = _.create({ 'a': _.create({ 'b': _.create({ 'c': 3 }) }) });
	 *
	 * _.hasIn(object, 'a');
	 * // => true
	 *
	 * _.hasIn(object, 'a.b.c');
	 * // => true
	 *
	 * _.hasIn(object, ['a', 'b', 'c']);
	 * // => true
	 *
	 * _.hasIn(object, 'b');
	 * // => false
	 */
	function hasIn(object, path) {
	  return hasPath(object, path, baseHasIn);
	}

	module.exports = hasIn;


/***/ },
/* 342 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.hasIn` without support for deep paths.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} key The key to check.
	 * @returns {boolean} Returns `true` if `key` exists, else `false`.
	 */
	function baseHasIn(object, key) {
	  return key in Object(object);
	}

	module.exports = baseHasIn;


/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

	var baseCastPath = __webpack_require__(336),
	    isArguments = __webpack_require__(248),
	    isArray = __webpack_require__(251),
	    isIndex = __webpack_require__(238),
	    isKey = __webpack_require__(340),
	    isLength = __webpack_require__(237),
	    isString = __webpack_require__(252),
	    last = __webpack_require__(344),
	    parent = __webpack_require__(345);

	/**
	 * Checks if `path` exists on `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path to check.
	 * @param {Function} hasFunc The function to check properties.
	 * @returns {boolean} Returns `true` if `path` exists, else `false`.
	 */
	function hasPath(object, path, hasFunc) {
	  if (object == null) {
	    return false;
	  }
	  var result = hasFunc(object, path);
	  if (!result && !isKey(path)) {
	    path = baseCastPath(path);
	    object = parent(object, path);
	    if (object != null) {
	      path = last(path);
	      result = hasFunc(object, path);
	    }
	  }
	  var length = object ? object.length : undefined;
	  return result || (
	    !!length && isLength(length) && isIndex(path, length) &&
	    (isArray(object) || isString(object) || isArguments(object))
	  );
	}

	module.exports = hasPath;


/***/ },
/* 344 */
/***/ function(module, exports) {

	/**
	 * Gets the last element of `array`.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to query.
	 * @returns {*} Returns the last element of `array`.
	 * @example
	 *
	 * _.last([1, 2, 3]);
	 * // => 3
	 */
	function last(array) {
	  var length = array ? array.length : 0;
	  return length ? array[length - 1] : undefined;
	}

	module.exports = last;


/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

	var baseSlice = __webpack_require__(346),
	    get = __webpack_require__(334);

	/**
	 * Gets the parent value at `path` of `object`.
	 *
	 * @private
	 * @param {Object} object The object to query.
	 * @param {Array} path The path to get the parent value of.
	 * @returns {*} Returns the parent value.
	 */
	function parent(object, path) {
	  return path.length == 1 ? object : get(object, baseSlice(path, 0, -1));
	}

	module.exports = parent;


/***/ },
/* 346 */
/***/ function(module, exports) {

	/**
	 * The base implementation of `_.slice` without an iteratee call guard.
	 *
	 * @private
	 * @param {Array} array The array to slice.
	 * @param {number} [start=0] The start position.
	 * @param {number} [end=array.length] The end position.
	 * @returns {Array} Returns the slice of `array`.
	 */
	function baseSlice(array, start, end) {
	  var index = -1,
	      length = array.length;

	  if (start < 0) {
	    start = -start > length ? 0 : (length + start);
	  }
	  end = end > length ? length : end;
	  if (end < 0) {
	    end += length;
	  }
	  length = start > end ? 0 : ((end - start) >>> 0);
	  start >>>= 0;

	  var result = Array(length);
	  while (++index < length) {
	    result[index] = array[index + start];
	  }
	  return result;
	}

	module.exports = baseSlice;


/***/ },
/* 347 */
/***/ function(module, exports) {

	/**
	 * This method returns the first argument given to it.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {*} value Any value.
	 * @returns {*} Returns `value`.
	 * @example
	 *
	 * var object = { 'user': 'fred' };
	 *
	 * _.identity(object) === object;
	 * // => true
	 */
	function identity(value) {
	  return value;
	}

	module.exports = identity;


/***/ },
/* 348 */
/***/ function(module, exports, __webpack_require__) {

	var baseProperty = __webpack_require__(234),
	    basePropertyDeep = __webpack_require__(349),
	    isKey = __webpack_require__(340);

	/**
	 * Creates a function that returns the value at `path` of a given object.
	 *
	 * @static
	 * @memberOf _
	 * @category Util
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 * @example
	 *
	 * var objects = [
	 *   { 'a': { 'b': { 'c': 2 } } },
	 *   { 'a': { 'b': { 'c': 1 } } }
	 * ];
	 *
	 * _.map(objects, _.property('a.b.c'));
	 * // => [2, 1]
	 *
	 * _.map(_.sortBy(objects, _.property(['a', 'b', 'c'])), 'a.b.c');
	 * // => [1, 2]
	 */
	function property(path) {
	  return isKey(path) ? baseProperty(path) : basePropertyDeep(path);
	}

	module.exports = property;


/***/ },
/* 349 */
/***/ function(module, exports, __webpack_require__) {

	var baseGet = __webpack_require__(335);

	/**
	 * A specialized version of `baseProperty` which supports deep paths.
	 *
	 * @private
	 * @param {Array|string} path The path of the property to get.
	 * @returns {Function} Returns the new function.
	 */
	function basePropertyDeep(path) {
	  return function(object) {
	    return baseGet(object, path);
	  };
	}

	module.exports = basePropertyDeep;


/***/ },
/* 350 */
/***/ function(module, exports, __webpack_require__) {

	var arrayFilter = __webpack_require__(351),
	    baseFilter = __webpack_require__(352),
	    baseIteratee = __webpack_require__(280),
	    isArray = __webpack_require__(251);

	/**
	 * Iterates over elements of `collection`, returning an array of all elements
	 * `predicate` returns truthy for. The predicate is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney', 'age': 36, 'active': true },
	 *   { 'user': 'fred',   'age': 40, 'active': false }
	 * ];
	 *
	 * _.filter(users, function(o) { return !o.active; });
	 * // => objects for ['fred']
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.filter(users, { 'age': 36, 'active': true });
	 * // => objects for ['barney']
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.filter(users, ['active', false]);
	 * // => objects for ['fred']
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.filter(users, 'active');
	 * // => objects for ['barney']
	 */
	function filter(collection, predicate) {
	  var func = isArray(collection) ? arrayFilter : baseFilter;
	  return func(collection, baseIteratee(predicate, 3));
	}

	module.exports = filter;


/***/ },
/* 351 */
/***/ function(module, exports) {

	/**
	 * A specialized version of `_.filter` for arrays without support for
	 * iteratee shorthands.
	 *
	 * @private
	 * @param {Array} array The array to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function arrayFilter(array, predicate) {
	  var index = -1,
	      length = array.length,
	      resIndex = -1,
	      result = [];

	  while (++index < length) {
	    var value = array[index];
	    if (predicate(value, index, array)) {
	      result[++resIndex] = value;
	    }
	  }
	  return result;
	}

	module.exports = arrayFilter;


/***/ },
/* 352 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(273);

	/**
	 * The base implementation of `_.filter` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} predicate The function invoked per iteration.
	 * @returns {Array} Returns the new filtered array.
	 */
	function baseFilter(collection, predicate) {
	  var result = [];
	  baseEach(collection, function(value, index, collection) {
	    if (predicate(value, index, collection)) {
	      result.push(value);
	    }
	  });
	  return result;
	}

	module.exports = baseFilter;


/***/ },
/* 353 */
/***/ function(module, exports, __webpack_require__) {

	var baseFindIndex = __webpack_require__(279),
	    baseIteratee = __webpack_require__(280);

	/**
	 * This method is like `_.find` except that it returns the index of the first
	 * element `predicate` returns truthy for instead of the element itself.
	 *
	 * @static
	 * @memberOf _
	 * @category Array
	 * @param {Array} array The array to search.
	 * @param {Function|Object|string} [predicate=_.identity] The function invoked per iteration.
	 * @returns {number} Returns the index of the found element, else `-1`.
	 * @example
	 *
	 * var users = [
	 *   { 'user': 'barney',  'active': false },
	 *   { 'user': 'fred',    'active': false },
	 *   { 'user': 'pebbles', 'active': true }
	 * ];
	 *
	 * _.findIndex(users, function(o) { return o.user == 'barney'; });
	 * // => 0
	 *
	 * // The `_.matches` iteratee shorthand.
	 * _.findIndex(users, { 'user': 'fred', 'active': false });
	 * // => 1
	 *
	 * // The `_.matchesProperty` iteratee shorthand.
	 * _.findIndex(users, ['active', false]);
	 * // => 0
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.findIndex(users, 'active');
	 * // => 2
	 */
	function findIndex(array, predicate) {
	  return (array && array.length)
	    ? baseFindIndex(array, baseIteratee(predicate, 3))
	    : -1;
	}

	module.exports = findIndex;


/***/ },
/* 354 */
/***/ function(module, exports, __webpack_require__) {

	var arrayMap = __webpack_require__(332),
	    baseIteratee = __webpack_require__(280),
	    baseMap = __webpack_require__(355),
	    isArray = __webpack_require__(251);

	/**
	 * Creates an array of values by running each element in `collection` through
	 * `iteratee`. The iteratee is invoked with three arguments:
	 * (value, index|key, collection).
	 *
	 * Many lodash methods are guarded to work as iteratees for methods like
	 * `_.every`, `_.filter`, `_.map`, `_.mapValues`, `_.reject`, and `_.some`.
	 *
	 * The guarded methods are:
	 * `ary`, `curry`, `curryRight`, `drop`, `dropRight`, `every`, `fill`,
	 * `invert`, `parseInt`, `random`, `range`, `rangeRight`, `slice`, `some`,
	 * `sortBy`, `take`, `takeRight`, `template`, `trim`, `trimEnd`, `trimStart`,
	 * and `words`
	 *
	 * @static
	 * @memberOf _
	 * @category Collection
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function|Object|string} [iteratee=_.identity] The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 * @example
	 *
	 * function square(n) {
	 *   return n * n;
	 * }
	 *
	 * _.map([4, 8], square);
	 * // => [16, 64]
	 *
	 * _.map({ 'a': 4, 'b': 8 }, square);
	 * // => [16, 64] (iteration order is not guaranteed)
	 *
	 * var users = [
	 *   { 'user': 'barney' },
	 *   { 'user': 'fred' }
	 * ];
	 *
	 * // The `_.property` iteratee shorthand.
	 * _.map(users, 'user');
	 * // => ['barney', 'fred']
	 */
	function map(collection, iteratee) {
	  var func = isArray(collection) ? arrayMap : baseMap;
	  return func(collection, baseIteratee(iteratee, 3));
	}

	module.exports = map;


/***/ },
/* 355 */
/***/ function(module, exports, __webpack_require__) {

	var baseEach = __webpack_require__(273),
	    isArrayLike = __webpack_require__(232);

	/**
	 * The base implementation of `_.map` without support for iteratee shorthands.
	 *
	 * @private
	 * @param {Array|Object} collection The collection to iterate over.
	 * @param {Function} iteratee The function invoked per iteration.
	 * @returns {Array} Returns the new mapped array.
	 */
	function baseMap(collection, iteratee) {
	  var index = -1,
	      result = isArrayLike(collection) ? Array(collection.length) : [];

	  baseEach(collection, function(value, key, collection) {
	    result[++index] = iteratee(value, key, collection);
	  });
	  return result;
	}

	module.exports = baseMap;


/***/ },
/* 356 */
/***/ function(module, exports, __webpack_require__) {

	var baseCastPath = __webpack_require__(336),
	    get = __webpack_require__(334),
	    isFunction = __webpack_require__(235),
	    isKey = __webpack_require__(340),
	    parent = __webpack_require__(345);

	/**
	 * This method is like `_.get` except that if the resolved value is a function
	 * it's invoked with the `this` binding of its parent object and its result
	 * is returned.
	 *
	 * @static
	 * @memberOf _
	 * @category Object
	 * @param {Object} object The object to query.
	 * @param {Array|string} path The path of the property to resolve.
	 * @param {*} [defaultValue] The value returned if the resolved value is `undefined`.
	 * @returns {*} Returns the resolved value.
	 * @example
	 *
	 * var object = { 'a': [{ 'b': { 'c1': 3, 'c2': _.constant(4) } }] };
	 *
	 * _.result(object, 'a[0].b.c1');
	 * // => 3
	 *
	 * _.result(object, 'a[0].b.c2');
	 * // => 4
	 *
	 * _.result(object, 'a[0].b.c3', 'default');
	 * // => 'default'
	 *
	 * _.result(object, 'a[0].b.c3', _.constant('default'));
	 * // => 'default'
	 */
	function result(object, path, defaultValue) {
	  if (!isKey(path, object)) {
	    path = baseCastPath(path);
	    var result = get(object, path);
	    object = parent(object, path);
	  } else {
	    result = object == null ? undefined : object[path];
	  }
	  if (result === undefined) {
	    result = defaultValue;
	  }
	  return isFunction(result) ? result.call(object) : result;
	}

	module.exports = result;


/***/ },
/* 357 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/** @ssr-ready **/

	/**
	 * External Dependencies
	 */
	var React = __webpack_require__(4),
	    classNames = __webpack_require__(254);

	/**
	 * Internal dependencies
	 */
	var Count = __webpack_require__(358);

	var SelectDropdownItem = React.createClass({
		displayName: 'SelectDropdownItem',

		propTypes: {
			children: React.PropTypes.string.isRequired,
			path: React.PropTypes.string,
			selected: React.PropTypes.bool,
			onClick: React.PropTypes.func,
			count: React.PropTypes.number
		},

		getDefaultProps: function getDefaultProps() {
			return {
				selected: false
			};
		},

		render: function render() {
			var optionClassName = classNames(this.props.className, {
				'dops-select-dropdown__item': true,
				'is-selected': this.props.selected,
				'is-disabled': this.props.disabled
			});

			return React.createElement(
				'li',
				{ className: 'dops-select-dropdown__option' },
				React.createElement(
					'a',
					{
						ref: 'itemLink',
						href: this.props.path,
						className: optionClassName,
						onClick: this.props.disabled ? null : this.props.onClick,
						'data-bold-text': this.props.value || this.props.children,
						role: 'menuitem',
						tabIndex: 0,
						'aria-selected': this.props.selected },
					React.createElement(
						'span',
						{ className: 'dops-select-dropdown__item-text' },
						this.props.children,
						'number' === typeof this.props.count && React.createElement(Count, { count: this.props.count })
					)
				)
			);
		}
	});

	module.exports = SelectDropdownItem;

/***/ },
/* 358 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	var _mixin = __webpack_require__(359);

	var _mixin2 = _interopRequireDefault(_mixin);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/** @ssr-ready **/

	/**
	 * External dependencies
	 */
	__webpack_require__(362);

	exports.default = _react2.default.createClass({

		displayName: 'Count',

		mixins: [_mixin2.default],

		propTypes: {
			count: _react2.default.PropTypes.number.isRequired
		},

		render: function render() {
			return _react2.default.createElement(
				'span',
				{ className: 'dops-count' },
				this.numberFormat(this.props.count)
			);
		}
	});
	module.exports = exports['default'];

/***/ },
/* 359 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _function = __webpack_require__(360);

	var _function2 = _interopRequireDefault(_function);

	exports['default'] = {
	  shouldComponentUpdate: _function2['default']
	};
	module.exports = exports['default'];

/***/ },
/* 360 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = shouldPureComponentUpdate;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _shallowEqual = __webpack_require__(361);

	var _shallowEqual2 = _interopRequireDefault(_shallowEqual);

	function shouldPureComponentUpdate(nextProps, nextState) {
	  return !(0, _shallowEqual2['default'])(this.props, nextProps) || !(0, _shallowEqual2['default'])(this.state, nextState);
	}

	module.exports = exports['default'];

/***/ },
/* 361 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports['default'] = shallowEqual;

	function shallowEqual(objA, objB) {
	  if (objA === objB) {
	    return true;
	  }

	  if (typeof objA !== 'object' || objA === null || typeof objB !== 'object' || objB === null) {
	    return false;
	  }

	  var keysA = Object.keys(objA);
	  var keysB = Object.keys(objB);

	  if (keysA.length !== keysB.length) {
	    return false;
	  }

	  // Test for A's keys different from B.
	  var bHasOwnProperty = Object.prototype.hasOwnProperty.bind(objB);
	  for (var i = 0; i < keysA.length; i++) {
	    if (!bHasOwnProperty(keysA[i]) || objA[keysA[i]] !== objB[keysA[i]]) {
	      return false;
	    }
	  }

	  return true;
	}

	module.exports = exports['default'];

/***/ },
/* 362 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 363 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	/** @ssr-ready **/

	/**
	 * External Dependencies
	 */
	var React = __webpack_require__(4);

	var SelectDropdownSeparator = React.createClass({
		displayName: "SelectDropdownSeparator",


		render: function render() {
			return React.createElement("li", { className: "dops-select-dropdown__separator" });
		}
	});

	module.exports = SelectDropdownSeparator;

/***/ },
/* 364 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(4);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @ssr-ready **/

	/**
	 * External Dependencies
	 */


	/**
	 * Module variables
	 */
	var Component = _react2.default.Component;

	var stopPropagation = function stopPropagation(event) {
		return event.stopPropagation();
	};

	var SelectDropdownLabel = function (_Component) {
		_inherits(SelectDropdownLabel, _Component);

		function SelectDropdownLabel() {
			_classCallCheck(this, SelectDropdownLabel);

			return _possibleConstructorReturn(this, (SelectDropdownLabel.__proto__ || Object.getPrototypeOf(SelectDropdownLabel)).apply(this, arguments));
		}

		_createClass(SelectDropdownLabel, [{
			key: "render",
			value: function render() {
				return _react2.default.createElement(
					"li",
					{
						onClick: stopPropagation,
						className: "dops-select-dropdown__label"
					},
					_react2.default.createElement(
						"label",
						null,
						this.props.children
					)
				);
			}
		}]);

		return SelectDropdownLabel;
	}(Component);

	exports.default = SelectDropdownLabel;
	;
	module.exports = exports["default"];

/***/ },
/* 365 */
/***/ function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ },
/* 366 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var React = __webpack_require__(4),
	    Button = __webpack_require__(224),
	    SiteStore = __webpack_require__(215),
	    Paths = __webpack_require__(175),
	    Dashicon = __webpack_require__(367),
	    SetupProgressActions = __webpack_require__(174),
	    WelcomeSection = __webpack_require__(259);

	function getSiteState() {
		return {
			site_title: SiteStore.getTitle(),
			contactUrl: SiteStore.getContactPageEditURL(),
			welcomeUrl: SiteStore.getWelcomePageEditURL(),
			newsUrl: SiteStore.getNewsPageEditURL(),
			isJPConnected: SiteStore.getJetpackConfigured(),
			layout: SiteStore.getLayout(),
			wooCommerceStatus: SiteStore.getWooCommerceStatus(),
			wooCommerceSetupUrl: SiteStore.getWooCommerceSetupUrl(),
			pluginsUrl: SiteStore.getPluginsUrl()
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

		renderWooCommerceStatus: function renderWooCommerceStatus() {
			var _JPS$bloginfo = JPS.bloginfo,
			    is_shop = _JPS$bloginfo.is_shop,
			    type = _JPS$bloginfo.type;

			if (type !== 'business') {
				return null;
			}

			if (this.state.wooCommerceStatus) {
				return React.createElement(
					'li',
					null,
					React.createElement(Dashicon, { name: 'yes' }),
					' WooCommerce Installed! ',
					React.createElement(
						'a',
						{ href: this.state.wooCommerceSetupUrl },
						'Set up shop'
					)
				);
			} else if (!is_shop) {
				return React.createElement(
					'li',
					null,
					React.createElement(Dashicon, { name: 'no' }),
					' WooCommerce not installed. ',
					React.createElement(
						'a',
						{ href: '#', onClick: this.handleSkipTo.bind(this, Paths.WOOCOMMERCE_SLUG) },
						'Install WooCommerce?'
					)
				);
			} else {
				return React.createElement(
					'li',
					null,
					React.createElement(Dashicon, { name: 'no' }),
					' Error installing WooCommerce ',
					React.createElement(
						'a',
						{ href: this.state.pluginsUrl },
						'Try manual installation'
					)
				);
			}
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
								),
								!this.state.isJPConnected ? React.createElement(
									'a',
									{ href: '#', onClick: this.handleSkipTo.bind(this, Paths.JETPACK_MODULES_STEP_SLUG) },
									' Requires a Jetpack Connection '
								) : null
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
							),
							JPS.bloginfo.type === 'business' ? React.createElement(
								'li',
								null,
								JPS.steps.business_address ? React.createElement(Dashicon, { name: 'yes' }) : React.createElement(Dashicon, { name: 'no' }),
								' ',
								React.createElement(
									'em',
									null,
									'Business Address'
								),
								' page ',
								React.createElement(
									'a',
									{ href: '#', onClick: this.handleSkipTo.bind(this, Paths.BUSINESS_ADDRESS_SLUG) },
									'(edit)'
								),
								!this.state.isJPConnected ? React.createElement(
									'a',
									{ href: '#', onClick: this.handleSkipTo.bind(this, Paths.JETPACK_MODULES_STEP_SLUG) },
									' Requires a Jetpack Connection '
								) : null
							) : null,
							this.renderWooCommerceStatus()
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
/* 367 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _extends2 = __webpack_require__(260);

	var _extends3 = _interopRequireDefault(_extends2);

	var _objectWithoutProperties2 = __webpack_require__(261);

	var _objectWithoutProperties3 = _interopRequireDefault(_objectWithoutProperties2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// simple noticon wrapper

	var React = __webpack_require__(4);

	var Dashicon = React.createClass({
		displayName: 'Dashicon',


		propTypes: {
			name: React.PropTypes.string.isRequired
		},

		render: function render() {
			var _props = this.props,
			    name = _props.name,
			    other = (0, _objectWithoutProperties3['default'])(_props, ['name']);


			return React.createElement(
				'span',
				(0, _extends3['default'])({ className: 'dashicons dashicons-' + name }, other),
				this.props.children
			);
		}
	});

	module.exports = Dashicon;

/***/ }
]);