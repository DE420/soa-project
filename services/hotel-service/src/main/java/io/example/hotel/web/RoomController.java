package io.example.hotel;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/v1/rooms")
@RequiredArgsConstructor
public class RoomController {

    private final Rooms rooms;

    @GetMapping
    public List<RoomDTO> listRooms() {
        return StreamSupport.stream(rooms.findAll().spliterator(), false)
                .map(RoomDTO::from)
                .toList();
    }
}
