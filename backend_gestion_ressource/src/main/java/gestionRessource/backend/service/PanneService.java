package gestionRessource.backend.service;

import java.util.List;

import gestionRessource.backend.model.Panne;

public interface PanneService {
	Panne savePanne(Panne panne);

	List<Panne> getAllPannes();

	Panne getPanneById(Long panne_id);

}
