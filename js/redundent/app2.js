var app2 = angular.module('app2', ['ngCookies']);
/*
app2.controller('CookieCtrl', function ($scope, $rootScope, $cookieStore) {
    $scope.bump = function () {
        var lastVal = $cookieStore.get('lastValue');
        if (!lastVal) {
            $rootScope.lastVal = 1;
        } else {
            $rootScope.lastVal = lastVal + 1;
        }
        $cookieStore.put('lastValue', $rootScope.lastVal);
    }
	
	alert($cookieStore.get('lastValue'));
});*/

app2.controller('CookieCtrl', function ($scope, $rootScope, $cookieStore) {
	$scope.bump = function () {
        var lastVal = $cookieStore.get('lastValue');
        if (!lastVal) {
            $rootScope.lastVal = 1;
        } else {
            $rootScope.lastVal = lastVal + 1;
        }
        $cookieStore.put('lastValue', $rootScope.lastVal);
    }
	
	alert($cookieStore.get('lastValue'));
});