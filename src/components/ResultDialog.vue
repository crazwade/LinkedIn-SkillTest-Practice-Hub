<template>
  <el-dialog
    :model-value="dialogVisable"
    title="結果"
    width="80%"
    :before-close="handleClose"
  >
    <span>
      {{ `得分(正確/總題數)： ${score} / ${total}` }}
    </span>
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
});

const emit = defineEmits(["close"]);

const handleClose = () => {
  emit("close");
};
</script>

<style lang="scss" scoped></style>
