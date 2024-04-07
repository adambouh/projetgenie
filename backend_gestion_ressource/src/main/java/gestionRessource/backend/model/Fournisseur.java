package gestionRessource.backend.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity
public class Fournisseur extends User {

	@Column(name = "adresse")
	private String adresse;

	@Column(name = "etatFournisseur")
	private String etatFournisseur;

	@Column(name = "gerant")
	private String gerant;

	@Column(name = "lieu")
	private String lieu;

	@Column(name = "scorePanne")
	private int scorePanne;

	@Column(name = "siteInternet")
	private String siteInternet;

	@OneToMany(mappedBy = "fournisseur")
	private List<Proposition> propositions;

	public Fournisseur() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Fournisseur(Long id, String first_name, String last_name, String login, String password, Role role,
			List<Notification> notifications, Departement departement) {
		super(id, first_name, last_name, login, password, role, notifications, departement);
		// TODO Auto-generated constructor stub
	}

	public String getAdresse() {
		return adresse;
	}

	public void setAdresse(String adresse) {
		this.adresse = adresse;
	}

	public String getEtatFournisseur() {
		return etatFournisseur;
	}

	public void setEtatFournisseur(String etatFournisseur) {
		this.etatFournisseur = etatFournisseur;
	}

	public String getGerant() {
		return gerant;
	}

	public void setGerant(String gerant) {
		this.gerant = gerant;
	}

	public String getLieu() {
		return lieu;
	}

	public void setLieu(String lieu) {
		this.lieu = lieu;
	}

	public int getScorePanne() {
		return scorePanne;
	}

	public void setScorePanne(int scorePanne) {
		this.scorePanne = scorePanne;
	}

	public String getSiteInternet() {
		return siteInternet;
	}

	public void setSiteInternet(String siteInternet) {
		this.siteInternet = siteInternet;
	}

	public List<Proposition> getPropositions() {
		return propositions;
	}

	public void setPropositions(List<Proposition> propositions) {
		this.propositions = propositions;
	}

}
