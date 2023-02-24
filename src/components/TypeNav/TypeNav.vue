<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <!-- <div @mouseleave="unlightItem();hideNavList()" @mouseenter="showNavList"> -->
      <div @mouseleave="handleHideNav" @mouseenter="showNavList">
        <h2 class="all">全部商品分类</h2>
        <transition name="nav">
          <div class="sort" v-show="displayNav">
            <div class="all-sort-list2" @click="goSearch">
              <div
                class="item"
                v-for="(c1, index) in limitedCatagorList"
                :key="c1.categoryId"
                @mouseenter="highlightItem(index)"
                :class="{ active: index === currentIndex }"
              >
                <h3>
                  <a
                    :data-category-name="c1.categoryName"
                    :data-category-id="c1.categoryId"
                    >{{ c1.categoryName }}</a
                  >
                  <!-- <router-link to="/search">{{ c1.categoryName }}</router-link> -->
                </h3>
                <div class="item-list clearfix">
                  <div
                    class="subitem"
                    v-for="c2 in c1.categoryChild"
                    :key="c2.categoryId"
                  >
                    <dl class="fore">
                      <dt>
                        <a
                          :data-category-name="c2.categoryName"
                          :data-category-id="c2.categoryId"
                          >{{ c2.categoryName }}</a
                        >
                        <!-- <router-link to="/search">{{ c2.categoryName }}</router-link> -->
                      </dt>
                      <dd>
                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                          <a
                            :data-category-name="c3.categoryName"
                            :data-category-id="c3.categoryId"
                            >{{ c3.categoryName }}</a
                          >
                          <!-- <router-link to="/search">{{ c3.categoryName }}</router-link> -->
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
// 引入mapState
import { mapState } from "vuex";

export default {
  data() {
    return {
      // 三级菜单栏显示的最多目录数
      maxCatagoryNum: 16,
      currentIndex: -1,
      showNav: true,
    };
  },
  computed: {
    ...mapState({
      catagoryList: (state) => state.home.catagoryList,
    }),
    limitedCatagorList() {
      // 限制在三级菜单导航栏上显示的菜单树
      return this.catagoryList.filter(
        (catagory) => catagory.categoryId <= this.maxCatagoryNum
      );
    },
    // 控制一级导航菜单是否显示
    displayNav() {
      return this.showNav || this.$route.path === "/home";
    },
  },
  methods: {
    // 高亮鼠标选中的一级菜单
    highlightItem(index) {
      this.currentIndex = index;
    },
    // 取消一级菜单的高亮
    unlightItem() {
      this.currentIndex = -1;
    },
    // 点击三级导航中的菜单选项，跳转到search组件
    goSearch(event) {
      // 获取自定义属性值
      let { categoryName, categoryId } = event.target.dataset;
      let location = { name:'search', query:{categoryName, categoryId} };
      // 1.location.params是空对象 =》{}
      // 2.location.params不是空对象，但是keyword是空字符串 =》{keyword:undefined}
      // 3.keyword不是空字符串 => {keyword: this.$route.params.keyword}
      location.params = this.$route.params.keyword? {keyword: this.$route.params.keyword}: {keyword:undefined}
      this.$router.push(location);
    },
    // 显示一级菜单目录
    showNavList() {
      this.showNav = true;
    },
    // 隐藏一级菜单目录
    hideNavList() {
      this.showNav = false;
    },
    handleHideNav() {
      this.unlightItem();
      this.hideNavList();
    },
  },
  beforeMount() {
    this.hideNavList();
  },
  mounted() {
    // 获取数据
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &:hover {
            .item-list {
              display: block;
            }
          }
        }

        .active {
          background-color: skyblue;
        }
      }
    }

    // 三级菜单导航动画样式
    .nav-enter {
      // height:0px;
      opacity: 0;
    }

    .nav-enter-to {
      // height:461px;
      opacity: 1;
    }

    .nav-enter-active {
      transition: all 0.5s linear;
    }

    .nav-leave {
      // height:0px;
      opacity: 1;
    }

    .nav-leave-to {
      // height:461px;
      opacity: 0;
    }

    .nav-leave-active {
      transition: all 0.5s linear;
    }
  }
}
</style>