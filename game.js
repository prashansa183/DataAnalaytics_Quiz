const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

let questions = [
  {
    "question": "What does ETL stand for in data analytics?",
    "choice1": "Extract, Transform, Load",
    "choice2": "Extract, Transfer, Load",
    "choice3": "Extract, Transform, Locate",
    "choice4": "Extract, Transfer, Locate",
    "answer": 1
  },
  {
    "question": "Which of the following is a common data visualization tool?",
    "choice1": "TensorFlow",
    "choice2": "Tableau",
    "choice3": "PyTorch",
    "choice4": "Keras",
    "answer": 2
  },
  {
    "question": "What is the purpose of a data warehouse?",
    "choice1": "To store raw data",
    "choice2": "To analyze real-time data",
    "choice3": "To integrate and store large volumes of data for analysis",
    "choice4": "To clean and preprocess data",
    "answer": 3
  },
  {
    "question": "Which of the following is a measure of central tendency?",
    "choice1": "Standard Deviation",
    "choice2": "Variance",
    "choice3": "Median",
    "choice4": "Range",
    "answer": 3
  },
  {
    "question": "Which Python library is commonly used for data manipulation and analysis?",
    "choice1": "NumPy",
    "choice2": "Pandas",
    "choice3": "SciPy",
    "choice4": "Matplotlib",
    "answer": 2
  },
  {
    "question": "What type of chart is best for showing the relationship between two variables?",
    "choice1": "Bar Chart",
    "choice2": "Pie Chart",
    "choice3": "Scatter Plot",
    "choice4": "Line Chart",
    "answer": 3
  },
  {
    "question": "In SQL, which clause is used to filter the results of a query?",
    "choice1": "WHERE",
    "choice2": "SELECT",
    "choice3": "FROM",
    "choice4": "GROUP BY",
    "answer": 1
  },
  {
    "question": "What does OLAP stand for?",
    "choice1": "Online Analytical Processing",
    "choice2": "Online Analysis Processing",
    "choice3": "Online Access Processing",
    "choice4": "Online Accumulation Processing",
    "answer": 1
  },
  {
    "question": "Which of the following is NOT a type of machine learning?",
    "choice1": "Supervised Learning",
    "choice2": "Unsupervised Learning",
    "choice3": "Reinforcement Learning",
    "choice4": "Direct Learning",
    "answer": 4
  },
  {
    "question": "Which of the following statements is true about Big Data?",
    "choice1": "It only refers to the size of the data.",
    "choice2": "It is characterized by the three V's: Volume, Velocity, and Variety.",
    "choice3": "It is always structured data.",
    "choice4": "It does not require special tools for processing.",
    "answer": 2
  }
]
;

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("end.html");
  }
  questionCounter++;
  questionCounterText.innerText = `${questionCounter}/${MAX_QUESTIONS}`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();