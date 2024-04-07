package gestionRessource.backend.model;

import java.sql.Date;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Proposition")
public class Proposition {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "dateProposition")
	private Date dateProposition;

	@Column(name = "dateLivraison")
	private Date dateLivraison;

	@Enumerated(EnumType.STRING)
	private EtatProposition etatProposition;

	@Column(name = "montantTotal")
	private double montantTotal;

	@OneToMany(mappedBy = "proposition")
	private List<Detail> details;

	@ManyToOne
	@JoinColumn(name = "appelDoffre_id")
	@JsonIgnoreProperties({ "ressources", "propositions" })
	private AppelDoffre appelDoffre;

	@ManyToOne
	@JoinColumn(name = "fourniseur_id")
	private Fournisseur fournisseur;

	public Proposition() {
		super();
	}

	public Proposition(Long id, Date dateProposition, Date dateLivraison, EtatProposition etatProposition,
			double montantTotal, List<Detail> details, AppelDoffre appelDoffre, Fournisseur fournisseur) {
		super();
		this.id = id;
		this.dateProposition = dateProposition;
		this.dateLivraison = dateLivraison;
		this.etatProposition = etatProposition;
		this.montantTotal = montantTotal;
		this.details = details;
		this.appelDoffre = appelDoffre;
		this.fournisseur = fournisseur;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Date getDateProposition() {
		return dateProposition;
	}

	public void setDateProposition(Date dateProposition) {
		this.dateProposition = dateProposition;
	}

	public Date getDateLivraison() {
		return dateLivraison;
	}

	public void setDateLivraison(Date dateLivraison) {
		this.dateLivraison = dateLivraison;
	}

	public EtatProposition getEtatProposition() {
		return etatProposition;
	}

	public void setEtatProposition(EtatProposition etatProposition) {
		this.etatProposition = etatProposition;
	}

	public double getMontantTotal() {
		return montantTotal;
	}

	public void setMontantTotal(double montantTotal) {
		this.montantTotal = montantTotal;
	}

	public List<Detail> getDetails() {
		return details;
	}

	public void setDetails(List<Detail> details) {
		this.details = details;
	}

	public AppelDoffre getAppelDoffre() {
		return appelDoffre;
	}

	public void setAppelDoffre(AppelDoffre appelDoffre) {
		this.appelDoffre = appelDoffre;
	}

	public Fournisseur getFournisseur() {
		return fournisseur;
	}

	public void setFournisseur(Fournisseur fournisseur) {
		this.fournisseur = fournisseur;
	}

}
