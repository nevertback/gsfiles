(function(){
    //覆盖广告
    var fgS=10,	//秒倒计时关闭
        fgMinute=3,		//间隔分钟
        fgNumber=1,	//广告显示次数
        fgW = 900,	//宽度
        fgH = 350,	//高度
        //监测代码
        jcCode = 'http://image.gamersky.com/webimg13/zhuanti/common/blank.png',
        fgClose="http://image.gamersky.com/webimg15/mk1.png";	//关闭按钮
    var fgCookie1="FuGai1",fgCookie2="FuGai2";	//Cookie名称
    var fgDate=new Date(),NewTimeStamp=fgDate.getTime();
    fgDate.setTime(fgMinute*60*1000+NewTimeStamp);
    var cookietime=fgDate.getTime();

    var fgCkie=cookie(fgCookie2),fgmin=1,fgmax=1;	//1~2之间的循环
    var fgnum=fgCkie!=null? Number(fgCkie)==fgmax?fgmin:(Number(fgCkie)+1) : fgmin;
    cookie(fgCookie2,fgnum,{path:"/",expires:fgDate});

    var fgImg,fgUrl,TongJi;
    switch(fgnum){
        case 1 :
            fgImg = "http://imgf.gamersky.com/img/3gzz_900x350_0426.jpg";	//图片或flash地址
            fgUrl = "http://yeyou.gamersky.com/c/sgzz2syfg.html";	//连接地址
            TongJi="358855";
            break;
    }


    var fgwT=$(window).width(),fgwH=$(window).height();
    var fgPic="",fgSuffix=fgImg.replace(/(.+)[\\/]/,"").split(".")[1];	//获取图片或flash后缀名
    if(fgSuffix=="jpg" || fgSuffix=="gif" || fgSuffix=="png"){
        fgPic+="<img src='"+fgImg+"' width='"+fgW+"' height='"+fgH+"' border='0' />";
    }else if(fgSuffix=="swf"){
        fgPic+="<embed src='"+fgImg+"' width='"+fgW+"' height='"+fgH+"' wmode='transparent' quality='high' type='application/x-shockwave-flash'></embed>";
    }else if(fgSuffix=="htm"){
        fgPic+='<iframe width="'+fgW+'" height="'+fgH+'" src="'+fgImg+'" frameborder="0" scrolling="no"></iframe>';
    }
    var L=(fgwT-fgW)/2,T=(fgwH-fgH)/2;
    var divHtml="<div id='FuGai' style='display:none;width:"+fgW+"px;height:"+fgH+"px;overflow:hidden;box-shadow:0 4px 10px 0 rgba(0,0,0,1);position:fixed;left:"+L+"px;top:"+T+"px;z-index:1000000;'></div>";
    var fgHtml=fgPic;
    if(fgSuffix!=="htm"){
        fgHtml+="<a style='display:block;width:"+fgW+"px;height:"+fgH+"px;background:url(#);position:absolute;left:0;top:0;z-index:1;' href='"+fgUrl+"' target='_blank' data-itemid='"+TongJi+"' class='countHit'></a>";
    }
    fgHtml+="<div style='width:auto;height:20px;line-height:20px;color:#babbbd;font-size:12px;font-family:SimSun;text-align:center;overflow:hidden;position:absolute;top:0;right:0;z-index:2;'>";
    fgHtml+="<span id='t' style='float:left;margin-right:1px;display:block;width:48px;height:20px;background:url("+fgClose+");'>"+(fgS<10?"0"+fgS:fgS)+" 秒</span>";
    fgHtml+="<a class='close' href='javascript:;' style='float:left;display:block;width:72px;height:20px;color:#babbbd;background:url("+fgClose+");'>×关闭广告</a><div style='display: none'><img src='"+jcCode+"'></div></div>";

    var fgIn,fgCookie=cookie(fgCookie1);
    var fgSetime=function(){fgS--;$("#t").html((fgS<10?"0"+fgS:fgS)+" 秒");if(fgS<0){$("#FuGai").remove();clearInterval(fgIn);}};
    var fgfixed=function(){$("#FuGai").css({"left":($(window).width()-fgW)/2,"top":($(window).height()-fgH)/2});};
    function insertGG(gg){
        if ((navigator.userAgent.match(/iPad/i))) {
            if(fgSuffix=="swf"){
                return false;
            }else{
                $('body').append(gg);
            }
        }else{
            $('body').append(gg);
        }
    }
    if(fgCookie!=null){
        var fgNumCookie=decodeURI(fgCookie),N=fgNumCookie.split("|"),num=Number(N[0]),RawTimeStamp=Number(N[1]);
        if(num<fgNumber){
            insertGG(divHtml);
            cookie(fgCookie1,encodeURI((num+1)+"|"+RawTimeStamp),{path:"/",expires:fgDate});
        }
        if(RawTimeStamp-NewTimeStamp<0){cookie(fgCookie1,null,{path:"/",expires:fgDate});}
    }else{
        insertGG(divHtml);
        cookie(fgCookie1,encodeURI("1|"+cookietime),{path:"/",expires:fgDate});
    }
    $("#FuGai").on("click","a.close",function(){clearInterval(fgIn);$("#FuGai").remove();});
    $(window).resize(fgfixed).scroll(fgfixed).trigger("resize");

    var setimer=setInterval(function(){
        if($("#ad_banner1").length>0){return}
        if(window.gstgFugaiHide===true){return}
        $("#FuGai").html(fgHtml).show();
        clearInterval(setimer);
        fgIn=setInterval(fgSetime,1000);
    },1000);
    function gsCountSiteInner(gsid) {
        $.ajax({
            type: "GET",
            dataType: "jsonp",
            url: "http://click.gamersky.com/Common/GetHits.aspx",
            data: {
                id: gsid,
                script: "3"
            },
            success: function(data) {}
        });
    }
//有效展示量
//gsCountSiteInner(985438);
})();