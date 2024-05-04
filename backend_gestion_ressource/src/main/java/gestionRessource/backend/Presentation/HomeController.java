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
		HttpSession session = request.getSession(false);

		if (session != null) {
			User user = (User) session.getAttribute("user");

			if (user != null) {
				// Fetch notifications explicitly within the same session
				List<Notification> notifications = notificationControler.getNotificationByUser(user.getId());
				// Check if session is open before accessing lazy-loaded collections
				if (Objects.nonNull(notifications)) {
					// Add notifications to session to use in other JSP pages
					session.setAttribute("notifications", notifications);
					System.out.println(notifications);
				}

				// Redirect based on user role
				if (Objects.equals(user.getRole(), Role.Technicien)) {
					return "redirect:/technicien/acceuil"; // Redirect to the technician's page
				}
				if (Objects.equals(user.getRole(), Role.Responsable)) {
					return "redirect:/Respo"; // Redirect to the "Responsable" page
				}

				// Print user information for debugging
				System.out.println("Session user: " + user.toString());

				return "home"; // Return the home view
			} else {
				model.addAttribute("error", "No user found in session");
				return "redirect:/login"; // Redirect to login page if no user found
			}
		} else {
			model.addAttribute("error", "Session expired or invalid");
			return "redirect:/login"; // Redirect if session is invalid or doesn't exist
		}
	}
}