export const TextButton = ({ color, name, onClick }) => {
  return (
    <button
      className={`text-pastel-blue cursor-pointer py-2`}
      onPress={onPress}
    >
      {name}
    </button>
  );
};

export const FullButton = ({ name, onClick }) => {
  return (
    <button
      className={`bg-pastel-blue cursor-pointer py-2 rounded-md px-4 font-bold`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};
