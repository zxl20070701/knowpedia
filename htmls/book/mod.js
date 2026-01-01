ctrlapp.register.controller('BookController', ['$scope', '$state', '$http', function ($scope, $state, $http) {

    $scope.initMethod = function () {
        $scope.volume = $state.params.volume;
        $scope.session = $state.params.session;

        $scope.page = [];

        $http.get("./book/" + $scope.volume + "/" + $scope.session + "/index.json").then(function (res) {
            $scope.menus = res.data;
            $scope.openItem(0);
        }).catch(function () {
            $scope.goto("404");
        });

        document.getElementsByTagName("title")[0].innerText = $scope.volume + "/" + $scope.session + " 《个人知识文库》电子版本";
    };

    $scope.openItem = function (index) {
        $scope.index = index;
        let item = $scope.menus[index];
        let page = [];
        for (let i = 1; i <= item.count; i++) {
            page.push({
                url: "./book/" + $scope.volume + "/" + $scope.session + "/" + item.name + "/" + i + ".jpg",
                footer: "第 " + i + "/" + item.count + " 页"
            });
        }
        $scope.page = page;
    };

}]);