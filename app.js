const searchInput = document.getElementById("autocomplete-input");
const resultList = document.getElementById("result-list");
const btnSearch = document.getElementById("btn-search");

const showResults = () => {
  resultList.classList.remove("hidden");
};

btnSearch.addEventListener("click", showResults);
