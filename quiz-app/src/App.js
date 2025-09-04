import { useState, useEffect } from "react";
import QuestionCard from "./components/QuestionCard.js";
import Results from "./components/Results.js";

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);

  //  Load questions from the Trivia API
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const res = await fetch("https://opentdb.com/api.php?amount=5&type=multiple");
        const data = await res.json();

        const formatted = data.results.map((q) => {
          const options = [...q.incorrect_answers];
          const correctIndex = Math.floor(Math.random() * 4);
          options.splice(correctIndex, 0, q.correct_answer);

          return {
            question: q.question,
            options,
            correctIndex,
          };
        });

        setQuestions(formatted);
        setLoading(false);
      } catch (err) {
        console.error("Error loading questions:", err);
      }
    };

    loadQuestions();
  }, []);

  const handleNext = () => {
    const currentQuestion = questions[currentIndex];
    const isCorrect = selectedOption === currentQuestion.correctIndex;

    const updatedAnswers = [
      ...answers,
      {
        question: currentQuestion.question,
        selected: currentQuestion.options[selectedOption],
        correct: currentQuestion.options[currentQuestion.correctIndex],
        isCorrect,
      },
    ];
    setAnswers(updatedAnswers);

    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setAnswers([]);
    setShowResults(false);
    setLoading(true);
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <h2 className="text-xl font-semibold text-gray-700">Loading questions...</h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold text-blue-600 mb-6">Quiz App</h1>

      <div className="w-full max-w-xl bg-white shadow-md rounded-xl p-6">
        {showResults ? (
          <Results answers={answers} total={questions.length} onRestart={handleRestart} />
        ) : (
          <QuestionCard
            question={questions[currentIndex]}
            currentIndex={currentIndex}
            total={questions.length}
            selectedOption={selectedOption}
            onSelect={setSelectedOption}
            onNext={handleNext}
          />
        )}
      </div>
    </div>
  );
}

export default App;
