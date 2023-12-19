<template>
  <div class="warning-popup-content" ref="popupRef">
    <div class="title"> {{ point.alarmLevel }} </div>
    <div class="close" @click="closePopup" title="关闭报警" />
    <div class="content">
      <div class="contrast">
        <template v-if="point.messageType === 'faceAlarms'">
          <ui-image
            width="100px"
            height="100px"
            :src="point.alarmPicUrl"
            :error-src="defaultPhoto"
          />
          <span class="img-type img-alarm">报警照片</span>
          <div class="percent">
            <img :src="infoPercent" alt="" />
            <span>{{ point.similarity }}%</span>
          </div>
          <ui-image
            width="100px"
            height="100px"
            :src="point.taskPicUrl"
            :error-src="defaultPhoto"
          />
          <span class="img-type img-control">布控照片</span>
        </template>
        <template v-else>
          <ui-image
            width="100px"
            height="100px"
            :src="point.alarmPicUrl"
            :error-src="defaultPhoto"
          />
          <div>
            <div>
              <plate-no :color="point.plateColor" :plate-no="point.plateNo" size="super" />
            </div>
            <div class="mt-md">
              <span class="message-title">布控来源：</span>
              <span class="message-info">{{ point.taskLibName }}</span>
            </div>
            <div class="mt-md">
              <span class="message-title">车主姓名：</span>
              <span class="message-info">{{ point.carOwner }}</span>
            </div>
          </div>
        </template>
      </div>
      <div class="message">
        <div class="mb-sm" v-if="point.messageType === 'faceAlarms'">
          <span class="people-name">{{ point.name }}</span>
          <span class="people-type" v-if="point.taskLibName"> （{{ point.taskLibName }}） </span>
        </div>
        <div
          ><span class="message-title">报警时间：</span>
          <span class="message-info">{{ point.alarmTime }}</span>
        </div>
        <div
          ><span class="message-title">报警设备：</span>
          <span class="message-info">{{ point.deviceName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import infoPercent from '/images/map//minemap/info-percent.png';
  import defaultPhoto from '/images/map//minemap/default-photo.png';
  import plateNo from '../plate-no/index.vue';
  import { ref } from 'vue';

  const props = defineProps({
    point: {
      type: Object,
      default: () => {},
    },
  });
  const emit = defineEmits(['closeWarningPopup']);
  const popupRef = ref(null);

  const closePopup = () => {
    emit('closeWarningPopup', props.point.id);
  };

  defineExpose({
    popupRef,
  });
</script>

<style lang="scss" scoped>
  .warning-popup-content {
    width: 400px;
    height: 260px;
    padding: 5px;
    background-image: url('/images/map//minemap/info-bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    // position: absolute;
    // top: 10px;
    // left: 10px;
    .title {
      position: relative;
      top: -10px;
      margin: 0 50px;
      font-size: 16px;
      color: #fff;
      text-align: center;
      background-image: url('/images/map//minemap/info-title.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .close {
      position: absolute;
      top: 10px;
      right: 15px;
      width: 15px;
      height: 15px;
      cursor: pointer;
      background-image: url('/images/map//minemap/info-close.png');
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }

    .content {
      display: flex;
      height: calc(100% - 10px);
      padding: 10px 40px;
      align-items: center;
      flex-direction: column;

      .message {
        width: 100%;
        margin-top: 15px;

        .people-name {
          font-size: 16px;
          color: #fff;
        }

        .people-type {
          font-size: 14px;
          color: #e8655b;
        }
      }

      .message-title {
        font-size: 14px;
        color: #edbab6;
      }

      .message-info {
        font-size: 14px;
        color: #ffeeed;
      }

      .contrast {
        position: relative;
        display: flex;
        width: 100%;
        align-items: center;
        justify-content: space-around;

        :deep(.super) {
          justify-content: flex-start;

          .license-plate {
            font-size: 16px;
          }
        }

        .percent {
          position: relative;
          display: flex;
          width: 90px;
          height: 90px;
          margin: 0 20px;
          font-size: 16px;
          color: #fff;
          justify-content: center;
          align-items: center;
        }

        .img-type {
          position: absolute;
          top: 0;
          padding: 5px;
          font-size: 14px;
          color: #fff;
          background-color: rgb(0 0 0 / 70%);

          &.img-alarm {
            left: 0;
          }

          &.img-control {
            right: 0;
          }
        }

        img {
          position: absolute;
          z-index: 0;
          width: 100%;
          height: 100%;
          animation: percentAnimation 10s infinite linear;
        }
      }
    }
  }

  @keyframes percentAnimation {
    from {
      transform: rotate(0);
    }

    to {
      transform: rotate(360deg);
    }
  }
</style>
