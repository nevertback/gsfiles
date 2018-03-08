/*
 * 模拟后端返回数据
 * ！！生成数据时删除注释！！
 * ！！生成数据时删除注释！！
 * ！！生成数据时删除注释！！
 *
 * dataType ok为数据正常不为空，null没有数据或失败
 * cardgroup 列表
 * cardid 卡片ID
 * url 本条卡片主页
 * user 用户名
 * head 用户头像
 * createtime 创建时间
 * from 来源
 * fromUrl 来源链接
 * vauth 是否V认证
 * editauth  是否V认证 编辑
 * spectop 是否置顶
 * specvalue 是否加精
 * text 内容
 * countcomment 评论数
 * countlike 点赞数
 * picbig 单张大图
 * piclist 多图
 * ****picbig.ext 图片样式（gif动图,long长图,jpg普通）
 * ****picbig.url 缩略图地址
 * ****picbig.large 大图地址
 * ****picbig.origin 高清原始大图地址
 * ****picbig.size 大图尺寸,传图时写入
 * piclist 多图
 * ****piclist.ext 图片样式（gif动图,long长图,jpg普通）
 * ****piclist.url 缩略图地址
 * ****piclist.large 大图地址
 * ****piclist.origin 高清原始大图地址
 * ****piclist.size 大图尺寸,传图时写入
 * video 视频
 * ****video.pic 视频缩略图
 * ****video.url 视频mp4地址
 */
