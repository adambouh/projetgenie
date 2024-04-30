package gestionRessource.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import gestionRessource.backend.model.Detail;
import gestionRessource.backend.model.Proposition;

public interface DetailRepository extends JpaRepository<Detail, Long> {

	List<Detail> findByProposition(Proposition proposition);
}
