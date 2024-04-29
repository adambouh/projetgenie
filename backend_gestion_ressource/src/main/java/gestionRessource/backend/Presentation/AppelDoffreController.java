package gestionRessource.backend.Presentation;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import gestionRessource.backend.controler.AppelDoffreControler;
import gestionRessource.backend.model.AppelDoffre;
import jakarta.servlet.http.HttpServletRequest;

@Controller
public class AppelDoffreController {
	@Autowired
	private AppelDoffreControler appelDoffreControler;
	
	@GetMapping("/appels-d-offres")
	public String showFournisseurAppelsDoffres(HttpServletRequest request, Model model) {
		List<AppelDoffre> appelsDoffresList = this.appelDoffreControler.getAllAppelDoffres();
		
		model.addAttribute("appelsDoffresList", appelsDoffresList);
		
		return "Fournisseur/appelsDoffres";
	}
	
}
