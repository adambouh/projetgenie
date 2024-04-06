package gestionRessource.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import gestionRessource.backend.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {

}
