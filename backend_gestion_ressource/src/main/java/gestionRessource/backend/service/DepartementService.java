package gestionRessource.backend.service;

import gestionRessource.backend.model.Departement;

public interface DepartementService {

	Departement getDepartementById(Long id);

	Departement ajouterDepartement(Departement departement);

	void deleteDepartement(Long id);

}
