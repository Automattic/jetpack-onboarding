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

var DataActions = require('../actions/data-actions');

var WPAjax = (function() {

	return {
		post: function(action, payload) {
			payload = typeof payload !== 'undefined' ? payload : {};
			var data = _.extend(payload, {action: action, nonce: JPS.nonce});
			
			var deferred = jQuery.Deferred();

			DataActions.requestStarted();

			jQuery.post( ajaxurl, data )
				.success( function( response ) {
					if ( ! response.success ) {
						deferred.reject(response.data);
					} else {
						deferred.resolve(response.data);
					}
				})
				.fail( function() {
					deferred.reject("Server error");
				})
				.always( function () {
					DataActions.requestFinished();
				});	

			return deferred;
		}
	}

})();

module.exports = WPAjax;