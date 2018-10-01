<template>
<div>
    <div class="enterprise">
        <mt-navbar v-model="selected">
            <mt-tab-item id="1">回收企业</mt-tab-item>
            <mt-tab-item id="2">处置企业</mt-tab-item>
            <mt-tab-item id="3">产废企业</mt-tab-item>
        </mt-navbar>

        <mt-tab-container v-model="selected" class="tab_container">
            <mt-tab-container-item id="1">
               

                <mt-loadmore :bottom-method="loadMoreWhenScroll"
                     :bottom-all-loaded="data.reclaim.allLoad" bottomPullText='上拉加载更多...'
                     ref="loadmore">

                    <template v-for="(item,index) in rowData(data.reclaim.list)">
                        <div class="row_box" :key="index">
                            <div v-for="subItem in item" :key="subItem.id" class="column_box">
                                <img @click="gotoDetails(subItem.id)" class="img" :src="$store.state.outputImgByIdUrl+subItem.enterpriseDisplay">
                                <mt-header class="companyname" :title="subItem.enterpriseName" />
                                <mt-header class="introduce" :title="subItem.companyIntroduction" />
                            </div>
                        </div>
                    </template>
                </mt-loadmore>
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <mt-loadmore :bottom-method="loadMoreWhenScroll"
                     :bottom-all-loaded="data.disposition.allLoad" bottomPullText='上拉加载更多...'
                     ref="loadmore">
                    <template v-for="(item,index) in rowData(data.disposition.list)">
                        <div class="row_box" :key="index">
                            <div v-for="subItem in item" :key="subItem.id" class="column_box">
                                <img @click="gotoDetails(subItem.id)" class="img" :src="$store.state.outputImgByIdUrl+subItem.enterpriseDisplay">
                                <mt-header class="companyname" :title="subItem.enterpriseName" />
                                <mt-header class="introduce" :title="subItem.companyIntroduction" />
                            </div>
                        </div>
                    </template>
                </mt-loadmore>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <mt-loadmore :bottom-method="loadMoreWhenScroll"
                     :bottom-all-loaded="data.trash.allLoad" bottomPullText='上拉加载更多...'
                     ref="loadmore">
                    <template v-for="(item,index) in rowData(data.trash.list)">
                        <div class="row_box" :key="index">
                            <div v-for="subItem in item" :key="subItem.id" class="column_box">
                                <img @click="gotoDetails(subItem.id)" class="img" :src="$store.state.outputImgByIdUrl+subItem.enterpriseDisplay">
                                <mt-header class="companyname" :title="subItem.enterpriseName" />
                                <mt-header class="introduce" :title="subItem.companyIntroduction" />
                            </div>
                        </div>
                    </template>
                </mt-loadmore>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</div>
</template>

<script>
export default {
    name: 'Logo',
    data() {
        return {
            selected: "1",
            data: {
                bottomText:"上拉加载更多...",
                reclaim: {
                    list: [],
                    pageNum: -1,
                    pageIndex: 0,
                    loading: false,
                    allLoad:false,
                },
                disposition: {
                    list: [],
                    pageNum: -1,
                    pageIndex: 0,
                    loading: false,
                    allLoad:false,
                },
                trash: {
                    list: [],
                    pageNum: -1,
                    pageIndex: 0,
                    loading: false,
                    allLoad:false,
                }

            }
        }
    },
    created: function () {
        this.loadMoreForDisposition();
        this.loadMoreForTrash();
        this.loadMoreForReclaim();
    },
    methods: {
        gotoDetails(id) {
            this.$router.push({
                path: "/company-details",
                query: {
                    id: id
                }
            });
        },

        rowData(sz) {
            var rst = [];
            var row = [];
            for (var i = 0; i < sz.length; i++) {
                if (i % 2 == 0) {
                    if (row.length > 0) {
                        rst.push(row);
                    }
                    row = [];
                }
                row.push(sz[i]);
            }
            if (row.length > 0) {
                rst.push(row);
            }
            return rst;
        },

        loadMoreWhenScroll() {
            if (this.selected == 1) {
                this.loadMoreForReclaim();

            } else if (this.selected == 2) {
                this.loadMoreForDisposition();

            } else {
                this.loadMoreForTrash();
            }
        },
        loadMoreForReclaim() {
            if (this.data.reclaim.loading) {
                return;
            }
            if (this.data.reclaim.pageIndex >= this.data.reclaim.pageNum && this.data.reclaim.pageNum > 0) {
                this.data.reclaim.allLoad=true;
                return;
            }
            this.data.reclaim.pageIndex = this.data.reclaim.pageIndex + 1;
            this.loadMore("hs", this.data.reclaim.pageIndex, this.data.reclaim);
        },

        loadMoreForDisposition() {
            if (this.data.disposition.loading) {
                return;
            }
            if (this.data.disposition.pageIndex >= this.data.disposition.pageNum && this.data.disposition.pageNum > 0) {
                this.data.disposition.allLoad=true;
                return;
            }
            this.data.disposition.pageIndex = this.data.disposition.pageIndex + 1;
            this.loadMore("cz", this.data.disposition.pageIndex, this.data.disposition);
        },
        loadMoreForTrash() {
            if (this.data.trash.loading) {
                return;
            }
            if (this.data.trash.pageIndex >= this.data.trash.pageNum && this.data.trash.pageNum > 0) {
                this.data.trash.allLoad=true;
                return;
            }
            this.data.trash.pageIndex = this.data.trash.pageIndex + 1;
            this.loadMore("cf", this.data.trash.pageIndex, this.data.trash);
        },

        loadMore(enterpriseType, pageIndex, data) {
            let _this = this;
            data.loading = true;            
            this.$axios({
                method: "post",
                url: "/company/moreEnterpriseLibrary",
                data: {
                    pageIndex: pageIndex,
                    pageSize: 10,
                    enterpriseType: enterpriseType,
                    industry: "",
                    mainProducts: "",
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

    }
}
</script>

<style lang="less" scoped>
.enterprise {
    border-top: 6px solid #f1f1f1;
}

.swipe {
    height: 20px;
    width: 100%;
}

.box {
    display: flex;
    flex-direction: row
}

.img {
    width: 100%;
    height: 100px;
}

.tab_container {
    margin-top: 2px;
}

.row_box {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}
.column_box{
    background: #fff;
    width:46%;
    height: 170px;
    margin: 5px;
    border-radius: 6px;
    box-shadow: 0 0 3px #ACACAC;
    overflow: auto;

    img {
        height: 100px;
    }

    .companyname {
        background: #fff;
        color: #333;
        font-size: 16px;
        font-weight: bold;
        height: 30px;
    }

    .introduce {
        background: #fff;
        color: #333;
        font-size: 12px;
        height: 30px;
    }
}

.mint-navbar .mint-tab-item.is-selected {
    border-bottom: 2px solid #26a2ff;
    margin-bottom: 0px;
}


body{
 background-color: #fff;   
}
.mint-navbar .mint-tab-item.is-selected{
 border-bottom: 2px solid #26a2ff;
 margin-bottom: 0px;
}

.mint-header-title {
    flex: auto;
    margin: 0;
    webkit-box-flex: 2;
}

.mint-searchbar-inner .mintui-search {
    font-size: 18px;
}

</style>
