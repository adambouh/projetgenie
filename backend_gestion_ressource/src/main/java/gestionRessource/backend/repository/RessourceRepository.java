package gestionRessource.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import gestionRessource.backend.model.Ressource;

public interface RessourceRepository extends JpaRepository<Ressource, Long> {
	List<Ressource> findByUserIdOrderByEtatDemandeDesc(Long userId);

	List<Ressource> findAllByOrderByEtatDemandeDesc();
}
