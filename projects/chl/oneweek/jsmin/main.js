'use strict';

(function ($) {
    var oneweekjs = {
        data: {
            tit: '',
            art: ''
        },
        fixNav: function fixNav() {
            var fxNav = $('.side_nav'),
                ft = fxNav.offset().top;
            function scrollFunc() {
                var $win = $(window),
                    st = $win.scrollTop();
                if ($win.width() < 1260) {
                    fxNav.hide();
                } else {
                    fxNav.show();
                }
                if (st >= ft - 50) {
                    fxNav.addClass('cur');
                } else {
                    fxNav.removeClass('cur');
                }
            }
            $(window).resize(scrollFunc).scroll(scrollFunc);
        },
        getContext: function getContext() {
            var $dataArea = $('#dataContain'),
                dataTmpTit = [],
                dataTmpArticle = [];
            $dataArea.find('.titles').find('h5').each(function () {
                dataTmpTit.push($(this).html());
            });
            $dataArea.find('.articles').each(function () {
                dataTmpArticle.push($(this).html());
            });
            $dataArea.remove();
            this.data.tit = dataTmpTit;
            this.data.art = dataTmpArticle;
        },
        insertArticle: function insertArticle(tar) {
            var dt = this.data,
                $2 = $('#section2'),
                titDom = '',
                articleDom = '';
            titDom += dt.tit[tar];
            articleDom += dt.art[tar];
            $2.find('.title').html(titDom);
            $2.find('.context').html(articleDom);
            $('#oneweekNav').find('a').removeClass().eq(tar).addClass('cur');
        },
        navClk: function navClk() {
            var thisJs = this;
            $('#oneweekNav').find('a').on('click', function () {
                var $this = $(this),
                    idx = $this.index(),
                    isOpen = $this.data('state');
                if (isOpen === 'open') {
                    thisJs.insertArticle(idx);
                }
            });
        },
        getQueryString: function getQueryString(name) {
            var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
            var r = window.location.search.substr(1).match(reg);
            if (r != null) return unescape(r[2]);
            return null;
        },
        initArticle: function initArticle() {
            var nowPage,
                len = $('#oneweekNav').find('a[data-state="open"]').length;
            if (this.getQueryString('oneweekart')) {
                nowPage = parseInt(this.getQueryString('oneweekart'));
            } else {
                nowPage = 1;
            }
            if (nowPage > len) {
                nowPage = len;
            }
            if (nowPage < 1 || isNaN(nowPage) === true) {
                nowPage = 1;
            }
            this.insertArticle(nowPage - 1);
        },
        init: function init() {
            this.fixNav();
            this.getContext();
            this.navClk();
            this.initArticle();
        }
    };
    oneweekjs.init();
})(jQuery);