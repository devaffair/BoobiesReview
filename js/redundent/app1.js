var app1 = angular.module('myApp', []);
app1.constant('MONGOLAB_CONFIG',{API_KEY:'NKRaCGtXiYUhyfa0yiPEm2aw4i7fmE_3', DB_NAME:'boobies'});

app1.controller('formCtrl', function($scope) {
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