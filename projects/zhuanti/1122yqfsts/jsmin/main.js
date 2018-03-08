'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function ($) {
  $.fn.gsPopup = function (options) {
    var defaults = {
      //弹出后回调函数
      afterOpen: ''
    };
    var optionsEd = $.extend(defaults, options);
    var btn = $(this),
        outTimer,
        inTimer;
    function addSource(sid, sty) {
      var sourceDom;
      switch (sty) {
        case 'video_tgs':
          sourceDom = '<embed wmode="direct" flashvars="vid=' + sid + '&amp;tpid=0&amp;showend=1&amp;showcfg=1&amp;searchbar=1&amp;skin=http://imgcache.qq.com/minivideo_v1/vd/res/skins/TencentPlayerMiniSkin.swf&amp;shownext=1&amp;list=2&amp;autoplay=1" src="http://imgcache.qq.com/tencentvideo_v1/player/TPout.swf?max_age=86400&amp;v=20140714" quality="high" name="tenvideo_flash_player_1492679771297" id="tenvideo_flash_player_1492679771297" bgcolor="#000000" width="100%" height="100%" align="middle" allowscriptaccess="always" allowfullscreen="true" type="application/x-shockwave-flash" pluginspage="http://get.adobe.com/cn/flashplayer/">';
          return sourceDom;
          break;
        case 'video_yk':
          sourceDom = '<embed height="100%" flashvars="isAutoPlay=true" allowscriptaccess="sameDomain" width="100%" align="middle" quality="high" invokeurls="false" src="http://player.youku.com/player.php/sid/' + sid + '/v.swf" type="application/x-shockwave-flash" wmode="transparent">';
          return sourceDom;
          break;
        case 'video_other':
          sourceDom = sid;
          return sourceDom;
          break;
        case 'pics':
          sourceDom = '<img src="' + sid + '" alt="popimgs" width="100%" height="100%">';
          return sourceDom;
          break;
        case 'custom':
          sourceDom = $(sid)[0].outerHTML;
          return sourceDom;
          break;
      }
    }
    function addPopup(opts) {
      var popupDom = '';
      popupDom += '<div id="gsPopupMask" class="gsPopupMask"></div>';
      popupDom += '<div id="gsPopup" class="gsPopup" style="';
      popupDom += opts.style;
      popupDom += '"><div class="gsPopupCon">';
      popupDom += addSource(opts.sid, opts.sty);
      popupDom += '</div><a  class="gsPopupClose" id="gsPopupClose"></a></div>';
      $('body').append(popupDom);
      inTimer = setTimeout(function () {
        $('#gsPopupMask').addClass('cur');
        $('#gsPopup').addClass('cur');
      }, 10);
    }
    function removePopup() {
      clearTimeout(inTimer);
      $('#gsPopupMask').removeClass('cur');
      $('#gsPopup').removeClass('cur');
      outTimer = setTimeout(function () {
        $('#gsPopupMask').remove();
        $('#gsPopup').hide().remove();
      }, 150);
    }
    function closePopup() {
      $('#gsPopupClose').on('click', removePopup);
      $('#gsPopupMask').on('click', removePopup);
    }
    btn.on('click', function () {
      clearTimeout(outTimer);
      var $this = $(this),
          dw = $this.data('w'),
          dh = $this.data('h'),
          wh = $(window).height(),
          gerCss,
          popupOptions = {
        pos: 'fixed',
        width: dw,
        height: dh,
        sid: $this.data('sid'),
        sty: $this.data('sty')
      };
      gerCss = 'width:' + popupOptions.width + 'px;height:' + popupOptions.height + 'px;';
      popupOptions.style = 'position:' + popupOptions.pos + ';top:50%;left:50%;margin-left:-' + popupOptions.width / 2 + 'px;margin-top:-' + popupOptions.height / 2 + 'px;' + gerCss;
      if (dh > wh) {
        popupOptions.pos = 'absolute';
        popupOptions.style = 'position:' + popupOptions.pos + ';top:' + $this.offset().top + 'px;left:50%;margin-left:-' + popupOptions.width / 2 + 'px;' + gerCss;
      }
      addPopup(popupOptions);
      closePopup();
      if (typeof optionsEd.afterOpen === 'function') {
        optionsEd.afterOpen();
      }
    });
  };
})(jQuery);
$('.popupBtn').gsPopup();
(function ($) {
  var ymjsModel = {
    ztTabs: function ztTabs(tabId) {
      var $tabId = $(tabId),
          $tabNav = $tabId.find('.ztTabNav').find('li'),
          $tabCon = $tabId.find('.ztTabCon');
      $(tabId).slide({
        titCell: $tabNav,
        titOnClassName: 'cur',
        mainCell: $tabCon,
        effect: 'fade',
        delayTime: 250
      });
    },
    //右侧导航按钮
    fnavA: function fnavA(tarFixnav, toTopDes, toWidth) {
      !function ($) {
        function ScrollSpy(element, options) {
          var process = $.proxy(this.process, this),
              $element = $(element).is('body') ? $(window) : $(element),
              href;
          this.options = $.extend({}, $.fn.scrollspy.defaults, options);
          this.$scrollElement = $element.on('scroll.scroll-spy.data-api', process);
          this.selector = (this.options.target || (href = $(element).attr('data-to')) && href.replace(/.*(?=#[^\s]+$)/, '') || '') + ' li>a';
          this.$body = $('body');
          this.refresh();
          this.process();
        }
        ScrollSpy.prototype = {
          constructor: ScrollSpy,
          refresh: function refresh() {
            var self = this,
                $targets;
            this.offsets = $([]);
            this.targets = $([]);
            $targets = this.$body.find(this.selector).map(function () {
              var $el = $(this),
                  href = $el.data('to'),
                  $href = /^#\w/.test(href) && $(href);
              return $href && $href.length && [[$href.position().top + (!$.isWindow(self.$scrollElement.get(0)) && self.$scrollElement.scrollTop()), href]] || null;
            }).sort(function (a, b) {
              return a[0] - b[0];
            }).each(function () {
              self.offsets.push(this[0]);
              self.targets.push(this[1]);
            });
          },
          process: function process() {
            var scrollTop = this.$scrollElement.scrollTop() + this.options.offset,
                scrollHeight = this.$scrollElement[0].scrollHeight || this.$body[0].scrollHeight,
                maxScroll = scrollHeight - this.$scrollElement.height(),
                offsets = this.offsets,
                targets = this.targets,
                activeTarget = this.activeTarget,
                i,
                ww = $(window).width();
            if (scrollTop >= maxScroll) {
              return activeTarget !== (i = targets.last()[0]) && this.activate(i);
            }
            for (i = offsets.length; i--;) {
              activeTarget !== targets[i] && scrollTop >= offsets[i] && (!offsets[i + 1] || scrollTop <= offsets[i + 1]) && this.activate(targets[i]);
            }
            if (scrollTop >= toTopDes && ww > toWidth) {
              $(tarFixnav).addClass('cur');
            } else {
              $(tarFixnav).removeClass('cur');
            }
          },
          activate: function activate(target) {
            var active, selector;
            this.activeTarget = target;
            $(this.selector).removeClass('cur');
            selector = this.selector + target + ',' + this.selector + '[data-to="' + target + '"]';
            active = $(selector).addClass('cur');
            active.trigger('activate');
          }
        };
        var old = $.fn.scrollspy;
        $.fn.scrollspy = function (option) {
          return this.each(function () {
            var $this = $(this),
                data = $this.data('scrollspy'),
                options = (typeof option === 'undefined' ? 'undefined' : _typeof(option)) === 'object' && option;
            if (!data) $this.data('scrollspy', data = new ScrollSpy(this, options));
            if (typeof option === 'string') data[option]();
          });
        };
        $.fn.scrollspy.Constructor = ScrollSpy;
        $.fn.scrollspy.defaults = {
          offset: 36
        };
        $.fn.scrollspy.noConflict = function () {
          $.fn.scrollspy = old;
          return this;
        };
        $(window).on('load', function () {
          $('body').each(function () {
            var $spy = $(this);
            $spy.scrollspy({
              target: tarFixnav
            });
          });
        });
      }(window.jQuery);
      $(tarFixnav).find('a').on('click', function (e) {
        if (e && e.preventDefault) {
          //阻止默认浏览器动作(W3C)
          e.preventDefault();
        } else {
          //IE中阻止函数器默认动作的方式
          window.event.returnValue = false;
          return false;
        }
        var todiv = $(this).data('to'),
            off = $(this).data('off') || 0;
        $('html,body').animate({ scrollTop: $(todiv).offset().top - off }, 400);
      });
      function fixedDisplay() {
        var ww = $(window).width();
        if (ww > toWidth) {
          if ($('body').scrollTop() > toTopDes) {
            $(tarFixnav).addClass('cur');
          }
        } else {
          $(tarFixnav).removeClass('cur');
        }
      }
      $(window).resize(fixedDisplay);
    }
  };
  $('.ztTab').each(function () {
    ymjsModel.ztTabs('#' + $(this).attr('id'));
  });
  ymjsModel.fnavA('#fixednav', 100, 1520);
})(jQuery);