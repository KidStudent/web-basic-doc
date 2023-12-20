<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  let theme = ref(null);
  const themeList = [
    {
      label: '浅色模式',
      value: 'light',
    },
    {
      label: '深色模式',
      value: 'dark',
    },
  ];

  // 点击对应的颜色块进行一键换肤
  function changeTheme(val) {
    // 将对应的数据存储到localStorage，方便后续使用
    localStorage.setItem('type', val);
    // 全局添加样式名称：data-skin，并在localStorage获取对应的样式名称的值。
    window.document.documentElement.setAttribute(
      'web-basic-skin',
      localStorage.getItem('type') || '',
    );
  }

  function getTheme() {
    //  获取localStorage中存进去的type
    const type = localStorage.getItem('type');
    /**
     *  判断 localStorage 中的 type 是否为空，如果为空的话，就给默认的颜色（页面初始化的颜色），如
     *  果不为空的话就将对应获取到的值给到 data-skin
     **/
    if (type) {
      window.document.documentElement.setAttribute(
        'web-basic-skin',
        localStorage.getItem('type') || '',
      );
    } else {
      window.document.documentElement.setAttribute('web-basic-skin', 'dark');
    }
  }
  let echartOption = ref({});
  const uploadRef = ref(null);
  const uploadFile = () => {
    uploadRef.value.handleClick();
  };

  onMounted(() => {
    getTheme();
    echartOption.value = {
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      legend: {
        data: ['销量'],
      },
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    };
  });
</script>

<template>
  <div class="app">
    <Select style="width: 200px" v-model="theme" @on-change="changeTheme">
      <Option v-for="(item, index) in themeList" :key="index" :value="item.value"
        >{{ item.label }}
      </Option>
    </Select>
    <draw-echarts :echart-option="echartOption" />
    <ui-image
      style="width: 200px; height: 200px"
      src="https://file.iviewui.com/images/image-demo-1.jpg"
      :url-list="[
        'https://file.iviewui.com/images/image-demo-1.jpg',
        'https://file.iviewui.com/images/image-demo-2.jpg',
        'https://file.iviewui.com/images/image-demo-3.jpg',
      ]"
    />
    <ui-image
      style="width: 200px; height: 200px"
      src="https://file.iviewui.com/images/image-demo-2.jpg"
      :url-list="[
        'https://file.iviewui.com/images/image-demo-1.jpg',
        'https://file.iviewui.com/images/image-demo-2.jpg',
        'https://file.iviewui.com/images/image-demo-3.jpg',
      ]"
    />
    <ui-image
      style="width: 200px; height: 200px"
      src="https://file.iviewui.com/images/image-demo-3.jpg"
    />
    <ui-upload-img ref="uploadRef" />
    <Button @click="uploadFile" style="width: 200px">上传文件</Button>
  </div>
</template>

<style scoped>
  .app {
    display: flex;
    height: 100%;
    overflow: hidden;
    flex-direction: column;
    flex: 1;
  }

  [web-basic-skin='dark'] .app {
    background-color: #041129;
  }
</style>
