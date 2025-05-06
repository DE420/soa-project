**Saga Orchestration Microservices**

Dự án này triển khai Saga Orchestration Pattern để quản lý trong hệ thống microservices, mô phỏng quy trình đặt phòng khách sạn. Các dịch vụ giao tiếp thông qua Apache Kafka, với Debezium hỗ trợ đồng bộ dữ liệu từ cơ sở dữ liệu sang Kafka topics.

# Folder Structure
```
├── README.md
├── api-gateway
│   ├── Dockerfile
│   ├── pom.xml
│   └── src
│       └── main
│           ├── java
│           │   └── io
│           │       └── example
│           │           └── apigateway
│           │               ├── ApiGatewayApplication.java
│           │               └── CorsGlobalConfiguration.java
│           └── resources
│               └── application.yml
├── debezium-strimzi
│   └── Dockerfile
├── docker-compose.yaml
├── docs
│   ├── analysis-and-design.md
│   ├── api-specs
│   │   ├── reservation-service.yaml
│   │   
│   ├── architecture.md
│   └── asset
│       ├── Failed route sequence.jpg
│       ├── Flow.jpg
│       ├── Reservation_process.jpg
│       ├── Success sequence.jpg
│       ├── Successful_route.jpg
│       ├── hoteldb.jpg
│       ├── payment-service db.jpg
│       ├── reservation-servicedb.jpg
│       ├── service config.jpg
│       └── treeview.txt
├── frontend
│   ├── Dockerfile
│   ├── app.js
│   └── index.html
├── gateway
│   └── Dockerfile
├── mvnw
├── mvnw.cmd
├── outbox
│   ├── README.md
│   ├── pom.xml
│   └── src
│       └── main
│           ├── java
│           │   └── io
│           │       └── example
│           │           └── outbox
│           │               ├── Outbox.java
│           │               ├── OutboxConfig.java
│           │               ├── OutboxEvent.java
│           │               └── OutboxEventDispatcher.java
│           └── resources
│               └── db
│                   └── migration
│                       └── V0__outbox_events.sql
├── pom.xml
├── register-connectors.sh
├── scripts
│   ├── consume-kafka-topic.sh
│   ├── create-kafka-topics.sh
│   └── list-kafka-topics.sh
└── services
    ├── guest-service
    │   ├── Dockerfile
    │   ├── init-guest.sql
    │   ├── pom.xml
    │   └── src
    │       └── main
    │           ├── java
    │           │   └── io
    │           │       └── example
    │           │           └── guest
    │           │               ├── Guest.java
    │           │               ├── GuestController.java
    │           │               ├── GuestRepository.java
    │           │               └── GuestServiceApplication.java
    │           └── resources
    │               ├── application.yml
    │               └── db
    │                   └── migration
    │                       └── V1__init_guest_schema.sql
    ├── hotel-service
    │   ├── Dockerfile.dev
    │   ├── connectdb.properties
    │   ├── hotel-outbox-connector.json
    │   ├── init-hotel.sql
    │   ├── parent.pom.xml
    │   ├── pom.xml
    │   └── src
    │       └── main
    │           ├── java
    │           │   └── io
    │           │       └── example
    │           │           └── hotel
    │           │               ├── Hotel.java
    │           │               ├── HotelDTO.java
    │           │               ├── HotelServiceApplication.java
    │           │               ├── Hotels.java
    │           │               ├── Room.java
    │           │               ├── RoomDTO.java
    │           │               ├── Rooms.java
    │           │               ├── SecurityConfig.java
    │           │               ├── messaging
    │           │               │   ├── KafkaConfig.java
    │           │               │   ├── RoomBookingEvent.java
    │           │               │   ├── RoomBookingEventHandler.java
    │           │               │   ├── RoomBookingEventPayload.java
    │           │               │   ├── RoomBookingInboxEventsConsumer.java
    │           │               │   ├── RoomBookingRequestStatus.java
    │           │               │   ├── RoomBookingRequestType.java
    │           │               │   └── log
    │           │               │       ├── EventLog.java
    │           │               │       └── EventLogs.java
    │           │               └── web
    │           │                   ├── HotelController.java
    │           │                   └── RoomController.java
    │           └── resources
    │               ├── application.properties
    │               └── db
    │                   └── migration
    │                       ├── V1__eventlog_schema.sql
    │                       ├── V2__hotel_schema.sql
    │                       ├── V3__room_schema.sql
    │                       └── V99__demodata.sql
    ├── payment-service
    │   ├── Dockerfile.dev
    │   ├── init-payment.sql
    │   ├── parent.pom.xml
    │   ├── payment-outbox-connector.json
    │   ├── pom.xml
    │   ├── src
    │   │   └── main
    │   │       ├── java
    │   │       │   └── io
    │   │       │       └── example
    │   │       │           └── payment
    │   │       │               ├── Payment.java
    │   │       │               ├── PaymentRequestType.java
    │   │       │               ├── PaymentServiceApplication.java
    │   │       │               ├── PaymentStatus.java
    │   │       │               ├── Payments.java
    │   │       │               └── messaging
    │   │       │                   ├── KafkaConfig.java
    │   │       │                   ├── PaymentEvent.java
    │   │       │                   ├── PaymentEventHandler.java
    │   │       │                   ├── PaymentInboxEventConsumer.java
    │   │       │                   └── log
    │   │       │                       ├── EventLog.java
    │   │       │                       └── EventLogs.java
    │   │       └── resources
    │   │           ├── application.properties
    │   │           └── db
    │   │               └── migration
    │   │                   ├── V1__eventlog_schema.sql
    │   │                   └── V2__payment_schema.sql
    │   └── target
    │       ├── classes
    │       │   ├── application.properties
    │       │   ├── db
    │       │   │   └── migration
    │       │   │       ├── V1__eventlog_schema.sql
    │       │   │       └── V2__payment_schema.sql
    │       │   └── io
    │       │       └── example
    │       │           └── payment
    │       │               ├── Payment.class
    │       │               ├── PaymentRequestType.class
    │       │               ├── PaymentServiceApplication.class
    │       │               ├── PaymentStatus.class
    │       │               ├── Payments.class
    │       │               └── messaging
    │       │                   ├── KafkaConfig$KafkaTopic.class
    │       │                   ├── KafkaConfig.class
    │       │                   ├── PaymentEvent.class
    │       │                   ├── PaymentEventHandler.class
    │       │                   ├── PaymentInboxEventConsumer.class
    │       │                   └── log
    │       │                       ├── EventLog.class
    │       │                       └── EventLogs.class
    │       └── generated-sources
    │           └── annotations
    └── reservation-service
        ├── Dockerfile.dev
        ├── init-reservation.sql
        ├── parent.pom.xml
        ├── pom.xml
        ├── reservation-outbox-connector.json
        └── src
            ├── main
            │   ├── java
            │   │   └── io
            │   │       └── example
            │   │           ├── config
            │   │           │   └── WebConfig.java
            │   │           └── reservation
            │   │               ├── Reservation.java
            │   │               ├── ReservationServiceApplication.java
            │   │               ├── Reservations.java
            │   │               ├── RoomReservationCmd.java
            │   │               ├── RoomReservationUseCase.java
            │   │               ├── framework
            │   │               │   ├── EventLog.java
            │   │               │   ├── Saga.java
            │   │               │   ├── SagaState.java
            │   │               │   ├── SagaStatus.java
            │   │               │   └── SagaStepStatus.java
            │   │               ├── messaging
            │   │               │   ├── KafkaConfig.java
            │   │               │   ├── KafkaFlightBookingConsumer.java
            │   │               │   ├── PaymentEvent.java
            │   │               │   ├── PaymentStatus.java
            │   │               │   ├── ReservationPlacementEventHandler.java
            │   │               │   ├── RoomBookingEvent.java
            │   │               │   └── RoomBookingStatus.java
            │   │               ├── saga
            │   │               │   ├── RoomReservationSaga.java
            │   │               │   ├── SagaEvent.java
            │   │               │   └── SagaManager.java
            │   │               └── web
            │   │                   └── ReservationController.java
            │   └── resources
            │       ├── application.properties
            │       └── db
            │           └── migration
            │               ├── V1__eventlog_schema.sql
            │               ├── V2__sagastate_schema.sql
            │               └── V3__reservation_schema.sql
            └── test
                ├── java
                │   └── io
                │       └── example
                │           └── reservation
                │               ├── MessagingCDCConfig.java
                │               ├── TestContainersSetup.java
                │               └── web
                │                   └── BookRoomE2ETest.java
                └── resources
                    └── test-outbox-connector.json

```
**Mô tả dịch vụ**

