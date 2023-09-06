<template>
  <el-dialog
    :model-value="dialogVisable"
    title="結果"
    width="80%"
    :before-close="handleClose"
  >
    <div class="text-xl">
      {{ `得分(正確/總題數)： ${score} / ${total}` }}
    </div>
    <div class="mt-5 text-2xl">
      <span>正確率: </span>
      <span
        :class="rate > 60 ? 'text-green-500' : 'text-red-500'"
        class="text-3xl font-extrabold"
      >
        {{ `${rate}%` }}
      </span>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">關閉</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
defineProps({
  dialogVisable: Boolean,
  score: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  rate: {
    type: Number,
    required: true,
  },
});

const emit = defineEmits(["close"]);

const handleClose = () => {
  emit("close");
};
</script>

<style lang="scss" scoped></style>
