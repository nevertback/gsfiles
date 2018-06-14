(function($){
    var sourceCfg = {
        WxCode:'//image.gamersky.com/webimg13/wap/h5/gamecenter.svg'
    };
    var h5Fnc = {
        createLast:function(dt){
            var vDom = '',$last = $('#h5GameLast');
            vDom += '<h4 class="h5-title-lev1"><i></i>最近玩过</h4>';
            vDom += '<ul class="clearfix h5-game-last">';
            $.each(dt,function (i,item) {
                if(i < 4){
                    vDom += '<li>';
                    vDom += '<a target="_blank" href="//h5.gamersky.com/z/'+item.file+'/m.shtml">';
                    vDom += '<img src="//image.gamersky.com/webimg13/web/h5/icon/'+item.file+'.jpg" alt="'+item.name+'">';
                    vDom += '<span>'+item.name+'</span>';
                    vDom += '</a>';
                    vDom += '</li>';
                }
            });
            vDom += '</ul>';
            $last.html(vDom).addClass('cur');
        },
        addLast:function(dt){
            var wls = window.localStorage,tmpArr,h5LastData = wls.getItem('h5last'+dt.userid);
            if(h5LastData !== null){
                tmpArr = JSON.parse(wls.getItem('h5last'+dt.userid));
                this.createLast(tmpArr);
            }
        },
        login:function(){
            var _this = this,$headLogin = $('.h5HeadLogin'),btnDom = '';
            btnDom += '<a class="h5-btn h5-btn-login h5Login">登录</a><a class="h5-btn h5-btn-register" href="http://i.gamersky.com/user/register/">注册</a>';
            $headLogin.html(btnDom);
            $(document).on('click','.h5Login',function () {
                $(".gsZpPopLoginClose").show();
                $(".gs_zp_pop_login").show();
                $('.gsZpPopLoginClose').on('click', function () {
                    $(".gs_zp_pop_login").hide();
                    $(".gsZpPopLoginClose").hide();
                })
            })
        },
        postMsg:function(str){
            window.top !== window.self && window.parent.postMessage(JSON.stringify({
                cmd: str
            }), "*");
        },
        isLogin:function(pos){
            var _this = this;
            function personalTop(pic,name) {
                var $psTop = $('.h5PersonalTop'),vDom = '';
                if(pic === 'Anonymous'){
                    pic='//image.gamersky.com/webimg15/comment/anonymous.jpg';
                    name = '未登录';
                }
                vDom += '<img class="h5-personal-top-face h5Login" src="'+pic+'" alt="backName">';
                vDom += '<div class="h5-personal-top-name h5Login">'+name+'</div>';
                $psTop.html(vDom);
            }
            function loginOut(){
                $('.h5LoginOut').on('click', function () {
                    $.ajax({
                        type: "GET",
                        dataType: "jsonp",
                        url: "//i.gamersky.com/api/userlogout",
                        success: function (logoutJson) {
                            if (logoutJson.status === "ok"){
                                _this.postMsg('loginOut');
                                window.location.reload();
                            }
                        }
                    });
                });
            }
            function enLogin(dt){
                var backName = dt.username,
                    backFace = dt.userface.replace(/http:\/\//g,'//'),
                    $headLogin = $('.h5HeadLogin'),
                    btnDom = '';
                btnDom += '<img class="h5-head-face" src="'+backFace+'" alt="backName">';
                btnDom += '<div class="h5-head-name">'+backName+'</div>';
                btnDom += '<a class="h5-btn h5-btn-login-out h5LoginOut">退出</a>';
                $headLogin.html(btnDom);
                if(pos === 'personal'){
                    personalTop(backFace,backName);
                    $('body').append('<div class="h5-personal-login h5LoginOut">退出登录</div>');
                }
                loginOut();
                if(window.localStorage){
                    _this.addLast(dt);
                }
                _this.postMsg('loginIn');
            }
            function unLogin(dt){
                if(pos === 'personal'){
                    personalTop('Anonymous');
                    $('body').append('<a class="h5-personal-login h5Login">登录</a>');
                }
                _this.login();
            }
            $.ajax({
                type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/logincheck",
                success: function (responseJson) {
                    if (responseJson.status === "ok") {
                        enLogin(responseJson);
                    }else{
                        unLogin(responseJson);
                    }
                }
            });
        },
        swp:function(){
            var $swp = $('.h5Swp'),$page = $swp.find('.swiper-pagination');
            var swp = new Swiper($swp,{
                loop: !0,
                pagination: $page,
                autoplay: 3e3,
                autoplayDisableOnInteraction: !1
            });
        },
        announce:function(){
            var $announce = $('.h5Announce');
            var swpList = new Swiper($announce,{
                direction : 'vertical',
                loop: !0,
                autoplay: 2e3,
                autoplayDisableOnInteraction: !1
            });
        },
        giftsFnc:function(){
            var giftsData = window.h5GiftData,$box = $('#h5GiftBox'),vDom = '';
            function addPop(psw){
                var pDom = '';
                pDom += '<div class="h5-gifts-pop-mask h5GiftPop h5GiftPopClose"></div>';
                pDom += '<div class="h5-gifts-pop h5GiftPop">';
                pDom += '<h5>礼包领取说明</h5>';
                pDom += '<img class="h5-gifts-pop-svg" src="'+sourceCfg.WxCode+'">';
                pDom += '<p>长按二维码或者搜索“游民星空游戏中心”<br>关注公众号在对话框中输入对应密令即可领取游戏礼包</p>';
                pDom += '<span>密令：'+psw+'</span>';
                pDom += '<a class="h5-gifts-pop-close h5GiftPopClose"></a>';
                pDom += '</div>';
                $('body').append(pDom);
                $('.h5GiftPopClose').on('click',function () {
                    $('.h5GiftPop').remove();
                });
            }
            $.each(giftsData,function (i,item) {
                vDom += '<div class="h5-gift-item">';

                vDom += '<div class="h5gi-top">';
                vDom += '<img src="'+item.icon+'">';
                vDom += '<h4>'+item.title+'</h4>';
                vDom += '</div>';

                vDom += '<div class="h5gi-gifts h5giGifts">';
                $.each(item.gifts,function (i,itemGift) {
                    vDom += '<div class="h5gi-li">';
                    vDom += '<h5><i class="gs-h5-icon gs-h5-icon-libao"></i>'+itemGift.name+'</h5>';
                    vDom += '<div class="h5gi-des">'+itemGift.des+'</div>';
                    vDom += '<a class="h5gi-psw h5giPsw" data-psw="'+itemGift.psw+'">领取</a>';
                    vDom += '</div>';
                });
                if(item.gifts.length>1){
                    vDom += '<a class="h5gi-more h5GiftMore"><span class="h5gi-more-down">查看</span><span class="h5gi-more-up">收起</span>更多礼包（共'+item.gifts.length+'个）<i></i></a>';
                }
                vDom += '</div>';
                vDom += '</div>';
            });
            $box.html(vDom);
            $box.find('.h5GiftMore').on('click',function () {
                var $this = $(this),$dad = $this.closest('.h5giGifts'),isClked = $this.attr('data-clked');
                if(isClked === 'clicked'){
                    $this.attr('data-clked','no');
                    $dad.removeClass('cur');
                }else{
                    $this.attr('data-clked','clicked');
                    $dad.addClass('cur');
                }
            });
            $('.h5giPsw').on('click',function () {
                var $this = $(this),psw = $this.data('psw');
                addPop(psw);
            });
        },
        personalFnc:function(){
            var $btn = $('.h5pPopBtn'),$pop = $('.h5pPop'),$head = $pop.find('.h5pHead'),$context = $pop.find('.h5pContext');
            function popService() {
                $head.html('联系客服');
                var vDom = '';
                vDom += $('.h5pPopDataService').html();
                return vDom;
            }
            function popNews() {
                $head.html('新闻资讯');
                var vDom = '';
                vDom += '';
                vDom += $('.h5pPopDataNews').html();
                return vDom;
            }
            function popContext(sel){
                var vDom;
                if(sel === 'service'){
                    vDom = popService();
                }else{
                    vDom = popNews();
                }
                $context.html(vDom);
            }
            $btn.on('click',function () {
                var sel = $(this).data('sel');
                $pop.addClass('cur');
                $('html').css('overflow','hidden');
                popContext(sel);
            });
            $pop.on('click','.h5pPopClose',function () {
                $pop.removeClass('cur');
                $('html').css('overflow','');
            });
        },
        init:function () {
            var _this = this,$main = $('.h5Main'),pos = $main.data('pos');
            $('.h5Nav-'+pos).addClass('cur');
            _this.isLogin(pos);
            if(pos === 'index'){
                _this.swp();
                _this.announce();
            }else if(pos === 'gift'){
                _this.giftsFnc();
            }else if(pos === 'personal'){
                _this.personalFnc();
            }
        }
    };
    h5Fnc.init();
})(jQuery);