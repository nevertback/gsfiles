$(function () {
  var urlParam = function (name, url) {
    if (!url) { url = window.location.href; }
    var results = new RegExp('[\\?&]' + name + '=([^&#]*)').exec(url);
    return results ? results[1] : 0;
  };

  var urlName=window.location.pathname.split("/")[2];
  $.fn.extend({
    loginiframeForm: function (options) {
      var $this = $(this),server_id = urlParam("server_id") || '';
      $this.on("keyup",".ui-passport-password",function (event) {
        if (event.keyCode == 13) {$this.find(".ui-passport-login-button").click();}
      }).on("click",".iframeLogin",function (event) {
        event.preventDefault();
        var $userName = $this.find(".ui-passport-userName");
        var $passWord = $this.find(".ui-passport-password");
        var YearNone = $this.find("#persistentcookie").attr("checked")?"Year":"None";

        if ($userName.val() == '') {alert('请填写用户名！'); $userName.focus(); return;}
        if ($passWord.val() == '') {alert('请填写密码！'); $passWord.focus(); return;}

        $.ajax({
          type: "GET",dataType: "jsonp",url: "//i.gamersky.com/api/userlogin",
          data: {logindata: JSON2.stringify({username:$userName.val(), password:$passWord.val(), checkcode:'', expiration:YearNone})},
          success: function (responseJson) {
            switch (responseJson.status) {
              case "ok": window.location.reload(); break;
              case "err": alert(responseJson.body); break;
            }
          }
        });
      });
    },
    loginUser: function (options) {
      var $this = $(this);
      $.ajax({
        type: "GET",dataType: "jsonp",url: "//i.gamersky.com/api/logincheck",
        success: function (responseJson) {
          if (responseJson.status == "ok") {
            $this.find(".regeidt").hide();
            $this.find(".login,.Logout").show();
            $this.find("#Uname").html(responseJson.username);
            $this.show();
            $this.find(".uname").find("img").attr("src", responseJson.userface).after(responseJson.username);
            $this.find(".user1 .img img").attr("src", responseJson.userface);
            $this.find(".user1 .name").html(responseJson.username);
            if (urlParam("server_id") == 0) {
              $(".Recharge").attr("href", "http://pay.gamersky.com/pay/?gameid="+urlName+"&uid="+responseJson.userid);
            }else if (urlParam("pay_server_id") == 0) {
              $(".Recharge").attr("href", "http://pay.gamersky.com/pay/?gameid="+urlName+"&uid="+responseJson.userid+"&serverid="+urlParam("server_id"));
            }else{
              $(".Recharge").attr("href", "http://pay.gamersky.com/pay/?gameid="+urlName+"&uid="+responseJson.userid+"&serverid="+urlParam("pay_server_id"));
            }
          } else {
            $this.find(".regeidt").show();
            $this.find(".login,.Logout").hide();
            $(".Recharge").click(function (event){event.preventDefault();alert("请先登录，再来充值！");});
          }
          $(window).resize(function(){
            var WW=$(window).width(),TW=$(".Top_L").outerWidth(true)+$(".Top_R").outerWidth(true)+10;
            if(WW-TW<800){$(".Notice").width(WW-TW).find(".gonggao").width(WW-TW-80);}
          }).trigger("resize");
        }
      });

      $("#Logout,.Logout").click(function (event){
        event.preventDefault();
        $.ajax({ type: "GET", url: "//i.gamersky.com/api/userlogout", dataType: "jsonp", success: function (responseJson) { window.location.reload(); } });
      });

      $(".regeidt").keyup(function (event){if (event.keyCode == 13){$("#BtnLogin").click();}});
      $this.on("click","#BtnLogin",function (event) {
        event.preventDefault();
        var $userName = $this.find(".ui-passport-userName");
        var $passWord = $this.find(".ui-passport-password");
        var YearNone = "None";

        if ($userName.val() == '') {alert('请填写用户名！'); $userName.focus(); return;}
        if ($passWord.val() == '') {alert('请填写密码！'); $passWord.focus(); return;}
        
        $.ajax({
          type: "GET",dataType: "jsonp",url: "//i.gamersky.com/api/userlogin",
          data: {logindata: JSON2.stringify({username:$userName.val(), password:$passWord.val(), checkcode:'', expiration:YearNone})},
          success: function (responseJson) {
            switch (responseJson.status) {
              case "ok": window.location.reload(); break;
              case "err": alert(responseJson.body); break;
            }
          }
        });
      });
    },
    GameLink: function (options) {
      var datagame = $(".gamesIframe").data("game");
      var server_id=urlParam("server_id")==0?1:urlParam("server_id");
      $.ajax({
        type: "GET",dataType: "jsonp",url: "//i.gamersky.com/api/LoginGeneralGamer",
        data: {logindata: JSON2.stringify({ serverid: server_id,configType:datagame})},
        success: function (responseJson) {
          if (responseJson.status == "ok") {
            $(".gamesLogin").remove();
            $(".gamesIframe").attr("src", responseJson.url).show();
            $("#GameID").html("玩家ID:" + responseJson.userid);
            $('html').addClass('yyzq-logined');
            $('.gameAreaInfos').removeClass('gameAreaInfosHide');
          }else{
            $(".gamesLogin").show();
          }
        }
      });
    }
  });
	
  $(".User-login").loginiframeForm();//游戏页用户登录
  $(".Login").loginUser();
  $(".gamesLogin").GameLink();//登录之后游戏载入
	
  $(document).on("click","#qqLogin",function (event){
    event.preventDefault();
    window.location.href="//i.gamersky.com/oauth/authorizelogin?authorizetype=qq&returnUrl="+encodeURI(window.location.href);
  }).on("click","#sinaLogin",function (event){
    event.preventDefault();
    window.location.href="//i.gamersky.com/oauth/authorizelogin?authorizetype=sina&returnUrl="+encodeURI(window.location.href);
  }).on("click","#weixinLogin",function (event){
    event.preventDefault();
    window.location.href="//i.gamersky.com/oauth/authorizelogin?authorizetype=weixin&returnUrl="+encodeURI(window.location.href);
  });
});
(function ($) {
    var $iframe = $('.gamesIframe'),gameUrl = $iframe.data('game');
    var yygame = {
        setBodySize:function () {
            var wh = $(window).height() - 36;
            if(wh<800){
                $('body').css({'overflow-y':'auto','height':'800px'});
            }else{
                $('body').css({'overflow-y':'','height':''});
            }
        },
        setGameSize:function () {
            var $gamearea = $('.gameArea'),
                wh = $(window).height() - 36,
                ww = $(window).width(),$iframe = $('.gamesIframe');
            $gamearea.css({'height':wh,'width':ww});

            if(ww<1280){
                $('#QZnav').hide();
                $('.gameAreaInfos').removeClass('cur');
                wh = $(window).height();
                $gamearea.css({'top':0,'height':wh});
                $iframe.css({
                    width:ww+'px',
                    height:wh+'px'
                });
            }else{
                $('#QZnav').show();
                $('.gameAreaInfos').addClass('cur');
                wh = $(window).height() - 36;
                $gamearea.css({'top':'','height':wh});
                $iframe.css({
                    width:wh/5*3+'px',
                    height:wh+'px'
                });
            }
        },
        checklogin:function () {
            $.ajax({
                type: "GET", dataType: "jsonp", url: "//i.gamersky.com/api/logincheck",
                success: function (responseJson) {
                    if (responseJson.status === "ok") {
                        //如已登录跳转直接开始游戏
                        $('.QZlogin').removeClass('show');
                        $iframe.attr('src',gameUrl).show();
                        $('.Bot').hide();
                        yygame.setGameSize();
                        $(window).resize(function () {
                            yygame.setGameSize();
                        });
                    }else{
                        $('.QZlogin').addClass('show');
                        yygame.setBodySize();
                        $(window).resize(function () {
                            yygame.setBodySize();
                        });
                    }
                }
            });
        },
        init:function () {
            this.checklogin();
        }
    };
    yygame.init();
})(jQuery);