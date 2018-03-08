'use strict';

/*
 * 开发完请删掉console.log()和注释！
 * 开发完请删掉console.log()和注释！
 * 开发完请删掉console.log()和注释！
 * 开发完请删掉console.log()和注释！
 * 开发完请删掉console.log()和注释！
 * **2017.11.22 更新查看原图
 * **v0.0.2 begin
 * **qzFunc.createCard,qzFunc.addSwpOnce,qzFunc.photoSwp 三个函数有修改
 * **v0.0.2 end
 * **2017.11.23 更新 全部话题 创建及无限加载
 * **v0.0.3 begin
 * **qzFunc.createAllTopic,qzFunc.allTopic 二个函数新增
 * **v0.0.3 end
 * **2017.11.27 更新 优酷标题调用
 * **v0.0.4 begin
 * **qzFunc.createAllTopic,qzFunc.allTopic 二个函数新增
 * **v0.0.4 end
 */
(function () {
    //模拟加载更多用测试数据begin
    var pgMoredataUrl = 'http://j.gamersky.com/user/club/wap/data/fake.data.pg2.js';
    var pgMoredataUrlComm = 'http://j.gamersky.com/user/club/wap/data/fake.comm.pg2.js';
    var pgMoredataUrlLike = 'http://j.gamersky.com/user/club/wap/data/fake.like.pg2.js';
    var pgMoredataAllTopic = 'http://j.gamersky.com/user/club/wap/data/fake.alltopic.pg2.js';
    //模拟加载更多用测试数据end
    var qzConfig = {
        // 判断是否开始无限加载
        isCanLoading: true,
        //加载中 结构
        loadingDom: '<div class="qz-loading">正在加载</div>',
        //全部加载完成 结构
        loadedDom: '<div class="qz-loaded">全部加载完成</div>',
        //内容为空 结构
        loadnullDom: '<div class="qz-loadnull">还没有内容</div>'
    };
    var qzFunc = {
        //设置屏幕缩放
        setRem: function setRem() {
            var pw = $(window).width();
            if (pw >= 640) {
                pw = 640;
            }
            $('html').css({ 'font-size': pw / 6.4 + 'px' });
        },
        //构建卡片
        createCard: function createCard(cdp) {
            var cardDom = '';
            //插入卡片ID cdp.cardid
            cardDom += '<div class="qz-card qzCard" data-cid="' + cdp.cardid + '">';
            //头部 begin
            //插入用户头像 cdp.head
            cardDom += '<header><a class="head"><img src="' + cdp.head + '" alt="head"></a>';
            cardDom += '<div class="info"><h5>';
            //插入用户名 cdp.user
            cardDom += '<a>' + cdp.user + '</a>';
            //是否加V图标
            if (cdp.vauth === true) {
                cardDom += '<i class="member member-v1"></i>';
            }
            //是否加编辑V图标
            if (cdp.editauth === true) {
                cardDom += '<i class="member member-v2"></i>';
            }
            cardDom += '</h5><p>';
            //插入创建时间 cdp.createtime
            cardDom += '<span class="time">' + cdp.createtime + '</span>';
            cardDom += '</p>';
            cardDom += '</div>';
            //是否加置顶 cdp.spectop 和 精 cdp.specvalue 图标
            if (cdp.spectop === true || cdp.specvalue === true) {
                cardDom += '<div class="spec-icons">';
                if (cdp.spectop === true) {
                    cardDom += '<a class="spec-top">置顶</a>';
                }
                if (cdp.specvalue === true) {
                    cardDom += '<a class="spec-value">精</a>';
                }
                cardDom += '</div>';
            }
            cardDom += '</header>';
            //头部 end
            //主体 begin
            //插入卡片跳转地址 cdp.url
            cardDom += '<section class="detail qzZoneHref" data-href="' + cdp.url + '">';
            //插入卡片内容 cdp.text
            cardDom += '<div class="content">' + cdp.text + '</div>';
            //判断 插入 图片列表 cdp.piclist
            if (cdp.piclist) {
                cardDom += '<div class="media-pic-list"><div class="clearfix qz-figs qzPicPswp">';
                $.each(cdp.piclist, function (i, item) {
                    cardDom += '<figure class="qzPicPswpBtn';
                    //输出数据文件中的图片样式item.ext
                    if (item.ext === 'gif') {
                        cardDom += ' gif"';
                    } else if (item.ext === 'long') {
                        cardDom += ' long"';
                    }
                    //原始图像地址item.origin，大图地址item.large,尺寸item.size,缩略图地址item.url
                    cardDom += '"><a data-origin="http://www.gamersky.com/showimage/id_gamersky.shtml?' + item.origin + '"  data-large="' + item.large + '" data-size="' + item.size + '"><img src="' + item.url + '"></a></figure>';
                });
                cardDom += '</div></div>';
            }
            //判断是否插入大图
            if (cdp.picbig) {
                cardDom += '<div class="qzPicPswp media-pic"><figure class="';
                //输出数据文件中的图片样式 item.ext
                if (cdp.picbig.ext === 'gif') {
                    cardDom += ' gif';
                } else if (cdp.picbig.ext === 'long') {
                    cardDom += ' long';
                }
                //原始图像地址cdp.picbig.large，大图地址cdp.picbig.large,尺寸cdp.picbig.size,缩略图地址cdp.picbig.url
                cardDom += '"><a data-origin="http://www.gamersky.com/showimage/id_gamersky.shtml?' + cdp.picbig.origin + '" data-large="' + cdp.picbig.large + '" data-size="' + cdp.picbig.size + '"><img src="' + cdp.picbig.url + '" class="qzPicPswpBtn"></a></figure></div>';
            }
            //判断是否插入视频
            if (cdp.video) {
                cardDom += '<div class="media-video';
                //视频跳转地址 cdp.video.src,视频缩略图 cdp.video.pic
                cardDom += '"><a class="qzVideoPopBtn" data-href="' + cdp.video.src + '"><img src="' + cdp.video.pic + '" alt=""></a></div>';
            }
            cardDom += '</section>';
            //判断是否输出来源
            if (cdp.fromUrl) {
                //来源地址cdp.fromUrl,来源名称cdp.from
                cardDom += '<div class="from">来自：<a href="' + cdp.fromUrl + '">' + cdp.from + '</a></div>';
            }
            //主体 end
            //底部 begin
            cardDom += '<footer>';
            //点赞数cdp.countlike
            cardDom += '<a class="btn-like qzBtnLike" data-likecount="' + cdp.countlike + '"><i></i><b>' + cdp.countlike + '</b></a><span></span>';
            //评论数 cdp.countcomment,卡片ID cdp.cardid
            cardDom += '<a class="btn-comment qzBtnComment" data-commcount="' + cdp.countcomment + '" data-commid="' + cdp.cardid + '"  data-href="' + cdp.url + '">' + cdp.countcomment + '</a>';
            cardDom += '</footer>';
            //底部 end
            cardDom += '</div>';
            cardDom += '';
            cardDom += '';

            return cardDom;
        },
        //图片弹出层 默认执行,一般情况不需要修改
        addSwpOnce: function addSwpOnce() {
            var swp = '<div class="pswp" tabindex="-1" role="dialog" aria-hidden="true"><div class="pswp__bg"></div><div class="pswp__scroll-wrap"><div class="pswp__container"><div class="pswp__item"></div><div class="pswp__item"></div><div class="pswp__item"></div></div><div class="pswp__ui pswp__ui--hidden"><div class="pswp__top-bar"><div class="pswp__counter"></div><button class="pswp__button pswp__button--close" title="Close (Esc)"></button><a class="pswp__button pswpBtnOrigin pswp__single-tap" title="查看原图"></a> <button class="pswp__button pswp__button--share" title="Share"></button> <button class="pswp__button pswp__button--fs" title="Toggle fullscreen"></button> <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button><div class="pswp__preloader"><div class="pswp__preloader__icn"><div class="pswp__preloader__cut"><div class="pswp__preloader__donut"></div></div></div></div></div><div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap"><div class="pswp__share-tooltip"></div></div><button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)"></button> <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)"></button><div class="pswp__caption"><div class="pswp__caption__center"></div></div></div></div></div>';
            $('body').append(swp);
        },
        //图片弹出层方法 默认执行,一般情况不需要修改
        photoSwp: function photoSwp() {
            var initPhotoSwipeFromDOM = function initPhotoSwipeFromDOM(gallerySelector) {
                var parseThumbnailElements = function parseThumbnailElements(el) {
                    var thumbElements = el.childNodes,
                        numNodes = thumbElements.length,
                        items = [],
                        figureEl,
                        linkEl,
                        size,
                        item;
                    for (var i = 0; i < numNodes; i++) {
                        figureEl = thumbElements[i];
                        if (figureEl.nodeType !== 1) {
                            continue;
                        }
                        linkEl = figureEl.children[0];
                        size = linkEl.getAttribute('data-size').split('x');
                        item = {
                            src: linkEl.getAttribute('data-large'),
                            w: parseInt(size[0], 10),
                            h: parseInt(size[1], 10),
                            ori: linkEl.getAttribute('data-origin')
                        };
                        if (figureEl.children.length > 1) {
                            item.title = figureEl.children[1].innerHTML;
                        }
                        if (linkEl.children.length > 0) {
                            item.msrc = linkEl.children[0].getAttribute('src');
                        }
                        item.el = figureEl;
                        items.push(item);
                    }
                    return items;
                };
                var closest = function closest(el, fn) {
                    return el && (fn(el) ? el : closest(el.parentNode, fn));
                };
                var onThumbnailsClick = function onThumbnailsClick(e) {
                    e = e || window.event;
                    e.preventDefault ? e.preventDefault() : e.returnValue = false;
                    var eTarget = e.target || e.srcElement;
                    var clickedListItem = closest(eTarget, function (el) {
                        return el.tagName && el.tagName.toUpperCase() === 'FIGURE';
                    });
                    if (!clickedListItem) {
                        return;
                    }
                    var clickedGallery = clickedListItem.parentNode,
                        childNodes = clickedListItem.parentNode.childNodes,
                        numChildNodes = childNodes.length,
                        nodeIndex = 0,
                        index;
                    for (var i = 0; i < numChildNodes; i++) {
                        if (childNodes[i].nodeType !== 1) {
                            continue;
                        }
                        if (childNodes[i] === clickedListItem) {
                            index = nodeIndex;
                            break;
                        }
                        nodeIndex++;
                    }
                    if (index >= 0) {
                        openPhotoSwipe(index, clickedGallery);
                    }
                    return false;
                };

                var openPhotoSwipe = function openPhotoSwipe(index, galleryElement, disableAnimation, fromURL) {
                    var pswpElement = $('.pswp')[0],
                        gallery,
                        options,
                        items;
                    items = parseThumbnailElements(galleryElement);
                    options = {
                        shareEl: false,
                        fullscreenEl: false,
                        zoomEl: false,
                        bgOpacity: 1,
                        showHideOpacity: 0,
                        galleryUID: galleryElement.getAttribute('data-pswp-uid'),
                        history: false,
                        getThumbBoundsFn: function getThumbBoundsFn(index) {
                            var thumbnail = items[index].el.getElementsByTagName('img')[0],
                                pageYScroll = window.pageYOffset || document.documentElement.scrollTop,
                                rect = thumbnail.getBoundingClientRect();
                            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width };
                        }
                    };
                    if (fromURL) {
                        if (options.galleryPIDs) {
                            for (var j = 0; j < items.length; j++) {
                                if (items[j].pid == index) {
                                    options.index = j;
                                    break;
                                }
                            }
                        } else {
                            options.index = parseInt(index, 10) - 1;
                        }
                    } else {
                        options.index = parseInt(index, 10);
                    }
                    if (isNaN(options.index)) {
                        return;
                    }
                    if (disableAnimation) {
                        options.showAnimationDuration = 0;
                    }
                    gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options);
                    gallery.init();
                    function setOrigin(num) {
                        $('.pswpBtnOrigin').attr('href', items[num].ori);
                    }
                    gallery.listen('initialZoomIn', function () {
                        setOrigin(gallery.getCurrentIndex());
                        $('.pswp').animate({ 'opacity': 1 }, 333);
                    });
                    gallery.listen('initialZoomOut', function () {
                        $('.pswp').animate({ 'opacity': 0 }, 200);
                    });
                    gallery.listen('afterChange', function () {
                        setOrigin(gallery.getCurrentIndex());
                    });
                };
                var galleryElements = document.querySelectorAll(gallerySelector);
                for (var i = 0, l = galleryElements.length; i < l; i++) {
                    galleryElements[i].setAttribute('data-pswp-uid', i + 1);
                    galleryElements[i].onclick = onThumbnailsClick;
                }
            };
            initPhotoSwipeFromDOM('.qzPicPswp');
        },
        //插入卡片
        insertCard: function insertCard(tar, dt) {
            var insDom = '';
            $.each(dt, function (i, item) {
                //使用返回数据 构建卡片
                insDom += qzFunc.createCard(item);
            });
            $(tar).html(insDom);
            //构建完成后调用图片弹出层
            qzFunc.photoSwp();
            //开启视频弹窗
            qzFunc.openVideoPop();
        },
        //加载更多卡片
        appendCard: function appendCard(tar, dt) {
            var insDom = '';
            $.each(dt, function (i, item) {
                //使用返回数据 构建卡片
                insDom += qzFunc.createCard(item);
            });
            $(tar).append(insDom);
            //构建完成后调用图片弹出层
            qzFunc.photoSwp();
            //开启视频弹窗
            qzFunc.openVideoPop();
        },
        //发布/参与
        addContext: function addContext() {
            function insertContext(scrolltopval) {
                var comDom = '';
                comDom += '<div class="qz-pop qzPop">';
                comDom += '<header>发布内容<a class="qz-pop-close qzPopClose"></a><a class="qz-pop-smt qzPopSmt">发布</a></header>';
                comDom += '<div class="pop-con">';
                comDom += '<div class="pop-srl"><textarea class="realIpt" placeholder="分享你的游戏心得..."></textarea><textarea class="mathIpt" rows="3"></textarea></div>';
                //上传图片后显示，不传图片不显示 begin
                comDom += '<div class="clearfix qz-pic-list">';
                comDom += '<div class="qz-pic-list-li"><img src="http://imgs.gamersky.com/pic/2017/20171102_zy_164_666.jpg"><a class="qz-img-remove"></a></div>';
                comDom += '<div class="qz-pic-list-li"><img src="http://img1.gamersky.com/image2017/11/20171105_gtz_412_2/gamersky_04origin_07_2017115106F5F.jpg"><a class="qz-img-remove"></a></div>';
                comDom += '<div class="qz-pic-list-li"><img src="http://img1.gamersky.com/image2017/11/20171105_gtz_412_1/gamersky_02small_04_20171159476F0.jpg"><a class="qz-img-remove"></a></div>';
                comDom += '<div class="qz-pic-list-li"><img src="http://img1.gamersky.com/image2017/11/20171105_gtz_412_1/gamersky_03small_06_2017115947DAC.jpg"><a class="qz-img-remove"></a></div>';
                comDom += '<div class="qz-pic-list-li"><img src="http://img1.gamersky.com/image2017/11/20171105_gtz_412_1/gamersky_01small_02_2017115947F5B.jpg"><a class="qz-img-remove"></a></div>';
                comDom += '<div class="qz-pic-list-li"><label for="qzSelectPhoto" class="qz-pic-list-add"></label></div>';
                comDom += '</div>';
                //上传图片后显示，不传图片不显示 end
                comDom += '</div>';
                comDom += '<footer><label for="qzSelectPhoto" class="qz-upload-pic qzUploadPic">图片</label><select class="qz-pop-sel">';
                //右下角选项
                comDom += '<option value="">发往圈子</option>';
                comDom += '<option value="">发往gamersky</option>';
                comDom += '<option value="">发往游民之家</option>';
                comDom += '<option value="">发往圈子3</option>';
                comDom += '</select>';
                //隐藏的上传input
                comDom += '<input id="qzSelectPhoto" class="qz-select-photo" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/bmp">';
                comDom += '</footer></div>';
                //输出弹层
                $('body').append(comDom);
                var $qzPop = $('.qzPop');
                //添加弹层动画
                setTimeout(function () {
                    $qzPop.addClass('cur');
                }, 10);
                //设置textarea尺寸
                function setAreaSize() {
                    $qzPop.find('.realIpt').on('input', function () {
                        $qzPop.find('.mathIpt').val($qzPop.find('.realIpt').val());
                        var textsth = $qzPop.find('.mathIpt')[0].scrollHeight;
                        $qzPop.find('.realIpt').css('height', textsth);
                    });
                }
                setAreaSize();
                //关闭弹层
                function closePop() {
                    $qzPop.removeClass('cur');
                    $('html,body').removeClass('hideScroll').animate({ scrollTop: scrolltopval }, 0);
                    //等待弹层动画执行完后移除弹层
                    setTimeout(function () {
                        $qzPop.remove();
                    }, 250);
                }
                //关闭按钮
                $('.qzPopClose').on('click', closePop);
                //发布按钮
                $('.qzPopSmt').on('click', function () {
                    var context = $qzPop.find('.realIpt').val();
                    //数据提交后执行下面函数
                    console.log('发布成功:' + context);
                    closePop();
                });
            }
            //绑定发布按钮事件
            $('#qzMain').on('click', '.qzBtnContext', function () {
                var st = $('html').scrollTop();
                if (st === 0) {
                    st = $('body').scrollTop();
                }
                setTimeout(function () {
                    $('html,body').addClass('hideScroll');
                }, 300);
                //打开弹层
                insertContext(st);
            });
        },
        //评论
        addComment: function addComment() {
            function insertComment(scrolltopval, cid, rename) {
                var comDom = '',
                    placeholder = rename ? '回复 ' + rename + '：' : '我来说两句...';
                comDom += '<div class="qz-pop qzPop">';
                comDom += '<header>评论<a class="qz-pop-close qzPopClose"></a><a class="qz-pop-smt qzPopSmt">发布</a></header>';
                comDom += '<div class="pop-con"><div class="pop-srl"><textarea class="realIpt" placeholder="' + placeholder + '"></textarea><textarea class="mathIpt" rows="3"></textarea></div></div>';
                comDom += '</div>';
                $('body').append(comDom);
                var $qzPop = $('.qzPop');
                setTimeout(function () {
                    $qzPop.addClass('cur');
                }, 10);
                //设置textarea尺寸
                function setAreaSize() {
                    $qzPop.find('.realIpt').on('input', function () {
                        $qzPop.find('.mathIpt').val($qzPop.find('.realIpt').val());
                        var textsth = $qzPop.find('.mathIpt')[0].scrollHeight;
                        $qzPop.find('.realIpt').css('height', textsth);
                    });
                }
                setAreaSize();

                console.log('给 cid = ' + cid + ' 评论添加评论 *** cid 为按钮传入的评论卡片id,供开发使用');
                function closePop() {
                    $qzPop.removeClass('cur');
                    $('html,body').removeClass('hideScroll').animate({ scrollTop: scrolltopval }, 0);
                    setTimeout(function () {
                        $qzPop.remove();
                    }, 250);
                }
                //关闭按钮
                $('.qzPopClose').on('click', closePop);
                //发布按钮
                $('.qzPopSmt').on('click', function () {
                    var context = $qzPop.find('.realIpt').val();
                    //数据提交后执行下面函数
                    console.log('cid:' + cid + ',发布成功:' + context);
                    closePop();
                });
            }

            $('#qzMain').on('click', '.qzBtnComment', function () {
                var st = $('html').scrollTop(),
                    $this = $(this),
                    cid = $this.data('commid'),

                //评论数量
                count = $this.data('commcount'),

                //单页卡片地址
                url = $this.data('href'),

                //回复的用户名
                rename = $this.attr('data-name');
                //判断是否单页 单页直接打开弹层，不判断评论数
                if ($('#qzCardContext').length > 0) {
                    if (st === 0) {
                        st = $('body').scrollTop();
                    }
                    setTimeout(function () {
                        $('html,body').addClass('hideScroll');
                    }, 300);
                    //打开弹层
                    insertComment(st, cid, rename);
                    return false;
                }
                if (count === 0) {
                    if (st === 0) {
                        st = $('body').scrollTop();
                    }
                    setTimeout(function () {
                        $('html,body').addClass('hideScroll');
                    }, 300);
                    //打开弹层
                    insertComment(st, cid);
                } else {
                    //如果评论数不为0 跳转到卡片单页
                    //window.location.href = url;
                    window.open(url, '_blank');
                }
            });
        },
        //点赞
        addLike: function addLike() {
            $('#qzMain').on('click', '.qzBtnLike', function () {
                var $this = $(this),
                    cid = $this.closest('.qzCard').data('cid'),

                //赞的数量
                count = $this.attr('data-likecount');
                //判断是否喜欢过,data-islike=1为点过赞，再次点击删除赞，同时设置data-islike=0
                if (parseInt($this.attr('data-islike')) === 1) {
                    //删除赞 数据提交后回调
                    $this.removeClass('cur').attr('data-islike', '0').attr('data-likecount', parseInt(count) - 1).find('b').html(parseInt(count) - 1);
                    console.log('删除赞');
                } else {
                    //添加赞数 据提交后回调
                    $this.addClass('cur').attr('data-islike', '1').attr('data-likecount', parseInt(count) + 1).find('b').html(parseInt(count) + 1);
                    console.log('喜欢了 cid = ' + cid + ' 的卡片 *** cid 为按钮传入的卡片id,供开发使用');
                }
            });
        },
        //初始化内容 卡片列表
        initPage: function initPage() {
            var tar = '#qzCardList',
                tarInsert = $(tar);
            if (tarInsert.length > 0) {
                //获取数据，具体参数和方式后端自定义
                var dt = tarInsert.data('from');
                $.ajax({
                    dataType: 'Script',
                    url: dt,
                    beforeSend: function beforeSend() {
                        //插入加载动画
                        tarInsert.append(qzConfig.loadingDom);
                    },
                    success: function success() {
                        //判断数据状态
                        if (fakeDate.dataType === 'ok') {
                            //处理获取的数据
                            tarInsert.attr('data-page', fakeDate.page);
                            //允许无限加载
                            tarInsert.attr('data-infiload', 'open');
                            qzFunc.insertCard(tar, fakeDate.cardgroup);
                        } else {
                            //数据为空是插入提示
                            tarInsert.html(qzConfig.loadnullDom);
                        }
                    }
                });
            }
        },
        //初始化内容 话题上部
        initPageTopic: function initPageTopic() {
            var tar = '#qzCardListTopic',
                tarInsert = $(tar);
            if (tarInsert.length > 0) {
                //获取数据，具体参数和方式后端自定义
                var dt = tarInsert.data('from');
                $.ajax({
                    dataType: 'Script',
                    url: dt,
                    beforeSend: function beforeSend() {
                        //插入加载动画
                        tarInsert.append(qzConfig.loadingDom);
                    },
                    success: function success() {
                        //判断数据状态
                        if (fakeDate.dataType === 'ok') {
                            //处理获取的数据
                            tarInsert.attr('data-page', fakeDate.page);
                            //允许无限加载
                            tarInsert.attr('data-moreload', 'open');
                            qzFunc.insertCard(tar, fakeDate.cardgroup);
                        } else {
                            //数据为空是插入提示
                            tarInsert.html(qzConfig.loadnullDom);
                        }
                    }
                });
            }
        },
        //初始化内容 内容单页
        initPageContext: function initPageContext() {
            var tar = '#qzCardContext',
                tarInsert = $(tar);
            if (tarInsert.length > 0) {
                //评论/赞 无限加载
                var infiniteLoadCl = function infiniteLoadCl() {
                    function loadFunc() {
                        var selid = $('.qzClCon.cur').attr('id'),
                            tar,
                            tarInsert;
                        if (selid === 'qzClComment') {
                            tar = '#qzClComment';
                            tarInsert = $(tar);
                            if (tarInsert.attr('data-infiload') === 'open') {
                                $.ajax({
                                    dataType: 'Script',
                                    url: pgMoredataUrlComm,
                                    beforeSend: function beforeSend() {
                                        //插入加载动画
                                        tarInsert.append(qzConfig.loadingDom);
                                    },
                                    success: function success() {
                                        var nowPage = tarInsert.attr('data-page'),
                                            dataPage = fakeCommData.page;
                                        //加载成功后移除加载动画
                                        tarInsert.find('.qz-loading').remove();
                                        //判断时候还有当前数据页码是否加载完成
                                        if (dataPage > nowPage) {
                                            //设置新页码
                                            tarInsert.attr('data-page', dataPage);
                                            //插入更多数据
                                            qzFunc.appendCardComment(tar, fakeCommData.commlist);
                                        } else {
                                            if (tarInsert.attr('data-infiload') === 'open') {
                                                //全部加载完成 关闭加载
                                                tarInsert.attr('data-infiload', 'close');
                                                //插入 全部加载完成 提示
                                                tarInsert.append(qzConfig.loadedDom);
                                            }
                                        }
                                        qzConfig.isCanLoading = true;
                                    }
                                });
                            } else {
                                qzConfig.isCanLoading = true;
                            }
                        } else if (selid === 'qzClLike') {
                            tar = '#qzClLike';
                            tarInsert = $(tar);
                            if (tarInsert.attr('data-infiload') === 'open') {
                                $.ajax({
                                    dataType: 'Script',
                                    url: pgMoredataUrlLike,
                                    beforeSend: function beforeSend() {
                                        //插入加载动画
                                        tarInsert.append(qzConfig.loadingDom);
                                    },
                                    success: function success() {
                                        var nowPage = tarInsert.attr('data-page'),
                                            dataPage = fakeLikeData.page;
                                        //加载成功后移除加载动画
                                        tarInsert.find('.qz-loading').remove();
                                        //判断时候还有当前数据页码是否加载完成
                                        if (dataPage > nowPage) {
                                            //设置新页码
                                            tarInsert.attr('data-page', dataPage);
                                            //插入更多数据
                                            qzFunc.appendCardLike(tar, fakeLikeData.likelist);
                                        } else {
                                            if (tarInsert.attr('data-infiload') === 'open') {
                                                //全部加载完成 关闭加载
                                                tarInsert.attr('data-infiload', 'close');
                                                //插入 全部加载完成 提示
                                                tarInsert.append(qzConfig.loadedDom);
                                            }
                                        }
                                        qzConfig.isCanLoading = true;
                                    }
                                });
                            } else {
                                qzConfig.isCanLoading = true;
                            }
                        }
                    }
                    function scrollJudge() {
                        var st = $('html').scrollTop(),
                            dh = $(document).height(),
                            wh = $(window).height();
                        if (st === 0) {
                            st = $('body').scrollTop();
                        }
                        if (st > dh - wh - 20 && st > wh - dh && qzConfig.isCanLoading === true) {
                            qzConfig.isCanLoading = false;
                            loadFunc();
                        }
                    }
                    if ($(tar).length > 0) {
                        $(window).scroll(function () {
                            scrollJudge();
                        });
                    }
                };

                //获取数据，具体参数和方式后端自定义
                var dt = tarInsert.data('from');
                $.ajax({
                    dataType: 'Script',
                    url: dt,
                    beforeSend: function beforeSend() {
                        //插入加载动画
                        tarInsert.append(qzConfig.loadingDom);
                    },
                    success: function success() {
                        //判断数据状态
                        if (fakeDate.dataType === 'ok') {
                            //处理获取的数据
                            tarInsert.attr('data-page', fakeDate.page);
                            qzFunc.insertCard(tar, fakeDate.cardgroup);
                        } else {
                            //数据为空是插入提示
                            tarInsert.html(qzConfig.loadnullDom);
                        }
                    }
                });
                var commtar = '#qzClComment',
                    commurl = $(commtar).data('from');
                $.ajax({
                    dataType: 'Script',
                    url: commurl,
                    beforeSend: function beforeSend() {
                        //插入加载动画
                        $(commtar).append(qzConfig.loadingDom);
                    },
                    success: function success() {
                        //判断数据状态
                        if (fakeCommData.dataType === 'ok') {
                            //处理获取的数据
                            $(commtar).attr('data-page', fakeCommData.page);
                            $(commtar).attr('data-infiload', 'open');
                            qzFunc.insertCardComment(commtar, fakeCommData.commlist);
                        } else {
                            //数据为空时插入提示
                            $(commtar).html(qzConfig.loadnullDom);
                        }
                    }
                });
                infiniteLoadCl();
            }
        },
        //无限加载
        infiniteLoad: function infiniteLoad(tar, callback) {
            function loadFunc() {
                var tarInsert = $(tar);
                //判断列表是否开启无限加载
                if (tarInsert.attr('data-infiload') === 'open') {
                    //获取数据，具体参数和方式后端自定义
                    if (typeof callback === 'function') {
                        callback(tar, tarInsert);
                    }
                }
            }
            function scrollJudge() {
                var st = $('html').scrollTop(),
                    dh = $(document).height(),
                    wh = $(window).height();
                if (st === 0) {
                    st = $('body').scrollTop();
                }
                if (st > dh - wh - 20 && st > wh - dh && qzConfig.isCanLoading === true) {
                    qzConfig.isCanLoading = false;
                    loadFunc();
                }
            }
            if ($(tar).length > 0) {
                $(window).scroll(function () {
                    scrollJudge();
                });
            }
        },
        //话题页上部加载更多按钮
        topicMore: function topicMore() {
            var $moreBtn = $('.qzCardMoreBtn');
            $moreBtn.on('click', function () {
                var tarInsert = $('#qzCardListTopic');
                //判断列表是否开启查看更多
                if (tarInsert.length > 0 && tarInsert.attr('data-moreload') === 'open') {
                    //获取数据，具体参数和方式后端自定义
                    $.ajax({
                        dataType: 'Script',
                        url: pgMoredataUrl,
                        beforeSend: function beforeSend() {
                            //插入加载动画
                            tarInsert.append(qzConfig.loadingDom);
                        },
                        success: function success() {
                            var nowPage = tarInsert.attr('data-page'),
                                dataPage = fakeDate.page;
                            //加载成功后移除加载动画
                            tarInsert.find('.qz-loading').remove();
                            //判断时候还有当前数据页码是否加载完成
                            if (dataPage > nowPage) {
                                //设置新页码
                                tarInsert.attr('data-page', dataPage);
                                //插入更多数据
                                qzFunc.appendCard('#qzCardListTopic', fakeDate.cardgroup);
                            } else {
                                if (tarInsert.attr('data-moreload') === 'open') {
                                    //全部加载完成 关闭加载
                                    tarInsert.attr('data-moreload', 'close');
                                    //按钮 改变提示文字
                                    $moreBtn.html('全部加载完成');
                                }
                            }
                        }
                    });
                }
            });
        },
        //列表切换
        tabNav: function tabNav() {
            function navFunc() {
                var $nav = $('.qzNavFx'),

                //浮动导航层
                $navWrap = $('.qzNavFxW'),

                //固定不动的占位导航
                $navPos = $('.qzNavPos'),
                    loadedTimer;
                //判断滚动距离添加浮动导航
                function fixNav() {
                    var navTop = $navPos.offset().top,
                        srlTop = $('html').scrollTop();
                    if (srlTop === 0) {
                        srlTop = $('body').scrollTop();
                    }
                    if (srlTop >= navTop) {
                        $navWrap.addClass('openQzNavFixed');
                    } else {
                        $navWrap.removeClass('openQzNavFixed');
                    }
                }
                fixNav();
                $(window).scroll(function () {
                    fixNav();
                });
                //加载tab内容前 页面位置
                function scrollLoading() {
                    var $html = $('html'),
                        hh = $html.height(),
                        navSt = $navPos.offset().top,
                        srlTop = $html.scrollTop();
                    if (srlTop === 0) {
                        srlTop = $('body').scrollTop();
                    }
                    $html.css('height', hh);
                    if (srlTop > navSt) {
                        $('html,body').animate({ scrollTop: navSt }, 0);
                    }
                }
                //加载tab内容后 页面位置
                function scrollLoaded() {
                    var $html = $('html');
                    clearTimeout(loadedTimer);
                    loadedTimer = setTimeout(function () {
                        $html.css('height', '');
                    }, 200);
                }
                //点击切换绑定事件
                $nav.find('a').on('click', function () {
                    var $this = $(this),
                        dataUrl = $this.data('from'),
                        tarCon = '#qzCardList';
                    //设置按钮点击后样式
                    $nav.find('a').removeClass('cur');
                    $this.addClass('cur');
                    //获取数据，具体参数和方式后端自定义
                    $.ajax({
                        dataType: 'Script',
                        url: dataUrl,
                        beforeSend: function beforeSend() {
                            scrollLoading();
                            //关闭其他加载
                            qzConfig.isCanLoading = false;
                            //插入加载动画
                            $(tarCon).html(qzConfig.loadingDom);
                        },
                        success: function success() {
                            qzConfig.isCanLoading = true;
                            //判断数据状态
                            if (fakeDate.dataType === 'ok') {
                                //插入当前页码
                                $(tarCon).attr('data-page', fakeDate.page);
                                //是否开启无限加载
                                $(tarCon).attr('data-infiload', 'open');
                                qzFunc.insertCard(tarCon, fakeDate.cardgroup);
                            } else {
                                //数据为空是插入提示
                                $(tarCon).html(qzConfig.loadnullDom);
                            }
                            scrollLoaded();
                        }
                    });
                });
            }
            if ($('.qzNavFx').length > 0) {
                navFunc();
            }
        },
        //内容单页赞-评论切换
        tabCl: function tabCl() {
            var $nav = $('.tabNavCl'),
                $con = $('.qzClCon');
            $nav.find('a').on('click', function () {
                var $this = $(this),
                    tar = $this.data('tar');
                $nav.find('a').removeClass('cur');
                $con.removeClass('cur');
                $this.addClass('cur');
                $('.' + tar).addClass('cur');
                //数据获取后端自定义
                if (tar === 'qzClLike') {
                    var liketar = '#qzClLike',
                        likeurl = $(liketar).data('from');
                    if ($(liketar).attr('data-page') === undefined) {
                        $.ajax({
                            dataType: 'Script',
                            url: likeurl,
                            beforeSend: function beforeSend() {
                                //插入加载动画
                                $(liketar).append(qzConfig.loadingDom);
                            },
                            success: function success() {
                                $(liketar).find('.qz-loading').remove();
                                //判断数据状态
                                if (fakeLikeData.dataType === 'ok') {
                                    //处理获取的数据
                                    $(liketar).attr('data-page', fakeLikeData.page);
                                    $(liketar).attr('data-infiload', 'open');
                                    qzFunc.appendCardLike(liketar, fakeLikeData.likelist);
                                } else {
                                    //数据为空时插入提示
                                    $(commtar).html(qzConfig.loadnullDom);
                                }
                            }
                        });
                    }
                }
            });
        },
        //单页跳转
        pageGoto: function pageGoto() {
            var openId = $('.qz-card-list');
            //点击其他区域跳转到单页
            openId.on('click', '.qzCard .qzZoneHref', function () {
                var $this = $(this),
                    url = $this.data('href');
                //window.location.href = url;
                window.open(url, '_blank');
            });
            //阻止事件冒泡
            openId.on('click', '.qzZoneHref figure,.qzZoneHref a', function (event) {
                event.stopPropagation();
            });
        },
        //构建卡片内评论
        createCardComment: function createCardComment(cmdt) {
            var commDom = '';
            commDom += '<li data-commid="' + cmdt.commid + '"><a class="head">';
            commDom += '<img src="' + cmdt.head + '" alt="' + cmdt.name + '"></a>';
            commDom += '<div class="info qzBtnComment" data-commid="' + cmdt.commid + '" data-name="' + cmdt.name + '">';
            commDom += '<h5>' + cmdt.name;
            if (cmdt.reply) {
                commDom += '<b>回复</b>' + cmdt.reply;
            }
            commDom += '</h5>';
            commDom += '<p class="time">' + cmdt.replytime + '</p>';
            commDom += '<div class="context">';
            commDom += cmdt.context;
            commDom += '</div></div></li>';
            return commDom;
        },
        //插入卡片内评论
        insertCardComment: function insertCardComment(tar, dt) {
            var insDom = '';
            $.each(dt, function (i, item) {
                //使用返回数据 构建卡片
                insDom += qzFunc.createCardComment(item);
            });
            $(tar).html(insDom);
        },
        //插入卡片内更多评论
        appendCardComment: function appendCardComment(tar, dt) {
            var insDom = '';
            $.each(dt, function (i, item) {
                //使用返回数据 构建卡片
                insDom += qzFunc.createCardComment(item);
            });
            $(tar).append(insDom);
        },
        //构建卡片内赞
        createCardLike: function createCardLike(lkdt) {
            var likeDom = '';
            likeDom += '<li data-likeid="' + lkdt.likeid + '"><a class="head">';
            likeDom += '<img src="' + lkdt.head + '" alt="' + lkdt.name + '"></a>';
            likeDom += '<div class="name"><a>' + lkdt.name + '</a></div>';
            likeDom += '</div></li>';
            return likeDom;
        },
        //插入卡片内赞
        insertCardLike: function insertCardLike(tar, dt) {
            var insDom = '';
            $.each(dt, function (i, item) {
                //使用返回数据 构建卡片
                insDom += qzFunc.createCardLike(item);
            });
            $(tar).html(insDom);
        },
        //插入卡片内更多赞
        appendCardLike: function appendCardLike(tar, dt) {
            var insDom = '';
            $.each(dt, function (i, item) {
                //使用返回数据 构建卡片
                insDom += qzFunc.createCardLike(item);
            });
            $(tar).append(insDom);
        },
        //打开视频弹窗
        openVideoPop: function openVideoPop() {
            function videoPop(vdsrc) {
                var popDom = '';
                popDom += '<div class="qz-video-pop qzVideoPop">';
                popDom += '<div class="qz-video-pop-con">';
                popDom += '<iframe height="100%" width="100%" src="http://player.youku.com/embed/' + vdsrc + '" frameborder=0 allowfullscreen></iframe>';
                popDom += '</div>';
                popDom += '<div class="qz-video-bar"><a class="qz-video-pop-close qzVideoPopClose"></div></a>';
                popDom += '</div>';
                $('body').append(popDom);
                var $pop = $('.qzVideoPop');
                setTimeout(function () {
                    $pop.addClass('cur');
                }, 10);
                function closePop() {
                    $pop.removeClass('cur');
                    setTimeout(function () {
                        $pop.remove();
                    }, 250);
                }
                $pop.on('click', closePop);
                $pop.on('click', 'iframe', function (event) {
                    event.stopPropagation();
                });
            }
            $('.qzVideoPopBtn').on('click', function () {
                var $this = $(this),
                    vdurl = $this.data('href'),
                    vdsrc = '';
                var ykSign = 'http://v.youku.com/v_show/id_',
                    ykIndexOfBegin = vdurl.indexOf(ykSign) + ykSign.length,
                    ykIndexOfEnd = vdurl.indexOf('==.html');
                vdsrc = vdurl.substring(ykIndexOfBegin, ykIndexOfEnd);
                videoPop(vdsrc);
            });
        },
        //构建全部话题列表
        createAllTopic: function createAllTopic(dt) {
            var topicDom = '';
            topicDom += '<li data-topicid="' + dt.id + '"><a href="' + dt.url + '"><b>#' + dt.title + '#</b><span><i class="num-in">' + dt.countjoin + '</i>人参与<i class="num-comm">' + dt.countcomm + '</i>条讨论</span></a></li>';
            return topicDom;
        },
        //插入全部话题列表
        allTopic: function allTopic() {
            var $topicList = $('#qzAllTopicList');
            function createList(dt) {
                var listDom = '';
                $.each(dt, function (i, item) {
                    listDom += qzFunc.createAllTopic(item);
                });
                $topicList.html(listDom);
            }
            function addList(dt) {
                var listDom = '';
                $.each(dt, function (i, item) {
                    listDom += qzFunc.createAllTopic(item);
                });
                $topicList.append(listDom);
            }
            function getListData() {
                var dataOriUrl = $topicList.data('from');
                $.ajax({
                    dataType: 'script',
                    url: dataOriUrl,
                    success: function success() {
                        var listData = fakeAlltopic;
                        $topicList.attr({ 'data-page': listData.page, 'data-infiload': 'open' });
                        createList(listData.topiclist);
                    }
                });
            }
            if ($topicList.length > 0) {
                getListData();
                qzFunc.infiniteLoad('#qzAllTopicList', function (tar, tarInsert) {
                    var $main = $('#qzMain');
                    $.ajax({
                        dataType: 'Script',
                        url: pgMoredataAllTopic,
                        beforeSend: function beforeSend() {
                            //插入加载动画
                            $main.append(qzConfig.loadingDom);
                        },
                        success: function success() {
                            var nowPage = tarInsert.attr('data-page'),
                                dataPage = fakeAlltopic.page;
                            //加载成功后移除加载动画
                            $main.find('.qz-loading').remove();
                            //判断时候还有当前数据页码是否加载完成
                            if (dataPage > nowPage) {
                                //设置新页码
                                tarInsert.attr('data-page', dataPage);
                                //插入更多数据
                                addList(fakeAlltopic.topiclist);
                            } else {
                                if (tarInsert.attr('data-infiload') === 'open') {
                                    //全部加载完成 关闭加载
                                    tarInsert.attr('data-infiload', 'close');
                                    //插入 全部加载完成 提示
                                    $main.append(qzConfig.loadedDom);
                                }
                            }
                            qzConfig.isCanLoading = true;
                        }
                    });
                });
            }
        },
        //入口
        main: function main() {
            //设置屏幕缩放
            qzFunc.setRem();
            //插入图片弹层，只需执行一次
            qzFunc.addSwpOnce();
            //开启评论
            qzFunc.addComment();
            //开启赞喜欢
            qzFunc.addLike();
            //开启发布/参与
            qzFunc.addContext();
            //插入测试数据
            qzFunc.initPage();
            //插入测试数据 话题页
            qzFunc.initPageTopic();
            //插入测试数据 内容单页
            qzFunc.initPageContext();
            //列表切换导航
            qzFunc.tabNav();
            //插入测试数据 模拟无限加载
            qzFunc.infiniteLoad('#qzCardList', function (tar, tarInsert) {
                $.ajax({
                    dataType: 'Script',
                    url: pgMoredataUrl,
                    beforeSend: function beforeSend() {
                        //插入加载动画
                        tarInsert.append(qzConfig.loadingDom);
                    },
                    success: function success() {
                        var nowPage = tarInsert.attr('data-page'),
                            dataPage = fakeDate.page;
                        //加载成功后移除加载动画
                        tarInsert.find('.qz-loading').remove();
                        //判断时候还有当前数据页码是否加载完成
                        if (dataPage > nowPage) {
                            //设置新页码
                            tarInsert.attr('data-page', dataPage);
                            //插入更多数据
                            qzFunc.appendCard(tar, fakeDate.cardgroup);
                        } else {
                            if (tarInsert.attr('data-infiload') === 'open') {
                                //全部加载完成 关闭加载
                                tarInsert.attr('data-infiload', 'close');
                                //插入 全部加载完成 提示
                                tarInsert.append(qzConfig.loadedDom);
                            }
                        }
                        qzConfig.isCanLoading = true;
                    }
                });
            });
            //开启 话题页上部加载更多按钮功能
            qzFunc.topicMore();
            //开启 内容单页评论和赞的切换功能
            qzFunc.tabCl();
            //开启 内容单页 跳转功能
            qzFunc.pageGoto();
            //加载 全部话题 列表
            qzFunc.allTopic();
            //旋转屏幕需要执行的函数
            $(window).resize(function () {
                qzFunc.setRem();
            });
        }
    };
    qzFunc.main();
})();