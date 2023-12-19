<template>
  <div ref="echartsRef" class="echarts height-full" :style="style" />
</template>

<script setup>
  import * as _echarts from 'echarts';
  import {
    nextTick,
    onBeforeUnmount,
    watch,
    getCurrentInstance,
    ref,
    computed,
    markRaw,
    onMounted,
  } from 'vue';
  import { deepCopy } from '@web-basic-doc/utils';
  import classes from '@web-basic-doc/theme-chalk/src/mixins/config.module.scss';
  const { proxy } = getCurrentInstance();

  const props = defineProps({
    echartStyle: {
      type: Object,
      default() {
        return {
          height: '200px',
          width: '100%',
        };
      },
    },
    echartOption: {
      type: Object,
      required: true,
    },
    echartLoading: {
      type: Boolean,
      default: null,
    },
  });

  const emit = defineEmits([
    'echartClick',
    'echartMouseover',
    'echartMouseout',
    'echartLegendselectchanged',
  ]);

  let dataEcharts = markRaw({
    echarts: null,
  });
  const echartsRef = ref(null);
  let resizer = null;
  let style = ref({ ...props.echartStyle });

  const checkOption = () => {
    let hasLoadingTag = typeof props.echartLoading === 'boolean';
    let optionLength = props.echartOption ? Object.keys(props.echartOption).length : 0;
    if (hasLoadingTag || !!optionLength) {
      initEcharts();
    }
    // 有echartsLoding标志，并且没数据
    if (hasLoadingTag && !optionLength) {
      console.log('无初始化echarts数据');
    }
  };

  const initEcharts = () => {
    if (dataEcharts.echarts) {
      _echarts.dispose(echartsRef.value);
      dataEcharts.echarts = null;
    }
    dataEcharts.echarts = _echarts.init(echartsRef.value);
    dataEcharts.echarts.setOption(props.echartOption);
    //添加点击事件
    dataEcharts.echarts.on('click', (params) => {
      emit('echartClick', params);
    });
    dataEcharts.echarts.on('mouseover', (params) => {
      emit('echartMouseover', params);
    });
    dataEcharts.echarts.on('mouseout', (params) => {
      emit('echartMouseout', params);
    });
    // 图例点击事件
    dataEcharts.echarts.on('legendselectchanged', (params) => {
      emit('echartLegendselectchanged', params);
    });

    // 监听dom变化
    resizer = new ResizeObserver(() => {
      resize();
    });
    resizer.observe(proxy.$el);
  };

  const resize = () => {
    setTimeout(() => {
      dataEcharts.echarts.resize();
    }, 10);
  };

  const setOption = (option, { notMerge = false, lazyUpdate }) => {
    dataEcharts.echarts.setOption(option, { notMerge, lazyUpdate });
  };

  const showLoading = () => {
    const skin = document.documentElement.getAttribute(`${classes.namespace}-skin`);
    dataEcharts.echarts.showLoading({
      text: '加载中',
      color: skin === 'dark' ? '#2B84E2' : '#2c86f8',
      textColor: skin === 'dark' ? '#fff' : '#000',
      maskColor: skin === 'dark' ? '#08264d' : '#fff',
      zlevel: 0,
    });
  };

  const hideLoading = () => {
    dataEcharts.echarts.hideLoading();
  };

  watch(
    () => props.echartOption,
    (val) => {
      nextTick(() => {
        dataEcharts.echarts ? setOption(val, { notMerge: true }) : checkOption();
      });
    },
  );

  watch(
    () => props.echartLoading,
    (val) => {
      if (dataEcharts.echarts) {
        val ? showLoading() : hideLoading();
      }
    },
    {
      immediate: true,
    },
  );

  onMounted(() => {
    style = computed(() => {
      let tempObj = deepCopy(props.echartStyle);
      Object.keys(tempObj).forEach((key) => {
        if (tempObj[key].indexOf('px') !== -1) {
          tempObj[key] =
            parseInt(tempObj[key]) / (parseFloat(document.documentElement.style.fontSize) || 16) +
            'rem';
        }
      });
      return tempObj;
    });
    checkOption();
  });

  onBeforeUnmount(() => {
    if (dataEcharts.echarts) {
      _echarts.dispose(echartsRef.value);
      dataEcharts.echarts = null;
    }
    resizer.disconnect();
  });
</script>
