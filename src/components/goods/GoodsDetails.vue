<template>
<div class="swipe">
    <!-- <mt-header title="商品详情"></mt-header> -->
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in data.uploadFileAttId" :key="item">
            <img :src="$store.state.outputImgByIdUrl+item" class="img_width">
        </mt-swipe-item>
    </mt-swipe>
    
    <div class="box" style="padding-left:20px;font-size:16px;">
        <span>[{{data.tradeType=="sell"?"出售":"求购"}}]</span>
        <span>{{data.productTitle}}</span>
    </div>
    <div class="box" style="padding:10px 0 10px 20px;color:#198df1;font-size:16px;">
        <span>价格：</span>
        <span>{{!data.price||data.price=='0.00'?'价格面议':'￥'+data.price}}</span>
    </div>
    
    <mt-cell title="商品信息" class="title"></mt-cell>
    
    <div class="box">
        <span>交易类型</span><span>【{{data.tradeType=="sell"?"出售":"求购"}}】</span>
    </div>
    <div class="box">
        <span>发布日期</span><span>{{dateToStrMinue(data.creationTime)}}</span>
    </div>
    <div class="box">
        <span>发布时效</span><span>
             {{findConfigItem(data.deadline,$store.state.dictionary.cxsj).title}}
        </span>
    </div>
    <div class="box">
        <span>行业种类</span><span>
            {{findConfigItem(data.source,$store.state.dictionary.hsly).title}}/
                  {{findConfigItem(data.category,$store.state.dictionary.hszl).title}}/
                  {{findConfigItem(data.subCategory,$store.state.dictionary.hslb).title}}
        </span>
    </div>
    <div class="box">
        <span>数量</span><span>
            {{data.quantity}}{{findConfigItem(data.unit,$store.state.dictionary.unit).title}}
            ({{calTradeQuantity}}{{findConfigItem(data.unit,$store.state.dictionary.unit).title}})
        </span>
    </div>
    <div class="box">
        <span>最新成交量</span><span>
            {{data.minTradeQuantity}}{{findConfigItem(data.unit,$store.state.dictionary.unit).title}}      
        </span>
    </div> 
   
    <div class="box">
        <span>物流</span><span>
            {{data.logisticsIncluded=='Y'?'卖家送货上门':data.logisticsIncluded=='N'?'买家上门取货':''}}
        </span>
    </div>

     <mt-cell title="联系信息" class="title"></mt-cell>
    <div class="box">
        <span>联系人</span><span>
           {{data.contacts}}
        </span>
    </div>
    <div class="box">
        <span>联系电话</span><span>
           {{data.phone}}
        </span>
    </div>
    <div class="box">
        <span>所在地区</span><span>
           {{ makeAddr(data.province,data.city,data.region)}}
        </span>
    </div>

    <div class="box">
        <span>详细地址</span><span>
           {{data.address}}
        </span>
    </div>
   
    <mt-cell title="产品介绍" class="title"></mt-cell>
    <div class="box_wrap">
         <img v-for="item in data.uploadTradeAttId" :key="item" :src="$store.state.outputImgByIdUrl+item" class="img_width">
    </div>

    <div>
        {{data.remark}}
    </div>


</div>
</template>

<script>
export default {
    name: 'Logo',
    data() {
        return {
            data: {},
        }
    },
    created: function () {
        this.load();
    },
    computed: {
         calTradeQuantity: function () {
            var sz = [];
            sz.push(this.data.tradeType == "buy" ? "已成交" : "剩余");
            var tradeQuantity = this.data.tradeQuantity;
            if (tradeQuantity == null) {
                tradeQuantity = 0;
            }
            sz.push(
                this.data.tradeType == "buy" ?
                tradeQuantity :
                this.data.quantity - tradeQuantity
            );
            return sz.join("");
        },
    },
    methods: {
       
        load() {
            let _this = this;
            this.$axios({
                method: "post",
                url: this.$store.state.recycleAddr + "/recProduct/buyCommodityDetails",
                data: {
                    id: this.$route.query.id
                },
            }).then((res) => {
                if (res.data.status == 200) {
                    this.data = res.data.data;
                }
            })
        },
    }
}
</script>

<style scoped>
.swipe {
    height: 200px;
    width: 100%;
}

.img_width {
    width: 100%;
    height: 200px;
}

.box {
    padding-left: 20px;
    line-height: 30px;
    font-size: 15px;
    color: #7d7d7d;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;    
}
.title {
  background: #f3f3f3;
  padding: 3px 0;
  font-size: 15px;
  border-left: 3px solid #198df1; 
}
.box_wrap {
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;    
    
}

</style>
<style>
body{
 background-color: #fff;   
}
.mint-cell{
    min-height: 22px;
}
.mint-header{
    height: 30px;
    background:#beccd6;
    text-align: left;
}
.mint-cell-wrapper{
    border: 0px;
}
</style>
