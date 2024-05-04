package gestionRessource.backend.Presentation;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import gestionRessource.backend.controler.NotificationControler;
import gestionRessource.backend.dto.NotificationDTO;
import gestionRessource.backend.model.Notification;
import gestionRessource.backend.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class NotificationController {
	
	@Autowired
	private NotificationControler notificationControler;
	
	@GetMapping("/fournisseur/notifications")
	public String showMyNotifications(HttpServletRequest request, Model model) {
		
		// Testing if the user has a sessoin
		HttpSession session = request.getSession();
		User fournisseur = (User) session.getAttribute("fournisseur");
		
	    if (fournisseur != null) {
	    	List<Notification> notifications = this.notificationControler.getNotificationByUser(fournisseur.getId());
	    	model.addAttribute("notifications", notifications);
	    	return "Fournisseur/myNotifications";
	    } else {
	    	return "redirect:/fournisseur/login";
	    }

	}
	
	@GetMapping("/changeNotifStatus/{id}")
	public String changeNotificationStatus(@PathVariable("id") Long notificationId) {
		
		// mettre le notificationId dans une liste de notifications ids
		List<Long> notifIds = new ArrayList<>();
		notifIds.add(notificationId);
		
		NotificationDTO notificationDTO = new NotificationDTO();
		notificationDTO.setListeNotifId(notifIds);
		
		List<Notification> notifications = this.notificationControler.modifierEtatNotification(notificationDTO);
		if (notifications != null) {
			// on peut ajouter un message de succes
			System.out.println("notification modifiée");
		    return "redirect:/fournisseur/notifications";
		} else {
			// on peut ajouter un message d'erreur
			System.out.println("notification n'est pas modifiée");
		    return "redirect:/fournisseur/notifications";
		}
	}

}
