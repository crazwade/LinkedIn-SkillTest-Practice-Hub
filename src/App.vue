<template>
  <el-card
    class="exam-card max-w-screen-md mx-auto px-5 py-3 mb-8 w-[90%]"
    v-for="(item, index) in dataContent.questions"
    :key="index"
  >
    <h2 class="exam-title text-xl font-semibold mb-4">
      {{ `${index + 1}. ${item.question}` }}
    </h2>
    <pre
      v-if="item.code"
      class="py-5 px-3 bg-gray-300 whitespace-pre-wrap mb-3"
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
          'is-Selected': !dataContent.showAnswer && item.userAnswer === option,
          'correct-answer': dataContent.showAnswer && option === item.answer,
          'wrong-answer':
            dataContent.showAnswer &&
            option === item.userAnswer &&
            option !== item.answer,
        }"
        @click="selectThis(index, option)"
      >
        {{ option }}
      </label>
    </div>
  </el-card>
  <el-button type="primary" @click="checkAnswers">Submit</el-button>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dataContent = ref({
  showAnswer: false,
  questions: [
    {
      question: "How can you check your current git version?",
      options: ["git --v", "git --version", "git --option", "git --current"],
      answer: "git --version",
      userAnswer: "",
    },
    {
      question:
        "What command lets you create a connection between a local and remote repository?",
      options: [
        "git remote add new",
        "git remote add origin",
        "git remote new origin",
        "git remote origin",
      ],
      answer: "git remote add origin",
      userAnswer: "",
    },
    {
      question:
        "Looking at the following commands, describe what is happening.",
      code: `git checkout feature-user-location
git cherry-pick kj2342134sdf090093f0sdgasdf99sdfo992mmmf9921231`,
      options: [
        "The commit is being tagged for release on the feature-user-location branch",
        "A commit is being copied from its original branch over to the feature-user-location branch",
        "The commit is being cherry picked as the new HEAD of the commit history",
        "A commit is being copied from the feature-user-location branch to the master branch",
        "The branch is switched to the feature-user-location branch, and the specified commit is applied to the branch.",
      ],
      answer:
        "A commit is being copied from its original branch over to the feature-user-location branch",
      userAnswer: "",
    },
  ],
});

const checkAnswers = () => {
  // 檢查是否有未填
  if (dataContent.value.questions.find((item) => item.userAnswer === "")) {
    return;
  }
  dataContent.value.showAnswer = true;
};

const selectThis = (questionsIndex: number, answer: string) => {
  // 檢查是否已經結算
  if (dataContent.value.showAnswer) {
    return;
  }
  dataContent.value.questions[questionsIndex].userAnswer = answer;
};
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
</style>
