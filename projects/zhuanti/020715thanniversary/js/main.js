(function ($) {
	var gs = {
        lowIe:function (tarVer) {
            var sbie = $.browser.msie,
                ver = parseInt($.browser.version);
            if(sbie === true && ver <= tarVer){
                return true;
            }
        },
        box:function(){
	        var boxData = [
                {
                    calcTime:'2018/02/09 09:00:00',
                    time:'2月9日',
                    name:'三十六计',
                    pic:'ztimages/b1.jpg',
                    url:'http://yeyou.gamersky.com/c/sslj15zn.html'
                },
                {
                    calcTime:'2018/02/10 09:00:00',
                    time:'2月10日',
                    name:'三国群雄传',
                    pic:'ztimages/b2.jpg',
                    url:'http://yeyou.gamersky.com/c/sgqxz15zn.html'
                },
                {
                    calcTime:'2018/02/11 09:00:00',
                    time:'2月11日',
                    name:'热血三国3',
                    pic:'ztimages/b3.jpg',
                    url:'http://yeyou.gamersky.com/c/rxsg15zn.html'
                },
                {
                    calcTime:'2018/02/12 09:00:00',
                    time:'2月12日',
                    name:'足球大老板',
                    pic:'ztimages/b4.jpg',
                    url:'http://yeyou.gamersky.com/c/zqdlb15zn.html'
                },
                {
                    calcTime:'2018/02/13 09:00:00',
                    time:'2月13日',
                    name:'斗三国',
                    pic:'ztimages/b5.jpg',
                    url:'http://yeyou.gamersky.com/c/dsg15zn.html'
                },
                {
                    calcTime:'2018/02/14 09:00:00',
                    time:'2月14日',
                    name:'霸将三国',
                    pic:'ztimages/b6.jpg',
                    url:'http://yeyou.gamersky.com/c/bjsg15zn.html'
                },
                {
                    calcTime:'2018/02/15 09:00:00',
                    time:'2月15日',
                    name:'修仙记OL',
                    pic:'ztimages/b7.jpg',
                    url:'http://yeyou.gamersky.com/c/xxj15zn.html'
                }
            ];
            var boxDom = '',$box = $('#p3box');
            var nowDate = new Date();
            var nowTime = nowDate.getTime();
            function calcTime(et,nt) {
                return Math.floor((et-nt)/1000/60);
            }
            $.each(boxData,function (i,item) {
                var stateSty = '';
                var endDate = new Date(item.calcTime),
                    endTime = endDate.getTime();
                var ct = calcTime(endTime,nowTime);
                console.log(ct);
                if(ct <= -24*60){
                    stateSty = 'over';
                }else if(ct >-24*60 && ct <=0){
                    stateSty = 'open';
                }else if(ct >0){
                    stateSty = 'ready';
                }
                if(i===4){
                    boxDom += '<li class="row2 '+stateSty+'">';
                }else{
                    boxDom += '<li class="'+stateSty+'">';
                }
                boxDom += '<img src="'+item.pic+'" alt="'+item.name+'">';
                boxDom += '<div class="box-over box-tips"><h5>——&nbsp;&nbsp;'+item.name+'&nbsp;&nbsp;——</h5><p>活动已结束</p></div>';
                boxDom += '<div class="box-ready box-tips"><h5>——&nbsp;&nbsp;'+item.time+'&nbsp;&nbsp;——</h5><p>敬请期待</p></div>';
                boxDom += '<div class="box-bot"><a target="_blank" href="'+item.url+'">进入游戏</a></div>';
                boxDom += '</li>';
            });
            $box.html(boxDom);
        },
        parallax:function () {
            var scene = $('#scene')[0],parx;
            parx = new Parallax(scene,{
                selector: '.sceneParallax',
                hoverOnly:true
            });
        },
        init:function () {
            gs.box();
            if(gs.lowIe(9) !== true){
                gs.parallax();
            }
        }
	};
    gs.init();
})(jQuery);