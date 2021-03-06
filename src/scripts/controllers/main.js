angular.module('zetta').controller('MainCtrl', [
  '$scope', '$state', 'navigator', 'appState', 'zettaShared',
  function($scope, $state, navigator, appState, zettaShared) {
    zettaShared.state.breadcrumbs = [];
    zettaShared.state.servers = [];
    zettaShared.state.pinned = [];
    zettaShared.state.muted = [];

    $scope.init = function() {
      $scope.params = { url: appState.url || '' };
    };

    $scope.errMsg = null;
    
    $scope.fetchUrl = function(params) {
      $scope.errMsg = null;
      if (!params.url) {
        return;
      }
      var url = params.url;
      appState.url = url;

      var index = $scope.serverUrls.indexOf(url);
      if (index > -1) {
        $scope.serverUrls.splice(index, 1);
      }

      $scope.serverUrls.unshift(url);

      localStorage.serverUrls = JSON.stringify($scope.serverUrls);

      var navigationPromise = navigator.transitionTo(url, { url: url }, true);
      navigationPromise.catch(function(status, url) {
        $scope.errMsg = 'Bad server retrieval. Status Code: ' + status;
        //console.log('Bad server retrieval. Status Code: ' + status + url); 
      });

    };

    if (!localStorage.serverUrls) {
      localStorage.serverUrls = JSON.stringify([]);
    }

    $scope.serverUrls = JSON.parse(localStorage.serverUrls);
  }
]);
