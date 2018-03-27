/*
global $,yms,pageConfig,preLoadPicsLists,Swiper,fullScreen,bkDatas,mapData,armsData,abilitiesData,gearData,targetData
 */
var pageFunc = {
	loadingFunc:function(loadState){
		var ld = '',$body = $('body'),thisPage = this,loadData = pageConfig.pages.loading;
    	ld += '<div id="loading"></div><div id="loadingAnim"><img src="'+loadData.logo1+'" alt="" class="loadingAnim-img-g"><div class="loadingAnim-img"><img src="'+loadData.logo2+'"></div><div class="loadingtxt"></div></div>';
    	ld += '<div id="closeLoading" class="closeLoading">';

    	ld += '<div class="txt">';
    	ld += '<h5>圣父提醒您</h5>';
    	ld += '<img src="'+loadData.ld+'" alt="farcry5">';
    	ld += '<p>全屏体验更加，你可以按<i>F11</i><b>退出全屏</b>，也可以随时按<i>F11</i><b>恢复全屏</b></p>';
    	ld += '<p><span>为了更好的观看体验，请使用<i>IE10及以上</i>或其他浏览器浏览专题。</span></p>';
    	ld += '</div>';

    	ld += '<div class="clearfix btngroup"><a class="closeno">继续</a></div>';
    	ld += '</div>';
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
                $('.volbtn').addClass('cur');
                pageConfig.userMute = false;
                yms.bgmSet(pageConfig.bgm.start);
				thisPage.pgStart();
			});
    	}else{
            $('.volbtn').addClass('cur');
            /*pageConfig.userMute = false;
            yms.bgmSet(pageConfig.bgm.start);*/
            pageFlow.task205();
            //pageFunc.pgStart();
    	}
        yms.preLoadImg(preLoadPicsLists.list1);
	},
    pgStart:function () {
        var pageDom = '',dataOrigin = pageConfig.pages.pgStart;
        pageDom += '<div class="page_con pgStart">';
        pageDom += '<video id="startVd" class="page_bg" src="'+dataOrigin.video+'"></video>';
        pageDom += '<div id="startDelay" class="start-cells">';
        pageDom += '<img src="'+dataOrigin.slogan+'" alt="slogan" class="slogan">';
        pageDom += '<a class="btn-start btnGo"></a>';
        pageDom += '<a class="btn-info btnInfo"></a>';
        pageDom += '</div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var vd = document.getElementById('startVd'),delayTimer;
            vd.play();
            vd.onended = function (ev) {
                vd.currentTime = 2;
                vd.play();
            };
            var $delay = $('#startDelay');
            delayTimer = setTimeout(function () {
                $delay.addClass('cur');
            },2200);

            commonComponents.othersArea($delay);

            dgyMain.find('.btnGo').on('click',function(){
                clearTimeout(delayTimer);
                pageFunc.pgTransit(dataOrigin.transit.video,function () {
                    pageFunc.pgMenu();
                });
            });
            //yms.preLoadImg(preLoadPicsLists.list2);
        }
        yms.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgMenu:function(){
        var pageDom = '',btnDom = '',introDom = '',dataOrigin = pageConfig.pages.pgMenu;

        $.each(dataOrigin.nav,function (i,item) {
            var isCur = '',initCur = '';
            if(item.open === true){
                isCur = 'opened';
            }
            if(i === 0){
                initCur = 'cur';
            }
            btnDom += '<a class="btn-sel btnSel '+isCur+'" data-idx="'+i+'"><i class="icon"></i>'+item.name+'</a>';
            introDom += '<div class="task-intro taskIntro taskIntro'+i+' '+initCur+'"><img src="'+item.tro+'" alt="'+item.name+'"></div>';
        });

        pageDom += '<div class="page_con pgMenu">';
        pageDom += '<img src="'+dataOrigin.bg+'" alt="pics" class="page_bg">';
        pageDom += '<div class="task-intro-wrap">';
        pageDom += introDom;
        pageDom += '</div>';

        pageDom += '<div class="btn-group">';
        pageDom += '<h5 class="tit"><i class="icon"></i>剧情任务</h5>';
        pageDom += '<div class="navs">';
        pageDom += btnDom;
        pageDom += '</div>';
        pageDom += '<a class="btn-replay btnReplay">重新开始</a>';
        pageDom += '</div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            yms.bgmSet(pageConfig.bgm.start);
            function setState(idx) {
                dataOrigin.nav[idx].open = true;
            }
            commonComponents.tabs(dgyMain.find('.btnSel'),dgyMain.find('.taskIntro'));
            dgyMain.find('.btnSel').on('click',function(){
                var $ts = $(this),idx=$ts.data('idx');
                setState(idx);
                pageFlow['task'+(idx+1)]();
            });
            dgyMain.find('.btnReplay').on('click',function(){
                pageFunc.pgStart();
            });
        }
        yms.chagePage(function(){
            stateStore.fixedNavShow = true;
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgVersion:function(){
        var pageDom = '',dataOrigin = pageConfig.pages.pgVersion;
        pageDom += '<div class="page_con pgVersion">';
        pageDom += '<img src="'+dataOrigin.bg+'" alt="pics" class="page_bg">';
        pageDom += '<div class="tabs">';

        pageDom += '<div class="tabs-con tabsCon"></div>';
        pageDom += '<div class="clearfix tabs-nav">';
        $.each(dataOrigin.tabs,function (i,item) {
            pageDom += '<a class="tabsNavBtn" data-num="'+item.id+'"><span>'+item.name+'</span></a>';
        });
        pageDom += '</div>';

        pageDom += '</div>';
        pageDom += '<a class="btn-default btn-next btnNext">结束</a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var $con = dgyMain.find('.tabsCon');
            var setCon = {
                tab0:function (idx) {
                    var tabDom = '',dt = dataOrigin.tabs[idx];
                    tabDom += '<div class="tabs-con'+idx+'">';
                    tabDom += '<img src="'+dt.pic+'" alt="'+dt.name+'">';
                    $.each(dt.buy,function (i,item) {
                        tabDom += '<a class="btn-buy btn-buy'+i+'" target="_blank" href="'+item.url+'"></a>';
                    });
                    tabDom += '</div>';
                    $con.html(tabDom);
                },
                tab1:function (idx) {
                    var tabDom = '',dt = dataOrigin.tabs[idx];
                    tabDom += '<div class="tabs-con'+idx+'">';
                    tabDom += '<img class="st-bg" src="'+dt.pic+'" alt="'+dt.name+'">';
                    tabDom += '<div id="stSwp" class="swiper-container st-swp"><div class="swiper-wrapper">';
                    $.each(dt.swp,function (i,item) {
                        tabDom += '<div class="swiper-slide">';
                        tabDom += '<div class="st-video stVideo" id="stVideo'+i+'"></div>';
                        tabDom += '<a class="st-video-btn stVdBtn stVdBtn'+i+'" data-sk="'+i+'"><img src="'+item.video.poster+'" alt="'+item.name+'"></a>';
                        tabDom += '</div>';
                    });
                    tabDom += '</div></div>';
                    tabDom += '<div class="st-mask-top"></div>';
                    tabDom += '<div class="st-mask-bot"></div>';
                    tabDom += '</div>';
                    $con.html(tabDom);
                    var mySwiper = new Swiper('#stSwp',{
                        slidesPerView : 'auto',
                        centeredSlides : true,
                        mousewheel:true,
                        grabCursor : true
                    });
                    $con.find('.stVdBtn').on('click',function () {
                        var $ts = $(this),idx = $ts.data('sk'),tarVd = 'stVideo'+idx;
                        $con.find('.stVideo').html('');
                        $con.find('.stVdBtn').show();
                        $ts.hide();
                        mySwiper.slideTo(idx, 500, false);
                        commonComponents.player(tarVd,dt.swp[idx].video);
                    })
                },
                tab2:function (idx) {
                    var tabDom = '',dt = dataOrigin.tabs[idx];
                    tabDom += '<div class="tabs-con'+idx+'"><img src="'+dt.pic+'" alt=""></div>';
                    $con.html(tabDom);
                }
            };
            function chooseTab(num) {
                dgyMain.find('.tabsNavBtn').removeClass('cur').eq(num).addClass('cur');
                setCon['tab'+num](num);
            }
            dgyMain.find('.tabsNavBtn').on('click',function () {
                var $ts = $(this),idx = $ts.data('num');
                chooseTab(idx);
            });
            dgyMain.find('.btnNext').on('click',function(){
                pageFunc.pgEnd();
            });
            chooseTab(0);
        }
        yms.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgEnd:function(){
        var pageDom = '',dataOrigin = pageConfig.pages.pgEnd;
        pageDom += '<div class="page_con pgEnd">';
        pageDom += '<video src="'+dataOrigin.video+'" class="page_bg" autoplay loop></video>';
        pageDom += '<div class="tit"></div>';
        pageDom += '<div class="end-editor">'+dataOrigin.edit+'</div>';
        pageDom += '<div class="end-zan"></div>';
        pageDom += '<a target="_blank" href="'+gloCfg.url.channel+'" class="btn-default-big end-btn-back">往期回顾</a>';
        pageDom += '<a class="btn-default-big end-btn-comm btnComm">玩家评论</a>';
        pageDom += '<div class="end-bd"></div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnComm').on('click',function(){
                pageFunc.commPage();
            });
            var $zan = dgyMain.find('.end-zan'),$bd = dgyMain.find('.end-bd');
            commonComponents.othersArea($zan,{
                comm:false
            });
            commonComponents.baiduShare($bd,'end-baidu-icons');
        }
        yms.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
	pgDemo:function(){
        var pageDom = '',dataOrigin = pageConfig.pages.pgDemo;
        pageDom += '<div class="page_con pgDemo">';
        pageDom += '<img src="'+dataOrigin.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn-default btn-next btnNext"></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnNext').on('click',function(){
                pageFunc.commPage();
            });
        }
        yms.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
	},
	commPage:function(){
		var pageDom = '',dataOrigin = pageConfig.pages.pgComm;

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
		pageDom += '<img src="'+dataOrigin.bg+'" alt="replace" class="comm_bg">';
		pageDom += '<div class="comm hei"><div class="cont">';
		pageDom += '<div id="SOHUCS" sid="'+gloCfg.countid+'"></div>';
		pageDom += '</div></div>';
        pageDom += '<a class="closeComm btn-comm-close"></a>';
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
        dgyMain.find('.closeComm').on('click',function(){
            dgyMain.removeClass('cur');
            pageConfig.isCommOpen = false;
            $('.page_comm').off();
        });
	},
    pgTransit:function (vd,callback) {
        var pageDom = '';
        pageDom += '<div class="page_con pg-transit pgTransit">';
        pageDom += '<div class="pg-transit-video-wrap"><div id="videoTransit" class="pg-transit-video"></div></div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            commonComponents.player('videoTransit',vd,function () {
                if(typeof callback === 'function'){
                    callback();
                }
            });
        }
        yms.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });

    },
	render:function(){
		var pf = this;
		pf.loadingFunc(true);
		yms.fixedNav();
        bindGlobal.init();
	}
};
pageFunc.render();
