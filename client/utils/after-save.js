const DataStore = require( 'stores/data-store' );

const afterSaving = function( callback ) {
	if ( ! DataStore.isSaving() ) {
		return callback();
	}
	setTimeout( () => {
		afterSaving( callback );
	}, 500 );
};

export default afterSaving;
