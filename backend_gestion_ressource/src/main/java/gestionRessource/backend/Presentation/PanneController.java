package gestionRessource.backend.Presentation;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class PanneController {
	
	@GetMapping("/technicien/acceuil")
	public String showAcceuilTechnicien() {
		return "Technicien/acceuil";
	}
	
}
