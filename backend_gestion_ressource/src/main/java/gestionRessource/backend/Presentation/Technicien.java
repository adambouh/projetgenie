package gestionRessource.backend.Presentation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import gestionRessource.backend.controler.PanneControler;
import gestionRessource.backend.controler.UserControler;
import gestionRessource.backend.model.EtatPanne;
import gestionRessource.backend.model.Panne;
import gestionRessource.backend.model.Role;
import gestionRessource.backend.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class Technicien {
	@Autowired
	UserControler userControler;

	@Autowired
	PanneControler panneControler;

	@GetMapping("/technicien/acceuil")
	public String showAcceuilTechnicie1(HttpServletRequest request, Model model) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			// Redirect to a secure page, or set user in session, etc.

			if (user != null) {
				// Print the attribute to the console
				System.out.println("Session user: " + user);
				System.out.println(user.getRole().toString());
				if (user.getRole().equals(Role.Technicien)) {

					List<Panne> fixedPanne = panneControler.getPanneByUserId(user.getId());
					session.setAttribute("fixed-pannes", fixedPanne);

					List<Panne> allPannes = panneControler.getPannes();
					List<Panne> nonReparees = allPannes.stream()
							.filter(panne -> panne.getEtatPanne().equals(EtatPanne.NonRepare))
							.collect(Collectors.toList());

					session.setAttribute("list-pannes", nonReparees);

					return "Technicien/acceuil";
				}
			} else {

			}
		}
		model.addAttribute("error", "Invalid username or password");
		return "redirect:/login";
	}

}