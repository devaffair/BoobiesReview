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