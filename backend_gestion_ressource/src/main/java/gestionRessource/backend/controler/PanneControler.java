package gestionRessource.backend.controler;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gestionRessource.backend.model.EtatPanne;
import gestionRessource.backend.model.Panne;
import gestionRessource.backend.model.Ressource;
import gestionRessource.backend.model.User;
import gestionRessource.backend.service.PanneService;
import gestionRessource.backend.service.RessourceService;
import gestionRessource.backend.service.UserService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/panne")
public class PanneControler {

	@Autowired
	private PanneService panneService;

	@Autowired
	private RessourceService ressourceService;

	@Autowired
	private UserService userService;

	@PostMapping("/addPanneToRessource")
	public Panne addPanneToRessource(@RequestParam Long ressource_id) {
		Ressource ressource = ressourceService.getRessourceById(ressource_id);
		Panne panne = new Panne();
		panne.setDateSignal(new Date(System.currentTimeMillis()));
		panne.setEtatPanne(EtatPanne.NonRepare);
		panne.setRessource(ressource);
		return panneService.savePanne(panne);

	}

	@PutMapping("/affectPanneToTechnicien")
	public Panne affectPanneToTechnicien(@RequestBody Long user_id, @RequestBody Long panne_id) {
		User user = userService.getUserById(user_id);
		Panne panne = panneService.getPanneById(panne_id);
		panne.setUser(user);
		return panneService.savePanne(panne);

	}

	@GetMapping("/getPannes")
	public List<Panne> getPannes() {

		return panneService.getAllPannes();

	}
}
