'use strict';
angular.module('todoApp', ['ngRoute'])
.config(['$routeProvider', '$httpProvider', function ($routeProvider, $httpProvider) {

    // disable IE ajax request caching
    if (!$httpProvider.defaults.headers.get) {
        $httpProvider.defaults.headers.get = {};
    }
    $httpProvider.defaults.headers.get['If-Modified-Since'] = '0';

    $routeProvider.when("/Home", {
        controller: "todoListCtrl",
        templateUrl: "/App/Views/TodoList.html",
        resolve: {
            token: ['$http', 'todoListSvc', function ($http, todoListSvc) {
                return $http.get('/.auth/me').then(function (response) {
                    todoListSvc.setAuth(response.data[0].access_token);
                    return response.data[0].access_token;
                });
            }]
        },
    }).otherwise({ redirectTo: "/Home" });

    }]);
