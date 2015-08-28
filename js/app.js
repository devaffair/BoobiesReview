// Define a new module for our app. The array holds the names of dependencies if any.
var app = angular.module('instantSearch', ['mongolabResourceHttp']);

app.constant('MONGOLAB_CONFIG',{API_KEY:'NKRaCGtXiYUhyfa0yiPEm2aw4i7fmE_3', DB_NAME:'boobies'});

app.filter('range', function() {
	return function(input, total) {
		total = parseInt(total);
		
		for (var i=0; i<total; i++)
		{
			input.push(i);
		}
		
		return input;
	};
});
app.factory('Movies', function ($mongolabResourceHttp) {
    return $mongolabResourceHttp('movies');
});

// Create the instant search filter

app.filter('searchFor', function(){

	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:searchString)

	return function(arr, searchString){

		if(!searchString){
			return arr;
		}

		var result = [];

		searchString = searchString.toLowerCase();

		// Using the forEach helper method to loop through the array
		angular.forEach(arr, function(item){

			if(item.title.toLowerCase().indexOf(searchString) !== -1){
				result.push(item);
			}

		});

		return result;
	};
});
/*
app.factory('movies', function($resource){
	return {
		fetchAll: function(callback){
			// The ngResource module gives us the $resource service. It makes working with
			// AJAX easy. Here I am using the client_id of a test app. Replace it with yours.

			var api = $resource('https://api.mongolab.com/api/1/databases/boobies/collections/movies',{
				apiKey: 'NKRaCGtXiYUhyfa0yiPEm2aw4i7fmE_3'
			},{
				// This creates an action which we've chosen to name "fetch". It issues
				// an JSONP request to the URL of the resource. JSONP requires that the
				// callback=JSON_CALLBACK part is added to the URL.
				fetch:{method:'JSONP'}
			});

			api.fetch(function(response){
				alert(1);
				// Call the supplied callback function
				callback(response.data);
				alert(2);

			});
		}
	}

});*/