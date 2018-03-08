/*
 * 1114,1166,1381行插入：con = '<p>'+con.replace(/\n/g,'</p><p>')+'</p>';
 */
'use strict';
(function ($) {
    var baseRem = $(window).width() / 7.2;
    var isHere = false;
    var zpJs = {
        baseSld: function baseSld(sld) {
            var mySld = new Swiper(sld, {
                slidesPerView: 'auto',
                freeMode: true,
                freeModeSticky: true
            });
        },
        infiniteLoad: function infiniteLoad() {
            var isLoad = true;
            function scrollLoad() {
                //todo:ajax请求数据后，将isLoad设置为true可继续触发无限加载，false则停止;
                var $navcur = $("#gsZpTabNav a").eq(1);
                var $kulistnav = $("#gsKuListNav");
                var $sxcondition = $("#sxCondition");
                if ($navcur.length > 0) {
                    var navindex = $("#gsZpTabNav a.cur").index();
                    switch (navindex) {
                        case 1: if (parseInt($navcur.find("i").html()) > 0 && isLoad) { isLoad = false; $("#remarkFilter").GetCommet(); } break;
                        case 2: if (isLoad) { isLoad = false; $("#gsZpTabNav").KuLoadMoreFun(); } break;
                        case 3: if (isLoad) { isLoad = false; $("#gsZpTabNav").KuLoadMoreFun(); } break;
                    }
                }
                if ($kulistnav.length > 0 && isLoad) {
                    $kulistnav.find("a.cur").GameIndexListFun();
                }
                if ($sxcondition.length > 0 && isLoad) {
                    $("#wapSearchGame").SearchGameMore();
                }
            }
            function scrollJudge() {
                var st = $(window).scrollTop(),
                    dh = $(document).height(),
                    wh = $(window).height();
                if (st + wh > dh - 150) {
                    isLoad = true;
                    scrollLoad();
                }
            }
            $(window).scroll(scrollJudge);
        },
        zpTab: function () {
            var $navPos = $('#gsZpTabNavPos'), $nav = $('#gsZpTabNav'), btn = $nav.find('a'), $item = $('#gsZp').find('.gs_zp_item');
            btn.on('click', function (e) {
                e.preventDefault();
                if ($(this).hasClass("cur")) { return; }
                var num = $(this).index();
                btn.removeClass('cur');
                $(this).addClass('cur');
                $item.removeClass('cur');
                $item.eq(num).addClass('cur');
                $('html,body').animate({ scrollTop: $navPos.offset().top + 'px' }, 0);
                if (num == 1) { $("#remarkFilter").GetCommet(); }
            });
            //详情页 更多按钮
            $('.btnDetailMore').on('click', function (e) {
                e.preventDefault();
                if ($(this).hasClass("cur")) { return; }
                var num = $(this).data('tar');
                btn.removeClass('cur');
                btn.eq(num).addClass('cur');
                $item.removeClass('cur');
                $item.eq(num).addClass('cur');
                $('html,body').animate({ scrollTop: $navPos.offset().top + 'px' }, 0);
                $("#remarkFilter").attr("pageIndex", 1).attr("scrollpagination", true);
                if (num == 1) { $("#remarkFilter").GetCommet(); }
            })
        },
        pz: function pz() {
            var $pz = $('#pzMain'),
                $nav = $pz.find('.swp_nav'),
                $con = $pz.find('.swp_con'),
                swp = 'zpPzSwp',
                pzOri = $con.find('.pz_data'),
                tjData = pzOri.find('.TJ'),
                tjCon = $con.find('.pz_copy').find('.PZXQ');
            function doData() {
                $con.find('li.tit').remove();
                tjData.remove();
                tjCon.html(tjData);
            }
            doData();
            var pzSwp = new Swiper('#' + swp, {
                autoHeight: true,
                onInit: function onInit() {
                    $nav.find('a').eq(0).addClass('cur');
                },
                onSlideChangeStart: function onSlideChangeStart() {
                    $nav.find('a').removeClass('cur');
                    $nav.find('a').eq(pzSwp.activeIndex).addClass('cur');
                }
            });
            $nav.find('a').on('touchstart mousedown', function (e) {
                e.preventDefault();
                $nav.find('a').removeClass('cur');
                $(this).addClass('cur');
                pzSwp.slideTo($(this).index());
            });
            $nav.find('a').click(function (e) {
                e.preventDefault();
            });
        },
        glAll: function glAll(isRio) {
            var $pz = $('#glAllMain'),
                $nav = $pz.find('.swp_nav'),
                $con = $pz.find('.swp_con'),
                swp = 'glAllSwp';
            var pzSwp = new Swiper('#' + swp, {
                autoHeight: true,
                resistanceRatio: isRio ? 0.85 : 0,
                onInit: function onInit() {
                    $nav.find('a').eq(0).addClass('cur');
                },
                onSlideChangeStart: function onSlideChangeStart() {
                    $nav.find('a').removeClass('cur');
                    $nav.find('a').eq(pzSwp.activeIndex).addClass('cur');
                }
            });
            $nav.find('a').on('touchstart mousedown', function (e) {
                e.preventDefault();
                $nav.find('a').removeClass('cur');
                $(this).addClass('cur');
                pzSwp.slideTo($(this).index());
            });
            $nav.find('a').click(function (e) {
                e.preventDefault();
            });
        },
        glCol: function glCol() {
            //控制攻略集是否显示
            var $col = $('#gsStrategyCollect'),
                dataUrl = $col.data('html');
            $col.find('.collectbox').show();
            if ($col.find('.gs_sc_item').length <= 0) {
                $('#glAllMain').find('.swp_nav').remove();
                $col.closest('.swiper-slide').remove();
                zpJs.glAll();
            } else {
                //如显示执行切换动画
                zpJs.glAll(true);
                $col.find('.gs_sc_item').each(function () {
                    $(this).find('a').each(function () {
                        var $this = $(this),
                            wapHref = $this.attr('waphref');
                        if (wapHref) {
                            $this.attr('href', wapHref);
                            $this.removeAttr('target');
                        }
                    });
                });
            }
        },
        glNews: function glNews() {
            var $gl = $("#gszpglnews");
            var $news = $(".gs_zp_new");
            if ($gl.find(".gs_zp_list_cw li").length <= 0) {
                $(".glnewslist").find(".waplist").html("");
                $gl.find(".gs_zp_list_cw").html("").find("a").remove();
                $gl.find(".btnDetailMore").remove();
            }
            if ($news.find(".gs_zp_list_tw li").length <= 0) {
                $news.find("a").remove();
            }
        },
        peiZhi: function peiZhi() {
            var $that = $("#pzMain");
            if ($that.find(".PZXQ li").length <= 0) {
                $that.find(".swp_nav a").eq(1).remove();
                $that.find(".swp_nav a").eq(1).remove();
            }
            if ($('#pzMain').find(".swp_nav a").length > 1) {
                zpJs.pz();
            }
        },
        btnOpenClose: function btnOpenClose(con, hideHeight, moreBtn, unit, callback1, callback2) {
            var ramNum = new Date().getTime();
            moreBtn = moreBtn + ramNum;
            moreBtn = moreBtn + parseInt(Math.random() * 1000000);
            function needOpen() {
                var conHeight;
                if (unit === 'rem') {
                    conHeight = con.height() / baseRem;
                } else {
                    conHeight = con.height();
                }

                if (conHeight > hideHeight) {
                    if (con.find(".gs_zp_btn_zk").length <= 0) {
                        con.css({ 'max-height': hideHeight + unit, 'overflow': 'hidden' }).addClass('hideMoreContent');
                        $('<a class="gs_zp_btn_zk ' + moreBtn + '">展开</a>').insertAfter(con);
                        openClk();
                    }
                }
            }
            function openClk() {
                var $btn = $('.' + moreBtn),
                    isOpen = false;
                $btn.on('click', function () {
                    if (isOpen === false) {
                        con.css({ 'max-height': '', 'overflow': '' }).removeClass('hideMoreContent');
                        $(this).addClass('cur').html('收起');
                        isOpen = true;
                        if (typeof callback1 === 'function') {
                            callback1 && callback1();
                        }
                    } else {
                        con.css({ 'max-height': hideHeight + unit, 'overflow': 'hidden' }).addClass('hideMoreContent');
                        $(this).removeClass('cur').html('展开');
                        isOpen = false;
                        if (typeof callback2 === 'function') {
                            callback2 && callback2();
                        }
                    }
                });
            }
            needOpen();
        },
        btnOpenCloseComm: function (con, hideHeight, moreBtn, unit) {
            var ramNum = new Date().getTime();
            moreBtn = moreBtn + ramNum;
            moreBtn = moreBtn + parseInt(Math.random() * 1000000);
            function needOpen() {
                var conHeight;
                if (unit === 'rem') {
                    conHeight = con.height() / baseRem;
                } else {
                    conHeight = con.height();
                }

                if (conHeight > hideHeight) {
                    if (con.parent().find(".gs_zp_btn_zk").length < 1) {
                        con.addClass('hideTxt');
                        $('<a class="gs_zp_btn_zk ' + moreBtn + '">展开</a>').insertAfter(con);
                        openClk();
                    }
                }
            }
            function openClk() {
                var $btn = $('.' + moreBtn),
                    isOpen = false;
                $btn.on('click', function () {
                    if (isOpen === false) {
                        con.removeClass('hideTxt');
                        $(this).addClass('cur').html('收起');
                        isOpen = true;
                    } else {
                        con.addClass('hideTxt');
                        $(this).removeClass('cur').html('展开');
                        isOpen = false;
                    }
                });
            }
            needOpen();
        },
        remarkFilter: function remarkFilter() {
            var $flt = $('#remarkFilter'),
                btnSort = $flt.find('.remark_filter_sort'),
                btnFlt = $flt.find('.cly_show'),
                btnFltClk = true;
            btnSort.find('a').on('click', function () {
                btnSort.find('a').removeClass('cur');
                $(this).addClass('cur');
                //todo:根据最热、最新重新排序
                $("#remarkFilter").attr("pageIndex", 1).attr("scrollpagination", true).GetCommet();
            });
            //todo:根据全部、想玩、玩过重新排序
            btnFlt.on('click', function () {
                if (btnFltClk) {
                    $flt.find('.cly_option').addClass('cur');
                    btnFltClk = false;
                } else {
                    $flt.find('.cly_option').removeClass('cur');
                    btnFltClk = true;
                }
            });
            $flt.find('.cly_option').find('a').on('click', function () {
                var $this = $(this),
                    loadType = $this.attr("loadtype"),
                    txt = $this.html();
                btnFlt.html(txt);
                btnFlt.attr("loadtype", loadType);
                $flt.find('.cly_option').removeClass('cur');
                btnFltClk = true;
                $("#remarkFilter").attr("pageIndex", 1).attr("scrollpagination", true).GetCommet();
            });
            if(zpJs.judgeSellTime() === true){
                setTimeout(function () {
                    $flt.find('.cly_option').find('a').eq(0).trigger('click');
                },500);
            }
        },
        remarkReply: function remarkReply(options) {
            return $(options).each(function () {
                var $this = $(this);
                function getFisPara(tar) {
                    var para = tar, paraTxt;
                    $(para).find('p').each(function () {
                        var tt = $(this).text();
                        if ($.trim(tt) != '') {
                            paraTxt = tt;
                            return false;
                        }
                    });
                    return paraTxt;
                }
                $this.off('tap').on('tap', function () {
                    $(".remark_pop_msk,.remark_pop_reply").remove();
                    logincheck(function (responseJson) {
                        if (responseJson.status == 'ok') {
                            var replyContent = '', replyUserName = '', popDom = '', cmtId = 0;
                            if ($this.hasClass("remark_inner_reply")) {
                                cmtId = $this.closest(".mycomment").find('.comm_infos').attr("cmtId");
                                replyContent = getFisPara($this.closest(".mycomment").find('.comm_con'));
                                replyUserName = $this.closest(".mycomment").find('.comm_infos').attr('replyusername');
                            } else {
                                cmtId = $this.closest(".remark_inner_floor").attr("cmtId");
                                replyContent = getFisPara($this.closest(".remark_inner_floor").find('.remark_ir_issue'));
                                replyUserName = $this.closest(".remark_inner_floor").find('.remark_ir_name i').html();
                            }
                            if (replyContent == undefined) {
                                cmtId = $this.closest(".remark_floor").attr("cmtId");
                                replyContent = getFisPara($this.closest(".remark_floor").find('.issue'));
                                replyUserName = $this.closest(".remark_floor").find('.remark_user span').eq(0).html();
                            }
                            if (replyContent == undefined) {
                                cmtId = $this.closest(".mycomment").find('.comm_infos').attr("cmtId");
                                replyContent = getFisPara($this.closest(".mycomment").find('.comm_con'));
                                replyUserName = $this.closest(".mycomment").find('.comm_infos').attr('replyusername');
                            }
                            popDom += '<div class="remark_pop remark_pop_msk"></div>';
                            popDom += '<div class="remark_pop remark_pop_reply">';
                            popDom += '<div class="remark_pop_reply_head">';
                            popDom += '<a class="head_pic"><img class="headpic"  src="http://image.gamersky.com/webimg15/comment/anonymous.jpg" alt="head"></a><div class="head_txt"><div class="tit">回复<span>' + replyUserName + '</span></div><p>' + replyContent + '</p></div>';
                            popDom += '</div>';
                            popDom += '<div class="remark_pop_reply_con"><div class="fake_textarea" contenteditable="true"></div><textarea cmtId=' + cmtId + ' class="remark-textarea" placeholder="写点什么吧"></textarea></div>';
                            popDom += '<div class="remark_pop_reply_foot"><a class="btn_cancel">取消</a><a class="btn_submit" data-click="false">提交</a></div>';
                            popDom += '</div>';
                            $('body').append(popDom);
                            $(".remark_pop_reply").find(".headpic").loginStatus();
                            $('.btn_cancel').on('tap', function () {
                                $('.remark_pop').remove();
                            });
                            $('.btn_submit').on('click', function () {
                                var $this = $(this);
                                if ($this.attr("data-click") == "false") {
                                    $this.attr("data-click", true).ReplyCommet();
                                }

                            });
                        }
                        else {
                            $('.ymw-loginpopMsk,.ymw-loginpop').remove();
                            $(".ymw-loginpop-btns").insertYmwLoginPop();
                            $(".ymw-loginpop-btns").QZloginForm();
                            return;
                        }
                    })

                });
            })
        },
        remarkAdd: function remarkAdd() {
            isHere = false;
            var zpDataList = ['渣作，不玩也罢', '平庸，索然无味', '一般，普普通通', '佳作，值得一玩', '神作，不容错过'];
            function touchStar(main) {
                var $zps = main.find('.gs_zp_star'),
                    zpBtn = $zps.find('a'),
                    zpTxt = $zps.find('.gs_zp_txt');
                function getPos(e) {
                    if (e.originalEvent.targetTouches[0] !== undefined && e.originalEvent.targetTouches[0].pageX !== undefined) {
                        e.pageX = e.originalEvent.targetTouches[0].pageX;
                    }
                    if (e.originalEvent.targetTouches[0] !== undefined && e.originalEvent.targetTouches[0].pageY !== undefined) {
                        e.pageY = e.originalEvent.targetTouches[0].pageY;
                    }
                    return e;
                }
                function selectStar(sn) {
                    zpBtn.each(function (i) {
                        if (i <= sn) {
                            $(this).addClass('cur');
                            zpTxt.html(zpDataList[sn]);
                        }
                    });
                }
                function touchSelectStars(e) {
                    var $ys = $zps,
                        ysw = zpBtn.width() * 5 + 0.14 * baseRem * 4,
                        ysl = $ys.offset().left;
                    var posx = getPos(e).pageX - ysl;
                    var slnum = parseInt(posx / ysw * 10 / 2);
                    var starIndex = slnum > 4 ? 4 : slnum;
                    zpBtn.removeClass('cur');
                    selectStar(starIndex < 0 ? 0 : starIndex);
                }

                $zps.on({
                    'touchstart': function touchstart(e) {
                        touchSelectStars(e);
                    },
                    'touchmove': function touchmove(e) {
                        e.preventDefault();
                        touchSelectStars(e);
                    },
                    'touchend': function touchend(e) {
                        e.preventDefault();
                        var selectIndex = $zps.find('a.cur').index() + 1;
                        $zps.submitMyScore(selectIndex);
                    }
                });
            }
            function showPop(popType) {
                var popDom = '';
                popDom += '<div class="remark_pop remark_pop_msk"></div>';
                popDom += '<div class="remark_pop remark_pop_reply">';
                popDom += '<div class="remark_pop_reply_head">';
                popDom += '<a class="head_pic"><img class="headpic" src="http://image.gamersky.com/webimg15/comment/anonymous.jpg" alt="head"></a>';
                popDom += '<div class="head_radio"><a class="btnAddRemark  cur" data-type="7" data-isclk="true">想玩</a><a class="btnAddRemark" data-type="8" data-isclk="true">玩过</a></div>';
                popDom += '</div>';
                popDom += '<div class="remark_pop_reply_con">';
                popDom += '<div class="played_block" style="display: none;"><div class="clearfix gs_zp_star" fromdevice="1"><a data-txt="渣作，不玩也罢" class="stars"></a><a data-txt="平庸，索然无味" class="stars"></a><a data-txt="一般，普普通通" class="stars"></a><a data-txt="佳作，值得一玩" class="stars"></a><a data-txt="神作，不容错过" class="stars"></a><div class="gs_zp_txt"></div></div><div class="clearfix pop_platform platform"></div></div>';
                popDom += '<div class="fake_textarea" contenteditable="true"></div><textarea class="remark-textarea" placeholder="写点什么吧"></textarea>';
                popDom += '</div>';
                popDom += '<div class="remark_pop_reply_foot"><a class="btn_cancel">取消</a><a class="btn_submit">提交</a></div>';
                popDom += '</div>';
                $(".remark_pop_msk,.remark_pop_reply").remove();
                $('body').append(popDom);
                $(".headpic").loginStatus();
                $(".pop_platform").html($("#platform").html());
                var $pop = $('.remark_pop_reply');
                var con = $(".mycomment .comm_con").html();
                if (con != '' && con != undefined) {
                    $pop.find(".btn_submit").addClass("edit");
                }
                touchStar($pop);

                if (popType === '7') {
                    $pop.find('.head_radio').find('a').removeClass('cur');
                    $pop.find('.head_radio').find('a').eq(0).addClass('cur');
                    $pop.find('.played_block').hide();
                    $(".gs_zp_star a,.pop_platform span").removeClass("cur");
                } else if (popType === '8') {
                    $pop.find('.head_radio').find('a').removeClass('cur');
                    $pop.find('.head_radio').find('a').eq(1).addClass('cur');
                    $pop.find('.played_block').show();
                    if ($pop.find('.platform').find('span').length == 1) {
                        $pop.find('.platform').find('span').addClass("cur");
                    }
                }
                $pop.find('.btn_cancel').on('click', function () {
                    $('.remark_pop').hide();
                });
                $('.remark_pop_msk').on('click', function () {
                    $('.remark_pop').hide();
                });
                $pop.find('.platform').find('span').on('click', function () {
                    var $a = $(this);
                    $a.hasClass('cur') ? $a.removeClass('cur') : $a.addClass('cur');
                });
                $pop.find('.head_radio').find('a').on('click', function () {
                    var $this = $(this),
                        btnType = $this.data('type'),
                        //是否可点击
                        isClk = $this.data('isclk');
                    if (btnType == 8 && $(".dataTime").attr("date-selltime") == "未上市") {
                        return;
                    }
                    if (isClk) {
                        $pop.find('.head_radio').find('a').removeClass('cur');
                        $this.addClass('cur');
                        if (btnType === 7) {
                            $(".gs_zp_star a,.pop_platform span").removeClass("cur");
                            $pop.find('.played_block').hide();
                            $pop.find(".gs_zp_txt").text('');
                        } else if (btnType === 8) {
                            $pop.find('.played_block').show();
                            if ($pop.find('.platform').find('span').length == 1) {
                                $pop.find('.platform').find('span').addClass("cur");
                            }
                        }
                        $this.addwanFun();
                    }
                });
                $pop.find('.btn_submit').on('click', function () {
                    var $that = $(this);

                    var $platform = $pop.find(".platform").find("span.cur"), pfhtml = "";
                    $platform.each(function () {
                        var $this = $(this);
                        pfhtml += $this.text() + "、";
                    });
                    if ($that.hasClass("edit")) {
                        pfhtml = pfhtml.substring(0, pfhtml.length - 1);
                        $pop.find(".platform").AddPlatform(pfhtml, function (response) {
                            if (response.status != '') {
                                $that.ModifyCommet();
                            }
                        });
                    }
                    else {
                        if (pfhtml != '') {
                            pfhtml = pfhtml.substring(0, pfhtml.length - 1);
                            $pop.find(".platform").AddPlatform(pfhtml, function (response) {
                                if (response.status != '') {
                                    $that.AddCommet();
                                }
                            });
                        }
                        else {
                            $that.AddCommet();
                        }
                    }
                });
            }
            $('.btnAddRemark').off('click').on('click', function (event) {
                event.preventDefault();
                var $this = $(this), $type = $this.attr('data-type');
                if ($this.hasClass("stop")) { alert("该游戏未上市！"); return false; }
                logincheck(function (responseJson) {
                    if (responseJson.status == 'ok') {
                        var $pop = $('.remark_pop_reply');
                        if ($pop.length == 0) {
                            isHere = false;
                        }
                        if ($this.hasClass("addreview")) {
                            isHere = false;
                        }
                        if (!$this.hasClass("addreview")) { $this.addwanFun(); }
                        if (isHere == false) {
                            showPop($type);
                            isHere = true;
                        } else {
                            if ($type !== undefined && $type === '7') {
                                $pop.find('.head_radio').find('a').removeClass('cur');
                                $pop.find('.head_radio').find('a').eq(0).addClass('cur');
                                $pop.find('.played_block').hide();
                                $(".gs_zp_star a,.pop_platform span").removeClass("cur");
                                $pop.find(".gs_zp_txt").text('');
                            } else if ($type !== undefined && $type === '8') {
                                $pop.find('.head_radio').find('a').removeClass('cur');
                                $pop.find('.head_radio').find('a').eq(1).addClass('cur');
                                $pop.find('.played_block').show();
                                if ($pop.find('.platform').find('span').length == 1) {
                                    $pop.find('.platform').find('span').addClass("cur");
                                }
                            }
                            $('.remark_pop').show();
                        }
                        var con = $(".mycomment .comm_con").html();
                        if (con != '' && con != undefined) {
                            var cmtId = $(".mycomment .comm_infos").attr("cmtid");
                            $(".fake_textarea").html(con);
                            $(".remark-textarea").attr("cmtId", cmtId);
                            $pop.find(".btn_submit").addClass("edit");
                            //$('.remark_pop_reply').find('.fake_textarea').html(con);
                        }
                        if ($type === '8') {
                            $('.remark_pop_reply').find(".gs_zp_star").getMyRating();
                            $('.remark_pop_reply').find(".platform").GetPlatform();
                        }
                    }
                    else {
                        $(".ymw-loginpop-btns").insertYmwLoginPop();
                        $(".ymw-loginpop-btns").QZloginForm();
                        return;
                    }
                });
            });
            $('.btnAddStarRemark').off('click').on('click', function (event) {
                event.preventDefault();
                var $this = $(this), $num = $this.data('num');
                logincheck(function (responseJson) {
                    if (responseJson.status == 'ok') {
                        if ($(".dataTime").attr("date-selltime") == "未上市") { return; }
                        if (!$(".btngroup .played ").hasClass("cur")) {
                            $(".btngroup .played ").addClass("cur").siblings().removeClass("cur");
                            $(".btnAddRemark.cur").addwanFun();
                        }
                        if (isHere === false) {
                            showPop('8');
                            isHere = true;
                            var $pop = $('.remark_pop_reply');
                            $pop.find('.stars').removeClass('cur');
                            $pop.find('.stars:lt(' + ($num + 1) + ')').addClass('cur');
                            $pop.find('.gs_zp_txt').html(zpDataList[$num]);
                        } else {
                            var $pop = $('.remark_pop_reply');
                            $pop.find('.head_radio').find('a').removeClass('cur');
                            $pop.find('.head_radio').find('a').eq(1).addClass('cur');
                            $pop.find('.played_block').show();
                            $('.remark_pop').show();
                            $pop.find('.stars').removeClass('cur');
                            $pop.find('.stars:lt(' + ($num + 1) + ')').addClass('cur');
                            $pop.find('.gs_zp_txt').html(zpDataList[$num]);
                        }
                        var con = $(".mycomment .comm_con").html();
                        if (con != '' && con != undefined) {
                            var cmtId = $(".mycomment .comm_infos").attr("cmtid");
                            //$(".remark-textarea").val(con.replace(/<br>/g, "\n"));
                            $('.fake_textarea').html(con);
                            $(".remark-textarea").attr("cmtId", cmtId);
                            $pop.find(".btn_submit").addClass("edit");
                        }
                        $this.submitMyScore($num + 1);
                        $pop.find(".platform").GetPlatform();
                    }
                    else {
                        $(".ymw-loginpop-btns").insertYmwLoginPop();
                        $(".ymw-loginpop-btns").QZloginForm();
                        return;
                    }
                })

            });
        },
        scrollEvents: function scrollEvents(initDt, sels) {
            var st = $(window).scrollTop();
            function gsZpNav() {
                if (st >= initDt.navTop) {
                    sels.nav.addClass('cur');
                } else {
                    sels.nav.removeClass('cur');
                }
            }
            gsZpNav();
        },
        openBigPics: function openBigPics(tar) {
            var $btn = $(tar).find('.btnBigImg'),
                imglist = [];
            $btn.each(function (i) {
                var $this = $(this),
                    eachPic = $this.data('bigpic');
                imglist.push(eachPic);
                $this.attr('data-idx', i);
            });
            function showBigPic(idx, origin) {
                var popDom = '';
                popDom += '<div class="bigpic_pop bigpic_pop_msk bigpicPopClose"></div>';
                popDom += '<div class="bigpic_pop bigpic_pop_con bigpicPopClose">';
                popDom += '<div class="swiper-container sld" id="bigpicSld">';
                popDom += '<div class="swiper-wrapper">';

                $.each(imglist, function (i, item) {
                    popDom += '<div class="swiper-slide">';
                    popDom += '<img src="' + item + '" alt="pics">';
                    popDom += '</div>';
                });
                popDom += '</div></div>';
                popDom += '<div class="swiper-pagination"></div><a class="bigpic_pop_origin" target="_blank" href="' + origin + '">查看原图</a>';
                popDom += '<a class="bigpic_pop_close bigpicPopClose"></a>';
                popDom += '</div>';
                $('body').append(popDom);
                var mySld = new Swiper('#bigpicSld', {
                    autoHeight: true,
                    initialSlide: idx,
                    pagination: '.swiper-pagination',
                    paginationType: 'fraction'
                });
                $('.bigpicPopClose').on('click', function () {
                    $('.bigpic_pop').remove();
                });
            }
            $btn.on('click', function () {
                var $this = $(this),
                    idx = $this.data('idx'),
                    origin = $this.data('origin');
                showBigPic(idx, origin);
            });
        },
        kuList: function kuList() {
            var $kuList = $('#gsKuList'),
                $nav = $kuList.find('.gs_ku_list_nav').find('.gs_ku_list_nav_btns'),
                $con = $kuList.find('.gs_ku_list_con'),
                swp = 'kuListSwp';
            var pzSwp = new Swiper('#' + swp, {
                autoHeight: true,
                onInit: function onInit() {
                    $nav.find('a').eq(0).addClass('cur');
                },
                onSlideChangeStart: function onSlideChangeStart() {
                    $nav.find('a').removeClass('cur');
                    $nav.find('a').eq(pzSwp.activeIndex).addClass('cur');
                },
                onSlideChangeEnd: function onSlideChangeStart() {
                    $('html,body').animate({ scrollTop: 0 }, 100);
                }
            });
            $nav.find('a').on('touchstart mousedown', function (e) {
                e.preventDefault();
                $nav.find('a').removeClass('cur');
                $(this).addClass('cur');
                pzSwp.slideTo($(this).index());
            });
            $nav.find('a').click(function (e) {
                e.preventDefault();
            });
        },
        sxCondition: function () {
            var $sc = $('#sxCondition'), btnSxClk = true,
                $res = $('.ku_list_sx_fliter').find('.result'), $btn = $res.find('.sf_result');
            $sc.find('.swp').each(function () {
                var $this = $(this),
                    idx = $this.find('.swiper-slide').find('a.cur').closest('.swiper-slide').index();
                var mySld = new Swiper($this, {
                    initialSlide: idx,
                    slidesPerView: 'auto',
                    freeMode: true,
                    freeModeSticky: true
                });
            });
            $btn.on('click', function () {
                if (btnSxClk) {
                    $(this).addClass('cur');
                    $res.find('.sf_result_option').addClass('cur');
                    btnSxClk = false;
                } else {
                    $(this).removeClass('cur');
                    $res.find('.sf_result_option').removeClass('cur');
                    btnSxClk = true;
                }
            });
            $res.find('.sf_result_option').find('a').on('click', function () {
                $btn.removeClass('cur').find('i').html($(this).html());
                $res.find('.sf_result_option').removeClass('cur');
                btnSxClk = true;
            });
        },
        reSetSwpHeight: function reSetSwpHeight(tar) {
            var newHeight = tar.closest('.swiper-slide').height();
            tar.closest('.swiper-wrapper').css('height', newHeight);
        },
        hotRemark: function hotRemark(options) {
            var $this = $(options);
            var articleId = $this.attr("sid");
            if (articleId > 0) {
                var pageIndex = 1;
                var pageSize = 3;
                var foorPageSize = 3;
                var loadtype;
                if(zpJs.judgeSellTime() === true){
                    loadtype = 1;
                }else{
                    loadtype = 2;
                }
                var datetype = $this.attr("data-type");
                $.ajax({
                    type: "get", dataType: "jsonp", url: "http://cm1.gamersky.com/wapapi/getcomment",
                    data: { jsondata: JSON2.stringify({ dateType: datetype, loadType: loadtype, pageIndex: pageIndex, pageSize: pageSize, foorPageSize: foorPageSize, articleId: articleId }) },
                    success: function (data) {
                        if (data.status == "ok") {
                            var $html = "";
                            var data = $.parseJSON(data.body);
                            if (data.IsClose == true) {
                                $this.html("<i class='gs_nothing'>点评已关闭</i>");
                                return;
                            }
                            if (data.Comment != '' && data.Comment != null) {
                                $html = data.Comment + "<a class='gs_zp_btn_more btnDetailMore' data-tar='1'>+更多</a>";
                                $this.html($html);
                                $this.parents(".gs_zp_remark").siblings(".gs_zp_box_con").find(".btnDetailMore").html("+更多(" + data.AllCount + ")");
                            }
                            else {
                                $this.html("<i class='gs_nothing'>暂无评价</i>");
                                $this.parents(".gs_zp_remark").siblings(".gs_zp_box_con").find(".btnDetailMore").html("+更多");
                            }

                            $("#gsZpTabNav a").eq(1).find("i").text(data.AllCount);
                            $(".game_score_loading").remove();
                            $('.floormore').FloorMoreComment(3);
                            zpJs.remarkReply('.btnReplyRemark');
                            zpJs.zpTab();
                            $(".btn_reply").btnReplyFun();
                            $(".btn_like,.btn_unlike").addLike();
                            $(".btn_like").like();
                            $("#hotremark").find('.issue').each(function () {
                                zpJs.btnOpenCloseComm($(this), 6.32, 'btnFloorOpen', 'rem');
                            });
                            $("#hotremark").find('.remark_ir_issue').each(function () {
                                zpJs.btnOpenCloseComm($(this), 1.32, 'btnFloorInnerOpen', 'rem');
                            });
                        }
                    }
                });
            }
        },
        kuTags: function () {
            var tagSwp = new Swiper('#kuTags', {
                slidesPerView: 'auto',
                freeMode: true,
                freeModeSticky: true
            });
        },
        judgeSellTime:function () {
            //返回true 为已上市 返回false 为未上市
            var gameSellTime = false;
            function padleft0(obj) {
                return obj.toString().replace(/^[0-9]{1}$/, "0" + obj);
            };
            function checkEndTime(startTime, endTime) {
                if (typeof (startTime) == "undefined" || typeof (endTime) == "undefined") {
                    return;
                }
                var start = new Date(startTime.replace("-", "/").replace("-", "/"));
                var end = new Date(endTime.replace("-", "/").replace("-", "/"));
                if (end < start) {
                    return false;
                }
                return true;
            };
            function judgeTime(sellTime) {
                var reg = new RegExp("[\\u4E00-\\u9FFF]+");
                if (reg.test(sellTime)) {
                    return false;
                }
                else {
                    var myDate = new Date();
                    var year = myDate.getFullYear();
                    var month = myDate.getMonth() + 1;
                    var date = myDate.getDate();
                    var h = myDate.getHours();
                    var m = myDate.getMinutes();
                    var s = myDate.getSeconds();
                    var now = year + '-' + padleft0(month) + "-" + padleft0(date);
                    if (!checkEndTime(sellTime, now)) {
                        return false;
                    }
                }
                return true;
            };
            function checkMarketTime(div) {
                $(div).find("a").each(function () {
                    var $this = $(this);
                    var time = $this.attr("data-time");
                    if (judgeTime(time)) {
                        gameSellTime = true;
                        return;
                    }
                    else {
                        $(".dataTime").attr("date-selltime", "未上市");
                    }
                });
            };
            checkMarketTime(".pingtai");
            return gameSellTime;
        },
        render: function render() {
            var detSld = '#zpPicsSld';
            if ($('#gsKuList').length > 0) {
                zpJs.kuList();
            }
            if ($(detSld).length > 0) {
                zpJs.baseSld(detSld);
                zpJs.openBigPics(detSld);
            }
            var gameSld = '#zpGamesSld';
            if ($(gameSld).length > 0) {
                zpJs.baseSld(gameSld);
            }
            var mediaSld = '#zpMediaSld';
            if ($(mediaSld).length > 0) {
                zpJs.baseSld(mediaSld);
            }
            if ($('#glAllMain').length > 0) {
                zpJs.glCol();
            }
            if ($('#gszpglnews').length > 0) {
                zpJs.glNews();
            }
            if ($('#pzMain').length > 0) {
                zpJs.peiZhi();
            }
            if ($('#gsZpTabNav').length > 0) {
                zpJs.zpTab();
            }
            if ($('#remarkFilter').length > 0) {
                zpJs.remarkFilter();
            }
            if ($('#hotremark').length > 0) {
                zpJs.hotRemark("#hotremark");
            }
            if ($('#sxCondition').length > 0) {
                zpJs.sxCondition();
            }
            zpJs.remarkAdd();
            function scrollStart() {
                var initData, sels;
                sels = {
                    nav: $('#gsZpTabNav'),
                    navPos: $('#gsZpTabNavPos')
                };
                initData = {
                    //navTop: sels.navPos.offset().top
                };
                zpJs.scrollEvents(initData, sels);
                $(window).scroll(function () {
                    zpJs.scrollEvents(initData, sels);
                });
            }
            if ($('#gsZpTabNav').length > 0) {
                scrollStart();
            }
            function scrollListNav() {
                var initData, sels;
                sels = {
                    nav: $('#gsKuListNav'),
                    navPos: $('#gsKuListNavPos')
                };
                initData = {
                    navTop: sels.navPos.offset().top
                };

                zpJs.scrollEvents(initData, sels);
                $(window).scroll(function () {
                    zpJs.scrollEvents(initData, sels);
                }).resize(function () {
                    initData.navTop = sels.navPos.offset().top;
                    zpJs.scrollEvents(initData, sels);
                });
            }
            if ($('#gsKuListNavPos').length > 0) {
                scrollListNav();
            }
            $(window).resize(function () {
                scrollStart();
            });
            //需要无限加载的页面执行这个方法即可
            zpJs.infiniteLoad();

            //内容简介更多按钮
            zpJs.btnOpenClose($('.gs_zp_context').find('.con'), 1.76, 'btnContextOpen', 'rem');

            //我的点评更多按钮
            zpJs.btnOpenClose($('#glAllSwp').find('.yu-tags'), 3, 'btnMyScoreOpen', 'rem', function () {
                var $this = $('#glAllSwp').find('.yu-tags');
                zpJs.reSetSwpHeight($this);
            }, function () {
                var $this = $('#glAllSwp').find('.yu-tags');
                zpJs.reSetSwpHeight($this);
            });
        }
    };
    zpJs.render();
    var curPage = 0;
    $.fn.FloorMoreComment = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.on("tap", function () {
                var pageSize = 3;
                var cmtId = $this.attr("cmtId");
                var jsondata = { pageSize: pageSize, cmtId: cmtId, page: options };
                $.ajax({
                    type: "get", dataType: "jsonp", url: "http://cm1.gamersky.com/wapapi/getfloorpagecomment",
                    data: { jsondata: JSON2.stringify(jsondata) },
                    success: function (data) {
                        if (data.body != '') {
                            var count = parseInt(data.count) - parseInt(options);
                            $this.parents(".remark_inner_ctrl").before(data.body);
                            $this.after(data.floorpage);
                            $this.parents(".remark_inner_ctrl").find(".floorpage").FloorPageList(1);
                            $this.remove();
                            zpJs.remarkReply('.btnReplyRemark');
                            $('.remark_main,.mycomment').find('.remark_ir_issue').each(function () {
                                zpJs.btnOpenCloseComm($(this), 1.32, 'btnFloorInnerOpen', 'rem');
                            });
                        }
                    }
                });
            })
        });
    };
    $.fn.FloorPageList = function (options) {
        return this.each(function () {
            var $this = $(this);
            var pageIndex = 1;
            if (options != undefined) {
                pageIndex = options;
            }
            var count = parseInt($this.find(".prev").attr("data-count"));//一共多少条
            var pagesize = $this.find(".prev").attr("data-pagesize");//每页多少条
            $this.find(".prev").show();
            $this.find(".next").show();
            if (pageIndex == 1) {
                $this.find(".prev").hide();
                //自己发表的不为空，总数为空
                if (count == 0) {
                    count = 1;
                }
            }
            if (pageIndex == Math.ceil(count / pagesize)) {
                $this.find(".next").hide();
            }
            var jsondata = { currentPage: pageIndex, pagesize: pagesize, recordCount: count, pagesDisplay: 9 };
            $.ajax({
                type: "POST", dataType: "jsonp", url: "http://cm1.gamersky.com/page/getlabelpage",
                data: { jsondata: JSON2.stringify(jsondata) },
                success: function (data) {
                    if (data.StatusCode = 1) {
                        //清空原来的
                        $this.find(".curr").remove();
                        $this.find(".link").remove();
                        $this.find("em").remove();
                        $this.find(".prev").after(data.Message);
                        $this.ContentFloorPage();
                    }
                }
            });
        });
    };
    $.fn.ContentFloorPage = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.find("a").unbind("click");
            var dataPageClass = $this.attr("data-pageclass");
            $this.find("a").click(function (event) {
                event.preventDefault();
                if ($(this).hasClass("link")) {
                    curPage = parseInt($this.find(".curr").attr("data-page"));
                    $this.find(".curr").removeClass().addClass("link");
                    $(this).removeClass().addClass("curr");
                    var page = parseInt($this.find(".curr").attr("data-page"));
                    $this.ContentFloorPageData(page);
                }
                else if ($(this).hasClass("prev")) {
                    curPage = parseInt($this.find(".curr").attr("data-page"));
                    var page = parseInt($this.find(".curr").attr("data-page")) - 1;
                    if (page >= 1) {
                        $this.find(".curr").removeClass().addClass("link");
                        $this.find("a[data-page='" + page + "']").removeClass().addClass("curr");
                        $this.ContentFloorPageData(page);
                    }
                } else if ($(this).hasClass("next")) {
                    curPage = parseInt($this.find(".curr").attr("data-page"));
                    var page = parseInt($this.find(".curr").attr("data-page")) + 1;
                    $this.find(".curr").removeClass().addClass("link");
                    $this.find("a[data-page='" + page + "']").removeClass().addClass("curr");
                    $this.ContentFloorPageData(page);
                }
                return false;
            });
        });
    };
    $.fn.ContentFloorPageData = function (options) {
        return this.each(function () {
            var $this = $(this);
            var page = options;
            var sTop = $this.parents(".remark_floor").length > 0 ? $this.parents(".remark_floor").find('.remark_inner_floor').eq(0).offset().top : $this.parents(".mycomment").find('.remark_inner_floor').eq(0).offset().top;
            $("body,html").animate({ scrollTop: sTop }, 450);
            var pageSize = $this.find(".prev").attr("data-pagesize");
            var cmtId = $this.parents(".remark_floor").attr("cmtId") == undefined ? $(".comm_infos").attr("cmtId") : $this.parents(".remark_floor").attr("cmtId");
            var jsondata = { pageIndex: page, pageSize: pageSize, cmtId: cmtId };
            $.ajax({
                type: "get", dataType: "jsonp", url: "http://cm1.gamersky.com/wapapi/getfloorpagecomment",
                data: { jsondata: JSON2.stringify(jsondata) },
                success: function (data) {
                    if (data.body != '') {
                        $this.parents(".remark_inner_ctrl").siblings(".remark_inner_floor").remove();
                        $this.parents(".remark_inner_ctrl").before(data.body);
                        $this.parents(".remark_inner_ctrl").find(".floorpage").FloorPageList(page);
                        zpJs.remarkReply('.btnReplyRemark');
                        $('.remark_main,.mycomment').find('.remark_ir_issue').each(function () {
                            zpJs.btnOpenCloseComm($(this), 1.32, 'btnFloorInnerOpen', 'rem');
                        });
                    }
                }
            });
        });
    };
    $.fn.GetCommet = function (options) {
        var $this = $(this), isLoad = false, pageIndex = parseInt($this.attr("pageIndex"));
        if ($this.attr("scrollpagination") == 'true') {
            $this.attr("scrollpagination", false);
            $this.next().find(".gs_zp_btn_more_loading").remove();
            pageIndex > 1 ? $this.next().append("<a class='gs_zp_btn_more gs_zp_btn_more_loading'>+更多</a>") : $this.next().html("<a class='gs_zp_btn_more gs_zp_btn_more_loading'>+更多</a>");
            var articleId = $this.attr("sid");
            if (articleId > 0) {
                var pageSize = 10;
                var foorPageSize = 3;
                var loadtype = $this.find(".cly_show").attr("loadtype");
                var datetype = $this.find("a.cur").attr("data-type");
                var LatestCommenId = $("#remarkFilter").attr("cmtId");
                $.ajax({
                    type: "get", dataType: "jsonp", url: "http://cm1.gamersky.com/wapapi/getcomment",
                    data: { jsondata: JSON2.stringify({ dateType: datetype, loadType: loadtype, pageIndex: pageIndex, pageSize: pageSize, foorPageSize: foorPageSize, articleId: articleId, cmtId: LatestCommenId }) },
                    success: function (data) {
                        if (data.status == "ok") {
                            $this.next().find(".gs_zp_btn_more_loading").remove();
                            var data = $.parseJSON(data.body);
                            if (data.IsClose == true) {
                                $this.next().html("<i class='gs_nothing'>点评已关闭</i>");
                                return;
                            }
                            if (data.Comment != '' && data.Comment != null) {
                                pageIndex > 1 ? $this.next().append(data.Comment) : $this.next().html(data.Comment);
                                $this.attr("scrollpagination", true);
                            }
                            else {
                                $this.next().find(".gs_zp_btn_more").remove();
                                if (data.AllCount > 0) {
                                    $this.next().append("<a class='gs_zp_btn_more'>全部已加载完成</a>");
                                }
                                else {
                                    $this.next().html("<i class='gs_nothing'>暂无评价</i>");
                                }
                                return;
                            }
                            $this.attr("pageIndex", pageIndex + 1);
                            $('.floormore').FloorMoreComment(3);
                            zpJs.remarkReply('.btnReplyRemark');
                            zpJs.zpTab();
                            $(".btn_reply").btnReplyFun();
                            $(".btn_like,.btn_unlike").addLike();
                            $(".btn_like").like();
                            $('.remark_main').find('.issue').each(function () {
                                zpJs.btnOpenCloseComm($(this), 6.6, 'btnFloorOpen', 'rem');
                            });
                            $('.remark_main').find('.remark_ir_issue').each(function () {
                                zpJs.btnOpenCloseComm($(this), 1.32, 'btnFloorInnerOpen', 'rem');
                            });
                            if (pageIndex == 1 && datetype == "0") {
                                $("#remarkFilter").attr("cmtId", data.cmtId);
                            }
                            isLoad = true;
                        }
                    }
                });
            }
        }
    };
    $.fn.addLike = function (options) {
        return this.each(function () {
            var $this = $(this);
            $this.unbind("click");
            $this.click(function (event) {
                event.preventDefault();
                var cmtid = $this.attr("cmtid"), type = $this.attr("date-type"), uid = $this.attr("uid"),
                    num = parseInt($this.text()) + 1, sid = $("#remarkFilter").attr("sid");
                $.ajax({
                    type: "GET", dataType: "jsonp", url: "http://cm1.gamersky.com/api/addlike",
                    data: { jsondata: JSON2.stringify({ commentId: cmtid, generalId: sid, fromId: uid, type: type, platform: 1 }) },
                    success: function (responseJson) {
                        switch (responseJson.status) {
                            case -1: $(".ymw-loginpop-btns").insertYmwLoginPop(); $(".ymw-loginpop-btns").QZloginForm(); break;
                            case 0: $this.html(num); $(".btn_like").like(); break;
                            case 1:
                                var meassage = "点过赞";
                                if (responseJson.notsupport == true) { meassage = "踩过"; }
                                alert("你已经" + meassage + "！");
                                break;
                        }
                    }
                });
            });
        });
    };
    $.fn.like = function () {
        var support = "";
        $(this).each(function () {
            if (support != "") {
                support = support + ","
            }
            support = support + $(this).attr("cmtid");
        });
        $.ajax({
            type: "get", dataType: "jsonp", url: "http://cm1.gamersky.com/api/getlike",
            data: { jsondata: support },
            success: function (data) {
                if (data.status == "ok") {
                    var body = $.parseJSON(data.body);
                    $.each(body, function (index, value) {
                        $(".btn_like[cmtid='" + value.commentId + "']").each(function () {
                            $(this).html(value.Sp)
                        });
                        $(".btn_unlike[cmtid='" + value.commentId + "']").each(function () {
                            $(this).html(value.Step)
                        });
                    });
                }
            }
        });
    };
    $.fn.ReplyCommet = function () {
        var $this = $(this);
        var sid = $("#remarkFilter").attr("sid");//文章ID
        var cmtid = $this.parents(".remark_pop_reply").find(".remark-textarea").attr("cmtid");
        var url = window.location.href;
        var title = document.title;
        //var con = $this.parents(".remark_pop_reply").find(".remark-textarea").val();
        var con = $this.parents(".remark_pop_reply").find(".fake_textarea").html().trim();
        var brow = $.browser.msie ? "jsonp" : "json";
        if (con != '') {
            $.ajax({
                type: "POST", dataType: brow, url: "http://cm1.gamersky.com/wapapi/addcommnet",
                data: { jsondata: JSON2.stringify({ sid: sid, content: encodeURIComponent(con), cmtid: cmtid, topicTitle: title, topicUrl: url }) },
                xhrFields: { withCredentials: true },
                success: function (responseJson) {
                    if (responseJson.status == 'ok') {
                        var data = $.parseJSON(responseJson.body);
                        if ($("#remarkFilter").next().find(".remark_floor").length > 8) {
                            if (data.ReplyComment != null) {
                                var $innerfloor = $("#remarkFilter").next().find(".remark_inner_floor[cmtid=" + cmtid + "]");
                                if ($innerfloor.length > 0) {
                                    $innerfloor.after(data.ReplyComment);
                                }
                                else if ($("#remarkFilter").next().find(".remark_floor[cmtid=" + cmtid + "]").find(".remark_inner_floor").length > 0) {
                                    $("#remarkFilter").next().find(".remark_floor[cmtid=" + cmtid + "]").find(".remark_inner_floor:last").after(data.ReplyComment);
                                }
                                else {
                                    $("#remarkFilter").next().find(".remark_floor[cmtid=" + cmtid + "]").find(".remarkinner").html(data.ReplyComment).show();
                                }
                            }

                        }
                        else {
                            $("#remarkFilter").attr("pageIndex", 1).attr("scrollpagination", true).GetCommet();
                        }
                        $('.remark_pop').hide();
                        $(".mycomment").GetMyCommet();
                        zpJs.hotRemark("#hotremark");
                    }
                }
            });
        }
        else {
            alert("请输入回复内容!");
        }

    };
    $.fn.AddCommet = function () {
        var $this = $(this);
        $(".btnAddRemark.cur").addwanFun(function (responseJson) {
            if (responseJson.status != '') {
                var $this = $(this);
                var sid = $("#remarkFilter").attr("sid");//文章ID
                var url = window.location.href;
                var title = document.title;
                //var con = $(".remark-textarea").val();
                var con = $(".fake_textarea").html();
                var brow = $.browser.msie ? "jsonp" : "json";
                if (con != '') {
                    $.ajax({
                        type: "POST", dataType: brow, url: "http://cm1.gamersky.com/wapapi/addcommnet",
                        data: { jsondata: JSON2.stringify({ sid: sid, content: con, topicTitle: title, topicUrl: url }) },
                        xhrFields: { withCredentials: true },
                        success: function (responseJson) {
                            if (responseJson.status == 'ok') {
                                var data = $.parseJSON(responseJson.body);
                                if (data.ReplyComment != null) {
                                    $(".remark_inner_floor[cmtid=" + cmtid + "]").after(data.ReplyComment);
                                }
                                $(".mycomment").GetMyCommet();
                                zpJs.hotRemark("#hotremark");
                                $(".ymw_zp_pf_wd").judgewanFun();
                                $("#remarkFilter").attr("pageIndex", 1).attr("scrollpagination", true).GetCommet();
                                $(".remark_pop_reply").find(".btn_submit").addClass("edit");
                                $("#remarkFilter").attr("cmtId", data.cmtId);
                            }
                            else {
                                alert(responseJson.body);
                            }
                        }
                    });
                }
                $('.remark_pop').hide();
            }
        });
    };
    $.fn.AddPlatform = function (platform, fun) {
        var gameId = $("#remarkFilter").attr("sid");
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://cm1.gamersky.com/apirating/addplatform",
            data: { 'jsondata': JSON2.stringify({ "GenneralId": gameId, 'platform': platform }) },
            success: function (responseJson) {
                fun(responseJson)
            }
        });
    };
    $.fn.GetPlatform = function () {
        var $this = $(this);
        var gameId = $("#remarkFilter").attr("sid");
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://cm1.gamersky.com/apirating/getplatform",
            data: { 'jsondata': JSON2.stringify({ "GenneralId": gameId }) },
            success: function (responseJson) {
                if (responseJson.status == 'ok') {
                    var pfArray = responseJson.platform.split('、');
                    for (var i = 0; i < pfArray.length; i++) {
                        $this.find("span").each(function () {
                            var $span = $(this);
                            if ($.trim($span.html()) == pfArray[i]) {
                                $span.addClass("cur");
                            }
                        });
                    }
                }
            }
        });
    };
    $.fn.GetMyCommet = function () {
        var gameId = $("#remarkFilter").attr("sid");
        $(this).each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://cm1.gamersky.com/wapapi/mycommet",
                data: { "gameId": gameId },
                success: function (responseJson) {
                    if (responseJson.status == 'ok') {
                        if (responseJson.auditStatus != '') {
                            $(".gs_zp_myscore_top").find(".inAudit").remove();
                            $(".gs_zp_myscore_top").find(".gs_zp_star").after("<div class='inAudit'></div>")
                        }
                        $this.html(responseJson.body);
                        $this.find(".comm_infos .btndelete").remove();
                        $(".btn_like,.btn_unlike").addLike();
                        $(".btn_like").like();
                        $('.floormore').FloorMoreComment(3);
                        zpJs.remarkReply('.btnReplyRemark');
                        $(".addreview ").html("修改点评");
                        //$(".btndelete").DelCommet();

                        $(".btn_reply").btnReplyFun();
                        $this.each(function () {
                            var $that = $(this);
                            zpJs.btnOpenClose($that.find('.comm_con'), 1.32, 'btnMyScoreOpen', 'rem');
                        });
                        if ($this.find(".remark_inner_floor").length > 0) {
                            $this.find(".remark_inner_floors").show();
                        }
                    }
                    $("body").getCommentStatus();
                }
            })
        })
    };
    $.fn.Confirm = function () {
        this.on("click", function () {
            $(".gsZpPopLoginClose").show();
            $(".gs_zp_pop_del").show();
            $(".cancel").click(function () {
                $(".gsZpPopLoginClose").hide();
                $(".gs_zp_pop_del").hide();
            });
            $(".confirm").click(function () {
                //var $this = $(this);
                //var cmtId = $this.attr("cmtid");
                var cmtId = $(".comm_infos").attr("cmtid");
                var gameId = $("#remarkFilter").attr("sid");
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://cm1.gamersky.com/wapapi/deletecomment",
                    data: { 'jsondata': JSON2.stringify({ "sid": gameId, "cmtid": cmtId }) },
                    success: function (data) {
                        if (data.status == "ok") {
                            $(".inAudit,.remark_pop_msk,.remark_pop_reply").remove();
                            //$this.remove();
                            $(".mycomment").html("");
                            $(".gs_zp_star a,.pop_platform span,.btnAddRemark").removeClass("cur");
                            $(".addreview ").html("添加点评");
                            $(".btnAddRemark").wanFun();
                            zpJs.hotRemark("#hotremark");
                            $("#remarkFilter").attr("pageIndex", 1).attr("scrollpagination", true).GetCommet();
                            isHere = false;
                            $(".gsZpPopLoginClose").hide();
                            $(".gs_zp_pop_del").hide();
                            $(".btndelete").remove();
                        }
                    }
                });
            });
        });
    };

    $.fn.getCommentStatus = function () {
        return this.each(function () {
            var $this = $(".gs_zp_myscore_bot");
            var gameId = $("#remarkFilter").attr("sid");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://cm1.gamersky.com/wapapi/getcommentstatus",
                data: { "gameId": gameId },
                success: function (data) {
                    if (data.status == "ok") {
                        var html = "";
                        if (data.islogin == 1) {
                            html += "<a class='logout'>退出登录</a>";
                        }
                        if (data.isvalues == 1) {
                            html += "<a class='btndelete'>删除</a>";
                        }
                        if (html != "") {
                            $this.show();
                        }
                        $this.html(html);
                        $(".logout").logout();
                        $(".btndelete").Confirm();
                    }
                }
            });
        });
    };
    $.fn.logout = function () {
        $(this).on('click', function () {
            event.preventDefault();
            $.removeCookie("UserCookie", { path: '/', domain: '.gamersky.com' });
            $.ajax({
                type: "GET", dataType: "jsonp", url: "http://i.gamersky.com/api/userlogout",
                success: function (logoutJson) {
                    if (logoutJson.status == "ok") { window.location.reload(); }
                }
            });
        });
    };
    // $.fn.DelCommet = function () {
    // this.on("click", function () {
    // var $this = $(this);
    // var cmtId = $this.attr("cmtid");
    // var cmtId = $(".comm_infos").attr("cmtid");
    // var gameId = $("#remarkFilter").attr("sid");
    // $.ajax({
    // type: "GET",
    // dataType: "jsonp",
    // url: "http://cm1.gamersky.com/wapapi/deletecomment",
    // data: { 'jsondata': JSON2.stringify({ "sid": gameId, "cmtid": cmtId }) },
    // success: function (data) {
    // if (data.status == "ok") {
    // $(".inAudit,.remark_pop_msk,.remark_pop_reply").remove();
    // $this.remove();
    // $(".mycomment").html("");
    // $(".gs_zp_star a,.pop_platform span,.btnAddRemark").removeClass("cur");
    // $(".addreview ").html("添加点评");
    // $(".btnAddRemark").wanFun();
    // zpJs.hotRemark("#hotremark");
    // $("#remarkFilter").attr("pageIndex", 1).attr("scrollpagination", true).GetCommet();
    // isHere = false;
    // }
    // }
    // });
    // })
    // };
    $.fn.ModifyCommet = function () {
        var $this = $(this);
        $('.remark_pop_reply').find(".btnAddRemark.cur").addwanFun(function (responseJson) {
            if (responseJson.status != '') {
                var cmtId = $this.parents(".remark_pop_reply").find(".remark-textarea").attr("cmtId");
                //var content = $this.parents(".remark_pop_reply").find(".remark-textarea").attr("value");
                var content = $this.parents(".remark_pop_reply").find(".fake_textarea").html().trim();
                var brow = $.browser.msie ? "jsonp" : "json";
                $.ajax({
                    type: "POST",
                    dataType: brow,
                    url: "http://cm1.gamersky.com/wapapi/updatecomment",
                    xhrFields: { withCredentials: true },
                    data: { 'jsondata': JSON2.stringify({ "cmtId": cmtId, "content": encodeURIComponent(content) }) },
                    success: function (responseJson) {
                        if (responseJson.status == 'ok') {
                            setTimeout(function () { $(".mycomment").GetMyCommet(); }, 1000);
                            zpJs.hotRemark("#hotremark");
                            $("#remarkFilter").attr("pageIndex", 1).attr("scrollpagination", true).GetCommet();
                        }
                        $('.remark_pop').hide();
                    }
                });
            }
        })
    };
    $.fn.submitMyScore = function (options) {
        var $this = $(this);
        var gameId = $("#remarkFilter").attr("sid");
        var sorce = options * 2;
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://cm1.gamersky.com/apirating/addrating",
            data: { 'Rating': JSON2.stringify({ "GenneralId": gameId, 'Sorce': sorce, 'Type': "0", 'fromDevice': 1 }) },
            success: function (data) {
                if (data.Sorce > 0) {
                    $(".scorestar").getMyRating();
                    $(".mycomment").GetMyCommet();
                }
            }
        })
    };
    $.fn.btnReplyFun = function () {
        return this.each(function () {
            $(this).off("click").on("click", function () {
                var $this = $(this);
                var m = $this.attr("count");
                if (m == undefined) { return; }
                if ($this.parents(".mycomment").length > 0) {
                    if ($this.hasClass("cur")) {
                        $this.removeClass("cur").html("收起回复");
                        $this.parents(".zp_comm_btns").next().show();
                        return;
                    }
                    $this.addClass("cur").html("回复<i>" + m + "</i>");
                    $this.parents(".zp_comm_btns").next().hide();
                }
                else {
                    if ($this.hasClass("cur")) {
                        $this.removeClass("cur").html("收起回复");
                        $this.parents(".remark_floor").find(".remarkinner").show();
                        return;
                    }
                    $this.addClass("cur").html("回复<i>" + m + "</i>");
                    $this.parents(".remark_floor").find(".remarkinner").hide();
                }
            })
        })
    };
    //获取新闻和攻略分页
    $.fn.KuLoadMoreFun = function () {
        var $this = $(this);
        var navindex = $("#gsZpTabNav a.cur").index();
        var txt = $("#glAllMain").find(".swp_nav a.cur").html();
        if ($(".gs_zp_item.cur").find(".waplist li").length <= 0 || (txt == "攻略集") && navindex == 2) { return; }
        if ($this.find("a.cur").attr("scrollpagination") == 'true') {
            var $waplist = $(".gs_zp_item.cur").find(".waplist");
            $waplist.append("<a class='gs_zp_btn_more gs_zp_btn_more_loading'>全部加载完成</a>");
            $this.find("a.cur").attr("scrollpagination", false);
            var templatekey = $this.find("a.cur").attr("templatekey");
            var pageIndex = parseInt($this.find("a.cur").attr("pageIndex"));
            var gameId = $("#remarkFilter").attr("sid");
            var nodeId = $this.find("a.cur").attr("nodeId");
            var data = {
                type: "getwaplabelpage", isCache: false, cacheTime: 0, templatekey: templatekey, page: pageIndex, id: gameId, nodeId: nodeId
            };
            $.ajax({
                type: 'GET',
                url: "http://db2.gamersky.com/LabelJsonpAjax.aspx",
                data: { jsondata: JSON2.stringify(data) },
                dataType: "jsonp",
                beforeSend: function () {
                    var $tar = $('#glAllSwp').find('.yu-tags');
                    var newHeight = $tar.closest('.swiper-slide').height() - 10;
                    $tar.closest('.swiper-wrapper').css('height', newHeight);
                    $this.off();

                },
                success: function (data) {
                    if (data.status == "ok") {
                        if (data.totalPages > pageIndex) {
                            $waplist.find(".gs_zp_btn_more").remove();
                            $this.find("a.cur").attr("pageIndex", pageIndex + 1);
                            $waplist.append(data.body);
                            $this.find("a.cur").attr("scrollpagination", true);

                        }
                        else {
                            if (data.totalPages >= 1) {
                                $waplist.find(".gs_zp_btn_more").removeClass("gs_zp_btn_more_loading").html("全部已加载完成");
                            }
                            else {
                                $waplist.find(".gs_zp_btn_more").remove();
                            }
                        }
                    }
                },
                complete: function () {
                    zpJs.reSetSwpHeight($('#glAllSwp').find('.yu-tags'));
                    ymwapDataJs.getCmnums();
                },
                error: function () {
                    if (navigator.userAgent.indexOf('UCBrowser') > -1) {
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                }
            });
        }
    };
    $.fn.btnAddRemarkFun = function () {
        zpJs.remarkAdd();
    };
    //首页分页
    $.fn.GameIndexListFun = function (options) {
        var $this = $(this);
        if ($this.attr("scrollpagination") == 'true') {
            $this.attr("scrollpagination", false);
            var $that = $(".gs_ku_list_con"), navindex = $this.index();
            $that.find(".ku_list").eq(navindex).append("<a class='gs_zp_btn_more gs_zp_btn_more_loading'></a>")
            var pageIndex = parseInt($this.attr("data-pageindex"));
            var PageSize = parseInt($this.attr("data-pagesize"));
            var startRow = (pageIndex - 1) * PageSize + 1;
            var endRow = pageIndex * PageSize;
            var templatekey = $this.attr("data-templatekey");
            var nodeId = $this.attr("nodeId");
            var num = $this.attr("data-num");
            var indaygame = $this.attr("data-indaygame");
            var jsondata = {
                type: "getwaplabelpage", isCache: false, cacheTime: 0, templatekey: templatekey, StartRow: startRow, EndRow: endRow, nodeId: nodeId, Num: num, indayGame: indaygame
            };
            $.ajax({
                type: "GET",
                url: "http://db2.gamersky.com/LabelJsonpAjax.aspx",
                dataType: "jsonp",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                beforeSend: function () {
                    var $tar = $('#kuListSwp').find(".ku_list").eq(navindex);
                    var newHeight = $tar.closest('.swiper-slide').height() - 10;
                    $tar.closest('.swiper-wrapper').css('height', newHeight);
                },
                success: function (responseJson) {
                    if (responseJson.body.indexOf("没有任何记录") == -1) {
                        $this.attr("scrollpagination", true);
                        $that.find(".gs_zp_btn_more").remove();
                        $this.attr("data-pageindex", pageIndex + 1);
                        $that.find(".ku_list").eq(navindex).append(responseJson.body);
                        $(responseJson.body).find(".listedgame").GameListedRating();
                        $(responseJson.body).find(".unlistedgame").GameUnlistedRating();
                    }
                    else {
                        $this.attr("scrollpagination", false);
                        $that.find(".gs_zp_btn_more").removeClass("gs_zp_btn_more_loading").html("全部加载完成");
                    }
                },
                complete: function () {
                    var $this = $('#kuListSwp').find(".ku_list").eq(navindex);
                    zpJs.reSetSwpHeight($this);
                }
            });
        }
    };
    //上市游戏评分
    $.fn.GameListedRating = function () {
        var ids = "";
        $(this).each(function () {
            if (ids != "") {
                ids = ids + ","
            }
            ids = ids + $(this).attr("gameId");
        });
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://cm1.gamersky.com/apirating/getarrayrating",
            data: { 'Idlist': ids },
            success: function (data) {
                if (data.status == 'ok') {
                    $.each(data.result, function (index, value) {
                        var $div = $(".listedgame[gameId='" + value.gameId + "']");
                        var average = value.average >= 10 ? "10" : value.average.toFixed(1);
                        var wh = value.times >= 10 ? value.average * 10 : 0;
                        $div.find(".num").html(value.times >= 10 ? average : "--");
                        $div.find(".gs_zp_star_group").find("i").attr("style", "width:" + wh + "%");
                    });
                }
            }
        });
    };
    //未上市期待人数
    $.fn.GameUnlistedRating = function () {
        var ids = "";
        $(this).each(function () {
            if (ids != "") {
                ids = ids + ","
            }
            ids = ids + $(this).attr("gameId");
        });
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://cm1.gamersky.com/apirating/getarrayrating",
            data: { 'Idlist': ids },
            success: function (data) {
                if (data.status == 'ok') {
                    $.each(data.result, function (index, value) {
                        var $div = $(".unlistedgame[gameId='" + value.gameId + "']");
                        $div.find(".txt_qd").html("" + value.wanNumber + "人期待");
                    });
                }
            }
        });
    };
    $.fn.SearchGameMore = function () {
        var $this = $(this);
        var totalPage = parseInt($this.attr("date-totalpage"));
        if ($this.attr("scrollpagination") == 'true' && totalPage > 0) {
            $this.remove(".gs_zp_btn_more").append("<a class='gs_zp_btn_more gs_zp_btn_more_loading'>+更多</a>")
            $this.attr("scrollpagination", false);
            var dataUrl = $this.attr("data-dataurl");
            var pageSize = $this.attr("data-pagesize");
            var page = parseInt($this.attr("data-page")) + 1;
            $.ajax({
                type: "GET",
                url: dataUrl,
                dataType: "html",
                data: {
                    page: page,
                    pageSize: pageSize

                },
                beforeSend: function () {
                    $this.off();
                },
                success: function (html) {
                    $this.attr("data-page", page);
                    if (totalPage < page) {
                        $this.attr("scrollpagination", false);
                        $this.find(".gs_zp_btn_more").removeClass("gs_zp_btn_more_loading").html("全部加载完成");
                    }
                    else {
                        $this.append(html);
                        $this.find(".gs_zp_btn_more").remove();
                        $this.attr("scrollpagination", true);
                        $(html).find(".listedgame").GameListedRating();
                        $(html).find(".unlistedgame").GameUnlistedRating();
                    }
                },
                error: function () {
                    if (navigator.userAgent.indexOf('UCBrowser') > -1) {
                        alert('请关闭UC浏览器 设置-广告过滤 以获得正常的访问效果');
                    }
                    console.log('错误')
                }
            });
        }
    };
    $.fn.GetHit = function () {
        var $this = $(this);
        var hitcount = "";
        $this.each(function () {
            if (hitcount != "") {
                hitcount = hitcount + ","
            }
            hitcount = hitcount + $(this).attr("data-generalId");
        });
        $.ajax({
            type: "GET",
            url: "http://click.gamersky.com/Common/ReadHits.aspx",
            dataType: "jsonp",
            data: {
                generalId: hitcount
            },
            success: function (responseJson) {
                for (var i = 0; i < responseJson.length; i++) {
                    var pvInfo = responseJson[i];
                    $(".hitcount[data-generalId='" + pvInfo.GeneralId + "']").text("人气 ：" + pvInfo.WapHits);

                }
            }
        });
    };
    $.fn.GetGameTagFun = function () {
        var gameId = $("#remarkFilter").attr("sid");
        var pageSize = 20;
        var ajaxUrl = "http://cm1.gamersky.com/GameApi/GetGameTag";
        $.ajax({
            type: "GET", dataType: "jsonp", url: ajaxUrl,
            data: { "gameId": gameId, "pageSize": pageSize },
            success: function (response) {
                if (response.status == "ok"){
                    if (response.result.length > 0) {
                        var usedLabelHtml = "";
                        for (var i = 0; i < response.result.length; i++) {
                            var tagId = response.result[i].tagId;
                            var url = "http://wap.gamersky.com/ku/0-0-0-" + tagId + "-0-0/";
                            usedLabelHtml += "<div class='swiper-slide'><a href='" + url + "' target='_self'>" + response.result[i].tagName + "</a></div>";
                        }
                        $("#kuTags .swiper-wrapper").append(usedLabelHtml);
                        zpJs.kuTags();
                    }
                }               
            }
        });
    };
})(jQuery);
$(function () {
    $(".mycomment").GetMyCommet();
    $(".scorestar").getMyRating();
    $(".listedgame").GameListedRating();
    $(".unlistedgame").GameUnlistedRating();
    $(".hitcount").GetHit();
//    $("#kuTags").GetGameTagFun();
    $(document).ready(function () {
        if ($(".gs_zp_box .gs_zp_box_con .gs_zp_list ul li").length == 1) {
            $(".gs_zp_box .gs_zp_box_con .gs_zp_list").addClass("gs_zp_list_dn_single");
        }
        if ($(".gs_zp_box .gs_zp_box_con .gs_zp_list ul li").length == 0) {
            $(".gs_zp_list_dn").parents(".gs_zp_box").hide();
        }
        if ($(".yu-tags").find("a").length > 0) {
            $(".yu-tags").show();
        }
        //$("body").getCommentStatus();
    });

})

function logincheck(fun) {
    $.ajax({
        type: "GET", dataType: "jsonp", url: "http://i.gamersky.com/api/logincheck",
        success: function (responseJson) {
            fun(responseJson);
        }
    })
};
function CreateCookie(orderId) {
    if ($.cookie("OrderId") == orderId) {
        $.cookie("OrderId", orderId[0] + (parseInt(orderId[1]) + 1), { path: '/' });
    } else {
        if (typeof $.cookie("OrderId") == "undefined" && orderId == "00") {
            $.cookie("OrderId", "01", { path: '/' });
        } else {
            $.cookie("OrderId", orderId, { path: '/' });
        }
    }
    var locationHref = window.location.href;
    if (locationHref.indexOf("?") >= 0) {
        window.location.href = locationHref.substring(0, locationHref.indexOf("?")) + "?sort=" + $.cookie("OrderId");
    } else {
        window.location.href = window.location.href + "?sort=" + $.cookie("OrderId");
    }
}