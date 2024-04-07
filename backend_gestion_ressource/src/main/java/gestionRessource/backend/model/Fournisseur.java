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
	private String scorePanne;

	@Column(name = "siteInternet")
	private String siteInternet;

	@OneToMany(mappedBy = "fournisseur")
	private List<Proposition> propositions;

}
