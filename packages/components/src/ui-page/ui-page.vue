<template>
  <div :class="[bem.b()]">
    <slot name="leftButton" />
    <div>
      <div v-if="!simplePage" class="fl total-count">
        共<span class="total-text"> {{ formatNum(totalCount) }} </span>条记录
      </div>
      <ul class="page-body fr">
        <li
          class="page-item page-turning border"
          :class="{ 'page-disabled': pageNum === 1 }"
          @click="previousPage(pageNum)"
        >
          <Icon type="ios-arrow-back" />
        </li>
        <li v-if="!simplePage" class="fl overflow">
          <div>
            <!-- 当页码大于5时显示1 -->
            <div v-if="pageNum > 5" class="page-item border" @click="jumpPage(1)"> 1 </div>
            <!-- 当页码大于5时可以向前跳转5页 -->
            <div
              v-if="pageNum > 5"
              class="page-item border"
              title="向前5页"
              @click="jumpPage(pageNum - 5)"
            >
              <Icon type="ios-more" />
            </div>
            <!-- 当页码大于5时只显示当前页码前面两个页面 如当前页码为6 则显示4,5 -->
            <div v-if="pageNum > 5" class="fl border">
              <div
                v-for="item in 2"
                :key="item"
                class="page-item"
                @click="jumpPage(pageNum - 3 + item)"
              >
                {{ pageNum - 3 + item }}
              </div>
            </div>
            <!-- 当页码小于5时显示页码之前所有的页码 如当前页码为4 则显示1,2,3 -->
            <div v-if="pageNum <= 5" class="fl">
              <div
                v-for="(item, index) in pageNum - 1"
                :key="index"
                class="page-item border"
                @click="jumpPage(item)"
              >
                {{ item }}
              </div>
            </div>
            <!-- 当前页码 -->
            <div class="page-item page-item-active border" @click="jumpPage(pageNum)">
              {{ pageNum }}
            </div>
            <!-- 当总页码-当前页码 大于等于5时 显示当前页面后两个 如当前页码为10 则显示11,12 -->
            <div v-if="totalPage - pageNum >= 5" class="fl">
              <div
                v-for="item in 2"
                :key="item"
                class="page-item border"
                @click="jumpPage(pageNum + item)"
              >
                {{ pageNum + item }}
              </div>
            </div>
            <!-- 当总页码-当前页码 小于5时 显示当前页码后的所有页码 如当前页码为17 则显示18,19,20 -->
            <div v-if="totalPage - pageNum < 5" class="fl">
              <div
                v-for="(item, index) in totalPage - pageNum"
                :key="index"
                class="page-item border"
                @click="jumpPage(pageNum + item)"
              >
                {{ pageNum + item }}
              </div>
            </div>
            <!-- 当总页码-当前页码大于5时 显示跳转后5页 -->
            <div
              v-if="totalPage - pageNum >= 5"
              class="page-item border"
              title="向后5页"
              @click="jumpPage(pageNum + 5)"
            >
              <Icon type="ios-more" />
            </div>
            <!-- 当总页码-当前页码大于5时 显示最后一页 -->
            <div
              v-if="totalPage - pageNum >= 5 && hasLast"
              class="page-item border"
              @click="jumpPage(totalPage)"
            >
              {{ totalPage }}
            </div>
          </div>
        </li>
        <li v-if="!!simplePage" class="fl overflow">
          <!-- 当前页码 -->
          <div class="page-item page-item-active border">
            {{ pageNum }}
          </div>
        </li>
        <li
          class="page-item page-turning border"
          :class="{ 'page-disabled': pageNum === totalPage }"
          @click="nextPage(pageNum)"
        >
          <Icon type="ios-arrow-forward" />
        </li>
        <Select
          :model-value="pageSize"
          class="page-selection fl"
          :transfer="transfer"
          @on-change="changePageSize"
        >
          <Option v-for="item in pageList" :key="item.value" :value="item.value">
            {{ item.label }}
          </Option>
        </Select>
        <li v-if="hasLast" class="page-item total-page border"> 共{{ totalPage }}页 </li>
        <div v-if="!simplePage && hasLast" class="page-jump">
          跳至<InputNumber
            v-model.number="jumpNum"
            class="page-input"
            :max="totalPage"
            :min="1"
            @keyup.enter="jumpPage(jumpNum)"
          />
          页
        </div>
      </ul>
    </div>
  </div>
</template>
<script setup>
  import { ref, computed } from 'vue';
  import { formatNum, createNamespace } from '@web-basic-doc/utils';
  const bem = createNamespace('page');

  defineOptions({
    name: 'ui-page',
  });
  const props = defineProps({
    /**
     * totalCount:数据总数
     * pageNum:当前页码
     * pageSize:当前页码条数
     */
    totalCount: {
      type: Number,
      required: true,
    },
    pageNum: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 20,
    },
    // 是否包含最后一页
    hasLast: {
      type: Boolean,
      default() {
        return true;
      },
    },
    simplePage: {
      type: Boolean,
      default() {
        return false;
      },
    },
    transfer: {
      type: Boolean,
      default: false,
    },
    pageList: {
      type: Array,
      default() {
        return [
          { label: '10 条/页', value: 10 },
          { label: '20 条/页', value: 20 },
          { label: '50 条/页', value: 50 },
          { label: '100 条/页', value: 100 },
        ];
      },
    },
  });
  const emit = defineEmits(['changePage', 'changePageSize', 'update:pageNum', 'update:pageSize']);

  let jumpNum = ref(null);
  const totalPage = computed(() =>
    props.totalCount === 0 ? 1 : Math.ceil(props.totalCount / props.pageSize),
  );

  function jumpPage(page) {
    emit('update:pageNum', page);
    emit('changePage', page);
  }
  function previousPage(page) {
    if (page === 1) {
      return false;
    }
    emit('update:pageNum', page - 1);
    emit('changePage', page - 1);
  }
  function nextPage(page) {
    if (page === totalPage.value) {
      return false;
    }
    emit('update:pageNum', page + 1);
    emit('changePage', page + 1);
  }
  function changePageSize(pageSize) {
    emit('update:pageNum', 1);
    emit('update:pageSize', pageSize);
    emit('changePageSize', pageSize);
  }
</script>
