(function($){
    var $main = $('#main');
    var config={
        lid:21,
        prizeOffset:20,
        drawOpt:{
            loop:4,
            speed:20000
        },
        video:{
            start:'ztimages/head-start2.mp4',
            loop:'ztimages/head-loop6.mp4'
        },
        prizeList:[
            {lev:'三等奖',pic:'ztimages/pri-01.png',name:'海盗船键盘'},
            {lev:'三等奖',pic:'ztimages/pri-02.png',name:'圣罗兰唇膏礼盒'},
            {lev:'三等奖',pic:'ztimages/pri-03.png',name:'小米净化器PRO'},
            {lev:'三等奖',pic:'ztimages/pri-04.png',name:'健康基金'},
            {lev:'三等奖',pic:'ztimages/pri-05.png',name:'周大福金狗'},
            {lev:'三等奖',pic:'ztimages/pri-06.png',name:'SK Ⅱ'},
            {lev:'二等奖',pic:'ztimages/pri-07.png',name:'ipad mini4'},
            {lev:'二等奖',pic:'ztimages/pri-08.png',name:'美图T8'},
            {lev:'二等奖',pic:'ztimages/pri-09.png',name:'switch'},
            {lev:'二等奖',pic:'ztimages/pri-10.png',name:'PS4'},
            {lev:'一等奖',pic:'ztimages/pri-11.png',name:'iphone8 plus'},
            {lev:'一等奖',pic:'ztimages/pri-12.png',name:'Mac air'},
            {lev:'特等奖',pic:'ztimages/pri-13.png',name:'iphoneX'}
        ],
        headList:[
            {pic:'ztimages/head/1.png',name:'艾行'},
            {pic:'ztimages/head/2.png',name:'安培乐'},
            {pic:'ztimages/head/3.png',name:'曹艺菲'},
            {pic:'ztimages/head/4.png',name:'程琳'},
            {pic:'ztimages/head/5.png',name:'邓洋'},
            {pic:'ztimages/head/6.png',name:'董涵'},
            {pic:'ztimages/head/7.png',name:'董晶钰'},
            {pic:'ztimages/head/8.png',name:'樊浩男'},
            {pic:'ztimages/head/9.png',name:'樊尧杰'},
            {pic:'ztimages/head/10.png',name:'高笛'},
            {pic:'ztimages/head/11.png',name:'高强'},
            {pic:'ztimages/head/12.png',name:'高晓晖'},
            {pic:'ztimages/head/13.png',name:'高雅'},
            {pic:'ztimages/head/14.png',name:'高岩'},
            {pic:'ztimages/head/15.png',name:'桂天增'},
            {pic:'ztimages/head/16.png',name:'郭涵博'},
            {pic:'ztimages/head/17.png',name:'韩旭'},
            {pic:'ztimages/head/18.png',name:'何子汉'},
            {pic:'ztimages/head/19.png',name:'侯天舒'},
            {pic:'ztimages/head/20.png',name:'胡杰'},
            {pic:'ztimages/head/21.png',name:'胡俊峰'},
            {pic:'ztimages/head/22.png',name:'胡雪冰'},
            {pic:'ztimages/head/23.png',name:'黄玉龙'},
            {pic:'ztimages/head/24.png',name:'黄哲续'},
            {pic:'ztimages/head/25.png',name:'蒋璇'},
            {pic:'ztimages/head/26.png',name:'荆伟静'},
            {pic:'ztimages/head/27.png',name:'静志雄'},
            {pic:'ztimages/head/28.png',name:'寇苏鹏'},
            {pic:'ztimages/head/29.png',name:'李浩嘉'},
            {pic:'ztimages/head/30.png',name:'李冀垣'},
            {pic:'ztimages/head/31.png',name:'李明昊'},
            {pic:'ztimages/head/32.png',name:'李宁'},
            {pic:'ztimages/head/33.png',name:'李强'},
            {pic:'ztimages/head/34.png',name:'李然'},
            {pic:'ztimages/head/35.png',name:'李昕钇'},
            {pic:'ztimages/head/36.png',name:'李羿'},
            {pic:'ztimages/head/37.png',name:'李永富'},
            {pic:'ztimages/head/38.png',name:'李月瑶'},
            {pic:'ztimages/head/39.png',name:'李哲'},
            {pic:'ztimages/head/40.png',name:'梁健'},
            {pic:'ztimages/head/41.png',name:'梁乾'},
            {pic:'ztimages/head/42.png',name:'林春鹏'},
            {pic:'ztimages/head/43.png',name:'刘锦涛'},
            {pic:'ztimages/head/44.png',name:'刘玲'},
            {pic:'ztimages/head/45.png',name:'刘莎'},
            {pic:'ztimages/head/46.png',name:'刘宇翔'},
            {pic:'ztimages/head/47.png',name:'刘臻'},
            {pic:'ztimages/head/48.png',name:'陆浩'},
            {pic:'ztimages/head/49.png',name:'马越'},
            {pic:'ztimages/head/50.png',name:'聂德睿'},
            {pic:'ztimages/head/51.png',name:'宁朝如'},
            {pic:'ztimages/head/52.png',name:'乔文博'},
            {pic:'ztimages/head/53.png',name:'乔叶'},
            {pic:'ztimages/head/54.png',name:'任亚伟'},
            {pic:'ztimages/head/55.png',name:'桑思桐'},
            {pic:'ztimages/head/56.png',name:'史亚军'},
            {pic:'ztimages/head/57.png',name:'孙屹'},
            {pic:'ztimages/head/58.png',name:'孙中海'},
            {pic:'ztimages/head/59.png',name:'孙中原'},
            {pic:'ztimages/head/60.png',name:'田振宇'},
            {pic:'ztimages/head/61.png',name:'王敬尧'},
            {pic:'ztimages/head/62.png',name:'王茂才'},
            {pic:'ztimages/head/63.png',name:'王明水'},
            {pic:'ztimages/head/64.png',name:'王天宇'},
            {pic:'ztimages/head/65.png',name:'王增园'},
            {pic:'ztimages/head/66.png',name:'王震'},
            {pic:'ztimages/head/67.png',name:'仵莘'},
            {pic:'ztimages/head/68.png',name:'席皓'},
            {pic:'ztimages/head/69.png',name:'夏东杰'},
            {pic:'ztimages/head/70.png',name:'夏静'},
            {pic:'ztimages/head/71.png',name:'邢天宁'},
            {pic:'ztimages/head/72.png',name:'邢秀秀'},
            {pic:'ztimages/head/73.png',name:'徐云龙'},
            {pic:'ztimages/head/74.png',name:'杨保航'},
            {pic:'ztimages/head/75.png',name:'杨道亮'},
            {pic:'ztimages/head/76.png',name:'杨欣艺'},
            {pic:'ztimages/head/77.png',name:'杨延策'},
            {pic:'ztimages/head/78.png',name:'尤旺'},
            {pic:'ztimages/head/79.png',name:'于双艳'},
            {pic:'ztimages/head/80.png',name:'于思洋'},
            {pic:'ztimages/head/81.png',name:'张滨'},
            {pic:'ztimages/head/82.png',name:'张博'},
            {pic:'ztimages/head/83.png',name:'张昌祺'},
            {pic:'ztimages/head/84.png',name:'张崇慧'},
            {pic:'ztimages/head/85.png',name:'张迪杨'},
            {pic:'ztimages/head/86.png',name:'张靖'},
            {pic:'ztimages/head/87.png',name:'张磊'},
            {pic:'ztimages/head/88.png',name:'张权'},
            {pic:'ztimages/head/89.png',name:'张伟超'},
            {pic:'ztimages/head/90.png',name:'张欣'},
            {pic:'ztimages/head/91.png',name:'张煜杰'},
            {pic:'ztimages/head/92.png',name:'张志刚'},
            {pic:'ztimages/head/93.png',name:'赵赫'},
            {pic:'ztimages/head/94.png',name:'赵猛'},
            {pic:'ztimages/head/95.png',name:'赵楠'},
            {pic:'ztimages/head/96.png',name:'赵伟'},
            {pic:'ztimages/head/97.png',name:'赵扬扬'},
            {pic:'ztimages/head/98.png',name:'赵莹'},
            {pic:'ztimages/head/99.png',name:'赵玉卿'},
            {pic:'ztimages/head/100.png',name:'郑超逸'},
            {pic:'ztimages/head/101.png',name:'郑逸飞'},
            {pic:'ztimages/head/102.png',name:'周乐然'},
            {pic:'ztimages/head/103.png',name:'朱晓春'},
            {pic:'ztimages/head/104.png',name:'蔡康朔'},
            {pic:'ztimages/head/105.png',name:'宋金曼'},
            {pic:'ztimages/head/106.png',name:'王怿程'},
            {pic:'ztimages/head/107.png',name:'吴格非'},
            {pic:'ztimages/head/108.png',name:'吴昱聪'},
            {pic:'ztimages/head/109.png',name:'小萌'},
            {pic:'ztimages/head/110.png',name:'徐骐车'}
        ]
    };
    var gs = {
        setSize:function () {
            var baseWidth = 1920,baseHeight = 1080,$ww = $(window).width(),$wh = $(window).height(),rio;
            if($ww>$wh/9*16){
                rio = $wh/baseHeight;
            }else{
                rio = $ww/baseWidth;
            }
            $('#wrap').css('transform','scale('+rio+')');
        },
        //奖品
        addPrize:function (num) {
            var pgDom = '',pdt = config.prizeList[num];
            pgDom += '<div class="nh-prize">';
            pgDom += '<img class="bigpic" src="'+pdt.pic+'">';
            pgDom += '<div class="tit"><h4>'+pdt.lev+'</h4><h5>'+pdt.name+'</h5></div>';
            pgDom += '<a class="full-btn prizeBtn"></a>';
            pgDom += '</div>';
            $main.html(pgDom);
            $main.find('.prizeBtn').on('click',function () {
                gs.addDraw();
            });
        },
        //名单
        addList:function () {
            var pgDom = '',$list = $('#list');
            pgDom += '<div class="nh-list">';
            pgDom += '<div class="win-list winList"><ul>';
            pgDom += '</ul></div>';
            pgDom += '<a class="back closeList"></a></div>';
            $list.html(pgDom).addClass('cur');
            $('.logo').addClass('red');
            function getWinList() {
                var hddt = config.headList;
                var jsdata = {
                    jsondata:JSON2.stringify({
                        "action":"getwinningmessage","lotteryId": config.lid
                    })
                };
                $.ajax({
                    dataType:'jsonp',
                    url:'http://db5.gamersky.com/LotteryAjax.aspx',
                    data:jsdata,
                    success:function (bdata) {
                        var listDom = '',listDt,$winList = $list.find('.winList').find('ul'),len = $winList.find('li').length,winListDom = '';
                        if(bdata.status === 'ok'){
                            listDt = bdata.result;
                            for(var num = 0;num<13 + config.prizeOffset -listDt.length;num++){
                                listDom += '<li><div class="win-pic"></div><div class="win-name">虚位以待</div></li>';
                            }
                            $.each(listDt,function (i,item) {
                                var headPic;
                                $.each(hddt,function (j,jtem) {
                                    if(item.prizeName === jtem.name){
                                        headPic = jtem.pic;
                                    }
                                });
                                if(i<13 + config.prizeOffset && i > config.prizeOffset - 1){
                                    winListDom = '<li><div class="win-pic"><img src="'+headPic+'" alt="'+item.prizeName+'"></div><div class="win-name">'+item.prizeName+'</div></li>' + winListDom;
                                }
                            });
                            listDom += winListDom;
                            $winList.html(listDom);
                        }else{
                            for(var num2 = 0;num2<13;num2++){
                                listDom += '<li><div class="win-pic"></div><div class="win-name">虚位以待</div></li>';
                            }
                            $winList.html(listDom);
                        }
                    }
                });
            }
            getWinList();
            $list.find('.closeList').on('click',function () {
                $list.removeClass('cur');
                $('.logo').removeClass('red');
            })
        },
        //抽奖
        addDraw:function () {
            var pgDom = '',hdListDom = '',cfg = config,dtHead = cfg.headList,headLen = dtHead.length;
            $.each(dtHead,function (i,item) {
                hdListDom += '<div class="head-item headItem"><img src="'+item.pic+'" alt="'+item.name+'"></div>';
            });
            pgDom += '<div class="nh-draw">';
            pgDom += '<div class="drawAnimArea">';

            pgDom += '<div class="draw-head">';
            pgDom += '<img src="ztimages/def-head.png" alt="def" class="defPic">';
            pgDom += '<div class="videoArea">';
            pgDom += '<video class="animVd animVd1" id="animVd1" src="'+cfg.video.start+'" muted></video>';
            pgDom += '<video class="animVd animVd2" id="animVd2" src="'+cfg.video.loop+'" muted loop></video>';
            pgDom += '</div>';
            pgDom += '<div class="head-list headList">';
            for(var lp = 0;lp < cfg.drawOpt.loop;lp++){
                pgDom += hdListDom;
            }
            pgDom += '</div>';
            pgDom += '</div><div class="winner-name"></div>';

            pgDom += '</div>';

            pgDom += '<a class="full-btn headAnimBtn headAnimBtn1 cur"></a>';
            pgDom += '<a class="full-btn headAnimBtn headAnimBtn2"></a>';
            pgDom += '<a class="full-btn headAnimBtn headAnimBtn3"></a>';
            pgDom += '<a class="full-btn headNextBtn"></a>';
            pgDom += '</div>';
            $main.html(pgDom);
            var $list = $main.find('.headList'),
                itemHeight = $list.find('.headItem').eq(0).height() + 20,
                listHeight = $list.height() - itemHeight;
            function getDraw(lid) {
                var jsdata = {
                    jsondata: JSON2.stringify({"action":"sweepstakes","userId":0,"lotteryId": lid})
                };
                $.ajax({
                    dataType:'jsonp',
                    url:'http://db5.gamersky.com/LotteryAjax.aspx',
                    data:jsdata,
                    success:function (bdata) {
                        if(bdata.status === 'ok'){
                            var winName = bdata.result[0].prizeName,winLen;
                            console.log(bdata.result[0].prizeName);
                            $main.find('.winner-name').html(winName);
                            $.each(dtHead,function (i,item) {
                                if(item.name === winName){
                                    winLen = i;
                                }
                            });
                            $list.addClass('cur');
                            $list.slotMac({
                                loop:cfg.drawOpt.loop,
                                eachheight:itemHeight,
                                active:winLen,
                                speed:cfg.drawOpt.speed
                            });
                            setTimeout(function () {
                                $main.find('.drawAnimArea').addClass('cur');
                                $main.find('.headNextBtn').addClass('cur').on('click',function () {
                                    gs.initPrize();
                                });
                            },cfg.drawOpt.speed+200);
                        }else{
                            console.log(bdata.result);
                            getDraw(lid);
                        }
                    }
                });
            }
            $.fn.slotMac = function (options) {
                var $this = $(this),loopTimes = options.loop,eachHeight = options.eachheight;
                var stopIco = options.active,topDe;
                topDe = eachHeight*headLen*(loopTimes-1) + eachHeight*stopIco;
                $this.animate({'top':'-'+topDe+'px'},options.speed,'easeOutExpo');

            };
            var vd1 = $('#animVd1'),vd2 = $('#animVd2');
            $main.find('.headAnimBtn1').on('click',function () {
                $(this).remove();
                $main.find('.defPic').remove();
                vd1.addClass('cur');
                vd1[0].play();
                vd1[0].onended = function () {
                    $main.find('.headAnimBtn3').addClass('cur');
                    vd1.remove();
                    vd2.addClass('cur');
                    vd2[0].play();
                }
            });
            $main.find('.headAnimBtn3').on('click',function () {
                $(this).remove();
                getDraw(cfg.lid);
                setTimeout(function () {
                    vd2.remove();
                },500);
            });
        },
        initPrize:function () {
            var theObj = this;
            var jsdata = {
                jsondata:JSON2.stringify({
                    "action":"getwinningmessage","lotteryId": config.lid
                })
            };
            $.ajax({
                dataType:'jsonp',
                url:'http://db5.gamersky.com/LotteryAjax.aspx',
                data:jsdata,
                success:function (bdata) {
                    var initNum = 0;
                    if(bdata.status === 'ok'){
                        initNum = bdata.result.length - config.prizeOffset;
                    }
                    theObj.addPrize(initNum);
                }
            });
        },
        controls:function () {
            var theObj = this;
            theObj.initPrize();
            $('.showList').on('click',function () {
                theObj.addList();
            });
            $('.navNh').on('click',function () {
                theObj.initPrize();
            });
        },
        init:function () {
            var fun = gs;
            fun.controls();
            fun.setSize();
            $(window).resize(function () {
                fun.setSize();
            });
        }
    };
    gs.init();
})(jQuery);