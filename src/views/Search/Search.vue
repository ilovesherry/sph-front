<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 关键字 -->
            <li class="with-x" v-if="this.searchParams.keyword">
              {{ searchParams.keyword }}<i @click="removeKeyword">×</i>
            </li>
            <!-- 分类名称 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName
              }}<i @click="removeCategoryName">×</i>
            </li>
            <!-- 品牌名 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(':')[1] }}<i @click="removeTrademark">×</i>
            </li>
            <!-- 属性值 -->
            <li class="with-x" v-show="searchParams.props.length > 0" v-for="(prop,index) in searchParams.props" :key="index">
              {{ prop.split(':')[1] }}<i @click="removeProp(index)">×</i>
            </li>
            
          </ul>
        </div>

        <!--selector-->
        <SearchSelector />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:orderIndex == '1'}" @click="setOrder('1')">
                  <a href="#">综合<span v-show="orderIndex == '1' && orderSequence == 'asc'">⬆</span><span v-show="orderIndex == '1' && orderSequence == 'desc'">⬇</span></a>
                </li>
                <li :class="{active:orderIndex == '2'}" @click="setOrder('2')">
                  <a href="#">价格<span v-show="orderIndex == '2' && orderSequence == 'asc'">⬆</span><span v-show="orderIndex == '2' && orderSequence == 'desc'">⬇</span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="goods in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank"
                      ><img :src="goods.defaultImg"
                    /></a> -->
                    <router-link :to="`/detail/${goods.id}`"><img v-lazy="goods.defaultImg"
                    /></router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ goods.price }}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" :title="goods.title">{{
                      goods.title
                    }}</a>
                  </div>
                  <div class="commit">
                    <i class="command"
                      >已有<span>{{ Math.floor(Math.random() * 5500) }}</span
                      >人评价</i
                    >
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页导航组件 -->
          <pagination :page-info="pageInfo"></pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  components: {
    SearchSelector
  },
  data() {
    return {
      searchParams: {
        categoryId: this.$route.query.categoryId || undefined,
        categoryName: this.$route.query.categoryName || undefined,
        keyword: this.$route.params.keyword || undefined,
        order: "1:desc",
        pageNo: 1,
        pageSize: 3,
        props: [],
        trademark: undefined,
      }
    };
  },
  computed: {
    ...mapGetters(["goodsList", "pageInfo"]),
    // 排序字段
    orderIndex() {
      return this.searchParams.order.split(':')[0]
    },
    // 排序升序降序
    orderSequence() {
      return this.searchParams.order.split(':')[1]
    }
  },
  watch: {
    $route: {
      handler(to, from) {
        console.log("@$route", to, from);
        Object.assign(this.searchParams, this.$route.params, this.$route.query)
        this.getData(); 
      },
    },
  },
  methods: {
    // 请求数据
    getData() {
      let params = {
        categoryId: 0,
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 10,
        props: [],
        trademark: "",
      };
      Object.assign(params, this.searchParams);
      console.log("@GetData searchParams", params);
      // 请求商品搜索结果
      this.$store.dispatch("getSearchResults", params);
      // this.$store.dispatch("getSearchResults", {});
    },
    // 面包屑导航，删除分类名称
    removeCategoryName() {
      this.searchParams.categoryName = undefined;
      this.searchParams.categoryId = undefined;
      this.$router.push({
        name: "search",
        params: { keyword: this.searchParams.keyword || undefined },
      });
    },
    // 面包屑导航，清除关键字
    removeKeyword() {
      // console.log("@remove keyword", this.$route);
      this.searchParams.keyword = undefined;
      this.$bus.$emit("resetKeyword");
      this.$router.push({
        name: "search",
        params: { keyword: this.searchParams.keyword || undefined },
        query: this.q,
      });
    },
    // 面包屑导航,清除品牌
    removeTrademark() {
      this.searchParams.trademark = undefined
      this.getData()
    },
    // 面包屑导航，清除某个属性值
    removeProp(index) {
      // console.log('@removeProp', index)
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 切换排序字段以及升序降序
    setOrder(sortIndex) {
      console.log('@setOrder', typeof sortIndex)
      let newOrder = ''
      if(this.orderIndex == sortIndex) {
        // 当原来排序字段和当前点击的排序字段相同
        newOrder = `${this.orderIndex}:${this.orderSequence == 'desc'? 'asc': 'desc'}`
      } else {
        // 当原来排序字段与当前点击不同
        newOrder = `${sortIndex}:desc`
      }
      this.searchParams.order = newOrder
      this.getData()
    }
  },
  mounted() {
    this.getData();
    // 监听注册全局事件
    // 根据品牌信息搜索
    this.$bus.$on("searchTrademark", mark => {
      this.searchParams.trademark = `${mark.tmId}:${mark.tmName}`;
      this.getData();
    });
    // 按照属性信息查询
    this.$bus.$on('searchAttr', (attr, attrOption) => {
      console.log('@Search', attr, attrOption)
      let prop = `${attr.attrId}:${attrOption}:${attr.attrName}`
      if(!this.searchParams.props.includes(prop)) {
        this.searchParams.props.push(prop)
      }
      this.getData()
    })
    // 根据页码查询
    this.$bus.$on("change-page", pn => {
      console.log('@changePage', pn)
      this.searchParams.pageNo = pn
      this.getData()
    })
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      
    }
  }
}
</style>