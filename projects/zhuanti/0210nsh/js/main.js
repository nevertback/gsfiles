(function($){
    var nshJs = {
        tab:function () {
            var $tab = $('#zyTab'),
                $nav = $tab.find('.zyTabNav'),
                $box = $tab.find('.zyTabBox'),
                tabTimer,bgTimer;
            $nav.find('a').on({
                mouseover:function () {
                    var $this = $(this),idx = $this.index();
                    tabTimer = setTimeout(function () {
                        $nav.find('a').removeClass('cur');
                        $this.addClass('cur');
                        $box.find('.zyTabItem').removeClass('cur').eq(idx).addClass('cur');
                    },120);
                },
                mouseout:function () {
                    clearTimeout(tabTimer);
                }
            });
            $('.bpBtns').find('a').on({
                mouseover:function () {
                    var $this = $(this),idx = $this.index();
                    bgTimer = setTimeout(function () {
                        $('.bpBtns').find('a').removeClass('cur');
                        $this.addClass('cur');
                        $('.bpPics').find('img').removeClass('cur').eq(idx).addClass('cur');
                    },120);
                },
                mouseout:function () {
                    clearTimeout(bgTimer);
                }
            });
        },
        init:function () {
            this.tab();
        }
    };
    nshJs.init();
})(jQuery);