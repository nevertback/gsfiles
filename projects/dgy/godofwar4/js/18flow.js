var gsDgyFlows;
gsDgyFlows = {
    addflowTips:function(fid,txt){
        var vDom = '';
        vDom += '<div class="flow-tips '+fid+'">';
        vDom += '<div class="flow-tips-context"><a class="flow-tips-btn">';
        vDom += txt;
        vDom += '</a></div></div>';
        return vDom;
    },
    addflowTipsTop:function(fid,txt){
        var vDom = '';
        vDom += '<div class="flow-tips-top '+fid+'">';
        vDom += '<div class="flow-tips-context"><a class="flow-tips-btn">';
        vDom += txt;
        vDom += '</a></div></div>';
        return vDom;
    },
    flowMost:function (vKey,callback) {
        var _this = this,
            $pa = $('#gsDgyPage'),
            vDom = '',
            vSce = gsDgySource.flow[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<video class="flow-bg" id="'+vKey+'video" src="'+vSce.vd+'" alt="'+vKey+'" autoplay></video>';
        vDom += '</div>';
        $pa.html(vDom).addClass('cur');
        var vdCtrl = document.getElementById(vKey+'video');
        vdCtrl.onended = function (ev) {
            if (typeof callback === "function"){
                callback();
            }
        }
    },
    flowMostKey:function(vKey,callback){
        var _this = this,
            $pa = $('#gsDgyPage'),
            vDom = '',
            vSce = gsDgySource.flow[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<video class="flow-bg" id="'+vKey+'video1" src="'+vSce.vd1+'" alt="'+vKey+'"></video>';
        vDom += '<video class="flow-bg flow-vd-hide" id="'+vKey+'video2" src="'+vSce.vd2+'" alt="'+vKey+'" loop></video>';
        vDom += _this.addflowTips('flowTips',vSce.tips[0].txt);
        vDom += '</div>';
        $pa.html(vDom).addClass('cur');
        var $vdCtrl1 = $('#'+vKey+'video1'),
            $vdCtrl2 = $('#'+vKey+'video2'),
            vdCtrl1 = document.getElementById(vKey+'video1'),
            vdCtrl2 = document.getElementById(vKey+'video2');

        var $flowTips = $pa.find('.flowTips'),isWatching = false;
        function gotoNext(){
            vdCtrl2.pause();
            $vdCtrl2.hide();
            if (typeof callback === "function"){
                callback();
            }
        }
        function addEvent() {
            gsDgyMethods.keyBdButton(vSce.tips[0].downKey,$flowTips.find('a'),function () {
                gotoNext();
            });
        }
        function watchVideo() {
            if(vdCtrl1.currentTime >= vSce.tips[0].showTime){
                isWatching = false;
                $flowTips.addClass('cur');
                addEvent();
            }
        }

        vdCtrl1.play();
        vdCtrl1.onended = function (ev) {
            $vdCtrl1.hide();
            $vdCtrl1.remove();
            $vdCtrl2.removeClass('flow-vd-hide');
            vdCtrl2.play();
        };
        function render() {
            isWatching = true;
            watchVideo();
            allTimer = requestAnimationFrame(render);
            if(isWatching === false){
                cancelAnimationFrame(allTimer);
            }
        }
        render();
    },
    flowMostKeyTop:function(vKey,callback){
        var _this = this,
            $pa = $('#gsDgyPage'),
            vDom = '',
            vSce = gsDgySource.flow[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<video class="flow-bg" id="'+vKey+'video1" src="'+vSce.vd1+'" alt="'+vKey+'"></video>';
        vDom += '<video class="flow-bg flow-vd-hide" id="'+vKey+'video2" src="'+vSce.vd2+'" alt="'+vKey+'" loop></video>';
        vDom += _this.addflowTipsTop('flowTips',vSce.tips[0].txt);
        vDom += '</div>';
        $pa.html(vDom).addClass('cur');
        var $vdCtrl1 = $('#'+vKey+'video1'),
            $vdCtrl2 = $('#'+vKey+'video2'),
            vdCtrl1 = document.getElementById(vKey+'video1'),
            vdCtrl2 = document.getElementById(vKey+'video2');

        var $flowTips = $pa.find('.flowTips'),isWatching = false;
        function gotoNext(){
            vdCtrl2.pause();
            $vdCtrl2.hide();
            if (typeof callback === "function"){
                callback();
            }
        }
        function addEvent() {
            gsDgyMethods.keyBdButton(vSce.tips[0].downKey,$flowTips.find('a'),function () {
                gotoNext();
            });
        }
        function watchVideo() {
            if(vdCtrl1.currentTime >= vSce.tips[0].showTime){
                isWatching = false;
                $flowTips.addClass('cur');
                addEvent();
            }
        }

        vdCtrl1.play();
        vdCtrl1.onended = function (ev) {
            $vdCtrl1.hide();
            $vdCtrl1.remove();
            $vdCtrl2.removeClass('flow-vd-hide');
            vdCtrl2.play();
        };
        function render() {
            isWatching = true;
            watchVideo();
            allTimer = requestAnimationFrame(render);
            if(isWatching === false){
                cancelAnimationFrame(allTimer);
            }
        }
        render();
    },
    flowMostKeyHold:function(vKey,callback){
        var _this = this,
            $pa = $('#gsDgyPage'),
            vDom = '',
            vSce = gsDgySource.flow[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<video class="flow-bg" id="'+vKey+'video1" src="'+vSce.vd1+'" alt="'+vKey+'"></video>';
        vDom += '<video class="flow-bg flow-vd-hide" id="'+vKey+'video2" src="'+vSce.vd2+'" alt="'+vKey+'" loop></video>';
        vDom += '<video class="flow-bg flow-vd-hide" id="'+vKey+'video3" src="'+vSce.vd3+'" alt="'+vKey+'"></video>';
        vDom += '<video class="flow-bg flow-vd-hide" id="'+vKey+'video4" src="'+vSce.vd4+'" alt="'+vKey+'" loop></video>';
        vDom += _this.addflowTips('flowTips0',vSce.tips[0].txt);
        vDom += _this.addflowTips('flowTips1',vSce.tips[1].txt);
        vDom += '</div>';
        $pa.html(vDom).addClass('cur');
        var $vdCtrl1 = $('#'+vKey+'video1'),
            $vdCtrl2 = $('#'+vKey+'video2'),
            $vdCtrl3 = $('#'+vKey+'video3'),
            $vdCtrl4 = $('#'+vKey+'video4'),
            vdCtrl1 = document.getElementById(vKey+'video1'),
            vdCtrl2 = document.getElementById(vKey+'video2'),
            vdCtrl3 = document.getElementById(vKey+'video3'),
            vdCtrl4 = document.getElementById(vKey+'video4');

        var $flowTips0 = $pa.find('.flowTips0'),$flowTips1 = $pa.find('.flowTips1'),isWatching = false,removeVd2 = false;
        function gotoNext(){
            vdCtrl4.pause();
            $vdCtrl4.hide();
            if (typeof callback === "function"){
                callback();
            }
        }
        function addEvent() {
            gsDgyMethods.bindKeyHold(vSce.tips[0].downKey,function () {
                if(removeVd2 === false){
                    $vdCtrl2.attr({'loop':false,'mute':true});
                    vdCtrl2.currentTime = 0;
                    vdCtrl2.play();
                    vdCtrl2.pause();
                    $vdCtrl2.hide();
                    $vdCtrl2.remove();
                    removeVd2 = true;
                }
                $flowTips0.removeClass('cur');
                $vdCtrl3.removeClass('flow-vd-hide');
                vdCtrl3.play();
                if(vdCtrl3.currentTime >= vSce.tips[1].showTime){
                    $(document).off();
                    $flowTips0.remove();
                    $flowTips1.addClass('cur');
                    gsDgyMethods.keyBdButton(vSce.tips[1].downKey,$flowTips1.find('a'),function () {
                        gotoNext();
                    });
                }
            },function () {
                vdCtrl2.pause();
                $flowTips0.addClass('cur');
                vdCtrl3.pause();
            });
        }
        function watchVideo() {
            if(vdCtrl1.currentTime >= vSce.tips[0].showTime){
                isWatching = false;
                $flowTips0.addClass('cur');
                addEvent();
            }
        }

        vdCtrl1.play();
        vdCtrl1.onended = function (ev) {
            $vdCtrl1.remove();
            $vdCtrl2.removeClass('flow-vd-hide');
            vdCtrl2.play();
        };
        vdCtrl3.onended = function (ev) {
            vdCtrl3.pause();
            $vdCtrl3.hide();
            $vdCtrl3.remove();
            $vdCtrl4.removeClass('flow-vd-hide');
            vdCtrl4.play();
        };
        function render() {
            isWatching = true;
            watchVideo();
            allTimer = requestAnimationFrame(render);
            if(isWatching === false){
                cancelAnimationFrame(allTimer);
            }
        }
        render();
    },
    flowMostKeyHold2:function(vKey,callback){
        var _this = this,
            $pa = $('#gsDgyPage'),
            vDom = '',
            vSce = gsDgySource.flow[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<video class="flow-bg" id="'+vKey+'video1" src="'+vSce.vd1+'" alt="'+vKey+'"></video>';
        vDom += '<video class="flow-bg flow-vd-hide" id="'+vKey+'video2" src="'+vSce.vd2+'" alt="'+vKey+'" loop></video>';
        vDom += '<video class="flow-bg flow-vd-hide" id="'+vKey+'video3" src="'+vSce.vd3+'" alt="'+vKey+'"></video>';
        vDom += _this.addflowTips('flowTips0',vSce.tips[0].txt);
        vDom += '</div>';
        $pa.html(vDom).addClass('cur');
        var $vdCtrl1 = $('#'+vKey+'video1'),
            $vdCtrl2 = $('#'+vKey+'video2'),
            $vdCtrl3 = $('#'+vKey+'video3'),
            vdCtrl1 = document.getElementById(vKey+'video1'),
            vdCtrl2 = document.getElementById(vKey+'video2'),
            vdCtrl3 = document.getElementById(vKey+'video3');

        var $flowTips0 = $pa.find('.flowTips0'),isWatching = false;
        function gotoNext(){
            $vdCtrl3.hide();
            if (typeof callback === "function"){
                callback();
            }
        }
        function addEvent() {
            gsDgyMethods.bindKeyHold(vSce.tips[0].downKey,function () {
                $flowTips0.removeClass('cur');
                vdCtrl2.pause();
                $vdCtrl2.hide();
                $vdCtrl2.remove();
                $vdCtrl3.removeClass('flow-vd-hide');
                vdCtrl3.play();
            },function () {
                $flowTips0.addClass('cur');
                vdCtrl3.pause();
            });
        }
        function watchVideo() {
            if(vdCtrl1.currentTime >= vSce.tips[0].showTime){
                isWatching = false;
                $flowTips0.addClass('cur');
                addEvent();
            }
        }

        vdCtrl1.play();
        vdCtrl1.onended = function (ev) {
            $vdCtrl1.hide();
            $vdCtrl1.remove();
            $vdCtrl2.removeClass('flow-vd-hide');
            vdCtrl2.play();
        };
        vdCtrl3.onended = function (ev) {
            $(document).off();
            gotoNext();
        };
        function render() {
            isWatching = true;
            watchVideo();
            allTimer = requestAnimationFrame(render);
            if(isWatching === false){
                cancelAnimationFrame(allTimer);
            }
        }
        render();
    },
    gsdFlow01:function () {
        var vDom = '',vKey = 'gsdFlow01',vSce = gsDgySource.flow[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<video class="flow-bg" id="'+vKey+'video" src="'+vSce.vd+'" alt="'+vKey+'" autoplay></video>';
        vDom += '</div>';
        function beginPageFnc(mA){
            gsDgyMethods.bgmBeforeVideo();
            var vdCtrl = document.getElementById(vKey+'video');
            vdCtrl.onended = function (ev) {
                gsDgyFlows.gsdFlow02();
            }
        }
        gsDgyMethods.changePage(vDom,function ($mainArea) {
            beginPageFnc($mainArea);
        });
    },
    gsdFlow02:function () {
        var vKey = 'gsdFlow02',
            _this = this;
        _this.flowMostKey(vKey,function () {
            gsDgyFlows.gsdFlow03();
        });
    },
    gsdFlow03:function () {
        var vKey = 'gsdFlow03',
            _this = this;

        _this.flowMostKey(vKey,function () {
            gsDgyFlows.gsdFlow04();
        });
    },
    gsdFlow04:function () {
        var vKey = 'gsdFlow04',
            _this = this;
        _this.flowMostKeyHold(vKey,function () {
            gsDgyFlows.gsdFlow05();
        });
    },
    gsdFlow05:function () {
        var vKey = 'gsdFlow05',
            _this = this;
        _this.flowMostKeyHold(vKey,function () {
            gsDgyFlows.gsdFlow06();
        });
    },
    gsdFlow06:function () {
        var vKey = 'gsdFlow06',
            _this = this;
        _this.flowMostKeyHold2(vKey,function () {
            gsDgyFlows.gsdFlow07();
        });
    },
    gsdFlow07:function () {
        var vKey = 'gsdFlow07',
            _this = this;
        _this.flowMostKeyHold(vKey,function () {
            gsDgyFlows.gsdFlow08();
        });
    },
    gsdFlow08:function () {
        var vKey = 'gsdFlow08',
            _this = this;
        _this.flowMostKey(vKey,function () {
            gsDgyFlows.gsdFlow09();
        });
    },
    gsdFlow09:function () {
        var vKey = 'gsdFlow09',
            _this = this;
        _this.flowMostKeyTop(vKey,function () {
            gsDgyFlows.gsdFlow10();
        });
    },
    gsdFlow10:function () {
        var vKey = 'gsdFlow10',
            _this = this;
        _this.flowMostKeyTop(vKey,function () {
            gsDgyFlows.gsdFlow11();
        });
    },
    gsdFlow11:function () {
        var vKey = 'gsdFlow11',
            _this = this;
        _this.flowMostKeyTop(vKey,function () {
            gsDgyFlows.gsdFlow12();
        });
    },
    gsdFlow12:function () {
        var vKey = 'gsdFlow12',
            _this = this;
        _this.flowMostKeyTop(vKey,function () {
            gsDgyFlows.gsdFlow13();
        });
    },
    gsdFlow13:function () {
        var vKey = 'gsdFlow13',
            _this = this;
        _this.flowMostKeyTop(vKey,function () {
            gsDgyFlows.gsdFlow14();
        });
    },
    gsdFlow14:function () {
        var vDom = '',vKey = 'gsdFlow14',vSce = gsDgySource.flow[vKey];
        vDom += '<div class="gsd-page vPage '+vKey+'">';
        vDom += '<video class="flow-bg" id="'+vKey+'video" src="'+vSce.vd+'" alt="'+vKey+'" autoplay></video>';
        vDom += '</div>';
        function beginPageFnc(mA){
            var vdCtrl = document.getElementById(vKey+'video');
            vdCtrl.onended = function (ev) {
                gsDgyPages.gsdStory();
            }
        }
        gsDgyMethods.changePage(vDom,function ($mainArea) {
            beginPageFnc($mainArea);
        });
    }
};