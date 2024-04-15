const searchButton = document.getElementById('searchButton');
const results = document.getElementById('results');

searchButton.addEventListener('click', () => {
  const consoleName = document.getElementById('consoleName').value;

  // Read the index.txt file
  fetch('index.txt')
    .then((response) => response.text())
    .then((data) => {
      // Split the data by newline character
      const lines = data.split('\n');

      // Filter the lines that contain CN: and MA:
      const mods = lines.filter((line) => line.includes('CN: ') || line.includes('MA: '));

      // Display the results
      results.innerHTML = '';
      mods.forEach((mod) => {
        const modName = mod.split('MA: ')[1].trim();
        const consoleMatch = mod.includes(`CN: ${consoleName}`);

        if (consoleMatch) {
          const link = mod.split('MA: ')[0].split('CN: ')[1].trim();
          const result = document.createElement('div');
          result.classList.add('result');
          result.innerHTML = `
            <h2>${modName}</h2>
            <p>A mod is available for this console. Click <a href="${link}" target="_blank">here</a> to view the mod.</p>
          `;
          results.appendChild(result);
        }
      });

      if (results.childElementCount === 0) {
        results.textContent = 'No mods available for this console.';
      }
    })
    .catch((error) => {
      console.error(error);
      results.textContent = 'Error: Unable to retrieve search results.';
    });
});
