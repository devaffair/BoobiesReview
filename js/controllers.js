function InstantSearchController($scope, Movies){
	$scope.items = [];
	
	Movies.all().then(function(movies){
		$scope.items = movies;
	  });
}