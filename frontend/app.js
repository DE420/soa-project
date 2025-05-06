let guestId = null; // Biến lưu trữ guestId

// Fetch hotels and load them into the dropdown
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
        alert('Không thể tải danh sách khách sạn. Vui lòng thử lại sau.');
    }
}

// Fetch rooms based on the selected hotel
async function loadRooms() {
    const hotelSelect = document.getElementById('hotelSelect');
    const roomSelect = document.getElementById('roomCode');
    const roomsContainer = document.getElementById('roomsContainer');

    const hotelId = hotelSelect.value;
    roomSelect.innerHTML = '<option value="">-- Chọn phòng --</option>'; // Reset room options

    if (hotelId) {
        try {
            const response = await fetch(`http://localhost:8085/api/v1/rooms?hotelId=${hotelId}`);
            const rooms = await response.json();

            rooms.forEach(room => {
                const option = document.createElement('option');
                option.value = room.id;
                option.textContent = `${room.id} - ${room.available ? 'Còn phòng' : 'Hết phòng'}`;
                roomSelect.appendChild(option);
            });

            roomsContainer.style.display = 'block';
        } catch (error) {
            console.error('Error fetching rooms:', error);
            alert('Không thể tải danh sách phòng. Vui lòng thử lại sau.');
        }
    } else {
        roomsContainer.style.display = 'none';
    }
}

// Submit guest information and get guestId
async function submitGuest() {
    const name = document.getElementById('guestName').value;
    const phone = document.getElementById('guestPhone').value;
    const address = document.getElementById('guestAddress').value;

    if (!name || !phone || !address) {
        alert('Vui lòng nhập đầy đủ thông tin khách hàng.');
        return;
    }

    const guestData = { name, phone, address };

    try {
        const response = await fetch('http://localhost:8085/api/v1/guests', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(guestData),
        });

        if (response.ok) {
            const guest = await response.json();
            guestId = guest.id; // Lưu guestId
            alert('Thông tin khách hàng đã được gửi thành công!');
        } else {
            alert('Không thể gửi thông tin khách hàng. Vui lòng thử lại!');
        }
    } catch (error) {
        console.error('Error submitting guest:', error);
        alert('Không thể gửi thông tin khách hàng. Vui lòng thử lại!');
    }
}

// Handle room reservation
async function submitReservation() {
    const hotelId = document.getElementById('hotelSelect').value;
    const roomId = document.getElementById('roomCode').value;
    const startDate = "2023-12-16"; // Fixed start date
    const endDate = "2023-12-17";   // Fixed end date
    const paymentDue = 1702632793441; // Fixed payment due timestamp
    const creditCardNo = "************7999"; // Fixed masked card number

    if (!guestId) {
        alert('Vui lòng gửi thông tin khách hàng trước khi đặt phòng.');
        return;
    }

    if (!hotelId || !roomId) {
        alert('Vui lòng chọn khách sạn và phòng.');
        return;
    }

    const reservationData = {
        hotelId: parseInt(hotelId),
        roomId: parseInt(roomId),
        startDate: startDate,
        endDate: endDate,
        guestId: guestId,  // Sử dụng guestId đã lấy từ API khách hàng
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
        } else {
            alert('Đặt phòng thất bại. Vui lòng thử lại!');
        }
    } catch (error) {
        console.error('Error creating reservation:', error);
        alert('Đặt phòng thất bại. Vui lòng thử lại!');
    }
}

document.getElementById('submitButton').addEventListener('click', submitReservation);
document.getElementById('submitGuestButton').addEventListener('click', submitGuest);

// Load hotels on page load
window.onload = loadHotels;
