<template>
<div>
    <div>{{data.title}}</div> 
    <div>发布日期：{{data.createDate}}</div> 
    <div v-html="data.content"></div> 


</div>
</template>

<script>
export default {
    name: 'InfoDetails',
    data() {
        return {
            data: {},
        }
    },
    created: function () {
        this.load();
    },
    computed: { 
    },
    methods: {       
        load() {
            let _this = this;
            this.$axios({
                method: "post",
                url: "/base/infoListDetail",
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
</style>
