package gestionRessource.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import gestionRessource.backend.model.Panne;
import gestionRessource.backend.model.User;

public interface PanneRepository extends JpaRepository<Panne, Long> {

	List<Panne> findByUser(User user);
}