var fakeDate = {
    "someval":"后端自定义的一些参数",
    "dataType":"ok",
    "page":1,
    "cardgroup":[
        {
            "cardid":0,
            "url":"./card.html",
            "user":"海的声音",
            "head":"http://image.gamersky.com/avatar/original/game/game177.jpg",
            "createtime":"23分钟之前",
            "from":"来自圈子游民之家",
            "fromUrl":"./",
            "vauth":true,
            "editauth":false,
            "spectop":true,
            "specvalue":true,
            "text":"<p><a href=\"\">#蛮有道理#</a>乍一看你说的蛮有道理的，不过细细想来腾讯的游戏我只玩LOL跟毒奶粉从08年到现在，总共花了点心悦会员都才2级入steam七个月方星际战甲</p>",
            "countcomment":23555,
            "countlike":489,
            "piclist":[
                {
                    ext:'gif',
                    url:'https://wx2.sinaimg.cn/orj360/e4d27a06gy1fjroz5nd27g209a095x6p.gif',
                    large:'https://wx2.sinaimg.cn/large/e4d27a06gy1fjroz5nd27g209a095x6p.gif',
                    origin:'https://wx2.sinaimg.cn/large/e4d27a06gy1fjroz5nd27g209a095x6p.gif',
                    size:'334x329'
                },
                {
                    ext:'gif',
                    url:'https://wx3.sinaimg.cn/orj360/e4d27a06gy1fjroyx7vt7g206y05khdt.gif',
                    large:'https://wx3.sinaimg.cn/large/e4d27a06gy1fjroyx7vt7g206y05khdt.gif',
                    origin:'https://wx3.sinaimg.cn/large/e4d27a06gy1fjroyx7vt7g206y05khdt.gif',
                    size:'400x225'
                },
                {
                    ext:'jpg',
                    url:'https://wx2.sinaimg.cn/orj360/63578835gy1fl8dsytunyj20j60j6n1k.jpg',
                    large:'https://wx2.sinaimg.cn/large/63578835gy1fl8dsytunyj20j60j6n1k.jpg',
                    origin:'https://wx2.sinaimg.cn/large/63578835gy1fl8dsytunyj20j60j6n1k.jpg',
                    size:'690x690'
                },
                {
                    ext:'jpg',
                    url:'http://wx1.sinaimg.cn/mw1024/49fa6dc0ly1fl6z8gwhcqj23h01ycqv7.jpg',
                    large:'http://wx1.sinaimg.cn/mw1024/49fa6dc0ly1fl6z8gwhcqj23h01ycqv7.jpg',
                    origin:'http://wx1.sinaimg.cn/mw1024/49fa6dc0ly1fl6z8gwhcqj23h01ycqv7.jpg',
                    size:'1024x576'
                },
                {
                    ext:'long',
                    url:'http://ww3.sinaimg.cn/mw690/7fd54a81tw1esho6oihorj20go4kq1kx.jpg',
                    large:'http://ww3.sinaimg.cn/mw690/7fd54a81tw1esho6oihorj20go4kq1kx.jpg',
                    origin:'http://ww3.sinaimg.cn/mw690/7fd54a81tw1esho6oihorj20go4kq1kx.jpg',
                    size:'600x5930'
                },
                {
                    ext:'long',
                    url:'http://wx2.sinaimg.cn/mw690/ba4957d7gy1fl4v900bm7j20c822z10b.jpg',
                    large:'http://wx2.sinaimg.cn/mw690/ba4957d7gy1fl4v900bm7j20c822z10b.jpg',
                    origin:'http://wx2.sinaimg.cn/mw690/ba4957d7gy1fl4v900bm7j20c822z10b.jpg',
                    size:'440x2699'
                },
                {
                    ext:'jpg',
                    url:'http://wx1.sinaimg.cn/mw690/005C1DDygy1fl6bf1637jj30u00u0n1t.jpg',
                    large:'http://wx1.sinaimg.cn/mw690/005C1DDygy1fl6bf1637jj30u00u0n1t.jpg',
                    origin:'http://wx1.sinaimg.cn/mw690/005C1DDygy1fl6bf1637jj30u00u0n1t.jpg',
                    size:'690x690'
                },
                {
                    ext:'jpg',
                    url:'http://img1.gamersky.com/image2017/11/20171104_zq_281_10/gamersky_14small_28_20171141322497.jpg',
                    large:'http://img1.gamersky.com/image2017/11/20171104_zq_281_10/gamersky_14small_28_20171141322497.jpg',
                    origin:'http://img1.gamersky.com/image2017/11/20171104_zq_281_10/gamersky_14small_28_20171141322497.jpg',
                    size:'550x309'
                },
                {
                    ext:'gif',
                    url:'https://wx3.sinaimg.cn/orj360/e8788f29ly1fl76r1v7bxg2078078b29.gif',
                    large:'https://wx3.sinaimg.cn/large/e8788f29ly1fl76r1v7bxg2078078b29.gif',
                    origin:'https://wx3.sinaimg.cn/large/e8788f29ly1fl76r1v7bxg2078078b29.gif',
                    size:'260x260'
                }
            ]
        },
        {
            "cardid":1,
            "url":"./card.html",
            "user":"战术大米",
            "head":"http://image.gamersky.com/avatar/original/animal/animal111.jpg",
            "createtime":"11-01",
            "from":"来自圈子游民之家",
            "fromUrl":"./",
            "vauth":false,
            "editauth":true,
            "spectop":false,
            "specvalue":true,
            "text":"<p>脱逃者2我玩过以后感觉还是非常不错的，里面有许多越狱办法，比1代还加了合成表系量是攻击力，体质是续航(减少体力消耗)，智商就是做东西，而且可以多人联机，虽然务器<a href=\"http://wap.gamersky.com/\" class=\"link\">网页链接</a>很有意思。</p>",
            "countcomment":0,
            "countlike":10,
            "picbig":{
                ext:'jpg',
                url:"http://img1.gamersky.com/image2017/11/20171104_zq_281_10/gamersky_14small_28_20171141322497.jpg",
                large:'http://img1.gamersky.com/image2017/11/20171104_zq_281_10/gamersky_14small_28_20171141322497.jpg',
                origin:'http://img1.gamersky.com/image2017/11/20171104_zq_281_10/gamersky_14small_28_20171141322497.jpg',
                size:'500x309'
            }
        },
        {
            "cardid":2,
            "url":"./card.html",
            "user":"杰罗姆惋庭",
            "head":"http://image.gamersky.com/avatar/original/animal/animal161.jpg",
            "createtime":"23分钟之前",
            "vauth":false,
            "editauth":false,
            "spectop":false,
            "specvalue":false,
            "text":"<p>没有NS的右上角，我统计一下有多少人(ಡωಡ)</p><a href=\"http://v.youku.com/v_show/id_XMzEzODQyMTQzMg==.html?spm=a2hww.20027244.m_250036.5~5!2~5~5!2~5~5~A&f=51302896\" class=\"link-video\">视频链接</a>",
            "countcomment":45,
            "countlike":20,
            "video":{
                "pic":"https://wx1.sinaimg.cn/crop.0.0.1000.562.1000/6484575agy1fl7imxdawwj20rs0ijjv9.jpg",
                "src":"http://v.youku.com/v_show/id_XMzEzODQyMTQzMg==.html?spm=a2hww.20027244.m_250036.5~5!2~5~5!2~5~5~A&f=51302896"
            }
        },
        {
            "cardid":3,
            "url":"./card.html",
            "user":"嫌疑人丶羊仔",
            "head":"http://image.gamersky.com/avatar/original/game/game005.jpg",
            "createtime":"2016-10-02",
            "from":"来自圈子游民之家",
            "fromUrl":"./",
            "vauth":false,
            "editauth":false,
            "spectop":false,
            "specvalue":false,
            "text":"<p>想玩</p>",
            "countcomment":54,
            "countlike":87
        },
        {
            "cardid":102584,
            "url":"./card.html",
            "user":"游民_536f0jdY20160323123105",
            "head":"http://image.gamersky.com/avatar/original/game/game076.jpg",
            "createtime":"11-04 17:37",
            "vauth":true,
            "editauth":true,
            "spectop":true,
            "specvalue":true,
            "text":"<p>站门口透过玻璃窗朝店里望了一会儿，感觉自己像卖火柴的小铝孩</p>",
            "countcomment":1095,
            "countlike":8413,
            "picbig":{
                ext:'jpg',
                url:"http://wx4.sinaimg.cn/orj360/bfc243a3ly1fl66s6xnvdj215o1jknpe.jpg",
                large:'http://wx4.sinaimg.cn/mw690/bfc243a3ly1fl66s6xnvdj215o1jknpe.jpg',
                origin:'http://wx4.sinaimg.cn/mw690/bfc243a3ly1fl66s6xnvdj215o1jknpe.jpg',
                size:'690x920'
            }
        },
        {
            "cardid":532241,
            "url":"./card.html",
            "user":"√Fuli `、Primus`、",
            "head":"http://image.gamersky.com/avatar/original/game/game184.jpg",
            "createtime":"58分钟之前",
            "from":"来自圈子深夜聊天室",
            "fromUrl":"./",
            "vauth":false,
            "spectop":false,
            "specvalue":true,
            "text":"<p><a href=\"\">#天上掉的钱都不要#</a>在如今的三个主机平台上，每一家都拥有自己的招牌独占作品，而微软旗下的游戏中，最耀眼的当然就要属《光环》系列了。这个系列的游戏不仅拥有出色的射击有感，也为玩家们带来了相当不错的剧情。</p>",
            "countcomment":23555,
            "countlike":489,
            "piclist":[
                {
                    ext:'jpg',
                    url:'http://img1.gamersky.com/image2017/11/20171106_lxy_357_1/gamersky_02small_04_20171161855F65.jpg',
                    large:'http://img1.gamersky.com/image2017/11/20171106_lxy_357_1/gamersky_02origin_03_20171161855D1A.jpg',
                    origin:'http://img1.gamersky.com/image2017/11/20171106_lxy_357_1/gamersky_02origin_03_20171161855D1A.jpg',
                    size:'1280x720'
                },
                {
                    ext:'jpg',
                    url:'http://img1.gamersky.com/image2017/11/20171106_lxy_357_1/gamersky_03small_06_20171161855494.jpg',
                    large:'http://img1.gamersky.com/image2017/11/20171106_lxy_357_1/gamersky_03origin_05_201711618551B9.jpg',
                    origin:'http://img1.gamersky.com/image2017/11/20171106_lxy_357_1/gamersky_03origin_05_201711618551B9.jpg',
                    size:'1280x720'
                },
                {
                    ext:'jpg',
                    url:'http://img1.gamersky.com/image2017/11/20171106_lxy_357_1/gamersky_08small_16_201711618554FE.jpg',
                    large:'http://img1.gamersky.com/image2017/11/20171106_lxy_357_1/gamersky_08origin_15_201711618551BA.jpg',
                    origin:'http://img1.gamersky.com/image2017/11/20171106_lxy_357_1/gamersky_08origin_15_201711618551BA.jpg',
                    size:'1280x720'
                }
            ]
        },
        {
            "cardid":48796,
            "url":"./card.html",
            "user":"游民第一批注册用户",
            "head":"http://image.gamersky.com/avatar/original/movie/movie001.jpg",
            "createtime":"3小时之前",
            "from":"来自圈子瞎放的",
            "fromUrl":"./",
            "vauth":false,
            "spectop":false,
            "specvalue":true,
            "text":"<p>艺术家史蒂芬•施密茨(Stephan Schmitz)的插图作品 。</p><p>一个我们现代世界最黑暗的方面满足我们消费社会的工作，也是日常生活的一小部分，也是希望的一部分。</p>",
            "countcomment":6374,
            "countlike":672,
            "piclist":[
                {
                    ext:'jpg',
                    url:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_01small_02_201711617384CD.jpg',
                    large:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_01origin_01_201711617388FF.jpg',
                    origin:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_01origin_01_201711617388FF.jpg',
                    size:'1120x916'
                },
                {
                    ext:'jpg',
                    url:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_02small_04_20171161738B48.jpg',
                    large:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_02origin_03_20171161738923.jpg',
                    origin:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_02origin_03_20171161738923.jpg',
                    size:'1120x1516'
                },
                {
                    ext:'jpg',
                    url:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_03small_06_2017116173829B.jpg',
                    large:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_03origin_05_20171161738F91.jpg',
                    origin:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_03origin_05_20171161738F91.jpg',
                    size:'1280x757'
                },
                {
                    ext:'jpg',
                    url:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_04small_08_20171161738852.jpg',
                    large:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_04origin_07_201711617386B0.jpg',
                    origin:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_04origin_07_201711617386B0.jpg',
                    size:'1280x647'
                },
                {
                    ext:'jpg',
                    url:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_05small_10_20171161738EDA.jpg',
                    large:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_05origin_09_20171161738B96.jpg',
                    origin:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_05origin_09_20171161738B96.jpg',
                    size:'1280x712'
                },
                {
                    ext:'jpg',
                    url:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_06small_12_20171161738662.jpg',
                    large:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_06origin_11_2017116173831E.jpg',
                    origin:'http://img1.gamersky.com/image2017/11/20171106_djy_248_5/gamersky_06origin_11_2017116173831E.jpg',
                    size:'1280x1457'
                }
            ]
        },
        {
            "cardid":245,
            "url":"./card.html",
            "user":"嫌疑人丶羊仔",
            "head":"http://image.gamersky.com/avatar/original/game/game005.jpg",
            "createtime":"2016-10-02",
            "from":"来自圈子游民之家",
            "fromUrl":"./",
            "vauth":false,
            "spectop":false,
            "specvalue":true,
            "text":"<p>这款以系列当仁不让的主角“瑞克·格莱姆斯”为名的红酒，采用加利福尼亚“大红”葡萄打造，就像深受大众喜爱的瑞克一样，刺激、深邃、恰到好处，拥有清爽的酸度，只品一口就欲罢不能。</p><a href=\"http://krcom.cn/2849557973/episodes/2358773:3399d6822096860987c5a6967bd54c50\" class=\"link-video\">视频链接</a>",
            "countcomment":2569,
            "countlike":368,
            "video":{
                "pic":"http://imgs.gamersky.com/pic/2017/20171105_zw_104_1.jpg",
                "src":"http://v.youku.com/v_show/id_XMzA4OTA4OTQyMA==.html?spm=a2hww.20027244.m_250239.5~5~5~5!2~5~5~A"
            }
        },
        {
            "cardid":246,
            "url":"./card.html",
            "user":"-袮,祗屬于峩♥",
            "head":"http://image.gamersky.com/avatar/original/anime/anime024.jpg",
            "createtime":"1小时之前",
            "from":"来自圈子游民之家",
            "fromUrl":"./",
            "vauth":false,
            "spectop":false,
            "specvalue":true,
            "text":"<p>　　韩国综艺节目评选出“亚洲十大女神”排行榜。五个内地女明星上榜。分别是，赵丽颖，杨幂，唐嫣，刘诗诗，刘亦菲 。 </p><a href=\"http://v.youku.com/v_show/id_XMzEyOTM3NjkxMg==.html?spm=a2hww.20027244.m_250031.5~5!3~5~5~A\" class=\"link-video\">视频链接</a>",
            "countcomment":17,
            "countlike":58,
            "video":{
                "pic":"http://img1.gamersky.com/image2017/10/20171028_hc_44_5/image002_S.jpg",
                "src":"http://v.youku.com/v_show/id_XMzEzMzMyMDExNg==.html?spm=a2hww.20027244.m_250050.5~5!2~5~5!2~5!2~5~A&f=28870027"
            }
        }
    ]
};