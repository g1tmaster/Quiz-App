export default function OptionButton({ label, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full px-4 py-2 text-left rounded-lg border transition 
        ${selected 
          ? "bg-blue-600 text-white border-blue-600 shadow-md" 
          : "bg-white text-gray-800 border-gray-300 hover:bg-gray-100"
        }`}
    >
      {label}
    </button>
  );
}
