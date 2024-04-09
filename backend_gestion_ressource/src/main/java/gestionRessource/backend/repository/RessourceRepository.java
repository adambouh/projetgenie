package gestionRessource.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import gestionRessource.backend.model.Ressource;

public interface RessourceRepository extends JpaRepository<Ressource, Long> {
	List<Ressource> findByUserIdOrderByEtatDemandeDesc(Long userId);

	List<Ressource> findAllByOrderByEtatDemandeDesc();

	@Query("SELECT r FROM Ressource r WHERE r.codeInventaire IS NOT NULL AND r.codeInventaire <> ''")
	List<Ressource> findAllByCodeInventaireEmpty();
}
