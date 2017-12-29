
var app = angular.module("app",["ngRoute"]);

app.config(function($routeProvider){
    $routeProvider.when('/',{
        templateUrl:"tpls/demo.html",
    })
        .when("/apply",{
            templateUrl:"tpls/apply.html",
        })
        .when('/website',{
            templateUrl:"tpls/website.html",
        })
        .when('/game',{
            templateUrl:"tpls/game.html",
        })
});