package gestionRessource.backend.service.Impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gestionRessource.backend.model.User;
import gestionRessource.backend.repository.UserRepository;
import gestionRessource.backend.service.UserService;

@Service
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public User getUserByLoginPassword(String login, String password) {
		return userRepository.findByLoginAndPassword(login, password);
	}

	@Override
	public User ajouterUser(User user) {
		return userRepository.save(user);
	}

}
