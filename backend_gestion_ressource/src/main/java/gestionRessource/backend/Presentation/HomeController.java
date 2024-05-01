package gestionRessource.backend.Presentation;

import java.util.Objects;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import gestionRessource.backend.controler.DepartementControler;
import gestionRessource.backend.model.Role;
import gestionRessource.backend.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class HomeController {

	private final DepartementControler departementControler;

	public HomeController(DepartementControler departementControler) {
		this.departementControler = departementControler;
	}

	@GetMapping("/home")
	public String showHomePage(HttpServletRequest request, Model model) {
		// Get an attribute from the session
		HttpSession session = request.getSession(false);
		if (session != null) {
			System.out.println("bra");
			User user = (User) session.getAttribute("user");
			// Redirect to a secure page, or set user in session, etc.

			if (user != null) {
				if (user.getRole().equals(Role.Technicien)) {
					return "redirect:/technicien/acceuil";
				}
				if (Objects.equals(user.getRole().toString(), "Responsable")) {
					return "redirect:/Respo"; // Redirect to the "Responsable" page
				}
				// Print the attribute to the console
				System.out.println("Session user: " + user.toString());
			} else {
				System.out.println("No user found in session.");
			}

			// You can also add session attributes to the Model to display on a w

			return "home";
		} else {
			model.addAttribute("error", "Invalid username or password");
			return "redirect:/login";
		}

	} // Name of the view to display
}