'use strict';

var app = angular.module('app.Directive', []);

app.directive('ngEchart',require('./chartDirective'));
app.directive('ngStatistic',require('./statisticDirective'));
app.directive('ngStatisticLabel',require('./statisticLabelDirective'));
app.directive('testDire', function(){
    return{
        restrict:'AE',
        replace:true,
        template:"<div></div>",
        scope:{
            config:"="
        },
        link:function(scope,e,a){
            console.log(scope.config);
        }
    }
});

module.exports = 'app.Directive';