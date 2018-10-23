<template>
  <div>
    <el-collapse v-model="activeNames" @change="handleChange" accordion>
      <el-collapse-item title="一致性 Consistency" name="1">
        <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
        <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
      </el-collapse-item>
      <el-collapse-item title="反馈 Feedback" name="2">
        <group-title>测试列表</group-title>
        <group>
          <cell-box>
            cell-box
          </cell-box>
          <cell-box>
            cell-box
          </cell-box>
          <cell-box>
            cell-box
          </cell-box>
          <cell-box>
            cell-box
          </cell-box>
        </group>
      </el-collapse-item>
      <el-collapse-item title="效率 Efficiency" name="3">
        <div>简化流程：设计简洁直观的操作流程；</div>
        <div>清晰明确：语言表达清晰且表意明确，让用户快速理解进而作出决策；</div>
        <div>帮助用户识别：界面简单直白，让用户快速识别而非回忆，减少用户记忆负担。</div>
      </el-collapse-item>
      <el-collapse-item title="可控 Controllability" name="4">
        <div>用户决策：根据场景可给予用户操作建议或安全提示，但不能代替用户进行决策；</div>
        <div>结果可控：用户可以自由的进行操作，包括撤销、回退和终止当前操作等。</div>
      </el-collapse-item>
    </el-collapse>
    <group-title>
      手风琴样式，具体参数参考 <a href="http://element-cn.eleme.io/#/zh-CN/component/collapse" target="_blank">elementUi</a>
    </group-title>
  </div>
</template>

<script>
  export default {
    name: 'collapseView',
    data() {
      return {
        activeNames: ['1']
      };
    },
    methods: {
      handleChange(val) {
        console.log(val);
      }
    }
  }
</script>

<style lang="less" scoped>

</style>
