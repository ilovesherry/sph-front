<template>
  <div class="fr page">
    <div class="sui-pagination clearfix">
      <ul>
        <li class="prev"  :class="{disabled:pageNo == 1}">
          <a @click="pageUp">上一页</a>
        </li>
        <li v-show="start > 1" @click="gotoPage(1)"><a>1</a></li>
        <li class="dotted" v-show="start > 2"><span>...</span></li>
        <li v-for="(pn,index) in pagesDisplay" :key="index" :class="{active:pn == pageNo}" @click="gotoPage(pn)">
          <a>{{ pn }}</a>
        </li>
        <li class="dotted" v-show="end < totalPages-1"><span>...</span></li>
        <li v-show="end < totalPages" @click="gotoPage(totalPages)"><a>{{ totalPages }}</a></li>
        <li class="next"  :class="{disabled:pageNo == totalPages}">
          <a @click="pageDown">下一页</a>
        </li>
      </ul>
      <div><span v-show="showTotalPages">共{{ totalPages }}页&nbsp;</span>
           <span v-show="showTotal">共{{ total }}项&nbsp;</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  data() {
    return {
        // 连续页配置数
        cotinuous: 5,
        minContinuous: 3,
        maxContinuous: 9,
        showInputPage: false,
        showTotalPages: true,
        showTotal: false,
        start: 0,
        end: 0
    }
  },
  props:["pageInfo"],
  computed: {
    pageNo() {
        return this.pageInfo.pageNo
    },
    pageSize() {
        return this.pageInfo.pageSize
    },
    totalPages() {
        return this.pageInfo.totalPages
    },
    total() {
        return this.pageInfo.total
    },
    pagesDisplay() {
        let start = this.pageNo - Math.floor(this.cotinuous / 2)
        start = start < 1? 1: start
        let end = this.pageNo + Math.floor(this.cotinuous / 2)
        end = end > this.totalPages? this.totalPages: end
        while(end - start + 1 < this.cotinuous) {
            if(start == 1 && end != this.totalPages) { // 当左端到达首页时，让end往右移动
                end++
            } else if(start != 1 && end == this.totalPages) { // 当右端到达首页时，让start往左移动
                start--
            } else { // 当两边都到达尽头时，直接跳出循环
                break;
            }
        }
        // 如果当start为2时或者end为totalPages-1时，与两端单独标签相连，为保证continuous正确，所以需要调整
        if(start == 2 && (end - start + 1 == this.cotinuous)) {
            end--
        }

        if(end == this.totalPages-1 && (end - start + 1 == this.cotinuous)) {
            start++
        }


        this.start = start
        this.end = end

        let pages = []
        // 计算连续页最左边
        for(let i=this.start; i<=this.end; i++) {
            pages.push(i)
        }
        return pages
    }
  },
  methods: {
    pageUp() {
        this.gotoPage(this.pageInfo.pageNo - 1)
    },
    pageDown() {
        this.gotoPage(this.pageInfo.pageNo + 1)
    },
    gotoPage(pn) {
        this.$bus.$emit('change-page', pn)
    }
  }
};
</script>

<style lang="less" scoped>
.page {
        // width: 733px; 原始长度
        width: 1000px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            // width: 490px;
            width: 600px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                //   background-color: #fff;
                //   color: #e1251b;
                //   border-color: #fff;
                  background-color: #e1251b;
                  color: #fff;
                  border-color: #e1251b;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                  pointer-events:none;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: left;
            // width: 241px;
            width: 400px;
          }
        }
      }
</style>