import { mockApi } from "./mockApi.js";
import { debounce } from "./debounce.js";

const searchInput = document.getElementById("autocomplete-input");
const resultList = document.getElementById("result-list");
const loaderSpinner = document.getElementById("loading-spinner");

const showResults = () => resultList.classList.remove("hidden");
const hideResults = () => resultList.classList.add("hidden");
const showLoader = () => loaderSpinner.classList.remove("hidden");
const hideLoader = () => loaderSpinner.classList.add("hidden");

const fetchResults = async (querySearch) => {
  try {
    currentRequestController = new AbortController();
    const results = await mockApi(querySearch);

    renderResults(results);
  } catch (error) {
    if (error.name === "AbortError") {
      renderError();
    }
  } finally {
    hideLoader();
  }
};

const DEBOUNCE_DELAY = 300;
const SEARCH_THRESHOLD = 2;

let currentRequestController = null;

const debouncedFetch = debounce(fetchResults, DEBOUNCE_DELAY);

const handleInput = (e) => {
  const query = e.target.value;

  if (currentRequestController) {
    currentRequestController.abort();
  }

  if (query.length >= SEARCH_THRESHOLD) {
    showLoader();
    debouncedFetch(query);
  } else {
    hideResults();
  }
};

const renderResults = (results) => {
  resultList.innerHTML = results
    .map(
      (item, index) => `
    <li class="p-3 hover:bg-purple-50 cursor-pointer transition-colors duration-200
      ${index === 0 ? "rounded-t-lg" : ""}
      ${index === results.length - 1 ? "rounded-b-lg" : ""}"
      data-value="${item}">
      ${item}
    </li>
  `
    )
    .join("");

  showResults();
};

const renderError = () => {
  results.innerHTML = `
    <li class="p-3 text-red-500">
      Error loading results. Please try again.
    </li>
  `;

  showResults();
};

const initializeEventListeners = () => {
  searchInput.addEventListener("input", handleInput);
  document.addEventListener("click", (event) => {
    if (
      !searchInput.contains(event.target) &&
      !resultList.contains(event.target)
    ) {
      hideResults();
    }
  });
};

initializeEventListeners();
