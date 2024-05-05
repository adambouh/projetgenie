package gestionRessource.backend.Presentation;

import gestionRessource.backend.controler.NotificationControler;
import gestionRessource.backend.controler.PanneControler;
import gestionRessource.backend.controler.RessourceControler;
import gestionRessource.backend.controler.UserControler;
import gestionRessource.backend.model.Notification;
import gestionRessource.backend.model.Panne;
import gestionRessource.backend.model.Ressource;
import gestionRessource.backend.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;
import java.util.Objects;

@Controller
@RequestMapping("/chefDepartement")
public class ChefDepartement {

    @Autowired
    private UserControler userControler;
    @Autowired
    private NotificationControler notificationControler;
    @Autowired
    private RessourceControler ressourceControler;
    @Autowired
    private PanneControler panneControler;

    @GetMapping("/home")
    public String home(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        if (session != null && session.getAttribute("user") instanceof User) {
            User currentUser = (User) session.getAttribute("user");
            List<Notification> notifications = notificationControler.getNotificationByUser(currentUser.getId());
            if (Objects.nonNull(notifications)) {
                session.setAttribute("notifications", notifications);
            }
            List<Ressource> listeressources = ressourceControler.getRessourcesByUserId(currentUser.getId());
            session.setAttribute("listressources", listeressources);

            // Récupérer les pannes pour chaque ressource
            for (Ressource ressource : listeressources) {
                List<Panne> listepannes = panneControler.getPanneByRessourceId(ressource.getId());
                session.setAttribute("listepannes_" + ressource.getId(), listepannes);
            }

            model.addAttribute("fullName", currentUser.getFirst_name() + " " + currentUser.getLast_name());
            return "chefDepartement/homeChefDepartement";
        } else {

            return "redirect:/login";
        }

    }
}