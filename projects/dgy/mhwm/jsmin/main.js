var pgConfig = {
    userMute:false,
    isPick:false,
    isHunted:false,
    pages:{
        pgBegin:{
            bg:'http://image.gamersky.com/zqimg/mhw/wap/bg-begin.jpg'
        },
        pgEnd:{
            bg:'http://image.gamersky.com/zqimg/mhw/wap/bg-end.jpg',
            para:'<p><b>专题策划：</b>观海、天增弟弟、Mirror明镜</p><p><b>视觉设计：</b>Drakedooog、MrrrTian</p>'
        },
        pgStarBase:{
            bg:'http://image.gamersky.com/zqimg/mhw/wap/bg-room.jpg',
            pbg:'http://image.gamersky.com/zqimg/mhw/wap/bg-starbase.jpg'
        },
        pgMeeting:{
            bg:'http://image.gamersky.com/zqimg/mhw/wap/bg-room.jpg',
            pbg:'http://image.gamersky.com/zqimg/mhw/wap/bg-meeting.jpg',
            txt:'<p>\t每个聚会区域最多容纳16人同时聚集。</p><p>你可以和来自世界各地的玩家组成最多4人的队伍展开游戏。</p><p>在这儿不但可以共同出发执行任务，甚至还能相互比拼腕力。</p>'
        },
        pgBar:{
            bg:'http://image.gamersky.com/zqimg/mhw/wap/bg-room.jpg',
            pbg:'http://image.gamersky.com/zqimg/mhw/wap/bg-bar.jpg',
            txt:'<p>玩家可以在柜台处选择任务，用公开匹配或者是私人战局与人组队战斗，组队依旧是4人，而集会所区域则能容纳16名玩家使用。游戏还包含有独特的公会（猎团）系统，多达50人可参与其中，玩家可以与朋友进行各种社交活动。</p>'
        },
        pgMyself:{
            bg:'http://image.gamersky.com/zqimg/mhw/wap/bg-room.jpg',
            pbg:'http://image.gamersky.com/zqimg/mhw/wap/bg-myself.jpg',
            txt:'<p>在自己的房间中有玩家熟悉的道具箱、随行猫管理等功能。此外，玩家可以在自己的房间中饲养捕捉的各种环境生物，随着游戏的进行，房间的类型和等级还会有所变化，房间功能将逐渐扩展开来，可以放入房间中的环境生物数量和种类也有所不同。</p>',
            pop3:[
                'http://image.gamersky.com/zqimg/mhw/wap/msc1.png',
                'http://image.gamersky.com/zqimg/mhw/wap/msc2.png',
                'http://image.gamersky.com/zqimg/mhw/wap/msc3.png',
                'http://image.gamersky.com/zqimg/mhw/wap/msc4.png'
            ]
        },
        pgWorking:{
            bg:'http://image.gamersky.com/zqimg/mhw/wap/bg-room.jpg',
            pbg:'http://image.gamersky.com/zqimg/mhw/wap/bg-working.jpg',
            txt:'<p>与装备有关的机能都能一手包办的工房。对于前往进行严苛调查的猎人来说，是非常重要的设施。负责武器和防具的强化、生产，甚至把一部分武器的强化返回原来的样子。</p>'
        },
        pgMap:{
            bg:'http://image.gamersky.com/zqimg/mhw/wap/bg-map.jpg',
            bgp:'http://image.gamersky.com/zqimg/mhw/wap/maps.png'
        },
        pgGamerVer:{
            bg:'http://image.gamersky.com/zqimg/mhw/wap/bg-gmvr.jpg',
            des:'请购买游戏，获得完整狩猎体验！',
            list:[
                {
                    tit:'标准版',
                    buy:'https://store.playstation.com/#!/zh-hant-hk/%e9%81%8a%e6%88%b2/monster-hunter-world-pre-order/cid=HP0102-CUSA09554_00-ASIAPLACEHOLDER0',
                    pic:'http://image.gamersky.com/zqimg/mhw/wap/gmvr1.png',
                    lis:['<p>《怪物猎人：世界》游戏本体</p>']
                },
                {
                    tit:'豪华版',
                    buy:'https://store.playstation.com/#!/zh-hant-hk/%e9%81%8a%e6%88%b2/monster-hunter-world-digital-deluxe-edition-pre-order/cid=HP0102-CUSA09554_00-ASIAPLACEHOLDER1',
                    pic:'http://image.gamersky.com/zqimg/mhw/wap/gmvr2.png',
                    lis:['<p>《怪物猎人：世界》游戏本体</p>','<p>豪华组合<span>外观装备 「铠武者系列」</span><span>3种追加手势「正坐」「投射飞镖」「强推」</span><span>2种追加奖章套件「MH歴代角色人物套件」「全熟肉吉祥物套件」</span><span>追加涂鸭 「龙」</span><span>追加髮型 「冲天炮」</span></p>']
                },
                {
                    tit:'典藏版',
                    buy:'https://www.gamestop.com/browse?nav=16k-Monster+Hunter+World',
                    pic:'http://image.gamersky.com/zqimg/mhw/wap/gmvr3.png',
                    lis:['<p>《怪物猎人：世界》游戏本体</p>','<p>豪华组合<span>外观装备 「铠武者系列」</span><span>3种追加手势「正坐」「投射飞镖」「强推」</span><span>2种追加奖章套件「MH歴代角色人物套件」「全熟肉吉祥物套件」</span><span>追加涂鸭 「龙」</span><span>追加髮型 「冲天炮」</span></p>','<p>原装模型<span>(尺寸: 约W 140mm x D 170mm x H 125mm)</span></p>','<p>《怪物猎人：世界》特别原声<span>(10 首)</span></p>','<p>《怪物猎人：世界》画册「Monster Designs」<span>(尺寸: W 216mm x H 279mm, 32页精装版)</span></p>']
                }
            ]
        },
        hd:{
            monster:{
                name:'魔物',
                con:[
                    {
                        group:'mp1',
                        hunted:false,
                        tit:'贼龙',
                        des:'<p>是率领凶豺龙群族的领导。</p><p>食欲旺盛，在空腹的时候会变得很暴躁。</p><p>整个吞下捕杀的猎物的模样是最精彩的部分</p>',
                        vd:'9d77c0f354',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp1-zl.png',
                        gifpic:'https://wx3.sinaimg.cn/mw690/005Ngkoqly1fnu4ughy8dg30dm07snpk.gif'
                    },
                    {
                        group:'mp1',
                        hunted:false,
                        tit:'吐毒龙',
                        des:'<p>体内有毒液的鸟龙种。</p><p>会吞吃飞散核桃之类的植物蓄积在嘴里或尾巴，再混合毒液喷出强力的剧毒吐息。</p>',
                        vd:'a1364a4702',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp1-tdl.png',
                        gifpic:'https://wx3.sinaimg.cn/mw690/005Ngkoqly1fnu4u1vxejg30dm07s1kz.gif'
                    },
                    {
                        group:'mp1',
                        hunted:false,
                        tit:'飞雷龙',
                        des:'<p>栖息在树上，在林木间飞舞活动的牙龙种。</p><p>似乎会藉由移动时摩擦林木与地面，使体毛能够蓄积静电。</p>',
                        vd:'00b331bea3',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp1-fll.png',
                        gifpic:'https://wx3.sinaimg.cn/mw690/005Ngkoqly1fnu4uf2ratg30dm07su12.gif'
                    },
                    {
                        group:'mp1',
                        hunted:false,
                        tit:'蛮颚龙',
                        des:'<p>对这个捕食对象丰富的森林虎视眈眈。</p><p>非常好战的他对其它魔物是毫不犹豫地袭击。</p>',
                        vd:'22e44e5d27',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp1-mel.png',
                        gifpic:'https://wx4.sinaimg.cn/mw690/005Ngkoqly1fnu4ug7grgg30dm07s7wn.gif'
                    },
                    {
                        group:'mp1',
                        hunted:false,
                        tit:'火龙',
                        des:'<p>整个古树森林生态系统最顶尖的魔物。</p><p>可怕的飞龙会利用锐利的毒爪和火暖燥的呼吸降落在入侵者身上。</p>',
                        vd:'944f2f63a5',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp1-xhl.png',
                        gifpic:'https://wx3.sinaimg.cn/mw690/005Ngkoqly1fnu4ubq7clg30dm07sx6s.gif'
                    },
                    {
                        group:'mp2',
                        hunted:false,
                        tit:'搔鸟',
                        des:'<p>这种怪物擅于以它们有力的前脚抓住物件。</p><p>因此可于「大蚁塚荒地」和「古树森林」内偷盗怪物蛋。</p><p>它们亦擅于抓住大石并置于身前以保护自己。</p>',
                        vd:'37ebfe6f72',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp2-sn.png',
                        gifpic:'https://wx3.sinaimg.cn/mw690/005Ngkoqly1fnu4uacqjug30dm07su10.gif'
                    },
                    {
                        group:'mp2',
                        hunted:false,
                        tit:'土砂龙',
                        des:'<p>这种怪物经常一边漫步一边寻找蚂蚁，它会用泥浆标记自己的领地。</p><p>一旦它们的领地受到侵犯，就会迅速地攻击破坏者。</p>',
                        vd:'22805eeab1',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp2-tsl.png',
                        gifpic:'https://wx4.sinaimg.cn/mw690/005Ngkoqly1fnu4ubmwq2g30dm07sx6s.gif'
                    },
                    {
                        group:'mp2',
                        hunted:false,
                        tit:'泥鱼龙',
                        des:'<p>于「大蚁塚荒地」沼泽区中居住的大型鱼龙。</p><p>会利用泥浆捉拿猎物、保护自己，有时会对入侵其领地的怪物进行攻击。</p>',
                        vd:'a944276e16',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp2-nyl.png',
                        gifpic:'https://wx2.sinaimg.cn/mw690/005Ngkoqly1fnu4uaux0qg30dm07sx6s.gif'
                    },
                    {
                        group:'mp2',
                        hunted:false,
                        tit:'雌火龙',
                        des:'<p>主要在地上进行狩猎，别称为“陆之女王”。</p><p>曾被目击到火龙成双成对进行狩猎的案例。它会运用优秀的脚力和含毒液的尾巴收拾猎物。</p>',
                        vd:'86c25dc655',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp2-chl.png',
                        gifpic:'https://wx2.sinaimg.cn/mw690/005Ngkoqly1fnu4u3w0eyg30dm07shdv.gif'
                    },
                    {
                        group:'mp2',
                        hunted:false,
                        tit:'角龙',
                        des:'<p>大蚁冢荒地之主。</p><p>有着强烈的领土意识以及暴君般的攻击性。</p><p>还有着把地面上发出大声响的猎物拉进地下领土的习性。</p>',
                        vd:'f1cc1632a8',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp2-jl.png',
                        gifpic:'https://wx4.sinaimg.cn/mw690/005Ngkoqly1fnu4u78dlug30dm07s7wk.gif'
                    },
                    {
                        role:'enter',
                        group:'mp2',
                        hunted:false,
                        tit:'灭尽龙',
                        des:'<p>灭尽龙是一只古龙种，古龙种便是威胁性大的代名词，同时也表明了它对麻痹陷阱免疫，不过武器的异常属性例如麻痹锤还是有用的。</p>',
                        bigpic:'http://image.gamersky.com/zqimg/mhw/wap/mp2-mjl.png',
                        gifpic:'https://wx4.sinaimg.cn/mw690/005Ngkoqly1fnu4jr7bmag30dm07su12.gif'
                    },
                    {
                        group:'mp3',
                        hunted:false,
                        tit:'眩鸟',
                        des:'<p>一发现猎物或天敌，发光器官就会张大发出耀眼的闪光制造破绽。</p><p>会活用脚力发动攻击解决猎物。</p>',
                        vd:'893123dca9',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp3-xn.png',
                        gifpic:'https://wx4.sinaimg.cn/mw690/005Ngkoqly1fnu4jbl2ylg30dm07s7wk.gif'
                    },
                    {
                        group:'mp3',
                        hunted:false,
                        tit:'浮空龙',
                        des:'<p>以陆珊瑚的卵为主要食物的飞龙种。</p><p>能在体内蓄积空气，再喷出气流进行空中移动，同时还会利用坚硬的尾巴施展强力攻击。</p>',
                        vd:'ef90fd52b6',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp3-fkl.png',
                        gifpic:'https://wx1.sinaimg.cn/mw690/005Ngkoqly1fnu4jmn6c6g30dm07snph.gif'
                    },
                    {
                        group:'mp3',
                        hunted:false,
                        tit:'风漂龙',
                        des:'<p>以芳翼龙群为捕食对象，在狙击猎物时会全身放出冷气，令其行动迟缓后进行狩猎。</p>',
                        vd:'f5def39060',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp3-fpl.png',
                        gifpic:'https://wx1.sinaimg.cn/mw690/005Ngkoqly1fnu4k3baybg30dm07snpi.gif'
                    },
                    {
                        group:'mp4',
                        hunted:false,
                        tit:'痹贼龙',
                        des:'<p>受到陆珊瑚台地掉下的怪物尸肉所吸引而在瘴气谷中徘徊的怪物，在狩猎时会运用它有着麻痹毒性的大牙。</p>',
                        vd:'80cf2eec17',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp4-bzl.png',
                        gifpic:'https://wx3.sinaimg.cn/mw690/005Ngkoqly1fnu4jmloojg30dm07snph.gif'
                    },
                    {
                        group:'mp4',
                        hunted:false,
                        tit:'骨锤龙',
                        des:'<p>以瘴气谷中的怪物尸体为食的兽龙种，尸骨缠绕其全身。</p><p>有人曾目击到它会把身体蜷曲起来，通过转动身体快速移动或是进行攻击。</p>',
                        vd:'457a41bf04',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp4-gcl.png',
                        gifpic:'https://wx4.sinaimg.cn/mw690/005Ngkoqly1fnu4jqc12dg30dm07sb2e.gif'
                    },
                    {
                        group:'mp4',
                        hunted:false,
                        tit:'惨爪龙',
                        des:'<p>在瘴气谷中徘徊寻觅尸体的可怖怪物。</p><p>它具有非常强的攻击性，不论是人或是怪物都可能成为它的一顿美餐。</p>',
                        vd:'01ac5d8f9c',
                        bigpic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/monster/mp4-czl.png',
                        gifpic:'https://wx4.sinaimg.cn/mw690/005Ngkoqly1fnu4jphondg30dm07s4qu.gif'
                    },
                    {
                        group:'mpother',
                        hunted:false,
                        tit:'炎王龙',
                        des:'<p>火炎缠身的凶暴古龙，能够喷吐灼热的吐息。</p><p>脾气凶暴，敢于正面跟它对峙的人无一例外都会葬身火海。</p>',
                        pic:'http://image.gamersky.com/zqimg/mhw/wap/mpother-ylw.png',
                        gifpic:''
                    },
                    {
                        group:'mpother',
                        hunted:false,
                        tit:'钢龙',
                        des:'<p>能够呼唤风暴，不让任何人接近自己身边的古龙。</p><p>拥有相当硬的金属质地外壳覆盖全身。</p>',
                        pic:'http://image.gamersky.com/zqimg/mhw/wap/mpother-gl.png',
                        gifpic:''
                    },
                    {
                        group:'mpother',
                        hunted:false,
                        tit:'岩贼龙',
                        des:'<p>以岩石为主食的怪物。通过混合唾液的成份，把具爆炸性的岩石储存于口内，然后吐出，用作防范天敌保护自己。</p>',
                        pic:'http://image.gamersky.com/zqimg/mhw/wap/mpother-yzl.png',
                        gifpic:''
                    }
                ]
            },
            map:{
                name:'地图',
                con:[
                    {
                        group:'mp1',
                        gone:false,
                        tit:'古树森林',
                        des:'<p>一排排地生长的古树串联成为一片广阔的「古树森林」，高耸入云。这些古树形成一个生态系统，涵盖着森林内所有生物。</p>',
                        pic:'http://image.gamersky.com/zqimg/mhw/wap/map1.jpg'
                    },
                    {
                        group:'mp2',
                        gone:false,
                        tit:'大蚁塚荒地',
                        des:'<p>这片荒地有着广大的干旱地区，但也有着生长繁盛古树的沼泽水源。大量的大蚁冢遍布整个沙地，水域中则生长着各种颜色鲜艳的植物。</p>',
                        pic:'http://image.gamersky.com/zqimg/mhw/wap/map2.jpg'
                    },
                    {
                        group:'mp3',
                        gone:false,
                        tit:'陆珊瑚台地',
                        des:'<p>既似陆又似海、高低差巨大的高原，出产陆珊瑚之卵，卵会随着涌升流随风飘出高原、散播向新大陆的其他区域，也成了某些生物的主要食物来源。</p>',
                        pic:'http://image.gamersky.com/zqimg/mhw/wap/map3.jpg'
                    },
                    {
                        group:'mp4',
                        tit:'瘴气之谷',
                        gone:false,
                        des:'<p>瘴气谷位于陆珊瑚台地的下方。腐烂的怪物骨头与血肉形成了一层特殊的地表，这里四处飘散的以有机物为食的细菌群，它们就是“瘴气”的真面目。</p>',
                        pic:'http://image.gamersky.com/zqimg/mhw/wap/map4.jpg'
                    }
                ]
            },
            other:{
                name:'基地',
                con:[
                    {
                        tit:'星辰',
                        des:'<p>可以说是生活在新大陆所有调查员的「家」。负责调查的研究区域；支撑调查行动的物流、工房区域；猎人们匯集的集会区域等等，有许多不同的区域。在四十年前由第一期调查队建立。</p>',
                        pic:'http://image.gamersky.com/zqimg/mhw/wap/other1.jpg'
                    },
                    {
                        tit:'集会区域',
                        des:'<p>每个聚会区域最多容纳16人同时聚集。你可以和来自世界各地的玩家组成最多4人的队伍展开游戏。在这儿不但可以共同出发执行任务，甚至还能相互比拼腕力。</p>',
                        pic:'http://image.gamersky.com/zqimg/mhw/wap/other2.jpg'
                    },
                    {
                        tit:'加工屋',
                        des:'<p>与装备有关的机能都能一手包办的工房。对于前往进行严苛调查的猎人来说，是非常重要的设施。负责武器和防具的强化、生产，甚至把一部分武器的强化返回原来的样子。</p>',
                        pic:'http://image.gamersky.com/zqimg/mhw/wap/other3.jpg'
                    },
                    {
                        tit:'自己的房间',
                        des:'<p>在自己的房间中有玩家熟悉的道具箱、随行猫管理等功能。此外，玩家可以在自己的房间中饲养捕捉的各种环境生物。</p>',
                        pic:'http://image.gamersky.com/zqimg/mhw/wap/other4.jpg'
                    }
                ]
            },
            weapon:{
                name:'武器',
                con:[
                    {
                        tit:'操虫棍 ',
                        des:'<p>可从空中开始发动立体攻击，能够操纵猎虫，采取提炼物来强化自己。</p>',
                        vd:'083f48fb3d',
                        pic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/wp01.png'
                    },
                    {
                        tit:'盾斧',
                        des:'<p>拥有高机动性的利剑和威力大的斧两种武器模式，消耗累计在药瓶的能量可提高火力。</p>',
                        vd:'fb50bbd5fe',
                        pic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/wp02.png'
                    },
                    {
                        tit:'铳枪',
                        des:'<p>附加了炮击功能的攻击武器，其魅力是各种各样的炮击系动作。</p>',
                        vd:'77bce8f16f',
                        pic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/wp03.png'
                    },
                    {
                        tit:'大锤',
                        des:'<p>结合破坏力和机动性的重击武器，以攻击头部让怪物昏厥为目标，蓄力的一击很强大。</p>',
                        vd:'3689ace269',
                        pic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/wp04.png'
                    },
                    {
                        tit:'大剑',
                        des:'<p>挥动和移动虽然缓慢，但攻击力却很高；“蓄能斩”拥有全部武器中最高级别的威力。</p>',
                        vd:'189a93810a',
                        pic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/wp05.png'
                    },
                    {
                        tit:'弓',
                        des:'<p>可以蓄力，进行各种射击的中距离武器。填装各种药瓶在箭矢上，可发挥丰富的特殊效果。</p>',
                        vd:'3d98577bbc',
                        pic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/wp06.png'
                    },
                    {
                        tit:'片手剑',
                        des:'<p>特点是灵活与无间隙的攻击，拔刀时也可以使用物品，适合狩猎时使用各种各样的物品。</p>',
                        vd:'48ef0a6fe7',
                        pic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/wp07.png'
                    },
                    {
                        tit:'轻弩',
                        des:'<p>以快速射击和回避为特色的远距离武器，可使用特殊状态系列的子弹（如起爆龙弹），善于支援全体成员。</p>',
                        vd:'eed9834baa',
                        pic:'http://image.gamersky.com/zqimg/mhw/wap/wp08.png'
                    },
                    {
                        tit:'狩猎笛',
                        des:'<p>长距离，易于操作的重击武器，演奏的话，可以给自己和队友带来各种各样的效果。</p>',
                        vd:'43110bc691',
                        pic:'http://image.gamersky.com/zqimg/mhw/wap/wp09.png'
                    },
                    {
                        tit:'双剑',
                        des:'<p>擅长于怒涛般的连续攻击，“鬼人化”虽消耗体力却容许进一步发动连续攻击。</p>',
                        vd:'a699b5ec23',
                        pic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/wp10.png'
                    },
                    {
                        tit:'太刀',
                        des:'<p>轻盈的动作、连续攻击是其魅力所在，可利用“气刃斩”提高攻击力。</p>',
                        vd:'6373bb2d61',
                        pic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/wp11.png'
                    },
                    {
                        tit:'斩击斧',
                        des:'<p>以斧和剑两种模式行动的武器，剑模式的“属性解放突刺”很强大。用接触距离长的“斧模式”来牵制，用攻击速度快的“剑模式”来猛攻。</p>',
                        vd:'1f193cdb57',
                        pic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/wp12.png'
                    },
                    {
                        tit:'长枪',
                        des:'<p>无间隙突击和顶级的抵御功能，以保护系的动作来确保战斗中自身的安全。</p>',
                        vd:'a151e68b88',
                        pic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/wp13.png'
                    },
                    {
                        tit:'重弩',
                        des:'<p>可发射强大威力子弹的远距离武器，“机关龙弹”、“狙击龙弹”等，可填装强大的特殊子弹。</p>',
                        vd:'1e76ee48e2',
                        pic:'http://image.gamersky.com/zqimg/mhw/wap/wp14.png'
                    }
                ]
            },
            npc:{
                name:'NPC',
                con:[
                    {
                        tit:'柜台小姐',
                        des:'<p>她是整理情报的专家“编辑者”。会和猎人一起行动，并且整理内容量庞大的调查内容。会和玩家一起行动，有如搭档的存在。</p>',
                        pic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/npc01s.jpg'
                    },
                    {
                        tit:'总司令',
                        des:'<p>他是负责指挥调查团的人物，也是在四十年前踏上新大陆的第一期调查团成员之一，以冷静的指挥，有时又会提出大胆计策来引导调查团。深受调查团员信任。</p>',
                        pic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/npc02s.jpg'
                    },
                    {
                        tit:'调查班领队',
                        des:'<p>负责领导在狩猎场进行实地调查的调查班，领袖风范十足的青年猎人。是总司令的孙子，也是调查团中唯一生在新大陆长在新大陆的成员。作为活在新大陆的前辈，会传授给玩家各种知识。</p>',
                        pic:'http://img7.gamersky.com/zqimg/dgy/mhw/pc/npc03s.jpg'
                    }
                ]
            }
        }
    }
};
(function ($) {
    var pageTimer,canChangePage = true;
	var gs = {
	    setSize:function(){
	        var ww = $(window).width(),
                wh = $(window).height(),
                remBase,
                $main = $('#main'),$comment = $('#pageComment');
	        if(ww>wh){
                remBase = wh;
                $main.css({
                    width:ww+'px',
                    height:wh+'px',
                    transform:''
                });
                $comment.css({
                    width:wh+'px',
                    height:ww+'px',
                    transform:'rotate(-90deg) translate(-100%,0)'
                });
            }else{
                remBase = ww;
                $main.css({
                    width:wh+'px',
                    height:ww+'px',
                    transform:'rotate(90deg) translate(0,-100%)'
                });
                $comment.css({
                    width:ww+'px',
                    height:wh+'px',
                    transform:'rotate(-90deg) translate(-100%,0)'
                });
            }
            $('html').css('font-size',remBase/7.2+'px');
        },
        bgm:function () {
	        var bgm = document.getElementById('bgm');
	        if(pgConfig.userMute === false){
                $('.volBtn').removeClass('volPause');
                bgm.play();
            }else{
                $('.volBtn').addClass('volPause');
                bgm.pause();
            }
            $(window).on({
                'blur':function(){
                    bgm.pause();
                },
                'focus':function(){
                    if(pgConfig.userMute === false){
                        bgm.play();
                    }
                }
            });
            document.addEventListener('visibilitychange', function() {
                var isHidden = document.hidden;
                if (isHidden) {
                    bgm.pause();
                } else {
                    if(pgConfig.userMute === false){
                        bgm.play();
                    }
                }
            });
        },
        bgmClk:function () {
	        $('.volBtn').on('tap',function () {
	            pgConfig.userMute === true?pgConfig.userMute = false:pgConfig.userMute = true;
                var bgm = document.getElementById('bgm');
                if(pgConfig.userMute === false){
                    $('.volBtn').removeClass('volPause');
                    bgm.play();
                }else{
                    $('.volBtn').addClass('volPause');
                    bgm.pause();
                }
            });
        },
        pgChange:function (callback) {
	        if(canChangePage === true){
                canChangePage = false;
                clearTimeout(pageTimer);
                $('#pages').removeClass('cur');
                function pageAfter() {
                    canChangePage = true;
                    if(typeof callback === 'function'){
                        $('#pages').addClass('cur');
                        callback&&callback();
                        gs.navEvent();
                    }
                }
                pageTimer = setTimeout(function () {
                    pageAfter()
                },500);
            }

        },
        nav:function () {
	        var $nav = $('#navBtn'),navClked = false;
            var navPop = '';
            navPop += '<div class="nav-pop navPop" id="navPop"><img class="nav-bg" src="http://image.gamersky.com/zqimg/mhw/wap/nav-bg.jpg" alt="bg"><div class="fma-box">';

            navPop += '<div class="fma-row">';
            navPop += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgBegin">首页</a></div>';
            navPop += '</div>';

            navPop += '<div class="fma-row">';
            navPop += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgStarBase">星辰基地</a></div>';
            navPop += '<div class="fma-lev2">';
            navPop += '<a class="fixBtn" data-pg="pgMeeting">集会区域</a><span>/</span>';
            navPop += '<a class="fixBtn" data-pg="pgWorking">加工屋</a><span>/</span>';
            navPop += '<a class="fixBtn" data-pg="pgMyself">自己的房间</a>';
            navPop += '</div>';
            navPop += '</div>';

            navPop += '<div class="fma-row">';
            navPop += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgMap">世界地图</a></div>';
            navPop += '<div class="fma-lev2">';
            navPop += '<a class="fixBtn fixBtnMaps" data-pg="pgmp1" data-mp="0">古树森林</a><span>/</span>';
            navPop += '<a class="fixBtn fixBtnMaps" data-pg="pgmp3" data-mp="2">陆珊瑚台地</a><span>/</span>';
            navPop += '<a class="fixBtn fixBtnMaps" data-pg="pgmp4" data-mp="3">瘴气之谷</a><span>/</span>';
            navPop += '<a class="fixBtn fixBtnMaps" data-pg="pgmp2" data-mp="1">大蚁塚荒地</a>';
            navPop += '</div>';
            navPop += '</div>';

            navPop += '<div class="fma-row">';
            navPop += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgGamerVer">游戏版本</a></div>';
            navPop += '</div>';

            navPop += '<div class="fma-row">';
            navPop += '<i></i><div class="fma-lev1"><a class="fixBtn" data-pg="pgEnd">制作人员</a></div>';
            navPop += '</div>';

            navPop += '<div class="fma-row">';
            navPop += '<div class="fma-lev1"><a class="fixBtn-comm">评论</a></div>';
            navPop += '</div>';
            
            navPop += '</div></div>';
            $('#main').append(navPop);
            var $navPop = $('#navPop');
            $nav.on('tap',function () {
                if(navClked === false){
                    navClked = true;
                    $nav.addClass('cur');
                    $navPop.addClass('cur');
                }else{
                    navClked = false;
                    $nav.removeClass('cur');
                    $navPop.removeClass('cur');
                }
            });
            $navPop.find('.fixBtn-comm').on('tap',function () {
                gs.openComment();
            });
            var clkOver = true;
            $('.fixBtn').on('tap',function () {
                var $this = $(this),pg = $this.data('pg');
                if($this.hasClass('cur') === false && clkOver === true){
                    clkOver = false;
                    navClked = false;
                    $nav.removeClass('cur');
                    $navPop.removeClass('cur');
                    setTimeout(function () {
                        clkOver = true;
                        gs[pg]();
                    },250);
                }
            })
        },
        navEvent:function(){
	        $('.fixBtn').removeClass('cur').each(function () {
                var $this = $(this),pg = $this.data('pg');
                if($('.page-cells').hasClass(pg) === true){
                    $this.addClass('cur')
                }
            })
        },
        delayLoad:function () {
            var gsfun = this;
            gsfun.bgm();
            gsfun.bgmClk();
            gsfun.nav();
            gsfun.hdbBtn();
        },
        hdbBtn:function () {
	        var $hdb = $('#handBookBtn'),
                $page = $('#pages');
            $hdb.addClass('cur').on('tap',function () {
                $hdb.removeClass('cur');
                gs.showHDbook($page);
            });
        },
        showHDbook:function (tar,def,navclk) {
            var hdDom = '',hdData = pgConfig.pages.hd,pickSty = '';
            hdDom += '<div class="hdb-bg hdbMain"><div class="hdb-area">';
            hdDom += '<div class="hdb-con">';
            if(navclk === false){
                pickSty = ' pick-open';
            }
            hdDom += '</div>';
            hdDom += '<div class="hdbNav">';
            hdDom += '<a class="hdbClose">关闭</a>';
            hdDom += '<div class="hdbNavBtns">';
            hdDom += '<a class="hdbNavBtn" data-sel="map">地图</a>';
            hdDom += '<a class="hdbNavBtn" data-sel="weapon">武器</a>';
            hdDom += '<a class="hdbNavBtn" data-sel="monster">魔物</a>';
            hdDom += '<a class="hdbNavBtn" data-sel="other">基地</a>';
            hdDom += '<a class="hdbNavBtn" data-sel="npc">NPC</a>';
            hdDom += '</div></div>';
            hdDom += '</div></div>';
            tar.append(hdDom);
            $('#handBookBtn').removeClass('cur');
            setTimeout(function () {
                tar.find('.hdbMain').addClass('cur');
            },50);
            tar.on('tap','.hdbClose',function () {
                $('#handBookBtn').addClass('cur');
                if($(this).hasClass('btnPick')){
                    pgConfig.isPick = true;
                    $('.btn-pick').addClass('cur');
                }
                tar.find('.hdbMain').removeClass('cur');
                setTimeout(function () {
                    tar.find('.hdbMain').remove();
                },250);
            });
            function insterMost(con,sel,sty) {
                var inDom = '',popsty = '';
                if(sty){
                    popsty = sty;
                }
                inDom += '<div class="swiper-container hd-swp hdSwp"><div class="swiper-wrapper">';
                $.each(hdData[sel].con,function (i,item) {
                    var picsrc = item.pic;
                    if(typeof picsrc === 'undefined'){
                        picsrc = item.bigpic;
                    }
                    inDom += '<div class="swiper-slide">';
                    inDom += '<div class="pic-wrap"><img src="'+picsrc+'" alt="'+item.tit+'"></div>';
                    inDom += '<div class="tit">'+item.tit+'</div>';
                    inDom += '<div class="des">'+item.des+'</div>';
                    inDom += '</div>';
                });
                inDom += '</div></div>';
                inDom += '<a class="hd-arr hd-arr-l"></a>';
                inDom += '<a class="hd-arr hd-arr-r"></a>';
                con.html(inDom).removeClass().addClass('hdb-con hdb-most '+popsty);
                var hdSwp = new Swiper(con.find('.hdSwp'),{
                    effect : 'flip',
                    onlyExternal:true,
                    nextButton: con.find('.hd-arr-r'),
                    prevButton: con.find('.hd-arr-l')
                });
            }
            function insterWeapon(con,sel,sty) {
                var inDom = '',popsty = '';
                if(sty){
                    popsty = sty;
                }
                inDom += '<div class="swiper-container hd-swp hdSwp"><div class="swiper-wrapper">';
                $.each(hdData[sel].con,function (i,item) {
                    var picsrc = item.pic;
                    if(typeof picsrc === 'undefined'){
                        picsrc = item.bigpic;
                    }
                    inDom += '<div class="swiper-slide">';
                    inDom += '<div class="tit">'+item.tit+'</div>';
                    inDom += '<div class="des">'+item.des+'</div>';
                    inDom += '<div class="pic-wrap"><img src="'+picsrc+'" alt="'+item.tit+'"></div>';
                    inDom += '</div>';
                });
                inDom += '</div></div>';
                inDom += '<a class="hd-arr hd-arr-l"></a>';
                inDom += '<a class="hd-arr hd-arr-r"></a>';
                if(navclk === false){
                    inDom += '<a class="hd-pick-btn btnPick hdbClose"></a>';
                }
                con.html(inDom).removeClass().addClass('hdb-con hdb-most '+popsty+pickSty);
                var hdSwp = new Swiper(con.find('.hdSwp'),{
                    onlyExternal:true,
                    nextButton: con.find('.hd-arr-r'),
                    prevButton: con.find('.hd-arr-l')
                });
            }

            var navBtn = tar.find('.hdbNavBtns').find('.hdbNavBtn');
            if(navclk === false){
                navBtn.addClass('dis');
            }
            function selectTar(idx) {
                var $btn = navBtn.eq(idx),
                    sel = $btn.data('sel'),
                    $insertTar = tar.find('.hdb-con');
                navBtn.removeClass('cur').eq(idx).addClass('cur');
                switch (sel){
                    case 'monster':
                        insterMost($insertTar,sel,'hdb-monster');
                        break;
                    case 'map':
                        insterMost($insertTar,sel);
                        break;
                    case 'other':
                        insterMost($insertTar,sel);
                        break;
                    case 'weapon':
                        insterWeapon($insertTar,sel,'hdb-weapon');
                        break;
                    case 'npc':
                        insterMost($insertTar,sel);
                        break;
                    default:
                        console.log('default');
                }
            }
            navBtn.on('tap',function () {
                var idx = $(this).index();
                if($(this).hasClass('dis') === false){
                    selectTar(idx);
                }
            });
            if(typeof def !== 'undefined'){
                selectTar(def);
            }else{
                selectTar(0);
            }
        },
        pgBegin:function () {
	        var dt = pgConfig.pages.pgBegin,
                $page = $('#pages'),
                pgDom = '';
            pgDom += '<div class="page-cells pgBegin">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<a class="logo-gf"></a>';
            pgDom += '<a class="logo-dgy"></a>';
            pgDom += '<a class="btn-start"></a>';
            pgDom += '<a class="btn-handbook"></a>';
            pgDom += '</div></div>';
            function pageInit() {
                gs.delayLoad();
                $page.html(pgDom);
                $page.find('.btn-start').on('tap',function () {
                    gs.pgStarBase();
                });
                $page.find('.btn-handbook').on('tap',function () {
                    gs.showHDbook($page);
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgEnd:function () {
            var dt = pgConfig.pages.pgEnd,
                $page = $('#pages'),
                pgDom = '';
            pgDom += '<div class="page-cells pgEnd">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg"><div class="icon-share"></div>';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-tit"><i class="icon-tit icon-tit9"></i></div>';
            pgDom += '<div class="infos">';
            pgDom += dt.para;
            pgDom += '</div>';
            pgDom += '<a class="btn-comment btnComment"></a>';
            pgDom += '</div></div>';
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnComment').on('tap',function () {
                    gs.openComment();
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgStarBase:function () {
            var dt = pgConfig.pages.pgStarBase,
                $page = $('#pages'),
                pgDom = '',txt = '';
            if(pgConfig.isPick === false){
                txt = '狩猎前，请前往【加工屋】选择武器';
            }else{
                txt = '战斗准备已完成，点击按钮开始狩猎';
            }
            pgDom += '<div class="page-cells pgStarBase">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-room"><img class="page-pbg" src="'+dt.pbg+'" alt="pbg"><div class="page-room-top"></div><div class="page-tit"><i class="icon-tit icon-tit1"></i></div>';
            pgDom += '<a class="btn-pic btn-pic1 btnGo1"><span>集会区域</span><i class="icons"></i></a>';
            pgDom += '<a class="btn-pic btn-pic2 btnGo2"><span>加工屋</span><i class="icons"></i></a>';
            pgDom += '<a class="btn-pic btn-pic3 btnGo3"><span>自己的房间</span><i class="icons"></i></a>';
            pgDom += '<div class="tips">'+txt+'</div>';
            pgDom += '<a class="btn-next btnNext"></a>';
            pgDom += '</div></div></div>';
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnGo1').on('tap',function () {
                    gs.pgMeeting();
                });
                $page.find('.btnGo2').on('tap',function () {
                    gs.pgWorking();
                });
                $page.find('.btnGo3').on('tap',function () {
                    gs.pgMyself();
                });
                var btnTimer;
                $page.find('.btnNext').on('tap',function () {
                    clearTimeout(btnTimer);
                    if(pgConfig.isPick === true){
                        gs.pgMap();
                    }else{
                        $page.find('.tips').addClass('lightflash');
                        btnTimer = setTimeout(function () {
                            $page.find('.tips').removeClass('lightflash');
                        },250);
                    }
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgMeeting:function () {
            var dt = pgConfig.pages.pgMeeting,
                $page = $('#pages'),
                pgDom = '';
            pgDom += '<div class="page-cells pgMeeting">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-room"><img class="page-pbg" src="'+dt.pbg+'" alt="pbg"><div class="page-room-top"></div><div class="page-tit"><i class="icon-tit icon-tit2"></i></div>';
            pgDom += '<a class="btn-pic btn-pic4 btnGo1"><span>柜台</span><i class="icons"></i></a>';
            pgDom += '<div class="tips">'+dt.txt+'</div>';
            pgDom += '<a class="btn-back btnBack"></a>';
            pgDom += '</div></div>';
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnGo1').on('tap',function () {
                    gs.pgBar();
                });
                $page.find('.btnBack').on('tap',function () {
                    gs.pgStarBase();
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgBar:function () {
            var dt = pgConfig.pages.pgBar,
                $page = $('#pages'),
                pgDom = '';
            pgDom += '<div class="page-cells pgBar">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-room"><img class="page-pbg" src="'+dt.pbg+'" alt="pbg"><div class="page-room-top"></div><div class="page-tit"><i class="icon-tit icon-tit3"></i></div>';
            pgDom += '<div class="tips">'+dt.txt+'</div>';
            pgDom += '<a class="btn-back btnBack"></a>';
            pgDom += '</div></div>';
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnBack').on('tap',function () {
                    gs.pgMeeting();
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgMyself:function () {
            var dt = pgConfig.pages.pgMyself,
                $page = $('#pages'),
                pgDom = '';
            pgDom += '<div class="page-cells pgMyself">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-room"><img class="page-pbg" src="'+dt.pbg+'" alt="pbg"><div class="page-room-top"></div><div class="page-tit"><i class="icon-tit icon-tit4"></i></div>';
            pgDom += '<div class="tips">'+dt.txt+'</div>';
            pgDom += '<a class="btn-back btnBack"></a>';
            pgDom += '<a class="btn-pop btn-pop1 btnPop1"></a>';
            pgDom += '<a class="btn-pop btn-pop2 btnPop2"></a>';
            pgDom += '<a class="btn-pop btn-pop3 btnPop3"></a>';
            pgDom += '</div></div>';
            function showPop(sty,outer,callback) {
                var popDom = '';
                popDom += '<div class="pg-pop-mask pgPop pgPopClose"></div>';
                popDom += '<div class="pg-pop-main pgPop '+sty+'">';
                popDom += outer;
                popDom += '<a class="pg-pop-close pgPopClose"></a>';
                popDom += '</div>';
                $page.append(popDom);
                if(typeof callback === 'function'){
                    callback&&callback();
                }
                var $pop = $page.find('.pgPop');
                $page.find('.pgPopClose').on('tap',function () {
                    $pop.remove();
                })
            }
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnBack').on('tap',function () {
                    gs.pgStarBase();
                });
                $page.find('.btnPop1').on('tap',function () {
                    var pDom = '';
                    showPop('pop-ms pop-ms1',pDom);
                });
                $page.find('.btnPop2').on('tap',function () {
                    var pDom = '';
                    showPop('pop-ms pop-ms2',pDom);
                });
                $page.find('.btnPop3').on('tap',function () {
                    var pDom = '';
                    pDom += '<div class="swiper-container pop-ms3-swp popMs3Swp">';
                    pDom += '<div class="swiper-wrapper">';
                    $.each(dt.pop3,function (i,item) {
                        pDom += '<div class="swiper-slide"><img src="'+item+'" alt="pic"></div>';
                    });
                    pDom += '</div></div><a class="swp-arr swp-arr-l"></a><a class="swp-arr swp-arr-r"></a>';
                    showPop('pop-ms pop-ms3',pDom,function () {
                        var swp = new Swiper($page.find('.popMs3Swp'),{
                            onlyExternal:true,
                            nextButton: $page.find('.swp-arr-r'),
                            prevButton: $page.find('.swp-arr-l')
                        });
                    });
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgWorking:function () {
            var dt = pgConfig.pages.pgWorking,
                $page = $('#pages'),
                pgDom = '',pickSty = '';
            if(pgConfig.isPick === false){
                pickSty = '';
            }else{
                pickSty = ' cur';
            }
            pgDom += '<div class="page-cells pgWorking">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-room"><img class="page-pbg" src="'+dt.pbg+'" alt="pbg"><div class="page-room-top"></div><div class="page-tit"><i class="icon-tit icon-tit5"></i></div>';
            pgDom += '<div class="tips">'+dt.txt+'</div>';
            pgDom += '<a class="btn-back btnBack"></a>';
            pgDom += '<a class="btn-pick btnPick'+pickSty+'"></a>';
            pgDom += '</div></div>';
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnBack').on('tap',function () {
                    gs.pgStarBase();
                });
                $page.find('.btnPick').on('tap',function () {
                    gs.showHDbook($page,1,false);
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgMap:function () {
            var dt = pgConfig.pages.pgMap,
                $page = $('#pages'),
                pgDom = '',
                monsterDt = pgConfig.pages.hd.monster.con,btnSty = '';
            pgDom += '<div class="page-cells pgMap">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-tit"><i class="icon-tit icon-tit7"></i></div>';
            pgDom += '<img class="map-pic" src="'+dt.bgp+'" alt="bg"><i class="map-pos"></i>';
            pgDom += '<a class="map-btn map-btn0 mapBtnBack"></a>';
            pgDom += '<a class="map-btn map-btn1 mapBtn" data-tar="mp1"></a>';
            pgDom += '<a class="map-btn map-btn2 mapBtn" data-tar="mp2"></a>';
            pgDom += '<a class="map-btn map-btn3 mapBtn" data-tar="mp3"></a>';
            pgDom += '<a class="map-btn map-btn4 mapBtn" data-tar="mp4"></a>';
            if(pgConfig.isHunted === true){
                btnSty = ' cur';
            }
            pgDom += '<a class="btn-next btnNext'+btnSty+'"></a>';
            pgDom += '</div></div>';
            function showPop(sty,outer,callback) {
                var popDom = '';
                popDom += '<div class="pg-pop-mask pgPop pgPopClose"></div>';
                popDom += '<div class="pg-pop-main pgPop '+sty+'">';
                popDom += outer;
                popDom += '<a class="pg-pop-close pgPopClose"></a>';
                popDom += '</div>';
                $page.append(popDom);
                if(typeof callback === 'function'){
                    callback&&callback();
                }
                var $pop = $page.find('.pgPop');
                $page.find('.pgPopClose').on('tap',function () {
                    $pop.remove();
                })
            }
            function pageInit() {
                $page.html(pgDom);
                $page.find('.mapBtnBack').on('tap',function () {
                    gs.pgStarBase();
                });
                $page.find('.btnNext').on('tap',function () {
                    gs.pgGamerVer();
                });
                $page.find('.mapBtn').on('tap',function () {
                    var $this = $(this),tar = $this.data('tar');
                    var mapDom = '',huntDom = '';
                    mapDom += '<div class="map-pop-area mapPopArea"><div class="map-infos"><a class="btn-hunt-begin btnHunt"></a></div></div>';
                    huntDom += '<div class="swiper-container pop-map-swp popMapSwp"><div class="swiper-wrapper">';
                    $.each(monsterDt,function (i,item) {
                        if(item.group === tar){
                            huntDom += '<div class="swiper-slide">';
                            huntDom += '<img class="mapGif" src="'+item.bigpic+'" alt="'+item.tit+'">';
                            huntDom += '<div class="tit">'+item.tit+'</div>';
                            huntDom += '<div class="des">'+item.des+'</div>';
                            if(item.hunted === true){
                                huntDom += '<div class="map-pop-acts cur"><a class="btn-act btrnAct" data-mtr="'+i+'" data-gif="'+item.gifpic+'"></a></div>';
                            }else{
                                huntDom += '<div class="map-pop-acts"><a class="btn-act btrnAct" data-mtr="'+i+'" data-gif="'+item.gifpic+'"></a></div>';
                            }
                            huntDom += '</div>';
                        }
                    });
                    huntDom += '</div><a class="swp-arr swp-arr-l"></a><a class="swp-arr swp-arr-r"></div>';
                    showPop('pop-map '+tar,mapDom,function () {
                        $page.find('.btnHunt').on('tap',function () {
                            $page.find('.mapPopArea').html(huntDom);
                            var swp = new Swiper($page.find('.popMapSwp'),{
                                onlyExternal:true,
                                nextButton: $page.find('.swp-arr-r'),
                                prevButton: $page.find('.swp-arr-l')
                            });
                        });
                        $page.find('.mapPopArea').on('tap','.btrnAct',function () {
                            var $this = $(this),mtr = $this.data('mtr'),gifsrc = $this.data('gif'),gifDom = '';
                            monsterDt[mtr].hunted = true;
                            if(pgConfig.isHunted === false){
                                $page.find('.btnNext').addClass('cur');
                                pgConfig.isHunted = true;
                            }
                            $this.closest('.map-pop-acts').addClass('cur');
                            gifDom = '<div class="gifArea"><img src="'+gifsrc+'" alt="gif"><a class="gifAreaClose"></a></div>';
                            $page.append(gifDom);
                            $page.find('.gifAreaClose').on('tap',function () {
                                $page.find('.gifArea').remove();
                            });
                        });
                    })
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        pgGamerVer:function () {
            var dt = pgConfig.pages.pgGamerVer,
                $page = $('#pages'),
                pgDom = '',boxNavDom = '';
            pgDom += '<div class="page-cells pgGamerVer">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '<div class="page-tit"><i class="icon-tit icon-tit8"></i><span>'+dt.des+'</span></div>';
            pgDom += '<div class="box">';
            boxNavDom += '<div class="box-nav">';
            $.each(dt.list,function (i,item) {
                pgDom += '<div class="item">';
                boxNavDom += '<a>'+item.tit+'</a>';
                pgDom += '<img src="'+item.pic+'" alt="'+item.tit+'">';
                pgDom += '<a class="buy" target="_blank" href="'+item.buy+'"></a>';
                pgDom += '<div class="para">';
                $.each(item.lis,function (j,pars) {
                    pgDom += '<div class="para-eh"><i>0'+(j+1)+'</i>'+pars+'</div>';
                });
                pgDom += '</div>';
                pgDom += '</div>';
            });
            boxNavDom += '</div>';
            pgDom += '</div>';
            pgDom += boxNavDom;
            pgDom += '<a class="btn-next btnNext"></a>';
            pgDom += '</div></div>';
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnNext').on('tap',function () {
                    gs.pgEnd();
                });
                var $tabNav = $page.find('.box-nav'),$tabCon = $page.find('.box');
                $tabNav.find('a').eq(2).addClass('cur');
                $tabCon.find('.item').eq(2).addClass('cur');
                $tabNav.find('a').on('tap',function () {
                    var $this = $(this),idx = $this.index();
                    $tabNav.find('a').removeClass('cur');
                    $this.addClass('cur');
                    $tabCon.find('.item').removeClass('cur').eq(idx).addClass('cur');

                })
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        openComment:function () {
            $('#pageComment').addClass('cur');
            $("#SOHUCS").html('');
            $("#SOHUCS").GetWapComment();
        },
        closeComment:function () {
	        $('#commentClose').on('tap',function () {
                $('#pageComment').removeClass('cur');
            });
        },
        demo:function () {
            var dt = pgConfig.pages.demo,
                $page = $('#pages'),
                pgDom = '';
            pgDom += '<div class="page-cells demo">';
            pgDom += '<img class="page-bg" src="'+dt.bg+'" alt="bg">';
            pgDom += '<div class="page-safe">';
            pgDom += '</div></div>';
            function pageInit() {
                $page.html(pgDom);
                $page.find('.btnNext').on('tap',function () {
                    gs.pgStarBase();
                });
            }
            gs.pgChange(function () {
                pageInit();
            });
        },
        init:function(){
	        var gsfun = this;
            gsfun.setSize();
            $(window).resize(function () {
                gsfun.setSize();
            });
            gsfun.closeComment();

            gsfun.pgBegin();
        }
	};
    gs.init();
})(jQuery);