Hệ thống bao gồm các dịch vụ chính:
1. Reservation service:
    +) Quản lý yêu cầu đặt phòng từ người dùng.
    +) Điều phối Saga, gửi lệnh đến các dịch vụ khác qua Kafka.
    +) Lưu trữ trạng thái Saga trong cơ sở dữ liệu.
2. Payment service:
    +) Xử lý thanh toán cho các đặt phòng.
3. Hotel service:
    +) Kiểm tra và cập nhật tình trạng phòng.
4. guest service: thu thập thông tin người dùng và hiển thị

**Công nghệ**
1. Java, Spring Boot: Xây dựng microservices.
2. PostgreSQL: Lưu trữ dữ liệu.
3. Docker, Docker Compose: Container hóa ứng dụng.
4. Apache Kafka: Quản lý luồng sự kiện.
5. Debezium: Đồng bộ dữ liệu từ cơ sở dữ liệu sang Kafka.
## 🚀 Getting Started

1. **Clone this repository**

   ```bash
   git clone [https://github.com/hungdn1701/microservices-assignment-starter.git](https://github.com/jnp2018/mid-project-107035731.git)
   cd mid-project-107035731

2. **Run with Docker Compose**

    docker-compose up --build

## 🧪 **Diagrams**
![service configration](docs/asset/Reservation_process.jpg)


---




