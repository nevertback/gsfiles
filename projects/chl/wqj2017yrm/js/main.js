(function ($) {
    var gs = {
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
                //url:'http://j.gamersky.com/zhuanti/wqj2017/coopers.js',//wqjYrCoopersData
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
        init:function(){
            this.countDown();
            this.cooperLogo();
            this.cooperFunc();
        }
    };
    gs.init();
})(jQuery);