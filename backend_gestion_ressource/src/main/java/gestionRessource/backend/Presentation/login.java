package gestionRessource.backend.Presentation;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import gestionRessource.backend.controler.FournisseurControler;
import gestionRessource.backend.controler.UserControler;
import gestionRessource.backend.dto.AuthentificationDTO;
import gestionRessource.backend.dto.FournisseurDTO;
import gestionRessource.backend.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class login {

    @Autowired
    private UserControler userControler;

    @Autowired
    private FournisseurControler fournisseurControler;

	@GetMapping("/login")
	public String showLoginPage() {
		return "login"; // This will look for login.jsp or login.html
	}

	@PostMapping("/Login")
	public String handleLogin(@RequestParam("username") String username, @RequestParam("password") String password,
			RedirectAttributes redirectAttributes, Model model, HttpServletRequest request) {
		AuthentificationDTO authDto = new AuthentificationDTO();
		authDto.setLogin(username);
		authDto.setPassword(password);

		User user = userControler.authentification(authDto);
		if (user != null) {
			// Login successful
			HttpSession session = request.getSession();
			// Store data in the session
			session.setAttribute("user", user); // Store the actual username
			// Set a flag to indicate user is logged in

			redirectAttributes.addFlashAttribute("message", "Login successful!");
			return "redirect:/home"; // Change to your secure page
		} else {
			// Login failed
			model.addAttribute("error", "Invalid username or password");
			return "login"; // Return to login page with error message
		}
	}
    

	// page login fournisseur
	@GetMapping("/fournisseur-login")
	public String showLogInFournisseur(HttpServletRequest request) {
		return "Fournisseur/loginFournisseur";
	}

	// logout fournisseur
	@GetMapping("/fournisseur-logout")
	public String logoutFournisseur(HttpServletRequest request) {
		// Supprimez l'attribut 'fournisseur' s'il existe pour assurer le logout
		HttpSession session = request.getSession();
		session.removeAttribute("fournisseur");
		return "redirect:/fournisseur-login";
	}

	// verification login password fournisseur
	@PostMapping("/fournisseur-in")
	public String loginFournisseur(@ModelAttribute AuthentificationDTO authoDto, HttpServletRequest request,
			Model model) {

		Object fournisseur = userControler.authentification(authoDto);
		if (fournisseur == null) { // fournisseur doesn't exist

			model.addAttribute("errorLoginFournisseur", "Login ou mot de passe incorrect");
			return "Fournisseur/loginFournisseur";

		} else { // fournissuer exists

			HttpSession session = request.getSession();
			session.setAttribute("fournisseur", fournisseur);

			return "redirect:/appels-d-offres";
		}
	}

	// verification login password fournisseur
	@PostMapping("/fournisseur-signup")
	public String signupFournisseur(@ModelAttribute FournisseurDTO fournisseurDTO, HttpServletRequest request,
			Model model) {

		User fournisseur = fournisseurControler.addFournisseur(fournisseurDTO);
		if (fournisseur == null) { // fournisseur doesn't exist

			model.addAttribute("errorSignupFournisseur", "Une erreur s'est produite.");
			return "Fournisseur/appels-d-offres";

		} else { // fournissuer exists

			HttpSession session = request.getSession();
			session.setAttribute("fournisseur", fournisseur);

			return "redirect:/appels-d-offres";
		}
	}

}