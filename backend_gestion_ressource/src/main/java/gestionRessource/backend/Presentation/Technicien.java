package gestionRessource.backend.Presentation;

import gestionRessource.backend.model.EtatPanne;
import gestionRessource.backend.model.Panne;
import gestionRessource.backend.model.User;
import gestionRessource.backend.service.PanneService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;
import java.util.stream.Collectors;
@Controller
public class Technicien {
    @Autowired
    PanneService panneService;

    @GetMapping("/technicien/acceuil")
    public String showAcceuilTechnicie(HttpServletRequest request, Model model) {
        HttpSession session = request.getSession(false);
        User user = (User) session.getAttribute("user");

        List<Panne> allPanneList = panneService.getAllPannes();

        List<Panne> panneList = panneService.getPannesByUser(user.getId());

        List<Panne> fixedPanne = panneList.stream().filter(panne -> panne.getEtatPanne().equals(EtatPanne.Repare))
                .collect(Collectors.toList());

        List<Panne> pannes = allPanneList.stream().filter(panne -> panne.getEtatPanne().equals(EtatPanne.NonRepare))
                .collect(Collectors.toList());

        model.addAttribute("fixed-pannes", fixedPanne);
        model.addAttribute("list-pannes", pannes);
        return "Technicien/acceuil";
    }
}
