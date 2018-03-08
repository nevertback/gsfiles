(function ($) {
    var wqj = {
        config:{
            lotteryId:18
        },
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
            if(sbie === true && ver < 10){
                $('body').append(ieWarning);
            }
        },
        getQueryString:function(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        pageCount:function (cid) {
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://click.gamersky.com/Common/GetHits.aspx",
                data: {
                    id: cid,
                    script: "3"
                },
                success: function(data) {}
            });
        },
        //首页PK
        pkFunc:function (dt,sldIdx) {
            function addPkCon(tar) {
                var rdDt = dt.group[tar],pkConDom = '';
                function addList(sel,idx) {
                    var listDt = dt[sel],listDom = '',btnTxt = '为支持的游戏投票';
                    if(dt[sel].state === 2){
                        btnTxt = '查看投票结果'
                    }
                    listDom += '<div style="padding-bottom:98px" class="pkb-item vtGetAll" data-vid="'+dt[sel].voteid+'">';
                    if(idx < 2){
                        listDom += '<div class="line"></div>';
                    }
                    listDom += '<div class="pkb-title">'+listDt.name+'</div>';
                    listDom += '<ul class="pkb-vts">';

                    $.each(dt[sel].items,function (i,item) {
                        if($.trim(item.pic.index) !== ''){
                            listDom += '<li class="vtGetArea" data-voteid="'+item.voteid+'" data-kuid="'+item.kuid+'"><div class="pkb-vts-infos">';
                            listDom += '<img src="'+item.pic.index+'" alt="'+item.names.chs+'">';
                            listDom += '<a target="_blank" href="http://www.gamersky.com/zhuanti/wqj2017/vote.shtml?wqjpageid='+sel+'"><span class="mask"></span><span class="tit">';
                            listDom += '<b>'+item.names.chs+'</b>';
                            listDom += '<i class="num">-</i><i>票</i>';
                            listDom += '</span></a>';
                            listDom += '</div>';
                            listDom += '<div class="progress"><i class="progressBar"></i></div>';
                            listDom += '</li>';
                        }
                    });

                    listDom += '</ul>';
                    listDom += '<a target="_blank" href="http://www.gamersky.com/zhuanti/wqj2017/vote.shtml?wqjpageid='+sel+'" class="pkb-btn">'+btnTxt+'</a>';
                    listDom += '</div>';
                    return listDom;
                }
                pkConDom += '<div class="container"><div class="clearfix pkb-items">';
                pkConDom += '';
                $.each(rdDt.prs,function (i,item) {
                    if(i>2){
                        $('#pkBox').css({'height':'auto','backgroundColor':'#272727'});
                    }else{
                        $('#pkBox').css({'height':'','backgroundColor':''});
                    }
                    /*
                    if(i===3){
                        pkConDom += '<h3 class="clearfix" style="margin-left: 37px;margin-bottom: 10px;padding-bottom: 30px;float: left;width: 1200px;font-size: 40px;color:#fff;text-align: center;border-bottom:1px solid #333;">1月8日开始</h3>';
                    }
                    */
                    pkConDom += addList(item,i);
                });
                pkConDom += '</div></div>';
                $('#pkBox').html(pkConDom).css('background-image','url('+rdDt.bg.pc+')');
            }
            function pkNavClk() {
                var $pkNav = $('.pkNav');
                $pkNav.on('click','li',function () {
                    var $this = $(this),idx = $this.index(),liLen = $pkNav.find('li').length,tar = $this.data('tar');
                    $pkNav.find('li').removeClass('cur');
                    $this.addClass('cur');
                    $($pkNav.find('li:gt('+idx+')')).insertBefore($pkNav.find('li').eq(0));
                    $($pkNav.find('li:lt(2)')).insertAfter($pkNav.find('li').eq(liLen-1));
                    if(tar === 'round5'){
                        $('#pkBox').slideUp(250);
                    }else{
                        addPkCon(tar);
                        $('#pkBox').slideDown(250);
                        addVtData();
                    }
                })
            }
            function zjyxVote() {
                var zjyxDom = '',dtf = dt.zjyx;
                zjyxDom += '<ul class="clearfix pkb-vt-list">';
                $.each(dtf.items,function (i,item) {
                    zjyxDom += '<li class="pkbVtGetArea pkb-vt-li'+i+'" data-voteid="'+item.voteid+'"><span><b>-</b><i>票</i></span></li>';
                });
                zjyxDom += '</ul>';
                $('#pkbVotes').html(zjyxDom);
                wqj.getVoteData(dtf.voteid,function (backdata) {
                    $.each(backdata.items,function (i,item) {
                        var vsid = item.Id,vsnum = item.TotalNumber,
                            itTar = $('.pkbVtGetArea[data-voteid='+vsid+']');
                        itTar.find('b').html(vsnum);
                    });
                });
            }
            function addVtData() {
                $('.vtGetAll').each(function () {
                    var $this = $(this),vid = $this.data('vid');
                    wqj.getVoteData(vid,function (backdata) {
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
                                itTar = $('.vtGetArea[data-voteid='+vsid+']');
                            itTar.find('.num').html(vsnum);
                            itTar.find('.progressBar').css('width',((vsnum - numMin)/numMax+numMin/numMax)*100 + '%');
                        });
                    });
                });
            }
            //导航
            pkNavClk();
            $('.trg'+sldIdx).trigger('click');
            zjyxVote();
        },
        //投票页
        addVotes:function (vtData) {
            var vtDt = vtData;
            //提示
            function createNote(txt) {
                var noteDom = '';
                noteDom += '<div class="vt-note"><span><i class="vt-note-l"></i><b>'+txt+'</b><i class="vt-note-r"></i></span></div>';
                return noteDom;
            }
            //奖项信息
            function vtDes() {
                var $des = $('#vtDes'),desDom = '';
                desDom += '<div class="title">'+vtData.name+'</div>';
                desDom += '<div class="time">评选时间：'+vtData.time+'</div>';
                desDom += '<div class="para"><p>'+vtData.des+'</p></div>';
                $des.html(desDom);
            }
            //投票list
            function voteList(voteState) {
                var $vtList = $('#vtList');
                function createLi(dt) {
                    var liDom = '';
                    liDom += '<div class="vt-item vtGetArea" data-voteid="'+dt.voteid+'" data-kuid="'+dt.kuid+'">';
                    liDom += '<div class="vt-area vtHover"><img src="'+dt.pic.pc+'" alt="'+dt.names.chs+'" class="vtg-pic">';
                    liDom += '<div class="vtg-infos">';
                    liDom += '<div class="vtg-zp">';
                    if(dt.kuid !== 0){
                        liDom += '<a target="_blank" href="'+dt.url+'" class="vtg-zp-btn"><i class="vtZpScore">-.-</i><span>游民众评</span></a>';
                    }
                    liDom += '</div>';

                    liDom += '<div class="vtg-top"><div class="vtg-des">';
                    if(dt.kuid !== 0){
                        liDom += '<div class="vtg-tits"><h4><a target="_blank" href="'+dt.url+'">'+dt.names.chs+'</a></h4>';
                        liDom += '<h5><a target="_blank" href="'+dt.url+'">'+dt.names.eng+'</a></h5></div>';
                    }else{
                        liDom += '<div class="vtg-tits"><h4>'+dt.names.chs+'</h4>';
                        liDom += '<h5>'+dt.names.eng+'</h5></div>';
                    }
                    liDom += '<div class="para"><p>'+dt.para+'</p></div></div></div>';

                    liDom += '<div class="vtg-mid">';
                    if(voteState === 1){
                        liDom += '<div class="vtg-num"><i class="vtNum">0</i><span>票</span></div><a class="vtg-btn vtgBtn"><i>+1</i>投 票</a></div>';
                    }else if(voteState === 0){
                        liDom += '<div class="vtg-num"><i class="vtNum">0</i><span>票</span></div><a class="vtg-btn vtg-btn-def vtgBtn">未开始</a></div>';
                    }else if(voteState === 2){
                        liDom += '<div class="vtg-num"><i class="vtNum">0</i><span>票</span></div></div>';
                    }

                    liDom += '</div></div>';

                    if($.trim(dt.buy) !== ''){
                        liDom += '<div class="vtg-bot"><div class="tg-buy">';
                        liDom += '<div class="tgb-plat tgb-plat-'+dt.plat.icon+'">'+dt.plat.txt+'</div>';
                        liDom += '<a target="_blank" href="'+dt.buy+'">购买</a></div></div>';
                    }

                    liDom += '</div>';
                    return liDom;
                }
                function createWin(dt) {
                    var winDom = '',$win = $('#vtWinners');
                    winDom += '<div class="vt-winners-box vtGetArea" data-voteid="'+dt.voteid+'" data-kuid="'+dt.kuid+'">';
                    winDom += '<img src="'+dt.winner.bg.pc+'" alt="'+dt.names.chs+'" class="vtw-bg">';
                    winDom += '<div class="vtw-shadow"></div>';
                    winDom += '<div class="vtw-con">';
                    winDom += '<div class="vtw-num"><span><b class="vtNum">0</b><i>票</i></span></div>';
                    winDom += '<div class="vtw-infos">';
                    if(dt.kuid !== 0) {
                        winDom += '<div class="vtw-tits"><h4><a target="_blank" href="' + dt.url + '">' + dt.names.chs + '</a></h4><h5><a target="_blank" href="' + dt.url + '">' + dt.names.eng + '</a></h5></div>';
                    }else{
                        winDom += '<div class="vtw-tits"><h4><a>' + dt.names.chs + '</a></h4><h5><a>' + dt.names.eng + '</a></h5></div>';
                    }
                    winDom += '<div class="vtw-attr" style="width: 270px;"><span>'+dt.winner.tag+'</span><span>'+dt.winner.time+'</span></div>';
                    if(dt.kuid !== 0){
                        winDom += '<div class="vtw-zp"><a target="_blank" href="'+dt.url+'" class="vtw-zp-btn"><span>游民众评：</span><b class="vtZpScore">-.-</b>（<i class="vtZpMebs">-</i>人评价）</a></div>';
                    }
                    if($.trim(dt.buy) !== ''){
                        winDom += '<div class="vtw-buy"><div class="tg-buy"><div class="tgb-plat tgb-plat-'+dt.plat.icon+'">'+dt.plat.txt+'</div><a target="_blank" href="'+dt.buy+'">购买</a></div></div>';
                    }
                    winDom += '';
                    winDom += '</div></div>';
                    winDom += '</div>';
                    $win.append(winDom);
                }
                function createList(dts) {
                    var listDom = '';
                    $.each(dts,function (i,item) {
                        if(voteState === 2&&item.winner !== false){
                            createWin(item)
                        }else{
                            listDom += createLi(item);
                        }
                    });
                    $vtList.html(listDom);
                }
                createList(vtData.items);
            }
            //获取众评评分
            function getZpScore(dts) {
                var kuidArr = [],getData = 'Idlist=';
                $.each(dts,function (i,item) {
                    kuidArr.push(item.kuid);
                });
                getData += kuidArr;
                $.ajax({
                    dataType:'jsonp',
                    url:'http://cm1.gamersky.com/apirating/getarrayrating',
                    data:getData,
                    success:function (data) {
                        if(data.status === 'ok'){
                            $.each(data.result,function (i,item) {
                                var zpScore = item.average+'',$tarArea = $('.vtGetArea[data-kuid="'+item.gameId+'"]');
                                if(zpScore.indexOf('.')<0){
                                    zpScore += '.0';
                                }
                                $tarArea.find('.vtZpScore').html(zpScore);
                                $tarArea.find('.vtZpMebs').html(item.times);
                            })
                        }

                    }
                });
            }
            //鼠标hover事件
            function liMouseEvent() {
                var dlTimer;
                $('.vtHover').on({
                    mouseenter:function () {
                        var $this = $(this);
                        dlTimer = setTimeout(function () {
                            $this.addClass('cur');
                        },120);
                    },
                    mouseleave:function () {
                        clearTimeout(dlTimer);
                        $(this).removeClass('cur');
                    }
                })
            }
            //投票结束元素
            function resCells() {
                var $title = $('#vtResTitle');
                $title.html(vtData.name);
            }
            function addVtData() {
                wqj.getVoteData(vtData.voteid,function (backdata) {
                    $.each(backdata.items,function (i,item) {
                        var vsid = item.Id,vsnum = item.TotalNumber,
                            itTar = $('.vtGetArea[data-voteid='+vsid+']');
                        itTar.find('.vtNum').html(vsnum);
                    });
                });
            }
            function vtBtnClk() {
                function voteSmt(tar) {
                    function insertPop(popCon,callback) {
                        var popDom = '';
                        popDom += '<div class="drawPop drawPopMask"></div>';
                        popDom += '<div class="drawPop drawPopCon">';
                        popDom += popCon;
                        popDom += '</div>';
                        $('body').append(popDom);
                        var popCon = $('.drawPopCon');
                        popCon.css('marginTop','-'+popCon.height()/2+'px');
                        if(typeof callback === 'function'){
                            callback('.drawPop');
                        }
                    }
                    function smtVote(uid) {
                        $.ajax({
                            type: "GET",
                            dataType: "jsonp",
                            url: "http://db5.gamersky.com/Vote/ShowVote.aspx",
                            data: {
                                json: "2",
                                userid:uid,
                                id: vtData.voteid,
                                vote: tar.closest('.vtGetArea').data("voteid")
                            },
                            success: function(responseJson) {
                                switch (responseJson.status) {
                                    case "ok":
                                        var numtar = tar.closest('.vtGetArea').find('.vtg-num i'),tmpNum = parseInt(numtar.html());
                                        numtar.html(tmpNum+1);
                                        tar.addClass('clksuccess');
                                        wqj.setNavNum();
                                        break;
                                    case "err":
                                        alert(responseJson.message);
                                        break;
                                }
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                alert("投票已经关闭！");
                            }
                        });
                    }
                    $.ajax({
                        type: "GET", dataType: "jsonp", url: "http://i.gamersky.com/api/logincheck",
                        success: function (responseJson) {
                            var uid = 0;
                            if (responseJson.status === "ok") {
                                uid = responseJson.userid;
                                smtVote(uid);
                            }else{
                                var unLoginDom = '';
                                unLoginDom += '<div class="dp-context">';
                                unLoginDom += '';
                                unLoginDom += '<div class="dpc-txt"><p>登陆后再投票每天可获得抽奖资格<span>（每参与一个奖项可获得一次抽奖资格）</span>，有机会抽取正版游戏激活码，优惠券等奖品，是否登陆？</p></div>';
                                unLoginDom += '<div class="draw-pop-btn-group"><a class="dp-btn-yellow dpbLogin">我要登录</a><a class="dpbClose">不必了</a></div>';
                                unLoginDom += '';
                                unLoginDom += '</div>';
                                insertPop(unLoginDom,function (tar) {
                                    var $pop = $(tar);
                                    $pop.find('.dpbClose').on('click',function () {
                                        $pop.remove();
                                        smtVote(uid);
                                    });
                                    $pop.find('.dpbLogin').on('click',function () {
                                        $('.QZshade,.QZlogin').show();
                                        $pop.remove();
                                    })
                                });
                            }
                        }
                    })
                }
                $(".vtgBtn").one('click',function(event) {
                    event.preventDefault();
                    var $this = $(this);
                    voteSmt($this);
                });
            }
            if(vtData.state === 0 || vtData.state === 1){
                $('#section-vote').addClass('zt-section-vote-ing');
                vtDes();
                $(createNote(vtData.note)).insertAfter($('#vtList'));
            }else if(vtData.state === 2){
                $('#section-vote').addClass('zt-section-vote-res');
                resCells();
                $(createNote('提名')).insertBefore($('#vtList'));
            }
            voteList(vtData.state);
            liMouseEvent();
            getZpScore(vtData.items);
            addVtData();
            if(vtData.state === 1){
                vtBtnClk();
            }
        },
        //投票页箭头切换
        voteArr:function (dt,sel) {
            var rdDt = dt.group[dt[sel].rd],
                arrLen = rdDt.prs.length,
                arrLeft = '',
                arrRight = '',
                arrDom = '';
            $.each(rdDt.prs,function (i,item) {
                if(item === sel){
                    var lnum = i + 1,rnum = i - 1;
                    if(lnum === arrLen){
                        lnum = 0;
                    }
                    if(rnum < 0){
                        rnum = arrLen - 1;
                    }
                    var leftId = rdDt.prs[lnum],
                        rightId = rdDt.prs[rnum];
                    arrLeft = '<a href="http://www.gamersky.com/zhuanti/wqj2017/vote.shtml?wqjpageid='+leftId+'" class="vt-arrs vt-arr-left"><span>'+dt[leftId].name+'</span></a>';
                    arrRight = '<a href="http://www.gamersky.com/zhuanti/wqj2017/vote.shtml?wqjpageid='+rightId+'" class="vt-arrs vt-arr-right"><span>'+dt[rightId].name+'</span></a>';
                }
            });
            arrDom = arrLeft + arrRight;
            $('#section-vote').append(arrDom)
        },
        //获取投票数据
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
        //插入圈子
        addClub:function (clubSet) {
            var clubDom = '';
            clubDom = '<div id="QZCMT" clubId="'+clubSet[0]+'" topicId="'+clubSet[1]+'" topic="'+clubSet[2]+'" data-pageIndex="'+clubSet[3]+'"></div>';
            var fakeTxt = false;
            var clubUrl = 'http://i.gamersky.com/club/'+clubSet[0];
            if(clubSet[1] !== ''){
                clubUrl = 'http://i.gamersky.com/topic/'+clubSet[1]+'?club='+clubSet[0];
                fakeTxt = '<span class="join-txt">评论(</span><em class="join-num2">1029</em><span class="join-txt">条评论)</span>';
            }
            $('#clubMain').append(clubDom);
            $('#QZCMTouterTitleUrl').attr('href',clubUrl);
            $.getScript('http://j.gamersky.com/web2015/qzcomment/js/qzcmtconfig.js',function () {
                var $qzMain = $("#QZCMT");
                $qzMain.GetqzCmt(true);
                if(fakeTxt !== false){
                    $qzMain.find('.tit-join').html(fakeTxt);
                }
            });
        },
        //插入圈子右侧
        addClubRight:function () {
            var $cr = $('#clubRight'),rightDom = '';
            rightDom += '<div class="zcr-box zcr-box-draw"><div class="zcr-box-draw-txt">您有<span class="drawNum"></span>次抽奖机会<a target="_blank" href="http://www.gamersky.com/zhuanti/wqj2017/draw.shtml">点击抽奖</a></div></div>';
            rightDom += '<div class="zcr-box zcr-box-isyou">' +
                '    <div class="zcr-title">活动奖品</div>' +
                '    <div class="zcr-list zcr-gifts">' +
                '        <img src="http://image.gamersky.com/webimg13/zhuanti/wqj2017/pic/gifts2.png" alt="gifts" class="gifts">' +
                '        <ul>' +
                '            <li><i>1.</i><p><b>国行PS4 Slim十台，Xbox One S一台，任天堂Switch五台</b></p></li>' +
                '            <li><i>2.</i><p>《刺客信条：起源》，《尼尔》，《恶灵附身2》，《仁王》，《幽灵行动：荒野》等正版游戏共计超过1000款</p></li>' +
                '            <li><i>3.</i><p>雷蛇机械键盘，鼠标，耳麦共26个</p></li>' +
                '            <li><i>4.</i><p>官方正版游戏手办，T恤共36份</p></li>' +
                '            <li><i>5.</i><p>正版游戏折扣优惠券数千张</p></li>' +
                '        </ul>' +
                '        <a class="zcrListZk">展开</a>' +
                '    </div>' +
                '</div>';
            rightDom += '<div class="zcr-box">' +
                '    <div class="zcr-title">获奖规则</div>' +
                '    <div class="zcr-list cur">' +
                '        <ul>' +
                '            <li><i>1.</i><p>玩家注册或登录游民帐号，每天来参与评选奖项的投票，就可以赢得一次抽奖资格；有机会赢得正版 游戏激活码，游民商城宝石等丰富礼品。</p></li>' +
                '            <li><i>2.</i><p>玩家在玩儿趣奖的主页、投票页及结果页，<span>发表有关年度游戏评选、提名游戏及最终结果的评论</span>，就有机会赢得官方正版游戏T恤，游戏手柄。</p></li>' +
                '            <li><p>此外，我们也将<span>从这些评论中挑选优质评论送出奖品</span>，包括正版3A游戏，游戏手办等游戏周边，甚至是微软索尼任天堂主机！</p></li>' +
                '        </ul>' +
                '        <h5>发奖时间如下：</h5>' +
                '        <p>12月21日（正版游戏激活码50个，PS4 Slim一台）<br>' +
                '12月28日（Xbox One S一台，正版游戏激活码50个）<br>' +
                '1月4日（PS4 Slim一台，任天堂Switch一台，正版游戏激活码50个）<br>' +
                '1月12日（PS4 Slim五台，任天堂Switch三台，雷蛇黑寡妇蜘蛛机械键盘 5个）</p><p>&nbsp;</p>' +
                '        <h5>注意事项</h5>' +
                '        <ul>' +
                '            <li><i>1.</i><p>玩儿趣奖期间，不会有任何编辑以任何理由向您收取任何费用。</p></li>' +
                '            <li><i>2.</i><p>发奖后，我们会尽快发布公示贴，公布获奖名单。</p></li>' +
                '        </ul>' +
                '    </div>' +
                '</div>';
            $cr.html(rightDom);
            var isZk = false,zkBtn = $cr.find('.zcrListZk');
            function zk() {
                if(isZk === true){
                    zkBtn.closest('.zcr-list').removeClass('cur');
                    zkBtn.removeClass('cur').html('展开');
                    isZk = false;
                }else{
                    zkBtn.closest('.zcr-list').addClass('cur');
                    zkBtn.addClass('cur').html('收起');
                    isZk = true;
                }
            }
            zkBtn.on('click',zk);
        },
        cooperLogo:function () {
            var $logoCon = $('#cooperLogos');
            function createLi(dt,idx) {
                var liDom = '',liSty = '';
                if(idx < 2){
                    liSty = 'bigCooper'
                }
                if(dt.url === ''){
                    liDom += '<li class="'+liSty+'"><a style="cursor: default;"><img src="'+dt.pic+'" alt="'+dt.name+'"></a></li>';
                }else{
                    liDom += '<li class="'+liSty+'"><a target="_blank" href="'+dt.url+'" title="'+dt.name+'"><img src="'+dt.pic+'" alt="'+dt.name+'"></a></li>';
                }
                return liDom;
            }
            $.ajax({
                typeData:'Script',
                cache:true,
                url:'http://j.gamersky.com/zhuanti/wqj2017/coopers.data.js',
                success:function () {
                    var backData = wqjYrCoopersData,ulDom = '';
                    $.each(backData,function (i,item) {
                        ulDom += createLi(item,i);
                    });
                    $logoCon.html(ulDom);
                }
            });
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
        //浮动导航
        fixedNav:function (whpg,dt) {
            var fxDom = '';
            function npLis() {
                var npLiDom = '';
                $.each(dt.group,function (i,dtg) {
                    $.each(dtg.prs,function (i,item) {
                        if(typeof dt[item] === 'object'){
                            npLiDom += '<li><a href="http://www.gamersky.com/zhuanti/wqj2017/vote.shtml?wqjpageid='+item+'">'+dt[item].name+'</a></li>';
                        }
                    });
                });
                return npLiDom;
            }
            fxDom += '<div id="fixNav" class="fixNav fixNav-'+whpg+'">';
            fxDom += '<div class="nav-box"><a target="_blank" href="http://www.gamersky.com/zhuanti/wqj2017/draw.shtml" class="nav-draw"><span class="num"><b class="drawNum">0</b>次</span><span class="txt">投票获取抽奖机会</span></a></div>';
            fxDom += '<div class="nav-box navList"><a class="nav-btn"></a>';

            fxDom += '<div class="nav-pop"><div class="nav-pop-con">';
            fxDom += '<a target="_blank" href="http://www.gamersky.com/zhuanti/wqj2017/" class="np-home">返回玩儿趣奖专题首页</a>';
            fxDom += '<ul class="clearfix np-list">';
            fxDom += npLis();
            fxDom += '</ul>';
            fxDom += '</div></div>';
            fxDom += '</div>';
            fxDom += '</div>';
            $('body').append(fxDom);
            $('.navList').hover(function () {
                $(this).find('.nav-pop').addClass('cur');
            },function () {
                $(this).find('.nav-pop').removeClass('cur');
            });
            var fNv = $('#fixNav'),fNvTop = fNv.offset().top;
            wqj.setNavNum();
            function scrollFunc() {
                var $win = $(window),st = $win.scrollTop();
                if($win.width() < 1320){
                    fNv.hide();
                }else{
                    fNv.show();
                }
                if(st >= (fNvTop-($win.height()/2 - 40))){
                    fNv.addClass('cur');
                }else{
                    fNv.removeClass('cur');
                }
            }
            $(window).resize(scrollFunc).scroll(scrollFunc);
        },
        setNavNum:function () {
            var fxTimer;
            $.ajax({
                type: "GET", dataType: "jsonp", url: "http://i.gamersky.com/api/logincheck",
                success: function (responseJson) {
                    var uid = 0;
                    if (responseJson.status === "ok") {
                        uid = responseJson.userid;
                        var jsdata = {
                            jsondata:JSON2.stringify({
                                "action":"getlotterycount","userId":uid,"lotteryId": wqj.config.lotteryId
                            })
                        };
                        $.ajax({
                            dataType:'jsonp',
                            url:'http://db5.gamersky.com/LotteryAjax.aspx',
                            data:jsdata,
                            success:function (bdata) {
                                $('.nav-draw').addClass('cur');
                                $('.drawNum').html(bdata.result);
                                clearTimeout(fxTimer);
                                fxTimer = setTimeout(function () {
                                    $('.nav-draw').removeClass('cur')
                                },2000);
                            }
                        });
                    }
                }
            });
        },
        theMachine:function () {
            $.fn.slotMac = function (options) {
                var $this = $(this),smItems = '',loopTimes = options.loop,eachHeight = 94,
                    smItem = '<div class="dwm-prize-ico dwm-prize-ico1"></div><div class="dwm-prize-ico dwm-prize-ico2"></div><div class="dwm-prize-ico dwm-prize-ico3"></div><div class="dwm-prize-ico dwm-prize-ico4"></div><div class="dwm-prize-ico dwm-prize-ico5"></div><div class="dwm-prize-ico dwm-prize-ico6"></div>';
                smItems += '<div class="dwm-prize-wrap">';
                for(var i = 0;i<loopTimes;i++){
                    smItems += smItem;
                }
                smItems += '</div>';
                $this.html(smItems);
                var stopIco = options.active,topDe;
                topDe = eachHeight*6*(loopTimes-1) + eachHeight*stopIco;
                $this.find('.dwm-prize-wrap').animate({'top':'-'+topDe+'px'},options.speed,'easeOutCubic');

            };
            var theUserId = 0,drawlotteryId = wqj.config.lotteryId;
            var prizeIcos = {
                ico0:{
                    id:0,
                    name:'stn',
                    pid:[153,154,155]
                },
                ico1:{
                    id:1,
                    name:'xbx',
                    pid:[151]
                },
                ico2:{
                    id:2,
                    name:'ubi',
                    pid:[111]
                },
                ico3:{
                    id:3,
                    name:'zan50',
                    pid:[118]
                },
                ico4:{
                    id:4,
                    name:'zan100',
                    pid:[119]
                },
                ico5:{
                    id:5,
                    name:'cdk',
                    pid:[112,113,114,115,116,117,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150]
                }
            };
            function marqueeList() {
                var listOuter = $('#drawListOut'),
                    listInner = $('#drawListIn'),
                    outHeight = listOuter.height(),
                    inHeight = listInner.height(),inTop = 0;
                setInterval(function () {
                    inTop++;
                    if(inTop > inHeight/2){
                        inTop = 0;
                    }
                    listInner.css('top','-'+inTop+'px');
                },20);
            }
            function getDrawList() {
                var jsdata = {
                    jsondata:JSON2.stringify({
                        "action":"getwinningmessage","lotteryId": drawlotteryId
                    })
                };
                $.ajax({
                    dataType:'jsonp',
                    url:'http://db5.gamersky.com/LotteryAjax.aspx',
                    data:jsdata,
                    success:function (bdata) {
                        var listDom = '',listDt;
                        if(bdata.status === 'ok'){
                            listDt = bdata.result.reverse();
                            $.each(listDt,function (i,item) {
                                if(i<100){
                                    listDom += '<li>恭喜：'+item.userName+'，抽中'+item.prizeName+'</li>';
                                }
                            });
                            $('#drawList').find('ul').html(listDom+listDom);
                            marqueeList();
                        }
                    }
                });
            }
            //找到奖品属性
            function findPrizeAttr(pid) {
                var par,tarid = parseInt(pid);
                $.each(prizeIcos,function (idx,whc) {
                    $.each(whc.pid,function (i,item) {
                        if(item === tarid){
                            par = whc;
                        }
                    })
                });
                return par;
            }
            //未登录弹窗
            function unloginPop() {
                var unLoginDom = '';
                unLoginDom += '<div class="dp-context">';
                unLoginDom += '';
                unLoginDom += '<div class="dpc-txt"><p>登陆后再投票每天可获得抽奖资格<span>（每参与一个奖项可获得一次抽奖资格）</span>，有机会抽取正版游戏激活码，优惠券等奖品，是否登陆？</p></div>';
                unLoginDom += '<div class="draw-pop-btn-group"><a class="dp-btn-yellow dpbLogin">我要登录</a><a class="dpbClose">不必了</a></div>';
                unLoginDom += '';
                unLoginDom += '</div>';
                insertPop(unLoginDom,function (tar) {
                    var $pop = $(tar);
                    $pop.find('.dpbClose').on('click',function () {
                        $pop.remove();
                    });
                    $pop.find('.dpbLogin').on('click',function () {
                        $('.QZshade,.QZlogin').show();
                        $pop.remove();
                    })
                });
            }
            //前往抽奖提示
            function goVotePop() {
                var unLoginDom = '';
                unLoginDom += '<div class="dp-context">';
                unLoginDom += '';
                unLoginDom += '<div class="dpc-txt"><p>参与奖项投票才可抽奖哦~</p></div>';
                unLoginDom += '<div class="draw-pop-btn-group"><a target="_blank" href="http://www.gamersky.com/zhuanti/wqj2017/" class="dp-btn-yellow dpbGo">点击前往</a><a class="dpbClose">不必了</a></div>';
                unLoginDom += '';
                unLoginDom += '</div>';
                insertPop(unLoginDom,function (tar) {
                    var $pop = $(tar);
                    $pop.find('.dpbClose').on('click',function () {
                        $pop.remove();
                    });
                    $pop.find('.dpbGo').on('click',function () {
                        $pop.remove();
                    });
                });
            }
            //是否还有抽奖次数
            function lastChane(istxt,isShow) {
                var jsdata = {
                    jsondata:JSON2.stringify({
                        "action":"getlotterycount","userId":theUserId,"lotteryId": drawlotteryId
                    })
                };
                $.ajax({
                    dataType:'jsonp',
                    url:'http://db5.gamersky.com/LotteryAjax.aspx',
                    data:jsdata,
                    success:function (bdata) {
                        var tipsTxt = '';
                        if(bdata.status === 'ok' && parseInt(bdata.result) > 0){
                            tipsTxt = '你今天还有'+bdata.result+'次抽奖机会';
                            canClk = true;
                        }else{
                            canClk = false;
                            tipsTxt = '今天的机会用完啦，请明天再来哦~';
                            if(isShow === 'showPop'){
                                goVotePop();
                            }
                        }
                        if(istxt === false){
                            tipsTxt = '';
                        }
                        $('#drawTxt').html(tipsTxt);
                    }
                });
            }
            function isCanDraw(isShow) {
                $.ajax({
                    type: "GET", dataType: "jsonp", url: "http://i.gamersky.com/api/logincheck",
                    success: function (responseJson) {
                        var uid = 0;
                        if (responseJson.status === "ok") {
                            theUserId = responseJson.userid;
                            lastChane('',isShow);
                        }else{
                            if(isShow === 'showPop'){
                                unloginPop();
                            }
                        }
                    }
                })
            }
            function insertPop(popCon,callback) {
                var popDom = '';
                popDom += '<div class="drawPop drawPopMask"></div>';
                popDom += '<div class="drawPop drawPopCon">';
                popDom += popCon;
                popDom += '</div>';
                $('body').append(popDom);
                var popCon = $('.drawPopCon');
                popCon.css('marginTop','-'+popCon.height()/2+'px');
                if(typeof callback === 'function'){
                    callback('.drawPop');
                }
            }
            //随机0-5
            function randomNum() {
                var rmnum = parseInt(Math.random()*5);
                return rmnum;
            }
            //抽奖滚动
            function rotateSlot(s1,s2,s3,callback) {
                $('#dwmPrizes1').slotMac({
                    active  : s1,
                    loop : 5,
                    speed: 4000
                });
                $('#dwmPrizes2').slotMac({
                    active  : s2,
                    loop : 5,
                    speed: 5000
                });
                $('#dwmPrizes3').slotMac({
                    active  : s3,
                    loop : 5,
                    speed: 6000
                });
                if(typeof callback === 'function'){
                    setTimeout(function () {
                        callback();
                    },6100);
                }
            }
            //已中奖
            function slotComplt(dt) {
                var scDom = '',fpa = findPrizeAttr(dt.prizeId),
                    dpcDom = '',
                    noticeDom = '',
                    btnDom = '',
                    teleIptDom = '<div class="dpc-ipt"><input type="text" id="telePhoneIpt" placeholder="手机号码"></div>';
                if(fpa.name === 'ubi'){
                    dpcDom = '<div class="dpc-txt"><h5>恭喜您中奖啦！</h5><p>获得：<span>'+dt.prizeName+'</span></p><p>在下方输入手机号可将奖品发送至您手机</p>'+teleIptDom+'</div>';
                    noticeDom = '<div class="dpc-notice"><h5>注意事项</h5><p>1. 凭此优惠券可享受9折优惠（商城折扣期间可享受折上优惠），适用于除预购产品外的任何产品</p><p>2. 使用方法：登录育碧中文商城：<a target="_blank" href="http://ubi.li/45bqv">点击进入</a>（或登录Uplay客户端）-选择产品-浏览购物车-套用优惠码-结算（若已提交订单但未结算仍视为优惠码已使用，将无法再次套用，因此套用后一定要结算）</p><p>3. 有效期：2017年12月20日~2018年1月20日</p></div>';
                    btnDom = '<div class="draw-pop-btn-group"><a class="dp-btn-yellow dpbSmt">发送</a><a class="dpbClose">不需要</a></div>';
                }else if(fpa.name === 'zan50'||fpa.name === 'zan100'){
                    dpcDom = '<div class="dpc-txt"><h5>恭喜您中奖啦！</h5><p>获得：<span>'+dt.prizeName+'</span></p></div>';
                    noticeDom = '<div class="dpc-notice"><p>我们的工作人员会在7个工作日内将奖品发送至您的账户，请近期留意右上角的系统通知。</p></div>';
                    btnDom = '<div class="draw-pop-btn-group"><a class="dp-btn-yellow dpbClose">我知道了</a></div>';
                }else if(fpa.name === 'cdk'){
                    dpcDom = '<div class="dpc-txt"><h5>恭喜您中奖啦！</h5><p>获得：<span>'+dt.prizeName+'</span></p><p>在下方输入手机号可将奖品发送至您手机</p>'+teleIptDom+'</div>';
                    btnDom = '<div class="draw-pop-btn-group"><a class="dp-btn-yellow dpbSmt">发送</a><a class="dpbClose">不需要</a></div>';
                }else if(fpa.name === 'xbx'){
                    dpcDom = '<div class="dpc-txt"><h5>恭喜您中奖啦！</h5><p>获得：<span>'+dt.prizeName+'</span></p></div>';
                    noticeDom = '<div class="dpc-notice"><p>领取链接：<a target="_blank" href="https://taoquan.taobao.com/coupon/unify_apply.htm?sellerId=1621790841&activityId=58d4a6f4d90341749b233ede02ec3776">点击进入</a></p><p>使用链接：<a target="_blank" href="https://equity-vip.tmall.com/agent/mobile.htm?agentId=67499&_bind=true">点击进入</a></p></div>';
                    btnDom = '<div class="draw-pop-btn-group"><a class="dp-btn-yellow dpbClose">我知道了</a></div>';
                }else if(fpa.name === 'stn'){
                    dpcDom = '<div class="dpc-txt"><h5>恭喜您中奖啦！</h5><p>获得：<span>'+dt.prizeName+'</span></p></div>';
                    noticeDom = '<div class="dpc-notice"><p>领取链接：<a target="_blank" href="'+dt.custom+'">点击进入</a></p><p>使用链接：<a target="_blank" href="https://stnkb.taobao.com/shop/view_shop.htm?spm=a3113.8229484.coupon-list.11.ECIm9G&user_number_id=3192551134">点击进入</a></p></div>';
                    btnDom = '<div class="draw-pop-btn-group"><a class="dp-btn-yellow dpbClose">我知道了</a></div>';
                }
                scDom += '<div class="dp-context">';
                scDom += dpcDom;
                scDom += noticeDom;
                scDom += btnDom;
                scDom += '</div>';
                insertPop(scDom,function (tar) {
                    var $pop = $(tar);
                    $pop.find('.dpbSmt').on('click',function () {
                        var $tele = $('#telePhoneIpt');
                        if(wqj.verifIpt($tele.val(),'telephone') === false){
                            alert("请输入有效的手机号码！");
                            return;
                        }
                        var jsondata = { action: "getaward", prizeId: dt.prizeId, recordId: dt.recordId, phoneNumber: $tele.val(), userName: '', address: '' };
                        $.ajax({
                            type: "GET",
                            dataType: "jsonp",
                            url: 'http://db5.gamersky.com/LotteryAjax.aspx',
                            data: { jsondata: JSON2.stringify(jsondata) },
                            success: function (data) {
                                $pop.remove();
                                isCanDraw();
                            }
                        });
                    });
                    $pop.find('.dpbClose').on('click',function () {
                        $pop.remove();
                        isCanDraw();
                    });
                });
            }
            //未中奖
            function slotSorry() {
                var sorryDom = '';
                sorryDom += '<div class="dp-context">';
                sorryDom += '<div class="dpc-txt"><p class="center">感谢参与，再接再厉！</p></div>';
                sorryDom += '<div class="draw-pop-btn-group"><a class="dp-btn-default dpbClose">关闭</a></div>';
                sorryDom += '</div>';
                insertPop(sorryDom,function (tar) {
                    var $pop = $(tar);
                    $pop.find('.dpbClose').on('click',function () {
                        $pop.remove();
                        isCanDraw()
                    });
                });
            }
            function getPrize() {
                var res1 =0,res2 = 0,res3 = 0;
                res1 = randomNum();
                res2 = randomNum();
                res3 = randomNum();
                rotateSlot(res1,res2,res3,function () {
                    slotComplt('');
                });
                /*
                var getData = {
                    jsondata: JSON2.stringify({"action":"sweepstakes","userId":theUserId,"lotteryId": drawlotteryId})
                };
                $.ajax({
                    dataType:'jsonp',
                    url:'http://db5.gamersky.com/LotteryAjax.aspx',
                    data:getData,
                    success:function (backdata) {
                        var res1 =0,res2 = 0,res3 = 0;
                        if(backdata.status === 'ok'){
                            var backDt = backdata.result[0];
                            var wid = findPrizeAttr(backDt.prizeId).id;
                            res1 = wid;
                            res2 = wid;
                            res3 = wid;
                            rotateSlot(res1,res2,res3,function () {
                                slotComplt(backDt);
                            });
                        }else if(backdata.status === 'err' && backdata.result == '未中奖！'){
                            res1 = randomNum();
                            res2 = randomNum();
                            res3 = randomNum();
                            do
                            {
                                res3 = randomNum();
                            }
                            while (res1 === res2 && res2 === res3);
                            rotateSlot(res1,res2,res3,function () {
                                slotSorry();
                            });
                        }else if(backdata.status === 'err'){
                            alert(backdata.result);
                        }
                    }
                });
                 */
            }
            var canClk = false,btnTimer;
            isCanDraw();
            $('#drawBtn').on('click',function () {
                var $this = $(this);
                clearTimeout(btnTimer);
                $this.addClass('cur');
                getPrize();
                btnTimer = setTimeout(function () {
                    $this.removeClass('cur');
                },300)
            });
            getDrawList();
        },
        init:function () {
            var mjs = this,
                pageId = mjs.getQueryString('wqjpageid'),
                dataUrl = 'data/wqj.data.js',
                sldId = mjs.getQueryString('sldId');
            if(!pageId){
                pageId = 'index';
            }
            if(!sldId){
                sldId = 'r5';
            }
            $.getScript(dataUrl,function () {
                var wData = wjqData,selData = wData[pageId];
                mjs.pageCount(selData.countid);
                mjs.addClubRight();
                mjs.fixedNav(pageId,wData);
                if(pageId !== 'index'){
                    $('#vtBg').attr('src',wData.group[selData.rd].bg.pc);
                    mjs.addVotes(selData);
                    mjs.voteArr(wData,pageId);
                    var pageTitle = selData.name + ' 玩儿趣奖2017|游民星空';
                    document.title = pageTitle;
                    window._bd_share_config.common.bdText = pageTitle;
                    window._bd_share_config.common.bdDesc = pageTitle;
                }else{
                    mjs.pkFunc(wData,sldId);
                }
                mjs.addClub(selData.club);
            });
            mjs.cooperLogo();
            //if(this.lowIe(8) !== true){}
        },
        initDraw:function () {
            var mjs = this;
            mjs.pageCount(991687);
            mjs.cooperLogo();
            mjs.theMachine();
        }
    };
    wqj.isSbie();
    if($('#wqjDraw').length>0){
        wqj.initDraw();
    }else{
        wqj.init();
    }

})(jQuery);