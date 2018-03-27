var gloCfg = {
    imgPath:'ztimages/',
    flowPath:'ztimages/flow/',
    mediaPath:'ztmedia/',
    countid:512179,
    url:{
        channel:'http://www.gamersky.com/zl/preview/',
        club:'http://i.gamersky.com/club/8',
        ku:'http://ku.gamersky.com/2015/Far-Cry-5/',
        pc:'http://www.gamersky.com/review/201803/1019885.shtml'
    },
    page:{
        zoom:1
    }
};
var stateStore = {
    fixedNavShow:false
};
var pageAutoTimer;
var pageConfig = {
    countid:'512179',
    bgm:{
        txt:['打开声音','关闭声音'],
        nowplay:'',
        start:'ztmedia/bgm.mp3',
        task1:'ztmedia/bgm-helicopter.mp3'
    },
    userMute:true,
    volClk:true,
    isCommOpen:false,
    isVideoPlaying:false,
    addedComment:false,
    addedFixed:false,
    raceVd:'dbcb4aefe3',
    formJs:false,
    audPlayVol:0.1,
    bgmvol:1,
    pages:{
        loading:{
            logo1:'ztimages/ld-logo.png',
            logo2:'ztimages/ld-logo-g.png',
            ld:'ztimages/ld-icon.png'
        },
        pgStart:{
            slogan:gloCfg.imgPath+'start-slogan.png',
            video:gloCfg.mediaPath + 'start-vd.mp4',
            transit:{
                video:{
                    player:'se',
                    vid:'o8qoh',
                    bkvid:'XMzQ4OTI1MjUwMA',
                    controls:false
                }
            }
        },
        pgMenu:{
            bg:gloCfg.imgPath+'menu-bg.jpg',
            nav:[
                {
                    name:'逮捕令',
                    open:false,
                    tro:gloCfg.imgPath+'menu-task1.png'
                },
                {
                    name:'无路可逃',
                    open:false,
                    tro:gloCfg.imgPath+'menu-task2.png'
                },
                {
                    name:'杀出重围',
                    open:false,
                    tro:gloCfg.imgPath+'menu-task3.png'
                },
                {
                    name:'地下基地',
                    open:false,
                    tro:gloCfg.imgPath+'menu-task4.png'
                }
            ]
        },
        pgVersion:{
            bg:gloCfg.imgPath+'version-bg.jpg',
            tabs:[
                {
                    id:0,
                    name:'游戏版本',
                    pic:gloCfg.imgPath+'version-ver.png',
                    buy:[
                        {
                            name:'数字标准版',
                            url:'#1'
                        },
                        {
                            name:'数字豪华版',
                            url:'#2'
                        },
                        {
                            name:'数字黄金版',
                            url:'#3'
                        }
                    ]
                },
                {
                    id:1,
                    name:'季票',
                    pic:gloCfg.imgPath+'version-st.png',
                    swp:[
                        {
                            name:'季票1',
                            video:{
                                player:'se',
                                vid:'2fu3h',
                                bkvid:'XMzQ4OTI1MzgxNg',
                                poster:gloCfg.imgPath+'version-st-pst1.png'
                            }
                        },
                        {
                            name:'季票2',
                            video:{
                                player:'se',
                                vid:'ctjqa',
                                bkvid:'XMzQ4OTI1NDM5Ng',
                                poster:gloCfg.imgPath+'version-st-pst2.png'
                            }
                        },
                        {
                            name:'季票3',
                            video:{
                                player:'se',
                                vid:'124vn',
                                bkvid:'XMzQ4OTI1NDEzNg',
                                poster:gloCfg.imgPath+'version-st-pst3.png'
                            }
                        }
                    ]
                },
                {
                    id:2,
                    name:'游戏配置',
                    pic:gloCfg.imgPath+'version-cfg.png'
                }
            ]
        },
        pgEnd:{
            video:gloCfg.mediaPath+'end-vd.mp4',
            edit:'<h5>内容策划</h5><p>观海、小熊桑、Catcher</p><h5>视觉设计</h5><p>Drakedooog、皮皮、MrrrTian</p>'
        },
        pgComm:{
            bg:gloCfg.imgPath+'comm-bg.jpg'
        }
    },
    flow:{
        task1:{
            bg:gloCfg.flowPath+'task1-bg.jpg',
            txt:'<p>作为希望郡的新任副警长，你现在面临的最大问题是：警徽形同虚设，伊甸之门计划的教徒们已经严重威胁了希望郡的治安。而你，此行就是要逮捕邪教首领：约瑟夫·席德。</p>'
        },
        task101:{
            bg:gloCfg.flowPath+'task101-bg.jpg',
            dia:[
                {
                    txt:'<p>喂，菜鸟，菜鸟！</p>'
                },
                {
                    txt:'<p>别浪费时间看录像了，准备审问约瑟夫本人吧。</p>'
                }
            ]
        },
        task102:{
            bg:gloCfg.flowPath+'task102-bg.jpg',
            dia:[
                {
                    txt:'<p>看外面，我靠，真是个狂妄的疯子。</p>'
                },
                {
                    txt:'<p>“圣父”约瑟夫·席德的巨型雕像，据传他来自格鲁吉亚南方的偏远小镇，此前一直过着颓废的生活，直到有一天的清晨他听到一阵轻声低语，那低语向他预示了毁灭日的临近，并感召他“去拯救尽可能多的灵魂，无论他是否愿意被拯救。”</p><p>约瑟夫聚集了那些被社会所遗弃的可怜人、被剥夺公民权的罪犯以及无视法律的疯子，在蒙大拿州的希望郡组建了“新伊甸园”。</p><p>自称为“圣父”的约瑟夫·席德宣称自己受神的旨意拯救苍生，然而拯救的方式并不是仁爱与忏悔，只有极尽所能的恶毒。他只听从神的低语，并认为自己是人类的救世主。</p>'
                }
            ]
        },
        task103:{
            bg:gloCfg.flowPath+'task103-bg.jpg',
            dia:[
                {txt:'<p>我们正式踏入伊甸教的地盘了，还有多久能到？</p>'},
                {txt:'<p>久到能让你回心转意，这样你就能让直升机掉头回去了。</p>'},
                {txt:'<p>你是要我忽略联邦逮发出的捕令么？警长，你真是太怂了。</p>'},
                {txt:'<p>不，长官，我是要你了解现在的真实情况：约瑟夫·席德不是那种会认人宰割的家伙。我们之前曾跟他交过手几次，但不是每次都能占上风……有时候，保持现状才是最好的方式。</p>'},
                {txt:'<p>警长，国家之所以建立法律是有理由的，我也要把这理由给约瑟夫讲讲。还有，你说的“伊甸教徒”是什么意思？</p>'},
                {txt:'<p>“伊甸之门计划”就简称为“伊甸教”，这是本地人称呼他们的方式。你知道，几年前他们刚成立时是个无害的教派，但现在他们全副武装，随时想找人开战。</p>'},
                {txt:'<p>警长，你害怕也晚了，现在他们的地盘就在我们脚下。</p>'}
            ]
        },
        task104:{
            bg:gloCfg.flowPath+'task104-bg.jpg',
            tips:{
                txt:'<p>在《孤岛惊魂5》的世界里设有大量的邪教哨站，一旦邪教哨站获得解放，你就能进行新的任务与使用商店。</p><p>邪教哨站最多会设置3个警报器。如果你在解除警报前被发现，敌方增援就会被叫来。解放哨站又未被发现就会奖励更多的金钱。</p>'
            }
        },
        task105:{
            bg:gloCfg.flowPath+'task103-bg.jpg',
            dia:[
                {
                    txt:'<p>长官，真的不能返回了么。</p>'
                },
                {
                    txt:'<p>我们进去，降落吧。</p>'
                }
            ],
            transit:{
                video:{
                    player:'se',
                    vid:'jr2uy',
                    bkvid:'XMzQ4OTI1MzU4NA',
                    controls:false
                }
            }
        },
        task106:{
            bg:gloCfg.flowPath+'task106-bg.jpg',
            tro:{
                btn:gloCfg.flowPath+'task106-tro-btn.png',
                txt:gloCfg.flowPath+'task106-tro-txt.png'
            },
            arcbtn:'前往'
        },
        task107:{
            bg:gloCfg.flowPath+'task107-bg.jpg',
            tro:{
                btn:gloCfg.flowPath+'task107-tro-btn.png',
                txt:gloCfg.flowPath+'task107-tro-txt.png'
            },
            transit:{
                video:{
                    player:'se',
                    vid:'2f6sk',
                    bkvid:'XMzQ4OTI1MTgxNg',
                    controls:false
                }
            },
            arcbtn:'前往'
        },
        task108:{
            bg:gloCfg.mediaPath+'task108-vd1.mp4',
            transit:{
                video:{
                    player:'se',
                    vid:'e8yio',
                    bkvid:'XMzQ5MjAyMzM3Ng',
                    controls:false
                }
            }
        },
        task2:{
            bg:gloCfg.mediaPath+'task2-vd.mp4'
        },
        task201:{
            bg:gloCfg.flowPath+'task2-bg.jpg'
        },
        task202:{
            bg:gloCfg.mediaPath+'task202-vd.mp4',
            arcbtn:'迂回至障碍物后方'
        },
        task203:{
            bg:gloCfg.flowPath+'task203-bg.jpg',
            light:gloCfg.flowPath+'task203-light.png',
            arcbtn:'绕到敌人身后'
        },
        task204:{
            bg:gloCfg.mediaPath+'task204-vd.mp4',
            arcbtn:'前往'
        },
        task205:{
            bg:gloCfg.flowPath+'task205-bg.jpg',
            arr:{
                bg:gloCfg.flowPath+'task205-arr.png',
                txt:'选择绕路'
            },
            tro:'在《孤岛惊魂5》中，正面迎敌不是唯一选择，仔细观察敌我优势，制定正确的战术才是赢得胜利的关键。'
        },
        task206:{
            bg:gloCfg.flowPath+'task206-bg.jpg',
            arcbtn:'前往'
        },
        task3: {
            transit:{
                video:{
                    player:'se',
                    vid:'y6sed',
                    bkvid:'XMzQ5MjAyMzAyNA',
                    controls:false
                }
            }
        },
        task301:{
            bg:gloCfg.flowPath+'task301-bg.jpg',
            fight:{
                gun:{
                    pic:gloCfg.flowPath+'task301-gun.png',
                    fire:gloCfg.flowPath+'task301-gun-fire.png'
                },
                enemy:[
                    {
                        full:gloCfg.flowPath+'task301-enemy0.png',
                        half:gloCfg.flowPath+'task301-enemy0-r.png'
                    },
                    {
                        full:gloCfg.flowPath+'task301-enemy1.png',
                        half:gloCfg.flowPath+'task301-enemy1-r.png'
                    }
                ]
            }
        },
        task302:{
            bg:gloCfg.flowPath+'task302-bg.jpg',
            fight:{
                gun:{
                    pic:gloCfg.flowPath+'task302-gun.png',
                    fire:gloCfg.flowPath+'task302-gun-fire.png'
                },
                enemy:[
                    {
                        full:gloCfg.flowPath+'task302-enemy0.png',
                        half:gloCfg.flowPath+'task302-enemy0-r.png'
                    },
                    {
                        full:gloCfg.flowPath+'task302-enemy1.png',
                        half:gloCfg.flowPath+'task302-enemy1-r.png'
                    }
                ]
            }
        },
        task303:{
            bg:gloCfg.flowPath+'task303-bg.jpg',
            fight:{
                gun:{
                    pic:gloCfg.flowPath+'task303-gun.png',
                    fire:gloCfg.flowPath+'task303-gun-fire.png'
                },
                enemy:[
                    {
                        full:gloCfg.flowPath+'task303-enemy0.png',
                        half:gloCfg.flowPath+'task303-enemy0-r.png'
                    },
                    {
                        full:gloCfg.flowPath+'task303-enemy1.png',
                        half:gloCfg.flowPath+'task303-enemy1-r.png'
                    },
                    {
                        full:gloCfg.flowPath+'task303-enemy2.png',
                        half:gloCfg.flowPath+'task303-enemy2-r.png'
                    }
                ]
            },
            transit:{
                video:{
                    player:'se',
                    vid:'nrj5x',
                    bkvid:'XMzQ4OTI1NTY2OA',
                    controls:false
                }
            }
        },
        task304:{
            transit:{
                video:{
                    player:'se',
                    vid:'1m3gk',
                    bkvid:'XMzQ4OTI1Nzc5Ng',
                    controls:false
                }
            }
        },
        task4:{
            transit:{
                video:{
                    player:'se',
                    vid:'ut91m',
                    bkvid:'XMzQ4OTI1NTQ0MA',
                    controls:false
                }
            }
        },
        task401:{
            bg:gloCfg.flowPath+'task401-bg.jpg',
            letter:{
                icon:gloCfg.flowPath+'task401-letter.png',
                list:[
                    {
                        tit:'当地居民为用水奋战',
                        time:false,
                        con:'<p>“道奇”理查·罗斯福因为在法定集水区收集雨水而遭控告，且为此事提出辩驳，但过程中因为蔑视法庭而坐了两天牢。</p><p>“罗斯福先生在未经允许的情况下手机雨水，在蒙大拿州法律中属于相当严重的罪行。”水利局的副局长艾德温·贾西亚如此说明。</p><p>罗斯福先生将针对此指控提出辩驳。</p>',
                        name:false
                    },
                    {
                        tit:'希望郡新闻报的信',
                        time:'2014年10月13日',
                        con:'<p>亲爱的罗斯福先生。</p><p>我想和你谈谈关于最近与政府官员因为收集雨水而发生争执的事情。我这边的理解是你已经获得了许可，但却又遭到否决，导致你坐牢数日，而且还要因此不断地出庭应讯。</p><p>我想要确认你在法庭上的正式陈述，是否为“用水是上天赋予的权利”，而且“政府趁我们不注意的时候窃夺我们的资源！我们有捍卫人权和自由！”还有，你是否真的对法官说：“对，我就是在蔑视你！”了呢？</p><p>如果你想让此事公诸于世，请通知我们。</p>',
                        name:'希望郡新闻报的杰布·波依德。'
                    },
                    {
                        tit:'写给道奇的信',
                        time:'2015年4月27日',
                        con:'<p>老爸，</p><p>我收到你的消息了，他们能撤销控诉真是太好了。</p><p>我们会尽可能空出一部分的暑假时间——瑞奇想让你看砍他拆了辅助轮也能上路的样子——不过安妮大学那里还有不少工作要处理。</p><p>我知道这对你来说很重要，所以我们会试试看……</p><p>只不过请先别再说什么“在家上课”的事情了，好吗？这对我或安妮来说都不好，而南街的学校是最好的学习场所。我们尽量不要声张“预备末日”的作为，我知道瑞奇很喜欢，但是安妮超担心的。</p><p>见面再聊了。</p>',
                        name:'罗比'
                    }
                ]
            },
            radio:{
                icon:gloCfg.flowPath+'task401-radio.png',
                zmCfg:{
                    kf:[
                        {
                            timeStart:1,
                            timeEnd:6,
                            txt:'道奇，你在吗？我是蕾蕾。现在是什么情况？'
                        },
                        {
                            timeStart:7,
                            timeEnd:10,
                            txt:'我们听到一堆枪声，还有好几声爆炸，我敢发誓那绝对不是打雷。'
                        },
                        {
                            timeStart:11,
                            timeEnd:18,
                            txt:'阿布的情绪很激动，不肯静下来。这堆鸟事是不是又跟伊甸教徒有关啊？我们还要忍受多久？'
                        }
                    ]
                }
            }
        },
        task402:{
            bg:gloCfg.flowPath+'task402-bg.jpg'
        },
        task4021:{
            bg:gloCfg.flowPath+'task4021-bg.jpg',
            radio:{
                icon:gloCfg.flowPath+'task4021-radio.png'
            }
        },
        task4022:{
            bg:gloCfg.flowPath+'task4022-bg.jpg',
            radio:{
                zmCfg:{
                    kf:[
                        {
                            timeStart:1,
                            timeEnd:5,
                            txt:'拜托！有人在吗？邪教像军队一样地横扫这里了！'
                        },
                        {
                            timeStart:5.1,
                            timeEnd:12,
                            txt:'将人们往卡车里丢……夺走我们的食物……然后我不断听到枪声……人一个一个死去……拜托有谁可以来帮我们啊……'
                        }
                    ]
                }
            }
        },
        task403:{
            bg:gloCfg.flowPath+'task403-bg.jpg'
        },
        task4031:{
            bg:gloCfg.flowPath+'task4031-bg.jpg'
        },
        task4032:{
            bg:gloCfg.flowPath+'task4032-bg.jpg',
            transit:{
                video:{
                    player:'se',
                    vid:'o5g0w',
                    bkvid:'XMzQ4OTI1MzAwMA',
                    controls:false
                }
            }
        },
        task404:{
            bg:gloCfg.flowPath+'task404-bg.jpg',
            arcbtn:'交谈',
            eye1:gloCfg.flowPath+'task404-eye-light1.png',
            eye2:gloCfg.flowPath+'task404-eye-light2.png'
        },
        task4041:{
            bg:gloCfg.flowPath+'task4041-bg.jpg',
            eyes:[
                {
                    light:gloCfg.flowPath+'task4041-eye-light0.png',
                    tit:'约瑟夫·席德(圣父)',
                    des:'<p>领导“伊甸之门”计划的“圣父”，这位圣父相信世界的崩坏迫在眉睫。他们的任务就是要拯救你的灵魂——无论你是否愿意接受救赎。</p>'
                },
                {
                    light:gloCfg.flowPath+'task4041-eye-light1.png',
                    tit:'费丝·席德（妖女）',
                    des:'<p>一旦受到费丝咒语的影响，一切就无法回头。一如约瑟夫之声，费丝以神之器的身份带来混乱，借此让教众获得祝福。</p>'
                },
                {
                    light:gloCfg.flowPath+'task4041-eye-light2.png',
                    tit:'约翰．席德（异端审判者）',
                    des:'<p>无论家庭或个人，约翰利用威吓、信仰和暴力的方式，来确保足以让这支邪教维持下去的重要资源。</p>'
                },
                {
                    light:gloCfg.flowPath+'task4041-eye-light3.png',
                    tit:'雅各．席德（战士）',
                    des:'<p>他在这支邪教中扮演招募者的角色，在从军时期也曾担任枪手的角色。席德家大哥的主要职责，在于保护“伊甸之门”计划。 </p>'
                }
            ]
        },
        task4042:{
            bg:gloCfg.flowPath+'task4042-bg.jpg',
            eye:{
                light:gloCfg.flowPath+'task4042-eye-light.png',
                name:'资料'
            }
        },
        task405:{
            bg:gloCfg.flowPath+'task405-bg.jpg',
            dia:[
                {
                    txt:'<p>刚才在那里没能好好自我介绍，大多数人叫我道奇。我探到了一点线索，你的搭档还活着……但那只是暂时的，他们好像分头行动了，一个个分别被带去见约瑟夫不同的“家人”。</p>'
                },
                {
                    txt:'<p>你想要把他们救回来，这我了解，我自己也有朋友被抓。问题是接下来不会有援兵，也没人知道这里的情况，就算知道也来不及了。外头一定还有人愿意起来对抗邪教，只要我们能让他们群起效尤就行了， 所以我们需要组织一支反抗势力。</p>'
                },
                {
                    txt:'<p>首要之事就是多的这座岛的控制权，一旦我们有空间可以喘口气，就能想出下一步该怎么办了。</p>'
                }
            ],
            choose:{
                txt:'<p>你还想知道哪些情报？</p>',
                cse1:'反抗势力',
                cse2:'雇佣兵'
            }
        },
        task4051:{
            bg:gloCfg.flowPath+'task4051-bg.jpg'
        },
        task4052:{
            bg:gloCfg.flowPath+'task4052-bg.jpg'
        },
        task:{
            bg:gloCfg.flowPath+'task1-bg.jpg'
        }
    }
};
//预加载图片
 var preLoadPicsLists = {
     list1: [
         pageConfig.pages.pgStart.bg
     ]
 };
