$('#navbar-open').collapse({
    toggle: false
});
$('#diyPop').on('show.bs.modal', function () {

});
var defaultParams = {
    nodeId: '', excludeNodeId: '', specialId: '291', excludeSpecialId: '', modelType: 'PE_U_Article', orderType: 1, outPut: 100
};
var qVm = new Vue({
    el:"#list",
    data:function () {
        return {
            diyQuery:{
                nodeId: '', excludeNodeId: '', specialId: '', excludeSpecialId: '', modelType: 'PE_U_Article', orderType: 2, outPut: 100
            },
            btngroup:[
                {
                    txt:'首页',
                    cur:false,
                    cds:{
                        nodeId: '', excludeNodeId: '', specialId: '291', excludeSpecialId: '', modelType: 'PE_U_Article', orderType: 1, outPut: 100
                    }
                },
                {
                    txt:'非首页',
                    cur:false,
                    cds:{
                        nodeId: '', excludeNodeId: '20824,20263,11001', specialId: '', excludeSpecialId: '291', modelType: 'PE_U_Article', orderType: 1, outPut: 100
                    }
                },
                {
                    txt:'攻略',
                    cur:false,
                    cds:{
                        nodeId: '20824,20263,11001', excludeNodeId: '', specialId: '', excludeSpecialId: '', modelType: 'PE_U_Article', orderType: 1, outPut: 100
                    }
                },
                {
                    txt:'下载',
                    cur:false,
                    cds:{
                        nodeId: '10002', excludeNodeId: '', specialId: '', excludeSpecialId: '', modelType: 'PE_U_Soft', orderType: 1, outPut: 100
                    }
                }
            ],
            articles:[],
            conditions:defaultParams,
            nullData:false,
            btnCur:'active',
            btnCurNum:0,
            loadingShow:false
        }
    },
    mounted:function () {
        this.getDatas();
    },
    methods:{
        getDiy:function () {
            this.conditions = this.diyQuery;
            this.getDatas();
        },
        getAticles:function (vals,key) {
            this.conditions = vals;
            this.btnCurNum = key;
            this.getDatas();
        },
        getDatas:function () {
            var jsondata = this.conditions,that = this;
            $.ajax({
                type: "get", dataType: "jsonp", url: "http://db2.gamersky.com/CustomQuery.aspx",
                data: { "jsondata": JSON.stringify(jsondata) },
                beforeSend:function () {
                    if(screen.width<768){
                        $('#navbar-open').collapse('toggle');
                    }
                    that.loadingShow = true;
                },
                success: function (data) {
                    that.loadingShow = false;
                    if (data.status === "ok") {
                        qVm.articles = data.result;
                    }
                    else {
                        that.nullData = true;
                    }
                    $(window).scrollTop(0);
                }
            });
        }
    }
});
