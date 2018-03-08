(function($){
    var dataApi = 'http://db2.gamersky.com/GameDistributor.aspx?game_id=',
        fx = {
            countIds:[
                {
                    name:'仁王',
                    kuid:'662872',//游戏库ID
                    oldid:'993591',//众评 旧 统计ID
                    newid:'993596',//众评 新 统计ID
                    zqid:'993597' //专区 新 统计ID
                },
                {
                    name:'尼尔：机械纪元',
                    kuid:'673540',
                    oldid:'993589',
                    newid:'993595',
                    zqid:'993594'
                }
            ],
            addCountZp:function (kuid) {
                $.each(fx.countIds,function (i,item) {
                    if(item.kuid == kuid){
                        $('.tgFenxiaoMini').addClass('countHit countHitSql').attr('data-itemid',item.newid);
                        $('.YXXX-L .btn a').addClass('countHit countHitSql').attr('data-itemid',item.oldid);
                    }
                });
            },
            addCountZq:function (kuid) {
                $.each(fx.countIds,function (i,item) {
                    if(item.kuid == kuid){
                        $('.tg-fenxiao-btn').addClass('countHit countHitSql').attr('data-itemid',item.zqid);
                    }
                });
            },
            getPageGameKuId:function () {
                var kuid;
                if(typeof gameLib !== 'undefined'){
                    kuid = gameLib;
                }
                if(kuid === undefined){
                    $('#gamerskypf').data('generalid');
                }
                if(kuid === undefined){
                    kuid = $('#Remark').attr('sid');
                }
                if(kuid === undefined){
                    kuid = $('.ratingGroup').data('generalid');
                }
                return kuid;
            },
            getApiData:function(callback){
                var kuid = fx.getPageGameKuId();
                $.ajax({
                    dataType:'jsonp',
                    url:dataApi+kuid,
                    success:function (backData) {
                        if(backData.status === 1){
                            if(typeof callback === 'function'){
                                callback(backData);
                            }
                        }
                    }
                });
            },
            longStyle:function () {
                //长广告样式
                var styleDom = '';
                styleDom += '.tg-fenxiao-long{white-space: nowrap;position:relative;margin:20px auto 30px;width:100%;height:64px;background-color:#fff;-webkit-box-shadow:0 1px 0 rgba(102,102,102,.15);box-shadow:0 1px 0 rgba(102,102,102,.15);font-family:"Microsoft YaHei"}.tg-fenxiao-long div{overflow:visible}.tg-fenxiao-long a{text-decoration:none}.tg-fenxiao-long a:hover{text-decoration:none}.tg-fenxiao-long .tg-fenxiao-name{padding-left:55px;width:250px;height:64px;line-height:64px;font-size:18px;color:#262626;font-weight:700;background:url(http://image.gamersky.com/webimg15/tg/long-buy.png) 18px center no-repeat;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.tg-fenxiao-long .tg-fenxiao-right{position:absolute;right:16px;top:16px}.tg-fenxiao-long .tg-fenxiao-right .tg-fenxiao-price{position:absolute;top:0;right:118px;height:32px;line-height:32px;color:#333}.tg-fenxiao-long .tg-fenxiao-right .tg-fenxiao-price span{font-size:14px}.tg-fenxiao-long .tg-fenxiao-right .tg-fenxiao-price i{font-size:18px;font-style:normal}.tg-fenxiao-long .tg-fenxiao-right .tg-fenxiao-price.tg-fenxiao-price-off{right:168px;color:#df3900;white-space: nowrap;}.tg-fenxiao-long .tg-fenxiao-right .tg-fenxiao-price.tg-fenxiao-price-off del{margin-right:14px;font-size:14px;color:#666}.tg-fenxiao-long .tg-fenxiao-right .tg-fenxiao-btn{display:block;width:100px;height:32px;line-height:32px;background:url(http://image.gamersky.com/webimg15/tg/long-btn.png) 0 0 no-repeat;font-size:14px;color:#fff;text-align:center}.tg-fenxiao-long .tg-fenxiao-right .tg-fenxiao-btn span{display:none}.tg-fenxiao-long .tg-fenxiao-right .tg-fenxiao-btn:hover{background-position:0 -40px}.tg-fenxiao-long .tg-fenxiao-right .tg-fenxiao-btn.tg-fenxiao-btn-off{padding-left:48px;background-position:0 -79px}.tg-fenxiao-long .tg-fenxiao-right .tg-fenxiao-btn.tg-fenxiao-btn-off span{display:block;position:absolute;left:0;top:0;width:48px;text-align:center}.tg-fenxiao-long .tg-fenxiao-right .tg-fenxiao-btn.tg-fenxiao-btn-off:hover{text-decoration:none;background-position:0 -119px}';
                return styleDom;

            },
            midStyle:function () {
                //中广告样式
                var styleDom = '';
                styleDom += '.tg-fenxiao-middle{white-space: nowrap;position:relative;margin:0 15px 15px;height:39px;border-top:1px solid #424242;border-bottom:1px solid #424242}.tg-fenxiao-middle a{text-decoration:none}.tg-fenxiao-middle a:hover{text-decoration:none}.tg-fenxiao-middle .tg-fenxiao-price{position:relative;height:39px;line-height:39px;color:#f35f1c;font-family:"Microsoft YaHei"}.tg-fenxiao-middle .tg-fenxiao-price span{font-size:14px}.tg-fenxiao-middle .tg-fenxiao-price i{font-size:18px;font-style:normal}.tg-fenxiao-middle .tg-fenxiao-price.tg-fenxiao-price-off del{margin-right:14px;font-size:14px;color:#aaa}.tg-fenxiao-middle .tg-fenxiao-btn{position:absolute;right:0;top:7px;display:block;width:72px;height:25px;line-height:25px;background:url(http://image.gamersky.com/webimg15/tg/mid-btn.png) 0 0 no-repeat;font-size:12px;color:#fff0eb;text-align:center}.tg-fenxiao-middle .tg-fenxiao-btn span{display:none}.tg-fenxiao-middle .tg-fenxiao-btn:hover{background-position:0 -30px;color:#fff0eb}.tg-fenxiao-middle .tg-fenxiao-btn.tg-fenxiao-btn-off{padding-left:44px;background-position:0 -60px}.tg-fenxiao-middle .tg-fenxiao-btn.tg-fenxiao-btn-off span{display:block;position:absolute;left:0;top:0;width:44px;text-align:center}.tg-fenxiao-middle .tg-fenxiao-btn.tg-fenxiao-btn-off:hover{text-decoration:none;background-position:0 -90px}';
                return styleDom;

            },
            longPos:function (contain,dt) {
                var outDom = '',
                    info = dt.data,
                    priOld = parseInt(info.oldprice),
                    priNow = parseInt(info.price),
                    hasOff = true,
                    calcOff,diyCss = contain.data('css'),inlineSty;
                if(priOld === priNow){
                    hasOff = false;
                }else{
                    calcOff = Math.round((1-priNow/priOld)*100)+'%';
                }
                if(diyCss){
                    inlineSty = 'style="' + diyCss + '"';
                }else{
                    inlineSty = '';
                }
                outDom += '<style>'+fx.longStyle()+'</style>';
                outDom += '<div class="tg-fenxiao-long" '+inlineSty+'><div class="tg-fenxiao-name">';
                outDom += info.title;
                outDom += '</div><div class="tg-fenxiao-right">';
                if(hasOff === true){
                    outDom += '<div class="tg-fenxiao-price tg-fenxiao-price-off"><del>￥'+priOld+'</del><span>￥</span><i>'+priNow+'</i></div>';
                    outDom += '<a target="_blank" href="'+info.url+'" class="tg-fenxiao-btn tg-fenxiao-btn-off"><span>-'+calcOff+'</span>正版购买</a>';
                }else{
                    outDom += '<div class="tg-fenxiao-price"><span>￥</span><i>'+priNow+'</i></div>';
                    outDom += '<a target="_blank" href="'+info.url+'" class="tg-fenxiao-btn">正版购买</a>';
                }
                outDom += '</div></div>';
                contain.html(outDom);
            },
            midPos:function (contain,dt) {
                var outDom = '',
                    info = dt.data,
                    priOld = parseInt(info.oldprice),
                    priNow = parseInt(info.price),
                    hasOff = true,
                    calcOff;
                if(priOld === priNow){
                    hasOff = false;
                }else{
                    calcOff = Math.round((1-priNow/priOld)*100)+'%';
                }
                outDom += '<style>'+fx.midStyle()+'</style>';
                outDom += '<div class="tg-fenxiao-middle">';
                if(hasOff === true){
                    outDom += '<div class="tg-fenxiao-price tg-fenxiao-price-off"><del>￥'+priOld+'</del><span>￥</span><i>'+priNow+'</i></div>';
                    outDom += '<a target="_blank" href="'+info.url+'" class="tg-fenxiao-btn tg-fenxiao-btn-off"><span>-'+calcOff+'</span>正版购买</a>';
                }else{
                    outDom += '<div class="tg-fenxiao-price"><span>￥</span><i>'+priNow+'</i></div>';
                    outDom += '<a target="_blank" href="'+info.url+'" class="tg-fenxiao-btn">正版购买</a>';
                }
                outDom += '</div>';
                contain.html(outDom);
                fx.addCountZq(info.kuid);
            },
            miniPos:function (contain,dt) {
                var outDom = '',
                    info = dt.data;
                outDom += '<a target="_blank" href="'+info.url+'" class="tgFenxiaoMini" style="background: url(http://image.gamersky.com/webimg15/tg/mini-btn.png) center 5px no-repeat;"></a>';
                contain.append(outDom);
                fx.addCountZp(info.kuid);
            },
            insert:function (dt) {
                var thisFunction = this,
                    longId = $('#tgFenxiaoLong'),
                    midId = $('#tgFenxiaoMiddle'),
                    miniId = $('#tgFenxiaoMini'),
                    miniNav = $('.Midnav');
                if(longId.length>0){
                    thisFunction.longPos(longId,dt);
                }
                if(midId.length>0){
                    thisFunction.midPos(midId,dt);
                }
                if(miniId.length>0){
                    thisFunction.miniPos(miniNav,dt);
                }
            },
            init:function () {
                var thisFunction = this;
                thisFunction.getApiData(function (dt) {
                    thisFunction.insert(dt);
                })
            }
        };
    fx.init();
})(jQuery);