export const mockApi = async (querySearch) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const mockResults = [
    "JavaScript",
    "TypeScript",
    "Python",
    "Java",
    "C++",
    "Ruby",
    "Go",
    "Rust",
    "Swift",
    "Kotlin",
    "PHP",
    "C#",
  ];

  return mockResults.filter((result) =>
    result.toLowerCase().includes(querySearch.toLowerCase())
  );
};
