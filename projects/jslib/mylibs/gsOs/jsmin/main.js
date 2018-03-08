'use strict';

/*
 * @desc 获取操作系统类型
 * @return {String} macOs，windows，linux，ios，android，windowsPhone
 */
(function ($) {
    var gs = {
        gsOs: function gsOs() {
            var userAgent = 'navigator' in window && 'userAgent' in navigator && navigator.userAgent.toLowerCase() || '';
            var appVersion = 'navigator' in window && 'appVersion' in navigator && navigator.appVersion.toLowerCase() || '';
            if (/iphone/i.test(userAgent) || /ipad/i.test(userAgent) || /ipod/i.test(userAgent)) return 'ios';
            if (/android/i.test(userAgent)) return 'android';
            if (/mac/i.test(appVersion)) return 'macOs';
            if (/win/i.test(appVersion)) return 'windows';
            if (/linux/i.test(appVersion)) return 'linux';
            if (/win/i.test(appVersion) && /phone/i.test(userAgent)) return 'windowsPhone';
        },
        init: function init() {
            console.log(this.gsOs());
        }
    };
    gs.init();
})(jQuery);