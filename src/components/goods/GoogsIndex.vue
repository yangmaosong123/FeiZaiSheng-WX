<template>
<div>

    <mt-navbar v-model="selected">
        <mt-tab-item id="1">热门出售</mt-tab-item>
        <mt-tab-item id="2">热门求购</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected" class="tab_container">
        <mt-tab-container-item id="1">
            <mt-loadmore :bottom-method="loadMoreWhenScroll"
                     :bottom-all-loaded="data.sell.allLoad" bottomPullText='上拉加载更多...'
                     ref="loadmore">

             

                <div class="box"  v-for="(row,index) in rowToColumn(data.sell.list)" :key="index">
                    <div class="item" v-for="item in row" :key="item.id" @click="gotoDetails(item.id)">
                        
                        <img :src="$store.state.outputImgUrl+item.id+'&bizObjName=upload_img'" @click="handleGoToDetail(props.row)">
                        <mt-cell-swipe :title="item.productTitle" />
                        <mt-cell-swipe :title="!item.price||item.price=='0.00'?'价格面议':'￥'+item.price" style="color: #198df1;"/>
                    </div>
                </div>
            </mt-loadmore>

        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <mt-loadmore :bottom-method="loadMoreWhenScroll"
                     :bottom-all-loaded="data.buy.allLoad" bottomPullText='上拉加载更多...'
                     ref="loadmore">

                <div class="box"  v-for="(row,index) in rowToColumn(data.buy.list)" :key="index">
                    <div class="item" v-for="item in row" :key="item.id" @click="gotoDetails(item.id)">
                        
                        <img :src="$store.state.outputImgUrl+item.id+'&bizObjName=upload_img'" @click="handleGoToDetail(props.row)">
                        <mt-cell-swipe :title="item.productTitle" />
                        <mt-cell-swipe :title="!item.price||item.price=='0.00'?'价格面议':'￥'+item.price"  style="color: #ff5a6c;"/>
                    </div>
                </div>
             </mt-loadmore>   
        </mt-tab-container-item>
    </mt-tab-container>

</div>
</template>

<script>
export default {
    name: 'Home',
    components: {},
    data() {
        return {
            bottomText:"上拉加载更多...",
            data: {
                buy:{
                    list:[],
                    pageNum:-1,
                    pageIndex:0,
                    loading:false,
                    allLoad:false,
                },
                sell: {
                    list:[],
                    pageNum:-1,
                    pageIndex:0,
                    loading:false,
                    allLoad:false,
                },

            },
            selected: '1',            
        }
    },
    created: function () {
        this.loadMoreForBuy();
        this.loadMoreForSell();
        //this.loadMore("sell",this.sellPageIndex,this.data.sell); 
    },
    watch: {
        "$route": function () {}
    },
    methods: {
        gotoDetails(id){
             this.$router.push({path:"/goods-details",query:{id:id}});
        },
        rowToColumn(lst) {
            if(lst==null){
                return [];
            }
            var sz = [];
            var row = [];
            for (var i = 0; i < lst.length; i++) {
                if (i % 2 == 0) {
                    if (row.length > 0) {
                        sz.push(row);
                    }
                    row = [];
                }
                row.push(lst[i]);
            }
            if (row.length > 0) {
                sz.push(row);
            }
            return sz;
        },
        loadMoreWhenScroll(){
            if(this.selected==1){
                this.loadMoreForSell();
                
            }
            else{
                this.loadMoreForBuy();
            }
        },
        loadMoreForBuy(){
            if(this.data.buy.loading){
                 return;
             }
            if(this.data.buy.pageIndex>=this.data.buy.pageNum && this.data.buy.pageNum>0){
                return;
            }
            this.data.buy.pageIndex=this.data.buy.pageIndex+1;
            this.loadMore("buy",this.data.buy.pageIndex,this.data.buy);
        },

        loadMoreForSell(){
            if(this.data.sell.loading){
                 return;
             }
            if(this.data.sell.pageIndex>=this.data.sell.pageNum && this.data.sell.pageNum>0){
                this.data.sell.allLoad=true;
                return;
            }
            this.data.sell.pageIndex=this.data.sell.pageIndex+1;
            this.loadMore("sell",this.data.sell.pageIndex,this.data.sell);
        },

        loadMore(tradeType,pageIndex,data){
             let _this = this;
             
             data.loading=true;
            this.$axios({
                method: "post",
                url: this.$store.state.recycleAddr + "/recProduct/indexRecyclList",
                data: {
                    pageIndex: pageIndex,
                    pageSize: 10,                   
                    tradeType: tradeType,                   
                    searchKey:"",
                    category:"bx",                    
                },
            }).then((res) => {
                if (res.data.status == 200) {
                    for(var i=0;i<res.data.data.list.length;i++){
                        data.list.push(res.data.data.list[i]);
                    }            
                    data.pageNum=res.data.data.pages;
                }
            }).then(function(){
                data.loading=false;
            })
        }, 
      
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.bk {
    width: 100px;
    height: 200px;
}

.box {
    display: flex;
    flex-direction: row;
    flex-wrap:nowrap;
    width: 100%;
   
}

.box .item {   
    width:48%;
    margin: 0 3px;
    border: 1px solid #cacaca;
    margin-bottom: 10px;
    
}

.box img {
    width: 100%;
    height: 130px
}

li {
    list-style-type: none;
}

.tab_container{
    margin-top: 10px;
}
.mint-cell{
    min-height: 28px;
    text-align: left;
}
.mint-navbar .mint-tab-item.is-selected{
    border-bottom: 2px solid #26a2ff;
    margin-bottom: 0px;
}
.mint-navbar{
    border-bottom: 1px solid #ccc;
}

</style>
<style>
body{
 background-color: #fff;   
}
.mint-cell-text{
    font-size: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}
.mint-cell-wrapper{
    border: 0px;
}
.mint-cell mint-cell-swipe{
    border: 0px;
}
</style>

