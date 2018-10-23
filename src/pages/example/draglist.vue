<template>
  <div>
    <group>
      <!-- 切记设置list1和list2属性时，一定要添加.sync修饰符 -->
      <drag-list :list.sync="list" :dropConClass="dropConClass" @on-change="handleChange">
      </drag-list>
    </group>
    <div class="handle-log-box">
      <h3>操作记录</h3>
      <div class="handle-inner-box">
        <p v-for="(item, index) in handleList" :key="`handle_item_${index}`">{{ item }}</p>
      </div>
    </div>
    <div class="res-show-box">
      <pre>{{ list }}</pre>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'drag_list_page',
    data() {
      return {
        list: [],
        dropConClass: [],
        handleList: []
      }
    },
    methods: {
      handleChange({oldIndex, newIndex}) {
        this.handleList.push(`${oldIndex} => ${newIndex}`)
      }
    },
    mounted() {
      this.list = [
        {
          "id": 1,
          "name": "测试1"
        },
        {
          "id": 2,
          "name": "测试2"
        },
        {
          "id": 3,
          "name": "测试3"
        }
      ];
    }
  }
</script>
<style lang="less">
  .handle-log-box {
    display: block;
    margin-left: 20px;
    border: 1px solid #eeeeee;
    vertical-align: top;
    height: 500px;
    h3 {
      padding: 10px 14px;
    }
    .handle-inner-box {
      height: ~"calc(100% - 44px)";
      overflow: auto;
      p {
        padding: 14px 0;
        margin: 0 14px;
        border-bottom: 1px dashed #eeeeee;
      }
    }
  }

  .res-show-box {
    display: inline-block;
    margin-left: 20px;
    border: 1px solid #eeeeee;
    vertical-align: top;
    width: 350px;
    height: 570px;
  }
</style>
