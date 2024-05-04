package gestionRessource.backend.Presentation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import gestionRessource.backend.controler.PanneControler;
import gestionRessource.backend.controler.RessourceControler;
import gestionRessource.backend.controler.UserControler;
import gestionRessource.backend.dto.PanneDTO;
import gestionRessource.backend.model.EtatPanne;
import gestionRessource.backend.model.Panne;
import gestionRessource.backend.model.Ressource;
import gestionRessource.backend.model.Role;
import gestionRessource.backend.model.User;
import gestionRessource.backend.service.PanneService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class Enseignant {

    @Autowired
    UserControler userControler;

    @Autowired
    RessourceControler ressourceControler;

    @Autowired
    PanneControler panneControler; // Ajoutez cette annotation pour injecter PanneControler

    @GetMapping("/enseignant/acceuil")
    public String showAcceuilEnseignant(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            User user = (User) session.getAttribute("user");

            if (user != null && user.getRole().equals(Role.Enseignant)) {
                List<Ressource> listeressources = ressourceControler.getRessourcesByUserId(user.getId());
                session.setAttribute("listressources", listeressources);

                // Récupérer les pannes pour chaque ressource
                for (Ressource ressource : listeressources) {
                    List<Panne> listepannes = panneControler.getPanneByRessourceId(ressource.getId());
                    session.setAttribute("listepannes_" + ressource.getId(), listepannes);
                }

                return "Enseignant/Acceuil";
            }
        }
        model.addAttribute("error", "Invalid username or password");
        return "redirect:/login";
    }
    
    @PostMapping("/enseignant/addPanne")
    public String addPanneToRessource(@RequestParam("idRessource") Long idRessource, HttpServletRequest request, Model model, RedirectAttributes redirectAttributes) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            User user = (User) session.getAttribute("user");

            if (user != null) {
                if (user.getRole().equals(Role.Enseignant)) {
                    // Appel de la méthode du backend pour ajouter la panne
                    Panne panne = panneControler.addPanneToRessource(idRessource);
                    
                    if (panne != null) {
                        redirectAttributes.addFlashAttribute("messageSucces", "La panne a été signalée avec succès.");
                        return "redirect:/enseignant/acceuil";
                    } else {
                        redirectAttributes.addFlashAttribute("messageError", "Une erreur s'est produite lors de la signalisation de la panne.");
                        return "redirect:/enseignant/acceuil";
                    }
                } 
            } 
        }
        // Que voulez-vous faire si la session est null ?
        return "redirect:/login";
    }

}
