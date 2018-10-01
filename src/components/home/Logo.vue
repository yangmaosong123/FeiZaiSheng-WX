<template>
<div class="swipe">
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in data" :key="item.id">
             <img :src="$store.state.outputImgByIdUrl+item.extField2" class="img_width">
        </mt-swipe-item>        
    </mt-swipe>
</div>
</template>

<script>
export default {
    name: 'Logo',
    data() {
        return {
            data:[],
        }
    },
    created:function(){
        this.load();
    },
    methods: {
        load() {
            let _this = this;            
            this.$axios({
                method: "post",
                url: "/base/broadcastList"
            }).then((res) => {
                if (res.data.status == 200) {
                    this.data=res.data.data;
                } 
            })
        },
    }
}
</script>

<style scoped>
.swipe {
    height: 180px;
    width: 100%;   
}
.img_width{
    height: 180px;
    margin: 0 auto;
    max-height: 100%;
    width: 100%;
}
</style>
