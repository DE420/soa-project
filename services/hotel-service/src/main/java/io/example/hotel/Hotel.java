package io.example.hotel;

import jakarta.persistence.*;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;
import java.time.Instant;

import static lombok.AccessLevel.PACKAGE;

@Entity
@Table(name = "hotel")
@NoArgsConstructor(access = PACKAGE, force = true) // JPA compliant
@ToString
public class Hotel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private HotelIdentifier id;

    private final Instant creationTime = Instant.now();

    private String name;
    private String address;
    private String location;

    public Hotel(HotelIdentifier id, String name, String address, String location) {
        this.id = id;
        this.name = name;
        this.address = address;
        this.location = location;
    }

    // Getter methods
    public HotelIdentifier getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAddress() {
        return address;
    }

    public String getLocation() {
        return location;
    }

    @Embeddable
    public record HotelIdentifier(Integer id) implements Serializable {
        @Override
        public String toString() {
            return id.toString();
        }
    }
}
