package gestionRessource.backend.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gestionRessource.backend.model.Ressource;
import gestionRessource.backend.repository.RessourceRepository;
import gestionRessource.backend.service.RessourceService;

@Service
public class RessourceServiceImpl implements RessourceService {

	@Autowired
	private RessourceRepository ressourceRepository;

	@Override
	public List<Ressource> getAllResources() {
		return ressourceRepository.findAllByOrderByEtatDemandeDesc();
	}

	@Override
	public void deleteRessource(Long id) {
		ressourceRepository.deleteById(id);
	}

	@Override
	public Ressource updateRessource(Ressource ressource) {
		return ressourceRepository.save(ressource);
	}

	@Override
	public Ressource getRessourceById(Long id) {
		Optional<Ressource> optionalRessource = ressourceRepository.findById(id);
		return optionalRessource.get();
	}

	@Override
	public Ressource saveRessource(Ressource ressource) {
		return ressourceRepository.save(ressource);
	}

	@Override
	public List<Ressource> getRessourceByUserId(Long userId) {
		return ressourceRepository.findByUserIdOrderByEtatDemandeDesc(userId);
	}

	@Override
	public List<Ressource> getRessourceDelivred() {
		return ressourceRepository.findAllByCodeInventaireEmpty();
	}

}
