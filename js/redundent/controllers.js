function InstantSearchController($scope, Movies){
	$scope.items = [];
	
	Movies.all({ sort: {boobs: -1} }).then(function(movies){
		$scope.items = movies;
	});
}