package gestionRessource.backend.service;

import java.util.List;

import gestionRessource.backend.model.Ressource;

public interface RessourceService {
	List<Ressource> getAllResources();

	void deleteRessource(Long id);

	Ressource updateRessource(Ressource ressource);

	Ressource getRessourceById(Long id);

	Ressource saveRessource(Ressource ressource);

	List<Ressource> getRessourceByUserId(Long userId);

	List<Ressource> getRessourceDelivred();

	List<Ressource> getRessourcesByDep(Long depId);
}
