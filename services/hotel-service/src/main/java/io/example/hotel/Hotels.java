package io.example.hotel;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface Hotels extends CrudRepository<Hotel, Hotel.HotelIdentifier> {
}
