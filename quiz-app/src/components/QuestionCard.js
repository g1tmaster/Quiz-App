import OptionButton from "./OptionButton";

export default function QuestionCard({
  question,
  currentIndex,
  total,
  selectedOption,
  onSelect,
  onNext,
}) {
  const decodeHTML = (str) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = str;
    return txt.value;
  };

  const progress = ((currentIndex + 1) / total) * 100;

  return (
    <div className="flex flex-col space-y-5">
      {/* Shows Questions and Progress bar */}
      <h2 className="text-lg font-semibold text-gray-800">
        Question {currentIndex + 1} of {total}
      </h2>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Questions */}
      <p className="text-gray-700 font-medium text-lg">
        {decodeHTML(question.question)}
      </p>

      {/* Options */}
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <OptionButton
            key={index}
            label={decodeHTML(option)}
            selected={selectedOption === index}
            onClick={() => onSelect(index)}
          />
        ))}
      </div>

      {/* Next Button */}
      <button
        type="button"
        onClick={onNext}
        disabled={selectedOption === null}
        className={`mt-4 px-6 py-3 rounded-lg font-semibold text-white transition 
          ${
            selectedOption === null
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
      >
        {currentIndex === total - 1 ? "Finish" : "Next"}
      </button>
    </div>
  );
}
