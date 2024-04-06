package gestionRessource.backend.service;

import gestionRessource.backend.model.User;

public interface UserService {
	User getUserByLoginPassword(String login, String password);

	User ajouterUser(User user);

	User getUserById(Long userId);
}
