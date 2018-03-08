(function(qtzW,qtzH,relw,relh,moMinute,moNumber,mocs,mri,qtzImg,qtzUrl,TongJi,adlink,Cookie1,Cookie2,qtzCkie,bnCookie,tads,qtznum,fgPic,qtzSuffix,moDate,divHtml,moHtml,adtag){
    qtzW = 1000,qtzH = 1000;  //初始宽高
    relw = 240; //实际宽度
    relh = 380; //实际高度
    moMinute=1; //间隔分钟
    moNumber=60;  //广告显示次数
    mocs=1,mri=1; //1~3之间的循环

    //监测代码
    var jcCode = '<div style="display:none"><img src="http://image.gamersky.com/webimg13/zhuanti/common/blank.png"></div>';

    Cookie2="qtzCookie2",qtzCkie=cookie(Cookie2);
    qtznum=qtzCkie!=null? Number(qtzCkie)==mri?mocs:(Number(qtzCkie)+1) : mocs;
    cookie(Cookie2,qtznum,{path:"/",expires:1});

    switch(qtznum){
        case 1 :
            qtzImg = "http://imgf.gamersky.com/img/ty_240x380_1215.swf";  //素材地址
            qtzUrl = "http://gad.netease.com/gad/access?project_id=3650034&s=%2FpHlS9XbcBPtY4BLYgRt7BrTmAQ%3D&code_type=1"; //连接地址,不填写链接，本行不生效
            TongJi="383834";
            break;
    }

    bnCookie=$("script:last").attr("src").replace(/(.*\/)*([^.]+).*/ig,"$2"); //Cookie名称
    tads = bnCookie+TongJi+Math.floor(Math.random()*10e10 + new Date().getTime());  //ID

    fgPic="",qtzSuffix=qtzImg.replace(/(.+)[\\/]/,"").split(".")[1];  //获取图片或flash后缀名
    qtzSuffix=qtzSuffix.indexOf("?")!=-1?qtzSuffix.split("?")[0]:qtzSuffix;

    if(qtzSuffix=="jpg" || qtzSuffix=="gif" || qtzSuffix=="png"){
        fgPic="<img src='"+qtzImg+"' width='"+relw+"' height='"+relh+"' border='0' />";
    }else if(qtzSuffix=="swf"){
        fgPic="<embed src='"+qtzImg+"' width='"+qtzW+"' height='"+qtzH+"' wmode='transparent' quality='high' type='application/x-shockwave-flash'></embed>";
    }
    if (qtzUrl == '' || qtzUrl == undefined || qtzUrl == null) {
        adlink="";
    }else{
        adlink="<a style='display:block;width:100%;height:100%;background:url(#);position:absolute;left:0;top:0;' href='"+qtzUrl+"' target='_blank' data-itemid='"+TongJi+"' class='countHit countHitSql'></a>";
    }
    adtag="<div style='width:26px;height:12px;position:absolute;left:0;bottom:0;background:url(http://image.gamersky.com/webimg15/adtag.png);'></div>";
    divHtml="<div id='"+tads+"' style='opacity:0;width:"+qtzW+"px;height:"+qtzH+"px;position:fixed;'>"+fgPic+adlink+adtag+jcCode+"</div>";
    moHtml="<div style='margin:5px 0 15px;width:"+qtzW+"px;height:"+relh+"px;'>"+divHtml+"</div>";

    Cookie1="qtzCookie1"; //Cookie名称
    moDate=new Date(),NewTimeStamp=moDate.getTime();
    moDate.setTime(moMinute*60*1000+NewTimeStamp);
    var cookietime=moDate.getTime();
    var moCookie=cookie(Cookie1);

    if(moCookie!=null){
        var moCkie=decodeURI(moCookie),N=moCkie.split("|"),num=Number(N[0]),RawTimeStamp=Number(N[1]);
        if(num<moNumber){
            $('#adscontainer_www_index_feturegame_wqj2017').hide();
            $('#adscontainer_conmmon_qtz').html(moHtml);
            cookie(Cookie1,encodeURI((num+1)+"|"+RawTimeStamp),{path:'/',expires:moDate});
        }
        if(RawTimeStamp-NewTimeStamp<0){cookie(Cookie1,null,{path:'/',expires:moDate});}
    }else{
        $('#adscontainer_www_index_feturegame_wqj2017').hide();
        $('#adscontainer_conmmon_qtz').html(moHtml);
        cookie(Cookie1,encodeURI("1|"+cookietime),{path:'/',expires:moDate});
    }

    setTimeout(function(){$("#"+tads).css({"width":relw,"height":relh,"position":"relative","opacity":1}).find("embed").attr("width",relw).attr("height",relh);},500);
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
//gsCountSiteInner(991039);
})();