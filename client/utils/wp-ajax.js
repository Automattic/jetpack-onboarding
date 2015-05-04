var WPAjax = (function() {

	return {
		post: function(action, payload) {
			payload = typeof payload !== 'undefined' ? payload : {};
			var data = assign(payload, {action: action, nonce: JPS.nonce});
			
			var deferred = jQuery.Deferred();

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
				});	

			return deferred;
		}
	}

})();

module.exports = WPAjax;