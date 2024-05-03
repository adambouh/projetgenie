package gestionRessource.backend.Presentation;

import gestionRessource.backend.controler.*;
import gestionRessource.backend.model.Departement;
import gestionRessource.backend.model.Proposition;
import gestionRessource.backend.model.Role;
import gestionRessource.backend.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

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

            if (Objects.equals(user.getRole().toString(),"Responsable"))
            {
                List<Departement> departements = departementControler.getAllDepartements();
                session.setAttribute("departements", departements);
                List<Proposition> proposition = propositionControler.getAllPropositions();
                session.setAttribute("Proposition", proposition);
                return "responsable de ressource/Acceuil";}
        } else {

        }
    }
    model.addAttribute("error", "Invalid username or password");
    return "redirect:/login";


}

    @GetMapping("Respo/newPersonnels")
    public String New(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            User user = (User) session.getAttribute("user");
            // Redirect to a secure page, or set user in session, etc.

            if (user != null) {
                // Print the attribute to the console

                if (Objects.equals(user.getRole().toString(),"Responsable"))
                {
                    List<User> users = userControler.getAllUsers();
                    session.setAttribute("Users", users);

                    return "responsable de ressource/NewPerson";}
            } else {

            }
        }
        model.addAttribute("error", "Invalid username or password");
        return "redirect:/login";


    } // Name of the }

    @GetMapping("/Respo/Personnels")
    public String Personnels(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            User user = (User) session.getAttribute("user");
            // Redirect to a secure page, or set user in session, etc.

            if (user != null) {
                // Print the attribute to the console

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
    @GetMapping("/Respo/Personnels/{login}")
    public String Personnel(@PathVariable("login") String login, HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            User user = (User) session.getAttribute("user");
            // Redirect to a secure page, or set user in session, etc.

            if (user != null) {
                // Print the attribute to the console
                if (Objects.equals(user.getRole().toString(),"Responsable"))
                {
                    User use = userControler.getUserByLogin(login);
                    session.setAttribute("user1", use);
                    if(use != null)
                    {System.out.println(use.getLogin());

                    return "responsable de ressource/Personnel";}
                    return "redirect:/Respo/Personnels";
                }
            } else {

            }
        }
        model.addAttribute("error", "Invalid username or password");
        return "redirect:/login";


    } // Name of the }
    @PostMapping("/modifyPersonnel")
    public String modifyPersonnel(HttpServletRequest request,
                             @RequestParam Long id,
                             @RequestParam String login,
                             @RequestParam String firstname,
                             @RequestParam String lastname,
                             @RequestParam String departementId, @RequestParam String role) {
        HttpSession session = request.getSession(false);

        // Modify the user and update the session attribute
        User updatedUser = userControler.modifyUser(id, login, firstname, lastname, Long.parseLong(departementId), Role.valueOf(role));


        // Redirect to the Profile page
        return "redirect:/Respo/Personnels";
    }
    @PostMapping("/modifyPasswordPersonnel")
    public String modifyPasswordPersonnel(HttpServletRequest request,
                                     @RequestParam Long user_id, @RequestParam String password)  {
        HttpSession session = request.getSession(false);

        // Modify the user and update the session attribute
        User updatedUser = userControler.modifyPasswordUser(user_id, password) ;

        // Redirect to the Profile page
        return "redirect:/Respo/Personnels";
    }
}
