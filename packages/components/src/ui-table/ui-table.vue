<template>
  <Table
    ref="tableRef"
    :class="[
      bem.b(),
      loading ? 'no-scroll' : null,
      tableData && tableData.length === 0 ? 'no-shadow' : null,
    ]"
    :columns="columns"
    :height="fullHeight"
    :max-height="maxHeight"
    :data="tableData"
    :row-key="rowKey"
    :highlight-row="false"
    :loading="loading"
    :no-data-text="noDataText"
    :show-summary="showSummary"
    @on-select="oneSelected"
    @on-select-cancel="cancelSelected"
    @on-select-all="onSelectAll"
    @on-select-all-cancel="cancelAllSelected"
  >
    <template v-for="item in slotList" #[item.slot]="{ row, column, index }">
      <slot :name="item.slot" :column="column" :row="row" :index="index" />
    </template>
    <template #loading>
      <ui-loading />
    </template>
  </Table>
</template>
<script setup>
  import {
    onMounted,
    onUpdated,
    watch,
    nextTick,
    onBeforeUnmount,
    createApp,
    getCurrentInstance,
    ref,
    reactive,
  } from 'vue';
  import UiLoading from '../ui-loading/ui-loading.vue';
  import UiTableTips from './ui-table-tips.vue';
  import { createNamespace, emptyJSX, emptyJSXDark, deepCopy } from '@web-basic-doc/utils';
  import classes from '@web-basic-doc/theme-chalk/src/mixins/config.module.scss';
  const bem = createNamespace('table');
  const { proxy } = getCurrentInstance();

  const props = defineProps({
    // 是否启用数据改变，表格自动滚动致顶部
    tableScroll: {
      type: Boolean,
      default: true,
    },
    tableColumns: {
      type: Array,
      required: true,
    },
    tableData: {
      type: Array,
      required: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    maxHeight: {
      type: Number,
      default: 0,
    },
    nofill: {
      type: Boolean,
      default: false,
    },
    rowKey: {
      type: String,
      default: 'id',
    },
    showSummary: {
      type: Boolean,
      default: false,
    },
    specialJsx: {
      type: String,
      default: '',
    },
    // 数据更新之后保留之前选中的数据（需指定 row-key）
    reserveSelection: {
      type: Boolean,
      default: false,
    },
    // 默认传入store的值
    defaultStoreData: {
      type: Array,
      default: () => [],
    },
    // 全选，配合defaultStoreData运用
    isAll: {
      type: Boolean,
      default: false,
    },
  });

  const emit = defineEmits([
    'cancelSelectTable',
    'storeSelectList',
    'cacelAllSelectTable',
    'onSelectAllTable',
    'oneSelected',
  ]);

  let columns = ref([]);
  let tipsShow = ref(null);
  let fullHeight = ref(null);
  let slotList = reactive([]);
  let storeSelectTable = ref([]); // 多选存储
  let hasScroll = ref(false);
  const tableRef = ref(null);
  let noDataText = ref(null);

  const setNoDataText = () => {
    if (!props.loading) {
      if (props.specialJsx) {
        noDataText.value = props.specialJsx;
      } else {
        if (document.documentElement.getAttribute(`${classes.namespace}-skin`) === 'dark') {
          noDataText.value = emptyJSXDark;
        } else {
          noDataText.value = emptyJSX;
        }
      }
    }
  };

  // 手动关闭温馨提示
  const xclose = () => {
    tipsShow.value = false;
    sessionStorage.setItem('tipsShow', false);
    let tipsDom = document.getElementsByClassName(`${classes.namespace}-table-tips`)[0];
    tipsDom.style.display = 'none';
  };

  const handleTips = () => {
    // 有ivu-table-overflowX属性才添加tips
    findCurrentOverflowX();
    // 如果默认关闭就不执行
    if (!hasScroll.value || !tipsShow.value) return;
    // 添加tips插入搭配table固定栏右侧
    let tipsDom = document.getElementsByClassName(`${classes.namespace}-table-tips`)[0];
    !tipsDom ? (tipsDom = addTips()) : controlDisplay();
  };

  const findCurrentOverflowX = () => {
    // 如果当前document有好几个table组件，找到页面上真正展示的
    let uiTableEles = Array.from(document.getElementsByClassName(`${classes.namespace}-table`));
    if (!uiTableEles.length) return;
    let realTable = document.getElementsByClassName(`${classes.namespace}-table`)[0];
    uiTableEles.forEach((item) => {
      if (item.getBoundingClientRect().width) {
        realTable = item;
      }
    });
    let _hasScroll = realTable.getElementsByClassName('ivu-table-overflowX')[0];
    hasScroll.value = !!_hasScroll;
  };

  const addTips = () => {
    let fixDom = tableRef.value.$refs.fixedRightBody;
    let contentDom = document.getElementsByClassName('ivu-table-fixed-right')[0];
    if (!fixDom) return;
    const tipsApp = createApp(UiTableTips, { xclose: xclose });
    const div = document.createElement('div');
    tipsApp.mount(div);
    contentDom.appendChild(div);
    let tipsDom = document.getElementsByClassName(`${classes.namespace}-table-tips`)[0];
    tipsDom.style.right = contentDom.clientWidth + 10 + 'px';
    controlDisplay();
  };

  const controlDisplay = () => {
    // 没有数据隐藏
    let tipsDom = document.getElementsByClassName(`${classes.namespace}-table-tips`)[0];
    props.tableData.length ? (tipsDom.style.display = 'block') : (tipsDom.style.display = 'none');
    // 控制tips显示5s就隐藏
    setTimeout(() => {
      tipsDom.style.display = 'none';
    }, 5000);
  };

  const cancelSelected = (selection, row) => {
    emit('cancelSelectTable', selection, row);
    if (!props.reserveSelection) return;
    let hasIndex = storeSelectTable.value.findIndex(
      (item) => item[props.rowKey] === row[props.rowKey],
    );
    row._checked = false;
    storeSelectTable.value.splice(hasIndex, 1);
    emit('storeSelectList', storeSelectTable.value);
  };

  const cancelAllSelected = (selection) => {
    emit('cacelAllSelectTable', selection);
    if (!props.reserveSelection) return;
    let tableRowKeys = [];
    props.tableData.forEach((item) => {
      item._checked = false;
      tableRowKeys.push(item[props.rowKey]);
    });
    storeSelectTable.value = storeSelectTable.value.filter((item) => {
      return !tableRowKeys.includes(item[props.rowKey]);
    });
    emit('storeSelectList', storeSelectTable.value);
  };

  const onSelectAll = (selection) => {
    emit('onSelectAllTable', selection);
    if (!props.reserveSelection) return;
    let storeSelectTableKeys = storeSelectTable.value.map((item) => {
      item._checked = true;
      return item[props.rowKey];
    });
    selection.forEach((item) => {
      if (!storeSelectTableKeys.includes(item[props.rowKey])) {
        storeSelectTable.value.push(item);
      }
    });
    emit('storeSelectList', storeSelectTable.value);
  };

  const oneSelected = (selection, row) => {
    emit('oneSelected', selection, row);
    if (!props.reserveSelection) return;
    row._checked = true;
    storeSelectTable.value.push(row);
    emit('storeSelectList', storeSelectTable.value);
  };
  const resize = (el) => {
    // 如果为有总价则高度要减去总价高度
    if (props.maxHeight) return;
    fullHeight.value = props.showSummary
      ? el.offsetHeight - (48 * parseFloat(document.documentElement.style.fontSize)) / 192
      : el.offsetHeight;
  };
  const assemblyContent = (list) => {
    list.forEach((row) => {
      if (row.slot) {
        slotList.push(row);
      }
      if (row.children) {
        assemblyContent(row.children);
      }
    });
  };

  watch(
    () => props.tableData,
    () => {
      // 滚动底部切换自动置顶
      if (props.tableScroll) {
        setTimeout(() => {
          try {
            tableRef.value.$el.children[0].children[1].scroll(0, 0);
          } catch (err) {
            console.log(err);
          }
        }, 500);
      }

      if (!props.reserveSelection) return;
      props.tableData.forEach((item) => {
        item._checked = props.isAll;
        item._disabled = props.isAll;
      });
      if (!props.isAll) {
        let tableObject = {};
        props.tableData.forEach((item) => {
          tableObject[item[props.rowKey]] = item;
          item._checked = false;
        });
        storeSelectTable.value.forEach((item) => {
          if (item[props.rowKey] in tableObject) {
            tableObject[item[props.rowKey]]._checked = true;
          }
        });
      }
    },
  );

  watch(
    () => props.loading,
    (val) => {
      if (val) {
        let tipsDom = document.getElementsByClassName(`${classes.namespace}-table-tips`)[0];
        tipsDom ? (tipsDom.style.display = 'none') : null;
      } else {
        // 解决列表左右两侧固定列，重新获取数据重置tableData为空时，scrollTop没有和bodyscrollTop保持统一的问题 导致列表错乱
        nextTick(() => {
          !!tableRef.value.$refs.fixedBody &&
            (tableRef.value.$refs.fixedBody.scrollTop = tableRef.value.$refs.body.scrollTop);
          !!tableRef.value.$refs.fixedRightBody &&
            (tableRef.value.$refs.fixedRightBody.scrollTop = tableRef.value.$refs.body.scrollTop);
        });
      }
    },
  );

  watch(
    () => props.isAll,
    (val) => {
      storeSelectTable.value = [];
      props.tableData.forEach((item) => {
        item._checked = val;
        item._disabled = val;
      });
    },
  );

  watch(
    () => props.defaultStoreData,
    // val定值范围数组 || Blooen(控制全选)
    (val) => {
      storeSelectTable.value = deepCopy(val);
      // 全选全部选中
      if (props.isAll) {
        return;
      }
      // 没有默认存储
      if (!val.length) {
        props.tableData.forEach((item) => {
          item._checked = false;
        });
        return;
      }
      // 有存储选中
      let tableObject = {};
      props.tableData.forEach((item) => {
        tableObject[item[props.rowKey]] = item;
        item._checked = false;
      });
      storeSelectTable.value.forEach((item) => {
        if (item[props.rowKey] in tableObject) {
          tableObject[item[props.rowKey]]._checked = true;
        }
      });
    },
  );

  watch(
    () => props.tableColumns,
    (val) => {
      assemblyContent(val);
      columns.value = val;
    },
  );

  onMounted(() => {
    nextTick(() => {
      setNoDataText();
    });
    tipsShow.value = sessionStorage.getItem('tipsShow') ?? true;
    assemblyContent(props.tableColumns);
    // columns必须在插槽生成之后赋值，否则会报错
    columns.value = props.tableColumns;
    if (props.nofill) return;
    // 监听dom变化
    tableRef.value.observer.listenTo(proxy.$el, resize);
  });

  onUpdated(() => {
    // 控制显示隐藏
    let tipsDom = document.getElementsByClassName(`${classes.namespace}-table-tips`)[0];
    tipsDom ? (tipsDom.style.display = 'none') : null;
    setTimeout(() => {
      handleTips();
    }, 0);
  });

  onBeforeUnmount(() => {
    tableRef.value.observer.removeListener(proxy.$el, resize);
  });
</script>
