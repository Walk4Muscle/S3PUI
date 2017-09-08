/*
    ==========example====================

*/
module.exports = /*@ngInject*/function ($rootScope, $compile) {
    return {
        restrict: 'E',
        templateUrl: ('public/template/mentioned_table.html?time='+new Date().getTime()),
        replace: true,
        scope: {
            // users: "=",
            platform: "@",
            query: "=",
            association: "@"
        },
        link: function (scope, e, a) {
            $rootScope.$on('set-mentioned-table-data', function (evt, arg) {
                if (scope.association === arg.association) {
                    scope.total = arg.total;
                    scope.mostMentionedService = arg.data

                    var x = arg.association.substring(0, 4);
                    scope.volcolumnName = (x === 'mess'
                        ? 'Post Vol'
                        : (x === 'user'
                            ? 'User Vol'
                            : 'Volume'));
                }
            });
            scope.popDetail = function (serverName) {
                var param = {
                    platform: scope.platform,
                    topic: scope.query.topic,
                    service: serverName,
                    PNScope:'all',
                    granularity: scope.query.granularity,
                    start: scope.query.start,
                    end: scope.query.end
                }
                $rootScope.popSubWin({
                    fn: 'getVoCDetailsByServiceName',
                    param: param
                });
            }
            scope.swithside = function () {
                $(e).parent().parent().parent().shape('flip up')
            }
            scope.getters = {
                twitterInf: function (value) {
                    return value.user.followers_count + value.user.friends_count;
                }
            }
        }
    }
}
