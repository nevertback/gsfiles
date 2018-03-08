(function($){
    var ww = $(window).width(),wh = $(window).height();
    var vd = document.getElementById('video1');
    var cs = document.getElementById('myCanvas');
    cs.width = ww;
    cs.height = wh;
    ctx = cs.getContext('2d');
    var i;
    vd.addEventListener('play',function () {
        i = window.setInterval(function () {
            ctx.drawImage(vd,0,0,ww,wh);
        },20);
    },false);
    vd.addEventListener('pause',function () {
        window.clearInterval(i);
    },false);
    vd.addEventListener('ended',function () {
        clearInterval(i);
    },false);
    var playBtn = document.getElementById('play');
    playBtn.onclick = function (ev) {
        vd.play();
    }
})(jQuery);