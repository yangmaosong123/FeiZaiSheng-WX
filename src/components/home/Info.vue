<template>
<div class="swipe">     
    <ul>
        <li v-for="item in data" :key="item.id" v-show="item.id==curItemId">
            <div class="box">
                <!-- <mt-button type="primary">primary</mt-button> -->
                <img src="../../assets/img/hotinfo_icon.png"/><span v-html="item.title"></span>
            </div>            
        </li>
    </ul>    

</div>
</template>

<script>
export default {
    name: 'Logo',
    data() {
        return {
            data: [],
            curItemId:0,
            curIndex:0,
        }
    },
    created: function () {
        this.load();
         setInterval(() => {
          this.swip();
        }, 2000);
    },
    methods: {
        swip(){            
            this.curIndex=(this.curIndex+1)%this.data.length;
            this.curItemId=this.data[this.curIndex].id;
        },
        load() {
            let _this = this;
            this.$axios({
                method: "post",
                url: "/base/infoList"
            }).then((res) => {
                if (res.data.status == 200) {
                    this.data = res.data.data;
                    if(this.data.length>0){
                        this.curItemId=this.data[0].id;
                        this.curIndex=0;
                    }
                }
            })
        },
    }
}
</script>

<style lang="less" scoped>
.swipe {
    width: 100%;
    border-bottom: 1px solid #E8E8E8;
    ul{
    -webkit-padding-start: 10px;    
    }
    li{
    list-style: none;  
     }
    .box{
     display: flex;
     flex-direction: row;
     
     }
    img{  
     width: 100px !important;
     height: 19px;
    }
    span{
    width: 250px;
    color: #666;
    font-size:14px;
    padding-left: 10px;
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap;  

    }
}
</style>

<style>
body{
 background-color: #fff;   
}
ul{
    margin:10px 0;
  }
 p{ 
    width: 250px; 
    margin: 0px;
    overflow: hidden; 
    text-overflow: ellipsis;
    white-space: nowrap;    
   }
    
    
</style>

