package gestionRessource.backend.Presentation;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import gestionRessource.backend.controler.ConstatControler;
import gestionRessource.backend.controler.PanneControler;
import gestionRessource.backend.controler.UserControler;
import gestionRessource.backend.dto.ConstatDTO;
import gestionRessource.backend.dto.PanneDTO;
import gestionRessource.backend.model.EtatPanne;
import gestionRessource.backend.model.FrequenceConstat;
import gestionRessource.backend.model.Panne;
import gestionRessource.backend.model.Role;
import gestionRessource.backend.model.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;

@Controller
public class Technicien {
	@Autowired
	UserControler userControler;

	@Autowired
	PanneControler panneControler;

	@Autowired
	ConstatControler constatControler;
	
	@GetMapping("/technicien/acceuil")
	public String showAcceuilTechnicie1(HttpServletRequest request, Model model) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");

			if (user != null) {
				// Print the attribute to the console
				System.out.println("Session user: " + user);
				System.out.println(user.getRole().toString());
				if (user.getRole().equals(Role.Technicien)) {

					List<Panne> fixedPanne = panneControler.getPanneByUserId(user.getId());
					session.setAttribute("fixed-pannes", fixedPanne);

					List<Panne> allPannes = panneControler.getPannes();
					List<Panne> nonReparees = allPannes.stream()
							.filter(panne -> panne.getEtatPanne().equals(EtatPanne.NonRepare))
							.collect(Collectors.toList());

					session.setAttribute("list-pannes", nonReparees);

					return "Technicien/acceuil";
				}
			} else {
				return "redirect:/login";
			}
		}
		return "redirect:/login";
	}
	
	@GetMapping("/technicien/addPanne")
	public String addPanneToTechnicien(@RequestParam("idPanne") Long idPanne, HttpServletRequest request, Model model, RedirectAttributes redirectAttributes) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");

			if (user != null) {
				
				if (user.getRole().equals(Role.Technicien)) {
					
					PanneDTO panneDTO = new PanneDTO(EtatPanne.EnCours);
					
					if( panneControler.affectPanneToTechnicien(idPanne, user.getId()) != null && panneControler.modifyPanne(idPanne, panneDTO) != null) {
						redirectAttributes.addFlashAttribute("messageSucces", "La panne a été ajoutée à votre liste, Veuillez controller ce panne");
						return "redirect:/technicien/acceuil";
					} else {
						redirectAttributes.addFlashAttribute("messageError", "Une erreur se produite lors d'affection de panne");
						return "redirect:/technicien/acceuil";
					}

				}
			} else {
				return "redirect:/login";
			}
		}
		return "redirect:/login";
	}
	
	@PostMapping("/technicien/modifierPanne")
	public String updatePanne(HttpServletRequest request, RedirectAttributes redirectAttributes) {
		HttpSession session = request.getSession(false);
		if (session != null) {
			User user = (User) session.getAttribute("user");

			if (user != null) {
				
				if (user.getRole().equals(Role.Technicien)) {
					
					// Récupérer les valeurs des inputs
					String idPanne = request.getParameter("idPanne");
			        String codeInventaire = request.getParameter("codeInventaire");
			        String typeRessource = request.getParameter("typeRessource");
			        String etat = request.getParameter("etat");
			        
			        // creation d'un objet dto panne
			        PanneDTO panneDTO = new PanneDTO();
			        if (etat.equals("Repare")) {
			        	panneDTO.setEtatPanne(EtatPanne.Repare);
			        	
			        	// sauvgarder cette cas
			        	if( panneControler.modifyPanne(Long.parseLong(idPanne), panneDTO) != null ) {
			        		redirectAttributes.addFlashAttribute("messageSucces", "La panne a été modifiée avec succès ( Réparée ) ");
							return "redirect:/technicien/acceuil";
						} else {
							redirectAttributes.addFlashAttribute("messageError", "Une erreur se produite lors de la modification de votre panne !");
							return "redirect:/technicien/acceuil";
						}
			        } else {
			        	panneDTO.setEtatPanne(EtatPanne.Severe);
			        	
			        	// récuperation des autres informations
			        	String dateApparition = request.getParameter("dateApparition");			        	
			        	String explication = request.getParameter("explication");
			        	String frequence = request.getParameter("frequence");
			        	
			        	String ordre = "";
			        	if (typeRessource.equals("Imprimante")) {
			        		ordre = "Materiel";
			        	} else {
			        		ordre = request.getParameter("ordre");
			        		if ( ordre.equals("Logiciel") ) {
			        			ordre = request.getParameter("ordreLogiciel");
			        		}
			        	}
			        	
			        	
			        	// création d'une constat
			        	ConstatDTO constatDTO = new ConstatDTO();
			        	constatDTO.setPanne_id(Long.parseLong(idPanne));
			        	constatDTO.setExplication(explication);
			        	constatDTO.setOrdre(ordre);
			        	
			        	SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			        	try {
			        		
							java.util.Date date = sdf.parse(dateApparition);
							Date dateApparitionSQL = new Date(date.getTime());
							constatDTO.setDateApparition(dateApparitionSQL);
							
						} catch (ParseException e) {
							System.err.println("Erreur lors de formatage de date de string vers une date java");
						}
			        	
			        	if ( frequence.equals("rare")) {
			        		constatDTO.setFrequenceConstat(FrequenceConstat.rare);
			        		
			        	} else if ( frequence.equals("frequente") ) {
			        	 	constatDTO.setFrequenceConstat(FrequenceConstat.frequente);
			        	} else {
			        		constatDTO.setFrequenceConstat(FrequenceConstat.permanente);
			        	}
			        	// voila on a terminé la remplissage de la constat
			        	
			        	// sauvgarder cette cas
			        	if( panneControler.modifyPanne(Long.parseLong(idPanne), panneDTO) != null && constatControler.addConstat(constatDTO) != null) {
			        		redirectAttributes.addFlashAttribute("messageSucces", "Panne et Constat ont été modifiées avec succès( Sévère ) ");
							return "redirect:/technicien/acceuil";
						} else {
							redirectAttributes.addFlashAttribute("messageError", "Une erreur se produite lors de la modification de votre panne !");
							return "redirect:/technicien/acceuil";
						}
			        }
				}
				
			} else {
				return "redirect:/login";
			}
		}
		return "redirect:/login";
	}
	
}