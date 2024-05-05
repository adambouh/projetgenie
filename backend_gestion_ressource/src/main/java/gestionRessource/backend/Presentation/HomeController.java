package gestionRessource.backend.Presentation;

import java.util.List;
import java.util.Objects;

import gestionRessource.backend.controler.NotificationControler;
import gestionRessource.backend.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
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
	@Autowired
	private NotificationControler notificationControler;
	public HomeController(DepartementControler departementControler) {
		this.departementControler = departementControler;
	}

	@GetMapping("/home")
	public String showHomePage(HttpServletRequest request, Model model) {

	    // Get an attribute from the session
	    HttpSession session = request.getSession(false);
	    if (session != null) {
	        User user = (User) session.getAttribute("user");

	        if (user != null) {
				List<Notification> notifications = notificationControler.getNotificationByUser(user.getId());
				// Check if session is open before accessing lazy-loaded collections
				if (Objects.nonNull(notifications)) {
					// Add notifications to session to use in other JSP pages
					session.setAttribute("notifications", notifications);
					System.out.println(notifications);
				}
	            if (user.getRole().equals(Role.Technicien)) {
	                return "redirect:/technicien/acceuil";
	            } else if (user.getRole().equals(Role.Responsable)) {
	                return "redirect:/Respo";
	            } else if (user.getRole().equals(Role.Enseignant)) {
	                return "redirect:/enseignant/acceuil"; 
	            }else if (user.getRole().equals(Role.ChefDepartement)) {
					return "redirect:/chefDepartement/home";
				}
	            // Print the attribute to the console
	            System.out.println("Session user: " + user.toString());
	        } else {
	            System.out.println("No user found in session.");
	        }
	        return "home";
	    } else {
	        model.addAttribute("error", "Invalid username or password");
	        return "redirect:/login";
	    }
	}
 // Name of the view to display
}