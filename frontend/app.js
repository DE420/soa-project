async function loadHotels() {
    const hotelSelect = document.getElementById('hotelSelect');

    try {
        const response = await fetch('http://localhost:8085/api/v1/hotels');
        const hotels = await response.json();

        hotels.forEach(hotel => {
            const option = document.createElement('option');
            option.value = hotel.id;
            option.textContent = `${hotel.id} - ${hotel.name}`;
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
                li.textContent = `${room.id} - ${room.available ? 'Còn phòng' : 'Hết phòng'}`;
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

async function submitReservation() {
    const hotelId = document.getElementById('hotelSelect').value;
    const roomId = document.getElementById('roomCode').value;

    if (!hotelId || !roomId) {
        alert('Vui lòng chọn khách sạn và phòng.');
        return;
    }

    const startDate = '2023-12-16';
    const endDate = '2023-12-17';
    const guestId = 10000001;
    const paymentDue = 1702632793441;
    const creditCardNo = '************7999';

    const reservationData = {
        hotelId: parseInt(hotelId),
        roomId: parseInt(roomId),
        startDate: startDate,
        endDate: endDate,
        guestId: guestId,
        paymentDue: paymentDue,
        creditCardNo: creditCardNo
    };

    try {
        const response = await fetch('http://localhost:8085/api/v1/reservations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reservationData),
        });

        if (response.ok) {
            const locationHeader = response.headers.get('Location');
            console.log('test', locationHeader)
            setTimeout(async () => {
                const reservationId = locationHeader.split('/').pop();

                console.log('Reservation ID:', reservationId);

                const statusResponse = await fetch(`http://localhost:8085/api/v1/reservations/${reservationId}`);
                if (statusResponse.ok) {
                    const statusData = await statusResponse.json();
                    if (statusData.status === 'SUCCEED') {
                        alert('Đặt phòng thành công!');
                    } else {
                        alert('Đặt phòng thất bại: Phòng đã được đặt bởi người khác');
                    }

                } else {
                    alert('Không thể lấy trạng thái đặt phòng');
                }
            }, 1000);
        } else {
            alert('Đặt phòng thất bại. Vui lòng thử lại!');
        }
    } catch (error) {
        console.error('Error creating reservation:', error);
        alert('Đặt phòng thất bại. Vui lòng thử lại!');
    }
}


document.getElementById('submitButton').addEventListener('click', submitReservation);

window.onload = loadHotels;
