package gestionRessource.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Detail")
public class Detail {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "dureeGarantie")
	private boolean dureeGarantie;

	@Column(name = "marque")
	private double marque;

	@Column(name = "prix")
	private double prix;

	@ManyToOne
	@JoinColumn(name = "ressource_id")
	private Ressource ressource;

	@ManyToOne
	@JoinColumn(name = "proposition_id")
	private Proposition proposition;

	public Detail() {
		super();
	}

	public Detail(Long id, boolean dureeGarantie, double marque, double prix, Ressource ressource,
			Proposition proposition) {
		super();
		this.id = id;
		this.dureeGarantie = dureeGarantie;
		this.marque = marque;
		this.prix = prix;
		this.ressource = ressource;
		this.proposition = proposition;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public boolean isDureeGarantie() {
		return dureeGarantie;
	}

	public void setDureeGarantie(boolean dureeGarantie) {
		this.dureeGarantie = dureeGarantie;
	}

	public double getMarque() {
		return marque;
	}

	public void setMarque(double marque) {
		this.marque = marque;
	}

	public double getPrix() {
		return prix;
	}

	public void setPrix(double prix) {
		this.prix = prix;
	}

	public Ressource getRessource() {
		return ressource;
	}

	public void setRessource(Ressource ressource) {
		this.ressource = ressource;
	}

	public Proposition getProposition() {
		return proposition;
	}

	public void setProposition(Proposition proposition) {
		this.proposition = proposition;
	}

}
