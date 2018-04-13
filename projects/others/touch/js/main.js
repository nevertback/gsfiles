(function(){
    var Event = {
        _listeners:{},
        //添加
        addEvent:function (type,fn) {
            if(typeof this._listeners[type] === "undefined"){
                this._listeners[type] = [];
            }
            if(typeof fn === "function"){
                this._listeners[type].push(fn);
            }
            return this;
        },
        //触发
        fireEvent:function (type) {
            var arrayEvent = this._listeners[type];
            if(arrayEvent instanceof Array){
                for(var i = 0,length = arrayEvent.length;i<length;i+=1){
                    if(typeof arrayEvent[i] === "function"){
                        arrayEvent[i]({type:type});
                    }
                }
            }
            return this;
        },
        //删除
        removeEvent:function (type,fn) {
            var arrayEvent = this._listeners[type];
            if(typeof type === 'string' && arrayEvent instanceof Array){
                if(typeof fn === "function"){
                    for(var i=0,length = arrayEvent.length;i<length;i+=1){
                        if(arrayEvent[i] === fn){
                            this._listeners[type].splice(i,1);
                            break;
                        }
                    }
                } else {
                    delete this._listeners[type];
                }
            }
            return this;

        }
    };
    Event.addEvent('alert',function () {
        alert('alert');
    });
    Event.fireEvent('alert');
    console.log(Event._listeners)
})();