package gestionRessource.backend.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gestionRessource.backend.dto.FournisseurDTO;
import gestionRessource.backend.model.Fournisseur;
import gestionRessource.backend.model.Role;
import gestionRessource.backend.service.FournisseurService;
import gestionRessource.backend.utils.PasswordEncoderUtil;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/fournisseur")
public class FournisseurControler {
	@Autowired
	private FournisseurService fournisseurService;

	@PostMapping("/addFournisseur")
	public Fournisseur addFournisseur(@RequestBody FournisseurDTO fournisseurDto) {
		Fournisseur fournisseur = new Fournisseur();
		fournisseur.setSociete(fournisseurDto.getSociete());
		fournisseur.setLogin(fournisseurDto.getSociete());
		fournisseur.setRole(Role.Fournisseur);
		String encodedPassword = PasswordEncoderUtil.encodePassword(fournisseurDto.getPassword());
		fournisseur.setPassword(encodedPassword);
		return fournisseurService.ajouterFournisseur(fournisseur);

	}
}
