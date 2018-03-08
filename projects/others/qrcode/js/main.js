(function($){
/**
 * 参数说明
 * 未添加注释的已写好
 * midurl.mid  还没确定中转页地址，确定后更换
 * midurl.type 如杂谈:ent,新闻中心:news...未来可扩展，目前只加杂谈就是ent
 * midurl.id   文章ID 跳转APP用
 *
 * QRCode 说明
 * QRCode.text 生成二维码的内容
 * QRCode.width  宽
 * QRCode.height 高
 * QRCode.colorDark 颜色
 * QRCode.colorLight 背景色
 * QRCode.correctLevel 准确度（L|M|Q|H 具体哪个级别需要测试）
 *
 * http://j.gamersky.com/g/lib/qrcode/jquery.qrcode.min.js
 * http://j.gamersky.com/g/lib/qrcode/jquery.qrcode.js 未混淆压缩版，需要可查看
 * qrcode.js不常更新，使用ajax不用getScript为了使用cache，减轻服务器负担
 */
 var midurl,qrurl;
    midurl = {
        mid:'http://appapi2.gamersky.com/guide/pc_mid.shtml',
        from:encodeURIComponent('http://www.gamersky.com/ent/201801/1002522.shtml'),
        //from:encodeURIComponent(location.href),
        type:'ent',
        id:1001712
    };
    //qrurl = midurl.mid + '?oatype=' + midurl.type + '&oaid=' + midurl.id + '&oaform=' + midurl.from;
    qrurl = midurl.mid + '?oatype=' + midurl.type + '&oaid=' + midurl.id;

    function insertQrcode() {
        var qr = new QRCode(document.getElementById("qrcode"), {
            text:qrurl,
            width : 90,
            height : 90,
            colorDark : "#000000",
            colorLight : "#ffffff",
            correctLevel : QRCode.CorrectLevel.L
        });
    }
    function lowIe(tarVer) {
        var sbie = $.browser.msie,
            ver = parseInt($.browser.version);
        if(sbie === true && ver <= tarVer){
            return true;
        }
    }
    function getJsLib(url,callback){
        if(lowIe(9) === true){
            $.getScript(url,function () {
                if( typeof callback){
                    callback();
                }
            })
        }else{
            $.ajax({
                typeDate:'Script',
                url:url,
                cache:true,
                success:function () {
                    if( typeof callback){
                        callback();
                    }
                }
            });
        }
    }
    getJsLib('http://j.gamersky.com/g/lib/qrcode/jquery.qrcode.min.js',insertQrcode);
})(jQuery);