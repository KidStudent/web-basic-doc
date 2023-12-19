<template>
  <ul class="index-map-tool">
    <template v-for="(item, index) in toolMap">
      <li
        v-if="loadTool(item)"
        :title="item.title"
        :class="{ active: toolSelectdIndex === index }"
        :key="index"
        @click="
          item.fun();
          toolSelectdIndex = index;
        "
      >
        <img :src="item.icon" />
      </li>
    </template>
    <slot name="addTool" />
  </ul>
</template>

<script setup>
  import move from '/images/map/minemap/move.png';
  import rectangle from '/images/map/minemap/rectangle.png';
  import circle from '/images/map/minemap/circle.png';
  import polygon from '/images/map/minemap/polygon.png';
  import clear from '/images/map/minemap/clear.png';
  import close from '/images/map/minemap/close.png';
  import { ref } from 'vue';

  const props = defineProps({
    // 需要哪些默认操作传入数组
    mapTool: {
      type: Array,
      default: () => {
        return ['move', 'rectangle', 'circle', 'polygon', 'clear', 'close'];
      },
    },
  });

  const emit = defineEmits([
    'cancelDraw',
    'selectRect',
    'selectCircle',
    'selectPolygon',
    'clearDraw',
    'closeTool',
  ]);

  const toolSelectdIndex = ref(0);
  const loadTool = (item) => {
    return props.mapTool.findIndex((row) => row === item.value) !== -1;
  };
  const cancelDraw = () => {
    emit('cancelDraw');
  };
  const selectRect = () => {
    emit('selectRect');
  };
  const selectCircle = () => {
    emit('selectCircle');
  };
  const selectPolygon = () => {
    emit('selectPolygon');
  };
  const clearDraw = () => {
    emit('clearDraw');
  };
  const closeTool = () => {
    emit('closeTool');
  };
  const toolMap = [
    {
      title: '移动',
      icon: move,
      fun: cancelDraw,
      value: 'move',
    },
    {
      title: '矩形框选',
      icon: rectangle,
      fun: selectRect,
      value: 'rectangle',
    },
    {
      title: '圆形框选',
      icon: circle,
      fun: selectCircle,
      value: 'circle',
    },
    {
      title: '多边形框选',
      icon: polygon,
      fun: selectPolygon,
      value: 'polygon',
    },
    {
      title: '清除',
      icon: clear,
      fun: clearDraw,
      value: 'clear',
    },
    {
      title: '关闭',
      icon: close,
      fun: closeTool,
      value: 'close',
    },
  ];
</script>

<style lang="scss" scoped>
  .index-map-tool {
    position: absolute;
    bottom: 100px;
    left: 50%;
    z-index: 725;
    height: 40px;
    margin-left: -115px;
    background: #1f4772;

    li {
      display: flex;
      float: left;
      width: 45px;
      height: 100%;
      text-align: center;
      cursor: pointer;
      align-items: center;
      justify-content: center;

      &:hover {
        background-color: #1e60a6;
      }

      i {
        display: block;
        width: 24px;
        height: 24px;
        background-repeat: no-repeat;
      }
    }

    .active {
      background-color: #1e60a6;
    }
  }
</style>
