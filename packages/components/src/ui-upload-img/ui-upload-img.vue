<template>
  <div :class="[bem.b(), 'over-flow']">
    <div v-for="(item, index) in successData" :key="index" class="upload-item">
      <div class="upload-list">
        <ui-image :src="item.fileUrl" :preview="false" />
        <div class="upload-list-cover">
          <Icon type="ios-trash-outline" @click="handleRemove(item, index)" />
        </div>
      </div>
    </div>
    <Upload
      v-if="successData.length < multipleNum"
      ref="uploadRef"
      :on-success="handleSuccess"
      :on-error="handleError"
      :max-size="maxSize"
      :on-format-error="handleFormatError"
      :on-exceeded-size="handleMaxSize"
      :before-upload="handleBeforeUpload"
      :show-upload-list="false"
      :headers="headers"
      :action="action"
      type="drag"
      name="file"
      class="upload-item"
      v-bind="attrs"
    >
      <slot v-if="!loading">
        <div class="upload-label card-bg">
          <Icon type="ios-add" />
          <span class="upload-text f-12 label-color">上传图片</span>
        </div>
      </slot>
      <slot name="loadingDom" v-if="loading">
        <div class="loader-box">
          <div class="loader">
            <svg
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              width="24px"
              height="30px"
              viewBox="0 0 24 30"
              style="enable-background: new 0 0 50 50"
              xml:space="preserve"
            >
              <rect x="0" y="13" width="4" height="5" fill="#ff6700">
                <animate
                  attributeName="height"
                  attributeType="XML"
                  values="5;21;5"
                  begin="0s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  attributeType="XML"
                  values="13; 5; 13"
                  begin="0s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="10" y="13" width="4" height="5" fill="#ff6700">
                <animate
                  attributeName="height"
                  attributeType="XML"
                  values="5;21;5"
                  begin="0.15s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  attributeType="XML"
                  values="13; 5; 13"
                  begin="0.15s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </rect>
              <rect x="20" y="13" width="4" height="5" fill="#ff6700">
                <animate
                  attributeName="height"
                  attributeType="XML"
                  values="5;21;5"
                  begin="0.3s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="y"
                  attributeType="XML"
                  values="13; 5; 13"
                  begin="0.3s"
                  dur="0.6s"
                  repeatCount="indefinite"
                />
              </rect>
            </svg>
          </div>
        </div>
      </slot>
    </Upload>
  </div>
</template>
<script lang="jsx" setup>
  import { useAttrs, onMounted, getCurrentInstance, ref, watch } from 'vue';
  import { createNamespace } from '@web-basic-doc/utils';

  defineOptions({
    name: 'UiUploadImg',
  });
  const bem = createNamespace('upload');
  const { proxy } = getCurrentInstance();
  const attrs = useAttrs();
  const uploadRef = ref(null);
  const successData = ref([]);
  let loading = ref(false);
  const emit = defineEmits(['on-choose', 'on-before-upload', 'on-error', 'on-remove']);
  const props = defineProps({
    // 设置上传的请求头部
    headers: {},
    // 上传的地址，必填
    action: {
      type: String,
      default: '//jsonplaceholder.typicode.com/posts/',
    },
    // 最大上传图片张数
    multipleNum: {
      type: Number,
      default: 3,
    },
    // 默认已经上传的照片
    defaultList: {
      type: Array,
      default: () => {
        return [];
      },
    },
  });
  onMounted(() => {});
  watch(
    props.defaultList,
    () => {
      if (!props.defaultList.length) return;
      successData.value = props.defaultList.map((item) => {
        return {
          fileUrl: item,
        };
      });
    },
    {
      deep: true,
      immediate: true,
    },
  );
  const maxSize = 2048;
  const format = ['jpg', 'jpeg', 'png'];
  const handleBeforeUpload = (file) => {
    emit('on-before-upload', file);
    loading.value = true;
  };
  const handleError = (file, fileList) => {
    loading.value = false;
    proxy.$Message.error('上传图片失败');
    emit('on-error', file, fileList);
  };
  const handleMaxSize = () => {
    loading.value = false;
    proxy.$Message.error(`上传图片大于${attrs?.[maxSize] ?? maxSize}kb请选择合适的图片`);
  };
  const handleSuccess = (data) => {
    successData.value.push(data.data);
    emit('on-choose', successData.value);
    loading.value = false;
  };
  const handleRemove = (file, index) => {
    successData.value.splice(index, 1);
    emit('on-choose', successData.value);
    emit('on-remove', file);
  };
  // 外部调用
  const clear = () => {
    successData.value = [];
  };
  const handleFormatError = () => {
    proxy.$Message.error(`请上传以下文件类型:${attrs?.format.join(',') ?? format.join(',')}`);
    loading.value = false;
  };
  const handleClick = () => {
    uploadRef.value.handleClick();
  };
  defineExpose({
    clear,
    handleClick,
  });
</script>
<style lang="scss" scoped></style>
