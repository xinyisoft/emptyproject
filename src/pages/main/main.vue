<template>
  <div>
    <group-title>DEMO</group-title>
    <group>
      <cell-box link="/pages/example/link1" is-link>
        跳转到测试
      </cell-box>
      <cell-box link="/pages/example/testXY" is-link>
        XY方法测试
      </cell-box>
      <cell-box link="/pages/example/icons" is-link>
        图标
      </cell-box>
      <cell-box link="/pages/example/draglist" is-link>
        可拖动列表
      </cell-box>
      <cell-box link="/pages/example/collapse" is-link>
        手风琴
      </cell-box>
    </group>
    <group-title>权限</group-title>
    <group>
      <cell-box link="/pages/example/auth" is-link>
        权限包裹标签
      </cell-box>
    </group>
    <group-title>Tree</group-title>
    <group>
      <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick"></el-tree>
    </group>
    <group-title>滚动数字</group-title>
    <group>
      <count-to :end="2534">
      </count-to>
    </group>
  </div>
</template>
<script>
  export default {
    name: 'mainView',
    data() {
      return {
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        }
      }
    },
    methods: {
      test() {
        console.log('test')
      },
      handleNodeClick(data) {
        console.log(data);
      }
    },
    created() {
      var that = this;
      this.$store.commit('setNavigationTools', [
        {
          icon: 'add',
          click: function () {
            that.test()
          }
        },
        {
          icon: 'reorder',
          child: [
            {
              title: '测试添加',
              icon: 'add',
              click: function () {
                that.test()
              }
            }
          ]
        }
      ])
    }
  }
</script>
<style lang="less" scoped>

</style>
