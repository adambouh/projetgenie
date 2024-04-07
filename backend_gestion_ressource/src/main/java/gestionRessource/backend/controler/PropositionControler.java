package gestionRessource.backend.controler;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gestionRessource.backend.dto.DetailRessourceDTO;
import gestionRessource.backend.dto.PropositionDTO;
import gestionRessource.backend.model.AppelDoffre;
import gestionRessource.backend.model.Detail;
import gestionRessource.backend.model.EtatProposition;
import gestionRessource.backend.model.Proposition;
import gestionRessource.backend.model.Ressource;
import gestionRessource.backend.service.AppelDoffreService;
import gestionRessource.backend.service.DetailService;
import gestionRessource.backend.service.PropositionService;
import gestionRessource.backend.service.RessourceService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/proposition")
public class PropositionControler {
	@Autowired
	private PropositionService propositionService;

	@Autowired
	private RessourceService ressourceService;

	@Autowired
	private DetailService detailService;

	@Autowired
	private AppelDoffreService appelDoffreService;

	@PostMapping("/addProposition")
	public Proposition addProposition(@RequestBody PropositionDTO propositionDto) {

		AppelDoffre appelDoffre = appelDoffreService.getAppelDoffreById(propositionDto.getIdAppelDoffre());
		Proposition proposition = new Proposition();
		proposition.setAppelDoffre(appelDoffre);
		proposition.setDateProposition(propositionDto.getDateProposition());
		proposition.setDateLivraison(propositionDto.getDateLivraison());
		proposition.setEtatProposition(EtatProposition.NonTraite);
		proposition.setMontantTotal(propositionDto.getMontantTotal());
		if (propositionDto.getDetailRessourceDto() != null && !propositionDto.getDetailRessourceDto().isEmpty()) {
			List<Detail> detailList = new ArrayList<Detail>();

			for (DetailRessourceDTO detailRessourceDto : propositionDto.getDetailRessourceDto()) {
				Ressource ressource = ressourceService.getRessourceById(detailRessourceDto.getIdRessource());
				Detail detail = new Detail();
				detail.setDureeGarantie(detailRessourceDto.getDureeGarantie());
				detail.setMarque(detailRessourceDto.getMarque());
				detail.setPrix(detailRessourceDto.getPrix());
				detail.setRessource(ressource);
				detailList.add(detail);
				detailService.saveDetail(detail);
			}
			proposition.setDetails(detailList);
		}

		return propositionService.saveProposition(proposition);
	}

	@GetMapping("/getPropositionOrderByMoinsDisant")
	public List<Proposition> getPropositionOrderByMoinsDisant() {
		return propositionService.getPropositionOrderByMoinsDisant();
	}
}
