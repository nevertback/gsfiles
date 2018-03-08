/*
global $,ymjsModel,pageConfig,preLoadPicsLists,Swiper,fullScreen,bkDatas,mapData,armsData,abilitiesData,gearData,targetData
 */
var pageFunc = {
    bindKey:function (key,callback) {
        var keyCodeNum = {
            a:65,
            b:66,
            c:67,
            d:68,
            e:69,
            f:70,
            g:71,
            h:72,
            i:73,
            j:74,
            k:75,
            l:76,
            m:77,
            n:78,
            o:79,
            p:80,
            q:81,
            r:82,
            s:83,
            t:84,
            u:85,
            v:86,
            w:87,
            x:88,
            y:89,
            z:90,
            space:32,
            tab:9,
            shift:16,
            k1:49,
            k2:50,
            k3:51,
            k4:52,
            k5:53,
            k6:54
        };
        if(key === 'ml'){
            $(document).on('click',function () {
                $(this).off();
                if(typeof callback === 'function'){
                    callback();
                }
            });

        }else if(key === 'mr'){
            $('.goonBtn').on('click',function () {
                $(this).off();
                if(typeof callback === 'function'){
                    callback();
                }
            });

        }else{
            $(document).on({
                'keydown':function (event) {
                    if(pageConfig.isCommOpen === false){
                        //event.preventDefault();
                        var e = event ? event : window.event;
                        var ekc = e.keyCode;
                        if(ekc === 97){
                            ekc = 49;
                        }else if(ekc === 98){
                            ekc = 50;
                        }else if(ekc === 99){
                            ekc = 51;
                        }else if(ekc === 100){
                            ekc = 52;
                        }else if(ekc === 101){
                            ekc = 53;
                        }else if(ekc === 102){
                            ekc = 54;
                        }
                        if(ekc === keyCodeNum[key]){
                            $(document).off();
                            if(typeof callback === 'function'){
                                callback();
                            }
                        }
                    }
                }
            });
        }

    },
    addLogos:function () {
        var logoDom = '',imgdata = pageConfig.imglist.begin;
        logoDom += '<a target="_blank" href="'+imgdata.gs+'" class="logo-gs"></a>';
        logoDom += '<a target="_blank" href="'+imgdata.gf+'" class="logo-gf"></a>';
        return logoDom;
    },
	loadingFunc:function(loadState){
		var ld = '',$body = $('body'),thisPage = this,loadData = pageConfig.imglist.loading;
    	ld += '<div id="loading"></div><div id="loadingAnim"><img src="'+loadData.logo1+'" alt="" class="loadingAnim-img-g"><div class="loadingAnim-img"><img src="'+loadData.logo2+'"></div><div class="loadingtxt"></div></div>';
    	ld += '<div id="closeLoading" class="closeLoading"><div class="txt">全屏浏览可获得最佳体验，ESC或F11可退出全屏模式。</div><div class="clearfix btngroup"><a class="closeno">继续</a></div></div>';
    	if(loadState===true){
    		$body.append(ld);
    		$body.jpreLoader({
				splashVPos: "0",
				splashID: "#loadingAnim",
				showSplash: true,
				loaderVPos: '0%',
				autoClose: true
			}, function() {
				$('#closeLoading').show();
			});
			$('#closeLoading').find('.closeno').on('click',function(){
				fullScreen();
				$('#loading').fadeOut(300);
				$('#closeLoading').fadeOut(300);
				thisPage.loadPage();
			});
    	}else{
            $('.volbtn').addClass('cur');
    		this.page04();
    	}
        ymjsModel.preLoadImg(preLoadPicsLists.list1);
	},
    loadPage:function(){
        var pageDom = '',imgdata = pageConfig.imglist.ldPage;
        pageDom += '<div class="page_con page_ldp">';
        pageDom += '<video src="'+imgdata.vd+'" id="beginVideoLoad" class="page_bg"></video>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var vd = dgyMain.find('#beginVideoLoad'),vdb = vd[0];
            vdb.play();
            vdb.onended =function(){
                $('.volbtn').addClass('cur');
                pageConfig.userMute = false;
                ymjsModel.bgmSet(pageConfig.bgm.start);
                pageFunc.beginPage();
            };
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
	beginPage:function(){
		var pageDom = '',imgdata = pageConfig.imglist.begin;
		pageDom += '<div class="page_con page_begin">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
		pageDom += pageFunc.addLogos();
        pageDom += ymjsModel.createBaiduShare('');
        pageDom += '<a class="zanbtn supportMe" data-itemid="'+pageConfig.countid+'" data-field="digg" data-table="PE_U_Article"><span>赞<i class="zanNum">0</i></span></a>';
		pageDom += '<a class="btn1"></a>';
		pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btn1').on('click',function(){
                pageFunc.transReGoPage('d16c5420f7',function () {
                    pageFunc.page04();
                });
            });
            $(".supportMe").supportMe();
            window._bd_share_main.init();
            //ymjsModel.preLoadImg(preLoadPicsLists.list2);
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
	},
    page04:function(){
        var pageDom = '',imgdata = pageConfig.imglist.page04;
        pageDom += '<div class="page_con page04">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += pageFunc.addLogos();
        pageDom += '<div class="para para1"><p>'+imgdata.para1+'</p></div>';
        pageDom += '<div class="para para2"><p>'+imgdata.para2+'</p></div>';
        pageDom += '<a class="btn_sty btn_sty2 btn1">游戏模式</a>';
        pageDom += '<a class="btn2" data-sty="video_tgs2" data-sid="v00140sr75v" data-w="800" data-h="452"></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btn1').on('click',function(){
                pageFunc.page05();
            });
            $('.btn2').gsPopup({
                afterOpen:function () {
                    pageConfig.isVideoPlaying = true;
                    ymjsModel.bgmPause();
                },
                afterClose:function () {
                    pageConfig.isVideoPlaying = false;
                    if(pageConfig.userMute !== true){
                        ymjsModel.bgmPlay();
                    }
                }
            });
            pageFunc.fixedNavFunc();
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    page05:function(){
        var pageDom = '',imgdata = pageConfig.imglist.page05;
        function ctSfqBox(dt,hasNav) {
            var boxDom = '';
            boxDom += '<div class="imt-con"><img class="ztTabLazyLoad" data-lzy="'+dt.pic+'" src="http://image.gamersky.com/webimg13/zhuanti/common/blank.png" alt="'+dt.tit+'"><i class="txt-mask"></i><div class="imt-txt"><div class="tit"><i class="icons '+dt.icon+'"></i>'+dt.tit+'</div><div class="para">'+dt.para+'</div></div></div>';
            if(hasNav === true){
                boxDom += '<a class="sfq-box-nav sfqNav"><img class="ztTabLazyLoad" src="http://image.gamersky.com/webimg13/zhuanti/common/blank.png" data-lzy="'+dt.nav+'" alt="'+dt.tit+'"><i></i></a>';
            }
            return boxDom;
        }
        pageDom += '<div class="page_con page05">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += pageFunc.addLogos();
        pageDom += '<div class="tabs">';
        pageDom += '<div class="tabsItems">';

        pageDom += '<div class="tabsItem">';
        pageDom += '<div class="clearfix sfq-boxs sfqBoxs">';
        pageDom += '<div class="sfq-box sfqBox cur">'+ctSfqBox(imgdata.tab[0][0],true)+'</div>';
        pageDom += '<div class="sfq-box sfqBox">'+ctSfqBox(imgdata.tab[0][1],true)+'</div>';
        pageDom += '<div class="sfq-box sfqBox">'+ctSfqBox(imgdata.tab[0][2],true)+'</div>';
        pageDom += '<div class="sfq-box sfqBox">'+ctSfqBox(imgdata.tab[0][3],true)+'</div>';
        pageDom += '<div class="sfq-box sfqBox">'+ctSfqBox(imgdata.tab[0][4],true)+'</div>';
        pageDom += '</div>';
        pageDom += '</div>';

        pageDom += '<div class="tabsItem">';
        pageDom += '<div class="clearfix sfq-boxs sfqBoxs">';
        pageDom += '<div class="sfq-box sfqBox cur">'+ctSfqBox(imgdata.tab[1][0],true)+'</div>';
        pageDom += '<div class="sfq-box sfqBox">'+ctSfqBox(imgdata.tab[1][1],true)+'</div>';
        pageDom += '<div class="sfq-box sfqBox">'+ctSfqBox(imgdata.tab[1][2],true)+'</div>';
        pageDom += '<div class="sfq-box sfqBox">'+ctSfqBox(imgdata.tab[1][3],true)+'</div>';
        pageDom += '<div class="sfq-box sfqBox">'+ctSfqBox(imgdata.tab[1][4],true)+'</div>';
        pageDom += '</div>';
        pageDom += '</div>';

        pageDom += '<div class="tabsItem"><div class="single">'+ctSfqBox(imgdata.tab[2])+'</div></div>';

        pageDom += '</div>';
        pageDom += '<div class="clearfix tabsNavs"><a class="tabsNav1"></a><a class="tabsNav2"></a><a class="tabsNav3"></a></div></div>';
        pageDom += '<a class="btn_sty btn_sty2 btn1">连杀技能</a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btn1').on('click',function(){
                pageFunc.page06();
            });
            var tabArr = {
                tab:dgyMain.find('.tabs'),
                nav:dgyMain.find('.tabsNavs'),
                items:dgyMain.find('.tabsItems'),
                item:dgyMain.find('.tabsItem')
            };
            pageFunc.tab(tabArr.tab,tabArr.nav,tabArr.items,tabArr.item,true);
            dgyMain.find('.sfqBoxs').each(function () {
                var $this = $(this);
                $this.find('.sfqNav').on('click',function () {
                    $this.find('.sfqBox').removeClass('cur');
                    $(this).closest('.sfqBox').addClass('cur');
                })
            });
            pageFunc.fixedNavFunc();
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    page06:function(){
        var pageDom = '',imgdata = pageConfig.imglist.page06,
            tabItemDom = '',tabNavDom ='';
        function ctItem(dt) {
            var itemDom = '';
            itemDom += '<div class="tabsItem">';
            itemDom += '<div class="txtwrap"><h4>'+dt.tit+'</h4><h5>'+dt.tip+'</h5><p>'+dt.des+'</p></div>';
            itemDom += '<img src="http://image.gamersky.com/webimg13/zhuanti/common/blank.png" data-lzy="'+dt.pic+'" alt="'+dt.tit+'" class="ztTabLazyLoad">';
            itemDom += '<a class="vdplay" data-sty="video_tgs2" data-sid="'+dt.vid+'" data-w="800" data-h="452"></a>';
            itemDom += '</div>';
            return itemDom;
        }
        function ctNav(dt) {
            var navDom = '';
            navDom += '<a><i class="tn'+dt.tid+'"></i><span>'+dt.tit+'</span></a>';
            return navDom;
        }
        $.each(imgdata.tab,function (i,item) {
            tabItemDom += ctItem(item);
            tabNavDom += ctNav(item);
        });
        pageDom += '<div class="page_con page06">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += pageFunc.addLogos();

        pageDom += '<div class="tabs lotTabs">';
        pageDom += '<div class="tabsItems">';
        pageDom += tabItemDom;
        pageDom += '</div>';
        pageDom += '<div class="clearfix tabsNavs">'+tabNavDom+'</div></div>';
        pageDom += '';
        pageDom += '<a class="btn_sty btn_sty2 btn1">武器装备</a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btn1').on('click',function(){
                pageFunc.page07();
            });
            var tabArr = {
                tab:dgyMain.find('.tabs'),
                nav:dgyMain.find('.tabsNavs'),
                items:dgyMain.find('.tabsItems'),
                item:dgyMain.find('.tabsItem')
            };
            pageFunc.tab(tabArr.tab,tabArr.nav,tabArr.items,tabArr.item,true);
            $('.vdplay').gsPopup({
                afterOpen:function () {
                    pageConfig.isVideoPlaying = true;
                    ymjsModel.bgmPause();
                },
                afterClose:function () {
                    pageConfig.isVideoPlaying = false;
                    if(pageConfig.userMute !== true){
                        ymjsModel.bgmPlay();
                    }
                }
            });
            pageFunc.fixedNavFunc();
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    page07:function(){
        var pageDom = '',imgdata = pageConfig.imglist.page07,
            tabItemDom = '',tabNavDom ='';
        function ctItem(dt) {
            var itemDom = '';
            itemDom += '<div class="tabsItem">';
            itemDom += '<div class="txtwrap"><h4>'+dt.tit+'</h4><p>'+dt.des+'</p></div>';
            itemDom += '<img src="http://image.gamersky.com/webimg13/zhuanti/common/blank.png" data-lzy="'+dt.pic+'" alt="'+dt.tit+'" class="ztTabLazyLoad">';
            itemDom += '</div>';
            return itemDom;
        }
        function ctNav(dt) {
            var navDom = '';
            navDom += '<a><i class="tn'+dt.tid+'"></i><span>'+dt.tit+'</span></a>';
            return navDom;
        }
        $.each(imgdata.tab,function (i,item) {
            tabItemDom += ctItem(item);
            tabNavDom += ctNav(item);
        });
        pageDom += '<div class="page_con page07">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += pageFunc.addLogos();

        pageDom += '<div class="tabs lotTabs">';
        pageDom += '<div class="tabsItems">';
        pageDom += tabItemDom;
        pageDom += '</div>';
        pageDom += '<div class="clearfix tabsNavs">'+tabNavDom+'</div></div>';

        pageDom += '<a target="_blank" href="'+imgdata.moreUrl+'" class="infosMore"></a><a class="btn_sty btn_sty2 btn1">经典地图</a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btn1').on('click',function(){
                pageFunc.p360Page();
            });
            var tabArr = {
                tab:dgyMain.find('.tabs'),
                nav:dgyMain.find('.tabsNavs'),
                items:dgyMain.find('.tabsItems'),
                item:dgyMain.find('.tabsItem')
            };
            pageFunc.tab(tabArr.tab,tabArr.nav,tabArr.items,tabArr.item,true);
            pageFunc.fixedNavFunc();
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    p360Page:function () {
        var pageDom = '',imgdata = pageConfig.imglist.p360;
        pageDom += '<div class="page_con page_p360 p360Page">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += '<div class="fake_load"><i></i></div>';
        pageDom += '<div class="btn btn_load cur">Loading...</div>';
        pageDom += '<a class="btn_sty btn_sty2 btn_go">进入全景地图</a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain'),timerStart,timerEnd;
        function thisFunc(){
            timerStart = setTimeout(function () {
                dgyMain.find('.fake_load').addClass('cur');
            },1000);
            timerEnd = setTimeout(function () {
                dgyMain.find('.btn_load').removeClass('cur');
                dgyMain.find('.btn_go').addClass('cur');
            },3100);
            dgyMain.find('.btn_go').on('click',function () {
                pageConfig.isVideoPlaying = true;
                ymjsModel.bgmPause();
                var iframeDom = '';
                iframeDom += '<div id="p360iframe" class="p360_iframe"><iframe src="'+imgdata.url+'" frameborder="0"></iframe><a class="p360_iframe_close"></a></div>';
                $('body').append(iframeDom);
                $('.p360_iframe_close').on('click',function () {
                    pageFunc.vdEndPage();
                    setTimeout(function () {
                        $('#p360iframe').fadeOut(500);
                    },250);
                    setTimeout(function () {
                        $('#p360iframe').remove();
                    },1000);
                    $(this).off();
                });
            });
            pageFunc.fixedNavFunc();
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    vdEndPage:function(){
        var pageDom = '',imgdata = pageConfig.imglist.vdend;
        pageDom += '<div class="page_con page_vdend">';
        pageDom += '<video src="'+imgdata.vd2+'" id="vd2" class="bg-vd" preload="auto"></video>';
        pageDom += '<div class="vd-notice vd-notice-w cur"><div class="txt">按 <b>W</b> 键前进</div></div>';
        pageDom += '<div class="vd-notice vd-notice-shift"><div class="txt">按 <b>Shift</b> 键冲刺</div></div>';
        pageDom += '<div class="vd-notice vd-notice-ml"><div class="txt">按 <b>左键</b> 射击敌人</div><i class="ml-icon"></i></div>';
        pageDom += '<div class="vd-notice vd-notice-mr"><div class="txt">按 <b>右键</b> 打开机瞄，可精准射杀敌人</div><a class="btn_sty btn_sty2 btns goonBtn">继续</a></div>';
        pageDom += '<div class="vd-notice vd-notice-r"><div class="txt"><b>糟糕，没子弹了！</b>按 <b>R</b> 键更换弹夹</div></div>';
        pageDom += '<div class="vd-notice vd-notice-space"><div class="txt">按 <b>空格</b> 键跳过障碍物</div></div>';
        pageDom += '<div class="vd-notice vd-notice-k5"><div class="txt">按 <b>5键</b> 使用连杀技能 <b>空对地导弹</b></div></div>';
        pageDom += '<div class="vd-notice vd-notice-end"><a class="btns btn_sty btn_sty2 btn-again">在玩一次</a><a class="btns btn_sty btn_sty2 btn-go">体验更多</a></div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            $('.volbtn').removeClass('cur');
            pageConfig.isVideoPlaying = true;
            ymjsModel.bgmPause();
            var vdControl = {
                vdPart1:function () {
                    var thisVideo = document.getElementById('vd2'),
                        vdLook;

                    function updateTimeFunc(endtime,callback){
                        thisVideo.play();
                        vdLook = setInterval(function(){
                            var vct = thisVideo.currentTime;
                            if(vct>=endtime){
                                if(typeof callback === 'function'){
                                    callback();
                                }
                                clearInterval(vdLook);
                            }
                        },1);
                    }
                    var keyFramesArr = [
                        [1.5,'shift'],
                        [5.7,'ml'],
                        [15,'ml'],
                        [16.2,'mr'],
                        [18.3,'r'],
                        [22.4,'space'],
                        [24.1,'ml'],
                        [29.7,'ml'],
                        [36.1,'mr'],
                        [39,'ml'],
                        [41,'k5']
                    ],initKey = 0;
                    function keyEventBind(thkey,callback) {
                        function triEvent() {
                            dgyMain.find('.vd-notice').removeClass('cur');
                            if(typeof callback === 'function'){
                                callback();
                                if(initKey < keyFramesArr.length){
                                    keyEventBind(initKey,function () {
                                        initKey++;
                                    });
                                }else{
                                    thisVideo.play();
                                }
                            }
                        }
                        updateTimeFunc(keyFramesArr[thkey][0],function () {
                            thisVideo.pause();
                            dgyMain.find('.vd-notice-'+keyFramesArr[thkey][1]).addClass('cur');
                            pageFunc.bindKey(keyFramesArr[thkey][1],function () {
                                triEvent();
                            });
                        });
                    }
                    keyEventBind(initKey,function () {
                        initKey++;
                    });

                    thisVideo.onended = function () {
                        dgyMain.find('.vd-notice-end').addClass('cur');
                    };
                },
                init:function () {
                    pageConfig.isVideoPlaying = true;
                    ymjsModel.bgmPause();
                    var vcl = this;
                    pageFunc.bindKey('w',function () {
                        dgyMain.find('.vd-notice-w').removeClass('cur');
                        vcl.vdPart1();
                    });
                }
            };
            vdControl.init();
            dgyMain.find('.btn-again').on('click',function(){
                pageFunc.vdEndPage();
            });
            dgyMain.find('.btn-go').on('click',function(){
                pageConfig.isVideoPlaying = false;
                if(pageConfig.userMute !== true){
                    ymjsModel.bgmPlay();
                }
                pageFunc.endPage();
                $('.volbtn').addClass('cur');
            });
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    endPage:function(){
        var pageDom = '',imgdata = pageConfig.imglist.end,begindata = pageConfig.imglist.begin;

        pageDom += '<div class="page_con page_end endPage">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a target="_blank" href="'+begindata.gs+'" class="logo-gs"></a>';
        pageDom += '<a target="_blank" href="'+begindata.gf+'" class="logo-gf"></a>';
        pageDom += '<div class="infos">';
        pageDom += '<p>'+imgdata.para+'</p>';
        pageDom += ymjsModel.createBaiduShare('');
        pageDom += '<div class="clearfix btngroup"><a target="_blank" href="'+begindata.gf+'" class="btn btn_gf"></a><a target="_blank" href="'+imgdata.urlZq+'" class="btn btn_zq"></a><a class="btn btn_dn" target="_blank" href="'+imgdata.urlDn+'"></a><a class="btn btn_comm"></a></div>';
        pageDom += '<a class="zanbtn supportMe" data-itemid="'+pageConfig.countid+'" data-field="digg" data-table="PE_U_Article"><i class="ico_zan"></i><span><i class="zanNum">0</i></span></a>';
        pageDom += '</div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btn_comm').on('click',function () {
                pageFunc.commPage();
            });
            $(".supportMe").supportMe();
            window._bd_share_main.init();
            pageFunc.fixedNavFunc();
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
	commPage:function(){
		var pageDom = '',imgdata = pageConfig.imglist.comm;

		function commentAdd(){
			var doc = document,
				s = doc.createElement('script'),
				h = doc.getElementsByTagName('head')[0] || doc.head || doc.documentElement;
			s.type = 'text/javascript';
			s.charset = 'utf-8';
			s.src = 'http://j.gamersky.com/web2015/comment/js/commentconfig.js';
			h.insertBefore(s, h.firstChild);
			window.SCS_NO_IFRAME = true;
		}

		pageDom += '<div class="page_con page_comm">';
		pageDom += '<img src="'+imgdata.bg+'" alt="replace" class="comm_bg">';
        pageDom += '<img src="'+imgdata.rw+'" alt="replace" class="comm_bg_rw">';
		pageDom += '<div class="comm hei"><div class="cont"><div class="tit"></div>';
		pageDom += '<div id="SOHUCS" sid="'+pageConfig.countid+'"></div>';
		pageDom += '</div></div>';
		pageDom += '<a class="btn_close"><span>返回</span></a>';
		pageDom += '</div>';

		var dgyMain = $('#dgyComm');
        pageConfig.isCommOpen = true;
		if(pageConfig.addedComment === false){
			dgyMain.addClass('cur').html(pageDom);
			commentAdd();
			pageConfig.addedComment = true;
		}else{
			dgyMain.addClass('cur');
            $("#SOHUCS").GetComment();
		}
		$('.page_comm').on('click','.cmt-commentbtn',function () {
            dgyMain.find('.comm').animate({scrollTop:0},200);
        });
        dgyMain.find('.btn_close').on('click',function(){
            dgyMain.removeClass('cur');
            pageConfig.isCommOpen = false;
            $('.page_comm').off();
        });
	},
    transReGoPage:function(transVu,callback1){
        var pageDom = '';

        pageDom += '<div class="page_con page_trans">';
        pageDom += '<div class="letvwrap"><embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high" align="middle" allowScriptAccess="always" width="100%" height="100%" flashvars="uu=cfd9191aeb&vu='+transVu+'&pu=667b454198&auto_play=1&gpcflag=1&width=1920&height=1080&lang=zh_CN" type="application/x-shockwave-flash"></embed></div>';
        if(callback1){
            pageDom += '<div class="gdvd_btn gdvd_loding"></div><a class="btns_go btn_sty btn_sty2">继续</a>';
        }
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            pageConfig.isVideoPlaying = true;
            ymjsModel.bgmPause();
            if(callback1){
                dgyMain.find('.btns_go').on('click',function(){
                    pageConfig.isVideoPlaying = false;
                    if(pageConfig.userMute !== true){
                        ymjsModel.bgmPlay();
                    }
                    callback1();
                });
            }
            setTimeout(function () {
                dgyMain.find('.gdvd_loding').addClass('cur');
            },100);
            setTimeout(function () {
                dgyMain.find('.gdvd_loding').remove();
                dgyMain.find('.btns_go').addClass('cur');
            },10000);
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    tab:function (tar,nav,cons,con,isLazyLoad) {
        var $nav = tar.find(nav).find('a'),$con = tar.find(cons),tabTimer;
        $nav.on({
            'mouseover':function () {
                var $this = $(this),idx = $this.index();
                tabTimer = setTimeout(function () {
                    $nav.removeClass('cur');
                    $con.find(con).removeClass('cur');
                    if(isLazyLoad === true){
                        $con.find(con).eq(idx).find('.ztTabLazyLoad').each(function () {
                            $(this).attr('src',$(this).data('lzy'));
                        });
                    }
                    $this.addClass('cur');
                    $con.find(con).eq(idx).addClass('cur');
                },150);
            },
            'mouseout':function () {
                clearTimeout(tabTimer);
            }
        });
        function tabInit() {
            var fstCon = $con.find(con).eq(0);
            $nav.eq(0).addClass('cur');
            if(isLazyLoad === true){
                fstCon.find('.ztTabLazyLoad').each(function () {
                    $(this).attr('src',$(this).data('lzy'));
                });
            }
            fstCon.addClass('cur');
        }
        tabInit();
    },
    fixedNav:function(){
        var fixNavDom = '';
        fixNavDom += '<div class="fx_list">';
        fixNavDom += '<a class="fixBtn" data-pg="beginPage"><i></i><span>TOP</span></a>';
        fixNavDom += '<a class="fixBtn" data-pg="page04"><i></i><span>游戏简介</span></a>';
        fixNavDom += '<a class="fixBtn" data-pg="page05"><i></i><span>游戏模式</span></a>';
        fixNavDom += '<a class="fixBtn" data-pg="page06"><i></i><span>连杀技能</span></a>';
        fixNavDom += '<a class="fixBtn" data-pg="page07"><i></i><span>武器装备</span></a>';
        fixNavDom += '<a class="fixBtn" data-pg="p360Page"><i></i><span>经典地图</span></a>';
        fixNavDom += '<a class="fixBtn" data-pg="vdEndPage"><i></i><span>体验游戏</span></a>';
        fixNavDom += '<a class="fixBtn" data-pg="endPage"><i></i><span>立即下载</span></a>';
        fixNavDom += '<a class="fixBtn_comm"><i></i><span>玩家评论</span></a>';
        fixNavDom += '</div>';

        var fixNav = $('#fixNav');
        fixNav.html(fixNavDom);
        fixNav.on({
            'mouseover':function () {
                $(this).addClass('hover');
            },
            'mouseout':function () {
                $(this).removeClass('hover');
            }
        });
        fixNav.on('click','.enClk',function () {
            var sel = $(this).data('pg');
            pageFunc[sel]();
        });
        fixNav.find('.fixBtn_comm').on('click',function () {
            pageFunc.commPage();
        });
    },
    fixedNavFunc:function () {
        var fixNav = $('#fixNav'),dm = $('#dgyMain');
        fixNav.addClass('cur');
        fixNav.find('.fixBtn').each(function () {
            var $this = $(this),num = $this.data('pg');
            if(dm.find('.'+num).length>0){
                fixNav.find('.fixBtn').removeClass('cur').addClass('enClk');
                $this.removeClass('enClk').addClass('cur');
            }else{
                $this.addClass('enClk');
            }
        });
    },
	render:function(){
		var pf = this;
		pf.loadingFunc(true);
        pf.fixedNav();
	}
};
pageFunc.render();
