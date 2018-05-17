(function($){
    function logoFnc() {
        var logoData = window.logoDataOrigin,$logoArea = $('#gsLogoArea'),vDom = '';
        vDom += '<ul class="clearfix list">';
        $.each(logoData,function (i,item) {
            var picDom = '<img src="'+item.pic+'" alt="'+item.name+'">';
            if(item.url === 'no'){
                vDom += '<li><a style="cursor: default;">'+picDom+'</a></li>';
            }else{
                vDom += '<li><a target="_blank" href="'+item.url+'">'+picDom+'</a></li>';
            }
        });
        vDom += '</ul>';

        $logoArea.html(vDom);
    }
    function sld(sldId){
        var $sldId = $(sldId),
            $sldCon = $sldId.find('.gsSldCon'),
            $sldNav = $sldId.find('.gsSldNav');
        $(sldId).slide({
            titCell:$sldNav,
            titOnClassName:'cur',
            mainCell:$sldCon,
            effect:'leftLoop',
            delayTime:250,
            interTime:3500,
            switchLoad:'data-src',
            autoPage:'<li></li>',
            autoPlay:true
        });
    }
    logoFnc();
    sld('#gsSld2');
})(jQuery);