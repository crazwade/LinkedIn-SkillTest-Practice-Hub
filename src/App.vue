<template>
  <el-card class="exam-card" v-for="(item, index) in dataContent.questions" :key="index">
    <h2 class="exam-title">{{ `${index + 1}. ${item.question}` }}</h2>
    <div class="exam-options">
      <label class="exam-label" v-for="(option, optionIndex) in item.options" :key="optionIndex">
        <input type="radio" :name="`question-${index}`" :value="option" v-model="item.userAnswer" :disabled="dataContent.showAnswer" :class="{ 'correct-answer': dataContent.showAnswer && option === item.answer && option === item.userAnswer, 'wrong-answer': dataContent.showAnswer && option === item.userAnswer && option !== item.answer }">
        <span :class="{ 'correct-answer': dataContent.showAnswer && option === item.answer, 'wrong-answer': dataContent.showAnswer && option === item.userAnswer && option !== item.answer }">{{ option }}</span>
      </label>
    </div>
  </el-card>
  <el-button type="primary" @click="checkAnswers">Submit</el-button>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const dataContent = ref({
  showAnswer: false,
  questions: [
    {
      question: "Question 1",
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: 'Option A',
      userAnswer: '',
    },
    {
      question: "Question 2",
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      answer: 'Option A',
      userAnswer: '',
    },
  ]
});

const checkAnswers = () => {
  dataContent.value.showAnswer = true;
};

</script>

<style scoped>
.exam-card {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  margin-bottom: 20px;
  width: 80%;
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

.exam-label {
  display: flex;
  justify-content: center;
  align-items: center;
}
.exam-label input {
  margin-right: 10px;
}

.correct-answer {
  color: green !important;
}

.wrong-answer {
  color: red !important;
}

input[type='radio'].correct-answer:checked:after {
  background-color: green;
}

input[type='radio'].wrong-answer:checked:after {
  background-color: red;
}

input[type='radio']:after {
  width: 15px;
  height: 15px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}

input[type='radio']:checked:after {
  width: 13px;
  height: 13px;
  border-radius: 15px;
  top: -2px;
  left: -1px;
  position: relative;
  content: '';
  display: inline-block;
  visibility: visible;
  border: 2px solid white;
}
</style>
