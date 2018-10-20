// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'angularMoment', 'ionic-datepicker'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs).
    // The reason we default this to hidden is that native apps don't usually show an accessory bar, at
    // least on iOS. It's a dead giveaway that an app is using a Web View. However, it's sometimes
    // useful especially with forms, though we would prefer giving the user a little more room
    // to interact with the app.
    if (window.cordova && window.Keyboard) {
      window.Keyboard.hideKeyboardAccessoryBar(true);
    }

    if (window.StatusBar) {
      // Set the statusbar to use the default style, tweak this to
      // remove the status bar on iOS or change it to use white instead of dark colors.
      StatusBar.styleDefault();
    }
  });
})

.controller('controller', function($scope, $ionicModal, $timeout) {

    $scope.init = function(){
      $scope.datePicker = {
        initial: moment().format('YYYY-MM-DD'),
        from: moment().format('YYYY-MM-DD'),
        to: '2022-12-30'
      };
    };
  
     // Datepicker on select date
    $scope.onDatePickerDateSelected = function (dDate) {
      console.log(dDate);
    };

    // Datepicker on close
    $scope.onDatePickerClose = function (dDate) {
      console.log(dDate);
      $scope.closeModal();
    };

    // Datepicker on confirm
    $scope.onDatePickerConfirm = function (dDate) {
      console.log(dDate);
      $scope.closeModal();
    }
 
    $scope.openModal = function() {
      $ionicModal.fromTemplateUrl('templates/modal/datepicker/datepicker.html', {
        scope: $scope,
        animation: 'fadeIn',
        backdropClickToClose: false
      }).then(function(modal) {
        $scope.modal = modal;
        $scope.modal.show();
      });
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
      $timeout(function() {
        $scope.modal.remove();
      }, 300);
    };

    $scope.$on('modal.hidden', function() {
      $timeout(function() {
        $scope.modal.remove();
      }, 300);
    });
});

