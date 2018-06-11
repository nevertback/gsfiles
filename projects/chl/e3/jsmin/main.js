(function($){
    var e3 = {
        getQueryString:function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        swpTop:function(){
            var swpTop = new Swiper('.gsE3SwpTop', {
                slidesPerView:'auto',
                centeredSlides : true,
                loop : true
            })
        },
        swpList:function(){
            $('.gsE3SwpList').each(function () {
                var $this = $(this);
                var swpList = new Swiper($this, {
                    slidesPerView:'auto'
                });
            });
        },
        getWant:function(){
            var $gameList = $('.gsE3game'),gidArr = [];
            $gameList.each(function () {
                var gid = $(this).data('lib');
                gidArr.push(gid);
            });
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "//cm1.gamersky.com/apirating/getwanrating",
                data: { 'Idlist': gidArr+""},
                success: function (data) {
                    if (data.status === 'ok') {
                        var res = data.result;
                        $.each(res,function (i,item) {
                            $('.gsE3game[data-lib='+item.gameId+']').find('.want i').html(item.wantplayCount);
                        });
                    }
                }
            });

        },
        BriefingInit:function(){
            var _this = this,bfSel = _this.getQueryString('bf'),pgNow = $('.gsE3LogoNav').data('now');
            if(bfSel === null){
                if(typeof pgNow !== "undefined" && pgNow !== ''){
                    bfSel = pgNow;
                }else{
                    bfSel = 'ea';
                }
            }
            var LsData = window.LiveStreamData;
            function setNav(){
                $('.logoNavs[data-pgkey='+bfSel+']').addClass('cur');
            }
            function openTab(){
                var $tab = $('.gsE3Tab'),
                    $navs = $tab.find('.gsE3TabNav'),
                    $items = $tab.find('.gsE3TabItem');
                $navs.find('a').on('click',function () {
                    var $this = $(this),idx = $this.index();
                    $navs.find('a').removeClass('cur').eq(idx).addClass('cur');
                    $items.removeClass('cur').eq(idx).addClass('cur');
                });
            }
            function initLive(){
                var LsMain = $('#liveStream'),
                    LsSelData = LsData[bfSel],
                    $list = LsMain.find('.liveStreamList'),
                    totalCount,
                    pageNow = 1,
                    pageSize = 10,
                    pageSort = 'desc',
                    isLoading = false;
                function addTop() {
                    var LsTop = LsMain.find('.liveStreamTop'),
                        LsTopDom,
                        LsTopData = LsSelData;
                    function createLsTopDom(cmn){
                        var tmpDom = '';
                        tmpDom += '<div class="ls-top-state"><span>'+LsTopData.state+'</span></div>';
                        tmpDom += '<div class="ls-top-infos">';
                        tmpDom += '<h5>'+LsTopData.title+'</h5>';
                        tmpDom += '<p><span>'+LsTopData.location+'</span><span>'+LsTopData.time+'</span><span>评论：<i class="LsComment" data-commid="'+LsTopData.commentid+'">'+cmn+'</i></span></p>';
                        return tmpDom;
                    }
                    LsTopDom = createLsTopDom('--');
                    LsTop.html(LsTopDom);
                    $.ajax({
                        type: "GET",
                        url: "//cm.gamersky.com/commentapi/count",
                        dataType: "jsonp",
                        data: {
                            topic_source_id: LsTopData.commentid
                        },
                        success: function (responseJson) {
                            $('.LsComment').html(responseJson.result[LsTopData.commentid].comments);
                        }
                    });
                }
                function getData(size,page, sort, callback) {
                    var JsonData = {
                        action: "getlivedatabypage",
                        generalId: LsSelData.commentid,
                        page: page,
                        size: size,
                        orderSort: sort
                    };
                    $.ajax({
                        type: "GET",
                        url: "//db5.gamersky.com/GraphicLiveAjax.aspx",
                        dataType: "jsonp",
                        data: {jsondata:JSON2.stringify(JsonData)},
                        success: function (data) {
                            if (data.status === 'ok' && typeof callback === "function") {
                                callback(data);
                            }

                        }
                    });
                }
                function createItemDom(dt){
                    var tmpDom = '';
                    tmpDom += '';
                    tmpDom += '<div class="live-stream-list-item">';
                    tmpDom += '<div class="lsli-time"><i></i>'+dt.inputtime+'</div>';
                    tmpDom += '<div class="lsli-des">'+dt.describe+'</div>';
                    if(dt.list.length >0){
                        var tmpPics = dt.uploadList+'';
                        tmpPics = tmpPics.replace(/http:\/\//g,'//');
                        tmpDom += '<div class="liveStreamPicList lsli-pics lsli-pics-num'+dt.list.length+'" data-piclist="'+tmpPics+'"><ul class="clearfix">';
                        $.each(dt.uploadList,function (i,item) {
                            item = item.replace('http://','//');
                            tmpDom += '<li><a class="liveStreamPic" data-idx="'+i+'"><img src="'+item+'_550.jpg" alt="LivePics"></a></li>';
                        });
                        tmpDom += '</ul></div>';
                    }
                    tmpDom += '</div>';
                    return tmpDom;
                }
                function createListDom(dt){
                    var tmpDom = '';
                    tmpDom += '';
                    tmpDom += '<div class="live-stream-list-items gsE3LslItems">';
                    $.each(dt,function (i,item) {
                        tmpDom += createItemDom(item);
                    });
                    tmpDom += '</div>';
                    tmpDom += '<a class="live-stream-list-more gsE3LslMore">查看更多内容</a>';
                    return tmpDom;
                }
                function addListDom(dt){
                    var tmpDom = '';
                    tmpDom += '';
                    $.each(dt,function (i,item) {
                        tmpDom += createItemDom(item);
                    });
                    return tmpDom;
                }
                function moreBtn(){
                    $('.gsE3LslMore').on('click',function () {
                        var $this = $(this);
                        if(isLoading === false){
                            isLoading = true;
                            pageNow++;
                            $this.html('正在加载...');
                            getData(pageSize , pageNow , pageSort , function (moreRes) {
                                $list.find('.gsE3LslItems').append(addListDom(moreRes.result));
                                if(pageNow*pageSize >= totalCount){
                                    $this.html('全部加载完成');
                                }else{
                                    isLoading = false;
                                    $this.html('查看更多内容');
                                }
                            });
                        }
                    });
                }
                function initLiveStart() {
                    getData(pageSize , pageNow , pageSort , function (res) {
                        totalCount = res.total;
                        if(res.result.length<1){
                            $list.html('<div style="height: 1rem;line-height: 1rem;font-size: 0.24rem;color:#888;text-align: center;border-bottom: 1px solid #f5f5f5;">直播尚未开始</div>');
                        }else{
                            $list.html(createListDom(res.result));
                            moreBtn();
                        }
                    });
                }
                function sortBtn(){
                    $('.liveStreamSort').on('click',function () {
                        var $this = $(this);
                        if($this.hasClass('desc') === true){
                            //列表切换成正序
                            $this.removeClass('desc').addClass('asc').find('i').html('正序');
                            pageNow = 1;
                            pageSort = 'asc';
                        }else{
                            //列表切换成倒序
                            $this.removeClass('asc').addClass('desc').find('i').html('倒序');
                            pageNow = 1;
                            pageSort = 'desc';
                        }
                        initLiveStart();
                    });
                }
                function popPic(){
                    function showPop(idx,arr){
                        var popDom ='';
                        popDom += '';
                        popDom += '<div class="gs-e3-pop-mask gepPop gepPopClose"></div>';
                        popDom += '<div class="gs-e3-pop-main gepPop gepPopClose">';

                        if(arr.length>1){
                            popDom += '<div class="gs-e3-pop-pics">';
                            popDom += '<div class="swiper-container gepPopSwp"><div class="swiper-wrapper">';
                            $.each(arr,function (i,item) {
                                popDom += '<div class="swiper-slide">';
                                popDom += '<img src="'+item+'_550.jpg" alt="LivePicPop">';
                                popDom += '</div>';
                            });
                            popDom += '</div></div>';
                            popDom += '</div>';
                        }else{
                            popDom += '<div class="gs-e3-pop-pic">';
                            popDom += '<img src="'+arr[0]+'_550.jpg" alt="LivePicPop">';
                            popDom += '</div>';
                        }

                        popDom += '<div class="gs-e3-pop-bar">';
                        popDom += '<a class="gs-e3-pop-back gepPopClose"></a>';
                        popDom += '<a class="gs-e3-pop-look gepPopLook" target="_blank" href="//www.gamersky.com/showimage/id_gamersky.shtml?'+arr[idx]+'_1920.jpg"></a>';
                        if(arr.length>1){
                            popDom += '<div class="swiper-pagination-custom"></div>'
                        }
                        popDom += '</div>';

                        popDom += '</div>';
                        $('body').append(popDom);
                        var $pop = $('.gepPop');
                        setTimeout(function () {
                            $pop.addClass('cur');
                        },50);
                        var popSwp = new Swiper('.gepPopSwp',{
                            initialSlide :idx,
                            pagination : '.swiper-pagination-custom',
                            paginationType : 'fraction',
                            onSlideChangeEnd: function(swiper){
                                $pop.find('.gepPopLook').attr('href','//www.gamersky.com/showimage/id_gamersky.shtml?'+arr[swiper.activeIndex]+'_1920.jpg');
                            }
                        });
                        $('.gepPopClose').on('click',function () {
                            $pop.removeClass('cur');
                            setTimeout(function () {
                                $pop.remove();
                            },250);
                        });
                        $pop.find('a').on('click',function (ev) {
                            ev.stopPropagation();
                        });
                    }
                    $list.on('click','.liveStreamPic',function () {
                        var $this = $(this),
                            $dad = $this.closest('.liveStreamPicList'),
                            picsListTmp = $dad.data('piclist'),
                            picsListArr,
                            idx = $this.data('idx');
                        picsListArr = picsListTmp.split(',');
                        showPop(idx,picsListArr);
                    });
                }
                function addComment(){
                    var $comm = LsMain.find('.liveStreamComment'),commDom = '';
                    commDom += '<div id="SOHUCS" sid="'+LsSelData.commentid+'"></div>';
                    $comm.html(commDom);
                    $.getScript('//j.gamersky.com/web2015/comment/wapjs/jquery.commentconfig.js?' + new Date().getTime());
                }
                initLiveStart();
                addTop();
                sortBtn();
                popPic();
                addComment();
            }
            function initNews(){
                var listDom = '',
                    $newsArea = $('.gsE3NewsArea'),
                    $news = $('.gsE3News'),
                    $moreBtn = $newsArea.find('.gsE3MoreBrief'),
                    LsSelData = LsData[bfSel],totalPage,initPage = 1,isLoading = false;
                function getListData(pg) {
                    var jsData = {
                        type: "getwapspecialpage",
                        isCache: true,
                        cacheTime: 60,
                        specialId: 3811,
                        isSpecialId: true,
                        templatekey: LsSelData.tmk,
                        page: pg
                    };
                    $.ajax({
                        type: "GET",
                        dataType: "jsonp",
                        url: "//db2.gamersky.com/LabelJsonpAjax.aspx",
                        data: {jsondata: JSON2.stringify(jsData)},
                        beforeSend: function() {
                            $moreBtn.addClass('loading').html('加载中');
                        },
                        success: function(data) {
                            if (data.status = 'ok') {
                                isLoading = false;
                                totalPage = data.totalPages;
                                var liHtml = data.body;
                                if(data.body.indexOf('没有任何记录')>0 && initPage === 1){
                                    liHtml = '<li style="text-align: center;line-height: 1.4rem;font-size: 0.24rem;color:#888;">没有任何记录</li>';
                                    $news.append(liHtml);
                                    $moreBtn.hide();
                                }else{
                                    $news.append(liHtml);
                                    $moreBtn.removeClass('loading').html('查看更多资讯');
                                    $(".cy_comment").cycm();
                                    if(initPage === totalPage){
                                        $moreBtn.addClass('loaded').html('全部加载完成');
                                    }
                                }
                            }
                        }
                    });
                }
                $moreBtn.on('click',function () {
                    if(isLoading === false){
                        isLoading = true;
                        initPage++;
                        if(initPage <= totalPage){
                            getListData(initPage);
                        }
                    }
                });
                //初始化
                getListData(initPage);
            }
            setNav();
            openTab();
            initLive();
            initNews();
        },
        getMoreList:function(){
            var $more = $('.gsE3More'),
                $area = $more.closest('.gsE3MoreArea'),
                $list = $area.find('.gsE3MoreList'),
                specId = $area.data('specialid'),
                specIs = $area.data('isspecialid'),
                specTmk = $area.data('templatekey'),
                totalPage,isLoading = false;
            function moreEvents() {
                var specPage = parseInt($area.attr('data-page'))+1;
                var jsData = {
                    type: "getwapspecialpage",
                    isCache: true,
                    cacheTime: 60,
                    specialId: specId,
                    isSpecialId: specIs,
                    templatekey: specTmk,
                    page: specPage
                };
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "//db2.gamersky.com/LabelJsonpAjax.aspx",
                    data: {jsondata: JSON2.stringify(jsData)},
                    beforeSend: function() {
                        $more.addClass('loading').html('加载中');
                    },
                    success: function(data) {
                        if (data.status = 'ok') {
                            totalPage = data.totalPages;
                            var liHtml = data.body;
                            $list.append(liHtml);
                            $more.removeClass('loading').html('查看更多资讯');
                            $(".cy_comment").cycm();
                            $area.attr('data-page',specPage);
                            if(specPage === totalPage){
                                $more.addClass('loaded').html('全部加载完成');
                            }else{
                                isLoading = false;
                            }
                        }
                    }
                });
            }
            $more.on('click',function () {
                if(isLoading === false){
                    isLoading = true;
                    moreEvents();
                }
            });

        },
        pagePosition:function(){
            var _this = this,$page = $('.gsE3Page'),pos = $page.data('pos'),
                $nav = $page.find('.gsE3Nav');
            // pos ： Index 首页 | Live 游民看E3 | Briefing 发布会
            $nav.find('.gsE3Nav'+pos).addClass('cur');
            if(pos === 'Index'){
                _this.swpTop();
                _this.swpList();
                _this.getWant();
                _this.getMoreList();
            }else if(pos === 'Live'){
                _this.getMoreList();
            }else if(pos === 'Briefing'){
                _this.BriefingInit();
            }
        },
        init:function () {
            this.pagePosition();
        }
    };
    e3.init();
})(jQuery);