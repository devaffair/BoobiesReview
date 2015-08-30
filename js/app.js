// Define a new module for our app. The array holds the names of dependencies if any.
var app = angular.module('instantSearch', ['mongolabResourceHttp', 'ui.bootstrap']);
app.constant('MONGOLAB_CONFIG',{API_KEY:'NKRaCGtXiYUhyfa0yiPEm2aw4i7fmE_3', DB_NAME:'boobies'});

app.controller('formCtrl', function($scope) {
	$scope.master = {
		url: "John", 
		title: "Doe",
		image: "Doe",
		boobies: "Doe"
	};
	$scope.save = function() {
		var data = JSON.stringify($scope.user);
		
		$.ajax( { url: "https://api.mongolab.com/api/1/databases/boobies/collections/movies?apiKey=NKRaCGtXiYUhyfa0yiPEm2aw4i7fmE_3",
			  data: data,
			  type: "POST",
			  contentType: "application/json" } 
		  );
	};
});

app.controller('InstantSearchController', function ($scope, $http) {
	$scope.items = [];
	var top = 20;
	var sortBy = "boobs";
	$http.get('https://api.mongolab.com/api/1/databases/boobies/collections/movies?apiKey=NKRaCGtXiYUhyfa0yiPEm2aw4i7fmE_3&l=' + top + '&s={"' + top + '":-1}').then(
	function (response) {
		$scope.items = response.data;
	});
	
	$scope.searchMovies = function(){
		if(this.searchString.length > 1){
			top = 10;
			sortBy = "boobs";
			$http.get('https://api.mongolab.com/api/1/databases/boobies/collections/movies?apiKey=NKRaCGtXiYUhyfa0yiPEm2aw4i7fmE_3&l=' + top + '&s={"' + top + '":-1}&q={"title":{"$regex":".*' + this.searchString + '.*","$options":"i"}}').then(
			function (response) {
				$scope.items = response.data;
			});
		} else {
			top = 20;
			sortBy = "boobs";
			$http.get('https://api.mongolab.com/api/1/databases/boobies/collections/movies?apiKey=NKRaCGtXiYUhyfa0yiPEm2aw4i7fmE_3&l=' + top + '&s={"' + top + '":-1}').then(
			function (response) {
				$scope.items = response.data;
			});
		}
	}
});

app.controller('TabsCtrl', function ($scope, $window) {
	$scope.tabs = [
		{ title:'Home', content:'Home Content', url:'pages/home.html' },
		{ title:'Add Movies', content:'Manage Movies Content', url:'pages/add.html'}
	];
});

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

app.filter('searchFor', function($http){
/*
var searchVal = searchString.toLowerCase();
		var top = 50;
		var sortBy = "boobs";
		$http.get('https://api.mongolab.com/api/1/databases/boobies/collections/movies?apiKey=NKRaCGtXiYUhyfa0yiPEm2aw4i7fmE_3&l=' + top + '&s={"' + top + '":-1}&q={"title":{"$regex":".*' + searchVal + '.*"}}').then(
		function (response) {
			var result = [];
			
			angular.forEach(response.data, function(item){
				if(item.title.toLowerCase().indexOf(searchString) !== -1){
					result.push(item);
				}
			});
			
			return result;
		});
		*/
		// return;


	// All filters must return a function. The first parameter
	// is the data that is to be filtered, and the second is an
	// argument that may be passed with a colon (searchFor:searchString)

	return function(arr, searchString){
		if(!searchString){
			return arr;
		}

		var searchVal = searchString.toLowerCase();
		var top = 50;
		var sortBy = "boobs";
		$http.get('https://api.mongolab.com/api/1/databases/boobies/collections/movies?apiKey=NKRaCGtXiYUhyfa0yiPEm2aw4i7fmE_3&l=' + top + '&s={"' + top + '":-1}&q={"title":{"$regex":".*' + searchVal + '.*"}}').then(
		function (response) {
			var result = [];
			
			angular.forEach(response.data, function(item){
				if(item.title.toLowerCase().indexOf(searchString) !== -1){
					result.push(item);
				}
			});
			
			return result;
		});
	};
});
