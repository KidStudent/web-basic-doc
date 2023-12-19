<template>
  <div class="plate-num" :class="size">
    <div
      v-if="size === 'super' || size === 'super2'"
      class="super-box"
      :style="{ background: getColorType(color).color }"
    >
      <div :class="'plate-' + getColorType(color).class">
        <span class="license-plate" :style="getColorType(color).style">{{ plateNo || '--' }}</span>
      </div>
    </div>
    <span
      v-else
      title="点击复制车牌号"
      :class="['license-plate-small cursor-p', getColorType(color).class]"
      :style="getColorType(color).style"
    >
      {{ plateNo || '--' }}
    </span>
  </div>
</template>

<script setup>
  import colorDictionary from './color.dictionary.json';
  defineProps({
    color: {
      type: String,
      default: 'H',
    },
    plateNo: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
  });

  const getColorType = (color) => {
    return colorDictionary.colorType[color] || colorDictionary.colorType['5'];
  };
</script>

<style lang="scss" scoped>
  .plate-white,
  .white::after {
    border: 1px solid #131313;
  }

  .plate-yellow,
  .yellow::after {
    border: 1px solid #131313;
  }

  .plate-green,
  .green::after {
    border: 1px solid #131313;
  }

  .plate-blue,
  .blue::after {
    border: 1px solid #fff;
  }

  .plate-black,
  .black::after {
    border: 1px solid #fff;
  }

  .plate-other,
  .other::after {
    border: 1px solid #fff;
  }

  .plate-num {
    position: relative;
    display: flex;
    justify-content: center;
  }

  .mini {
    width: 88px;
    padding: 2px;

    span {
      display: flex;
      font-size: 12px;
      align-items: center;
      justify-content: center;
    }
  }

  .medium {
    bottom: 0 !important;
    height: 40px !important;

    span {
      padding: 8px 12px;
      font-size: 16px;
    }
  }

  .super-box {
    padding: 5px;
    border-radius: 3px;
  }

  .super {
    padding: 5px;

    span {
      height: 100%;
      padding: 0 18px;
      font-size: 30px;
      line-height: inherit;
    }
  }

  .super2 {
    padding: 0;
    justify-content: flex-start;

    span {
      height: 100%;
      padding: 0 18px;
      font-size: 16px;
      line-height: inherit;
    }
  }
</style>
