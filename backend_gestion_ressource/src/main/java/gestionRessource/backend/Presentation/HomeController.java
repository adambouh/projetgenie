package gestionRessource.backend.Presentation;

import gestionRessource.backend.model.Departement;
import gestionRessource.backend.model.User;
import gestionRessource.backend.controler.DepartementControler;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Objects;

@Controller
public class HomeController {

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
