#!/bin/sh

curl -X PUT -H "Content-Type: application/json" \
  --data @reservation-service/reservation-outbox-connector.json \
  http://localhost:8083/connectors/reservation-outbox-connector/config

curl -X PUT -H "Content-Type: application/json" \
  --data @hotel-service/hotel-outbox-connector.json \
  http://localhost:8083/connectors/hotel-outbox-connector/config

curl -X PUT -H "Content-Type: application/json" \
  --data @payment-service/payment-outbox-connector.json \
  http://localhost:8083/connectors/payment-outbox-connector/config
