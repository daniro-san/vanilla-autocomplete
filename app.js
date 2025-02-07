import { mockApi } from "./mockApi.js";

const searchInput = document.getElementById("autocomplete-input");
const resultList = document.getElementById("result-list");
const loaderSpinner = document.getElementById("loading-spinner");

const showResults = () => {
  resultList.classList.remove("hidden");
};

const hideResults = () => {
  resultList.classList.add("hidden");
};

const showLoader = () => {
  loaderSpinner.classList.remove("hidden");
};

const hideLoader = () => {
  loaderSpinner.classList.add("hidden");
};

const SEARCH_THRESHOLD = 2;

const handleInput = (e) => {
  const query = e.target.value;

  if (query.length < SEARCH_THRESHOLD) {
    hideResults();
    return;
  }

  showLoader();

  fetchResults(query).then((results) => {
    resultList.innerHTML = "";

    if (results.length > 0) {
      showResults();
    }

    results.forEach((result) => {
      const listItem = document.createElement("li");
      listItem.textContent = result;

      resultList.appendChild(listItem);
    });
  });
};

const fetchResults = async (querySearch) => {
  try {
    const results = await mockApi(querySearch);

    return results;
  } catch {
    console.error("Error fetching results");
  } finally {
    hideLoader();
  }
};

const initializeEventListeners = () => {
  searchInput.addEventListener("input", handleInput);
  document.addEventListener("click", (event) => {
    if (
      !event.target.closest("#autocomplete-input") &&
      !event.target.closest("#result-list") &&
      !event.target.closest("#btn-search")
    ) {
      hideResults();
    }
  });
};

initializeEventListeners();
