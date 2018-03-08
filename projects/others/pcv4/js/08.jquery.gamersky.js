///<reference path="/js/jquery-1.9.1.js"/>
///<reference path="/js/jquery.hotkeys.js"/>
(function ($) {
    $.fn.ContentHit = function (options) {
        return this.each(function () {
            var $this = $(this);
            $.ajax({
                type: "GET",
                dataType: "jsonp",
                url: "http://click.gamersky.com/Common/GetHits.aspx",
                data: {
                    id: $this.attr("generalId"),
                    script: "3"
                },
                success: function (data) {
                    $this.html(data.hits);
                }
            });
        });
    };

    $.fn.ContentHrefHit = function (options) {
        return this.each(function () {
            var $this = $(this);
            var hot = 'false';
            if ($this.attr("data-hot")) {
                hot = $this.attr("data-hot");
            }
            var fieldName = "";
            if ($this.attr("data-fieldName")) {
                fieldName = $this.attr("data-fieldName");
            }
            $this.click(function () {
                $.ajax({
                    type: "GET",
                    dataType: "jsonp",
                    url: "http://click.gamersky.com/Common/GetHits.aspx",
                    data: {
                        id: $this.attr("data-itemid"),
                        script: "3",
                        hot: hot,
                        fieldName: fieldName
                    },
                    success: function (data) {
                    }
                });
            });
        });
    };


    $.fn.PagerHotKey = function (options) {
        return this.each(function () {
            var $this = $(this);
            $(document).bind('keydown', 'left', function (event) {
                if ($(event.target).is('textarea')) {
                    return;
                }
                var currentPage = $this.find("b");
                if (currentPage.prev("a").length > 0) {
                    window.location.href = currentPage.prev("a").attr("href");
                }
            });
            $(document).bind('keydown', 'right', function (event) {
                if ($(event.target).is('textarea')) {
                    return;
                }
                var currentPage = $this.find("b");
                if (currentPage.next("a").length > 0) {
                    window.location.href = currentPage.next("a").attr("href");
                }
            });
        });
    }
})(jQuery);

$("#countn").ContentHit();
//init
$(document).ready(function () {
    // $(".countHit").ContentHrefHit();
    $(document).on("click", ".countHit,.countHitSql", function () {
        var $this = $(this);
        var judge = "false";
        if ($this.hasClass("countHitSql")) {
            judge = "true";
        }
        var hot = 'false';
        if ($this.attr("data-hot"))
        {
            hot = $this.attr("data-hot");
        }
        var fieldName = "";
        if ($this.attr("data-fieldName"))
        {
            fieldName = $this.attr("data-fieldName");
        }
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://click.gamersky.com/Common/GetHits.aspx",
            data: { id: $this.attr("data-itemid"), script: "3", hot: hot, fieldName: fieldName, judge: judge },
            success: function (data){ }
        });
    });

    $(".page_css").PagerHotKey();

    var cycm = "";
    $(".cy_comment").each(function () {
        if (cycm != "") {
            cycm = cycm + ","
        }
        cycm = cycm + $(this).attr("data-sid");
    });
    var cycmIds = "";
    $(".cy_commentnum").each(function () {
        if (cycmIds != "") {
            cycmIds = cycmIds + ","
        }
        cycmIds = cycmIds + $(this).attr("data-sid");
    });
    var gshit = "";
    $(".gshit").each(function () {
        if (gshit != "") {
            gshit = gshit + ","
        }
        gshit = gshit + $(this).attr("data-gid");
    });
    function addCyComment(arr) {
        $.ajax({
            type: "GET",
            url: "http://cm.gamersky.com/commentapi/count",
            dataType: "jsonp",
            data: {
                topic_source_id: arr
            },
            success: function (responseJson) {
                $(".cy_comment").each(function () {
                    if (responseJson.result.hasOwnProperty($(this).attr("data-sid"))) {
                        var cmobj = responseJson.result[$(this).attr("data-sid")];
                        $(this).text(cmobj.joinCount).attr('data-lddt','yes');
                    }
                });
            }
        });
    }
    function addCyCommentnum(arr) {
        $.ajax({
            type: "GET",
            url: "http://cm.gamersky.com/commentapi/count",
            dataType: "jsonp",
            data: {
                topic_source_id: arr
            },
            success: function (responseJson) {

                $(".cy_commentnum").each(function () {
                    if (responseJson.result.hasOwnProperty($(this).attr("data-sid"))) {
                        var cmobj = responseJson.result[$(this).attr("data-sid")];
                        $(this).text(cmobj.comments).attr('data-lddt','yes');
                    }
                });
            }
        });
    }
    function addGshit(arr) {
        $.ajax({
            type: "GET",
            url: "http://db2.gamersky.com/showAllHits.aspx",
            dataType: "jsonp",
            data: {
                id: arr
            },
            success: function (responseJson) {
                for (var i = 0; i < responseJson.length; i++) {
                    var hitobj = responseJson[i];
                    $(".gshit[data-gid='" + hitobj.generalId + "']").text(hitobj.hits).attr('data-lddt','yes');
                }
            }
        });
    }
    function separateArray(targetArr,size,callback) {
        function sliceArray(array, size) {
            var result = [];
            for (var x = 0; x < Math.ceil(array.length / size); x++) {
                var start = x * size;
                var end = start + size;
                result.push(array.slice(start, end));
            }
            return result;
        }
        var arrTmp = targetArr.split(','),arr = [];
        arr = sliceArray(arrTmp,size);
        $.each(arr,function (i,item) {
            var getArr = item+'';
            if(typeof callback === 'function'){
                callback(getArr);
            }
        });
    }
    if (cycm != "") {
        separateArray(cycm,180,addCyComment);
    }
    if (cycmIds != "") {
        separateArray(cycmIds,180,addCyCommentnum);
    }
    if (gshit != "") {
        separateArray(gshit,180,addGshit);
    }

});