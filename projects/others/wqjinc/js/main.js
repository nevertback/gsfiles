(function($){
    var wqj = {
        config:{
            mainArea:'#wqjIndexMain',
            datafrom:'http://j.gamersky.com/zhuanti/wqj2017/wqj.data.js',
            cssfrom:'http://j.gamersky.com//zhuanti/wqj2017/index/style.css?20171221001',
            lotteryId:18,
            url:'http://www.gamersky.com/zhuanti/wqj2017/',
            title:'年度最佳游戏评选',
            getDt:'zjyx',
            defSelect:0
        },
        tab:function (tar) {
            var $tab = $(tar),$box = $tab.find('.wiBox');
            $box.find('.wiItem').eq(wqj.config.defSelect).addClass('acted');
        },
        insertMain:function (dt,sel) {
            var cfg = this.config,$main = $(cfg.mainArea),mainDom = '';
            mainDom += '<a target="_blank" href="'+cfg.url+'" class="wi-title" style="margin-bottom: 6px;height: 110px;background-image:url(http://image.gamersky.com/webimg13/zhuanti/wqj2017/index/wi-top20180111.png);background-position:0 -8px;"><span style="padding-top: 60px;">'+cfg.title+'</span></a>';
            mainDom += '<div class="wi-tab wiTab" id="wqjIndexTab" style="height: 233px;">';
            mainDom += '<div class="wi-box wiBox">';
            mainDom += '<div class="wi-item wiItem wiVoteMain" data-vid="'+dt[sel].voteid+'">';
            $.each(dt[sel].items,function (i,wili) {
                if($.trim(wili.pic.index) !== ''){
                    mainDom += '<div class="wi-li wiLi wiVoteEach" data-voteid="'+wili.voteid+'"><a title="'+wili.names.chs+'" target="_blank" href="http://www.gamersky.com/zhuanti/wqj2017/vote.shtml?wqjpageid='+sel+'" class="wi-li-con"><img src="'+wili.pic.index+'" alt=""><i class="wi-mask"></i><i class="wi-dot"></i><span class="wi-bar wiBar"><i></i></span><span class="wi-tit">'+wili.names.chs+'</span><span class="wi-vt"><b class="wiVoteNum">-</b>票</span></a><div class="wi-zhedang"></div><a target="_blank" href="http://www.gamersky.com/zhuanti/wqj2017/vote.shtml?wqjpageid='+sel+'" class="wi-btn wiVoteBtn">查看</a></div>';
                }
            });
            mainDom += '</div>';

            mainDom += '</div>';
            mainDom += '</div>';
            $main.html(mainDom);
            var sbie = $.browser.msie,
                ver = parseInt($.browser.version);
            if(sbie === true && ver <= 6){
                $main.addClass('vtIe6');
            }
            wqj.tab('#wqjIndexTab');
            $('.wiVoteMain').each(function () {
                var vid = $(this).data('vid');
                wqj.addVtData(vid);
            });
        },
        addVtData:function (vid) {
            wqj.getVoteData(vid,function (backdata) {
                $.each(backdata.items,function (i,item) {
                    var numArr = [],numMax,numMin;
                    for(var j=0;j<backdata.items.length;j++){
                        numArr.push(backdata.items[j].TotalNumber)
                    }
                    numMax = Math.max.apply(null,numArr);
                    numMin = Math.min.apply(null,numArr);
                    if(numMax === 0){
                        numMax = 1;
                    }
                    $.each(backdata.items,function (i,item) {
                        var vsid = item.Id,vsnum = item.TotalNumber,
                            itTar = $('.wiVoteEach[data-voteid='+vsid+']');
                        itTar.find('.wiVoteNum').html(vsnum);
                        itTar.find('.wiBar i').css('width',((vsnum - numMin)/numMax+numMin/numMax)*100 + '%');
                    });
                });
            });
        },
        getData:function () {
            var that = this;
            $.ajax({
                dataType:'Script',
                url:that.config.datafrom,
                cache:false,
                success:function () {
                    that.insertMain(wjqData,that.config.getDt);
                }
            });
        },
        getVoteData:function(voteid,callback){
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://db2.gamersky.com/Vote/ShowVote.aspx",
                data: {
                    json: "1",
                    id: voteid
                },
                success: function(responseJson) {
                    switch (responseJson.status) {
                        case "ok":
                            if(typeof callback === 'function'){
                                callback(responseJson);
                            }
                            break;
                        case "err":
                            alert(responseJson.message);
                            break;
                    }
                }
            });
        },
        init:function () {
            var csslink = '<link rel="stylesheet" href="'+this.config.cssfrom+'" >';
            $('head').append(csslink);
            this.getData();
        }
    };
    $(function () {
        wqj.init();
    });
})(jQuery);
