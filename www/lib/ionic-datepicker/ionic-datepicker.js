(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('angular'), require('moment')) :
    typeof define === 'function' && define.amd ? define(['angular', 'moment'], factory) :
    (factory(global.angular, global.moment));
}(this, (function (angular, moment) {
  'use strict';

  angular = 'default' in angular ? angular['default'] : angular;
  moment = 'default' in moment ? moment['default'] : moment;

  var NOOP = function NOOP() {};
  var simpleDatepicker;


  simpleDatepicker = angular.module('ionic-datepicker', []);

  simpleDatepicker.directive('ionicDatepicker', [function () {
    var DEFAULT_MOMENT_FORMAT = 'YYYY-MM-DD';
    var DEFAULT_CURRENT_MONTH_FORMAT = 'DD MMMM YYYY';
    var DEFAULT_WEEKDAY_HEADER_FORMAT = 'dd';
    var DAYS_PER_WEEK = 7;
    var DEFAULT_PREV_LABEL = '<';
    var DEFAULT_NEXT_LABEL = '>';
    var DEFAULT_CLOSE_LABEL = 'X';
    return {
      restrict: 'E',
      templateUrl: 'lib/ionic-datepicker/ionic-datepicker.html',
      scope: {
        initial: '=?',
        from: '=?',
        to: '=?',
        format: '=?',
        weekdayFormat: '=?',
        labels: '=?',
        activeDays: '=?',
        onSelected: '&',
        onClose: '&',
        onConfirm: '&'
      },
      link: function link($scope) {
        var i;

        function _generateWeekdays(eFormat) {
          var format = eFormat || DEFAULT_WEEKDAY_HEADER_FORMAT;
          $scope.weekdays = [];
          for (i = 0; i < DAYS_PER_WEEK; i++) {
            $scope.weekdays.push(moment().weekday(i).format(format));
          }
        }

        $scope.days = [];
        $scope.weekdays = [];
        $scope.prevButtonLabel = DEFAULT_PREV_LABEL;
        $scope.nextButtonLabel = DEFAULT_NEXT_LABEL;
        $scope.closeButtonLabel = DEFAULT_CLOSE_LABEL;
        $scope.setSelectedDay = function (eDay) {
          if (eDay.active) {
            $scope.current = eDay.date;

            // on date select callback
            $scope.onSelected({
              current: $scope.current
            });
          }
        };
        $scope.goToPreviousMonth = function () {
          $scope.focus = moment($scope.focus).subtract(1, 'month').format();
        };
        $scope.goToNextMonth = function () {
          $scope.focus = moment($scope.focus).add(1, 'month').format();
        };
        $scope.hasPrevMonth = function () {
          return $scope.from ? moment($scope.focus).startOf('month').isAfter($scope.from) : true;
        };
        $scope.hasNextMonth = function () {
          return $scope.to ? moment($scope.focus).endOf('month').isBefore($scope.to) : true;
        };
        $scope.getCurrentMonth = function () {
          return moment($scope.focus).format(DEFAULT_CURRENT_MONTH_FORMAT);
        };
        $scope.getTitleCurrentMonth = function () {
          return moment($scope.focus).format('MMM');
        };
        $scope.getTitleCurrentYear = function () {
          return moment($scope.focus).format('YYYY');
        };
        $scope.getTitleCurrentDate = function () {
          return moment($scope.focus).format('DD');
        };

        // on close callback
        $scope.close = function () {
          $scope.onClose({
            current: $scope.current
          });
        };

        // on confirm callback
        $scope.confirm = function () {
          $scope.onConfirm({
            current: $scope.current
          });
        };

        $scope.$watch('labels', function (dLabels) {
          if (dLabels) {
            $scope.prevButtonLabel = dLabels.prevButton || DEFAULT_PREV_LABEL;
            $scope.nextButtonLabel = dLabels.nextButton || DEFAULT_NEXT_LABEL;
            $scope.closeButtonLabel = dLabels.closeButton || DEFAULT_CLOSE_LABEL;
          }
        });
        $scope.$watch('weekdayFormat', function (eFormat) {
          _generateWeekdays(eFormat);
        });
        $scope.$watch('format', function (dFormat) {
          if (!dFormat) {
            $scope.format = DEFAULT_MOMENT_FORMAT;
          }
        });
        $scope.$watch('initial', function (dInitial) {
          if (!dInitial || dInitial && !moment(dInitial).isValid()) {
            $scope.current = moment().format(DEFAULT_MOMENT_FORMAT);
          } else {
            $scope.current = moment(dInitial, $scope.format).format(DEFAULT_MOMENT_FORMAT);
          }
          $scope.focus = $scope.current;
        });
        $scope.$watch('activeDays', function (dActiveDays) {
          if (!dActiveDays) {
            $scope.activeDays = null;
          } else {
            $scope.activeDays = dActiveDays;
          }
        });
        $scope.$watch('focus', function (dFocus) {
          var data, isAfter, isBefore, days, day;
          var formatted, splitted, currentMonth;
          days = [];
          day = moment(dFocus).startOf('month').weekday(0);
          currentMonth = moment(dFocus).format('MM');
          i = 0;
          while (moment(day).isBefore(moment(dFocus).endOf('month'))) {
            day = moment(dFocus).startOf('month').weekday(i);
            formatted = day.format(DEFAULT_MOMENT_FORMAT);
            splitted = formatted.split('-');
            isAfter = $scope.from ? day.isAfter($scope.from) || day.isSame($scope.from) : true;
            isBefore = $scope.to ? day.isBefore($scope.to) || day.isSame($scope.to) : true;
            data = {
              date: formatted,
              label: splitted[2],
              isInCurrentMonth: splitted[1] === currentMonth,
              active: (!$scope.activeDays || $scope.activeDays.indexOf(formatted) > -1) && isAfter && isBefore
            };
            data.isInTimeframe = isAfter && isBefore;
            days.push(data);
            i++;
          }
          $scope.days = days;
        });
      }
    };
  }]);

})));
