(function ($) {
    var mySwiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        autoplay: true,
        loop: true,
        speed: 2000,
        paginationClickable: true,
        prevButton:'.swiper-button-prev',
        nextButton:'.swiper-button-next'
    });
})(jQuery);