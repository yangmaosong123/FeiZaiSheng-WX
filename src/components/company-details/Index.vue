<template>
<div>
    <mt-cell class="details">
        <img slot="icon" :src="$store.state.outputImgByIdUrl+data.info1.enterpriseDisplay" height="140">
        <span style="margin-left:20px;">
            <h4>{{data.info1.unitName}}</h4>   
            <h4>{{data.info1.fixedTelephone}}</h4>   
            <h4>{{data.info1.email}}</h4>   
        </span>
    </mt-cell>

    <mt-navbar v-model="selected">
        <mt-tab-item id="1">企业介绍</mt-tab-item>
        <mt-tab-item id="2">注册信息</mt-tab-item>
        <mt-tab-item id="3">资历证书</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected" class="tab_container">
        <mt-tab-container-item id="1">
        <span class="text">{{data.info1.companyIntroduction}}</span>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
            <ul>
                <li>注册时间:{{data.info1.registrationTime}}</li>
                <li>注册资金:{{data.info1.registrationCapital}}</li>
                <li>注册时间:{{findConfigItem(data.info1.companyProperties,$store.state.dictionary.gsxz).title}}</li>
                <li>所属行业:{{findConfigItem(data.info1.industry,$store.state.dictionary.sshy).title}}</li>
                <li>主要产品:{{mainProd(data.info1.mainProducts)}}</li>
            </ul>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
            <div class="certificate_img_box">
                <img class="certificate_img" :src="$store.state.outputImgByIdUrl+item.id" v-for="item in certificateImg" :key="item.id">
            </div>
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
            data: {
                info1: {},
                info2: {},
                
            },
            certificateImg: [],
            selected: '1',
        }
    },
    created: function () {
        this.load();
    },
    watch:{
        "$route":function(){
           
            this.load();
        }
    },
    methods: {
        mainProd(mp) {
            if (mp == null) {
                return "";
            }
            var sz = mp;
            var strsz = [];
            for (var i = 0; i < sz.length; i++) {
                strsz.push(this.findConfigItem(sz[i], this.$store.state.dictionary.zycp).title);
            }
            return strsz.join(",");
        },
        loadImg() {
            let _this = this;
            _this.$axios({
                method: "post",
                url: "/attachment/findByBizObj",
                data: {
                    "bizObjId": this.data.info1.id,
                    "bizObjName": "ENTERPRISE_CERTIFICATE_IMG"
                }
            }).then(res => {
                _this.certificateImg = res.data.data;
            });

        },

        load() {
            let _this = this;
            this.$axios({
                method: "post",
                url: "/company/priseLibraryEnter",
                data:{id:this.$route.query.id},
            }).then((res) => {
                if (res.data.status == 200) {
                    _this.data.info1 = res.data.data;
                    _this.loadImg();
                }
            })

            this.$axios({
                method: "post",
                url: "/company/registerInfo"
            }).then((res) => {
                if (res.data.status == 200) {
                    this.data.info2 = res.data.data;
                }
            })

        },
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style lang="less" scoped>
.details{
 margin-top: 20px;
 img{
 width: 80px;
 height: 80px;
 border: 1px solid #e5e5e5;
    }
}
.tab_container{
 ul{
     margin-top: 40px;
   li{
     margin-top: 8px;  
     font-size: 15px;
   }  
 }   
.text{
 margin-top: 50px;
 padding: 0 20px;
 font-size: 14px;   
}
}
.bk {
    width: 100px;
    height: 200px;
}
.certificate_img_box{
    display: flex;
    flex-direction: row;
    flex-wrap:wrap;
}
.certificate_img{
    margin: 5px 2% ;
    width: 29%;
    height: 100px
}
li{
    list-style-type:none;
}
.mint-navbar .mint-tab-item.is-selected{
    margin-bottom: 0px;
}
.mint-navbar{
border-bottom: 1px solid #eaeaea;
}

</style>

<style>
body{
 background-color: #fff;   
}
.mint-cell{
    min-height: 25px!important;
    text-align: left!important;
}
.mint-cell-title{
    flex: initial!important;
}
    
.mint-cell:first-child .mint-cell-wrapper{
 font-size: 14px!important;   
}
.mint-cell-wrapper{
    border: 0px;
}
</style>
