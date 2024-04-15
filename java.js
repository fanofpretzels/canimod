const searchButton = document.getElementById('searchButton');
const results = document.getElementById('results');

searchButton.addEventListener('click', () => {
  const consoleName = document.getElementById('consoleName').value;
  const url = `https://api.github.com/search/repositories?q=flashcart+OR+hack+${consoleName}&sort=stars&order=desc`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      results.innerHTML = '';
      if (data.items.length === 0) {
        results.textContent = 'No results found';
      } else {
        data.items.forEach((item) => {
          const result = document.createElement('div');
          result.classList.add('result');
          result.innerHTML = `
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            ${
              item.homepage
                ? `<a href="${item.homepage}" target="_blank">Homepage</a>`
                : ''
            }
          `;
          results.appendChild(result);
        });
      }
    })
    .catch((error) => {
      console.error(error);
      results.textContent = 'Error: Unable to retrieve search results';
   
