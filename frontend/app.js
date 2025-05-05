async function loadHotels() {
    const hotelSelect = document.getElementById('hotelSelect');

    try {
        const response = await fetch('http://localhost:8085/api/v1/hotels');
        const hotels = await response.json();

        hotels.forEach(hotel => {
            const option = document.createElement('option');
            option.value = hotel.id;
            option.textContent = `${hotel.code} - ${hotel.name}`;
            hotelSelect.appendChild(option);
        });
    } catch (error) {
        console.error('Error fetching hotels:', error);
    }
}

async function loadRooms() {
    const hotelSelect = document.getElementById('hotelSelect');
    const roomsContainer = document.getElementById('roomsContainer');
    const roomsList = document.getElementById('roomsList');

    const hotelId = hotelSelect.value;

    roomsList.innerHTML = '';

    if (hotelId) {
        try {
            const response = await fetch(`http://localhost:8085/api/v1/rooms?hotelId=${hotelId}`);
            const rooms = await response.json();

            rooms.forEach(room => {
                const li = document.createElement('li');
                li.textContent = `${room.code} - ${room.name}`;
                roomsList.appendChild(li);
            });

            roomsContainer.style.display = 'block';
        } catch (error) {
            console.error('Error fetching rooms:', error);
        }
    } else {
        roomsContainer.style.display = 'none';
    }
}

function filterHotels() {
    const hotelCode = document.getElementById('hotelCode').value.toLowerCase();
    const hotelSelect = document.getElementById('hotelSelect');

    hotelSelect.innerHTML = '<option value="">-- Chọn khách sạn --</option>';

    fetch('http://localhost:8085/api/v1/hotels')
        .then(response => response.json())
        .then(hotels => {
            hotels.forEach(hotel => {
                if (hotel.code.toLowerCase().includes(hotelCode)) {
                    const option = document.createElement('option');
                    option.value = hotel.id;
                    option.textContent = `${hotel.code} - ${hotel.name}`;
                    hotelSelect.appendChild(option);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching hotels:', error);
        });
}

window.onload = loadHotels;
