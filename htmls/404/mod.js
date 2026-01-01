ctrlapp.register.controller('404Controller', ['$scope', function ($scope) {

    $scope.initMethod = function () {
        document.getElementsByTagName("title")[0].innerText = "404 Not Found 《个人知识文库》电子版本";
    };

}]);