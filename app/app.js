var app = angular.module('TestApp', []);

app.controller('TestController', ['$scope', 'ItemService', function($scope, ItemService){
    
    //$scope.username = "kiralydavid";
    
    $scope.message = "Kedves Vendégünk,";
    
    $scope.items = [];
    
    $scope.cart = [];
    
    $scope.filterObj = {};
    
    ItemService.getItems().then(function(response){
        $scope.items = response.data;
    }, function(error){
        alert('ERROR');
    });
    
    $scope.addClick = function(item){
        var existing = false;
        
        $scope.cart.forEach(function(cartItem){
            if(item.id == cartItem.id) {
                existing = true;
                cartItem.amount += 1;
            }
        });
        
        if(!existing) {
            $scope.cart.push({
                id: item.id,
                name: item.name,
                price: item.price,
                amount: 1
            });
        }
    };
    
    $scope.removeItem = function(item){
        var index = 0;
        $scope.cart.forEach(function(cartItem, i) {
            if(cartItem.id == item.id) {
                index = i;
            }
        });
        
        $scope.cart.splice(index, 1);
    };
    
    $scope.sum = function(){
        var sum = 0;
        $scope.cart.forEach(function(cartItem, i) {
            sum += cartItem.amount * cartItem.price;
        });
        
        return sum;
    };
    
}]);

app.service('ItemService', ['$http', function($http){
    this.getItems = function(){
        return $http({
            method: "GET",
            url: "http://localhost/appe/db.json"
        });
    };
}]);