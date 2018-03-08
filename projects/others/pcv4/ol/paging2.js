///<reference path="/js/jquery-1.9.1.js"/>
///<reference path="/js/jquery.hotkeys.js"/>
//多选项卡分页
(function ($) {
    function cycm() {
        var cycm = "";
        $(".cy_comment").each(function () {
            if($(this).attr('data-lddt') !== 'yes'){
                if (cycm != "") {
                    cycm = cycm + ","
                }
                cycm = cycm + $(this).attr("data-sid");
            }
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
    }
  $.fn.ContentPage = function (options) {
    return this.each(function () {
      var $this = $(this);
      //点击页码
      $this.find("a.p1,a.p2").unbind("click").click(function (event) {
        event.preventDefault();
        options.find(".contentpaging").removeClass("block").addClass("none");
        var page;
        if ($(this).hasClass("p2")) {
          $this.find(".p3").removeClass().addClass("p2");
          $(this).removeClass().addClass("p3");
          page = parseInt($this.find(".p3").attr("data-page"));
        }else if ($(this).hasClass("previous")) {
          page = parseInt($this.find(".p3").attr("data-page")) - 1;
          if (page >= 1) {
            $this.find(".p3").removeClass().addClass("p2");
            $this.find("a[data-page='" + page + "']").removeClass().addClass("p3");
          }
        }else if ($(this).hasClass("nexe")) {
          page = parseInt($this.find(".p3").attr("data-page")) + 1;
          $this.find(".p3").removeClass().addClass("p2");
          $this.find("a[data-page='" + page + "']").removeClass().addClass("p3");
        }
        
        $this.ContentPageData(page,options);
        options.find(".contentpage").attr("data-page",page);
      });
    });
  };
  
  $.fn.ContentPageData = function (page,options) {
    return this.each(function () {
      var $this = $(this);
      $(".loadpic").removeClass("none").addClass("block");
      $("html,body").animate({scrollTop:$(".loadpic").offset().top-200}, 0);
      options.find(".contentpage").removeClass("block").addClass("none");
      
      var nodeId = options.find(".contentpaging").attr("data-nodeid");
      var isNodeId = options.find(".contentpaging").attr("data-isnodeid");
      $.ajax({
        type: "GET",dataType: "jsonp",url: "http://db2.gamersky.com/LabelJsonpAjax.aspx",
        data: {jsondata: JSON2.stringify({type: "updatenodelabel", isCache: true, cacheTime: 60, nodeId: nodeId,isNodeId:isNodeId, page: page})},
        success: function (data) {
          if (data.status = 'ok') {
            $(".loadpic").removeClass("block").addClass("none");
            options.find(".contentpaging").html(data.body).removeClass("none").addClass("block");
            options.find(".contentpage").removeClass("none").addClass("block");
            //页码处理开始
            options.PageList(page);
            //页码处理结束
            cycm();
          }
        }
      });
    });
  };

  $.fn.PageList = function (page) {
    return this.each(function () {
      var $this = $(this);
      var pageIndex = 1;
      if (page != undefined) {pageIndex = page;}
      var count = $this.find(".previous").attr("data-count");//一共多少条
      var pagesize = $this.find(".previous").attr("data-pagesize");//每页多少条
      $this.find(".previous").show();
      $this.find(".nexe").show();
      if (pageIndex == 1) {
        $this.find(".previous").hide();
      }
      if (pageIndex == Math.ceil(count / pagesize)) {
        $this.find(".nexe").hide();
      }
      $.ajax({
        type: "GET",dataType: "jsonp",url: "http://db2.gamersky.com/LabelJsonpAjax.aspx",
        data: {jsondata: JSON2.stringify({type: "getlabelpage", currentPage: pageIndex, pagesize: pagesize, recordCount: count, pagesDisplay:6})},
        success: function (data) {
          if (data.status = 'ok') {
            //清空原来的
            $this.find(".contentpage").find(".p2,.p3,em").remove();
            $this.find(".previous").after(data.body);
            $this.find(".contentpage").ContentPage($this);
          }
        }
      });
    });
  };
})(jQuery);

$(document).ready(function () { 
    $(".contentpaging:eq(0)").parent().PageList();
});
