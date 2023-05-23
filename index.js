const form = document.querySelector("form");
const result = document.querySelector(".result");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  getWordInfo(form.elements[0].value);
});

const getWordInfo = async (word) => {
  try {
    result.innerHTML = "Fetching Data...";
    const response = await fetch(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );
    const data = await response.json();

    let definitions = data[0].meanings[0].definitions[0];

    result.innerHTML = `
    <h2><string>Word:</strong> ${data[0].word}</h2>
    <p class="partOfSpeech">${data[0].meanings[0].partOfSpeech}</p>
    <p><strong>Meanings:</strong>${
      definitions.definition === undefined
        ? "Not Found"
        : definitions.definition
    }</p>
    <p><strong>Example:</strong>${
      definitions.example === undefined ? "Not Found" : definitions.example
    }</p>
    <p><strong>Antonyms</strong></p>
    `;

    //Fetching Antonyms Data
    if (definitions.antonyms.length === 0) {
      result.innerHTML += `<p>Not Found</p>`;
    } else {
      for (let i = 0; i < definitions.antonyms.length; i++) {
        result.innerHTML += `<li>${definitions.antonyms[i]}</li>`;
      }
    }

    //Adding Read More Button
    result.innerHTML += `<div><a href="${data[0].sourceUrls}" target="_blank">Read More</a></div>`;
  } catch (error) {
        result.innerHTML = `<p>Sorry, the word could not be found</p>`;
  }
};
