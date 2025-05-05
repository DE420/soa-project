package io.example.hotel;

public record HotelDTO(
        Integer id,
        String name,
        String address,
        String location
) {
    public static HotelDTO from(Hotel hotel) {
        return new HotelDTO(
                hotel.getId().id(),
                hotel.getName(),
                hotel.getAddress(),
                hotel.getLocation()
        );
    }
}
