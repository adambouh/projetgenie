package gestionRessource.backend.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gestionRessource.backend.model.Notification;
import gestionRessource.backend.repository.NotificationRepository;
import gestionRessource.backend.service.NotificationService;

@Service
public class NotificationServiceImpl implements NotificationService {

	@Autowired
	public NotificationRepository notificationRepository;

	@Override
	public void AjouterNotification(Notification notification) {
		notificationRepository.save(notification);
	}

}
