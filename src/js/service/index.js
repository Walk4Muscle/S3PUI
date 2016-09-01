'use strict';

var app = angular.module('app.Srv', []);
app.constant('config', {
    'service': '/DataService/S3PDataService.svc/',
    'dev_service': '/data/'
})
app.factory('utilitySrv',require('./utility'));
app.factory('baseSrv', function ($http, $q, config) {
    return {
        get: function (url, dev = false) {
            var path = '';
            if (dev) {
                path = config.dev_service + url + '.json'
            } else {
                path = config.service + url
            }
            var deferred = $q.defer();
            $http.get(path).then(function (data) {
                if (data.status == 200) {
                    deferred.resolve(data.data)
                } else {
                }
            }, function (err) {
                deferred.reject(err);
            })
            return deferred.promise;
        }
    }
});

app.factory('testSrv', function (baseSrv) {
    return {
        test: function () {
            return baseSrv.get('GetMentionedServiceList', true)
        },
        getCate:function(){
            return baseSrv.get('GetAllEnabledTopicsByPlatform',true);
        },
        getUser:function(){
            return baseSrv.get('GetTopUsers',true);
        },
        getSpikes:function(){
            return baseSrv.get('GetDailyVolSpikes',true);
        },
        getDistribution:function(){
            return baseSrv.get('GetPNDistribution',true);
        }
    }
})

module.exports = 'app.Srv';