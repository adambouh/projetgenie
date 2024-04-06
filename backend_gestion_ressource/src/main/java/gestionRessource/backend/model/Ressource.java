package gestionRessource.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Ressource")
@Inheritance(strategy = InheritanceType.JOINED)
public class Ressource {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "codeInventaire")
	private String codeInventaire;

	@Column(name = "marque")
	private String marque;

	@Enumerated(EnumType.STRING)
	private EtatDemande etatDemande;

	@ManyToOne
	@JoinColumn(name = "user_id")
	@JsonIgnoreProperties({ "notifications", "ressources", "password" })
	private User user;

	public Ressource() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Ressource(Long id, String codeInventaire, String marque, EtatDemande etatDemande, User user) {
		super();
		this.id = id;
		this.codeInventaire = codeInventaire;
		this.marque = marque;
		this.etatDemande = etatDemande;
		this.user = user;
	}

	public String getCodeInventaire() {
		return codeInventaire;
	}

	public void setCodeInventaire(String codeInventaire) {
		this.codeInventaire = codeInventaire;
	}

	public String getMarque() {
		return marque;
	}

	public void setMarque(String marque) {
		this.marque = marque;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public EtatDemande getEtatDemande() {
		return etatDemande;
	}

	public void setEtatDemande(EtatDemande etatDemande) {
		this.etatDemande = etatDemande;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
	}

}