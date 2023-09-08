<template>
  <ResultDialog
    :score="score"
    :total="dataContent.questions.length"
    :rate="scoreRate"
    :dialogVisable="ResultDialogVisable"
    @close="handleDialogClose"
  />
  <div
    class="showup w-full mb-5 h-[200px] flex justify-center items-center text-slate-950"
    :class="{ 'show-effect': isTitleVisible }"
  >
    <div
      class="font-extrabold"
      style="
        text-shadow: rgba(0, 0, 0, 0.4) 0.2em 0.2em 0.3em;
        font-size: min(10vw, 70px);
      "
    >
      {{ themeTitle }}
    </div>
  </div>
  <div
    v-if="!startExam"
    class="flex flex-col w-full justify-center items-center h-3/5 py-6 rounded-[5%] shadow-lg bg-white"
  >
    <div class="flex flex-col justify-center items-baseline mb-3">
      <label class="font-bold text-2xl">主題</label>
      <el-select
        v-model="selectExam.title"
        class="m-2"
        placeholder="Select"
        size="large"
        @change="newTheme"
      >
        <el-option
          v-for="item in examTitle"
          :key="item.value"
          :label="item.title"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="flex flex-col justify-center items-baseline mb-3">
      <label class="font-bold text-2xl">題數</label>
      <el-select
        v-model="selectExam.total"
        class="m-2"
        placeholder="Select"
        size="large"
      >
        <el-option
          v-for="item in [10, 20, 30]"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <el-button type="primary" class="mt-5" @click="getExam">Start</el-button>
  </div>
  <div v-else>
    <el-card
      class="exam-card max-w-screen-md mx-auto px-5 py-3 mb-8 w-[90%]"
      v-for="(item, index) in dataContent.questions"
      :key="index"
    >
      <h2 class="exam-title text-xl font-semibold mb-4">
        {{ `Q${index + 1}. ${item.question}` }}
      </h2>
      <pre
        v-if="item.code"
        class="py-5 px-3 bg-slate-800 text-gray-300 whitespace-pre-wrap mb-3 overflow-auto"
        >{{ item.code }}</pre
      >
      <div
        class="exam-options mb-[20px] flex flex-col justify-center items-start"
      >
        <label
          class="exam-label flex justify-center items-center cursor-pointer py-1 px-3 w-full bg-slate-200 my-2 hover:bg-slate-300"
          v-for="(option, optionIndex) in item.options"
          :key="optionIndex"
          :class="{
            'is-Selected':
              !dataContent.showAnswer && item.userAnswer === option,
            'correct-answer': dataContent.showAnswer && option === item.answer,
            'wrong-answer':
              dataContent.showAnswer &&
              option === item.userAnswer &&
              option !== item.answer,
          }"
          @click="selectThis(index, option)"
        >
          <div v-if="item.optionCode[optionIndex]" class="overflow-auto">
            <div class="py-5 px-3 bg-gray-300 whitespace-pre-wrap my-3">
              {{ item.optionCode[optionIndex] }}
            </div>
          </div>
          <div v-else class="overflow-auto">
            {{ option }}
          </div>
        </label>
      </div>
    </el-card>
    <el-button type="primary" @click="checkAnswers()"> 察看結果</el-button>
    <el-button type="info" @click="restart()"> 重來</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import ResultDialog from "./components/ResultDialog.vue";
import { mdToQuestions } from "./mdToQuestions";

const examTitle = [
  {
    title: "Git",
    value: "git",
  },
  {
    title: "CSS",
    value: "css",
  },
  {
    title: "Front-end Development",
    value: "frd",
  },
  {
    title: "HTML",
    value: "html",
  },
  {
    title: "JavaScript",
    value: "js",
  },
  {
    title: "PHP",
    value: "php",
  },
  {
    title: "MySQL",
    value: "mysql",
  },
];

const selectExam = ref({
  title: "",
  total: 10,
});

const dataContent = ref<{
  showAnswer: boolean;
  questions: {
    question: string;
    options: string[];
    optionCode: string[];
    answer: string;
    userAnswer: string;
    code?: string;
  }[];
}>({
  showAnswer: false,
  questions: [],
});
const ResultDialogVisable = ref(false);
const startExam = ref(false);
const score = ref(0);
const scoreRate = ref(0);

const checkAnswers = () => {
  score.value = 0;
  scoreRate.value = 0;
  // 檢查是否有未填
  if (dataContent.value.questions.find((item) => item.userAnswer === "")) {
    alert("尚未完成作答");
    return;
  }
  dataContent.value.showAnswer = true;

  dataContent.value.questions.forEach((item) => {
    if (item.answer === item.userAnswer) {
      score.value += 1;
    }
  });

  scoreRate.value = Math.floor((score.value / selectExam.value.total) * 100);
  ResultDialogVisable.value = true;
};

const restart = () => {
  themeTitle.value = "Linkedin Skilltest";
  selectExam.value.title = "";
  selectExam.value.total = 10;
  dataContent.value.showAnswer = false;

  startExam.value = false;
};

const handleDialogClose = () => {
  ResultDialogVisable.value = false;
};

const selectThis = (questionsIndex: number, answer: string) => {
  // 檢查是否已經結算
  if (dataContent.value.showAnswer) {
    return;
  }
  dataContent.value.questions[questionsIndex].userAnswer = answer;
};

const getExam = () => {
  if (selectExam.value.title === "") return;

  const getQuestion = [...mdToQuestions(selectExam.value.title)];
  // 隨機
  const randomSelection = [];
  // 随机选择10个元素并打乱顺序
  for (let i = 0; i < selectExam.value.total; i++) {
    const randomIndex = Math.floor(Math.random() * getQuestion.length);
    const selectedElement = getQuestion.splice(randomIndex, 1)[0];
    randomSelection.push(selectedElement);
  }
  dataContent.value.questions = randomSelection;
  // dataContent.value.questions = getQuestion;

  startExam.value = true;
};

// 選擇主題的效果

const themeTitle = ref("Linkedin Skilltest");

const newTheme = () => {
  if (selectExam.value.title === "") {
    return;
  }
  const gettitle = examTitle.find(
    (item) => item.value === selectExam.value.title,
  );

  if (gettitle === undefined) {
    return;
  }

  themeTitle.value = gettitle.title;
};

const isTitleVisible = ref(true);

// 間聽主題變化
watch(
  () => selectExam.value.title,
  () => {
    isTitleVisible.value = false;
    setTimeout(() => {
      isTitleVisible.value = true;
    }, 300);
  },
);
</script>

<style scoped>
.is-Selected {
  background-color: #79bbff;
}

.correct-answer {
  background-color: #66eb71;
}

.wrong-answer {
  background-color: #f36f6f;
}

.showup {
  /* 初始状态样式 */
  opacity: 0;
  transform: translateY(-100px);
}

.show-effect {
  /* 有值时的样式 */
  opacity: 1;
  transform: translateY(0px);
  transition:
    opacity 0.5s,
    transform 0.5s;
}

.shadow-lg {
  box-shadow:
    10px 30px 30px -1px rgba(0, 0, 0, 0.1),
    0 2px 40px -1px rgba(0, 0, 0, 0.06);
}
</style>
