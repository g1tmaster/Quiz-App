function Results({ answers, total, onRestart }) {
  const score = answers.filter((a) => a.isCorrect).length;

  return (
    <div className="text-center space-y-6">
      {/* Title & Score */}
      <h1 className="text-2xl font-bold text-gray-800">Quiz Finished!</h1>
      <h2 className="text-lg font-semibold text-gray-700">
        You scored{" "}
        <span className="text-blue-600">
          {score}
        </span>{" "}
        / {total}
      </h2>

      {/* Summary */}
      <h3 className="text-xl font-semibold text-gray-800">Summary:</h3>
      <ul className="space-y-4 text-left">
        {answers.map((ans, idx) => (
          <li
            key={idx}
            className="p-4 border rounded-lg shadow-sm bg-white"
          >
            <strong className="block text-gray-800">
              Q{idx + 1}: {ans.question}
            </strong>
            <span className="block mt-1">
              Your answer:{" "}
              <span className={ans.isCorrect ? "text-green-600" : "text-red-600"}>
                {ans.selected}
              </span>
            </span>
            <span className="block mt-1 text-gray-600">
              Correct answer: <span className="font-medium">{ans.correct}</span>
            </span>
          </li>
        ))}
      </ul>

      {/* Restart Button */}
      <button
        onClick={onRestart}
        className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Restart Quiz
      </button>
    </div>
  );
}

export default Results;