/*
global $,jQuery,screenfull,pageConfig,tvp,preLoadPicsLists,Swiper;
 */
(function($){
    $.fn.autoScale = function(options){

        var defaults = {
            baseWidth:1920,
            baseHeight:1080,
            offsetT:0,//上偏移
            offsetL:0,//左偏移
            positionMethod:''
        };

        var opts = $.extend(defaults,options);

        this.each(function(){

            var thisCon = $(this),
                winWidth = $(window).width(),
                winHeight = $(window).height(),
                scalePercentW = winWidth/opts.baseWidth - opts.offsetL,
                scalePercentH = winHeight/opts.baseHeight - opts.offsetT;

            function setPosFun(){
                var acWH=scalePercentH;
                if(winHeight>(winWidth/16*9)){
                    acWH = scalePercentW;
                    thisCon.css({
                        'top':'50%',
                        'left':'0',
                        'transform-origin':'0 0',
                        'transform':'scale(' + acWH + ') translate(0,-50%)'
                    });
                }else{
                    acWH = scalePercentH;
                    thisCon.css({
                        'top':'0',
                        'left':'50%',
                        'transform-origin':'0 0',
                        'transform':'scale(' + acWH + ') translate(-50%,0)'
                    });
                }
                gloCfg.page.zoom = acWH;

                $(window).resize(function(){
                    winWidth = $(window).width();scalePercentW = winWidth/opts.baseWidth - opts.offsetL;
                    winHeight = $(window).height();scalePercentH = winHeight/opts.baseHeight - opts.offsetT;
                    acWH=scalePercentH;
                    if(winHeight>(winWidth/16*9)){
                        acWH = scalePercentW;
                        thisCon.css({
                            'top':'50%',
                            'left':'0',
                            'transform-origin':'0 0',
                            'transform':'scale(' + acWH + ') translate(0,-50%)'
                        });
                    }else{
                        acWH = scalePercentH;
                        thisCon.css({
                            'top':'0',
                            'left':'50%',
                            'transform-origin':'0 0',
                            'transform':'scale(' + acWH + ') translate(-50%,0)'
                        });
                    }
                    gloCfg.page.zoom = acWH;
                });
            }
            setPosFun();
        });
    };
})(jQuery);
var animEnd='webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend',pageTimer;
$.fn.extend({
    animateCss: function (animationName,callback) {
        var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
        this.addClass('animated ' + animationName).one(animationEnd, function() {
            $(this).removeClass('animated ' + animationName);
            if(callback){
                callback();
            }
        });
    }
});
function fullScreen() {
    if (screenfull.enabled) {
        screenfull.request();
    }
}
var commonComponents = {
    othersArea:function (tar,cfg) {
        var tmpDom='';
        tmpDom += '<div class="others-area">';
        tmpDom += '<a class="zanbtn supportMe" data-itemid="'+gloCfg.countid+'" data-field="digg" data-table="PE_U_Article"><i class="ico_zan"></i><span><i class="zanNum">0</i>人赞过</span></a>';
        tmpDom += '<div class="clearfix btn-group">';
        tmpDom += '<a class="btn-buy OthersBtnBuy"></a>';
        tmpDom += '<a target="_blank" href="'+gloCfg.url.club+'" class="btn-club"></a>';
        tmpDom += '<a target="_blank" href="'+gloCfg.url.ku+'" class="btn-ku"></a>';
        tmpDom += '<a target="_blank" href="'+gloCfg.url.pc+'" class="btn-pc"></a>';
        tmpDom += '<a class="btn-comm OthersBtnComm"></a>';
        tmpDom += '</div>';
        tmpDom += '</div>';
        tar.append(tmpDom);
        $(".supportMe").supportMe();
        tar.find('.OthersBtnBuy').on('click',function(){
            pageFunc.pgVersion();
        });
        tar.find('.OthersBtnComm').on('click',function(){
            pageFunc.commPage();
        });
        if(typeof cfg === 'object'){
            if(cfg.comm === false){
                tar.find('.OthersBtnComm').remove();
            }
        }
    },
    baiduShare:function (tar,addClass) {
        var tmpDom='';
        if(typeof addClass === 'undefined'){
            addClass = '';
        }
        tmpDom += '<div class="baidushare-area">';
        tmpDom += '<div class="bdsharewrap bdstyle-c '+addClass+'"><div class="bdsharebuttonbox bdshare-button-style0-16" data-tag="share_1" data-bd-bind="1446461622481"><a target="_self" class="bdicons bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a><a class="bdicons bds_weixin" data-cmd="weixin" title="分享到微信"></a><a class="bdicons bds_sqq" data-cmd="sqq" title="分享到QQ"></a><a class="bdicons bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a class="bdicons bds_tieba" data-cmd="tieba" title="分享到贴吧"></a><a class="bdicons bds_renren" data-cmd="renren" title="分享到人人"></a><a class="bdicons bds_douban" data-cmd="douban" title="分享到豆瓣"></a><a class="bdicons bds_more" data-cmd="more"></a><a class="bds_count" data-cmd="count" title=""></a></div></div>';
        tmpDom += '</div>';
        tar.append(tmpDom);
        window._bd_share_main.init();
    },
    player:function (tar,vdcfg,callback) {
        /*
         *
         * video:{
         * player:'se',
         * vid:'xrgnc',
         * bkvid:'XMzQ4OTI1MTgxNg',
         * controls:false,
         * bgmmuted:false
         * }
         * bgmmuted:false 背景不静音
         * controls:false 不显示控制条
         * bkvid:''       备用视频地址
         */
        var $tar = $('#'+tar);
        $tar.html('');
        function addYk(vid) {
            var player = new YKU.Player(tar,{
                styleid: '0',
                client_id: '6bfe5b183f11e7d9',
                vid: vid,
                newPlayer: true,
                autoplay: true
            });
        }
        function videoEnd() {
            callback();
            if(vdcfg.bgmmuted !== false){
                yms.bgmAfterVideo();
            }
        }
        function backupPlayer() {
            $tar.html('');
            addYk(vdcfg.bkvid);
        }
        function addStreamable(vid) {
            function playVd(url) {
                var videoArea = document.getElementById(tar),
                    videoPlayer = document.createElement('video'),pendingTimer;
                videoPlayer.src = url;
                videoPlayer.setAttribute('class','video-steamable');
                if(vdcfg.controls !== false){
                    videoPlayer.setAttribute('controls',true);
                }
                videoArea.appendChild(videoPlayer);
                videoPlayer.play();
                videoPlayer.onerror = function() {
                    backupPlayer();
                };
                pendingTimer = setTimeout(function () {
                    backupPlayer();
                },5000);
                videoPlayer.onplaying = function () {
                    clearTimeout(pendingTimer);
                };
                if(typeof callback === 'function'){
                    videoPlayer.onended = function () {
                        videoEnd();
                    }
                }
            }
            $.ajax({
                dataType:'json',
                url:'https://api.streamable.com/videos/'+vid,
                success:function (data) {
                    playVd(data.files.mp4.url);
                },
                error:function (err) {
                    backupPlayer();
                }
            })
        }
        if(vdcfg.bgmmuted !== false){
            yms.bgmBeforeVideo();
        }
        if(typeof callback === 'function'){
            $('<a class="yk-btn-next ykBtnNext">跳过</a>').insertAfter($tar);
            $('.ykBtnNext').on('click',function () {
                videoEnd();
            });
        }
        if(vdcfg.player === 'se'){
            addStreamable(vdcfg.vid);
        }else{
            addYk(vdcfg.vid);
        }

    },
    horWheel:function (wrap,rio) {
        wrap.on('mousewheel',function (ev) {
            rio = rio|40;
            wrap[0].scrollLeft += -ev.deltaY*rio;
        })
    },
    tabs:function (nav,con) {
        var tabTimer;
        nav.on({
            mouseover:function () {
                var $ts = $(this),idx = $ts.index();
                tabTimer = setTimeout(function () {
                    nav.removeClass('cur').eq(idx).addClass('cur');
                    con.removeClass('cur').eq(idx).addClass('cur');
                },120);
            },
            mouseout:function () {
                clearTimeout(tabTimer);
            }
        })
    },
    bindKey:function (key,callback) {
        var keyCodeNum={a:65,b:66,c:67,d:68,e:69,f:70,g:71,h:72,i:73,j:74,k:75,l:76,m:77,n:78,o:79,p:80,q:81,r:82,s:83,t:84,u:85,v:86,w:87,x:88,y:89,z:90,space:32,tab:9,shift:16,k1:49,k2:50,k3:51,k4:52,k5:53,k6:54};
        $(document).on({
            'keydown':function (event) {
                if(pageConfig.isCommOpen === false){
                    //event.preventDefault();
                    var e = event ? event : window.event;
                    var ekc = e.keyCode;
                    if(ekc === 97){
                        ekc = 49;
                    }else if(ekc === 98){
                        ekc = 50;
                    }else if(ekc === 99){
                        ekc = 51;
                    }else if(ekc === 100){
                        ekc = 52;
                    }else if(ekc === 101){
                        ekc = 53;
                    }else if(ekc === 102){
                        ekc = 54;
                    }
                    if(ekc === keyCodeNum[key]){
                        $(document).off();
                        if(typeof callback === 'function'){
                            callback();
                        }
                    }
                }
            }
        });
    },
    keyBdButton:function (key,tar,callback) {
        function buttonEvent() {
            if(typeof callback === 'function'){
                callback();
            }
        }
        commonComponents.bindKey(key,function () {
            buttonEvent();
        });
        tar.on('click',function(){
            buttonEvent();
        });
    },
    playAudio:function (aid,zmCfg) {
        var zmDom = '',
            $dad = $('#pageswrap'),
            auo = document.getElementById(aid),zmTimerQue = [];
        yms.bgmBeforeVideo();
        auo.currentTime = 0;
        auo.play();
        function addZm() {
            function showZm(idx) {
                $dad.find('.audioZmTxt').removeClass('cur');
                $dad.find('.audioZmTxt'+idx).addClass('cur');
            }
            function closeZm() {
                $dad.find('.audioZmTxt').removeClass('cur');
            }
            zmDom += '<div class="audio-zm audioZm">';
            $.each(zmCfg.kf,function (i,item) {
                zmDom += '<div class="audio-zm-txt audioZmTxt audioZmTxt'+i+'">'+item.txt+'</div>';
            });
            zmDom += '<a class="audio-zm-skip audioZmSkip">关闭</a>';
            zmDom += '</div>';
            $dad.append(zmDom);
            function clearZm() {
                for (var tm = 0;tm<zmTimerQue.length;tm++){
                    clearTimeout(zmTimerQue[tm]);
                }
                $dad.find('.audioZm').remove();
                auo.pause();
                yms.bgmAfterVideo();
            }
            $.each(zmCfg.kf,function (i,item) {
                zmTimerQue[i] = setTimeout(function () {
                    showZm(i);
                    zmTimerQue[i] = setTimeout(function () {
                        closeZm()
                    },(item.timeEnd - item.timeStart)*1000);
                },item.timeStart*1000);
            });
            $dad.find('.audioZmSkip').on('click',function () {
                clearZm();
            });
            auo.onended = function () {
                clearZm();
            }
        }
        if(typeof zmCfg !== 'undefined'){
            addZm();
        }
    },
    mouseScrollTips:function (tar) {
        var msDom = '';
        msDom += '<div class="mouse-scroll-tips mouseScrollTips"></div>';
        tar.append(msDom);
        var isScrolled = false,scHideTimer;
        $('#pageswrap').on('mousewheel',function () {
            if(isScrolled === false){
                $('#pageswrap').off('mousewheel');
                scHideTimer = setTimeout(function () {
                    $('.mouseScrollTips').remove();
                },500)
            }
        });
    }
};
var yms={
    browSet:function () {
        var bdr = $.browser,$html = $('html');
        if(bdr.msie===true || parseInt(bdr.version)===11){
            $html.addClass('ie');
        }
        if(bdr.msie===true && parseInt(bdr.version)===10){
            $html.addClass('ie10');
        }

    },
    autoPos:function(){
        $('.autoMH').each(function(){
            $(this).autoScale();
        });
    },
    bgmSet:function(bgmsrc){
        if(pageConfig.nowplay !== bgmsrc){
            $('#bgm').attr('src',bgmsrc);
            if(pageConfig.userMute !== true){
                yms.bgmPlay();
            }
        }
    },
    bgmBtn:function(tar){
        var thObj = this;
        tar.on('click',function(){
            if(pageConfig.volClk){
                pageConfig.userMute = true;
                thObj.bgmPause();
            }else{
                pageConfig.userMute = false;
                thObj.bgmPlay();
            }
        });
    },
    bgmPlay:function(){
        var bgmId = document.getElementById('bgm'),$bgmVol = $('.volbtn');
        bgmId.play();
        pageConfig.volClk = true;
        $bgmVol.removeClass('pause').find('span').text(pageConfig.bgm.txt[1]);
        bgmId.volume = 1;

    },
    bgmPause:function(){
        var bgmId = document.getElementById('bgm'),$bgmVol = $('.volbtn');
        bgmId.pause();
        pageConfig.volClk = false;
        $bgmVol.addClass('pause').find('span').text(pageConfig.bgm.txt[0]);
    },
    bgmBeforeVideo:function () {
        pageConfig.isVideoPlaying = true;
        yms.bgmPause();
    },
    bgmAfterVideo:function () {
        pageConfig.isVideoPlaying = false;
        if(pageConfig.userMute !== true){
            yms.bgmPlay();
        }
    },
    //失去焦点
    htFun:function(){
        var thObj = this;
        $(window).on({
            'blur':function(){
                thObj.bgmPause();
            },
            'focus':function(){
                if(pageConfig.userMute !== true && pageConfig.isVideoPlaying !==true){
                    thObj.bgmPlay();
                }
            }
        });
    },
    fixedNav:function(){
        var fixNavDom = '';
        fixNavDom += '<div class="fx_list">';
        fixNavDom += '<a class="fixBtn" data-page="pgMenu"><span>任务</span><i class="icon-task"></i></a>';
        fixNavDom += '<a class="btnInfo"><span>资料</span><i class="icon-infos"></i></a>';
        fixNavDom += '<a class="fixBtnComm"></i><span>评论</span><i class="icon-comm"></a>';
        fixNavDom += '</div>';

        var fixNav = $('#fixNav');
        fixNav.html(fixNavDom);
        fixNav.on('click','.enClk',function () {
            var sel = $(this).data('page');
            pageFunc[sel]();
        });
        fixNav.find('.fixBtnComm').on('click',function () {
            pageFunc.commPage();
        });
    },
    fixedNavFunc:function () {
        var fixNav = $('#fixNav'),dm = $('#dgyMain');
        if(stateStore.fixedNavShow === true){
            fixNav.addClass('cur');
        }else{
            fixNav.removeClass('cur');
        }
        fixNav.find('.fixBtn').each(function () {
            var $this = $(this),num = $this.data('page');
            if(dm.find('.'+num).length>0){
                fixNav.find('.fixBtn').removeClass('cur').addClass('enClk');
                $this.removeClass('enClk').addClass('cur');
            }else{
                $this.addClass('enClk').removeClass('cur');
            }
        });
    },
    beforeChangePage:function () {
        clearTimeout(pageAutoTimer);
    },
    chagePage:function(callback){
        var _this = this;
        _this.beforeChangePage();
        clearTimeout(pageTimer);
        $('#fixNav').removeClass('cur');
        $('#dgyMain').removeClass('cur');
        stateStore.fixedNavShow = false;
        pageTimer = setTimeout(function(){
            callback();
            _this.fixedNavFunc();
        },400);
    },
    preLoadImg:function (urls) {
        for (var i = 0; i < urls.length; i++) {
            var obj = new Image();
            obj.src = urls[i];
        }
    },
    dgyRender:function(){
        var dgyObj = this;
        dgyObj.browSet();
        dgyObj.htFun();
        dgyObj.autoPos();
    }
};
yms.dgyRender();
yms.bgmBtn($('.volbtn'));

