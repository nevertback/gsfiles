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
    getLetv:function (vu,tar,width,height) {
        var player = new CloudVodPlayer();
        player.init({
            "pu":"96f01af2a7",
            "uu":"cfd9191aeb",
            "vu":vu,
            "auto_play":0,
            "gpcflag":1,
            "width":width,
            "height":height,
            "lang":"zh_CN"
        },tar);
    },
    playLetv:function (vu,tar,width,height) {
        var player = new CloudVodPlayer();
        player.init({
            "pu":"96f01af2a7",
            "uu":"cfd9191aeb",
            "vu":vu,
            "auto_play":1,
            "gpcflag":1,
            "width":width,
            "height":height,
            "lang":"zh_CN"
        },tar);
    },
    getYKpic:function (vu,callback) {
        $.ajax({
            dataType:'json',
            url:'https://api.youku.com/videos/show.json',
            data:{client_id:'6bfe5b183f11e7d9',video_id:vu},
            success:function (data) {
                var vdImg = data.bigThumbnail;
                if(typeof callback === 'function'){
                    callback&&callback(vdImg);
                }
            }
        });
    },
    playYK:function (vu,cid) {
        var player = new YKU.Player(cid,{
            styleid: '0',
            client_id: '6bfe5b183f11e7d9',
            vid: vu,
            newPlayer: true,
            autoplay: true
        });
    },
    addIntro:function (dt) {
        var pageDom = '';
        pageDom += '<div class="pg-intro"><div class="pg-intro-t"></div><div class="pg-intro-m">';
        pageDom += '<div class="pg-intro-tit">'+dt.tit+'</div>';
        pageDom += '<div class="pg-intro-des">'+dt.des+'</div>';
        pageDom += '</div><div class="pg-intro-b"></div></div>';
        return pageDom;
    },
    addIntroVideo:function (tit,des) {
        var pageDom = '';
        pageDom += '<div class="pg-intro pg-intro-video">';
        pageDom += '<div class="pg-intro-tit">'+tit+'</div>';
        pageDom += '<div class="pg-intro-des">'+des+'</div>';
        pageDom += '</div>';
        return pageDom;
    },
	loadingFunc:function(loadState){
		var ld = '',$body = $('body'),thisPage = this,loadData = pageConfig.imglist.loading;
    	ld += '<div id="loading"></div><div id="loadingAnim"><img src="'+loadData.logo1+'" alt="" class="loadingAnim-img-g"><div class="loadingAnim-img"><img src="'+loadData.logo2+'"></div><div class="loadingtxt"></div></div>';
    	ld += '<div id="closeLoading" class="closeLoading"><div class="txt"></div><div class="clearfix btngroup"><a class="closeno">继续</a></div></div>';
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
                pageConfig.isFixedNav = true;
				thisPage.pgBegin();
			});
    	}else{
            $('.volbtn').addClass('cur');
    		this.pgMap();
    	}
        ymjsModel.preLoadImg(preLoadPicsLists.list1);
	},
    loadPage:function(){
        var pageDom = '',imgdata = pageConfig.imglist.ldPage;
        pageDom += '<div class="page_con page_ldp">';
        pageDom += '<video src="'+imgdata.vd+'" id="beginVideoLoad" class="page_bg" muted></video>';
        pageDom += '<a class="btn-skip btnSkip"><i></i><span>跳过</span></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var vd = dgyMain.find('#beginVideoLoad'),vdb = vd[0];
            vdb.play();
            vdb.onended =function(){
                pageConfig.isFixedNav = true;
                pageFunc.pgStarBase();
            };
            dgyMain.find('.btnSkip').on('click',function(){
                pageConfig.isFixedNav = true;
                pageFunc.pgStarBase();
            });
        }
        ymjsModel.chagePage(function(){
            pageConfig.isFixedNav = false;
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    showHDbook:function (tar,def,navclk) {
        var hdDom = '',hdData = pageConfig.imglist.hd;
        hdDom += '<div class="hdb-bg hdbMain">';
        hdDom += '<div class="hdb-con"></div>';
        hdDom += '<div class="hdbNav">';
        hdDom += '<a class="hdbClose">关闭</a>';
        hdDom += '<div class="hdbNavBtns">';
        hdDom += '<a class="hdbNavBtn" data-sel="map" data-init="0">地图</a>';
        hdDom += '<a class="hdbNavBtn" data-sel="weapon" data-init="0">武器</a>';
        hdDom += '<a class="hdbNavBtn" data-sel="monster" data-init="0">魔物</a>';
        hdDom += '<a class="hdbNavBtn" data-sel="other" data-init="0">基地</a>';
        hdDom += '<a class="hdbNavBtn" data-sel="npc" data-init="0">NPC</a>';
        hdDom += '</div></div>';
        if(navclk === false){
            hdDom += '<a class="btn_sty btn_sty1 btnPick hdbClose">确认选择</a>';
        }
        hdDom += '</div>';
        tar.append(hdDom);
        pageConfig.isVideoPlaying = true;
        ymjsModel.bgmPause();
        $('#handBookBtn').removeClass('cur');
        setTimeout(function () {
            tar.find('.hdbMain').addClass('cur');
        },50);
        tar.find('.hdbClose').on('click',function () {
            $('#handBookBtn').addClass('cur');
            if($(this).hasClass('btnPick')){
                pageState.choiceWp = true;
                tar.find('.btn-pick').find('span').html('更换武器');
            }
            tar.find('.hdbMain').removeClass('cur');
            setTimeout(function () {
                tar.find('.hdbMain').remove();
                pageConfig.isVideoPlaying = false;
                if(pageConfig.userMute !== true){
                    ymjsModel.bgmPlay();
                }
            },250);
        });

        function mostInsert(dt,numl,numr) {
            var inDom = '';
            inDom += '<div class="hd-list-most hd-list-most-left"><div class="hdlm-media">';
            if(typeof dt[numl].vd !== 'undefined'){
                inDom += '<div id="letv-vd-left" class="letv-area" data-vu="';
                inDom += dt[numl].vd;
                inDom += '"></div>';
            }else{
                inDom += '<img src="';
                inDom += dt[numl].pic;
                inDom += '" alt="';
                inDom += dt[numl].tit;
                inDom += '">';
            }
            inDom += '</div><div class="hdlm-tit">';
            inDom += dt[numl].tit;
            inDom += '</div><div class="hdlm-des">';
            inDom += dt[numl].des;
            inDom += '</div></div>';

            if(numr !== false){
                inDom += '<div class="hd-list-most hd-list-most-right"><div class="hdlm-media">';
                if(typeof dt[numr].vd !== 'undefined'){
                    inDom += '<div id="letv-vd-right" class="letv-area" data-vu="';
                    inDom += dt[numr].vd;
                    inDom += '"></div>';
                }else{
                    inDom += '<img src="';
                    inDom += dt[numr].pic;
                    inDom += '" alt="';
                    inDom += dt[numr].tit;
                    inDom += '">';
                }
                inDom += '</div><div class="hdlm-tit">';
                inDom += dt[numr].tit;
                inDom += '</div><div class="hdlm-des">';
                inDom += dt[numr].des;
                inDom += '</div></div>';
            }
            return inDom;
        }
        function insterMost(con,sel,init) {
            var inDom = '';
            init = parseInt(init);
            inDom += '<div class="hd-list-most-area">';
            inDom += mostInsert(hdData[sel].con,init,init+1);
            inDom += '</div>';
            inDom += '<a class="hd-arr hd-arr-l dis">上一页</a>';
            inDom += '<a class="hd-arr hd-arr-r">下一页</a>';
            con.html(inDom).removeClass().addClass('hdb-con hdb-most hdb-monster');
            function getVdFm() {
                con.find('.letv-area').each(function () {
                    initVd($(this));
                });
            }
            function playVd(vu,vid) {
                $(vid).html('');
                pageFunc.playYK(vu,vid);
                //pageFunc.playLetv(vu,vid,618,348);
            }
            function initVd($vds) {
                var vu = $vds.data('vu'),id = $vds.attr('id');
                pageFunc.getYKpic(vu,function (imgsrc) {
                    $vds.append('<img src="'+imgsrc+'" alt=""><div class="hd-play-mask"></div><a class="hd-play hdPlay" data-vu="'+vu+'"></a>');
                });
            }
            getVdFm();
            function arrClk() {
                getVdFm();
            }
            con.find('.hd-arr-r').on('click',function () {
                if($(this).hasClass('dis') === false){
                    con.find('.hd-arr-l').removeClass('dis');
                    var nl,nr;
                    init = init+2;
                    nl = init;
                    nr = init+1;
                    if(init+1 > hdData[sel].con.length - 1){
                        nr = false;
                    }
                    inDom = mostInsert(hdData[sel].con,nl,nr);
                    con.find('.hd-list-most-area').html(inDom);
                    if(init+3>hdData[sel].con.length){
                        $(this).addClass('dis');
                    }
                    arrClk();
                }
            });
            con.find('.hd-arr-l').on('click',function () {
                if($(this).hasClass('dis') === false){
                    con.find('.hd-arr-r').removeClass('dis');
                    var nl,nr;
                    init = init-2;
                    nl = init;
                    nr = init+1;
                    inDom = mostInsert(hdData[sel].con,nl,nr);
                    con.find('.hd-list-most-area').html(inDom);
                    if(init<=0){
                        $(this).addClass('dis');
                    }
                    arrClk();
                }
            });
            con.find('.hd-list-most-area').on('click','.hdPlay',function () {
                var $this = $(this),vu = $this.data('vu');
                $('#hdPlaying').remove();
                $this.closest('.letv-area').append('<div style="z-index: 2;" class="hd-playing" id="hdPlaying"></div>');
                playVd(vu,'hdPlaying');
            })
        }
        function weaponInsert(dt,num) {
            var inDom = '';
            inDom += '<div class="hd-list-weapon-left"><div class="hdlm-media">';
            if(typeof dt[num].vd !== 'undefined'){
                inDom += '<div id="letv-vd-wp" class="letv-area" data-vu="';
                inDom += dt[num].vd;
                inDom += '"></div>';
            }else{
                inDom += '<img src="';
                inDom += dt[num].pic;
                inDom += '" alt="';
                inDom += dt[num].tit;
                inDom += '">';
            }
            inDom += '</div><div class="hdlm-tit">';
            inDom += dt[num].tit;
            inDom += '</div><div class="hdlm-des">';
            inDom += dt[num].des;
            inDom += '</div></div>';
            inDom += '<div class="hd-list-weapon-right"><div class="hdl-wp">';
            inDom += '<div class="hdl-wp-tit">武器详解</div>';
            inDom += '<div class="hdl-wp-con"><img src="'+dt[num].pic+'" alt="'+dt[num].tit+'"></div>';
            inDom += '</div></div>';

            return inDom;
        }
        function insterWeapon(con,sel,init) {
            var inDom = '';
            init = parseInt(init);
            inDom += '<div class="hd-list-weapon-area">';
            inDom += weaponInsert(hdData[sel].con,init);
            inDom += '</div>';
            inDom += '<a class="hd-arr hd-arr-l dis">上一页</a>';
            inDom += '<a class="hd-arr hd-arr-r">下一页</a>';
            con.html(inDom).removeClass().addClass('hdb-con hdb-weapon');
            function getVdFm() {
                initVd($('.letv-area'));
            }
            function playVd(vu,vid) {
                $(vid).html('');
                pageFunc.playYK(vu,vid);
            }
            function initVd($vds) {
                var vu = $vds.data('vu'),id = $vds.attr('id');
                pageFunc.getYKpic(vu,function (imgsrc) {
                    $vds.append('<img src="'+imgsrc+'" alt=""><div class="hd-play-mask"></div><a class="hd-play hdPlay" data-vu="'+vu+'"></a>');
                });
            }
            getVdFm();
            function arrClk() {
                getVdFm();
            }
            con.find('.hd-arr-r').on('click',function () {
                if($(this).hasClass('dis') === false){
                    con.find('.hd-arr-l').removeClass('dis');
                    var num;
                    init++;
                    num = init;
                    inDom = weaponInsert(hdData[sel].con,num);
                    con.find('.hd-list-weapon-area').html(inDom);
                    if(init+2>hdData[sel].con.length){
                        $(this).addClass('dis');
                    }
                    arrClk();
                }
            });
            con.find('.hd-arr-l').on('click',function () {
                if($(this).hasClass('dis') === false){
                    con.find('.hd-arr-r').removeClass('dis');
                    var num;
                    init--;
                    num = init;
                    inDom = weaponInsert(hdData[sel].con,num);
                    con.find('.hd-list-weapon-area').html(inDom);
                    if(init<=0){
                        $(this).addClass('dis');
                    }
                    arrClk();
                }
            });
            con.find('.hd-list-weapon-area').on('click','.hdPlay',function () {
                var $this = $(this),vu = $this.data('vu');
                $this.closest('.letv-area').append('<div style="z-index: 2;" class="hd-playing" id="hdPlaying"></div>');
                playVd(vu,'hdPlaying');
            })
        }
        function npcInsert(dt,num) {
            var inDom = '';
            inDom += '<div class="hdln-left"><div class="hdln-tit">';
            inDom += dt[num].tit;
            inDom += '</div><div class="hdln-bigpic"><img src="';
            inDom += dt[num].bigpic;
            inDom += '" alt="';
            inDom += dt[num].tit;
            inDom += '"></div></div>';
            inDom += '<div class="hdln-right"><div class="hdln-tit">人物介绍</div>';
            inDom += '<div class="hdln-des">';
            inDom += dt[num].des;
            inDom += '</div><div class="hdln-smlpic"><img src="';
            inDom += dt[num].smlpic;
            inDom += '" alt="';
            inDom += dt[num].tit;
            inDom += '"></div></div>';

            return inDom;
        }
        function insterNPC(con,sel,init) {
            var inDom = '';
            init = parseInt(init);
            inDom += '<div class="hd-list-npc-area">';
            inDom += npcInsert(hdData[sel].con,init);
            inDom += '</div>';
            inDom += '<a class="hd-arr hd-arr-l dis">上一页</a>';
            inDom += '<a class="hd-arr hd-arr-r">下一页</a>';
            con.html(inDom).removeClass().addClass('hdb-con hdb-npc');

            function arrClk() {}
            con.find('.hd-arr-r').on('click',function () {
                if($(this).hasClass('dis') === false){
                    con.find('.hd-arr-l').removeClass('dis');
                    var num;
                    init++;
                    num = init;
                    inDom = npcInsert(hdData[sel].con,num);
                    con.find('.hd-list-npc-area').html(inDom);
                    if(init+2>hdData[sel].con.length){
                        $(this).addClass('dis');
                    }
                    arrClk();
                }
            });
            con.find('.hd-arr-l').on('click',function () {
                if($(this).hasClass('dis') === false){
                    con.find('.hd-arr-r').removeClass('dis');
                    var num;
                    init--;
                    num = init;
                    inDom = npcInsert(hdData[sel].con,num);
                    con.find('.hd-list-npc-area').html(inDom);
                    if(init<=0){
                        $(this).addClass('dis');
                    }
                    arrClk();
                }
            });
        }

        var navBtn = tar.find('.hdbNavBtns').find('.hdbNavBtn');
        if(navclk === false){
            navBtn.addClass('dis');
        }
        function selectTar(idx) {
            var $btn = navBtn.eq(idx),
                sel = $btn.data('sel'),
                initNum = $btn.attr('data-init'),
                $insertTar = tar.find('.hdb-con');
            navBtn.removeClass('cur').eq(idx).addClass('cur');
            switch (sel){
                case 'monster':
                    insterMost($insertTar,sel,initNum);
                    break;
                case 'map':
                    insterMost($insertTar,sel,initNum);
                    break;
                case 'other':
                    insterMost($insertTar,sel,initNum);
                    break;
                case 'weapon':
                    insterWeapon($insertTar,sel,initNum);
                    break;
                case 'npc':
                    insterNPC($insertTar,sel,initNum);
                    break;
                default:
                    console.log('default');
            }
        }
        navBtn.on('click',function () {
            var idx = $(this).index();
            if($(this).hasClass('dis') === false){
                selectTar(idx);
            }
        });
        if(typeof def !== 'undefined'){
            selectTar(def);
        }else{
            selectTar(0);
        }
    },
    pgBegin:function(){
		var pageDom = '',imgdata = pageConfig.imglist.begin;
		pageDom += '<div class="page_con page_begin pgBegin">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a target="_blank" href="'+imgdata.gs+'" class="logo-gs"></a>';
        pageDom += '<a class="zanbtn supportMe" data-itemid="'+pageConfig.countid+'" data-field="digg" data-table="PE_U_Article"><i class="zan-icon"></i><i class="zanNum">0</i>人赞过</a>';
		pageDom += '<a class="btn1"></a>';
		pageDom += '<div class="txt"><i></i>'+imgdata.txt+'</div>';
		pageDom += '<div class="ots-btn-group">';
		pageDom += '<a class="btn_buy">购买游戏</a>';
		pageDom += '<a class="btn_comm">玩家评论</a>';
		pageDom += '</div>';
        pageDom += '<a class="openHdBook btn-hdb"></a>';
		pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btn1').on('click',function(){
                pageFunc.loadPage();
            });
            dgyMain.find('.btn_comm').on('click',function () {
                pageFunc.commPage();
            });
            dgyMain.find('.btn_buy').on('click',function () {
                pageFunc.pgGamerVer('back');
            });
            dgyMain.find('.openHdBook').on('click',function () {
                pageFunc.showHDbook(dgyMain);
            });
            $(".supportMe").supportMe();
            //ymjsModel.preLoadImg(preLoadPicsLists.list2);
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
	},
    pgEnd:function(){
        var pageDom = '',imgdata = pageConfig.imglist.end,begindata = pageConfig.imglist.begin;

        pageDom += '<div class="page_con page_end pgEnd">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a target="_blank" href="'+begindata.gs+'" class="logo-gs"></a>';
        pageDom += '<a target="_blank" href="'+begindata.gf+'" class="logo-gf"></a>';
        pageDom += '<div class="infos">';
        pageDom += imgdata.para;
        pageDom += '</div>';
        pageDom += '<div class="clearfix btngroup"><a class="btn_sty btn_sty1 btn_comm">评论</a><a target="_blank" href="'+begindata.gs+'" class="btn_sty btn_sty2">往期回顾</a></div>';
        pageDom += ymjsModel.createBaiduShare('');
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btn_comm').on('click',function () {
                pageFunc.commPage();
            });
            window._bd_share_main.init();
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgGamerVer:function(isback){
        var pageDom = '',imgdata = pageConfig.imglist.pgGamerVer;
        pageDom += '<div class="page_con page_gmvr pgGamerVer">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += '<div class="des">'+imgdata.des+'</div>';
        pageDom += '<div class="list"><ul class="clearfix">';
        $.each(imgdata.list,function (i,item) {
            pageDom += '<li>';
            pageDom += '<div class="tit">'+item.tit+'</div>';
            pageDom += '<a class="buy" target="_blank" href="'+item.buy+'">立即购买</a>';
            pageDom += '<img src="'+item.pic+'" alt="'+item.tit+'">';
            pageDom += '<div class="para">';
            $.each(item.lis,function (j,pars) {
                pageDom += '<div class="para-eh"><i>0'+(j+1)+'</i>'+pars+'</div>';
            });
            pageDom += '</div>';
            pageDom += '</li>';
        });
        pageDom += '</ul></div>';
        if(isback === 'back'){
            pageDom += '<a class="btn_sty btn_sty1 btn btnBack">返回首页</a>';
        }else{
            pageDom += '<a class="btn_sty btn_sty1 btn btnNext">结束狩猎</a>';
        }
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnBack').on('click',function(){
                pageFunc.pgBegin();
            });
            dgyMain.find('.btnNext').on('click',function(){
                pageFunc.pgEnd();
            });
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgStarBase:function(){
        var pageDom = '',imgdata = pageConfig.imglist.pgStarBase,tipsTxt= '狩猎前，请前往【加工屋】选择武器';
        if(pageState.choiceWp !== false){
            tipsTxt = '战斗准备已完成，点击按钮开始狩猎';
        }
        pageDom += '<div class="page_con page_starbase pgStarBase">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += this.addIntro(imgdata.intro);
        pageDom += '<a class="btn-pic btn-pic1"><span>集会区域</span><i class="icons"></i><i class="bd"></i></a>';
        pageDom += '<a class="btn-pic btn-pic2"><span>加工屋</span><i class="icons"></i><i class="bd"></i></a>';
        pageDom += '<a class="btn-pic btn-pic3"><span>自己的房间</span><i class="icons"></i><i class="bd"></i></a>';
        pageDom += '<a class="btn_sty btn_sty1 btn btnNext">开始狩猎</a>';
        pageDom += '<div class="notice">'+tipsTxt+'</div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnNext').on('click',function(){
                if(pageState.choiceWp === false){
                    dgyMain.find('.notice').addClass('cur');
                    setTimeout(function () {
                        dgyMain.find('.notice').removeClass('cur');
                    },200)
                }else{
                    pageFunc.pgMap();
                }
            });
            dgyMain.find('.btn-pic1').on('click',function(){
                pageFunc.pgMeeting();
            });
            dgyMain.find('.btn-pic2').on('click',function(){
                pageFunc.pgWorking();
            });
            dgyMain.find('.btn-pic3').on('click',function(){
                pageFunc.pgMyself();
            });
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgMeeting:function(){
        var pageDom = '',imgdata = pageConfig.imglist.pgMeeting;
        pageDom += '<div class="page_con page_meeting pgMeeting">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += this.addIntro(imgdata.intro);
        pageDom += '<a class="btn-pic btn-pic4"><span>柜台</span><i class="icons"></i><i class="bd"></i></a>';
        pageDom += '<a class="btn_sty btn_sty2 btn btnBack">返回基地</a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function showPop(doms,callback) {
            var popDom = '';
            popDom += '<div class="pgInnerPop pgInnerPopMask pgInnerPopClose"></div>';
            popDom += '<div class="pgInnerPop pgInnerPopMain">';
            popDom += doms;
            popDom += '<a class="pgInnerPopCloseBtn pgInnerPopClose"></a>';
            popDom += '</div>';
            dgyMain.append(popDom);
            setTimeout(function () {
                dgyMain.find('.pgInnerPop').addClass('cur');
            },50);
            closePop();
            if(typeof callback === 'function'){
                callback&&callback();
            }
        }
        function closePop() {
            dgyMain.find('.pgInnerPopClose').on('click',function () {
                dgyMain.find('.pgInnerPop').removeClass('cur');
                setTimeout(function () {
                    dgyMain.find('.pgInnerPop').remove();
                    pageConfig.isVideoPlaying = false;
                    if(pageConfig.userMute !== true){
                        ymjsModel.bgmPlay();
                    }
                },250);
            })

        }
        function thisFunc(){
            dgyMain.find('.btnBack').on('click',function(){
                pageFunc.pgStarBase();
            });
            dgyMain.find('.btn-pic4').on('click',function(){
                var thisDoms = '';
                thisDoms += '<img class="box-meeting" src="'+imgdata.box+'" alt="box">';
                showPop(thisDoms);
            });
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgMyself:function(){
        var pageDom = '',imgdata = pageConfig.imglist.pgMyself;
        pageDom += '<div class="page_con page_myself pgMyself">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += this.addIntro(imgdata.intro);
        pageDom += '<a class="btn-light btn-cat"></a>';
        pageDom += '<a class="btn-light btn-rabbit"><img src="'+imgdata.rabbit+'" alt="在游戏设定的新世界中，存在着各种生物，而你捕捉到的生 物可以放在你的家里。根据你房子类型以及等级的不同，你 能“饲养”的生物数"></a>';
        pageDom += '<a class="btn-light btn-box"></a>';
        pageDom += '<a class="btn_sty btn_sty2 btn btnNext">返回基地</a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');

        function showPop(doms,callback) {
            var popDom = '';
            popDom += '<div class="pgInnerPop pgInnerPopMask pgInnerPopClose"></div>';
            popDom += '<div class="pgInnerPop pgInnerPopMain">';
            popDom += doms;
            popDom += '<a class="pgInnerPopCloseBtn pgInnerPopClose"></a>';
            popDom += '</div>';
            dgyMain.append(popDom);
            setTimeout(function () {
                dgyMain.find('.pgInnerPop').addClass('cur');
            },50);
            closePop();
            if(typeof callback === 'function'){
                callback&&callback();
            }
        }
        function closePop() {
            dgyMain.find('.pgInnerPopClose').on('click',function () {
                dgyMain.find('.pgInnerPop').removeClass('cur');
                setTimeout(function () {
                    dgyMain.find('.pgInnerPop').remove();
                    pageConfig.isVideoPlaying = false;
                    if(pageConfig.userMute !== true){
                        ymjsModel.bgmPlay();
                    }
                },250);
            })

        }
        function thisFunc(){
            dgyMain.find('.btnNext').on('click',function(){
                pageFunc.pgStarBase();
            });
            dgyMain.find('.btn-box').on('click',function(){
                var thisDoms = '';
                thisDoms += '<img class="box-img" src="'+imgdata.box+'" alt="box">';
                showPop(thisDoms);
            });
            dgyMain.find('.btn-cat').on('click',function(){
                var thisDoms = '';
                thisDoms += '<img class="cat-img-txt" src="'+imgdata.cat.txt+'" alt="cat">';
                thisDoms += '<div class="cat-video" id="catVideo"></div>';
                thisDoms += '<img class="cat-img-role" src="'+imgdata.cat.role+'" alt="cat">';
                showPop(thisDoms,function () {
                    pageFunc.getYKpic(imgdata.cat.video,function (imgsrc) {
                        $('#catVideo').append('<img width="100%" height="100%" src="'+imgsrc+'" alt="bg"><div class="cat-play-mask"></div><a class="cat-play"></a>');
                        dgyMain.find('.cat-play').on('click',function () {
                            var $this = $(this),vid = imgdata.cat.video,vdDom = '';

                            pageConfig.isVideoPlaying = true;
                            ymjsModel.bgmPause();
                            $('#catVideo').html('');
                            pageFunc.playYK(imgdata.cat.video,'catVideo');
                        });
                    });
                });
            });
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgWorking:function(){
        var pageDom = '',imgdata = pageConfig.imglist.pgWorking,btnTxt = '';
        if(pageState.choiceWp === false){
            btnTxt = '挑选武器';
        }else{
            btnTxt = '更换武器';
        }
        pageDom += '<div class="page_con page_working pgWorking">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += this.addIntro(imgdata.intro);
        pageDom += '<img class="dialog" src="'+imgdata.dia+'" alt="对话">';
        pageDom += '<a class="btn-txt btn-pick"><span>'+btnTxt+'</span></a>';
        pageDom += '<a class="btn_sty btn_sty2 btn btnBack">返回基地</a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnBack').on('click',function(){
                pageFunc.pgStarBase();
            });
            dgyMain.find('.btn-pick').on('click',function(){
                pageFunc.showHDbook(dgyMain,1,false);
            });
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgMap:function(){
        var pageDom = '',
            imgdata = pageConfig.imglist.pgMap,
            mapData = pageConfig.imglist.hd.map.con,
            btnDom = '',
            lineDom = '';
        $.each(mapData,function (i,item) {
            var btnsty = '';
            if(item.gone === true){
                btnsty = ' cur'
            }
            lineDom += '<div class="btn-line btn-line-'+item.group+btnsty+'"></div>';
            btnDom += '<a class="btn-mp btn-'+item.group+' btnMp" data-btnkey="'+i+'" data-gp="'+item.group+'" data-vu="'+item.vd+'"><span>'+item.tit+'<i class="arr"></i></span></a>';
        });
        pageDom += '<div class="page_con page_map pgMap">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += '<div class="infos"><div class="infos-tit">'+imgdata.intro.tit+'</div><div class="infos-des">'+imgdata.intro.des+'</div></div><div class="attention"><i class="bder"></i><i class="icon"></i></div>';
        pageDom += lineDom;
        pageDom += btnDom;
        pageDom += '<a class="btn-mp btn-mp5 btn-disalbe"><span>研究所</span></a>';
        pageDom += '<a class="btn-mp btn-mp0"><span>星辰<i class="arr"></i></span><i class="tips"></i></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var clkEnable = true;
            dgyMain.find('.btnNext').on('click',function(){
                pageFunc.btnNext();
            });
            dgyMain.find('.btn-mp0').on('click',function(){
                pageFunc.pgStarBase();
            });
            dgyMain.find('.btnMp').on('click',function(){
                var $this = $(this),
                    gp = $this.data('gp'),
                    key = $this.data('btnkey'),
                    vu = $this.data('vu');
                if(clkEnable === true){
                    clkEnable = false;
                    dgyMain.find('.btn-line-'+gp).addClass('cur');
                    mapData[key].gone = true;
                    setTimeout(function () {
                        pageFunc.midPage(vu,function () {
                            pageFunc.pgMonster(gp);
                        },mapData[key].tit,mapData[key].fulldes,'pg'+gp);
                    },1000);
                }
            });
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgMonster:function(mgroup){
        var pageDom = '',
            imgdata = pageConfig.imglist.pgMonster,
            monsterData = pageConfig.imglist.hd.monster,
            mgp = 'mp1',tiDom ='',tnDom = '';
        if(mgroup){
            mgp = mgroup;
        }
        $.each(monsterData.con,function (i,item) {
            function createCon() {
                tiDom += '<div class="mtabItem tabitem">';
                tiDom += '<img src="http://image.gamersky.com/webimg13/zhuanti/common/blank.png" data-lzy="'+item.bigpic+'" alt="'+item.tit+'" class="mtab-bigpic ztTabLazyLoad">';
                tiDom += '<div class="mtab-tit"><h5>'+item.tit+'</h5></div>';
                tiDom += '<div class="mtab-des">'+item.des+'</div>';
                if(item.hunted === true){
                    if(item.role === 'enter'){
                        tiDom += '<a class="btn_sty btn_sty1 btn btnHuntTar btnHuntTared btn_hunt" data-mpnum="'+i+'">终极一战</a>';
                    }else{
                        tiDom += '<a class="btn_sty btn_sty1 btn btnHunt btnHunted btn_hunt">已狩猎</a>';
                    }
                }else if(item.role === 'enter'){
                    tiDom += '<a class="btn_sty btn_sty1 btn btnHuntTar btn_hunt" data-mpnum="'+i+'">终极一战</a>';
                }else{
                    tiDom += '<a class="btn_sty btn_sty1 btn btnHunt btn_hunt" data-mpnum="'+i+'">狩猎</a>';
                }
                tiDom += '</div>';
                if(item.role === 'enter'){
                    tnDom += '<a class="navTar">'+item.tit+'</a>';
                }else{
                    tnDom += '<a>'+item.tit+'</a>';
                }
                if(item.role === 'enter'){
                    tnDom += '<div class="attention"><i class="bder"></i><i class="icon"></i></div>';
                }
            }
            if(item.group === mgp){
                createCon();
            }
        });
        pageDom += '<div class="page_con page_monster pgMonster">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += '<div class="mtab tabs">';
        pageDom += '<div class="mtabBox tabbox">';
        pageDom += tiDom;
        pageDom += '</div>';
        pageDom += '<div class="mtabNavs">';
        pageDom += tnDom;
        pageDom += '</div>';
        pageDom += '</div>';
        pageDom += '<a class="btn_sty btn_sty2 btn btnBack btn_back">返回地图</a>';
        pageDom += '<div class="mpop" id="ykMidVideo"></div>';
        pageDom += '</div>';

        function showVd(vu) {
            var vdDom = '';
            vdDom += '<a class="btn-skip btn-skip4 btnSkip"><i></i><span>完成狩猎</span></a>';
            var $pop = dgyMain.find('.mpop');
            $pop.html(vdDom);
            var player = new YKU.Player('ykMidVideo',{
                styleid: '0',
                client_id: '6bfe5b183f11e7d9',
                vid: vu,
                newPlayer: true,
                autoplay: true
            });
            setTimeout(function () {
                $pop.addClass('cur');
            },50);
            $pop.find('.btnSkip').on('click',function () {
                $pop.removeClass('cur');
                setTimeout(function () {
                    $pop.html('');
                },250);
            });
        }

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnBack').on('click',function(){
                pageFunc.pgMap();
            });
            dgyMain.find('.btnHunt').on('click',function(){
                var $this = $(this),dtKey = $this.data('mpnum'),vu;
                if($this.hasClass('btnHunted') === false){
                    vu = monsterData.con[dtKey].vd;
                    monsterData.con[dtKey].hunted = true;
                    showVd(vu);
                    setTimeout(function () {
                        $this.addClass('btnHunted').html('已狩猎');
                    },250);
                }
            });
            dgyMain.find('.btnHuntTar').on('click',function(){
                var $this = $(this),dtKey = $this.data('mpnum');
                monsterData.con[dtKey].hunted = true;
                pageConfig.isFixedNav = false;
                pageConfig.isHb = false;
                $('.volbtn,#fixNav,#handBookBtn').removeClass('cur');
                pageFunc.pgHunt();
                setTimeout(function () {
                    $this.addClass('btnHunted').html('已狩猎');
                },300);
            });
            pageFunc.tab(dgyMain.find('.mtab'),'.mtabNavs','.mtabBox','.mtabItem',true);
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgHunt:function(){
        var pageDom = '',imgdata = pageConfig.imglist.pgHunt;
        pageDom += '<div class="page_con page_hunt pgHunt">';
        pageDom += '<video src="'+imgdata.video.vd1+'" id="vdShow" class="page_bg"></video>';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg maskImg">';
        pageDom += '<ul class="btngroup">';
        pageDom += '<li class="btn1"><div class="btn-pic"><img src="'+imgdata.btns.btn1+'" alt="灭尽龙特点"></div></li>';
        pageDom += '<li class="btn2"><div class="btn-nav">';
        $.each(imgdata.btns.btn2,function (i,item) {
            pageDom += '<a>'+item.tit+'<span>'+item.des+'</span></a>';
        });
        pageDom += '</div></li>';
        pageDom += '</ul>';
        pageDom += '<a class="btn_sty btn_sty1 btn btnNext btn_next">继续</a>';
        pageDom += '<div class="vdTips"></div>';
        pageDom += '</div>';
        var dgyMain = $('#dgyMain');
        function thisFunc(){
            ymjsModel.bgmSet(pageConfig.bgm.hunt);
            var tipsBox = dgyMain.find('.vdTips');
            function insertTips(dt) {
                var tipsDom = '';
                if(typeof dt.pop !== 'undefined'){
                    tipsDom += pageFunc.addIntroVideo(dt.pop.tit,dt.pop.des);
                }
                tipsDom += '<div class="key-tips">'+dt.keyshow+'</div>';
                tipsBox.html(tipsDom).addClass('cur');
            }
            var $theVd = $('#vdShow'),theVd = $theVd[0];
            var vdControl = {
                vdPart1:function () {
                    var thisVideo = document.getElementById('vdShow'),
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
                        },16.7);
                    }
                    var keyFramesArr = imgdata.video.vd1Keys,initKey = 0;
                    function keyEventBind(thkey,callback) {
                        function triEvent() {
                            tipsBox.removeClass('cur');
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
                        updateTimeFunc(keyFramesArr[thkey].time,function () {
                            thisVideo.pause();
                            insertTips(keyFramesArr[thkey].tips);
                            pageFunc.bindKey(keyFramesArr[thkey].key,function () {
                                triEvent();
                            });
                        });
                    }
                    keyEventBind(initKey,function () {
                        initKey++;
                    });

                    thisVideo.onended = function () {
                        clearInterval(vdLook);
                        pageFunc.midPageBgm(imgdata.video.vd2,function () {
                            pageFunc.pgHunt3();
                        });
                    };
                },
                init:function () {
                    this.vdPart1();
                }
            };
            dgyMain.find('.btnNext').on('click',function(){
                $(this).remove();
                dgyMain.find('.maskImg,.btngroup').remove();
                vdControl.init();
            });
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgHunt3:function(){
        var pageDom = '',imgdata = pageConfig.imglist.pgHunt;
        pageDom += '<div class="page_con page_hunt pgHunt">';
        pageDom += '<video src="'+imgdata.video.vd3+'" id="vdShow" class="page_bg"></video>';
        pageDom += '<video src="'+imgdata.video.vd3loop+'" id="vdLoop" class="wormbg" autoplay loop></video>';
        pageDom += '<div class="vdTips"></div>';
        pageDom += '</div>';
        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var $vdLoop = $('#vdLoop'),closeLoop = false;
            var tipsBox = dgyMain.find('.vdTips');
            function insertTips(dt) {
                var tipsDom = '';
                if(typeof dt.pop !== 'undefined'){
                    tipsDom += pageFunc.addIntroVideo(dt.pop.tit,dt.pop.des);
                }
                tipsDom += '<div class="key-tips">'+dt.keyshow+'</div>';
                tipsBox.html(tipsDom).addClass('cur');
            }
            var $theVd = $('#vdShow'),theVd = $theVd[0];
            var vdControl = {
                vdPart1:function () {
                    var thisVideo = document.getElementById('vdShow'),
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
                        },16.7);
                    }
                    var keyFramesArr = imgdata.video.vd3Keys,initKey = 0;
                    function keyEventBind(thkey,callback) {
                        function triEvent() {
                            if(closeLoop === false){
                                closeLoop = true;
                                $vdLoop.remove();
                            }
                            tipsBox.removeClass('cur');
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
                        updateTimeFunc(keyFramesArr[thkey].time,function () {
                            thisVideo.pause();
                            insertTips(keyFramesArr[thkey].tips);
                            pageFunc.bindKey(keyFramesArr[thkey].key,function () {
                                triEvent();
                            });
                        });
                    }
                    keyEventBind(initKey,function () {
                        initKey++;
                    });

                    thisVideo.onended = function () {
                        clearInterval(vdLook);
                        pageFunc.midPage4(imgdata.video.vd4,function () {
                            pageFunc.pgHunt5();
                        });
                    };
                },
                init:function () {
                    this.vdPart1();
                }
            };
            vdControl.init();
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgHunt5:function(){
        var pageDom = '',imgdata = pageConfig.imglist.pgHunt;
        pageDom += '<div class="page_con page_hunt pgHunt">';
        pageDom += '<video src="'+imgdata.video.vd5+'" id="vdShow" class="page_bg"></video>';
        pageDom += '</div>';
        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var $theVd = $('#vdShow'),theVd = $theVd[0];
            theVd.play();
            theVd.onended = function () {
                function showRi() {
                    pageConfig.isHb = true;
                    pageConfig.isFixedNav = true;
                    $('.volbtn').addClass('cur');
                }
                showRi();
                ymjsModel.bgmSet(pageConfig.bgm.start);
                pageFunc.pgGamerVer();
            };
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    demo:function(){
        var pageDom = '',imgdata = pageConfig.imglist.demo;
        pageDom += '<div class="page_con page07">';
        pageDom += '<img src="'+imgdata.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn_sty btn_sty1 btn btnNext">经典地图</a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnNext').on('click',function(){
                pageFunc.btnNext();
            });
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
                pageFunc.pgEnd();
                $('.volbtn').addClass('cur');
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
		pageDom += '<div class="comm hei"><div class="cont">';
		pageDom += '<div id="SOHUCS" sid="'+pageConfig.countid+'"></div>';
		pageDom += '</div></div>';
		pageDom += '<a class="btn_close"></a>';
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
        pageDom += '<div class="letvwrap"><embed src="http://yuntv.letv.com/bcloud.swf" allowFullScreen="true" quality="high" align="middle" allowScriptAccess="always" width="100%" height="100%" flashvars="uu=cfd9191aeb&vu='+transVu+'&pu=96f01af2a7&auto_play=1&gpcflag=1&width=1920&height=1080&lang=zh_CN" type="application/x-shockwave-flash"></embed></div>';
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
    midPage:function(transVu,callback1,tipsTit,tipsDes,navClass){
        var pageDom = '',pgClass = '';
        if(typeof navClass !== 'undefined'){
            pgClass = ' '+navClass;
        }
        pageDom += '<div class="page_con page_trans'+pgClass+'">';
        pageDom += '<div class="letvwrap" id="ykMidVideo"></div>';
        if(typeof tipsTit !== 'undefined'){
            pageDom += pageFunc.addIntroVideo(tipsTit,tipsDes);
        }
        if(callback1){
            pageDom += '<a class="btn-skip btn-skip4 btnSkip"><i></i><span>选择魔物</span></a>';
        }
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var player = new YKU.Player('ykMidVideo',{
                styleid: '0',
                client_id: '6bfe5b183f11e7d9',
                vid: transVu,
                newPlayer: true,
                autoplay: true
            });
            if(callback1){
                dgyMain.find('.btn-skip').on('click',function(){
                    callback1();
                });
            }
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    midPageBgm:function(transVu,callback1,tipsTit,tipsDes,navClass){
        var pageDom = '',pgClass = '';
        if(typeof navClass !== 'undefined'){
            pgClass = ' '+navClass;
        }
        pageDom += '<div class="page_con page_trans'+pgClass+'">';
        pageDom += '<div class="letvwrap" id="ykMidVideo"></div>';
        if(typeof tipsTit !== 'undefined'){
            pageDom += pageFunc.addIntroVideo(tipsTit,tipsDes);
        }
        if(callback1){
            pageDom += '<a class="btn-skip btnSkip"><i></i><span>继续</span></a>';
        }
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var player = new YKU.Player('ykMidVideo',{
                styleid: '0',
                client_id: '6bfe5b183f11e7d9',
                vid: transVu,
                newPlayer: true,
                autoplay: true
            });
            if(callback1){
                dgyMain.find('.btn-skip').on('click',function(){
                    callback1();
                });
            }
        }
        ymjsModel.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    midPage4:function(transVu,callback1,tipsTit,tipsDes){
        var pageDom = '';

        pageDom += '<div class="page_con page_trans">';
        pageDom += '<div class="letvwrap" id="ykMidVideo"></div>';
        if(callback1){
            pageDom += '<a class="btn-skip btn-skip4 btnSkip"><i></i><span>完成狩猎</span></a>';
        }
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var player = new YKU.Player('ykMidVideo',{
                styleid: '0',
                client_id: '6bfe5b183f11e7d9',
                vid: transVu,
                newPlayer: true,
                autoplay: true
            });
            if(callback1){
                dgyMain.find('.btn-skip').on('click',function(){
                    callback1();
                });
            }
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
        fixNavDom += '<div class="fx-main-area fxMainArea"><div class="fx-main-area-btns">';

        fixNavDom += '<div class="fma-row">';
        fixNavDom += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgBegin">首页</a></div>';
        fixNavDom += '</div>';

        fixNavDom += '<div class="fma-row">';
        fixNavDom += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgStarBase">星辰基地</a></div>';
        fixNavDom += '<div class="fma-lev2">';
        fixNavDom += '<a class="fixBtn" data-pg="pgMeeting">集会区域</a><span>/</span>';
        fixNavDom += '<a class="fixBtn" data-pg="pgWorking">加工屋</a><span>/</span>';
        fixNavDom += '<a class="fixBtn" data-pg="pgMyself">自己的房间</a>';
        fixNavDom += '</div>';
        fixNavDom += '</div>';

        fixNavDom += '<div class="fma-row">';
        fixNavDom += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgMap">世界地图</a></div>';
        fixNavDom += '<div class="fma-lev2">';
        fixNavDom += '<a class="fixBtn fixBtnMaps" data-pg="pgmp1" data-mp="0">古树森林</a><span>/</span>';
        fixNavDom += '<a class="fixBtn fixBtnMaps" data-pg="pgmp3" data-mp="2">陆珊瑚台地</a><span>/</span>';
        fixNavDom += '<a class="fixBtn fixBtnMaps" data-pg="pgmp4" data-mp="3">瘴气之谷</a><span>/</span>';
        fixNavDom += '<a class="fixBtn fixBtnMaps" data-pg="pgmp2" data-mp="1">大蚁塚荒地</a>';
        fixNavDom += '</div>';
        fixNavDom += '</div>';

        fixNavDom += '<div class="fma-row">';
        fixNavDom += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgGamerVer">游戏版本</a></div>';
        fixNavDom += '</div>';

        fixNavDom += '<div class="fma-row">';
        fixNavDom += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgEnd">制作人员</a></div>';
        fixNavDom += '</div>';

        fixNavDom += '<div class="fma-row">';
        fixNavDom += '<div class="fma-lev1"><a class="fixBtn-comm">评论</a></div>';
        fixNavDom += '</div>';

        fixNavDom += '</div></div>';
        fixNavDom += '<a class="fx-main-btn fxMainBtn"></a>';

        var fixNav = $('#fixNav');
        fixNav.html(fixNavDom);
        var $navbtn = fixNav.find('.fxMainBtn'),$mArea = fixNav.find('.fxMainArea'),isClked = false;
        $navbtn.on('click',function () {
            var $this = $(this);
            if(isClked === false){
                isClked = true;
                $this.addClass('fx-main-btn-x');
                fixNav.addClass('fx-show');
            }else{
                isClked = false;
                $this.removeClass('fx-main-btn-x');
                fixNav.removeClass('fx-show');
            }
        });
        $mArea.on('click','.enClk',function () {
            var $this = $(this),sel = $(this).data('pg'),mpData = pageConfig.imglist.hd.map.con;
            isClked = false;
            $navbtn.removeClass('fx-main-btn-x');
            fixNav.removeClass('fx-show');
            if($this.hasClass('fixBtnMaps') === true){
                var key = $this.data('mp');
                mpData[key].gone = true;
                setTimeout(function () {
                    pageFunc.midPage(mpData[key].vd,function () {
                        pageFunc.pgMonster(mpData[key].group);
                    },mpData[key].tit,mpData[key].fulldes,'pg'+mpData[key].group);
                },250);
            }else{
                setTimeout(function () {
                    pageFunc[sel]();
                },250);
            }
        });
        $mArea.find('.fixBtn-comm').on('click',function () {
            pageFunc.commPage();
        });
    },
    fixedNavFunc:function () {
        var fixNav = $('#fixNav'),dm = $('#dgyMain');
        fixNav.addClass('cur').find('.fixBtn').removeClass('cur');
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
    hbFunc:function () {
        var dgyMain = $('#dgyMain');
        $('#handBookBtn').addClass('cur').on('click',function () {
            pageFunc.showHDbook(dgyMain);
        });
    },
	render:function(){
		var pf = this;
		pf.loadingFunc(true);
        pf.fixedNav();
        pf.hbFunc();
	}
};
pageFunc.render();
