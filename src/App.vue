<template>
  <el-card class="exam-card" v-for="(item, index) in questions" :key="index">
    <h2 class="exam-title">{{ `${index}. ${item.question}` }}</h2>
    <el-radio-group v-model="selectedAnswer" class="exam-options">
      <el-radio v-for="(option, index) in item.options" :key="index" :label="option">{{ option }}</el-radio>
    </el-radio-group>
  </el-card>
  <el-button type="primary" @click="checkAnswer">Submit</el-button>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const questions = [
  {
    question: "Question 1",
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    answer: 'Option A',
  },
  {
    question: "Question 1",
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    answer: 'Option A',
  },
  {
    question: "Question 1",
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    answer: 'Option A',
  },
  {
    question: "Question 1",
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    answer: 'Option A',
  },
  {
    question: "Question 1",
    options: ['Option A', 'Option B', 'Option C', 'Option D'],
    answer: 'Option A',
  },
  // 可以添加更多的考題到這裡
];

const currentQuestionIndex = ref(0);
const selectedAnswer = ref('');
const showFeedback = ref(false);

const isCorrect = ref(false);

const checkAnswer = () => {
  isCorrect.value = selectedAnswer.value === questions[currentQuestionIndex.value].answer;
  showFeedback.value = true;
};

onMounted(() => {
  // 可以在這裡做初始化等操作
});
</script>

<style scoped>
.exam-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  margin-bottom: 20px;
}

.exam-title {
  font-size: 24px;
  margin-bottom: 20px;
}

.exam-options {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}
</style>
