package gestionRessource.backend.Presentation;

import gestionRessource.backend.controler.FournisseurControler;
import gestionRessource.backend.controler.UserControler;
import gestionRessource.backend.model.Role;
import gestionRessource.backend.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.Objects;

@Controller
public class Profile {

    @Autowired
    private UserControler userControler;

    @Autowired
    private FournisseurControler fournisseurControler;
    @Autowired
    private HttpSession httpSession;

    @GetMapping("/Profile")
    public String showHomePage(HttpServletRequest request, Model model) {
        // Get an attribute from the session
        HttpSession session = request.getSession(false);
        if (session != null) {       //hhh
            User user = (User) session.getAttribute("user");
            // Redirect to a secure page, or set user in session, etc.
            System.out.println(user);
            if (user != null) {
                if (user.getRole().equals(Role.Technicien)) {
                    return "/Technicien/profile";
                }
                if (user.getRole().equals(Role.Responsable) ){
                    return "/responsable de ressource/profile"; // Redirect to the "Responsable" page
                }
                // Print the attribute to the console
                System.out.println("Session user: " + user.toString());
            } else {
                System.out.println("No user found in session.");
            }

            // You can also add session attributes to the Model to display on a w
        return "redirect:/login";
        } else {
            model.addAttribute("error", "Invalid username or password");
            return "redirect:/login";
        }

    } // Name of the view to display
    @PostMapping("/modifyUser")
    public String modifyUser(HttpServletRequest request,
                             @RequestParam Long id,
                             @RequestParam String login,
                             @RequestParam String firstname,
                             @RequestParam String lastname,
                             @RequestParam Long departementId,@RequestParam Role role) {
        HttpSession session = request.getSession(false);

        // Modify the user and update the session attribute
        User updatedUser = userControler.modifyUser(id, login, firstname, lastname, departementId,role);
        session.setAttribute("user", updatedUser);

        // Redirect to the Profile page
        return "redirect:/Profile";
    }
    @PostMapping("/modifyPasswordUser")
    public String modifyPasswordUser(HttpServletRequest request,
                             @RequestParam Long user_id, @RequestParam String password)  {
        HttpSession session = request.getSession(false);

        // Modify the user and update the session attribute
        User updatedUser = userControler.modifyPasswordUser(user_id, password) ;
        session.setAttribute("user", updatedUser);

        // Redirect to the Profile page
        return "redirect:/Profile";
    }
}


