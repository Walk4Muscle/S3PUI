
var app = angular.module('app.Directive', []);

app.directive('ngEchart',require('./chartDirective'));
app.directive('ngRadarEchart',require('./chartRadarDirective'));
app.directive('ngStatistic',require('./statisticDirective'));
app.directive('ngStatisticLabel',require('./statisticLabelDirective'));
app.directive('ngScrollSpy',require('./scrollspyDirective'));
app.directive('ngChartShape',require('./chartShapeDirective'));
// app.directive('ngChartNestShape',require('./chartNestShapeDirective')); 
app.directive('userList',require('./userListDirective'));
app.directive('subWindow',require('./subWindowDirective'));
app.directive('topicQuery',require('./topicQueryDirective'));
app.directive('selectPage',require('./selectPageDirective'));
app.directive('mentionedTable',require('./mentionedTableDirective'));

app.directive('adminCard',require('./adminCardDirective'));
app.directive('platformCardContent',require('./platformCardContentDirective'));


module.exports = 'app.Directive';