'use strict';

angular.module('adaptv.adaptStrap.treebrowser', [])

/**
 * adTreeBrowser directive populates a tree dataStructure
 */
  .directive('adTreeBrowser', ['$adConfig',
    function ($adConfig) {
      function _controller($scope, $attrs) {
        var templateToken = Math.random();
        // scope initialization
        $scope.attrs = $attrs;
        $scope.iconClasses = $adConfig.iconClasses;
        $scope.treeRoot = $scope.$eval($attrs.treeRoot) || {};
        $scope.toggle = function (event, item) {
          var toggleCallback;
          event.stopPropagation();
          toggleCallback = $scope.$eval($attrs.toggleCallback);
          if (toggleCallback) {
            toggleCallback(item);
          } else {
            item._ad_expanded = !item._ad_expanded;
          }
        };
        $scope.hasChildren = function (item) {
          var hasChildren = $scope.$eval($attrs.hasChildren),
            found = item[$attrs.childNode] && item[$attrs.childNode].length > 0;
          if (hasChildren) {
            found = hasChildren(item);
          }
          return found;
        };
        // for unique template
        $scope.localConfig = {
          rendererTemplateId: 'tree-renderer-' + templateToken + '.html'
        };
      }

      return {
        restrict: 'E',
        scope: true,
        controller: _controller,
        templateUrl: 'treebrowser/treebrowser.tpl.html'
      };
    }]);
