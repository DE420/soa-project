package io.example.hotel;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(path = "/v1/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final Rooms rooms;

    @GetMapping(produces = APPLICATION_JSON_VALUE)
    @CrossOrigin(origins = "http://localhost:5500")
    public ResponseEntity<List<RoomDTO>> getRoomsByHotelId(@RequestParam Integer hotelId) {
        var roomList = rooms.findAll().stream()
                .filter(room -> room.getHotel() != null
                        && room.getHotel().getId() != null
                        && hotelId.equals(room.getHotel().getId().id()))
                .map(RoomDTO::from)
                .collect(Collectors.toList());

        return ResponseEntity.ok(roomList);
    }
}
