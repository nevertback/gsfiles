(function ($) {
	var wqj = {
        lowIe:function (tarVer) {
            var sbie = $.browser.msie,
                ver = parseInt($.browser.version);
            if(sbie === true && ver <= tarVer){
                return true;
            }
        },
        isSbie:function () {
            var sbie = $.browser.msie,
                ver = parseInt($.browser.version),ieWarning = '';
            ieWarning += '<div id="gs-warning-tips" style="display: none;font-size: 14px; height: 97px; width: 100%; border-bottom: #e22200 3px solid; position: fixed; text-align: center; left: 0px; z-index: 10000000; line-height: 100px; bottom: 0px; background-color: #262626"><img style="width: auto; vertical-align: auto; position: relative; display: inline; top: 2px" src="http://image.gamersky.com/webimg13/zhuanti/common/warning.png"> <span style="font-size: 18px; color: black;color: #e5e5e5;">&nbsp;您使用的浏览器版本过低，可能会影响到您浏览本页面，建议升级您的浏览器：&nbsp;&nbsp;</span> <a style="font-size: 18px; text-decoration: none; height: 60px; width: 180px; color: #fff; text-align: center; display: inline-block; line-height: 60px; background-color: #e22200" href="http://www.firefox.com.cn/" target="_balnk">火狐&nbsp;Firefox</a> </div>';
            ieWarning += '<div id="gs-warning-bg" style="height: 100%; width: 100%; position: fixed; left: 0px; filter: alpha(opacity=65); z-index: 99999; top: 0px; background-color: black; opacity: 0.65"></div>';
            ieWarning += '<div id="gs-warning-dialog" style="font-size: 14px; border-top: #e22200 3px solid; height: 190px; width: 400px; position: fixed; padding-bottom: 40px; padding-top: 40px; padding-left: 60px; left: 50%; margin: -132px 0px 0px -260px; z-index: 10000000; top: 50%; padding-right: 60px; background-color: #262626"><p style="font-size: 18px; color: black; line-height: 30px;color: #e5e5e5;">您使用的浏览器版本过低，可能会影响到您浏览本页面，建议升级您的浏览器：</p><a style="font-size: 18px; text-decoration: none; height: 60px; width: 180px; margin-top: 20px; color: #fff; text-align: center; display: inline-block; line-height: 60px; background-color: #e22200" href="http://www.firefox.com.cn/" target="_balnk">火狐&nbsp;Firefox</a>';
            ieWarning += '<p style="width: 100%; text-align: right"><img style="width: auto" alt="" src="http://image.gamersky.com/webimg15/logo/chang/160x53.png"></p><a style="font-size: 20px; text-decoration: none; height: 60px; width: 60px; right: -60px; position: absolute; font-weight: bolder; color: #fff; text-align: center; display: block; line-height: 60px; top: -3px; background-color: #e22200" onclick="document.getElementById(\'gs-warning-dialog\').style.display=\'none\';document.getElementById(\'gs-warning-bg\').style.display=\'none\';document.getElementById(\'gs-warning-tips\').style.display=\'block\'" href="javascript:void(0)">×</a></div>';
            if(sbie === true && ver < 9){
                $('body').append(ieWarning);
            }
        },
        parallax:function () {
            var scene = $('#scene')[0],parx;
            parx = new Parallax(scene,{
                selector: '.sceneParallax',
                hoverOnly:true
            });
        },
        cooperLogo:function () {
            var $logoCon = $('#cooperLogos');
            function createLi(dt) {
                var liDom = '';
                if(dt.url === ''){
                    liDom += '<li><a style="cursor: default;"><img src="'+dt.pic+'" alt="'+dt.name+'"></a></li>';
                }else{
                    liDom += '<li><a target="_blank" href="'+dt.url+'" title="'+dt.name+'"><img src="'+dt.pic+'" alt="'+dt.name+'"></a></li>';
                }                
                return liDom;
            }
            $.ajax({
                typeData:'Script',
                cache:true,
                url:'http://j.gamersky.com/zhuanti/wqj2017/coopers.js',//wqjYrCoopersData
                success:function () {
                    var backData = wqjYrCoopersData,ulDom = '';
                    $.each(backData,function (i,item) {
                        ulDom += createLi(item);
                    });
                    $logoCon.html(ulDom);
                }
            });
        },
        countDown:function () {
            var $time = $('#fromNowTime'),startTime = new Date(),timer_rt;
            startTime.setFullYear(2017, 11, 15);
            //调用设置年份
            startTime.setHours(20);
            //调用设置指定的时间的小时字段
            startTime.setMinutes(0);
            //调用设置指定时间的分钟字段
            startTime.setSeconds(0);
            //调用设置指定时间的秒钟字段
            startTime.setMilliseconds(0);
            //调用置指定时间的毫秒字段
            var EndTime=startTime.getTime();
            function backStnum(tar,ky) {
                var arr = (tar+'').split('');
                if(arr.length<2){
                    arr.unshift(0);
                }
                return arr[ky];
            }
            function GetRTime(){
                //定义方法
                var NowTime = new Date();
                //定义参数可返回当天的日期和时间
                var nMS = EndTime - NowTime.getTime();
                //定义参数 EndTime减去NowTime参数获得返回距 1970 年 1 月 1 日之间的毫秒数
                var nD = Math.floor(nMS/(1000 * 60 * 60 * 24));
                //定义参数 获得天数
                var nH = Math.floor(nMS/(1000*60*60)) % 24;
                //定义参数 获得小时
                var nM = Math.floor(nMS/(1000*60)) % 60;
                //定义参数 获得分钟
                var nS = Math.floor(nMS/1000) % 60;
                //定义参数 获得秒钟
                if (nMS < 0){
                    $('.time-wrap').html('<div class="started">已开始</div>');
                    clearInterval(timer_rt);
                }else{
                    $time.find('.time-d .place-t').removeClass().addClass('place-t nums num'+backStnum(nD,0));
                    $time.find('.time-d .place-s').removeClass().addClass('place-s nums num'+backStnum(nD,1));
                    $time.find('.time-h .place-t').removeClass().addClass('place-t nums num'+backStnum(nH,0));
                    $time.find('.time-h .place-s').removeClass().addClass('place-s nums num'+backStnum(nH,1));
                    $time.find('.time-m .place-t').removeClass().addClass('place-t nums num'+backStnum(nM,0));
                    $time.find('.time-m .place-s').removeClass().addClass('place-s nums num'+backStnum(nM,1));
                    $time.find('.time-s .place-t').removeClass().addClass('place-t nums num'+backStnum(nS,0));
                    $time.find('.time-s .place-s').removeClass().addClass('place-s nums num'+backStnum(nS,1));
                }
            }
            function startAnim() {
                var animTime,animCount = 0,randomNum = 0;
                function setFakeNum() {
                    animCount++;
                    if(animCount>9){
                        animCount = 0;
                    }
                    randomNum = Math.floor(Math.random()*10);
                    $time.find('.time-d .place-t').removeClass().addClass('place-t nums num'+animCount);
                    $time.find('.time-d .place-s').removeClass().addClass('place-s nums num'+randomNum);
                    $time.find('.time-h .place-t').removeClass().addClass('place-t nums num'+animCount);
                    $time.find('.time-h .place-s').removeClass().addClass('place-s nums num'+randomNum);
                    $time.find('.time-m .place-t').removeClass().addClass('place-t nums num'+animCount);
                    $time.find('.time-m .place-s').removeClass().addClass('place-s nums num'+randomNum);
                }
                animTime = setInterval(function () {
                    setFakeNum();
                },20);
                setTimeout(function () {
                    clearInterval(animTime);
                    animTime = setInterval(function () {
                        setFakeNum();
                    },50);
                },1500);
                setTimeout(function () {
                    clearInterval(animTime);
                    timer_rt = setInterval(GetRTime, 1000);
                    GetRTime();
                },2000);
            }
            startAnim();
        },
        prizeData:[
            {
                pid:0,
                tit:'年度最佳游戏',
                time:'2017.12.15-2018.1.11'
            },
            {
                pid:1,
                tit:'年度动作冒险游戏',
                time:'2017.12.15-12.21'
            },
            {
                pid:2,
                tit:'年度射击游戏',
                time:'2017.12.15-12.21'
            },
            {
                pid:3,
                tit:'年度角色扮演游戏',
                time:'2017.12.22-12.28'
            },
            {
                pid:4,
                tit:'年度独立游戏',
                time:'2017.12.22-12.28'
            },
            {
                pid:5,
                tit:'年度竞速游戏',
                time:'2017.12.15-12.21'
            },
            {
                pid:6,
                tit:'年度游戏男神女神',
                time:'2017.12.29-2018.1.4'
            },
            {
                pid:7,
                tit:'年度最佳手游',
                time:'2018.1.5-1.11'
            },
            {
                pid:8,
                tit:'年度虐心游戏',
                time:'2017.12.29-2018.1.4'
            },
            {
                pid:9,
                tit:'年度最佳网游',
                time:'2018.1.5-1.11'
            },
            {
                pid:10,
                tit:'年度大事件主播',
                time:'2017.12.29-2018.1.4'
            },
            {
                pid:11,
                tit:'年度失望游戏',
                time:'2017.12.22-12.28'
            },
            {
                pid:12,
                tit:'年度最期待手游',
                time:'2018.1.5-1.11'
            },
            {
                pid:13,
                tit:'年度最佳独立手游',
                time:'2018.1.5-1.11'
            },
            {
                pid:14,
                tit:'年度最期待网游',
                time:'2018.1.5-1.11'
            },
            {
                pid:15,
                tit:'年度网游最佳版本更新',
                time:'2018.1.5-1.11'
            }
        ],
        prizeList:function () {
            var $prize = $('#prizes'),priData = this.prizeData,ulDom = '';
            function createLi(dt) {
                var liDom = '';
                liDom += '<li><a>';
                liDom += '<i class="prizes-icon prizes-icon'+dt.pid+'"></i>';
                liDom += '<span><i class="tit">'+dt.tit+'</i>';
                liDom += '<i class="votetime"><b>投票时间</b><br>'+dt.time+'</i></span>';
                liDom += '</a></li>';
                return liDom;
            }
            $.each(priData,function (i,item) {
                ulDom += createLi(item);
            });
            $prize.html(ulDom);
        },
        pinFunc:function () {
            var pinDom = '<div class="pinned" id="myPin"><i></i></div>';
            $('body').append(pinDom);
            var $pin = $('#myPin');
            function setPin() {
                var winHeight = $(window).height(),s1Height = $('#section1').height()+$('#QZnav').height(),sclTop = ($(window).scrollTop() || $("body").scrollTop());
                if(sclTop > (s1Height - winHeight)){
                    $pin.hide();
                }else{
                    $pin.show();
                }
            }
            setPin();
            $(window).resize(setPin).scroll(setPin);
        },
        verifIpt:function (iptcon,cate) {
            var bValidate;
            if(cate === 'qq'){
                bValidate = RegExp(/^[1-9][0-9]{4,20}$/).test(iptcon);
            }else if(cate === 'telephone'){
                bValidate = RegExp(/^1\d{10}$/).test(iptcon);
            }else if(cate === 'email'){
                bValidate = RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(iptcon);
            }
            return bValidate;
        },
        cooperFunc:function () {
            var $form = $('#cpForm'),tobj = this;
            function placeholderSim() {
                $form.find('.cpIpt').each(function () {
                    var $this = $(this),
                        par = $this.closest('.cpIptPar'),
                        tipsText = $this.data('placeholder');
                    $('<div class="tips">'+tipsText+'</div>').insertBefore($this);
                    $this.on({
                        focus:function () {
                            par.find('.tips').addClass('cur');
                            par.removeClass('error');
                        },
                        blur:function () {
                            if($.trim($this.val()) === ''){
                                par.find('.tips').removeClass('cur');
                                $this.val('');
                            }
                        }
                    })
                })
            }
            function popCtrl() {
                $('#openCp').on('click',function () {
                    $('.cooperPop').addClass('cur');
                });
                $('.cooperPopClose').on('click',function () {
                    $('.cooperPop').removeClass('cur');
                });
            }
            function popSmt() {
                var $Company = $('#cpCompany'),
                    $Name = $('#cpName'),
                    $Job = $('#cpJob'),
                    $QQ = $('#cpQQ'),
                    $Phone = $('#cpPhone'),
                    $Email = $('#cpEmail');
                if (tobj.verifIpt($QQ.val(),'qq') === false) {
                    $QQ.closest('.cpIptPar').addClass('error');
                    alert("请输入有效的QQ号码！");
                    return;
                }
                if (tobj.verifIpt($Phone.val(),'telephone') === false) {
                    $Phone.closest('.cpIptPar').addClass('error');
                    alert("请输入有效的手机号码！");
                    return;
                }
                if (tobj.verifIpt($Email.val(),'email') === false) {
                    $Email.closest('.cpIptPar').addClass('error');
                    alert("请输入有效的邮箱！");
                    return;
                }

                var Ml = 'wqj2017',Folder = 'zhuanti/'+Ml+'/',fname = 'infos',
                    cookiefname = cookie(Ml);
                var CompanyTxt = $Company.val(),
                    NameTxt = $Name.val(),
                    JobTxt = $Job.val(),
                    QQTxt = $QQ.val(),
                    PhoneTxt = $Phone.val(),
                    EmailTxt = $Email.val();
                if (cookiefname !== null && cookiefname === PhoneTxt) {
                    alert("我们已收到您的申请信息");
                    return;
                }
                var content = "---公司名称：" + CompanyTxt + "---联系人姓名：" + NameTxt + "---职务：" + JobTxt + "---联系人QQ：" + QQTxt + "---联系人电话：" + PhoneTxt + "---联系人邮箱：" + EmailTxt + "---";
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://www3.gamersky.com:81/cfile.asp",
                    data: {
                        Submit: "Submit",
                        Folder:Folder,
                        Fname: fname,
                        Content: content
                    },
                    success: function(Jsons) {}
                });
                cookie(Ml, PhoneTxt, {
                    path: '/'
                });
                alert("提交完成！");

                $form.find('.tips').removeClass('cur');
                $form.find('.cpIpt').val('');
                $('.cooperPop').removeClass('cur');
            }
            popCtrl();
            placeholderSim();
            $('#cpSmt').on('click',function () {
                popSmt();
            });

        },
        init:function () {
            this.isSbie();
            this.prizeList();
            this.countDown();
            this.cooperLogo();
            this.cooperFunc();
            if(this.lowIe(8) !== true){
                this.pinFunc();
                this.parallax();
            }
        }
	};
    wqj.init();
})(jQuery);