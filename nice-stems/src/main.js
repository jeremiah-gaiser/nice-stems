const form = document.getElementById('youtube-form');
const output = document.getElementById('output');
const loadingDiv = document.getElementById('loading');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  const urlInput = document.getElementById('youtube-url').value;

  if (!urlInput) {
    output.textContent = 'Please enter a URL.';
    return;
  }

  // Show spinner and hide output
  loadingDiv.classList.remove('hidden');
  output.textContent = '';

  try {
    const response = await fetch('http://localhost:3000/download', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ url: urlInput }),
    });

    const data = await response.json();

    if (response.ok) {
      output.textContent = data.message;
    } else {
      output.textContent = `Error: ${data.error}`;
    }
  } catch (error) {
    output.textContent = 'Error: Unable to connect to the server.';
    console.error(error);
  } finally {
    // Hide spinner after the request is completed
    loadingDiv.classList.add('hidden');
  }
});
