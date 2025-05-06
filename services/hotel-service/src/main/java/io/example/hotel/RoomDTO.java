package io.example.hotel;

public record RoomDTO(
        Integer id,
        String name,
        Integer number,
        Integer floor,
        Boolean available,
        Integer hotelId
) {
    public static RoomDTO from(Room room) {
        Integer hotelId = null;
        if (room.getHotel() != null && room.getHotel().getId() != null) {
            hotelId = room.getHotel().getId().id();
        }

        return new RoomDTO(
                room.getId() != null ? room.getId().id() : null,
                room.getName(),
                room.getNumber(),
                room.getFloor(),
                room.getAvailable(),
                hotelId
        );
    }
}
