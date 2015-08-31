// Define a new module for our app. The array holds the names of dependencies if any.
var app = angular.module('instantSearch', ['ui.bootstrap']);
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
				var items = [];
				
				$scope.items = response.data;
			});
		}
	}
	
	$scope.Vote = function($event){
		var i = this.i;
		var id = i._id["$oid"];
		
		// get user votes
		
		// if user voted this remove his vote
		
		// vote for movies
		
		// update user.votes
		
		var currentVote = $($event.target.parentNode).index() + 1;
		
		if(typeof(i.votes) !== "object"){
			i.votes = [];
		}
		
		var totalVotes = i.votes;
		totalVotes.push(currentVote);
		
		var item = {
			_id: i._id,
			url: i.url,
			title: i.title,
			image: i.image,
			boobs: i.boobs,
			votes: totalVotes
		};
		
		$http.post('https://api.mongolab.com/api/1/databases/boobies/collections/movies?apiKey=NKRaCGtXiYUhyfa0yiPEm2aw4i7fmE_3', item).
			then(function(response) {
				
			}, function(response) {
				// called asynchronously if an error occurs
				// or server returns response with an error status.
				debugger;
			});
	}
});

app.controller('TabsCtrl', function ($scope, $window) {
	$scope.tabs = [
		{ title:'Home', content:'Home Content', url:'pages/home.html' },
		{ title:'Add Movies', content:'Manage Movies Content', url:'pages/add.html'}
	];
});

app.controller('FacebookCtrl', function ($scope, $window, $http) {		
	window.fbAsyncInit = function() {
		FB.init({
		appId      : '581004718704834',
		cookie     : true,  // enable cookies to allow the server to access 
							// the session
		xfbml      : true,  // parse social plugins on this page
		version    : 'v2.2' // use version 2.2
		});

		FB.getLoginStatus(function(response) {
			$scope.StatusChangeCallback(response);
		});
	};
	$scope.CheckLoginState = function(){
		FB.getLoginStatus(function(response) {
			$scope.StatusChangeCallback(response);
		});
	}
	$scope.StatusChangeCallback = function(response){
		// The response object is returned with a status field that lets the
		// app know the current login status of the person.
		// Full docs on the response object can be found in the documentation
		// for FB.getLoginStatus().
		if (response.status === 'connected') {
			// Logged into your app and Facebook.
			$scope.GetUsersDetails();
		} else if (response.status === 'not_authorized') {
			// The person is logged into Facebook, but not your app.
			document.getElementById('status').innerHTML = 'Please log ' + 'into this app.';
		} else {
			// The person is not logged into Facebook, so we're not sure if
			// they are logged into this app or not.
			document.getElementById('status').innerHTML = 'Please log ' + 'into Facebook.';
		}
	}
	$scope.GetUsersDetails = function(){
		FB.api('/me', function(response) {
			var user = {
				facebookid: response.id,
				name: response.name,
				votes: []
			};
			
			var data = JSON.stringify(user);
		
			$http.get('https://api.mongolab.com/api/1/databases/boobies/collections/movies?apiKey=NKRaCGtXiYUhyfa0yiPEm2aw4i7fmE_3&l=1&q={"facebookid":{"$regex":"' + user.facebookid + '"}}').then(
			function (response) {
				if(response.data.length == 0) {
					$http.post('https://api.mongolab.com/api/1/databases/boobies/collections/users?apiKey=NKRaCGtXiYUhyfa0yiPEm2aw4i7fmE_3', data).
						then(function(response) {
							console.log("user " + user.name + " registered.");
						}, function(response) {
							// called asynchronously if an error occurs
							// or server returns response with an error status.
							debugger;
						});
				}
			});
		});
	}
});

app.filter('rangeNoBoobs', function() {
	return function(input, votes) {
		if (votes == null) {
			votes = [1];
		}
		
		var sum = 0; for(var i = 0; i < votes.length; i++){
			sum += parseInt(votes[i], 10);
		}
		var avg = sum/votes.length;

		var total = 10 - parseInt(avg); 
		
		for (var i=0; i<total; i++)
		{
			input.push(i);
		}
		
		return input;
	};
});

app.filter('range', function() {
	return function(input, votes) {
		if (votes == null) {
			votes = [1];
		}
		
		var sum = 0; for(var i = 0; i < votes.length; i++){
			sum += parseInt(votes[i], 10);
		}
		var avg = sum/votes.length;

		var total = parseInt(avg); 
		
		for (var i=0; i<total; i++)
		{
			input.push(i);
		}
		
		return input;
	};
});
