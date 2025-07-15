const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    smartphone: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    tablet: "bg-purple-100 text-purple-800 hover:bg-purple-200",
    laptop: "bg-green-100 text-green-800 hover:bg-green-200",
    smartwatch: "bg-orange-100 text-orange-800 hover:bg-orange-200",
    headphone: "bg-pink-100 text-pink-800 hover:bg-pink-200",
    speaker: "bg-indigo-100 text-indigo-800 hover:bg-indigo-200",
    camera: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    console: "bg-red-100 text-red-800 hover:bg-red-200",
    drone: "bg-teal-100 text-teal-800 hover:bg-teal-200",
    television: "bg-lime-100 text-lime-800 hover:bg-lime-200",
    accessory: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };
  return colors[category] || "bg-gray-100 text-gray-800";
};

export default getCategoryColor;
