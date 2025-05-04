package io.example.hotel;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.StreamSupport;

@RestController
@RequestMapping("/v1/hotels")
@RequiredArgsConstructor
public class HotelController {

    private final Hotels hotels;

    @GetMapping
    @CrossOrigin(origins = "http://localhost:5500")
    public List<HotelDTO> listHotels() {
        return StreamSupport.stream(hotels.findAll().spliterator(), false)
                .map(HotelDTO::from)
                .toList();
    }
}
