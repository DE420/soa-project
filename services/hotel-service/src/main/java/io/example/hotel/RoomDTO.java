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
        return new RoomDTO(
                room.getId().id(),
                room.getName(),
                room.getNumber(),
                room.getFloor(),
                room.getAvailable(),
                room.getHotel().getId().id()
        );
    }
}
