package io.example.guest;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/guests")
@RequiredArgsConstructor
public class GuestController {

    private final GuestRepository guestRepository;

    // Record to hold the response JSON structure
    public record GuestResponse(String id) {}

    @PostMapping
    public ResponseEntity<GuestResponse> createGuest(@RequestBody Guest guest) {
        Guest savedGuest = guestRepository.save(guest);
        return ResponseEntity.ok(new GuestResponse(savedGuest.getId().toString()));
    }
}