// 自定义扩展模块
var libapp = angular.module("ui.libraries", []);

// 控制器模块
var ctrlapp = angular.module("ui.ctrl", []);

//主模块定义（同时引入需要的模块）
var startapp = angular.module("startApp", ['ui.router', 'ui.libraries', 'ui.ctrl']);

//启动主模块
startapp.config(['$stateProvider', '$urlRouterProvider', '$controllerProvider', "$compileProvider", "$filterProvider", "$provide", function ($stateProvider, $urlRouterProvider, $controllerProvider, $compileProvider, $filterProvider, $provide) {
  "use strict";

  //定义需要使用的方法
  ctrlapp.register = {
    controller: $controllerProvider.register,
    directive: $compileProvider.directive,
    filter: $filterProvider.register,
    factory: $provide.factory,
    service: $provide.service
  };

  //异步加载控制器文件
  startapp.asyncjs = function (js) {
    return ['$q', function ($q) {

      var delay = $q.defer(),
        load = function () {
          window.$.getScript(js, function () {
            delay.resolve();
          });
        };
      load();
      return delay.promise;
    }];
  };

  var addToken = function (url) {
    return url + "?_=" + new Date().valueOf();
  };

  // 定义路由
  $stateProvider

    // 欢迎界面
    .state("404", {
      url: "/404",
      templateUrl: addToken("htmls/404/mod.html"),
      resolve: {
        delay: startapp.asyncjs('htmls/404/mod.js')
      },
      controller: "404Controller"
    })

    // book显示内容
    .state("book", {
      url: "/book/:volume/:session",
      templateUrl: addToken("htmls/book/mod.html"),
      resolve: {
        delay: startapp.asyncjs('htmls/book/mod.js')
      },
      controller: "BookController"
    });

  $urlRouterProvider.otherwise("/404");

}]).run(['$rootScope', '$state', function ($rootScope, $state) {

  "use strict";

  // 路由跳转
  $rootScope.goto = function (state, params) {
    $state.go(state, params);
  };

}]);