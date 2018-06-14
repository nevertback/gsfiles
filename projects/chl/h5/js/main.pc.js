(function () {
    var wapUrl = 'index.html';
    var h5pc = {
        isLogin:function(){
            function addNotice(){
                var $head = $('.h5PcHead');
                $head.append('<img class="h5-pc-head-notice" src="ztimages/pc-wx.png" alt="notice">')
            }
            $.ajax({
                type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/logincheck",
                success: function (responseJson) {
                    if (responseJson.status !== "ok") {
                        addNotice();
                    }
                }
            });
        },
        msg:function(){
            window.addEventListener && window.addEventListener("message", function(o) {
                if (o && o.data){
                    try {
                        var u = JSON.parse(o.data);
                        switch (u.cmd) {
                            case "loginIn":
                                setTimeout(function () {
                                    if(typeof $.cookie('UserCookie') === "undefined"){
                                        window.location.reload();
                                    }
                                },200);
                                break;
                            case "loginOut":
                                window.location.reload();
                                break;
                        }
                    }
                    catch (b) {
                        SQ.log("浏览器不支持postMessage" + o.data)
                    }
                }
            });
        },
        setTop:function(){
            var $view = $('.h5View'),$iframe = $view.find('.h5ViewIframe'),$main = $('#mainWapIframe');
            function setSize() {
                var $w = $(window),
                    $ww = $w.width(),
                    $wh = $w.height(),
                    vw,vh,vt,pd,rio,
                    iw,ih;
                rio = 0.874074;
                vh = $wh*rio;
                vw = vh/944*496;
                vt = $wh*0.07962962;
                $view.css({
                    top:vt,
                    marginLeft:-vw/2+'px',
                    width:vw,
                    height:vh
                });
            }
            setSize();
            $(window).resize(function () {
                setSize();
            });
            setTimeout(function () {
                $main.attr('src',wapUrl);
            },500);
        },
        init:function () {
            this.setTop();
            this.msg();
            this.isLogin();
        }
    };
    h5pc.init();
})();