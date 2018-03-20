   
**简要描述：** 

- 抽奖API

**请求URL：** 
- ` http://db5.gamersky.com/LotteryAjax.aspx `
  
**请求方式：**
- GET 

**参数：** 

|参数名|必选|类型|说明|可选值|  
|---|---|---|---|---|
|action |是  |string |获取内容|getlotterycount：可用抽奖次数；getwinningmessage：获奖记录；getaward：提交中奖信息；sweepstakes：抽奖|
|lotteryId |是  |number | 抽奖ID    |-|
|userId |否  |number |用户ID  |-|
|prizeId |否  |string | 奖品ID    |-|
|recordId |否  |string | 中奖记录ID    |-|
|phoneNumber |否  |string | 手机号    |-|
|userName |否  |string | 中奖人姓名    |-|
|address |否  |string | 其他领奖信息    |-|


* getlotterycount，data参数示例  

```javascript
{
    jsondata:JSON2.stringify({
        "action":"getlotterycount",
        "userId":0,
        "lotteryId": 0
    })
}
```

* getwinningmessage，data参数示例  

```javascript
{
    jsondata:JSON2.stringify({
        "action":"getwinningmessage",
        "lotteryId": 0
    })
}
```

* getaward，data参数示例  

```javascript
{
    jsondata:JSON2.stringify({
        action: "getaward", 
        prizeId: 0, 
        recordId: 0, 
        phoneNumber: '', 
        userName: '', 
        address: ''
    })
}
```

* sweepstakes，data参数示例  

```javascript
{
    jsondata:JSON2.stringify({
        "action":"sweepstakes",
        "userId":0,
        "lotteryId": 0
    })
}
```
---

**格式：**
JSONP 

 **返回示例**
 
 * getlotterycount，返回示例 
 ``` JSON
   {
       "status": "ok",
       "result": 1
   }
 ```
 
 * getwinningmessage，返回示例 
 ``` JSON
   {
       "status": "ok",
       "result": [
           {
               "userName": "MrrrTian",
               "prizeName": "战网点卡（点数以实际为准）",
               "winTime": "2018-03-20T11:53:14"
           },
           {
               "userName": "MrrrTian",
               "prizeName": "守望手机壳",
               "winTime": "2018-03-20T12:02:33"
           }
       ]
   }
 ```
 
 * getaward，返回示例 
 ``` JSON
   {
       "status": "err",
       "result": "已领取！"
   }
   //or
   {
       "status": "ok",
       "result": "领取成功！"
   }
 ```
 
* sweepstakes，返回示例 
``` JSON
  {
      "status": "ok",
      "result": [
          {
              "prizeId": 543,
              "prizeName": "战网点卡（点数以实际为准）",
              "awardType": 1,
              "acceptWay": 1,
              "recordId": 5755,
              "prizecCode": "战网点卡（点数以实际为准）",
              "custom": ""
          }
      ]
  }
```

 **JS代码使用接口示例** 

```javascript
$.ajax({
    type: 'GET',
    url:'http://db5.gamersky.com/LotteryAjax.aspx',
    dataType:'jsonp',
    data:{jsondata:JSON2.stringify({action:"getwinningmessage",lotteryId:0})},
    success:function (data) {
        console.log(data);
    }
});
```

 **备注** 

- 无


