const fetchButton = document.getElementById('fetchButton');
const responseDataDiv = document.getElementById('responseData');

fetchButton.addEventListener('click', async () => {
    try {
        const response = await fetch('http://localhost:8082/api/v1/rooms');

        if (response.ok) {
            const data = await response.json();
            console.log(data);

            responseDataDiv.innerHTML = `
                <pre>${JSON.stringify(data, null, 2)}</pre>
            `;
        } else {
            responseDataDiv.innerHTML = 'Error fetching rooms data.';
        }
    } catch (error) {
        console.error('Error:', error);
        responseDataDiv.innerHTML = 'An error occurred while fetching data.';
    }
});
