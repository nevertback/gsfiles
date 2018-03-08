/*
 * @desc   获取浏览器类型和版本
 * @return {String} 获取的浏览器(ie,edge,firefox,opera,chrome,safari),版本
 */
(function($){
    var gs = {
        gsExplore:function () {
            var sys = {},
                ua = navigator.userAgent.toLowerCase(),
                s;
            (s = ua.match(/rv:([\d.]+)\) like gecko/)) ? sys= {ie:true,ver : s[1]}:
                (s = ua.match(/msie ([\d\.]+)/)) ? sys = {ie:true,ver : s[1]} :
                    (s = ua.match(/edge\/([\d\.]+)/)) ? sys = {edge:true,ver : s[1]} :
                        (s = ua.match(/firefox\/([\d\.]+)/)) ? sys = {firefox:true,ver : s[1]} :
                            (s = ua.match(/(?:opera|opr).([\d\.]+)/)) ? sys = {opera:true,ver : s[1]} :
                                (s = ua.match(/chrome\/([\d\.]+)/)) ? sys = {chrome:true,ver : s[1]} :
                                    (s = ua.match(/version\/([\d\.]+).*safari/)) ? sys = {safari:true,ver : s[1]} : 0;
            return sys;
        },
        init:function(){
            console.log(this.gsExplore());
        }
    };
    gs.init();
})(jQuery);