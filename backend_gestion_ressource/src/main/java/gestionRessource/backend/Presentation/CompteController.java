package gestionRessource.backend.Presentation;

import java.util.List;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import gestionRessource.backend.model.Notification;
import gestionRessource.backend.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class CompteController {

	@GetMapping("/ma-compte")
	public String showFournisseurCompte(HttpServletRequest request) {
		// Testing if the user has a sessoin
		HttpSession session = request.getSession();
		User fournisseur = (User) session.getAttribute("fournisseur");
		
	    if (fournisseur != null) {
	    	return "Fournisseur/compte";
	    } else {
	    	return "redirect:/appels-d-offres";
	    }
	}
}
    