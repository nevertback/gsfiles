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
    },
    openMenu:function (backer) {
        pageFunc.bindKey('q',function () {
            pageFunc.pMenuPage(backer);
        });
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
                $('.volbtn').addClass('cur');
                pageConfig.userMute = false;
                ymjsModel.bgmSet(pageConfig.bgm.start);
				thisPage.beginPage();
			});
    	}else{
            $('.volbtn').addClass('cur');
    		this.beginPage();
    	}
        ymjsModel.preLoadImg(preLoadPicsLists.list1);
	},
	beginPage:function(){
		var pageDom = '',imgdata = pageConfig.imglist.begin;
		pageDom += '<div class="page_con page_begin">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
		pageDom += '<a target="_blank" href="'+imgdata.dgy+'" class="logo_dgy"></a>';
        pageDom += '<a class="zanbtn supportMe" data-itemid="'+pageConfig.countid+'" data-field="digg" data-table="PE_U_Article"><i class="ico_zan"></i><span><i class="zanNum">0</i>人赞过</span></a>';
		pageDom += '<a class="btn1"></a>';
		pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btn1').on('click',function(){
                pageFunc.startPage();
            });
            $(".supportMe").supportMe();
            //ymjsModel.preLoadImg(preLoadPicsLists.list2);
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
	},
    startPage:function(){
        var pageDom = '',imgdata = pageConfig.imglist.start;
        pageDom += '<div class="page_con page_start">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn_sty btn_sty3 btn1">开始游戏</a>';
        pageDom += '<a class="btn_sty btn_sty3 btn2">选项</a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btn1').on('click',function(){
                pageFunc.pdiffPage();
            });
            dgyMain.find('.btn2').on('click',function(){
                pageFunc.psetPage();
            });
            ymjsModel.preLoadImg(preLoadPicsLists.list2);
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    endPage:function(){
        var pageDom = '',imgdata = pageConfig.imglist.end;

        pageDom += '<div class="page_con page_end">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += '<div class="infos">';
        pageDom += '<a target="_blank" href="'+pageConfig.imglist.begin.dgy+'" class="logo_dgy"></a>';
        pageDom += '<p>内容：FoxJR、天增弟弟， 视觉：Mrrr.Tian、ONE像素</p>';
        pageDom += '<a class="zanbtn supportMe" data-itemid="'+pageConfig.countid+'" data-field="digg" data-table="PE_U_Article"><i class="ico_zan"></i><span><i class="zanNum">0</i>人赞过</span></a>';
        pageDom += '<div class="clearfix btngroup"><a class="btn btn_comm">网友评论</a><a class="btn btn_wq" target="_blank" href="'+pageConfig.imglist.begin.dgy+'">往期回顾</a></div>';
        pageDom += ymjsModel.createBaiduShare('');
        pageDom += '</div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            pageFunc.openMenu('endPage');
            dgyMain.find('.btn_comm').on('click',function () {
                pageFunc.commPage();
            });
            //pageFunc.fixedNavFunc();
            $(".supportMe").supportMe();
            window._bd_share_main.init();
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pdiffPage:function(){
        var pageDom = '',imgdata = pageConfig.imglist.pdiff;
        pageDom += '<div class="page_con page_pdiff">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn_sty btn_sty3 btn btn1"><img src="'+imgdata.pics[0]+'" alt="pic"></a>';
        pageDom += '<a class="btn_sty btn_sty3 btn btn2"><img src="'+imgdata.pics[1]+'" alt="pic"></a>';
        pageDom += '<a class="btn_sty btn_sty3 btn btn3"><img src="'+imgdata.pics[2]+'" alt="pic"></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btn').on('click',function(){
                pageFunc.pRwPage();
            });
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
		pageDom += '<a class="btn_close btn_sty btn_sty_back"><span>返回</span></a>';
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
        //pageDom += '<div class="letvwrap"><embed name="cloudPlayer14752225505680" src="http://yuntv.letv.com/bcloud.swf" pluginspage="http://www.macromedia.com/go/getflashplayer" type="application/x-shockwave-flash" width="100%" height="100%" bgcolor="#000000" allowscriptaccess="always" wmode="Opaque" align="middle" quality="high" allowfullscreen="true" version="10" flashvars="uu=cfd9191aeb&amp;vu='+transVu+'&amp;pu=5fc1442b70&amp;auto_play=1&amp;gpcflag=1&amp;lang=zh_CN&amp;skinnable=0&amp;panoType=1&amp;"></div>';
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
            },6000);
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    fixedNav:function(){
        var fixNavDom = '';
        fixNavDom += '<div class="fx_list">';
        fixNavDom += '<a class="fixBtn fixBtn_rw" data-pg="Rw"><i></i><span>角色</span></a>';
        fixNavDom += '<a class="fixBtn fixBtn_S1" data-pg="s1"><i></i><span>任务1</span></a>';
        fixNavDom += '<a class="fixBtn fixBtn_s201" data-pg="s201"><i></i><span>任务2</span></a>';
        fixNavDom += '<a class="fixBtn fixBtn_Pz" data-pg="Pz"><i></i><span>配置</span></a>';
        fixNavDom += '<a class="fixBtn_comm"><i></i><span>评论</span></a>';
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
            pageFunc['p'+sel+'Page']();
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
            // if(dm.find('.page_p'+num).length>0){
            //     $this.removeClass('enClk').addClass('cur');
            // }else{
            //     $this.removeClass('cur').addClass('enClk');
            // }
            if(dm.find('.page_p'+num).length>0){
                fixNav.find('.fixBtn').removeClass('cur').addClass('enClk');
                $this.removeClass('enClk').addClass('cur');
            }else{
                $this.addClass('enClk');
            }
        });
    },
	render:function(){
		var pf = this;
		pf.loadingFunc(false);
        pf.fixedNav();
	}
};
pageFunc.render();
