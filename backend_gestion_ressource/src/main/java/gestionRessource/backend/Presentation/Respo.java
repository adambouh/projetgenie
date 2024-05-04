package gestionRessource.backend.Presentation;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import gestionRessource.backend.controler.AppelDoffreControler;
import gestionRessource.backend.controler.DepartementControler;
import gestionRessource.backend.controler.DetailController;
import gestionRessource.backend.controler.PanneControler;
import gestionRessource.backend.controler.PropositionControler;
import gestionRessource.backend.controler.UserControler;
import gestionRessource.backend.model.AppelDoffre;
import gestionRessource.backend.model.Departement;
import gestionRessource.backend.model.Detail;
import gestionRessource.backend.model.Panne;
import gestionRessource.backend.model.Proposition;
import gestionRessource.backend.model.Role;
import gestionRessource.backend.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@Controller
public class Respo {
	@Autowired
	UserControler userControler;
	@Autowired
	PanneControler panneControler;
	@Autowired
	DepartementControler departementControler;
	@Autowired
	PropositionControler propositionControler;
	@Autowired
	private DetailController detailController;
	@Autowired
	private AppelDoffreControler appelDoffreControler;

	public Respo(DepartementControler departementControler, PropositionControler propositionControler) {
		this.departementControler = departementControler;
		this.propositionControler = propositionControler;
	}

	@GetMapping("/Respo")
	public String redirec(HttpServletRequest request, Model model) {
		return "redirect:/Respo/acceuil";
	}

	@GetMapping("/Respo/acceuil")
	public String showHomePage(HttpServletRequest request, Model model) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			// Redirect to a secure page, or set user in session, etc.

