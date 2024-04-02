<script setup lang="ts">
// import { RouterView } from 'vue-router'
import ElButton from './components/Button/Button.vue'
import ElIcon from './components/Icon/Icon.vue'
import ElButtonGroup from './components/ButtonGroup/ButtonGroup.vue'
import ElLink from './components/Link/Link.vue'
// import ElContainer from './components/Container/Container.vue'
// import ElAside from './components/Container/Aside.vue'
// import ElHeader from './components/Container/Header.vue'
// import ElFooter from './components/Container/Footer.vue'
// import ElMain from './components/Container/Main.vue'
// import ElCollapse from './components/Collapse/Collapse.vue'
// import ElCollapseItem from './components/Collapse/CollapseItem.vue'
</script>

<template>
  <!-- <RouterView /> -->

  <div>
    <!-- <el-container>
      <el-header></el-header>
      <el-container>
        <el-aside :width="1000"></el-aside>
        <el-main></el-main>
      </el-container>
      <el-footer></el-footer>
    </el-container>
    <el-button>按钮</el-button>
    <el-button type="danger" size="small" circle disabled>按钮</el-button>
    <el-button type="info">按钮</el-button>
    <el-button type="warning">按钮</el-button>
    <el-button type="success">按钮</el-button> -->
    <!-- <el-collapse :model-value="['nihao']">
      <el-collapse-item title="Feedback" name="2">
        <div>
          Operation feedback: enable the users to clearly perceive their operations by style updates
          and interactive effects;
        </div>
        <div>
          Visual feedback: reflect current state by updating or rearranging elements of the page.
        </div>
      </el-collapse-item>
    </el-collapse> -->

    <!-- 传入了loading -->
    <el-button loading>按钮1</el-button>
    <!-- 传入了icon属性 -->
    <el-button icon="arrow-right">按钮1</el-button>
    <el-icon icon="arrow-right" color="blue" shake></el-icon>
    <el-icon icon="star" size="2xs"></el-icon>
    <el-icon icon="image" beat></el-icon>
    <el-link type="danger" disabled>info</el-link>
    <el-link type="success" underline>info</el-link>
    <el-link type="danger" underline>info</el-link>
    <el-button-group>
      <el-button type="primary" icon="arrow-right">Previous Page</el-button>
      <el-button type="danger">aaa</el-button>
    </el-button-group>
  </div>
</template>

<style scoped></style>