/*
global $,yms,pageConfig,preLoadPicsLists,Swiper,fullScreen,bkDatas,mapData,armsData,abilitiesData,gearData,targetData
 */
var bindGlobal = {
    context:{
        common:function (dt,sel) {
            $('#infosTitle').html(dt.list[sel].name);
        },
        map:function (dt,tar) {
            var tmpDom = '',tmpTro = '';
            tmpDom += '<div class="infos-com infos-map" id="infosMap">';
            tmpDom += '<div id="infosMapWheel" class="wheel-img"><img src="'+dt.bg+'" alt="'+dt.name+'">';
            $.each(dt.tro,function (i,item) {
                tmpDom += '<a class="mapBtn map-btn map-btn'+item.id+'" data-tar="'+item.id+'">';
                tmpDom += '<img src="'+item.cell.lig+'" alt="'+item.name+'" class="light">';
                tmpDom += '<img src="'+item.cell.txt+'" alt="'+item.name+'" class="txt">';
                tmpTro += '<img src="'+item.cell.pop+'" alt="'+item.name+'" class="pop mapPop mapPop'+item.id+'">';
                tmpDom += '</a>';
            });
            tmpDom += '</div>';
            tmpDom += tmpTro;
            tmpDom += '</div>';
            tar.html(tmpDom);
            var $map = $('#infosMap'),$wbg = $('#infosMapWheel'),baseCfg = {
                width:2343,
                height:2261
            };
            var count = 100,
                lv = 10;//缩放速度
            commonComponents.mouseScrollTips(tar);
            $wbg.on('mousewheel',function (ev) {
                var rio,
                    wlx = ev.pageX,
                    wly = ev.pageY,
                    $ww = $(window).width(),
                    $wh = $(window).height(),
                    mw,mh,pageScaleVal,scaleDot,trox,troy,
                    scaleLRTB={
                        l:'auto',
                        r:'auto',
                        t:'auto',
                        b:'auto'
                    };
                if($ww/$wh>16/9){
                    mw = $ww;
                    mh = mw/16*9;
                }else{
                    mh = $wh;
                    mw = mh/9*16;
                }
                if(wlx<mw/2&&wly<mh/2){
                    scaleLRTB.l = '-62px';
                    scaleLRTB.t = '-117px';
                    scaleDot = '0 0';
                }else if(wlx<mw/2&&wly>mh/2){
                    scaleLRTB.l = '-168px';
                    scaleLRTB.t = '-886px';
                    scaleDot = '0 100%';
                }else if(wlx>=mw/2){
                    scaleLRTB.l = '-658px';
                    scaleLRTB.t = '-583px';
                    scaleDot = '50% 20%';
                }
                /*
                trox = wlx/mw*100+'%';
                troy = wly/mh+'%';
                scaleLRTB.l = 0;
                scaleLRTB.t = 0;
                scaleDot = trox+' '+troy;
                */
                if(ev.deltaY<0){
                    count = count - lv;
                }else{
                    count = count + lv;
                }
                rio = count/100;
                if(rio>1){
                    rio = 1;
                    count = 100;
                }else if(rio < 1920/2343){
                    rio = 1920/2343;
                    count = 100*1920/2343;
                }
                $wbg.css({
                    left:scaleLRTB.l,
                    right:scaleLRTB.r,
                    top:scaleLRTB.t,
                    bottom:scaleLRTB.b,
                    'transform':'scale('+rio+')',
                    'transform-origin':scaleDot
                })
            });
            $map.on('click',function () {
                $map.find('.mapPop').removeClass('cur');
            });
            $map.find('.mapBtn').on('click',function (event) {
                event.stopPropagation();
                var $this = $(this),tar = $this.data('tar');
                $map.find('.mapPop').removeClass('cur');
                $map.find('.mapPop'+tar).addClass('cur');
            })
        },
        fun:function (dt,tar) {
            var tmpDom = '';
            tmpDom += '<div class="infos-com infos-fun" id="infosFun">';
            tmpDom += '<img class="bg" src="'+dt.bg+'" alt="'+dt.name+'">';
            tmpDom += '<div class="des">'+dt.des+'</div>';
            tmpDom += '<div class="video" id="infosFunVideo"><a class="ykBtn"><img src="'+dt.video.poster+'" alt="'+dt.name+'"></a></div>';
            tmpDom += '</div>';
            tar.html(tmpDom);
            var $area = $('#infosFun');
            $area.find('.ykBtn').on('click',function () {
                var tar = 'infosFunVideo',$tar = $('#'+tar);
                $tar.html('');
                commonComponents.player('infosFunVideo',dt.video);
            })
        },
        role:function (dt,tar) {
            var tmpDom = '',tmpDomNav = '',tmpDomCon = '';
            $.each(dt.tab,function (i,item) {
                tmpDomNav += '<a class="infosRoleNav" data-fnc="'+item.fnc+'"><i></i><span>'+item.name+'</span></a>';
            });
            tmpDom += '<div class="infos-com infos-role" id="infosRole">';
            tmpDom += '<img class="bg" src="'+dt.bg+'" alt="'+dt.name+'">';
            tmpDom += '<div class="infos-role-con" id="infosRoleCon"></div>';
            tmpDom += '<div class="infos-role-nav">';
            tmpDom += tmpDomNav;
            tmpDom += '</div>';
            tmpDom += '</div>';
            tar.html(tmpDom);
            commonComponents.mouseScrollTips(tar);
            var $area = $('#infosRole'),$con = $('#infosRoleCon');
            function horPic(num) {
                var conDom = '',tabDt = dt.tab[num];
                conDom += '<div class="infos-role-srl">';
                conDom += '<div class="infos-role-srl-con irSrlCon">';
                conDom += '<div class="infos-role-cat infos-role-cat'+num+'" id="irc">';
                conDom += '<img class="bg-pic" src="'+tabDt.pic+'" alt="'+tabDt.name+'">';
                conDom += '<div class="infos-role-cat-pop ircPop">';
                conDom += '<div id="ircPopCon">';
                conDom += '<div id="ircPopInner"></div>';
                conDom += '<a class="infos-role-cat-pop-close ircPopClose"></a>';
                conDom += '</div></div>';
                $.each(tabDt.pps,function (i,item) {
                    conDom += '<a class="ircBtn infos-role-cat-btn infos-role-cat-btn'+i+'" data-num="'+i+'">';
                    conDom += '<img class="infos-role-cat-lig" src="'+item.lig+'" alt="'+item.name+'">';
                    conDom += '<img class="infos-role-cat-pic" src="'+item.pic+'" alt="'+item.name+'">';
                    conDom += '<div class="infos-role-cat-tit"><div class="lev2">'+item.sub+item.pos+'</div><div class="lev1">'+item.name+'</div></div>';
                    conDom += '</a>';
                });
                conDom += '</div>';
                conDom += '</div></div>';
                $con.html(conDom);
                var $cat = $('#irc'),
                    $pop = $cat.find('.ircPop'),
                    $popcon = $('#ircPopCon'),
                    $inner = $('#ircPopInner');
                $cat.find('.ircBtn').on('click',function () {
                    var $this = $(this),
                        idx = $this.data('num'),
                        popDt = tabDt.pps[idx],
                        popDom = '';
                    if($this.hasClass('cur') === true){
                        return false;
                    }

                    popDom += '<div id="ircPopVideo" class="video"><a class="ircPopVideoBtn"><img src="'+popDt.video.poster+'" alt="'+popDt.name+'"></a></div>';
                    popDom += '<div class="des">'+popDt.des+'</div>';


                    $cat.find('.ircBtn').removeClass('cur');
                    $popcon.addClass('infos-role-cat-pop-context infos-role-cat-pop-context'+idx);
                    $inner.html(popDom);
                    $pop.addClass('cur');
                    $this.addClass('cur');
                    $inner.find('.ircPopVideoBtn').on('click',function () {
                        commonComponents.player('ircPopVideo',popDt.video)
                    })

                });
                $cat.find('.ircPopClose').on('click',function () {
                    $cat.find('.ircBtn').removeClass('cur');
                    $popcon.removeClass();
                    $pop.removeClass('cur');
                    $inner.html('');
                    yms.bgmAfterVideo();
                });
            }
            var conChange = {
                ir0:function (num) {
                    var conDom = '',tabDt = dt.tab[num];
                    conDom += '<div class="infos-role-srl">';
                    conDom += '<img class="infos-role-elp-bg" src="'+tabDt.pic+'" alt="'+tabDt.name+'">';
                    conDom += '<div class="infos-role-srl-con irSrlCon">';
                    conDom += '<div id="ireList" class="clearfix infos-role-elp-list">';
                    $.each(tabDt.pps,function (i,item) {
                        conDom += '<div class="infos-role-elp-box infos-role-elp-box'+i+' ireBox'+i+'">';
                        conDom += '<div class="infos-role-elp-top">';
                        conDom += '<h5>'+item.name+'</h5>';
                        conDom += '<p>'+item.sub+item.pos+'</p>';
                        conDom += '<div class="infos-role-elp-btn ireBtn" data-num="'+i+'"><img src="'+item.pic+'" alt="'+item.name+'">';
                        conDom += '<div class="bd"></div><img src="'+item.pic+'" alt="'+item.name+'">';
                        conDom += '</div></div>';
                        conDom += '<div class="infos-role-elp-pop irePop"></div>';
                        conDom += '</div>';
                    });
                    conDom += '</div>';
                    conDom += '</div></div>';
                    $con.html(conDom);
                    var $list = $('#ireList');
                    function showPop(num) {
                        var tarBox = $list.find('.ireBox'+num),
                            popDom = '';
                        if(tabDt.pps[num].video.novd === true){
                            popDom += '<div id="irePopVideo" class="video"><img src="'+tabDt.pps[num].video.poster+'" alt="'+tabDt.pps[num].name+'"></div>';
                        }else{
                            popDom += '<div id="irePopVideo" class="video"><a class="infos-role-elp-pop-vdb irePopVideoBtn"><img src="'+tabDt.pps[num].video.poster+'" alt="'+tabDt.pps[num].name+'"></a></div>';
                        }
                        popDom += '<div class="des">'+tabDt.pps[num].des+'</div>';
                        $list.find('.irePop').removeClass('cur').html('');
                        $list.find('.ireBtn').removeClass('cur');
                        tarBox.find('.irePop').addClass('cur').html(popDom);
                        tarBox.find('.ireBtn').addClass('cur');
                        tarBox.find('.irePopVideoBtn').on('click',function () {
                            commonComponents.player('irePopVideo',tabDt.pps[num].video)
                        })
                    }
                    $list.find('.ireBtn').on('click',function () {
                        var $this = $(this),num = $this.data('num');
                        showPop(num);
                    });
                    showPop(0);
                },
                ir1:function (num) {
                    horPic(num);
                },
                ir2:function (num) {
                    horPic(num);
                }
            };
            function selectTab(idx) {
                var $nav = $area.find('.infosRoleNav'),
                    $idx = $nav.eq(idx),
                    fnc = $idx.data('fnc');
                $nav.removeClass('cur');
                $idx.addClass('cur');
                conChange[fnc](idx);
                commonComponents.horWheel($('.irSrlCon'));
            }
            $area.find('.infosRoleNav').on('click',function () {
                var $ts = $(this),idx = $ts.index();
                selectTab(idx);
                yms.bgmAfterVideo();
            });
            selectTab(1);
        },
        skill:function (dt,tar) {
            var tmpDom = '';
            tmpDom += '<div class="infos-com infos-skill" id="infosSkill">';
            tmpDom += '<div class="infos-skill-tab">';
            tmpDom += '<div class="infos-skill-tab-con" id="istCon"></div>';

            tmpDom += '<div class="infos-skill-tab-nav">';
            $.each(dt.sks,function (i,item) {
                tmpDom += '<div class="ist-group istGroup istGroup'+i+'">';
                tmpDom += '<img class="icons icons'+i+'" src="'+item.icon+'" alt="'+i+'">';
                tmpDom += '<ul class="clearfix">';
                for(var j = 0;j<item.num;j++){
                    tmpDom += '<li>';
                    tmpDom += '<a class="istItem istItem'+j+'" data-group="'+i+'" data-item="'+j+'"><img src="'+dt.path+'sk'+i+j+'.png" alt="'+j+'"></a>';
                    tmpDom += '</li>';
                }
                tmpDom += '</ul>';
                tmpDom += '</div>';
            });
            tmpDom += '</div>';

            tmpDom += '</div>';
            tmpDom += '</div>';
            tar.html(tmpDom);
            var $area = $('#infosSkill'),$istCon = $('#istCon');
            function chooseNav(gp,eh) {
                var $group = $area.find('.istGroup'+gp);
                $area.find('.istGroup,.istItem').removeClass('cur');
                $group.addClass('cur').find('.istItem'+eh).addClass('cur');
                $istCon.html('<img src="'+dt.path+'sk'+gp+eh+'.jpg" alt="'+gp+eh+'">')
            }
            $area.find('.istItem').on('click',function () {
                var $this = $(this),gp = $this.data('group'),eh = $this.data('item');
                chooseNav(gp,eh);
            });
            chooseNav(0,0);
        },
        arms:function (dt,tar) {
            var tmpDom = '',tmpNavDom='',tmpNavLinkDom = '';
            tmpDom += '<div class="infos-com infos-arms" id="infosArms">';

            tmpDom += '<div class="infos-arms-con" id="infosArmsCon"></div>';
            tmpDom += '<div class="infos-arms-nav">';
            tmpNavLinkDom += '<div class="clearfix ian-link" id="infosArmsLinks">';
            tmpNavDom += '<div class="ian-scl ianScl">';
            $.each(dt.list,function (i,item) {
                tmpNavLinkDom += '<a class="ian-link'+item.id+'"></a>';
                tmpNavDom += '<div class="ian-group ianGroup ianGroup'+i+'">';
                tmpNavDom += '<h5>'+item.name+'</h5>';
                for (var j = 0;j<item.num;j++){
                    if(j < 10){
                        j = '0'+j;
                    }
                    j = j + '';
                    var btnKey = item.id+''+j;
                    tmpNavDom += '<a class="ianBtn ianBtn'+btnKey+'" data-iankey="'+btnKey+'"><img src="'+dt.path+'arms-g'+btnKey+'.png" alt="'+item.name+'"></a>';
                }
                tmpNavDom += '</div>';
            });
            tmpNavDom += '</div>';
            tmpNavLinkDom += '</div>';

            tmpDom += tmpNavLinkDom;
            tmpDom += tmpNavDom;
            tmpDom += '</div>';

            tmpDom += '</div>';
            tar.html(tmpDom);
            var $area = $('#infosArms'),
                $link = $('#infosArmsLinks'),
                $scl = $area.find('.ianScl'),
                scTop = $scl.offset().top,
                ofTop = [],sumHeight = 0;
            $area.find('.ianGroup').each(function () {
                var $ts = $(this),
                    dtc = sumHeight;
                ofTop.push(dtc);
                sumHeight = sumHeight + $ts.height();
            });
            function isLink(sst) {
                var backVal;
                for(var gt = 0;gt<ofTop.length;gt++){
                    if(sst+200>=ofTop[gt]){
                        backVal = gt;
                    }
                }
                return backVal;
            }
            $scl.on('scroll',function () {
                $link.find('a').removeClass('cur');
                $link.find('a').eq(isLink($scl.scrollTop())).addClass('cur');
            });
            $link.find('a').on('click',function () {
                var $ts = $(this),
                    idx = $ts.index(),
                    $tarGroup = $area.find('.ianGroup'+idx);
                $link.find('a').removeClass('cur').eq(idx).addClass('cur');
                var dtc = ofTop[idx];
                $scl.animate({scrollTop:dtc},250);
            });
            $area.find('.ianBtn').on('click',function () {
                var $ts = $(this),btnkey = $ts.data('iankey');
                setCon(btnkey)
            });
            function setCon(iankey) {
                $area.find('.ianBtn').removeClass('cur');
                $area.find('.ianBtn'+iankey).addClass('cur');
                $('#infosArmsCon').html('<img src="'+dt.path+'arms-g'+iankey+'.jpg" alt="'+iankey+'">');
            }
            //default state
            setCon('000');
            $link.find('a').eq(0).addClass('cur');
        },
        tools:function (dt,tar) {
            var tmpDom = '',tmpNavDom='';
            tmpDom += '<div class="infos-com infos-tools" id="infosTools">';

            tmpDom += '<div class="infos-tools-con" id="infosToolsCon"></div>';
            tmpDom += '<div class="infos-tools-nav">';
            tmpNavDom += '<div class="itn-scl">';
            $.each(dt.list,function (i,item) {
                tmpNavDom += '<div class="itn-group itnGroup itnGroup'+item.id+'">';
                tmpNavDom += '<h5>'+item.name+'</h5><div class="clearfix">';
                for (var j = 0;j<item.num;j++){
                    if(j < 10){
                        j = '0'+j;
                    }
                    j = j + '';
                    var btnKey = item.id+''+j;
                    tmpNavDom += '<a class="itnBtn itnBtn'+btnKey+'" data-gp="'+item.id+'" data-itnkey="'+btnKey+'"><img src="'+dt.path+'tools-g'+btnKey+'.png" alt="'+item.name+'"></a>';
                }
                tmpNavDom += '</div></div>';
            });
            tmpNavDom += '</div>';

            tmpDom += tmpNavDom;
            tmpDom += '</div>';

            tmpDom += '</div>';
            tar.html(tmpDom);
            var $area = $('#infosTools');
            $area.find('.itnBtn').on('click',function () {
                var $ts = $(this),btnkey = $ts.data('itnkey'),gp = $ts.data('gp');
                setCon(btnkey,gp);
            });
            function setCon(itnkey,gp) {
                $area.find('.itnBtn').removeClass('cur');
                $area.find('.itnBtn'+itnkey).addClass('cur');
                $area.find('.itnGroup').removeClass('cur');
                $area.find('.itnGroup'+gp).addClass('cur');
                $('#infosToolsCon').html('<img src="'+dt.path+'tools-g'+itnkey+'.jpg" alt="'+itnkey+'">');
            }
            //default state
            setCon('000',0);
        },
        outdoors:function (dt,tar) {
            var tmpDom = '';
            tmpDom += '<div class="infos-com infos-outdoors" id="infosOutdoors">';
            tmpDom += '<img class="bg" src="'+dt.bg+'" alt="'+dt.name+'">';
            tmpDom += '<div class="infos-outdoors-pics">';
            $.each(dt.pics,function (i,item) {
                tmpDom += '<img src="'+item+'" alt="'+i+'">';
            });
            tmpDom += '</div></div>';
            tar.html(tmpDom);
            var $area = $('#infosOutdoors');
            setTimeout(function () {
                $area.find('.infos-outdoors-pics').addClass('cur');
            },100);
        },
        cars:function (dt,tar) {
            var tmpDom = '';
            tmpDom += '<div class="infos-com infos-cars" id="infosCars">';
            tmpDom += '<img class="bg" src="'+dt.bg+'" alt="'+dt.name+'">';
            tmpDom += '<div class="para">'+dt.para+'</div>';
            tmpDom += '<div id="icSwp" class="swiper-container infos-cars-swp"><div class="swiper-wrapper">';
            $.each(dt.list,function (i,item) {
                tmpDom += '<div class="swiper-slide">';
                tmpDom += '<img class="pic" src="'+item.pic+'" alt="'+item.tit+'">';
                tmpDom += '<div class="insos-cars-tag"><p>'+item.tag+'</p></div>';
                tmpDom += '<div class="infos-cars-bot"><h5>'+item.tit+'</h5><div class="line"></div><div class="des">'+item.des+'</div></div>';
                tmpDom += '</div>';
            });
            tmpDom += '</div></div>';
            tmpDom += '</div>';
            tar.html(tmpDom);
            commonComponents.mouseScrollTips(tar);
            var $area = $('#infosCars');
            var mySwiper = new Swiper('#icSwp',{
                slidesPerView: 3,
                centeredSlides: true,
                mousewheel:true,
                grabCursor : true
            })
        }
    },
    infos:function (infoSource) {
        var _this=this,$infos = $('#infos'),tmpDom = '';
        function openInfo() {
            $infos.html(tmpDom);
            bindEvent();
            setTimeout(function () {
                $infos.addClass('cur')
            },50);
        }
        function closeInfo() {
            $infos.removeClass('cur');
            setTimeout(function () {
                $infos.html('');
            },300);
        }
        function showCon(tar) {
            _this.context.common(infoSource,tar);
            _this.context[tar](infoSource.list[tar],$('#infosCon'));
        }
        function createDom(mod) {
            if(typeof mod === 'undefined'){
                mod = 'map';
            }
            function buildDefault(dt,sel) {
                tmpDom = '';
                tmpDom += '<img class="bg" src="'+dt.bg+'">';
                tmpDom += '<div class="infos-main">';
                tmpDom += '<div id="infosCon" class="infos-con"></div>';
                tmpDom += '<header>';
                tmpDom += '<div class="infos-title" id="infosTitle">'+dt.list[sel].name+'</div>';
                tmpDom += '<nav>';
                $.each(dt.list,function (i,item) {
                    var activedStyle = '';
                    if(dt.list[sel].id === item.id){
                        activedStyle = 'cur ';
                    }
                    tmpDom += '<a class="'+activedStyle+'infos-nav'+item.id+' infosNav" data-tar="'+i+'"></a>';
                });
                tmpDom += '</nav>';
                tmpDom += '<a class="infos-arr infos-arr-l infosArr" data-type="prev"></a>';
                tmpDom += '<a class="infos-arr infos-arr-r infosArr" data-type="next"></a>';
                tmpDom += '</header>';
                tmpDom += '<footer><a class="i-btn-back btnInfoBack"></a></footer>';
                tmpDom += '</div>';
            }
            buildDefault(infoSource,mod);
        }
        function bindEvent() {
            var $nav = $('.infosNav');
            function setTab(idx) {
                var idxNav = $('.infosNav').eq(idx),tar = idxNav.attr('data-tar');
                $('.infosNav').removeClass('cur');
                idxNav.addClass('cur');
                showCon(tar);
            }
            function navEvent() {
                $nav.on('click',function () {
                    var $this = $(this),idx = $this.index();
                    yms.bgmAfterVideo();
                    setTab(idx);
                });
            }
            function arrEvent() {
                $('.infosArr').on('click',function () {
                    var $this = $(this),$type = $this.attr('data-type'),
                        idx = $('.infosNav.cur').index(),tarIdx;
                    if($type === 'next'){
                        tarIdx = idx+1;
                        if(tarIdx === 8){
                            tarIdx = 0;
                        }
                    }else if($type === 'prev'){
                        tarIdx = idx-1;
                        if(tarIdx < 0){
                            tarIdx = 7;
                        }
                    }
                    $infos.find('.infosNav').eq(tarIdx).trigger('click');
                });
            }
            navEvent();
            arrEvent();
        }
        $(document).on('click','.btnInfo',function () {
            var $this = $(this),btnMod = $this.attr('data-mod');
            if(typeof btnMod === 'undefined'){
                btnMod = 'map';
            }
            createDom(btnMod);
            openInfo();
            showCon(btnMod)
        });
        $(document).on('click','.btnInfoBack',function () {
            closeInfo();
            yms.bgmAfterVideo();
        });
    },
    init:function () {
        var _this = this;
        $.ajax({
            dataType:'script',
            url:'data/infos.data.js',
            success:function () {
                var infoSource = backInfoSource;
                _this.infos(infoSource);
            }
        });
    }
};
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
                pageFunc.pgTransit(dtTask.transit.video,function () {
                    pageFunc.pgMenu();
                });
            });
            pageAutoTimer = setTimeout(function () {
                //todo 3分钟后某些
                console.log('3分钟内不逮捕，播放结局视频，并获得奖杯成就')
            },3*60*1000);
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
        pageDom += '<video id="loopVideo" src="'+dtTask.bg+'" class="page_bg" autoplay loop muted></video>';
        pageDom += '<a class="btn-next btnNext">继续</a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnNext').on('click',function(){
                _this.task201();
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
                pageFunc.pgTransit(dtTask.transit.video,function () {
                    pageFunc.pgVersion();
                });
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
            _this.dialogChange(dgyMain,dtTask.dia.length,function () {
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

/*
global $,yms,pageConfig,preLoadPicsLists,Swiper,fullScreen,bkDatas,mapData,armsData,abilitiesData,gearData,targetData
 */
var pageFunc = {
	loadingFunc:function(loadState){
		var ld = '',$body = $('body'),thisPage = this,loadData = pageConfig.pages.loading;
    	ld += '<div id="loading"></div><div id="loadingAnim"><img src="'+loadData.logo1+'" alt="" class="loadingAnim-img-g"><div class="loadingAnim-img"><img src="'+loadData.logo2+'"></div><div class="loadingtxt"></div></div>';
    	ld += '<div id="closeLoading" class="closeLoading">';

    	ld += '<div class="txt">';
    	ld += '<h5>圣父提醒您</h5>';
    	ld += '<img src="'+loadData.ld+'" alt="farcry5">';
    	ld += '<p>全屏体验更加，你可以按<i>F11</i><b>退出全屏</b>，也可以随时按<i>F11</i><b>恢复全屏</b></p>';
    	ld += '<p><span>为了更好的观看体验，请使用<i>IE10及以上</i>或其他浏览器浏览专题。</span></p>';
    	ld += '</div>';

    	ld += '<div class="clearfix btngroup"><a class="closeno">继续</a></div>';
    	ld += '</div>';
    	if(loadState===true){
    		$body.append(ld);
    		$body.jpreLoader({
				splashVPos: "0",
				splashID: "#loadingAnim",
				showSplash: true,
				loaderVPos: '0%',
				autoClose: true
			}, function() {
				$('#closeLoading').show();
			});
			$('#closeLoading').find('.closeno').on('click',function(){
				fullScreen();
				$('#loading').fadeOut(300);
				$('#closeLoading').fadeOut(300);
                $('.volbtn').addClass('cur');
                pageConfig.userMute = false;
                yms.bgmSet(pageConfig.bgm.start);
				thisPage.pgStart();
			});
    	}else{
            $('.volbtn').addClass('cur');
            /*pageConfig.userMute = false;
            yms.bgmSet(pageConfig.bgm.start);*/
            pageFlow.task205();
            //pageFunc.pgStart();
    	}
        yms.preLoadImg(preLoadPicsLists.list1);
	},
    pgStart:function () {
        var pageDom = '',dataOrigin = pageConfig.pages.pgStart;
        pageDom += '<div class="page_con pgStart">';
        pageDom += '<video id="startVd" class="page_bg" src="'+dataOrigin.video+'"></video>';
        pageDom += '<div id="startDelay" class="start-cells">';
        pageDom += '<img src="'+dataOrigin.slogan+'" alt="slogan" class="slogan">';
        pageDom += '<a class="btn-start btnGo"></a>';
        pageDom += '<a class="btn-info btnInfo"></a>';
        pageDom += '</div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var vd = document.getElementById('startVd'),delayTimer;
            vd.play();
            vd.onended = function (ev) {
                vd.currentTime = 2;
                vd.play();
            };
            var $delay = $('#startDelay');
            delayTimer = setTimeout(function () {
                $delay.addClass('cur');
            },2200);

            commonComponents.othersArea($delay);

            dgyMain.find('.btnGo').on('click',function(){
                clearTimeout(delayTimer);
                pageFunc.pgTransit(dataOrigin.transit.video,function () {
                    pageFunc.pgMenu();
                });
            });
            //yms.preLoadImg(preLoadPicsLists.list2);
        }
        yms.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgMenu:function(){
        var pageDom = '',btnDom = '',introDom = '',dataOrigin = pageConfig.pages.pgMenu;

        $.each(dataOrigin.nav,function (i,item) {
            var isCur = '',initCur = '';
            if(item.open === true){
                isCur = 'opened';
            }
            if(i === 0){
                initCur = 'cur';
            }
            btnDom += '<a class="btn-sel btnSel '+isCur+'" data-idx="'+i+'"><i class="icon"></i>'+item.name+'</a>';
            introDom += '<div class="task-intro taskIntro taskIntro'+i+' '+initCur+'"><img src="'+item.tro+'" alt="'+item.name+'"></div>';
        });

        pageDom += '<div class="page_con pgMenu">';
        pageDom += '<img src="'+dataOrigin.bg+'" alt="pics" class="page_bg">';
        pageDom += '<div class="task-intro-wrap">';
        pageDom += introDom;
        pageDom += '</div>';

        pageDom += '<div class="btn-group">';
        pageDom += '<h5 class="tit"><i class="icon"></i>剧情任务</h5>';
        pageDom += '<div class="navs">';
        pageDom += btnDom;
        pageDom += '</div>';
        pageDom += '<a class="btn-replay btnReplay">重新开始</a>';
        pageDom += '</div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            yms.bgmSet(pageConfig.bgm.start);
            function setState(idx) {
                dataOrigin.nav[idx].open = true;
            }
            commonComponents.tabs(dgyMain.find('.btnSel'),dgyMain.find('.taskIntro'));
            dgyMain.find('.btnSel').on('click',function(){
                var $ts = $(this),idx=$ts.data('idx');
                setState(idx);
                pageFlow['task'+(idx+1)]();
            });
            dgyMain.find('.btnReplay').on('click',function(){
                pageFunc.pgStart();
            });
        }
        yms.chagePage(function(){
            stateStore.fixedNavShow = true;
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgVersion:function(){
        var pageDom = '',dataOrigin = pageConfig.pages.pgVersion;
        pageDom += '<div class="page_con pgVersion">';
        pageDom += '<img src="'+dataOrigin.bg+'" alt="pics" class="page_bg">';
        pageDom += '<div class="tabs">';

        pageDom += '<div class="tabs-con tabsCon"></div>';
        pageDom += '<div class="clearfix tabs-nav">';
        $.each(dataOrigin.tabs,function (i,item) {
            pageDom += '<a class="tabsNavBtn" data-num="'+item.id+'"><span>'+item.name+'</span></a>';
        });
        pageDom += '</div>';

        pageDom += '</div>';
        pageDom += '<a class="btn-default btn-next btnNext">结束</a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            var $con = dgyMain.find('.tabsCon');
            var setCon = {
                tab0:function (idx) {
                    var tabDom = '',dt = dataOrigin.tabs[idx];
                    tabDom += '<div class="tabs-con'+idx+'">';
                    tabDom += '<img src="'+dt.pic+'" alt="'+dt.name+'">';
                    $.each(dt.buy,function (i,item) {
                        tabDom += '<a class="btn-buy btn-buy'+i+'" target="_blank" href="'+item.url+'"></a>';
                    });
                    tabDom += '</div>';
                    $con.html(tabDom);
                },
                tab1:function (idx) {
                    var tabDom = '',dt = dataOrigin.tabs[idx];
                    tabDom += '<div class="tabs-con'+idx+'">';
                    tabDom += '<img class="st-bg" src="'+dt.pic+'" alt="'+dt.name+'">';
                    tabDom += '<div id="stSwp" class="swiper-container st-swp"><div class="swiper-wrapper">';
                    $.each(dt.swp,function (i,item) {
                        tabDom += '<div class="swiper-slide">';
                        tabDom += '<div class="st-video stVideo" id="stVideo'+i+'"></div>';
                        tabDom += '<a class="st-video-btn stVdBtn stVdBtn'+i+'" data-sk="'+i+'"><img src="'+item.video.poster+'" alt="'+item.name+'"></a>';
                        tabDom += '</div>';
                    });
                    tabDom += '</div></div>';
                    tabDom += '<div class="st-mask-top"></div>';
                    tabDom += '<div class="st-mask-bot"></div>';
                    tabDom += '</div>';
                    $con.html(tabDom);
                    var mySwiper = new Swiper('#stSwp',{
                        slidesPerView : 'auto',
                        centeredSlides : true,
                        mousewheel:true,
                        grabCursor : true
                    });
                    $con.find('.stVdBtn').on('click',function () {
                        var $ts = $(this),idx = $ts.data('sk'),tarVd = 'stVideo'+idx;
                        $con.find('.stVideo').html('');
                        $con.find('.stVdBtn').show();
                        $ts.hide();
                        mySwiper.slideTo(idx, 500, false);
                        commonComponents.player(tarVd,dt.swp[idx].video);
                    })
                },
                tab2:function (idx) {
                    var tabDom = '',dt = dataOrigin.tabs[idx];
                    tabDom += '<div class="tabs-con'+idx+'"><img src="'+dt.pic+'" alt=""></div>';
                    $con.html(tabDom);
                }
            };
            function chooseTab(num) {
                dgyMain.find('.tabsNavBtn').removeClass('cur').eq(num).addClass('cur');
                setCon['tab'+num](num);
            }
            dgyMain.find('.tabsNavBtn').on('click',function () {
                var $ts = $(this),idx = $ts.data('num');
                chooseTab(idx);
            });
            dgyMain.find('.btnNext').on('click',function(){
                pageFunc.pgEnd();
            });
            chooseTab(0);
        }
        yms.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
    pgEnd:function(){
        var pageDom = '',dataOrigin = pageConfig.pages.pgEnd;
        pageDom += '<div class="page_con pgEnd">';
        pageDom += '<video src="'+dataOrigin.video+'" class="page_bg" autoplay loop></video>';
        pageDom += '<div class="tit"></div>';
        pageDom += '<div class="end-editor">'+dataOrigin.edit+'</div>';
        pageDom += '<div class="end-zan"></div>';
        pageDom += '<a target="_blank" href="'+gloCfg.url.channel+'" class="btn-default-big end-btn-back">往期回顾</a>';
        pageDom += '<a class="btn-default-big end-btn-comm btnComm">玩家评论</a>';
        pageDom += '<div class="end-bd"></div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnComm').on('click',function(){
                pageFunc.commPage();
            });
            var $zan = dgyMain.find('.end-zan'),$bd = dgyMain.find('.end-bd');
            commonComponents.othersArea($zan,{
                comm:false
            });
            commonComponents.baiduShare($bd,'end-baidu-icons');
        }
        yms.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
    },
	pgDemo:function(){
        var pageDom = '',dataOrigin = pageConfig.pages.pgDemo;
        pageDom += '<div class="page_con pgDemo">';
        pageDom += '<img src="'+dataOrigin.bg+'" alt="pics" class="page_bg">';
        pageDom += '<a class="btn-default btn-next btnNext"></a>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            dgyMain.find('.btnNext').on('click',function(){
                pageFunc.commPage();
            });
        }
        yms.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });
	},
	commPage:function(){
		var pageDom = '',dataOrigin = pageConfig.pages.pgComm;

		function commentAdd(){
			var doc = document,
				s = doc.createElement('script'),
				h = doc.getElementsByTagName('head')[0] || doc.head || doc.documentElement;
			s.type = 'text/javascript';
			s.charset = 'utf-8';
			s.src = 'http://j.gamersky.com/web2015/comment/js/commentconfig.js';
			h.insertBefore(s, h.firstChild);
			window.SCS_NO_IFRAME = true;
		}

		pageDom += '<div class="page_con page_comm">';
		pageDom += '<img src="'+dataOrigin.bg+'" alt="replace" class="comm_bg">';
		pageDom += '<div class="comm hei"><div class="cont">';
		pageDom += '<div id="SOHUCS" sid="'+gloCfg.countid+'"></div>';
		pageDom += '</div></div>';
        pageDom += '<a class="closeComm btn-comm-close"></a>';
		pageDom += '</div>';

		var dgyMain = $('#dgyComm');
        pageConfig.isCommOpen = true;
		if(pageConfig.addedComment === false){
			dgyMain.addClass('cur').html(pageDom);
			commentAdd();
			pageConfig.addedComment = true;
		}else{
			dgyMain.addClass('cur');
            $("#SOHUCS").GetComment();
		}
		$('.page_comm').on('click','.cmt-commentbtn',function () {
            dgyMain.find('.comm').animate({scrollTop:0},200);
        });
        dgyMain.find('.closeComm').on('click',function(){
            dgyMain.removeClass('cur');
            pageConfig.isCommOpen = false;
            $('.page_comm').off();
        });
	},
    pgTransit:function (vd,callback) {
        var pageDom = '';
        pageDom += '<div class="page_con pg-transit pgTransit">';
        pageDom += '<div class="pg-transit-video-wrap"><div id="videoTransit" class="pg-transit-video"></div></div>';
        pageDom += '</div>';

        var dgyMain = $('#dgyMain');
        function thisFunc(){
            commonComponents.player('videoTransit',vd,function () {
                if(typeof callback === 'function'){
                    callback();
                }
            });
        }
        yms.chagePage(function(){
            dgyMain.html(pageDom).addClass('cur');
            thisFunc();
        });

    },
	render:function(){
		var pf = this;
		pf.loadingFunc(true);
		yms.fixedNav();
        bindGlobal.init();
	}
};
pageFunc.render();
