window.App = window.App || { 

	collections: {}, 
	models: {}, 
	views: {} ,

	getPage : function( url , callback ){
		$.post( 'php/get-url.php', {url:url} , callback );
	},

};