/*
global $,yms,pageConfig,preLoadPicsLists,Swiper,fullScreen,bkDatas,mapData,armsData,abilitiesData,gearData,targetData
 */

var pageFlow = {
    common:function () {
        stateStore.fixedNavShow = true;
    },
    dialog:function (idx,txt) {
        var pgDom = '',isCur = '';
        if(idx === 0){
            isCur = 'cur';
        }
        pgDom += '<div class="task-dialog task-dialog'+idx+' taskDialog taskDialog'+idx+' '+isCur+'"><div class="task-dialog-context">';
        pgDom += txt;
        pgDom += '</div>';
        pgDom += '<a class="task-dialog-next taskDialogNext taskDialogNext'+idx+'" data-idx="'+idx+'">继续</a></div>';
        return pgDom;
    },
    dialogChange:function (tar,len,callback) {
        var taskDiaLen = len - 1;
        tar.find('.taskDialogNext').on('click',function(){
            var $ts = $(this),idx = $ts.data('idx');
            if(idx < taskDiaLen){
                tar.find('.taskDialog').removeClass('cur');
                tar.find('.taskDialog'+(idx + 1)).addClass('cur');
            }else{
                if(typeof callback === 'function'){
                    callback();
                }
            }
        });
    },
    tips:function (txt) {
        var pgDom = '',isCur = '';
        pgDom += '<div class="task-tips"><div class="task-tips-context">';
        pgDom += txt;
        pgDom += '</div>';
        pgDom += '<a class="task-tips-next tasTipsNext">继续</a></div>';
        return pgDom;
    },
    fight:function (tar,dt,callback) {
        var pgDom = '';
        pgDom += '<div class="fight-fire fightFire"><img src="'+dt.gun.fire+'" alt="fire"></div>';
        pgDom += '<div class="fight-gun"><img src="'+dt.gun.pic+'" alt="gun"></div>';
        $.each(dt.enemy,function (i,item) {
            pgDom += '<a class="fight-enemy fight-enemy'+i+' fightEnemy fightEnemy'+i+'">';
            pgDom += '<img class="fight-enemy-full" src="'+item.full+'" alt="full">';
            pgDom += '<img class="fight-enemy-half" src="'+item.half+'" alt="half">';
            pgDom += '</a>';
        });
        pgDom += '';
        pgDom += '';
        pgDom += '';
        pgDom += '';
        tar.html(pgDom);
        var attackedCount = 0,
            attackedMax = dt.enemy.length*2,
            fireTimer;
        function fightEnd() {
            if(typeof callback === 'function'){
                callback();
            }
        }
        function fireFnc() {
            clearTimeout(fireTimer);
            var fireSound = document.getElementById('fireSound');
            tar.find('.fightFire').addClass('cur');
            fireSound.currentTime = 0;
            fireSound.play();
            fireTimer = setTimeout(function () {
                tar.find('.fightFire').removeClass('cur');
            },120);
        }
        tar.on('click',function () {
            fireFnc();
        });
        tar.find('.fightEnemy').on('click',function () {
            var $ts = $(this);
            if($ts.hasClass('attacked') === false){
                $ts.addClass('attacked');
            }else{
                $ts.hide();
            }
            attackedCount++;
            if(attackedCount >= attackedMax){
                setTimeout(function () {
                    fightEnd();
                },500)
            }
        });
    },
    task1:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task1;
        pageDom += '<div class="page_con task1">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<div class="tit"><i></i>'+dtTask.txt+'</div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            pageAutoTimer = setTimeout(function () {
                yms.bgmSet(pageConfig.bgm.task1);
                pageFlow.task101();
            },5000);
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task101:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task101;
        pageDom += '<div class="page_con task101">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        $.each(dtTask.dia,function (i,item) {
            pageDom += _this.dialog(i,item.txt);
        });
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            _this.dialogChange(dgyMain,dtTask.dia.length,function () {
                _this.task102();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task102:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task102;
        pageDom += '<div class="page_con task102">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        $.each(dtTask.dia,function (i,item) {
            pageDom += _this.dialog(i,item.txt);
        });
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            _this.dialogChange(dgyMain,dtTask.dia.length,function () {
                _this.task103();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task103:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task103;
        pageDom += '<div class="page_con task103">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        $.each(dtTask.dia,function (i,item) {
            pageDom += _this.dialog(i,item.txt);
        });
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            _this.dialogChange(dgyMain,dtTask.dia.length,function () {
                _this.task104();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task104:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task104;
        pageDom += '<div class="page_con task104">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += _this.tips(dtTask.tips.txt);
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.tasTipsNext').on('click',function () {
                _this.task105();
            })
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task105:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task105;
        pageDom += '<div class="page_con task105">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        $.each(dtTask.dia,function (i,item) {
            pageDom += _this.dialog(i,item.txt);
        });
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            _this.dialogChange(dgyMain,dtTask.dia.length,function () {
                pageFunc.pgTransit(dtTask.transit.video,function () {
                    _this.task106();
                });
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task106:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task106;
        pageDom += '<div class="page_con task106">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="hover-tro">';
        pageDom += '<img class="hover-tro-btn" src="'+dtTask.tro.btn+'" alt="tro">';
        pageDom += '<img class="hover-tro-txt" src="'+dtTask.tro.txt+'" alt="tro">';
        pageDom += '</a>';
        pageDom += '<a class="btn-circle btn-next btnNext"><i>'+dtTask.arcbtn+'</i></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            yms.bgmSet(pageConfig.bgm.start);
            dgyMain.find('.btnNext').on('click',function(){
                _this.task107();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task107:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task107;
        pageDom += '<div class="page_con task107">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="hover-tro">';
        pageDom += '<img class="hover-tro-btn" src="'+dtTask.tro.btn+'" alt="tro">';
        pageDom += '<img class="hover-tro-txt" src="'+dtTask.tro.txt+'" alt="tro">';
        pageDom += '</a>';
        pageDom += '<a class="btn-circle btn-next btnNext"><i>'+dtTask.arcbtn+'</i></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnNext').on('click',function(){
                pageFunc.pgTransit(dtTask.transit.video,function () {
                    _this.task108();
                });
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task108:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task108;
        pageDom += '<div class="page_con task108">';
        pageDom += '<video id="loopVideo" src="'+dtTask.bg+'" class="page_bg" autoplay loop muted></video>';
        pageDom += '<a class="btn-next btnNext"></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            commonComponents.keyBdButton('x',dgyMain.find('.btnNext'),function () {
                commonComponents.changeMenuState(1);
                pageFunc.pgTransit(dtTask.transit.video,function () {
                    pageFunc.pgMenu();
                });
            });
            pageAutoTimer = setTimeout(function () {
                pageFunc.pgTransit(dtTask.hideTransi.video,function () {
                    pageFunc.pgVersion();
                });
            },dtTask.hideTime);
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task2:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task2;
        pageDom += '<div class="page_con task2">';
        pageDom += '<video id="loopVideo" src="'+dtTask.bg+'" class="page_bg"></video>';
        pageDom += '<a class="btn-key btnKey"></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var vd = document.getElementById('loopVideo');
            commonComponents.keyBdButton('x',dgyMain.find('.btnKey'),function () {
                $('.btnKey').hide();
                vd.play();
                vd.onended = function () {
                    pageFunc.pgTransit(dtTask.transit.video,function () {
                        _this.task201();
                    });
                }
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task201:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task201;
        pageDom += '<div class="page_con task201">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn-next btnNext">继续</a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnNext').on('click',function(){
                _this.task202();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task202:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task202;
        pageDom += '<div class="page_con task202">';
        pageDom += '<video id="onceVideo" src="'+dtTask.bg+'" class="page_bg" preload="auto"></video>';
        pageDom += '<a class="btn-key btnKey"></a>';
        pageDom += '<a class="btn-circle btn-next btnNext"><i>'+dtTask.arcbtn+'</i></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var vd = document.getElementById('onceVideo');
            commonComponents.keyBdButton('b',dgyMain.find('.btnKey'),function () {
                $('.btnKey').hide();
                vd.play();
                vd.onended = function () {
                    $('.btnNext').addClass('cur');
                }
            });
            dgyMain.find('.btnNext').on('click',function(){
                _this.task203();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task203:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task203;
        pageDom += '<div class="page_con task203">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn-light btnLight"><img src="'+dtTask.light+'" alt="light"></a>';
        pageDom += '<a class="btn-key btnKey"></a>';
        pageDom += '<a class="btn-circle btn-next btnNext"><i>'+dtTask.arcbtn+'</i></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var isAddKey = false;
            function findTarget() {
                isAddKey = true;
                commonComponents.keyBdButton('f',dgyMain.find('.btnKey'),function () {
                    $('.btnKey,.btnLight').hide();
                    dgyMain.find('.btnNext').addClass('cur');
                });
            }
            dgyMain.find('.btnLight').on('mouseover',function(){
                dgyMain.find('.btnKey').addClass('cur');
                if(isAddKey === false){
                    findTarget();
                }
            });
            dgyMain.find('.btnNext').on('click',function(){
                _this.task204();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task204:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task204;
        pageDom += '<div class="page_con task204">';
        pageDom += '<video id="onceVideo" src="'+dtTask.bg+'" class="page_bg" preload="auto"></video>';
        pageDom += '<a class="btn-key btnKey"></a>';
        pageDom += '<a class="btn-circle btn-next btnNext"><i>'+dtTask.arcbtn+'</i></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var vd = document.getElementById('onceVideo');
            commonComponents.keyBdButton('e',dgyMain.find('.btnKey'),function () {
                $('.btnKey').hide();
                vd.play();
                vd.onended = function () {
                    dgyMain.find('.btnNext').addClass('cur');
                }
            });
            dgyMain.find('.btnNext').on('click',function(){
                _this.task205();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task205:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task205;
        pageDom += '<div class="page_con task205">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn-next btnNext"><img src="'+dtTask.arr.bg+'" alt="'+dtTask.arr.txt+'"><i>'+dtTask.arr.txt+'</i></a>';
        pageDom += '<div class="tro">'+dtTask.tro+'</div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnNext').on('click',function(){
                _this.task206();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task206:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task206;
        pageDom += '<div class="page_con task206">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn-circle btn-next btnNext"><i>'+dtTask.arcbtn+'</i></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnNext').on('click',function(){
                commonComponents.changeMenuState(2);
                pageFunc.pgMenu();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task3:function(){
        var _this = this,dtTask = pageConfig.flow.task3;
        pageFunc.pgTransit(dtTask.transit.video,function () {
            _this.task301();
        });
    },
    task301:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task301;
        pageDom += '<div class="page_con task301">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<div class="fight-area fightArea"></div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            _this.fight(dgyMain.find('.fightArea'),dtTask.fight,function () {
                _this.task302();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task302:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task302;
        pageDom += '<div class="page_con task302">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<div class="fight-area fightArea"></div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            _this.fight(dgyMain.find('.fightArea'),dtTask.fight,function () {
                _this.task303();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task303:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task303;
        pageDom += '<div class="page_con task303">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<div class="fight-area fightArea"></div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            _this.fight(dgyMain.find('.fightArea'),dtTask.fight,function () {
                commonComponents.changeMenuState(3);
                pageFunc.pgTransit(dtTask.transit.video,function () {
                    _this.task304();
                });
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task304:function(){
        var dtTask = pageConfig.flow.task304;
        pageFunc.pgTransit(dtTask.transit.video,function () {
            pageFunc.pgMenu();
        });
    },
    task4:function(){
        var _this = this,dtTask = pageConfig.flow.task4;
        pageFunc.pgTransit(dtTask.transit.video,function () {
            _this.task401();
        });
    },
    task401:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task401;
        pageDom += '<div class="page_con task401">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn-letter btnLetter"><img src="'+dtTask.letter.icon+'" alt="letter"></a>';
        pageDom += '<a class="btn-radio btnRadio"><img src="'+dtTask.radio.icon+'" alt="radio"></a>';
        pageDom += '<a class="drt-arr drt-arr-left btnLeft"><span>出门</span></a>';
        pageDom += '<div class="letter-mask letterPop letterClose"></div>';
        $.each(dtTask.letter.list,function (i,item) {
            pageDom += '<div class="letter-main letterPopPage letterPopPage'+i+'">';
            pageDom += '<div class="letter-context">';
            pageDom += '<h5>'+item.tit+'</h5>';
            if(item.time !== false){
                pageDom += '<div class="time">'+item.time+'</div>';
            }
            pageDom += '<div class="letter-para">'+item.con+'</div>';
            if(item.name !== false){
                pageDom += '<div class="letter-name">'+item.name+'</div>';
            }
            pageDom += '</div>';
            pageDom += '</div>';
        });

        pageDom += '<div class="letter-btn-group letterPop">';
        pageDom += '<a class="letter-btn-page letterBtnPage" data-page="prev">上一页</a>';
        pageDom += '<a class="letter-btn-page letterBtnPage" data-page="next">下一页</a>';
        pageDom += '<a class="letter-btn-close letterClose"><i></i>关闭</a>';
        pageDom += '</div>';

        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var letterCount = 0;
            function showLetter(idx) {
                dgyMain.find('.letterPop,.letterPopPage').removeClass('cur');
                dgyMain.find('.letterPop,.letterPopPage'+idx).addClass('cur');
            }
            dgyMain.find('.letterBtnPage').on('click',function(){
                var $ts = $(this),pagedrt = $ts.data('page'),len = dtTask.letter.list.length - 1;
                if(pagedrt === 'next'){
                    letterCount++;
                }
                if(pagedrt === 'prev'){
                    letterCount--;
                }
                if(letterCount < 0){
                    letterCount = len;
                }else if(letterCount > len){
                    letterCount = 0;
                }
                showLetter(letterCount);
            });
            dgyMain.find('.btnLetter').on('click',function(){
                showLetter(letterCount);
            });
            dgyMain.find('.letterClose').on('click',function(){
                dgyMain.find('.letterPop,.letterPopPage').removeClass('cur');
            });
            dgyMain.find('.btnRadio').on('click',function(){
                commonComponents.playAudio('audioTask401',dtTask.radio.zmCfg);
            });
            dgyMain.find('.btnLeft').on('click',function(){
                _this.task402();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task402:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task402;
        pageDom += '<div class="page_con task402">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="drt-arr drt-arr-up btnUp"><span>前往</span></a>';
        pageDom += '<a class="drt-arr drt-arr-right btnRight"><span>前往</span></a>';
        pageDom += '<a class="drt-arr drt-arr-down btnDown"><span>返回</span></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnUp').on('click',function(){
                _this.task4021();
            });
            dgyMain.find('.btnRight').on('click',function(){
                _this.task403();
            });
            dgyMain.find('.btnDown').on('click',function(){
                _this.task401();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task4021:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task4021;
        pageDom += '<div class="page_con task4021">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="drt-arr drt-arr-down btnDown"><span>返回</span></a>';
        pageDom += '<a class="btn-radio btnRadio"><img src="'+dtTask.radio.icon+'" alt="radio"><span>查看</span></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnDown').on('click',function(){
                _this.task402();
            });
            dgyMain.find('.btnRadio').on('click',function(){
                _this.task4022();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task4022:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task4022;
        pageDom += '<div class="page_con task4022">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn-key btnKey"></a>';
        pageDom += '<a class="drt-arr drt-arr-down btnDown"><span>返回</span></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnDown').on('click',function(){
                _this.task4021();
            });
            commonComponents.keyBdButton('x',dgyMain.find('.btnKey'),function () {
                commonComponents.playAudio('audioTask4021',dtTask.radio.zmCfg);
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task403:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task403;
        pageDom += '<div class="page_con task403">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="drt-arr drt-arr-up btnUp"><span>前往</span></a>';
        pageDom += '<a class="drt-arr drt-arr-right-mini btnRight"><span>前往</span></a>';
        pageDom += '<a class="drt-arr drt-arr-down btnDown"><span>返回</span></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnUp').on('click',function(){
                _this.task404();
            });
            dgyMain.find('.btnRight').on('click',function(){
                _this.task4031();
            });
            dgyMain.find('.btnDown').on('click',function(){
                _this.task401();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task4031:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task4031;
        pageDom += '<div class="page_con task4031">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="drt-arr drt-arr-up btnUp"><span>前往</span></a>';
        pageDom += '<a class="drt-arr drt-arr-down btnDown"><span>返回</span></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnUp').on('click',function(){
                _this.task4032();
            });
            dgyMain.find('.btnDown').on('click',function(){
                _this.task403();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task4032:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task4032;
        pageDom += '<div class="page_con task4032">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="drt-arr drt-arr-up btnUp"><span>前往</span></a>';
        pageDom += '<a class="drt-arr drt-arr-down btnDown"><span>返回</span></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnUp').on('click',function(){
                if(stateStore.isTold === true){
                    commonComponents.changeMenuState(4);
                    pageFunc.pgTransit(dtTask.transit.video,function () {
                        pageFunc.pgVersion();
                    });
                }else{
                    commonComponents.toast(dgyMain,dtTask.toast);
                }
            });
            dgyMain.find('.btnDown').on('click',function(){
                _this.task4031();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task404:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task404;
        pageDom += '<div class="page_con task404">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn-circle btn-next btnNext"><i>'+dtTask.arcbtn+'</i></a>';
        pageDom += '<a class="btn-eye btn-eye1 btnEye" data-pg="task4041"><img src="'+dtTask.eye1+'" alt="eye"></a>';
        pageDom += '<a class="btn-eye btn-eye2 btnEye" data-pg="task4042"><img src="'+dtTask.eye2+'" alt="eye"></a>';
        pageDom += '<a class="drt-arr drt-arr-down btnDown"><span>返回</span></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnEye').on('click',function(){
                var pg = $(this).data('pg');
                _this[pg]();
            });
            dgyMain.find('.btnNext').on('click',function(){
                stateStore.isTold = true;
                _this.task405();
            });
            dgyMain.find('.btnDown').on('click',function(){
                _this.task403();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task4041:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task4041;
        pageDom += '<div class="page_con task4041">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        $.each(dtTask.eyes,function(i,item){
            pageDom += '<a class="btn-eye btn-eye'+i+' btnEye" data-idx="'+i+'"><img src="'+item.light+'" alt="'+item.tit+'"></a>';
        });
        pageDom += '<a class="drt-arr drt-arr-down btnDown"><span>返回</span></a>';
        pageDom += '<div class="intro-mask introPop introPopClose"></div>';
        pageDom += '<div class="intro-context introPop">';
        pageDom += '<h5 class="introPopTit"></h5>';
        pageDom += '<div class="intro-context-des introPopDes"></div>';
        pageDom += '<a class="btn-forward introPopClose">确定</a>';
        pageDom += '</div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            function showIntro(idx) {
                var popDt = dtTask.eyes[idx];
                dgyMain.find('.introPopTit').html(popDt.tit);
                dgyMain.find('.introPopDes').html(popDt.des);
                dgyMain.find('.introPop').addClass('cur');
            }
            dgyMain.find('.introPopClose').on('click',function(){
                dgyMain.find('.introPop').removeClass('cur');
            });
            dgyMain.find('.btnEye').on('click',function(){
                var idx = $(this).data('idx');
                showIntro(idx);
            });
            dgyMain.find('.btnDown').on('click',function(){
                _this.task404();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task4042:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task4042;
        pageDom += '<div class="page_con task4042">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn-eye btnInfo"><img src="'+dtTask.eye.light+'" alt="'+dtTask.eye.name+'"></a>';
        pageDom += '<a class="drt-arr drt-arr-down btnDown"><span>返回</span></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnDown').on('click',function(){
                _this.task404();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task405:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task405;
        pageDom += '<div class="page_con task405">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        $.each(dtTask.dia,function (i,item) {
            pageDom += _this.dialog(i,item.txt);
        });

        pageDom += '<div class="task-dialog task-dialog-choose taskDialog taskDialogChoose"><div class="task-dialog-context">';
        pageDom += dtTask.choose.txt;
        pageDom += '</div>';
        pageDom += '<a class="btn-choose btnChoose" data-pg="task4051"><span>'+dtTask.choose.cse1+'</span></a>';
        pageDom += '<a class="btn-choose btnChoose" data-pg="task4052"><span>'+dtTask.choose.cse2+'</span></a>';
        pageDom += '</div>';

        pageDom += '<a class="drt-arr drt-arr-down btnDown"><span>返回</span></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            if(stateStore.toldOver === true){
                dgyMain.find('.taskDialog').removeClass('cur');
                dgyMain.find('.taskDialogChoose').addClass('cur');
            }
            _this.dialogChange(dgyMain,dtTask.dia.length,function () {
                stateStore.toldOver = true;
                dgyMain.find('.taskDialog').removeClass('cur');
                dgyMain.find('.taskDialogChoose').addClass('cur');
            });
            dgyMain.find('.btnChoose').on('click',function(){
                var pg = $(this).data('pg');
                _this[pg]();
            });
            dgyMain.find('.btnDown').on('click',function(){
                _this.task404();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task4051:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task4051;
        pageDom += '<div class="page_con task4051">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn-back btnBack"><span>返回</span></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnBack').on('click',function(){
                _this.task405();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task4052:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task4052;
        pageDom += '<div class="page_con task4052">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn-back btnBack"><span>返回</span></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnBack').on('click',function(){
                _this.task405();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    task:function(){
        var _this = this,pageDom = '',dtTask = pageConfig.flow.task;
        pageDom += '<div class="page_con task">';
        pageDom += '<img src="'+dtTask.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn-default btn-next btnNext"></a>';
        // pageDom += '<a class="drt-arr drt-arr-up"><span>前往</span></a>';
        // pageDom += '<a class="drt-arr drt-arr-right"><span>出门</span></a>';
        // pageDom += '<a class="drt-arr drt-arr-down"><span>返回</span></a>';
        // pageDom += '<a class="drt-arr drt-arr-left"><span>前往</span></a>';
        //pageDom += '<a class="btn-circle btn-next btnNext"><i>'+dtTask.arcbtn+'</i></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnNext').on('click',function(){
                _this.task();
            });
        }
        yms.chagePage(function(){
            _this.common();
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    }
};
