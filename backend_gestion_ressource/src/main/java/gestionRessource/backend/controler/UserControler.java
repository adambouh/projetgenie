package gestionRessource.backend.controler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import gestionRessource.backend.convert.UserConvert;
import gestionRessource.backend.dto.AuthentificationDTO;
import gestionRessource.backend.dto.UserDTO;
import gestionRessource.backend.model.User;
import gestionRessource.backend.service.UserService;
import gestionRessource.backend.utils.PasswordEncoderUtil;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/user")
public class UserControler {

	@Autowired
	private UserService userService;

	@PostMapping("/authentification")
	public UserDTO authentification(@RequestBody AuthentificationDTO authentification) {
		String encodedPassword = PasswordEncoderUtil.encodePassword(authentification.getPassword());
		User user = userService.getUserByLoginPassword(authentification.getLogin(), encodedPassword);
		if (user != null) {
			return UserConvert.convertUserToUserDto(user);

		} else {
			System.out.println("Login ou Password incorrecte");
			return null;
		}
	}

	@PostMapping("/addUser")
	public ResponseEntity<String> addUser(@RequestBody UserDTO userdto) {
		User user = UserConvert.convertUserDtoToUser(userdto);
		User userAdded = userService.ajouterUser(user);
		if (userAdded != null) {
			return new ResponseEntity<>("User added successfully", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("Failed to add user", HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}
