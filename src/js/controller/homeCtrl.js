module.exports = function ($scope, $rootScope, $timeout, $http, $q, $sce, $compile, $document, $websocket, twitterServiceStatus, othersServiceStatus, CONST) {
    $scope.query = {};
    // var totalrequests = 28+12;
    var sections = 8,
        totalrequests = 0;
    // $('#progress').progress();
    $scope.flags = {
        m: false,
        g: false,
        r: false
    };
    $('.popup').popup();
    $('#scrollspy .list .item .label').popup();
    $('.ui.accordion').accordion({
        exclusive: false,
        animateChildren: false,
        selector: {
            trigger: '.segment .title',
            content: '.segment .content'
        },
        // className:{
        //     active:'content active'
        // },
        onOpen: function () {
            // debugger;
            console.log($(this).find('.ui.segment.visible'))
            $(this).find('.ui.segment').removeClass('visible');
            $(this).find('div.echart').map(function (index, currentObj, array) {
                echarts.getInstanceByDom(currentObj).resize();
            })
        }
    })
    //social Health section UI controller
    // $scope.swapTab = function (platform) {
    //     $scope.selected = platform;
    //     $('.ui.tabular.menu').tab('change tab', platform);
    //     // debugger;
    //     var chartDom = $('.ui.tab[data-tab="' + platform + '"]').find('div.echart').get(0);
    //     if (chartDom) {
    //         echarts.getInstanceByDom(chartDom).resize();
    //     }
    // }
    // $timeout(function(){$('.tabular.menu .item').tab()},50);
    $scope.isSelected = function (section) {
        return $scope.selected === section;
    }

    // Top Seclectors data
    $scope.getTopics = function () {
        $scope.service.getCate().then(function (data) {
            // console.log(data)
            $scope.topics = data;
            if ($rootScope.global.topic) {
                $scope.startGetData($rootScope.global.topic);
            }
        })
    }();
    // $scope.getTopics();

    $scope.$on('data-got', function (event, arg) {
        $scope.flags.m = true;
        $('.tabular.menu .item').tab({
            onVisible: function (tab) {
                console.log(tab);
                var chartDom = $('.ui.tab[data-tab="' + tab + '"]').find('div.echart').get(0);
                if (chartDom) {
                    echarts.getInstanceByDom(chartDom).resize();
                }
            }
        })
        //$scope.$broadcast('on-show');
        $('#progress').progress('increment');
        // console.log($('#progress').progress('get value'))
        if ($('#progress').progress('get value') === $scope.totalrequests) {
            $timeout(function () {
                $('#progress').hide()
            }, 1000)
        }
    });

    $scope.startGetData = function (topic) {
        $rootScope.global.topic = topic;
        $scope.flags.m = false;
        $('div.echart').map(function () {
            echarts.getInstanceByDom(this).clear();
        })
        $('#progress').progress('reset');
        $('#progress').show();
        if ($scope.query.topic !== topic) {
            $scope.enabledPlatforms = [];
            $scope.query.topic = topic
            // console.log($scope);
            $timeout(function () {
                $scope.topics.forEach(function (item) {
                    if (item.TechCategoryName.toLowerCase() === topic.toLowerCase()) {
                        item.Platforms.forEach(function (p) {
                            if (p.isEnabled) $scope.enabledPlatforms.push(p.PlatformName)
                        })
                    }
                })
                $scope.totalrequests = sections * $scope.enabledPlatforms.length + totalrequests;
                $('#progress').progress({
                    total: $scope.totalrequests
                });
                $scope.selected = $scope.enabledPlatforms[0];
                $scope.listNotification(5);
            }, 50)
        } else {
            // $scope.enabledPlatforms=[];
            // $rootScope.$broadcast('destory-charts', 'home');
            $scope.$broadcast('start-get-data', 'home');
            $scope.selected = $scope.enabledPlatforms[0];
        }
    }

    //list latest top {number} notifications
    $scope.listNotification = function (top) {
        var date = Math.floor(moment.utc().add(-1, "days").startOf('day') / 1000);
        $scope.service.getSysDetections(undefined, undefined, $rootScope.global.topic, undefined, date).then(function (data) {
            // console.log(data);
            $scope.collections = data.reverse().splice(0, top);
        })
    }
    $scope.generateDownloadUrl = function (entity) {
        var downloadTemplate = '<a href="' + entity.link + '" target="_blank">Download Data</a>';
        return entity.hasDownload ? $sce.trustAsHtml(downloadTemplate) : 'N/A';
    }
    $scope.showdetails = function (entity) {
        var param = {
            platform: entity.forumName,
            msgType: entity.msgType,
            topic: entity.topic,
            timestamp: entity.TimeStamp
        }
        $rootScope.popSubWin({
            fn: 'getVoCDetailsBySpikeDetected',
            param: param
        });
    }

    $scope.finished = function () {
        $timeout(function () {
            $scope.$broadcast('start-get-data', 'home');
        }, 50)
    }

    // service status web socket
    // var twitter_ws = $websocket(CONST.SERVICE_INFO.TWITTER_WS_STATUS)
    // twitter_ws.onMessage(function (event) {
    //     $rootScope.twitter_status = JSON.parse(event.data);
    // });
    // twitter_ws.onError(function (event) {
    //     console.log('connection Error', event);
    // });

    // var others_ws = $websocket(CONST.SERVICE_INFO.OTHERS_WS_STATUS)
    // others_ws.onMessage(function (event) {
    //     $rootScope.others_status = JSON.parse(event.data);
    // });
    // others_ws.onError(function (event) {
    //     console.log('connection Error', event);
    // });
    $scope.getServiceStatus = function () {
        $http.get(CONST.SERVICE_INFO.TWITTER_SERVER_STATUS).then(function (data) {
            $scope.twitter_status = data.data
        });
        $http.get(CONST.SERVICE_INFO.OTHERS_SERVER_STATUS).then(function (data) {
            $scope.others_status = data.data
        });
    }
    $scope.getServiceStatus();
    $scope.twitter_status = twitterServiceStatus.status;
    $scope.others_status = othersServiceStatus.status;
}