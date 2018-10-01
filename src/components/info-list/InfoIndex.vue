<template>
<div>

    <mt-navbar v-model="selected">
        <mt-tab-item id="1">资讯</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected" class="tab_container">
        <mt-tab-container-item id="1">
            <mt-loadmore :bottom-method="loadMoreWhenScroll" :bottom-all-loaded="data.info.allLoad" bottomPullText='上拉加载更多...' ref="loadmore">
                <div class="box" v-for="(item,index) in data.info.list" :key="index" @click="gotoDetails(item.id)">
                    <p class="one">{{item.title}}</p>
                    <p class="two">{{item.createDate}}</p>
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
            data: {
                info: {
                    list: [],
                    pageNum: -1,
                    pageIndex: 0,
                    loading: false,
                    allLoad: false,
                },

            },
            selected: '1',
        }
    },
    created: function () {
        this.loadMoreWhenScroll();
    },
    watch: {
        "$route": function () {}
    },
    methods: {
        gotoDetails(id) {
            this.$router.push({
                path: "/info-details",
                query: {
                    id: id
                }
            });
        },

        loadMoreWhenScroll() {
            this.loadMoreForInfo();
        },

        loadMoreForInfo() {
            if (this.data.info.loading) {
                return;
            }
            if (this.data.info.pageIndex >= this.data.info.pageNum && this.data.info.pageNum > 0) {
                this.data.info.allLoad = true;
                return;
            }
            this.data.info.pageIndex = this.data.info.pageIndex + 1;
            this.loadMore("info", this.data.info.pageIndex, this.data.info);
        },

        loadMore(infoType, pageIndex, data) {
            let _this = this;

            data.loading = true;
            this.$axios({
                method: "post",
                url: "/base/homePageRecomList",
                data: {
                    pageIndex: pageIndex,
                    pageSize: 50,
                    moduleCode: "info",
                },
            }).then((res) => {
                if (res.data.status == 200) {
                    for (var i = 0; i < res.data.data.list.length; i++) {
                        data.list.push(res.data.data.list[i]);
                    }
                    data.pageNum = res.data.data.pages;
                }
            }).then(function () {
                data.loading = false;
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
    width: 100%;
    border-bottom: 1px solid #e2e2e2;
    p{
     padding:8px 20px; 
     margin: 0;  
    }
    .one{
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;    
    }
    .two{
    font-size: 14px;
    color: #808080;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;    
    }
}

.box .item {
    width: 48%;
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

.tab_container {
    margin-top: 10px;
}

.mint-cell {
    min-height: 28px;
    text-align: left;
}

.mint-navbar .mint-tab-item.is-selected {
    border-bottom: 2px solid #26a2ff;
    margin-bottom: 0px;
}


</style>
<style>
body {
    background-color: #fff;
}

.mint-cell-text {
    font-size: 15px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.mint-cell-wrapper {
    border: 0px;
}
</style>
