package gestionRessource.backend.Presentation;

<<<<<<< Updated upstream
import gestionRessource.backend.model.Departement;
import gestionRessource.backend.model.User;
import gestionRessource.backend.controler.DepartementControler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
=======
>>>>>>> Stashed changes
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

<<<<<<< Updated upstream
import java.util.List;
import java.util.Objects;
=======
import gestionRessource.backend.model.Role;
import gestionRessource.backend.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
>>>>>>> Stashed changes

@Controller
public class HomeController {

<<<<<<< Updated upstream
    private final DepartementControler departementControler;

    public HomeController(DepartementControler departementControler) {
        this.departementControler = departementControler;
    }

    @GetMapping("/home")
    public String showHomePage(HttpServletRequest request, Model model) {
        // Ensure a session exists or create a new one
        HttpSession session = request.getSession(true);

        // Retrieve the user attribute from the session
        User user = (User) session.getAttribute("user");

        // Check if the user is not null
        if (user != null) {
            // If the user is a "Responsable", set the department list and redirect
            if (Objects.equals(user.getRole().toString(), "Responsable")) {
                     return "redirect:/Respo"; // Redirect to the "Responsable" page
            }
             return "home";
           } else {
            // Handle the case where the user is not found in the session
            model.addAttribute("error", "Invalid username or password");
            return "login"; // Redirect to login page
        }
    }
}
=======
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
				// Print the attribute to the console
				System.out.println("Session user: " + user.toString());
			} else {
				System.out.println("No user found in session.");
			}

			// You can also add session attributes to the Model to display on a w

			return "home";
		} else {
			model.addAttribute("error", "Invalid username or password");
			return "login";
		}

	} // Name of the view to display
}
>>>>>>> Stashed changes
