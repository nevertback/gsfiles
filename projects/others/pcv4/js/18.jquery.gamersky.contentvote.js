///<reference path="/js/jquery-1.9.1.js"/>
///<reference path="/js/jquery.hotkeys.js"/>
(function ($) {
    $.fn.ContentVote = function (options) {
        return this.each(function () {
            var $this = $(this);
            var generalId = $this.attr("data-id");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://db5.gamersky.com/ContentVoteJsonp.aspx",
                data: {
                    id: generalId, a: "0"
                },
                success: function (data) {
                    $this.find(".votelist .tit").text(data.vote.VoteTitle);

                    for (var i = 0; i < data.items.length; i++) {
                        var li = $('<li class="txt"><input type="radio" id="v' + i + '" name="v" value=""><label for="v' + i + '"></label></li>');

                        if (data.vote.ItemType > 0) {
                            li = $('<li class="txt"><input type="checkbox" name="v"id="v' + i + '" value=""><label for="v' + i + '"></label></li>');
                        }
                        li.find("input[name='v']").attr("value", data.items[i].Title);
                        li.find("label").text(data.items[i].Title);

                        $this.find(".votelist .btn").before(li);
                    }

                    $this.find(".toupiao-vbtn").click(function () {
                        var v = "";
                        $this.find("input[name='v']").each(function () {
                            if ($(this).attr("checked")) {
                                if (v.length > 0)
                                    v = v + ",";
                                v = v + $(this).attr("value");
                            }
                        });
                        if (v.length == 0)
                            alert("请至少选择一个选项！");
                            $.ajax({
                                type: "GET",
                                dataType: "jsonp",
                                url: "http://db5.gamersky.com/ContentVoteJsonp.aspx",
                                data: {
                                    id: generalId, a: "1", v: v
                                },
                                success: function (data) {
                                    if (data.status == "ok") {
                                        alert("投票成功！");
                                    }
                                    else {
                                        alert(data.message);
                                    }
                                }
                            });

                        return false;
                    });

                    $this.show();
                }
            });
        });
    };

    $.fn.HotVote = function (options) {
        return this.each(function () {
            var $this = $(this);
            var generalId = $(this).attr("data-itemId");
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://db5.gamersky.com/VoteJson.aspx",
                data: {
                    id: generalId, a: "init"
                },
                success: function (data) {

                    $this.find(".redPollNumber").html(data.RedPoll);
                    $this.find(".bluePollNumber").html(data.BluePoll);
                    if ((parseInt(data.RedPoll) + parseInt(data.BluePoll)) > 0) {
                        $this.find(".tiao").width(data.RedPoll / (parseInt(data.RedPoll) + parseInt(data.BluePoll)) * 100 + "%");
                    }
                }
            });

            $this.find(".votebtn").click(function () {
                $votebtn = $(this);
                var cookieKey = "hotvote-" + generalId;
                if ($.cookie(cookieKey) !== undefined && $.cookie(cookieKey) !== null) {
                    if ($votebtn.hasClass("OK") || $votebtn.hasClass("NO")) {
                        alert("当前主题只允许同一IP投票1次，您已经超过了投票次数");
                    }
                    return;
                }
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://db5.gamersky.com/VoteJson.aspx",
                    data: {
                        id: generalId, a: "vote", p: $votebtn.attr("data-point")
                    },
                    success: function (data) {
                        if (data.status == "ok") {
                            if ($votebtn.attr("data-point") == "red") {
                                $this.find(".redPollNumber").html(parseInt($this.find(".redPollNumber").html()) + 1);
                            }
                            else {
                                $this.find(".bluePollNumber").html(parseInt($this.find(".bluePollNumber").html()) + 1);
                            }

                            var redPoll = parseInt($this.find(".redPollNumber").html());
                            var bluePoll = parseInt($this.find(".bluePollNumber").html());

                            if ((redPoll + bluePoll) > 0) {
                                $this.find(".tiao").width(redPoll / (redPoll + bluePoll)*100 + "%");
                            }

                            $.cookie(cookieKey, "1", { path: "/", expires: 365 });
                        }
                        else {
                            if ($votebtn.hasClass("OK") || $votebtn.hasClass("NO")) {
                                alert("当前主题只允许同一IP投票1次，您已经超过了投票次数");
                            }
                        }
                    }
                });
            });
        });
    };

    $(document).ready(function () {
        if ($(".toupiao-Content").length > 0) {
            $(".toupiao-Content").html($(".toupiao-init").html());
            $(".toupiao-Content").attr("data-id", $(".toupiao-init").attr("data-id"));
            $(".toupiao-Content").ContentVote();
            $(".toupiao-init").hide();
        }
        else {
            $(".toupiao-init").ContentVote();
        }

        $(".hotVote").HotVote();
    });

})(jQuery);