			if (user != null) {
				// Print the attribute to the console

				if (Objects.equals(user.getRole().toString(), "Responsable")) {
					List<Departement> departements = departementControler.getAllDepartements();
					session.setAttribute("departements", departements);
					List<Proposition> proposition = propositionControler.getAllPropositions();
					session.setAttribute("Proposition", proposition);
					return "responsable de ressource/Acceuil";
				}
			} else {

			}
		}
		model.addAttribute("error", "Invalid username or password");
		return "redirect:/login";

	}

	@GetMapping("Respo/newPersonnels")
	public String New(HttpServletRequest request, Model model) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			// Redirect to a secure page, or set user in session, etc.

			if (user != null) {
				// Print the attribute to the console

				if (Objects.equals(user.getRole().toString(), "Responsable")) {
					List<User> users = userControler.getAllUsers();
					session.setAttribute("Users", users);

					return "responsable de ressource/NewPerson";
				}
			} else {

			}
		}
		model.addAttribute("error", "Invalid username or password");
		return "redirect:/login";

	} // Name of the }

	@GetMapping("/Respo/Personnels")
	public String Personnels(HttpServletRequest request, Model model) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			// Redirect to a secure page, or set user in session, etc.

			if (user != null) {
				// Print the attribute to the console

				if (Objects.equals(user.getRole().toString(), "Responsable")) {
					List<User> users = userControler.getAllUsers();
					session.setAttribute("Users", users);

					return "responsable de ressource/Personnels";
				}
			} else {

			}
		}
		model.addAttribute("error", "Invalid username or password");
		return "redirect:/login";

	} // Name of the }

	@GetMapping("/Respo/Personnels/{login}")
	public String Personnel(@PathVariable("login") String login, HttpServletRequest request, Model model) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			// Redirect to a secure page, or set user in session, etc.

			if (user != null) {
				// Print the attribute to the console
				if (Objects.equals(user.getRole().toString(), "Responsable")) {
					User use = userControler.getUserByLogin(login);
					session.setAttribute("user1", use);
					if (use != null) {
						System.out.println(use.getLogin());

						return "responsable de ressource/Personnel";
					}
					return "redirect:/Respo/Personnels";
				}
			} else {

			}
		}
		model.addAttribute("error", "Invalid username or password");
		return "redirect:/login";

	} // Name of the }

	@GetMapping("/Respo/deletePerso/{login}")
	public String delete(@PathVariable("login") String login, HttpServletRequest request, Model model) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			// Redirect to a secure page, or set user in session, etc.

			if (user != null) {
				// Print the attribute to the console
				if (Objects.equals(user.getRole().toString(), "Responsable")) {
					userControler.DeleteUser(login);

					return "redirect:/Respo/Personnels";
				}
				return "redirect:/login";

			} else {
				return "redirect:/login";

			}
		}
		model.addAttribute("error", "Invalid username or password");
		return "redirect:/login";

	} // Name of the }

	@PostMapping("/modifyPersonnel")
	public String modifyPersonnel(HttpServletRequest request, @RequestParam Long id, @RequestParam String login,
			@RequestParam String firstname, @RequestParam String lastname, @RequestParam String departementId,
			@RequestParam String role) {
		HttpSession session = request.getSession(false);

		// Modify the user and update the session attribute
		User updatedUser = userControler.modifyUser(id, login, firstname, lastname, Long.parseLong(departementId),
				Role.valueOf(role));

		// Redirect to the Profile page
		return "redirect:/Respo/Personnels";
	}

	@PostMapping("/modifyPasswordPersonnel")
	public String modifyPasswordPersonnel(HttpServletRequest request, @RequestParam Long user_id,
			@RequestParam String password) {
		HttpSession session = request.getSession(false);

		// Modify the user and update the session attribute
		User updatedUser = userControler.modifyPasswordUser(user_id, password);

		// Redirect to the Profile page
		return "redirect:/Respo/Personnels";
	}

	@GetMapping("/Respo/Pannes")
	public String Pannes(HttpServletRequest request, Model model) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			// Redirect to a secure page, or set user in session, etc.

			if (user != null) {
				// Print the attribute to the console

				if (Objects.equals(user.getRole().toString(), "Responsable")) {
					List<Panne> allPannes = panneControler.getPannes();

					session.setAttribute("list-pannes", allPannes);

					return "responsable de ressource/Pannes";
				}
			} else {
				return "home";

			}
		}
		model.addAttribute("error", "Invalid username or password");
		return "redirect:/login";

	} // Name of the }

	@GetMapping("/Respo/Panne={id}")
	public String Panne(@PathVariable("id") String id, HttpServletRequest request, Model model) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			// Redirect to a secure page, or set user in session, etc.

			if (user != null) {
				// Print the attribute to the console
				if (Objects.equals(user.getRole().toString(), "Responsable")) {
					Panne panne = panneControler.getPanneById(Long.parseLong(id));
					session.setAttribute("panne", panne);
					if (panne != null) {

						return "responsable de ressource/Panne";
					}
					return "redirect:/Respo/Pannes";
				}
			} else {

			}
		}
		model.addAttribute("error", "Invalid username or password");
		return "redirect:/login";

	} // Name of the }

	@GetMapping("/Respo/Propositions")
	public String Proposition(HttpServletRequest request, Model model) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			// Redirect to a secure page, or set user in session, etc.

			if (user != null) {
				// Print the attribute to the console

				if (Objects.equals(user.getRole().toString(), "Responsable")) {
					List<Proposition> propositions = propositionControler.getAllPropositions();
					session.setAttribute("propositions", propositions);

					return "responsable de ressource/Propositions";
				}
			} else {
				return "home";

			}
		}
		model.addAttribute("error", "Invalid username or password");
		return "redirect:/login";

	} // Name of the }

	@GetMapping("/Respo/propositions/{id}")
	public String Proposition(@PathVariable("id") String id, HttpServletRequest request, Model model) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			// Redirect to a secure page, or set user in session, etc.

			if (user != null) {
				// Print the attribute to the console
				if (Objects.equals(user.getRole().toString(), "Responsable")) {
					Optional<Proposition> proposition = propositionControler.getPropositionById(Long.parseLong(id));
					session.setAttribute("proposition", proposition);
					if (proposition.isPresent()) {
						List<Detail> propositionDetails = (List<Detail>) detailController
								.getDetailByProposition(proposition.get().getId());
						session.setAttribute("propositionDetails", propositionDetails);
						return "responsable de ressource/proposition";
					}
					return "redirect:/Respo/Propositions";
				}
			} else {

			}
		}
		model.addAttribute("error", "Invalid username or password");
		return "redirect:/login";

	}

	@GetMapping("/Respo/AppelDoffres")
	public String AppelDoffres(HttpServletRequest request, Model model) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");
			// Redirect to a secure page, or set user in session, etc.

			if (user != null) {
				// Print the attribute to the console

				if (Objects.equals(user.getRole().toString(), "Responsable")) {
					List<AppelDoffre> appelDoffres = appelDoffreControler.getAllAppelDoffres();
					session.setAttribute("appelDoffres", appelDoffres);

					return "responsable de ressource/AppelDOffres";
				}
			} else {

			}
		}
		model.addAttribute("error", "Invalid username or password");
		return "redirect:/login";

	} // Name of the }
		// Name of the }

}
