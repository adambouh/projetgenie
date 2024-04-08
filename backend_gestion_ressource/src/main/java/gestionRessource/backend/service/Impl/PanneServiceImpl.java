package gestionRessource.backend.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gestionRessource.backend.model.Panne;
import gestionRessource.backend.repository.PanneRepository;
import gestionRessource.backend.service.PanneService;

@Service
public class PanneServiceImpl implements PanneService {

	@Autowired
	private PanneRepository panneRepository;

	@Override
	public List<Panne> getAllPannes() {
		return panneRepository.findAll();
	}

	@Override
	public Panne savePanne(Panne panne) {
		return panneRepository.save(panne);
	}

	@Override
	public Panne getPanneById(Long panne_id) {
		Optional<Panne> panneOptional = panneRepository.findById(panne_id);
		return panneOptional.get();
	}

}
