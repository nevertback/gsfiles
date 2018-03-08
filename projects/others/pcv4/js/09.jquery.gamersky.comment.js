/// <reference path="~/js/jquery-1.8.3.js"/>
/// <reference path="/js/jquery.peex.js"/>
/// <reference path="/js/jquery.cookie.js"/>
/// <reference path="/js/json2.js"/>
(function ($) {
    var commentJsonpUrl = "http://cm.gamersky.com/commentajax.aspx";
    var commentCookieName = "CommentConent";
    var randomNumber = function (n) {
        var rnd = '';
        for (var i = 0; i < n; i++)
            rnd += Math.floor(Math.random() * 10);
        return rnd;
    };
    var chineseStrLen = function (str) {
        var len = 0;
        for (var i = 0; i < str.length; i++) {
            var c = str.charCodeAt(i);
            //单字节加1   
            if ((c >= 0x0001 && c <= 0x007e) || (0xff60 <= c && c <= 0xff9f)) {
                len++;
            }
            else {
                len += 2;
            }
        }
        return len;
    };
    var addComment = function (userName, commentContent, commentValidCode, referenceId, isGuest, commentValidCodeEle) {

        if (commentContent.length > 500) {
            alert("发表评论字数不能超500字！");
            return;
        }

        var _commentContent = commentContent.replace(/[\r\n]/g, '<br />');
        _commentContent = encodeURI($.trim(_commentContent));


        var jsondata = {
            type: "addcomment",
            username: userName,
            commenttitle: '',
            content: _commentContent,
            email: '',
            gid: $(".commentStatus").attr("itemid"),
            nid: $(".commentStatus").attr("nodeid"),
            "private": false,
            position: 0,
            score: 0,
            TxtValidCode: commentValidCode,
            isguest: isGuest.toString(),
            referenceid: referenceId
        };

        $.ajax({
            type: "GET",
            url: commentJsonpUrl,
            dataType: "jsonp",
            data: {
                jsondata: JSON2.stringify(jsondata)
            },
            success: function (responseJson) {
                switch (responseJson.status) {
                    case "ok":
                        $.removeCookie(commentCookieName, { path: '/' });
                        if (typeof (initComment) == "function") {

                            $.ajax({
                                type: "GET",
                                url: commentJsonpUrl,
                                dataType: "jsonp",
                                data: {
                                    jsondata: JSON2.stringify({ type: "removecache", itemId: $(".commentStatus").attr("itemid") })
                                },
                                success: function (responseJson) {
                                    initComment();
                                }
                            });

                        }
                        break;
                    case "check":
                        $.removeCookie(commentCookieName, { path: '/' });
                        if (typeof (initComment) == "function") {

                            $.ajax({
                                type: "GET",
                                url: commentJsonpUrl,
                                dataType: "jsonp",
                                data: {
                                    jsondata: JSON2.stringify({ type: "removecache", itemId: $(".commentStatus").attr("itemid") })
                                },
                                success: function (responseJson) {
                                    initComment();
                                }
                            });

                        }
                        else {
                            window.location.href = '#commentform';
                        }
                        break;
                    case "err":
                        alert("发表评论失败！");
                        break;
                    case "nopurview":
                        alert("此栏目已禁止发表评论！");
                        break;
                    case "noTourists":
                        alert("此栏目已禁止游客发表评论！");
                        break;
                    case "checkCodeError":
                        $(commentValidCodeEle).click();
                        alert("您输入的验证码和系统产生的不一致，请重新输入！");
                        break;
                    case "lenError":
                        alert("发表评论字数不能超500字！");
                        break;
                    default:
                        alert("发表评论失败！");
                        break;
                }
            }
        });

    };
    $.fn.extend({
        comment: function (options) {
            $(window).unload(function () {
                $.removeCookie(commentCookieName, { path: '/' });
            });

            return this.each(function () {
                var op = $.extend({
                    itemId: parseInt($(this).attr("itemId")),
                    nodeId: parseInt($(this).attr("nodeId")),
                    isShowMore: $(this).attr("isShowMore"),
                    isShowHot: $(this).attr("isShowHot"),
                    showListType: $(this).attr("showListType"),
                    isPage: 'true',
                    pageSize: parseInt($(this).attr("pageSize")) == 0 ? 10 : parseInt($(this).attr("pageSize")),
                    currentPage: 0
                }, options);

                var $this = $(this);
                $this.html("");
                $(".commentloading").show();

                var jsondata = {
                    type: "updatelabel", labelname: "游民星空评论", attr: {
                        generalId: op.itemId,
                        nodeId: op.nodeId,
                        displayType: 'all',
                        isShowMore: op.isShowMore,
                        isShowHot: op.isShowHot,
                        commnetPageSize: op.pageSize,
                        showListType: op.showListType
                    }
                };

                $.ajax({
                    type: "GET",
                    url: commentJsonpUrl,
                    dataType: "jsonp",
                    data: {
                        jsondata: JSON2.stringify(jsondata)
                    },
                    success: function (responseJson) {
                        $this.append($(responseJson.body));
                        $this.find(".commentlist").commentList({
                            callback: function () {
                                $(".commentloading").hide();

                                $this.find(".commentCount").text($this.find(".commentlist").attr("total"));
                                var showCommentList = $this.find(".commentlist").attr("showCommentList");
                                if (showCommentList == "false") {
                                    $this.find(".hd").hide();
                                    $this.find(".bd .title").remove();
                                    $this.find(".bd").prepend($this.find(".hd .title"));
                                }
                            }
                        });

                        $this.find(".commentHotList").commentHot();

                        $this.find(".mainCommentContainer").commentAdd();
                        $this.find(".mainCommentContainer").commentUserLogin();
                    }
                });
            });
        },
        commentHot: function (options) {
            return this.each(function () {
                var $this = $(this);
                var op = $.extend({
                    itemId: parseInt($(this).attr("itemId")),
                    nodeId: parseInt($(this).attr("nodeId")),
                    listLabelName: '游民星空热门评论'
                }, options);

                var jsondata = {
                    type: "updatelabel", labelname: op.listLabelName, attr: {
                        itemId: op.itemId
                    }
                };

                $.ajax({
                    type: "GET",
                    url: commentJsonpUrl,
                    dataType: "jsonp",
                    data: {
                        jsondata: JSON2.stringify(jsondata)
                    },
                    success: function (responseJson) {
                        $this.html(responseJson.body);
                        $this.commentAction();
                    }
                });
            });
        },
        commentAdd: function (options) {
            return this.each(function () {
                var $this = $(this);
                var $title = $this.find(".title");
                var template = $("#addCommentTemplate").html();
                $this.html("");
                $this.append($title);
                $this.append($(template));

                var _$mainCommentContent = $this.find('.mainCommentContent');

                _$mainCommentContent.keyup(function () {
                    var maxChars = 500;
                    if ($(this).val().length > maxChars)
                        $(this).val($(this).val().substring(0, maxChars));
                    var curr = maxChars - $(this).val().length;
                    $this.find('.butleft').html('剩余字数：' + curr.toString());
                });
                _$mainCommentContent.keydown(function (event) {
                    event.stopPropagation();
                });
                var _userName = $(".commentStatus").attr("commentusername");

                $this.find('.mainCommentValidCodeImg').click(function () {
                    var imageSrc = $(this).attr("src");
                    if (imageSrc.indexOf("?") >= 0) {
                        $(this).attr("src", imageSrc.split("?")[0] + '?code=' + randomNumber(10));
                    }
                    else {
                        $(this).attr("src", imageSrc + '?code=' + randomNumber(10));
                    }
                });

                $this.find(".mainSubmitButton").click(function () {
                    var _userName = $(".commentStatus").attr("commentusername");
                    var commentPermissionType = $(".commentStatus").attr("commentpermissiontype");
                    var _$replyIsUser = $this.find('.replyIsGuest');
                    if (commentPermissionType == "1" && _userName == '游客') {
                        alert("请先登录再发表评论！");
                        return false;
                    }
                    if (commentPermissionType == 0 && !_$replyIsUser.attr("checked") && _userName == '游客') {
                        alert("请先登录或选择游客发表！");
                        return false;
                    }

                    if ($.trim(_$mainCommentContent.val()) == '') {
                        alert("请输入评论内容！");
                        _$mainCommentContent.focus();
                        return false;
                    }

                    if (_$replyIsUser.attr("checked") && _userName == '游客' && chineseStrLen(_$mainCommentContent.val()) < 10) {
                        alert("游客发表，评论内容不得少于5个字！");
                        _$mainCommentContent.focus();
                        return false;
                    }

                    var _validCode = '';
                    var _validCodeType = $(".commentStatus").attr("commentvalidatecodetype");
                    if (_validCodeType == '0' || (_validCodeType == '1' && _userName == '游客')) {
                        var _$mainCommentValidCode = $this.find('.mainCommentValidCode');
                        if (_$mainCommentValidCode.length != 0 && _$mainCommentValidCode.val() == '') {
                            alert("请输入验证码！");
                            _$mainCommentValidCode.focus();
                            return false;
                        }
                        _validCode = _$mainCommentValidCode.val();
                    }
                    var _commentContent = _$mainCommentContent.val();

                    addComment(_userName, _commentContent, _validCode, 0, false, '.mainCommentValidCode');
                });
            });
        },
        commentList: function (options) {
            return this.each(function () {
                var op = $.extend({
                    itemId: parseInt($(this).attr("itemId")),
                    nodeId: parseInt($(this).attr("nodeId")),
                    pageSize: parseInt($(this).attr("pageSize")) == 0 ? 10 : parseInt($(this).attr("pageSize")),
                    listLabelName: '游民星空评论列表',
                    currentPage: parseInt($(this).attr("currentPage")) == 0 ? 1 : parseInt($(this).attr("currentPage")),
                    showCommentList: $(this).attr("showCommentList"),
                    callback: function () { }
                }, options);
                var $this = $(this);

                var jsondata = {
                    type: "updatelabel", labelname: op.listLabelName, currentpage: op.currentPage, cachetime: 60, attr: {
                        itemId: op.itemId,
                        page: 'true',
                        pagesize: op.pageSize,
                        currentpage: op.currentPage
                    }
                };

                $.ajax({
                    type: "GET",
                    url: commentJsonpUrl,
                    dataType: "jsonp",
                    data: {
                        jsondata: JSON2.stringify(jsondata)
                    },
                    success: function (responseJson) {
                        if (op.showCommentList == "false") {
                            $this.hide();
                        }
                        $this.html(responseJson.body);
                        $this.attr("total", responseJson.total);
                        $($this.attr("pager")).commentPager();
                        $this.commentAction();
                        op.callback();
                    }
                });
            });
        },
        commentUserLogin: function (options) {
            return this.each(function () {
                var $this = $(this);

                $(document).bind('login', function () {
                    var parentComment = $this.parents("#commentform");
                    var op = {
                        itemId: parseInt(parentComment.attr("itemId")),
                        nodeId: parseInt(parentComment.attr("nodeId")),
                        isShowMore: parentComment.attr("isShowMore"),
                        isShowHot: parentComment.attr("isShowHot"),
                        showListType: parentComment.attr("showListType"),
                        pageSize: parseInt(parentComment.attr("pageSize")) == 0 ? 10 : parseInt(parentComment.attr("pageSize"))
                    };
                    var jsondata = {
                        type: "updatelabel", labelname: "游民星空评论", attr: {
                            generalId: op.itemId,
                            nodeId: op.nodeId,
                            displayType: 'template',
                            isShowMore: op.isShowMore,
                            isShowHot: op.isShowHot,
                            commnetPageSize: op.pageSize,
                            showListType: op.showListType
                        }
                    };

                    $.ajax({
                        type: "GET",
                        url: commentJsonpUrl,
                        dataType: "jsonp",
                        data: {
                            jsondata: JSON2.stringify(jsondata)
                        },
                        success: function (responseJson) {
                            $("#replayCommentTemplate,#addCommentTemplate,.commentStatus").remove();
                            parentComment.append($(responseJson.body));
                            $(document).trigger('updateReplay');
                            $(".mainCommentContainer").commentAdd();
                            $(".mainCommentContainer").commentUserLogin();
                        }
                    });
                });

                $(document).bind('logout', function () {
                    var parentComment = $this.parents("#commentform");
                    var op = {
                        itemId: parseInt(parentComment.attr("itemId")),
                        nodeId: parseInt(parentComment.attr("nodeId")),
                        isShowMore: parentComment.attr("isShowMore"),
                        isShowHot: parentComment.attr("isShowHot"),
                        showListType: parentComment.attr("showListType"),
                        pageSize: parseInt(parentComment.attr("pageSize")) == 0 ? 10 : parseInt(parentComment.attr("pageSize"))
                    };
                    var jsondata = {
                        type: "updatelabel", labelname: "游民星空评论", attr: {
                            generalId: op.itemId,
                            nodeId: op.nodeId,
                            displayType: 'template',
                            isShowMore: op.isShowMore,
                            isShowHot: op.isShowHot,
                            commnetPageSize: op.pageSize,
                            showListType: op.showListType
                        }
                    };

                    $.ajax({
                        type: "GET",
                        url: commentJsonpUrl,
                        dataType: "jsonp",
                        data: {
                            jsondata: JSON2.stringify(jsondata)
                        },
                        success: function (responseJson) {
                            $("#replayCommentTemplate,#addCommentTemplate,.commentStatus").remove();
                            parentComment.append($(responseJson.body));
                            $(document).trigger('updateReplay');
                            $(".mainCommentContainer").commentAdd();
                            $(".mainCommentContainer").commentUserLogin();
                        }
                    });
                });

            });
        },
        commentAction: function (options) {
            return this.each(function () {
                var $this = $(this);
                $this.find(".addpkzone").click(function (event) {
                    event.preventDefault();
                    var $addpkzone = $(this);

                    var jsondataPK = {
                        type: "addcommentpk", commentid: parseInt($addpkzone.attr("rel")), position: 1, content: "support"
                    };

                    $.ajax({
                        type: "GET",
                        url: commentJsonpUrl,
                        dataType: "jsonp",
                        data: {
                            jsondata: JSON2.stringify(jsondataPK)
                        },
                        success: function (responseJson) {
                            switch (responseJson.status) {
                                case "ok":
                                    $addpkzone.find(".comment_pkcount").html(parseInt($addpkzone.find(".comment_pkcount").html()) + 1);
                                    break;
                                case "AnonymousAgain":
                                case "UserAgain":
                                    alert("对不起，您已经顶过了！");
                                    break;
                                case "NotAuthenticated":
                                    alert("登录会员才能使用！");
                                    if (window.location.hash) {
                                        window.location.hash = "";
                                    }
                                    window.location.hash = "#commentLogin";
                                    break;
                                default:
                                    alert("提交失败！");
                                    break;
                            }
                        }
                    });

                });

                $this.find("a[rel='moreline']").click(function (event) {
                    event.preventDefault();
                    var refCommentId = $(this).attr("refCommentId");
                    $this.find("li[rel='refCommentList'][refCommentId='" + refCommentId + "']").show();
                    $(this).parents(".refCommentMore").hide();
                });

                $this.find(".replyButtonLink,.repalyLink a").click(function (event) {
                    event.preventDefault();

                    $this.find(".closeReplayCommentButton").click();

                    var $replayButtonLink = $(this);

                    var commentId = $replayButtonLink.attr("rel");
                    var $replay = $("");

                    if ($(this).attr("refcommentid")) {
                        var refCommentId = $(this).attr("refcommentid");
                        $replay = $this.find('.replyBox[rel="' + commentId + '"][refcommentid="' + refCommentId + '"]');
                    }
                    else {
                        $replay = $this.find('.newreply[rel="' + commentId + '"]');
                    }

                    var template = $("#replayCommentTemplate").html();
                    var _$replyContainer = $(template);
                    $replay.html("");
                    _$replyContainer.appendTo($replay).show();
                    $replayButtonLink.attr("data-state", "open");
                    $replay.focus();
                    $replay.find(".closeReplayCommentButton").click(function () {
                        $replay.html("");
                        $replayButtonLink.attr("data-state", "close");
                    });


                    $replay.commentUserLogin();

                    $(document).one('updateReplay', function () {
                        if ($replayButtonLink.attr("data-state") == "open") {
                            $replayButtonLink.click();
                        }
                    });

                    var $cookieContent = $.cookie(commentCookieName);
                    if ($cookieContent) {
                        $replay.find(".replyCommentContent").val($cookieContent);
                    }

                    $replay.find(".replyCommentContent").keyup(function () {
                        var maxChars = 500;
                        $.cookie(commentCookieName, $(this).val(), { expires: 7, path: '/' });
                        if ($(this).val().length > maxChars)
                            $(this).val($(this).val().substring(0, maxChars));
                        var curr = maxChars - $(this).val().length;
                        $replay.find('.replyChLeft').html(curr.toString());
                    });
                    $replay.find(".replyCommentContent").keydown(function (event) {
                        event.stopPropagation();
                    });

                    $replay.find('.replyCommentValidCodeImg').click(function () {
                        var imageSrc = $(this).attr("src");
                        if (imageSrc.indexOf("?") >= 0) {
                            $(this).attr("src", imageSrc.split("?")[0] + '?code=' + randomNumber(10));
                        }
                        else {
                            $(this).attr("src", imageSrc + '?code=' + randomNumber(10));
                        }
                    });
                    $replay.find(".replySubmitButton").click(function () {
                        var _userName = $(".commentStatus").attr("commentusername");
                        var commentPermissionType = $(".commentStatus").attr("commentpermissiontype");
                        var _$replyIsUser = $replay.find('.replyIsGuest');
                        if (commentPermissionType == "1" && _userName == '游客') {
                            alert("请先登录再发表评论！");
                            return false;
                        }
                        if (commentPermissionType == 0 && !_$replyIsUser.attr("checked") && _userName == '游客') {
                            alert("请先登录或选择游客发表！");
                            return false;
                        }
                        var _commentId = commentId;
                        var _$replyCommentContent = $replay.find(".replyCommentContent");
                        if ($.trim(_$replyCommentContent.val()) == '') {
                            alert("请输入评论内容！");
                            _$replyCommentContent.focus();
                            return false;
                        }

                        if (_$replyIsUser.attr("checked") && _userName == '游客' && chineseStrLen(_$replyCommentContent.val()) < 10) {
                            alert("游客发表，评论内容不得少于5个字！");
                            _$replyCommentContent.focus();
                            return false;
                        }

                        var _validCode = '';
                        var _validCodeType = $(".commentStatus").attr("commentvalidatecodetype");
                        if (_validCodeType == '0' || (_validCodeType == '1' && _userName == '游客')) {
                            var _$replyCommentValidCode = $replay.find(".replyCommentValidCode");
                            if (_$replyCommentValidCode.length != 0 && _$replyCommentValidCode.val() == '') {
                                alert("请输入验证码！");
                                _$replyCommentValidCode.focus();
                                return false;
                            }
                            _validCode = _$replyCommentValidCode.val();
                        }
                        var _commentContent = _$replyCommentContent.val();
                        var _isGuest = false;
                        addComment(_userName, _commentContent, _validCode, _commentId, _isGuest, '.replyCommentValidCodeImg');
                    });
                });
            });
        },
        commentPager: function (options) {

            return this.each(function () {
                var op = $.extend({
                    commentList: $(this).attr("commentList"),
                    pageSize: 10,
                    listLabelName: '游民星空评论列表',
                    pageLabelName: '游民评论分页',
                    callback: function () { }
                }, options);

                var recordCount = parseInt($(op.commentList).attr("total"));
                var currentPage = parseInt($(op.commentList).attr("currentPage")) == 0 ? 1 : parseInt($(op.commentList).attr("currentPage"));
                var pageSize = parseInt($(op.commentList).attr("pageSize")) == 0 ? 10 : parseInt($(op.commentList).attr("pageSize"));
                var $this = $(this);
                if (recordCount > 0) {
                    $this.show();

                    var jsondata = {
                        type: "updatepage", labelname: op.pageLabelName, sourcename: op.listLabelName, pagesize: pageSize, currentpage: currentPage, cachetime: 60, total: recordCount
                    };

                    $.ajax({
                        type: "GET",
                        url: commentJsonpUrl,
                        dataType: "jsonp",
                        data: {
                            jsondata: JSON2.stringify(jsondata)
                        },
                        success: function (responseJson) {
                            $this.html(responseJson.body);
                            $this.find("a").click(function (event) {
                                event.preventDefault();
                                $(op.commentList).attr("currentPage", $(this).attr("page"));
                                $(op.commentList).commentList({
                                    callback: function () {
                                        var hash = window.location.hash;
                                        if (!hash) {
                                            window.location.href = window.location.href + "#comment";
                                        } else {
                                            window.location.href = window.location.href.substring(0, window.location.href.indexOf('#')) + "#comment";
                                        }

                                        if ($.browser.msie) {
                                            var cleanTitle = function (title) {
                                                if (title.indexOf('#') != -1) {
                                                    var cleanedTitle = title.substring(0, title.indexOf('#'));
                                                    title = cleanedTitle
                                                }
                                                return title;
                                            };
                                            var oldTitle = document.title || '';
                                            document.title = cleanTitle(oldTitle);
                                        }
                                    }
                                });
                            });

                            op.callback();
                        }
                    });
                }
                else {
                    $this.hide();
                }
            });
        }
    });

    function initComment() {
        $("#commentform").comment();
    };
    initComment();

    (function () {
        var cleanTitle = function (title) {
            if (title.indexOf('#') != -1) {
                var cleanedTitle = title.substring(0, title.indexOf('#'));
                title = cleanedTitle
            }
            return title;
        };
        var oldTitle = document.title || '';
        document.title = cleanTitle(oldTitle);
        document.onpropertychange = function () {
            var docTitle = document.title || '';
            if (window.event.propertyName === 'title' && docTitle !== oldTitle) {
                document.title = cleanTitle(docTitle);
            }
        }
    })();
})(jQuery);