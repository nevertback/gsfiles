"use strict";

(function ($) {
    var jsLib = {
        //一张大图 后面两张小图
        zoomPicFunc: function zoomPicFunc() {
            function ZoomPic() {
                this.initialize.apply(this, arguments);
            }
            ZoomPic.prototype = {
                initialize: function initialize(id) {
                    var _this = this;
                    this.wrap = typeof id === "string" ? document.getElementById(id) : id;
                    this.oUl = this.wrap.getElementsByTagName("ul")[0];
                    this.aLi = this.wrap.getElementsByTagName("li");
                    this.timer = null;
                    this.aSort = [];
                    this.iCenter = 1;
                    this._doPrev = function () {
                        return _this.doPrev.apply(_this);
                    };
                    this._doNext = function () {
                        return _this.doNext.apply(_this);
                    };
                    this.options = liSize;
                    for (var i = 0; i < this.aLi.length; i++) {
                        this.aSort[i] = this.aLi[i];
                    }this.aSort.unshift(this.aSort.pop());
                    this.setUp();
                    this.doImgClick();
                    _this.doNext();
                },
                doPrev: function doPrev() {
                    this.aSort.unshift(this.aSort.pop());
                    this.setUp();
                },
                doNext: function doNext() {
                    this.aSort.push(this.aSort.shift());
                    this.setUp();
                },
                doImgClick: function doImgClick() {
                    var _this = this;
                    for (var i = 0; i < this.aSort.length; i++) {
                        this.aSort[i].onclick = function () {
                            if (this.index > _this.iCenter) {
                                _this.aSort.push(_this.aSort.shift());
                                _this.setUp();
                            } else if (this.index < _this.iCenter) {
                                _this.aSort.unshift(_this.aSort.pop());
                                _this.setUp();
                            }
                        };
                    }
                },
                setUp: function setUp() {
                    var _this = this;
                    var i = 0;
                    for (i = 0; i < this.aSort.length; i++) {
                        this.oUl.appendChild(this.aSort[i]);
                    }
                    for (i = 0; i < this.aSort.length; i++) {
                        this.aSort[i].index = i;
                        if (i < 3) {
                            this.css(this.aSort[i], "display", "block");
                            this.doMove(this.aSort[i], this.options[i]);
                        } else {
                            this.css(this.aSort[i], "display", "none");
                            this.css(this.aSort[i], "width", 0);
                            this.css(this.aSort[i], "height", 0);
                            this.css(this.aSort[i], "top", 0);
                            this.css(this.aSort[i], "left", this.oUl.offsetWidth / 2);
                        }
                        this.aSort[i].setAttribute('class', '');
                        this.aSort[1].setAttribute('class', 'cur');

                        this.aSort[i].className = '';
                        this.aSort[1].className = 'cur';
                    }
                },
                css: function css(oElement, attr, value) {
                    if (arguments.length === 2) {
                        return oElement.currentStyle ? oElement.currentStyle[attr] : getComputedStyle(oElement, null)[attr];
                    } else if (arguments.length === 3) {
                        switch (attr) {
                            case "width":
                            case "height":
                            case "top":
                            case "left":
                            case "bottom":
                                oElement.style[attr] = value + "px";
                                break;
                            default:
                                oElement.style[attr] = value;
                                break;
                        }
                    }
                },
                doMove: function doMove(oElement, oAttr) {
                    var _this = this;
                    clearInterval(oElement.timer);
                    oElement.timer = setInterval(function () {
                        var bStop = true;
                        for (var property in oAttr) {
                            var iCur = parseFloat(_this.css(oElement, property));
                            var iSpeed = (oAttr[property] - iCur) / 8;
                            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
                            if (iCur !== oAttr[property]) {
                                bStop = false;
                                _this.css(oElement, property, iCur + iSpeed);
                            }
                        }
                        if (bStop) {
                            clearInterval(oElement.timer);
                        }
                    }, 20);
                }
            };
            // var zoomStart = new ZoomPic();
            // zoomStart('zoomPic1');
            var liSize = [{
                width: 777,
                height: 420,
                top: 60,
                left: 0,
                zIndex: 1
            }, {
                width: 1000,
                height: 540,
                top: 0,
                left: 165,
                zIndex: 2
            }, {
                width: 777,
                height: 420,
                top: 60,
                left: 555,
                zIndex: 1
            }];
            new ZoomPic('zoomPic1');
        },
        //幻灯
        //调取tag列表
        addList: function addList(tar) {
            var addDot = false;
            var $this = $(tar);
            var labelJsonpUrl = "http://db2.gamersky.com/LabelTemplateJsonpAjax.aspx";
            var tag = $this.attr('data-tag');
            var outputQty = $this.attr('data-outputQty');
            var nodes = $this.attr('data-nodes');
            var LabelName = $this.attr('data-labelname'); //内容文字Tag列表(通用-带时间) 内容图文简介时间Tag列表(通用) Color相关视频
            if (LabelName === null || LabelName === "" || LabelName === undefined) {
                LabelName = "内容文字Tag列表(通用)";
                addDot = true;
            }
            var jsondata = {
                type: "updatelabel",
                labelname: LabelName,
                attr: {
                    Tag: tag,
                    outputQty: outputQty,
                    Nodes: nodes
                }
            };
            $.ajax({
                type: "GET",
                url: labelJsonpUrl,
                dataType: "jsonp",
                data: {
                    jsondata: JSON2.stringify(jsondata)
                },
                success: function success(responseJson) {
                    $this.html(responseJson.body);
                    $this.find('br').remove();
                    if (addDot) {
                        $this.find('li').each(function () {
                            $(this).find('a').append('<i></i>');
                        });
                    }
                }
            });
        },
        //superslide
        ztTabs: function ztTabs(tabId) {
            var $tabId = $(tabId),
                $tabNav = $tabId.find('.ztTabNav').find('li'),
                $tabCon = $tabId.find('.ztTabCon');
            $(tabId).slide({
                titCell: $tabNav,
                titOnClassName: 'cur',
                mainCell: $tabCon,
                effect: 'fold',
                delayTime: 10
            });
        },
        //留言
        lyFunc: function lyFunc() {
            var conId = $('#s2txt'),
                iptId = $('#s2qq'),
                conPl = conId.data('placeholder'),
                iptPl = iptId.data('placeholder'),
                colorTxt = '#dedeff',
                colorTxtF = '#fff',
                colorIpt = '#6e62ea',
                colorIptF = '#000';
            conId.val(conPl).css('color', colorTxt);
            iptId.val(iptPl).css('color', colorIpt);
            conId.on({
                'focus': function focus() {
                    if (conId.val() === conPl) {
                        conId.val('').css('color', colorTxtF);
                    }
                },
                'blur': function blur() {
                    if (conId.val() === '' || $.trim(conId.val()) === '') {
                        conId.val(conPl).css('color', colorTxt);
                    }
                }
            });
            iptId.on({
                'focus': function focus() {
                    if (iptId.val() === iptPl) {
                        iptId.val('').css('color', colorIptF);
                    }
                },
                'blur': function blur() {
                    if (iptId.val() === '' || $.trim(iptId.val()) === '') {
                        iptId.val(iptPl).css('color', colorIpt);
                    }
                }
            });
            $('#s2btn').on('click', function () {
                var Folder = 'zhuanti/x5myy/',
                    fname = 'infos',
                    cookiefname = cookie(fname),
                    userCon = conId.val(),
                    userNum = iptId.val();
                if (cookiefname !== null && cookiefname === userNum) {
                    alert("您已经提交过了！");
                    return;
                }
                if (!$.trim(userCon)) {
                    alert("请输入评论内容！");
                    return;
                }
                if (ymjsModel.verifIpt(userNum, 'qq') === false) {
                    alert("请输入有效的手机号码！");
                    return;
                }
                var content = "---QQ：" + userNum + "---内容：" + userCon + "---";
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://www3.gamersky.com:81/cfile.asp",
                    data: {
                        Submit: "Submit",
                        Folder: Folder,
                        Fname: fname,
                        Content: content
                    },
                    success: function success(Jsons) {}
                });
                cookie(fname, userNum, {
                    path: '/'
                });
                alert("提交完成！");
                conId.val(conPl).css('color', colorTxt);
                iptId.val(iptPl).css('color', colorIpt);
            });
        },
        //投票
        voteFunc: function voteFunc() {
            var $vt = $('#voteCon'),
                vtId = $vt.data('voteid');
            function setVoteState(n1, n2) {
                var sum = n1 + n2,
                    arr = $vt.find('.arr').find('i'),
                    leftNum = parseInt(n1 / sum * 100) + '%',
                    rightNum = 100 - parseInt(n1 / sum * 100) + '%';
                arr.css('left', n1 / sum * 100 + '%');
                $vt.find('.nums_l').html(leftNum);
                $vt.find('.nums_r').html(rightNum);
                $vt.find('.btnwrap_left').find('.num').find('span').html(n1);
                $vt.find('.btnwrap_right').find('.num').find('span').html(n2);
            }
            function getVoteData() {
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://db2.gamersky.com/Vote/ShowVote.aspx",
                    data: {
                        json: "1",
                        id: vtId
                    },
                    success: function success(responseJson) {
                        switch (responseJson.status) {
                            case "ok":
                                var n1,
                                    n2,
                                    sum = responseJson.total;
                                $.each(responseJson.items, function (i, item) {
                                    if (item.Id === 2793) {
                                        n1 = item.TotalNumber;
                                    } else if (item.Id === 2794) {
                                        n2 = item.TotalNumber;
                                    }
                                });
                                setVoteState(n1, n2);
                                break;
                            case "err":
                                alert(responseJson.message);
                                break;
                        }
                    }
                });
            }
            function clkVote(voteItemId) {
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://db5.gamersky.com/Vote/ShowVote.aspx",
                    data: {
                        json: "2",
                        id: vtId,
                        vote: voteItemId
                    },
                    success: function success(responseJson) {
                        switch (responseJson.status) {
                            case "ok":
                                var n1,
                                    n2,
                                    sum = responseJson.total;
                                $.each(responseJson.items, function (i, item) {
                                    if (item.Id === 2793) {
                                        n1 = item.TotalNumber;
                                    } else if (item.Id === 2794) {
                                        n2 = item.TotalNumber;
                                    }
                                });
                                setVoteState(n1, n2);
                                break;
                            case "err":
                                alert(responseJson.message);
                                $this.text('已投票').addClass('disable');
                                break;
                        }
                    }
                });
            }
            getVoteData();
            $vt.find('.btn').on('click', function () {
                var $this = $(this),
                    itemId = $this.data('itemid');
                clkVote(itemId);
            });
        },
        //二维码
        fixCode: function fixCode() {
            var fxCode = $('.fx-code'),
                ft = fxCode.offset().top;
            function scrollFunc() {
                var $win = $(window),
                    st = $win.scrollTop();
                if ($win.width() < 1260) {
                    fxCode.hide();
                } else {
                    fxCode.show();
                }
                if (st >= ft - ($win.height() / 2 - 119)) {
                    fxCode.addClass('cur');
                } else {
                    fxCode.removeClass('cur');
                }
            }
            $(window).resize(scrollFunc).scroll(scrollFunc);
        },
        //格式验证
        verifIpt: function verifIpt(iptcon, cate) {
            var bValidate;
            if (cate === 'qq') {
                bValidate = RegExp(/^[1-9][0-9]{4,20}$/).test(iptcon);
            } else if (cate === 'telephone') {
                bValidate = RegExp(/^1\d{10}$/).test(iptcon);
            } else if (cate === 'email') {
                bValidate = RegExp(/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/).test(iptcon);
            }
            return bValidate;
        },
        gsZoom: function gsZoom(tar, options) {
            var $w = $(tar),
                opt = {
                css3: options.css3 || true,
                s: options.speed,
                w: options.width,
                h: options.height,
                bp: options.prev,
                bn: options.next,
                bc: options.cur,
                l: options.list,
                cen: options.cen,
                btnp: options.btnPrev,
                btnn: options.btnNext,
                mc: options.mainCon,
                mn: options.nav,
                autoPlay: options.autoPlay,
                playSpeed: options.playSpeed
            },
                $c = $w.find(opt.mc),
                $n = $w.find(opt.mn),
                liLen = $c.find('li').length,
                sbie = $.browser.msie,
                ver = parseInt($.browser.version),
                playTimer,
                playState = false;
            console.log(opt.css3);
            if (opt.autoPlay === true) {
                playState = true;
            }
            if (sbie === true && ver < 10) {
                opt.css3 = false;
            }
            if (opt.css3 === true) {
                $w.addClass('gszm-css3');
            }
            function commClk() {
                if (opt.autoPlay === true) {
                    clearInterval(playTimer);
                    playState = false;
                }
            }
            var zm = {
                setBoxSize: function setBoxSize() {
                    $w.add($c).css({
                        width: opt.w,
                        height: opt.h
                    });
                },
                setCardSize: function setCardSize() {
                    $c.find('li:not(.' + opt.bc + ',.' + opt.bp + ',.' + opt.bn + ')').hide().css(opt.cen);
                    $c.find('li.' + opt.bc).show().animate(opt.l[1], opt.s);
                    $c.find('li.' + opt.bp).show().animate(opt.l[0], opt.s);
                    $c.find('li.' + opt.bn).show().animate(opt.l[2], opt.s);
                    zm.setNav();
                },
                css3change: function css3change() {
                    $c.find('li.' + opt.bc).css(opt.l[1]);
                    $c.find('li.' + opt.bp).css(opt.l[0]);
                    $c.find('li.' + opt.bn).css(opt.l[2]);
                    zm.setNav();
                },
                nextClk: function nextClk() {
                    var $this = $('li.' + opt.bn),
                        idx = $this.index();
                    $c.find('li.' + opt.bp).removeClass(opt.bp);
                    $c.find('li.' + opt.bc).removeClass(opt.bc).addClass(opt.bp);
                    if (idx === liLen - 1) {
                        $this.removeClass(opt.bn).addClass(opt.bc);
                        $c.find('li').eq(0).addClass(opt.bn);
                    } else {
                        $this.removeClass(opt.bn).addClass(opt.bc).next().addClass(opt.bn);
                    }
                    if (opt.css3 === true) {
                        zm.css3change();
                    } else {
                        zm.setCardSize();
                    }
                },
                prevClk: function prevClk() {
                    var $this = $('li.' + opt.bp),
                        idx = $this.index();
                    $c.find('li.' + opt.bn).removeClass(opt.bn);
                    $c.find('li.' + opt.bc).removeClass(opt.bc).addClass(opt.bn);
                    if (idx === 0) {
                        $this.removeClass(opt.bp).addClass(opt.bc);
                        $c.find('li').eq(-1).addClass(opt.bp);
                    } else {
                        $this.removeClass(opt.bp).addClass(opt.bc).prev().addClass(opt.bp);
                    }
                    if (opt.css3 === true) {
                        zm.css3change();
                    } else {
                        zm.setCardSize();
                    }
                },
                setNav: function setNav() {
                    var idx = $c.find('.' + opt.bc).index();
                    $n.find('li').removeClass('cur').eq(idx).addClass('cur');
                    if (opt.autoPlay === true && playState === false) {
                        playState = true;
                        this.autoPlayFunc();
                    }
                },
                initNav: function initNav() {
                    var nl = '';
                    for (var i = 0; i < liLen; i++) {
                        nl += '<li></li>';
                    }
                    $n.html(nl);
                },
                initCardSize: function initCardSize() {
                    $c.find('li.' + opt.bp).css(opt.l[0]);
                    $c.find('li.' + opt.bc).css(opt.l[1]);
                    $c.find('li.' + opt.bn).css(opt.l[2]);
                },
                initClass: function initClass() {
                    $c.find('li').eq(0).addClass(opt.bp);
                    $c.find('li').eq(1).addClass(opt.bc);
                    $c.find('li').eq(2).addClass(opt.bn);
                    if (opt.css3 !== true) {
                        $c.find('li:gt(2)').hide().css(opt.l[0]);
                    }
                },
                navClk: function navClk() {
                    $n.find('li').on('click', function () {
                        var $this = $(this),
                            idx = $this.index();
                        commClk();
                        $c.find('li').removeClass();
                        if (idx === 0) {
                            $c.find('li').eq(liLen - 1).addClass(opt.bp);
                            $c.find('li').eq(idx).next().addClass(opt.bn);
                        } else if (idx === liLen - 1) {
                            $c.find('li').eq(idx).prev().addClass(opt.bp);
                            $c.find('li').eq(0).addClass(opt.bn);
                        } else {
                            $c.find('li').eq(idx).prev().addClass(opt.bp);
                            $c.find('li').eq(idx).next().addClass(opt.bn);
                        }
                        $c.find('li').eq(idx).addClass(opt.bc);
                        if (opt.css3 === true) {
                            zm.css3change();
                        } else {
                            zm.setCardSize();
                        }
                    });
                },
                clkFunc: function clkFunc() {
                    $c.on('click', 'li.gszm-next', function () {
                        commClk();
                        zm.nextClk();
                    });
                    $c.on('click', 'li.gszm-prev', function () {
                        commClk();
                        zm.prevClk();
                    });
                    $w.find(opt.btnn).on('click', function () {
                        commClk();
                        zm.nextClk();
                    });
                    $w.find(opt.btnp).on('click', function () {
                        commClk();
                        zm.prevClk();
                    });
                },
                autoPlayFunc: function autoPlayFunc() {
                    playTimer = setInterval(function () {
                        zm.nextClk();
                    }, opt.playSpeed);
                },
                init: function init() {
                    this.setBoxSize();
                    this.initClass();
                    this.initCardSize();
                    this.initNav();
                    this.setNav();
                    this.clkFunc();
                    this.navClk();
                    if (opt.autoPlay === true) {
                        this.autoPlayFunc();
                    }
                }
            };
            zm.init();
        }
    };
    jsLib.gsZoom('#gsZoom', {
        css3: true,
        width: '1000px',
        height: '388px',
        speed: 200,
        mainCon: '.gszm-con',
        prev: 'gszm-prev',
        next: 'gszm-next',
        cur: 'gszm-cur',
        btnPrev: '.gszm-btn-prev',
        btnNext: '.gszm-btn-next',
        nav: '.gszm-nav',
        autoPlay: false,
        playSpeed: 3000,
        list: [{
            width: 682,
            height: 331,
            top: 29,
            left: 0
        }, {
            width: 800,
            height: 388,
            top: 0,
            left: 99
        }, {
            width: 682,
            height: 331,
            top: 29,
            left: 318
        }],
        cen: {
            width: 682,
            height: 331,
            top: 29,
            left: 159
        }
    });
    //jsLib.zoomPicFunc();
    var isright = jsLib.verifIpt('19963693651515155', 'qq');
    //console.log(isright);
    //jsLib.zoomPicNew('#zoomPic2');
    // $('.ztTab').each(function(){
    //     ymjsModel.ztTabs('#'+$(this).attr('id'));
    // });
})(jQuery);