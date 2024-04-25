package gestionRessource.backend.Presentation;

import gestionRessource.backend.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/home")
    public String showHomePage(HttpServletRequest request,Model model) {
        // Get an attribute from the session
        HttpSession session = request.getSession(false);
        if( session != null ) {
        System.out.println("bra");
        User user = (User) session.getAttribute("user");
        // Redirect to a secure page, or set user in session, etc.

        if (user != null) {
            // Print the attribute to the console
            System.out.println("Session user: " + user.toString());
        } else {
            System.out.println("No user found in session.");
        }

        // You can also add session attributes to the Model to display on a w

        return "home";}else{
            model.addAttribute("error", "Invalid username or password");
            return "login";
        }

        } // Name of the view to display
    }