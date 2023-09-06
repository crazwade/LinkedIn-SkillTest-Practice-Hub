import GIT from "./exam/gitExam.md?raw";
import FRD from "./exam/fedExam.md?raw";
import CSS from "./exam/cssExam.md?raw";

export const mdToQuestions = (target: string) => {
  let lines;
  switch (target) {
    case "git":
      lines = GIT.split("\n");
      break;
    case "frd":
      lines = FRD.split("\n");
      break;
    case "css":
      lines = CSS.split("\n");
      break;
    default:
      console.log("error");
  }
  const questions = [];
  let currentQuestion;
  // 程式法範例區
  let code = "";
  // 檢查範例程式碼區是否為標題到問題之間
  let checkCodeBlock = false;
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
        answer: "",
        userAnswer: "",
      };
    } else if (line.startsWith("- [ ] ")) {
      checkCodeBlock = false;
      // 選項
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      currentQuestion.options.push(line.slice(6).trim());
    } else if (line.startsWith("- [x] ")) {
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
