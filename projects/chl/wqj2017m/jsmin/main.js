(function ($) {
    var wqj = {
        config:{
            lotteryId:18
        },
        getQueryString: function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        pageCount: function pageCount(cid) {
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://click.gamersky.com/Common/GetWapHits.aspx",
                data: {
                    id: cid,
                    script: "3"
                },
                success: function success(data) {}
            });
        },
        //pk
        pkFunc: function pkFunc(wdt) {
            var $sec = $('#vtPk'),
                pkDom = '',
                defRd = 'round4',
                grpDt = wdt.group[defRd];
            function ctSwp(dt, sel) {
                var swpDom = '',
                    listUrl = 'http://www.gamersky.com/zhuanti/wqj2017/mvt.shtml?wqjpageid=' + sel,
                    vtTime = dt.time,btnTxt = '投票',vtState = dt.state;
                vtTime = vtTime.replace(/-/g,'.');
                vtTime = vtTime.replace(/——/g,'-');
                if(vtState === 2){
                    btnTxt = '查看';
                }
                swpDom += '<div class="pkBox">';
                swpDom += '<div class="pkBox-title">';
                swpDom += '<i class="wqj-ico wqj-ico-' + sel + '-b"></i><div class="tits"><h4>' + dt.name + '</h4><h5>投票时间' + vtTime + '</h5></div>';
                swpDom += '<a target="_blank" href="' + listUrl + '" class="voteBtn">'+btnTxt+'</a>';
                swpDom += '</div>';
                if(vtState === 2){
                    swpDom += '<div class="pkBox-swp">';
                }else{
                    swpDom += '<div class="pkBox-swp pkBoxSwp">';
                }
                swpDom += '<div class="swiper-container pkBoxSwpItems"><div class="swiper-wrapper">';
                $.each(dt.items, function (i, item) {
                    var imgurl = item.pic.wap;
                    if(imgurl.indexOf('_b.')>0){
                        imgurl = imgurl.replace('_b.','.');
                    }
                    swpDom += '<div class="swiper-slide pkBoxSwpItem"><a target="_blank" href="' + listUrl + '"><img src="' + imgurl + '" alt="' + item.names.chs + '"></a></div>';
                });
                swpDom += '</div></div>';
                if(vtState === 2){
                    swpDom += '<a target="_blank" href="' + listUrl + '" class="pkBox-Mask">查看投票结果</a>';
                }
                swpDom += '';

                swpDom += '</div>';
                swpDom += '</div>';
                return swpDom;
            }
            function addSwp(rds) {
                var swpsDom = '';
                $.each(rds, function (i, item) {
                    swpsDom += ctSwp(wdt[item], item);
                });
                $('#pkBoxsCon').html(swpsDom);
            }
            pkDom += '<div class="clearfix pkNav">';
            pkDom += '<div class="line"></div>';
            pkDom += '<a class="nv1" data-tar="round1"><i></i><span>第一轮评选</span><b>结束</b></a>';
            pkDom += '<a class="nv2" data-tar="round2"><i></i><span>第二轮评选</span></a>';
            pkDom += '<a class="nv3" data-tar="round3"><i></i><span>第三轮评选</span></a>';
            pkDom += '<a class="nv4 cur" data-tar="round4"><i></i><span>第四轮评选</span></a>';
            pkDom += '</div>';
            pkDom += '<div class="pkBoxs">';
            pkDom += '<img src="' + grpDt.bg.wap + '" class="pkBoxBg">';
            pkDom += '<div id="pkBoxsCon"></div>';
            pkDom += '</div>';
            $sec.html(pkDom);
            addSwp(grpDt.prs);
            function openSwp() {
                $sec.find('.pkBoxSwp').each(function () {
                    var $this = $(this),
                        $swp = $this.find('.swiper-container'),
                        mySwiper = new Swiper($swp, {
                            slidesPerView: 'auto'
                        });
                });
            }
            function pkNavClk() {
                $sec.find('.pkNav').find('a').on('click', function () {
                    var $this = $(this),
                        tar = $this.data('tar');
                    $sec.find('.pkNav').find('a').removeClass('cur');
                    $this.addClass('cur');
                    addSwp(wdt.group[tar].prs);
                    openSwp();
                });
            }
            pkNavClk();
            openSwp();
        },
        //获取投票数据
        getVoteData: function getVoteData(voteid, callback) {
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://db2.gamersky.com/Vote/ShowVote.aspx",
                data: {
                    json: "1",
                    id: voteid
                },
                success: function success(responseJson) {
                    switch (responseJson.status) {
                        case "ok":
                            if (typeof callback === 'function') {
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
        //插入投票页
        addVotes: function addVotes(vtData, pid) {
            var vtDt = vtData;
            //提示
            function createNote(txt) {
                var noteDom = '';
                noteDom += '<div class="vt-note"><i class="vt-note-l"></i><span>' + txt + '</span><i class="vt-note-r"></i></div>';
                return noteDom;
            }
            //奖项信息
            function vtDes() {
                var $des = $('#vtDes'),
                    desDom = '';
                desDom += '<div class="wqj-ico wqj-ico-' + pid + '"></div>';
                desDom += '<div class="title">' + vtData.name + '</div>';
                desDom += '<div class="time">评选时间：' + vtData.time + '</div>';
                $des.html(desDom);
            }
            //投票list
            function voteList(voteState) {
                var $vtList = $('#vtList');
                function createLi(dt) {
                    var liDom = '';
                    liDom += '<div class="vt-item vtGetArea" data-voteid="' + dt.voteid + '" data-kuid="' + dt.kuid + '">';
                    liDom += '<div class="vt-area vtHover"><img src="' + dt.pic.wap + '" alt="' + dt.names.chs + '" class="vtg-pic"><div class="vtg-pic-mask"></div>';
                    liDom += '<div class="vtg-infos">';
                    if (dt.kuid !== 0) {
                        liDom += '<h4><a target="_blank" href="' + dt.url + '">' + dt.names.chs + '</a></h4>';
                        liDom += '<div class="vtg-zp"><a target="_blank" href="' + dt.url + '" class="vtg-zp-btn">游民众评：<i class="vtZpScore">-.-</i><span>（<b class="vtZpMebs">-</b>人评价）</span></a></div>';
                    } else {
                        liDom += '<h4><a>' + dt.names.chs + '</a></h4>';
                    }
                    if (voteState === 0) {
                        liDom += '<div class="vtg-num"><span><i class="vtNum">0</i>票</span><a class="vtg-btn vtgBtn">未开始</a></div>';
                    } else if (voteState === 1) {
                        liDom += '<div class="vtg-num"><span><i class="vtNum">0</i>票</span><a class="vtg-btn vtgBtn"><b>+1</b>投票</a></div>';
                    } else if (voteState === 2) {
                        liDom += '<div class="vtg-num"><span><i class="vtNum">0</i>票</span></div>';
                    }

                    liDom += '</div></div>';

                    if($.trim(dt.buy) !== ''){
                        liDom += '<div class="vtg-buy"><div class="tg-buy">';
                        liDom += '<div class="tgb-plat tgb-plat-' + dt.plat.icon + '">' + dt.plat.txt + '</div>';
                        liDom += '<a target="_blank" href="' + dt.buy + '">购买</a></div></div>';
                    }

                    liDom += '</div>';
                    return liDom;
                }
                function createWin(dt) {
                    var winDom = '',
                        $win = $('#vtWinners'),bgsty = '';
                    winDom += '<div class="vt-winners-box vtGetArea" data-voteid="' + dt.voteid + '" data-kuid="' + dt.kuid + '">';
                    winDom += '<img src="' + dt.winner.bg.wap + '" alt="' + dt.names.chs + '" class="vtw-bg">';
                    winDom += '<div class="vtw-shadow"></div>';
                    winDom += '<div class="vtw-con">';
                    winDom += '<div class="vtw-num"><span><b class="vtNum">0</b><i>票</i></span></div>';
                    winDom += '<div class="vtw-infos">';
                    winDom += '<div class="vtw-belong"><i class="wqj-ico wqj-ico-' + pid + '-b"></i>' + vtData.name + '</div>';
                    if (dt.kuid !== 0) {
                        winDom += '<div class="vtw-tits"><h4><a target="_blank" href="' + dt.url + '">' + dt.names.chs + '</a></h4>';
                        winDom += '<h5><a target="_blank" href="' + dt.url + '">' + dt.names.eng + '</a></h5>';
                        winDom += '</div>';
                        winDom += '<div class="vtw-attr"><span>' + dt.winner.tag + '</span><span>' + dt.winner.time + '</span></div>';
                        winDom += '<div class="vtw-zp"><a target="_blank" href="' + dt.url + '" class="vtw-zp-btn"><span>游民众评：</span><b class="vtZpScore">-.-</b>（<i class="vtZpMebs">-</i>人评价）</a></div>';
                    } else {
                        winDom += '<div class="vtw-tits"><h4><a>' + dt.names.chs + '</a></h4>';
                        if(dt.voteid === 3072 || dt.voteid === 3082 || dt.voteid === 3029){
                            bgsty = 'style="height:auto;padding-right:0.34rem"';
                        }else{
                            winDom += '<h5><a target="_blank" href="' + dt.url + '">' + dt.names.eng + '</a></h5>';
                        }
                        winDom += '</div>';
                        winDom += '<div class="vtw-attr" '+bgsty+'><span>' + dt.winner.tag + '</span><span>' + dt.winner.time + '</span></div>';
                    }
                    winDom += '</div>';
                    if($.trim(dt.buy) !== ''){
                        winDom += '<div class="vtw-buy"><div class="tg-buy"><div class="tgb-plat tgb-plat-' + dt.plat.icon + '">' + dt.plat.txt + '</div><a target="_blank" href="' + dt.buy + '">购买</a></div></div>';
                    }
                    winDom += '';
                    winDom += '</div>';
                    winDom += '</div>';
                    $win.append(winDom);
                }
                function createList(dts) {
                    var listDom = '';
                    $.each(dts, function (i, item) {
                        if (voteState === 2 && item.winner !== false) {
                            createWin(item);
                        } else {
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
            function addVtData() {
                wqj.getVoteData(vtData.voteid, function (backdata) {
                    $.each(backdata.items, function (i, item) {
                        var vsid = item.Id,
                            vsnum = item.TotalNumber,
                            itTar = $('.vtGetArea[data-voteid=' + vsid + ']');
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
                                        $(".gsZpPopLoginClose,.gs_zp_pop_login").show();
                                        $('.gsZpPopLoginClose').on('click', function () {
                                            $(".gs_zp_pop_login,.gsZpPopLoginClose").hide();
                                        });
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
            if (vtData.state === 0 || vtData.state === 1) {
                $('#sectionVt').addClass('section-vt-ing');
                vtDes();
                $(createNote(vtData.note)).insertAfter($('#vtList'));
            } else if (vtData.state === 2) {
                $('#sectionVt').addClass('section-vt-res');
                //resCells();
                $(createNote('提名')).insertBefore($('#vtList'));
            }
            voteList(vtData.state);
            getZpScore(vtData.items);
            addVtData();
            if (vtData.state === 1) {
                vtBtnClk();
            }
        },
        //投票页箭头切换
        voteArr: function voteArr(dt, sel) {
            var rdDt = dt.group[dt[sel].rd],
                arrLen = rdDt.prs.length,
                arrLeft = '<a href="?wqjpageid=rpgyx" class="vt-arrs vt-arr-left"><span></span></a>',
                arrRight = '<a href="?wqjpageid=sjyx" class="vt-arrs vt-arr-right"><span></span></a>',
                arrDom = '';
            $.each(rdDt.prs, function (i, item) {
                if (item === sel) {
                    var lnum = i + 1,
                        rnum = i - 1;
                    if (lnum === arrLen) {
                        lnum = 0;
                    }
                    if (rnum < 0) {
                        rnum = arrLen - 1;
                    }
                    var leftId = rdDt.prs[lnum],
                        rightId = rdDt.prs[rnum];
                    arrLeft = '<a href="http://www.gamersky.com/zhuanti/wqj2017/mvt.shtml?wqjpageid=' + leftId + '" class="vt-arrs vt-arr-left"><i class="wqj-ico wqj-ico-' + leftId + '-b"></i><span>' + dt[leftId].name + '</span></a>';
                    arrRight = '<a href="http://www.gamersky.com/zhuanti/wqj2017/mvt.shtml?wqjpageid=' + rightId + '" class="vt-arrs vt-arr-right"><i class="wqj-ico wqj-ico-' + rightId + '-b"></i><span>' + dt[rightId].name + '</span></a>';
                }
            });
            arrDom = arrLeft + arrRight;
            $('#arrArea').append(arrDom);
        },
        //插入圈子
        addClub: function addClub(clubSet) {
            var clubDom = '';
            clubDom = '<div id="QZCMT" clubId="' + clubSet[0] + '" topicId="' + clubSet[1] + '" topic="' + clubSet[2] + '" data-pageIndex="' + clubSet[3] + '"></div>';
            $('#clubMain').append(clubDom);
            $.getScript('http://j.gamersky.com/web2015/qzcomment/js/qzcmtconfig.wap.js');
        },
        cooperLogo: function cooperLogo() {
            var $logoCon = $('#cooperLogos');
            function createLi(dt) {
                var liDom = '';
                if (dt.url === '') {
                    liDom += '<li><a><img src="' + dt.pic + '" alt="' + dt.name + '"></a></li>';
                } else {
                    liDom += '<li><a target="_blank" href="' + dt.url + '" title="' + dt.name + '"><img src="' + dt.pic + '" alt="' + dt.name + '"></a></li>';
                }
                return liDom;
            }
            $.ajax({
                typeData: 'Script',
                cache: true,
                url: 'http://j.gamersky.com/zhuanti/wqj2017/coopers.data.js',
                success: function success() {
                    var backData = wqjYrCoopersData,
                        ulDom = '';
                    $.each(backData, function (i, item) {
                        ulDom += createLi(item);
                    });
                    $logoCon.html(ulDom);
                }
            });
        },
        addRules: function(btnData) {
            var $cr = $('#vtRule'),
                rightDom = '',resBtn = '';
            if(btnData){
                resBtn = '<a target="_blank" href="'+btnData.url+'" class="zcr-res-btn">'+btnData.txt+'</a>';
            }
            rightDom += '<div class="zcr-box zcr-box1"><h3 class="title">奖品阵容</h3><div class="zcr-con">';
            rightDom += '<p><b>国行PS4 Slim十台，Xbox One S一台，任天堂Switch五台</b></p>' + '<p>正版游戏《刺客信条：起源》，《尼尔》，《幽灵行动：荒野》，《仁王》，《恶灵附身2》等共计超过1000款\n</p>' + '<p>雷蛇机械键盘，鼠标，耳麦共26个,官方正版游戏手办，T恤共36份，正版游戏折扣优惠券数千张</p></div></div>';
            rightDom += '<div class="zcr-box zcr-box2">' + '<h3 class="title">活动规则</h3>' + '    <div class="zcr-list cur">' + '        <ul>' + '            <li><p>1.玩家注册或登录游民帐号，每天来参与评选奖项的投票，就可以赢得一次抽奖资格；有机会赢得正版 游戏激活码，游民商城宝石等丰富礼品。</p></li>' + '            <li><p>2.玩家在玩儿趣奖的主页、投票页及结果页，<span>发表有关年度游戏评选、提名游戏及最终结果的评论</span>，就有机会赢得官方正版游戏T恤，游戏手柄。</p></li>' + '            <li><p>此外，我们也将<span>从这些评论中挑选优质评论送出奖品</span>，包括正版3A游戏，游戏手办等游戏周边，甚至是微软索尼任天堂主机！</p></li>' + '        </ul>' + '        <h5>发奖时间如下：</h5>' + '        <p>12月21日（正版游戏激活码50个，PS4 Slim一台）<br>' + '12月28日（Xbox One S一台，正版游戏激活码50个，马里奥疯兔手办4个）<br>' + '1月4日（PS4 Slim一台，任天堂Switch一台，正版游戏激活码50个）<br>' + '1月12日（PS4 Slim五台，任天堂Switch三台，雷蛇黑寡妇蜘蛛机械键盘 5个）</p>' + '        <h5>注意事项</h5>' + '        <ul>' + '            <li><p>1.玩儿趣奖期间，不会有任何编辑以任何理由向您收取任何费用。</p></li>' + '            <li><p>2.发奖后，我们会尽快发布公示贴，公布获奖名单。</p></li>' + '        </ul>' + '    </div><a class="zcrListZk">展开全部</a>' + '</div>';
            rightDom += resBtn;
            $cr.html(rightDom);
            var isZk = false,
                zkBtn = $cr.find('.zcrListZk');
            function zk() {
                if (isZk === true) {
                    zkBtn.closest('.zcr-box').find('.zcr-list').addClass('cur');
                    zkBtn.removeClass('cur').html('展开全部');
                    isZk = false;
                } else {
                    zkBtn.closest('.zcr-box').find('.zcr-list').removeClass('cur');
                    zkBtn.addClass('cur').html('收起');
                    isZk = true;
                }
            }
            zkBtn.on('click', zk);
        },
        //返回PC页
        backPc: function backPc(pid) {
            var $tar = $('.ymw-btns-pc'),
                comUrl = 'http://www.gamersky.com/zhuanti/wqj2017/vote.shtml';
            comUrl += '?wqjpageid=' + pid + '&tag=wap';
            $tar.attr('href', comUrl);
        },
        addBack: function addBack() {
            var backTopDom = '';
            backTopDom += '<a class="backToTop" id="backToTop"></a>';
            backTopDom += '<a target="_blank" href="http://www.gamersky.com/zhuanti/wqj2017/mdraw.shtml" class="navDraw"></a>';
            $('body').append(backTopDom);
            var $btb = $('#backToTop');
            $btb.on('click', function () {
                $('html,body').animate({ scrollTop: 0 }, 200);
            });
            function scrollFunc() {
                var $win = $(window),
                    st = $win.scrollTop();
                if (st >= $win.height()) {
                    $btb.addClass('cur');
                } else {
                    $btb.removeClass('cur');
                }
            }
            $(window).resize(scrollFunc).scroll(scrollFunc);
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
        setNavNum:function () {
            var fxTimer;
            $('.navDraw').addClass('cur');
            clearTimeout(fxTimer);
            fxTimer = setTimeout(function () {
                $('.navDraw').removeClass('cur')
            },2000);
        },
        theMachine:function () {
            $.fn.slotMac = function (options) {
                var $this = $(this),smItems = '',loopTimes = options.loop,eachHeight = 0.94,
                    smItem = '<div class="dwm-prize-ico dwm-prize-ico1"></div><div class="dwm-prize-ico dwm-prize-ico2"></div><div class="dwm-prize-ico dwm-prize-ico3"></div><div class="dwm-prize-ico dwm-prize-ico4"></div><div class="dwm-prize-ico dwm-prize-ico5"></div><div class="dwm-prize-ico dwm-prize-ico6"></div>';
                smItems += '<div class="dwm-prize-wrap">';
                for(var i = 0;i<loopTimes;i++){
                    smItems += smItem;
                }
                smItems += '</div>';
                $this.html(smItems);
                var stopIco = options.active,topDe;
                topDe = eachHeight*6*(loopTimes-1) + eachHeight*stopIco;
                $this.find('.dwm-prize-wrap').animate({'top':'-'+topDe+'rem'},options.speed,'easeOutCubic');
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
                            listDt = bdata.result;
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
                        $(".gsZpPopLoginClose,.gs_zp_pop_login").show();
                        $('.gsZpPopLoginClose').on('click', function () {
                            $(".gs_zp_pop_login,.gsZpPopLoginClose").hide();
                        });
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
            }
            var canClk = false,btnTimer;
            isCanDraw();
            $('#drawBtn').on('click',function () {
                var $this = $(this);
                clearTimeout(btnTimer);
                $this.addClass('cur');
                if(canClk === true){
                    canClk = false;
                    getPrize();
                }else{
                    isCanDraw('showPop');
                }
                btnTimer = setTimeout(function () {
                    $this.removeClass('cur');
                },300)
            });
            getDrawList();
        },
        init: function init() {
            var mjs = this,
                pageId = mjs.getQueryString('wqjpageid'),
            dataUrl = 'data/wqj.data.js';
            if (!pageId) {
                pageId = 'index';
            }
            $.getScript(dataUrl, function () {
                var wData = wjqData,
                    selData = wData[pageId];
                mjs.pageCount(selData.countid);
                if (pageId !== 'index') {
                    if (selData.state === 0 || selData.state === 1) {
                        $('#vtBg').attr('src', wData.group[selData.rd].bg.wap);
                    } else if (selData.state === 2) {
                        $('#vtBg').remove();
                    }
                    mjs.backPc(pageId);
                    mjs.addVotes(selData, pageId);
                    if(pageId === 'zjyx'){
                        $('#arrArea').hide();
                        mjs.addRules();
                    }
                    if(pageId !== 'zjyx'){
                        mjs.voteArr(wData, pageId);
                        if(wData.group[wData[pageId].rd].btn && wData[pageId].state === 2){
                            mjs.addRules(wData.group[wData[pageId].rd].btn);
                        }else{
                            mjs.addRules();
                        }
                    }
                    var pageTitle = selData.name + ' 玩儿趣奖2017|游民星空';
                    document.title = pageTitle;
                    window._bd_share_config.common.bdText = pageTitle;
                    window._bd_share_config.common.bdDesc = pageTitle;
                } else {
                    mjs.pkFunc(wData);
                    mjs.addRules(wData.group['round3'].btn);
                }
                mjs.addClub(selData.club);
            });
            mjs.cooperLogo();
            mjs.addBack();
        },
        initDraw:function () {
            var mjs = this;
            mjs.pageCount(991687);
            mjs.cooperLogo();
            mjs.theMachine();
        }
    };
    function initPage() {
        if($('.gsZpPop').length < 1 ){
            $.ajax({
                dataType:'Script',
                url:'http://j.gamersky.com/wap/component/loginpop/login.wap.pop.js',
                cache:true,
                success:function () {
                    $.componentLoginPop(640);
                }
            });
        }
        if($('#wqjDraw').length>0){
            wqj.initDraw();
        }else{
            wqj.init();
        }
    }
    if(typeof JSON2 === 'undefined'){
        $.getScript('http://j.gamersky.com/g/lib/jquerys/jquery.json2.js',function () {
            initPage();
        });
    }else{
        initPage();
    }
})(jQuery);