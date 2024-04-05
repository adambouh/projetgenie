package gestionRessource.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import gestionRessource.backend.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
	User findByLoginAndPassword(String login, String password);
}
