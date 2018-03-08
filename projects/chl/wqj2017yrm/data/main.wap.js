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
        init:function(){
            this.countDown();
            this.cooperLogo();
        }
	};
    gs.init();
})(jQuery);