package gestionRessource.backend.service;

import java.util.List;

import gestionRessource.backend.model.User;

public interface UserService {
	User getUserByLoginPassword(String login, String password);

	User ajouterUser(User user);

	User getUserById(Long userId);

	List<User> getAllUsers();

	User getUserByLogin(String login);

	User modifierUser(User user);
}
