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