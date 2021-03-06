(function () {
    function setIframeSize(wrap, n) {
        function aritcleVideo() {
            var ww = $(document).width(),
                aw = ww - n,
                ch = aw / 16 * 9;
            $(wrap).find('iframe').css({
                'width': aw + 'px',
                'height': ch + 'px'
            });
            if ($('#youkuplayer_0').length != 0) {
                $(wrap).find('#youkuplayer_0').css({
                    'width': aw + 'px',
                    'height': ch + 'px'
                });
            } else if ($('#youkuplayer_1').length != 0) {
                $(wrap).find('#youkuplayer_1').css({
                    'width': aw + 'px',
                    'height': ch + 'px'
                });
            }
        }
        if ($(wrap).length != 0) {
            aritcleVideo();
            setTimeout(function () {
                aritcleVideo();
            }, 2000);
        } else {
            return false;
        }
    }
    setIframeSize('.ymw-contxt', 20);
    setIframeSize('.ymw-rel-infos', 28);
    function downVideo() {
        var ww = $(document).width(),
            aw = ww - 28,
            ch = aw / 16 * 9;
        if ($('.ymw-gmvd').find('.yu-btn-yuan').length == 0) {
            $('.ymw-gmvd').remove();
        } else {
            $('.ymw-gmvd').find('.yu-btn-yuan').addClass('ymwQhYuanBtn');
            $("#gamersky_player_box").GamerSkyPlayer();
            $("#gamersky_player_box").css({ 'width': aw + 'px', 'height': ch + 'px' });
        }
    }
    if ($('.ymw-gmvd').length != 0) {
        downVideo();
    }
    (!$('.ymw-contxt').length == 0) ? contentJs() : void 0;
    if ($('.pingce2').length != 0) {
        addPcNum();
    }
    if ($('.dianping').length != 0) {
        addPcNum();
    }
})();
(function ($) {
    $.fn.wanFun = function () {
        var ids = "";
        $(".btnAddRemark[data-type='7']").each(function () {
            if (ids != "") {
                ids = ids + ","
            }
            ids = ids + $(this).attr("gameId");
        });
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://cm1.gamersky.com/apirating/getwanrating",
            data: { 'Idlist': ids },
            success: function (data) {
                if (data.status == 'ok') {
                    $.each(data.result, function (index, value) {
                        $(".btnAddRemark[gameId='" + value.gameId + "'][data-type='7']").find("i").text(value.wantplayCount);
                        $(".btnAddRemark[gameId='" + value.gameId + "'][data-type='8']").find("i").text(value.playedCount);
                    });
                }
            }
        });
    };
    $.fn.addwanFun = function (fun) {
        var $this = $(this);
        if ($this.attr("data-isclk") == "true") {
            $this.attr("data-isclk", false);
            var gameId = $("#remarkFilter").attr("sid");
            var type = $this.attr("data-type");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://cm1.gamersky.com/apirating/addwanRating",
                data: { 'Rating': JSON2.stringify({ "GenneralId": gameId, 'Sorce': "1", 'Type': type,'FromDevice':1 }) },
                success: function (data) {
                    if (data.status == "ok") {
                        if ($this.hasClass("cur")) {
                            var $that = $(".game_bot").find(".btnAddRemark[data-type=" + type + "]");
                            $that.addClass("cur").siblings().removeClass("cur");
                            $that.find("i").html(data.times);
                            var m = parseInt($that.siblings().find("i").text());
                            if (m > 0 && data.isFrist == false) {
                                $that.siblings().find("i").html(m - 1);
                            }
                        }
                        else {
                            $this.addClass("cur").siblings().removeClass("cur");
                            $this.find("i").html(data.times);
                            var m = parseInt($this.siblings().find("i").text());
                            if (m > 0 && data.isFrist == false) {
                                $this.siblings().find("i").html(m - 1);
                            }
                        }
                        $(".addreview").attr("data-type", type);
                        setTimeout(function () { $(".mycomment").GetMyCommet() }, 1000);
                    }
                    $this.attr("data-isclk", true);
                    if (fun != undefined) { fun(data); }
                }
            });
        }
    }
    $.fn.getMyRating = function () {
        var gameId = $("#remarkFilter").attr("sid");
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://cm1.gamersky.com/apirating/getuserrating",
                data: { 'Rating': JSON2.stringify({ "GenneralId": gameId, 'Type': "0" }) },
                success: function (data) {
                    if (data.sorce > 0) {
                        var n = parseInt(data.sorce / 2);
                        var txt = $this.find("a").eq(n - 1).attr("data-txt");
                        $this.find(".gs_zp_txt").html(txt);
                        $this.find("a").removeClass("cur");
                        var cmtId = $(".mycomment").find(".comm_infos").attr("cmtid");
                        $(".myscorestar[cmtid=" + cmtId + "]").find("a").removeClass("cur");
                        for (var i = 0; i < n; i++) {
                            $this.find("a").eq(i).addClass("cur");
                            $(".myscorestar[cmtid=" + cmtId + "]").each(function () {
                                $(this).find("a").eq(i).addClass("cur");
                            });
                        }
                    }
                }
            });
        })
    }
    $.fn.getUserRating = function () {
        return this.each(function () {
            var $this = $(this);
            var gameId = $this.attr("gameId");
            $.ajax({
                type: "GET", dataType: "jsonp", url: "http://cm1.gamersky.com/apirating/getplayersscore",
                data: { jsondata: JSON2.stringify({ genneralId: gameId, num: "10" }) },
                success: function (responseJson) {
                    if (responseJson.status == 'ok') {
                        $(".game_score_loading").hide();
                        $(".game_top").find(".userrating").removeClass("sc_loading");
                        if ($(".dataTime").attr("date-selltime") == "已上市") {
                            if (responseJson.totalnumber >= 10) {
                                var sorce = responseJson.sorce >= 10 ? "10" : responseJson.sorce;
                                $this.show().find(".num").html(sorce);
                                $this.find(".comm span").html(responseJson.totalnumber);
                                $this.find(".gs_zp_star_group").find("i").attr("style", "width:" + responseJson.sorce * 10 + "%");
                            }
                            else {
                                $this.show().find(".num").attr("class", "noper").html("人数不足");
                                $this.find(".comm span").html(responseJson.totalnumber);
                            }
                        }
                        else {
                            if ($this.find(".game_score").length > 0) {
                                $this.show().attr("class", "no_game").find(".game_score").attr("class", "num").html("<span>" + responseJson.wanNumber + "</span>人期待");
                            }
                            else {
                                $this.show().attr("class", "no_game").find(".num").html("<span>" + responseJson.wanNumber + "</span>人期待");
                            }
                            $this.find(".gs_zp_star_group,.comm").remove()
                        }

                    }
                }
            });
        })
    }
    $.fn.judgewanFun = function () {
        var ids = "";
        $(".btnAddRemark[data-type='7']").each(function () {
            if (ids != "") {
                ids = ids + ","
            }
            ids = ids + $(this).attr("gameId");
        });
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://cm1.gamersky.com/apirating/Judge",
            data: { 'Idlist': ids },
            success: function (data) {
                if (data.status == "ok") {
                    $.each(data.result, function (index, value) {
                        if (value.wantPlay == 'True') {
                            $(".btnAddRemark[gameId='" + value.gameId + "'][data-type='7']").addClass("cur");
                            $(".addreview").attr("data-type", 7);
                            $(".scorestar a").attr("title", "玩过才可以打分!");
                        }
                        if (value.played == 'True') {
                            $(".addreview").attr("data-type", 8);
                            $(".btnAddRemark[gameId='" + value.gameId + "'][data-type='8']").addClass("cur");
                        }
                    });
                }
            }
        });
    }
    $('.ymw-btns-pc').attr('target', '_blank')
    $('.ymw-btns-pc').on('click', function () {
        var cookieval = 'wapopenpc', cookievalTime = 'wapopenpctimeout';
        if ($.fn.cookie(cookieval) == undefined || $.fn.cookie(cookieval) == null) {
            $.fn.cookie(cookieval, 'yes', { path: '/', domain: '.gamersky.com' })
        }
        if ($.fn.cookie(cookievalTime) == undefined || $.fn.cookie(cookievalTime) == null) {
            $.fn.cookie(cookievalTime, 'yes', { path: '/', domain: '.gamersky.com', expires: 0.5 })
        }
    })
    $.fn.QZloginForm = function () {
        var $this = $(this);
        $this.on("click", "#qqLogin", function (event) {
            event.preventDefault();
            var returnUrl = window.location.href;
            window.location.href = "http://i.gamersky.com/oauth/authorizelogin?authorizetype=qq&returnUrl=" + encodeURI(returnUrl);
        }).on("click", "#sinaLogin", function (event) {
            event.preventDefault();
            var returnUrl = window.location.href;
            window.location.href = "http://i.gamersky.com/oauth/authorizelogin?authorizetype=sina&returnUrl=" + encodeURI(returnUrl);
        })
    };
    $.fn.insertYmwLoginPop = function () {
        // $('.ymw-loginpopMsk,.ymw-loginpop').remove();
        // var returnUrl = encodeURI(window.location.href);
        // var ymwLoginDom = '';
        // ymwLoginDom += '<div class="ymw-loginpopMsk"></div><div class="ymw-loginpop"><h5>登录后参加互动</h5><p><span>你可以通过一下方式登录</span></p><div class="ymw-loginpop-btns">';
        // 游民登录
        // ymwLoginDom += '<a target="_blank" href="http://i.gamersky.com/user/login.html?from=' + returnUrl + '" class="ymw-loginpop-gs"></a>';
        //QQ登录
        // ymwLoginDom += '<a target="_blank" href="javascript:;" id="qqLogin" class="ymw-loginpop-qq"></a>';
        //微博登录
        // ymwLoginDom += '<a target="_blank" href="javascript:;"  id="sinaLogin" class="ymw-loginpop-wb"></a>';
        // ymwLoginDom += '</div></div>';
        // $('body').append(ymwLoginDom);
        //点击弹窗外部关闭弹窗
        // $('.ymw-loginpopMsk').on('click', function () {
        // removeYmwLoginPop();
        // })
        $(".gsZpPopLoginClose").show();
        $(".gs_zp_pop_login").show();
        $('.gsZpPopLoginClose').on('click', function () {
            $(".gs_zp_pop_login").hide();
            $(".gsZpPopLoginClose").hide();
        })
    };
    $.fn.loginStatus = function () {
        var $this = $(this);
        var UserCookie = $.cookie("UserCookie");
        if (UserCookie !== undefined && UserCookie !== null) {
            var responseJson = $.parseJSON(UserCookie);
            var userface = responseJson.userface;
            if (userface == '') {
                userface = 'http://image.gamersky.com/webimg15/comment/anonymous.jpg';
            }
            $this.attr("src", userface);
            $this.next().html(responseJson.username);

        }
        else {
            $.ajax({
                type: "GET", dataType: "jsonp", url: "http://i.gamersky.com/api/logincheck",
                success: function (responseJson) {
                    if (responseJson.status == "ok") {
                        $this.attr("src", responseJson.userface);
                        $this.next().html(responseJson.username);

                    }
                    else{
                        $(".gs_zp_myscore").parents(".gs_zp_box").click(function(){
                            $(this).insertYmwLoginPop();
                        });
                    }
                }
            });
        }
    };
    $.fn.gameMoreFun = function () {
        var $this = $(this);
        var gameId = $this.attr("gameId");
        var moreNumber = $(".dataTime").attr("date-selltime") == "未上市" ? 0 : 10;
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://cm1.gamersky.com/apirating/gamemore",
            data: { 'jsondata': JSON2.stringify({ "GenneralId": gameId, number: moreNumber }) },
            success: function (data) {
                if (data.status == "ok") {
                    var htm = "";
                    var len = data.result.length > 3 ? 3 : data.result.length;
                    if(len==0){
                        $this.hide();
                    }
                    else if (len == 1 && data.result[0].percentAge == 0) {
                        $this.hide();
                    }
                    else {
                        for (var i = 0; i < len; i++) {
                            var percentAge = data.result[i].percentAge;
                            if (parseInt(percentAge) > 0) {
                                var nodeName = data.result[i].nodeName;
                                if (data.isListed == true) {
                                    htm += ' <p>好于' + percentAge + '%的' + nodeName + '</p>';
                                }
                                else {
                                    if (data.result[i].nodeDir == 'ku') {
                                        nodeName = "所有游戏";
                                    }
                                    htm += ' <p>超过' + percentAge + '%的'+nodeName+'</p>';
                                }
                            }
                        }
                        $this.html(htm);
                    }

                }
                else {
                    $this.hide();
                }
            }
        });
    };
    $.fn.starStatisticalFun = function () {
        return this.each(function () {
            var $this = $(this);
            var gameId = $this.attr("gameId");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://cm1.gamersky.com/apirating/starstatistics",
                data: { "GenneralId": gameId },
                success: function (data) {
                    if (data.status == "ok") {
                        var n = 0; maxNum = 0;
                        maxNum = parseFloat(data.result[0].percentAge);
                        for (var i = 1; i < data.result.length; i++) {
                            var h = parseFloat(data.result[i].percentAge);
                            if (h > maxNum) {
                                maxNum = h;
                            }
                        }

                        for (var i = data.result.length - 1; i >= 0; i--) {
                            n++;
                            var m = data.result[i].percentAge;
                            var w = m == maxNum ? "2rem" : (m / maxNum) * 2 + "rem";
                            w = maxNum == 0 ? maxNum : w;
                            $this.find(".star_progress").find("i").eq(n - 1).attr("style", "width:" + w + "");
                            $this.find(".t2").eq(n - 1).html("" + m + "%");
                        }
                    }
                }
            });
        })
    };
})(jQuery);
$(function () {
    $(".btnAddRemark").wanFun();
    $(".ymw_stars").getMyRating();
    checkMarketTime(".pingtai");
    $(".headpic").loginStatus();

    var pageIndex = $(".contentpage").attr("data-pageindx");
    if (pageIndex > 1) {
        var pageUrl = $(".contentpage").attr("href");
        pageUrl = pageUrl.split(".shtml");
        var contentpageUrl = pageUrl[0] + "_" + pageIndex + ".shtml?tag=wap"
        $(".contentpage").attr("href", contentpageUrl);
    }
});
function addPcNum() {
    function pc(str1, str2) {
        if ($(str1).length > 0) {
            var $str1 = $(str1), n = $str1.find(str2).text();
            if (n.indexOf(".") != -1) { n = Number(n.split(".")[1]) > 0 && Number(n.split(".")[1]) < 5 ? n.split(".")[0] + ".5" : Number(n).toFixed(); }
            n = n.replace(/.{0}/, "n").replace(".", "-");
            $str1.find(str2).attr("class", "pnum " + n);
        }
    }
    pc(".pingce2", ".pnum"); //游民点评
    pc(".dianping", ".pnum");    //游民点评
};
function contentJs() {
    for (var m = 0; m < document.getElementsByTagName("span").length; m++) {
        if (document.getElementsByTagName("span")[m].style.color == "rgb(255, 204, 0)") {
            document.getElementsByTagName("span")[m].style.color = "#d26217";
        }
        if (document.getElementsByTagName("span")[m].color == "#ffcc00" || document.getElementsByTagName("span")[m].color == "rgb(255, 204, 0)") {
            document.getElementsByTagName("span")[m].color = "#d26217";
        }
        //翠绿色替换
        if (document.getElementsByTagName("span")[m].color == "#00ee00") {
            document.getElementsByTagName("span")[m].color = "#228B22";
        }
    }
    for (var t = 0; t < document.getElementsByTagName("strong").length; t++) {
        if (document.getElementsByTagName("strong")[t].style.color == "rgb(255, 204, 0)") {
            document.getElementsByTagName("strong")[t].style.color = "#d26217";
        }
        if (document.getElementsByTagName("strong")[t].color == "#ffcc00" || document.getElementsByTagName("strong")[t].color == "rgb(255, 204, 0)") {
            document.getElementsByTagName("strong")[t].color = "#d26217";
        }
        //翠绿色替换
        if (document.getElementsByTagName("strong")[t].color == "#00ee00") {
            document.getElementsByTagName("strong")[t].color = "#228B22";
        }
    }

    for (var n = 0; n < document.getElementsByTagName("font").length; n++) {
        if (document.getElementsByTagName("font")[n].style.color == "rgb(255, 204, 0)") {
            document.getElementsByTagName("font")[n].style.color = "#d26217";
        }
        if (document.getElementsByTagName("font")[n].color == "#ffcc00" || document.getElementsByTagName("font")[n].color == "rgb(255, 204, 0)") {
            document.getElementsByTagName("font")[n].color = "#d26217";
        }
        //翠绿色替换
        if (document.getElementsByTagName("font")[n].color == "#00ee00") {
            document.getElementsByTagName("font")[n].color = "#228B22";
        }
        //黄色替换
        if (document.getElementsByTagName("font")[n].color == "#FFFF00") {
            document.getElementsByTagName("font")[n].color = "#ff6000";
        }
    }
    var iframeLength = document.getElementsByTagName("iframe").length;
    var embedLenfth = document.getElementsByTagName("embed").length;
    $("#leshitvauto").height(document.body.clientWidth * (9 / 16)).width(document.body.clientWidth - 20);

    if (iframeLength > 0) {
        for (var i = 0; i < iframeLength; i++) {
            var iframeElements = document.getElementsByTagName("iframe")[i];
            if (iframeElements.style["display"] != "none") {
                iframeElements.removeAttribute("style");
            }
            iframeElements.height = document.body.clientWidth * (9 / 16);
            iframeElements.width = document.body.clientWidth - 20;
        }

    }
    if (embedLenfth > 0) {
        for (var n = 0; n < embedLenfth; n++) {
            if (document.getElementsByTagName("embed")[n].style["display"] != "none") {
                document.getElementsByTagName("embed")[n].removeAttribute("style");
            }
            document.getElementsByTagName("embed")[n].height = document.body.clientWidth * (9 / 16);
            document.getElementsByTagName("embed")[n].width = document.body.clientWidth - 20;
        }
    }
    var blockreference = $(".blockreference").html();
    if ($(".blockreference").length > 0) {
        if ($(".referencecontent").length > 0) {
            $(".referencecontent").html(blockreference);
            $(".blockreference").remove();
        } else {
            $(".blockreference").css("display", "block");
        }
    }
};
function judgeTime(sellTime) {
    var reg = new RegExp("[\\u4E00-\\u9FFF]+");
    if (reg.test(sellTime)) {
        return false;
    }
    else {
        var myDate = new Date();
        var year = myDate.getFullYear();
        var month = myDate.getMonth() + 1;
        var date = myDate.getDate();
        var h = myDate.getHours();
        var m = myDate.getMinutes();
        var s = myDate.getSeconds();
        var now = year + '-' + padleft0(month) + "-" + padleft0(date);
        if (!checkEndTime(sellTime, now)) {
            return false;
        }
    }
    return true;
};
function checkMarketTime(div) {
    $(div).find("a").each(function () {
        var $this = $(this);
        var time = $this.attr("data-time");
        if (judgeTime(time)) {
            $(".dataTime").attr("date-selltime", "已上市");
            return false
        }
        else {
            $(".dataTime").attr("date-selltime", "未上市");
        }
    })
    setTimeout(function () { judgeListedState(".dataTime") }, 200);
};
function judgeListedState(div) {
    $(div).each(function () {
        var $this = $(this);
        var sellTime = $this.attr("date-selltime");
        var gameId = $("#remarkFilter").attr("sid"),qdDom = '';
        if (sellTime == '未上市') {
            qdDom += "<div class='btn_nogame btnAddRemark' gameid='" + gameId + "' data-isclk='true' data-type='7'>期待</div>";
            $(qdDom).insertAfter($('.game_bot').find('.btngroup'));
            $(".game_bot").show().find('.btngroup').remove();
            $(".btnAddRemark").btnAddRemarkFun();
            $(".addreview").attr("data-type", "7");
        }
        else {
            $(".game_bot").show();
            $(".star_details").starStatisticalFun().show();
            $(".addreview").attr("data-type", "8");
        }
    })
    $(".userrating").getUserRating();
    $(".remark_compare").gameMoreFun();
    $(".ymw_zp_pf_wd").judgewanFun();
};
//补齐两位数
function padleft0(obj) {
    return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
};
//比较日期大小
function checkEndTime(startTime, endTime) {
    if (typeof (startTime) == "undefined" || typeof (endTime) == "undefined") {
        return;
    }
    var start = new Date(startTime.replace("-", "/").replace("-", "/"));
    var end = new Date(endTime.replace("-", "/").replace("-", "/"));
    if (end < start) {
        return false;
    }
    return true;
};
function removeYmwLoginPop() {
    $('.ymw-loginpopMsk,.ymw-loginpop').remove();
};
(function ($) {
    //APP
    var openAppJs = {
        config:{
            target:'#pe100_page_contentpage',
            txts:[
                '打开游民APP，查看更多精彩内容',
                '打开游民APP，查看更多精彩攻略',
                '打开游民APP，查看更多'
            ],
            countId:$('#wapcountn').attr('generalid'),
            btnStyle:'display: block;margin: 0.3rem auto;width: 5.4rem;height: 0.8rem;line-height: 0.8rem;background-color: #e72029;font-size: 0.28rem;color: #fff !important;text-align: center;border-radius: 0.1rem;'
        },
        isAndroid:function () {
            var nu = navigator.userAgent,
                nus = (navigator.appVersion, nu.indexOf("Android") > -1 || nu.indexOf("Linux") > -1);
            return nus;
        },
        getUrlInfos:function () {
            var urlInfos='';
            urlInfos = location.href;
            if(urlInfos.indexOf('/news/')>0){
                return '新闻'
            }else if(urlInfos.indexOf('/gl/')>0){
                return '攻略'
            }else{
                return '其他'
            }

        },
        insertBtn:function () {
            var btnDom = '',thCfg = this.config;
            var u = navigator.userAgent;
            var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1;
            var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
            btnDom += '<a style="'+thCfg.btnStyle+'" id="gsGotoApp">';
            if(this.getUrlInfos() === '新闻'){
                btnDom += thCfg.txts[0];
            }else if(this.getUrlInfos() === '攻略'){
                btnDom += thCfg.txts[1];
            }else{
                btnDom += thCfg.txts[2];
            }
            btnDom += '</a>';
            if(isiOS){
                $(btnDom).insertBefore(thCfg.target);
            }
            $('#gsGotoApp').on('click',function () {
                function android() {
                    /***打开app的协议***/
                    window.location.href = 'intent://news?id='+thCfg.countId+'#Intent;scheme=gamersky;package=com.gamersky;S.browser_fallback_url=http%3A%2F%2Fa.gamersky.com;end';
                    window.setTimeout(function () {
                        window.location.href = "http://a.gamersky.com/";
                    }, 2000);
                }
                function ios(){
                    var ifr = document.createElement("iframe");
                    /***打开app的协议***/
                    // ifr.src = 'gamersky://news?id='+thCfg.countId;
                    // ifr.style.display = "none";
                    // document.body.appendChild(ifr);
                    // console.log(thCfg.countId);
                    window.location = 'gamersky://news?id='+thCfg.countId;
                    window.setTimeout(function(){
                        document.body.removeChild(ifr);
                        window.location.href = "http://a.gamersky.com/";
                    },2000)
                }
                ios();
            });
        },
        init:function () {
            this.insertBtn();
        }
    };
    openAppJs.init();
})(jQuery);


