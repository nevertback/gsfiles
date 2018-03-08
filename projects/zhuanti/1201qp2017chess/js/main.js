(function($){
    var chessjs = {
        tab1:function () {
            var $tab = $('.chess-tab'),$nav = $tab.find('.nav-item');
            $nav.on('click',function () {
                var $this = $(this),idx = $this.index();
                $nav.removeClass('active').eq(idx).addClass('active');
                $tab.find('.content-main-item').removeClass('active').eq(idx).addClass('active');
            });
        },
        sld1:function () {
            // 上一个点击
            $('.culture-preview-prev').on('click', function() {
                if ( iNow === 0 ) {
                    iNow = 0;
                } else {
                    iNow--;
                }
                imgMove();
                disAbled();
            });

            // 下一个点击
            var iNow = 0;
            $('.culture-preview-next').on('click', function() {
                if ( iNow === $('.culture-preview-item').length-1 ) {
                    iNow = $('.culture-preview-item').length-1;
                } else {
                    iNow++;
                }
                imgMove();
                disAbled();
            });

            // 小图点击
            $('.culture-preview-item').on('click', function() {
                iNow = $(this).index();
                imgMove();
                disAbled();
            });

            // 底部图片轮播
            function imgMove() {
                $('.culture-img-list').stop().animate({
                    'left': - iNow * $('.culture-img-item').width()
                }, 500);
                $('.culture-preview-img').stop().animate({
                    'left': - iNow * 198
                }, 500);

                $('.culture-preview-item').eq(iNow).addClass('active').siblings().removeClass('active');
                // 文字淡入淡出
                $('.culture-decr').stop().animate({
                    'transition': 'all .3s',
                    'opacity': 0
                }, 300, function () {
                    $(this).css('display', 'none');
                }).eq(iNow).stop().animate({
                    'transition': 'all .3s',
                    'opacity': 1
                }, 500, function() {
                    $(this).css('display', 'block');
                });
            }

            function disAbled() {
                // 按钮disable切换
                if (iNow === 0) {
                    $('.culture-preview-prev').addClass('disabled');
                } else if (iNow === $('.culture-preview-item').length-1 ) {
                    $('.culture-preview-next').addClass('disabled');
                } else {
                    $('.culture-preview-prev').removeClass('disabled');
                    $('.culture-preview-next').removeClass('disabled');
                }
            }

        },
        cheres:function () {
            var player = null;
            function playDialogVideo(playBtn, vid) {
                $(playBtn).on('click', function() {
                    player = new Txplayer({
                        containerId: 'video-dialog-box',
                        vid: vid,
                        width: '890',
                        height: '534',
                        autoplay: true
                    });
                    $('.video-mark').show();
                    $('.video-dialog').show();
                })
            }
            function closeDialogVideo() {
                $('.video-dialog-close').on('click', function() {
                    $('.video-mark').hide();
                    $('.video-dialog').hide();
                    player = null;
                })
            }
            playDialogVideo('.content-video-box', 'y03567wa1kf');
            closeDialogVideo();
        },
        init:function () {
            this.tab1();
            this.sld1();
            this.cheres();
        }
    };
    chessjs.init();
})(jQuery);