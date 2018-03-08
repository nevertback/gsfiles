(function($){
    var botJs = {
        swiper:function () {
            var e = $(".swiper-button-next"),
                i = $(".swiper-button-prev"),
                o = new Swiper(".swiper-container", {
                    pagination: ".swiper-pagination",
                    effect: "coverflow",
                    grabCursor: !0,
                    paginationClickable: !0,
                    centeredSlides: !0,
                    lazyLoading: !0,
                    speed: 1e3,
                    simulateTouch: !1,
                    autoplay: 3e3,
                    slidesPerView: "auto",
                    onSlideChangeEnd: function(o) {
                        0 == o.activeIndex ? (i.addClass("btn_hide"), e.removeClass("btn_hide")) : 2 == o.activeIndex ? (e.addClass("btn_hide"), i.removeClass("btn_hide")) : (e.removeClass("btn_hide"), i.removeClass("btn_hide"))
                    }
                });
            $(".swiper-button-next").click(function() {
                o.swipeNext()
            }), $(".swiper-button-prev").click(function() {
                o.swipePrev()
            })
        },
        diyScroll:function () {
            $(".programMain").slimScroll({
                width: "860px",
                height: "450px",
                size: "5px",
                color: "#eac641",
                position: "right",
                distance: "0px",
                start: "top",
                opacity: 1,
                alwaysVisible: !0,
                disableFadeOut: !1,
                railVisible: !0,
                railColor: "#8d4700",
                railOpacity: 1,
                railDraggable: !0,
                railClass: "slimScrollRail",
                barClass: "slimScrollBar",
                wrapperClass: "slimScrollDiv",
                allowPageScroll: !1,
                wheelStep: 20,
                touchScrollStep: 200,
                borderRadius: "0",
                railBorderRadius: "0"
            });
        },
        init:function () {
            this.swiper();
            this.diyScroll();
        }
    };
    botJs.init();
})(jQuery);