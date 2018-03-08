var pgConfig = {
    userMute:false,
    preLoadList:[
        'ztimages/bg-long.jpg',
        'http://img7.gamersky.com/zqimg/dgy/mhw/pc/bg_begin.jpg',
        'http://img7.gamersky.com/zqimg/dgy/mhw/pc/bg_hunt.jpg',
        'http://img7.gamersky.com/zqimg/dgy/mhw/pc/bg_comm.jpg',
        'http://img7.gamersky.com/zqimg/dgy/mhw/pc/bg_end.jpg'
    ]
};
(function ($) {
	$.fn.extend({
        setRem:function (baseSize) {
            var $w = $(window),$ww = $w.width();
            if($ww > baseSize){
                $ww = baseSize;
            }
            this.css('font-size',$ww/baseSize*100+'px');
        },
        pageBgm:function (bgmid,pausecls) {
            var bgm = document.getElementById(bgmid),$this = this;
            $(document).one('touchstart',function () {
                $this.removeClass(pausecls);
                bgm.play();
            });
            if(pgConfig.userMute === false){
                $this.removeClass(pausecls);
                bgm.play();
            }else{
                $this.addClass(pausecls);
                bgm.pause();
            }
            $this.on('tap',function () {
                pgConfig.userMute === true?pgConfig.userMute = false:pgConfig.userMute = true;
                if(pgConfig.userMute === false){
                    $this.removeClass(pausecls);
                    bgm.play();
                }else{
                    $this.addClass(pausecls);
                    bgm.pause();
                }
            });
            $(window).on({
                'blur':function(){
                    bgm.pause();
                },
                'focus':function(){
                    if(pgConfig.userMute === false){
                        bgm.play();
                    }
                }
            });
            document.addEventListener('visibilitychange', function() {
                var isHidden = document.hidden;
                if (isHidden) {
                    bgm.pause();
                } else {
                    if(pgConfig.userMute === false){
                        bgm.play();
                    }
                }
            });
        },
        loading:function (callback) {
            var $this = this,$ld = $('#loading'),$lda = $('#loadingAnim');
            $ld.show();
            $lda.show();
            function loaded() {
                $ld.fadeOut(300);
                $lda.fadeOut(300);
                if(typeof callback === 'function'){
                    callback&&callback();
                }
            }
            var imglist = pgConfig.preLoadList;
            $this.jpreLoader({
                splashVPos: "0",
                splashID: "#loadingAnim",
                showSplash: true,
                loaderVPos: '0%',
                autoClose: true,
                ldlist:imglist
            }, function() {
                loaded();
            });
        }
    });
})(jQuery);
(function ($) {
    var gs = {
        render:function (isDev) {
            if(isDev === true){
                $('#loading,#loadingAnim').hide();
            }else{
                $('body').loading(function () {
                    $('.volBtn').pageBgm('bgm','volPause');
                });
            }

        },
        resizeRender:function () {
            $('html').setRem(720);
            $(window).resize(function () {
                $('html').setRem(720);
            });
        },
        init:function(){
            this.resizeRender();
            this.render(true);
        }
    };
    gs.init();
})(jQuery);