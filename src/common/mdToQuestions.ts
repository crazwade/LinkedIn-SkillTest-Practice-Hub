// 測試用
// import TEST from "../exam/test.md?raw";

export const mdToQuestions = async (target: string) => {
  // 動態引入 MD 檔案
  const mdFile = await import(`../exam/${target}Exam.md?raw`);
  // 測試用
  // lines = TEST.split("\n");
  const lines = mdFile.default.split("\n");
  const questions = [];
  let currentQuestion;
  // 程式法範例區
  let code = "";
  let answerCode = "";
  // 檢查範例程式碼區是否為標題到問題之間
  let checkCodeBlock = false;
  let checkAnswerBlock = false;
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  for (const line of lines) {
    if (line.startsWith("#### ")) {
      code = "";
      checkCodeBlock = true;
      // 開始一個新的問題
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      currentQuestion = {
        question: line.slice(5).trim().split(". ")[1],
        options: [],
        optionCode: [],
        answer: "",
        userAnswer: "",
      };
    } else if (line.startsWith("- [ ] ")) {
      if (checkAnswerBlock) {
        checkAnswerBlock = false;
      } else {
        checkAnswerBlock = true;
      }
      checkCodeBlock = false;
      // 選項
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      currentQuestion.options.push(line.slice(6).trim());
    } else if (line.startsWith("- [x] ")) {
      if (checkAnswerBlock) {
        checkAnswerBlock = false;
      } else {
        checkAnswerBlock = true;
      }
      checkCodeBlock = false;
      // 正確答案
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      currentQuestion.options.push(line.slice(6).trim());
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      currentQuestion.answer = line.slice(6).trim();
    } else if (line.startsWith("```")) {
      // 代碼塊
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      currentQuestion.code = line.slice(3).trim();
    } else if (checkCodeBlock) {
      if (line !== "") {
        code += `${line}\n`;
      }
    } else if (checkAnswerBlock) {
      if (line === "" && answerCode === "") {
        answerCode = "";
      } else if (line === "" && answerCode !== "") {
        checkAnswerBlock = false;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        currentQuestion.optionCode.push(answerCode);
        answerCode = "";
      } else {
        answerCode += `${line}\n`;
      }
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    currentQuestion.code = code;
  }

  if (currentQuestion) {
    questions.push(currentQuestion);
  }

  return questions;
};
