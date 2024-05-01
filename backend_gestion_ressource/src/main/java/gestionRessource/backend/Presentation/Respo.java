package gestionRessource.backend.Presentation;

import gestionRessource.backend.controler.*;
import gestionRessource.backend.model.Departement;
import gestionRessource.backend.model.Proposition;
import gestionRessource.backend.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.Objects;
@Controller
public class Respo{
    @Autowired
    UserControler userControler;
    DepartementControler departementControler;
    PropositionControler propositionControler;
    public  Respo(DepartementControler departementControler, PropositionControler propositionControler) {
        this.departementControler = departementControler;
        this.propositionControler = propositionControler;
    }
    @GetMapping("/Respo")
    public String redirec(HttpServletRequest request, Model model){
        return "redirect:/Respo/acceuil";
    }
@GetMapping("/Respo/acceuil")
public String showHomePage(HttpServletRequest request, Model model) {
    HttpSession session = request.getSession(false);
    if (session != null) {
        User user = (User) session.getAttribute("user");
        // Redirect to a secure page, or set user in session, etc.

        if (user != null) {
            // Print the attribute to the console
            System.out.println("Session user: " + user);
            System.out.println(user.getRole().toString());
            if (Objects.equals(user.getRole().toString(),"Responsable"))
            {
                List<Departement> departements = departementControler.getAllDepartements();
                session.setAttribute("departements", departements);
                List<Proposition> proposition = propositionControler.getAllPropositions();
                session.setAttribute("Proposition", proposition);
                System.out.println(proposition);
                return "responsable de ressource/Acceuil";}
        } else {

        }
    }
    model.addAttribute("error", "Invalid username or password");
    return "redirect:/login";


}
    @GetMapping("/Respo/Personnels")
    public String Personnels(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            User user = (User) session.getAttribute("user");
            // Redirect to a secure page, or set user in session, etc.

            if (user != null) {
                // Print the attribute to the console
                System.out.println("Session user: " + user);
                System.out.println(user.getRole().toString());
                if (Objects.equals(user.getRole().toString(),"Responsable"))
                {
                    List<User> users = userControler.getAllUsers();
                    session.setAttribute("Users", users);

                    return "responsable de ressource/Personnels";}
            } else {

            }
        }
        model.addAttribute("error", "Invalid username or password");
        return "redirect:/login";


    } // Name of the }
}
