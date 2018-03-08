/*
 * 模拟后端返回数据
 * ！！生成数据时删除注释！！
 * ！！生成数据时删除注释！！
 * ！！生成数据时删除注释！！
 *
 * dataType ok为数据正常不为空，null没有数据或失败
 * page 当前页码
 * commlist 评论列表
 * cardid 卡片ID
 * sumcount 本页评论数
 *
 * commid 评论ID
 * head 用户头像
 * name 用户名
 * reply 回复的用户名
 * replytime 回复时间
 * context 回复内容
 */
var fakeCommData = {
    "someval":"后端自定义的一些参数",
    "dataType":"ok",
    "page":1,
    "sumcount":5,
    "cardid":48965,
    "commlist":[
        {
            "commid":6878,
            "head":"http://image.gamersky.com/avatar/original/game/game177.jpg",
            "name":"战术大米",
            "replytime":"23分钟前",
            "context":"<p>我只想问这么大个游民星空有几个有NS的，有就我估计1000个人都没得</p>"
        },
        {
            "commid":6878,
            "head":"http://image.gamersky.com/avatar/original/anime/anime344.jpg",
            "name":"丹萱伊莲恩",
            "reply":"海的声音",
            "replytime":"49分钟前",
            "context":"<p>说了也没用，你没看dc漫威电影底下，手机底下，显卡底下，到处都有撕逼的吗？这年头放不放香菜都有人能争个半天。说白了都是闲的</p>"
        },
        {
            "commid":6878,
            "head":"http://image.gamersky.com/avatar/original/animal/animal009.jpg",
            "name":"杰罗姆惋庭",
            "replytime":"1小时前",
            "context":"<p>脱逃者2我玩过以后感觉还是非常不错的，里面狱办法，比1代还加了合成表系量是攻击力，体质(减少体力消耗)</p>"
        },
        {
            "commid":6878,
            "head":"http://image.gamersky.com/avatar/original/alien/alien030.jpg",
            "name":"天磊依秋",
            "replytime":"1小时前",
            "context":"<p>不错</p>"
        },
        {
            "commid":6878,
            "head":"http://image.gamersky.com/avatar/original/game/game277.jpg",
            "name":"海的声音",
            "reply":"丹萱伊莲恩",
            "replytime":"2小时前",
            "context":"<p>讲个笑话手感打击感 你以为你在玩格斗游戏啊 我都不知道是谁先说的 一个贴图游戏还tm手感 真的zz</p>"
        }
    ]
};