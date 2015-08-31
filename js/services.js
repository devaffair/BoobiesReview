(function () {
    var user = angular.module("user");
    user.factory("UserService", [
        '$http',
        'httpRestValue',
        function ($http, httpRestValue) {
            var UserService = {
                data: {
                    currentUser: {}
                },
                getUser: function (id) {
                    FB.api('/me', function(response) {
						var user = {
							facebookid: response.id,
							name: response.name,
							votes: []
						};
						
						var data = JSON.stringify(user);
					
						return $http.get('https://api.mongolab.com/api/1/databases/boobies/collections/movies?apiKey=NKRaCGtXiYUhyfa0yiPEm2aw4i7fmE_3&l=1&q={"facebookid":{"$regex":"' + user.facebookid + '"}}').then(
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
                },
                getPersons : function(){
                    return $http.get(httpRestValue + "user/list")
                        .success(function success(data) {
                            UserService.data.persons = data;
                        })
                        .error(function error() {
                        });
                },
                savePerson : function(user){
                    return $http.post(httpRestValue + "user/",user)
                        .success(function success() {
                            UserService.getPersons();
                        })
                        .error(function error() {
                        });
                },
                deletePerson : function(id){
                    return $http.delete(httpRestValue + "user/"+id)
                        .success(function success() {
                            UserService.getPersons();
                        })
                        .error(function error() {
                        });
                }
        };
        return UserService;
    }
]);
})();