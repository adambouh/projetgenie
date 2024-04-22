package gestionRessource.backend.model;

import java.sql.Date;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "Constat")
public class Constat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "explication")
	private String explication;

	@Enumerated(EnumType.STRING)
	private FrequenceConstat frequenceConstat;

	@Column(name = "ordre")
	private String ordre;

	@Column(name = "dateApparition")
	private Date dateApparition;

	@ManyToOne
	@JoinColumn(name = "panne_id")
	@JsonIgnore
	private Panne panne;

	public Constat() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Constat(Long id, String explication, FrequenceConstat frequenceConstat, String ordre, Date dateApparition,
			Panne panne) {
		super();
		this.id = id;
		this.explication = explication;
		this.frequenceConstat = frequenceConstat;
		this.ordre = ordre;
		this.dateApparition = dateApparition;
		this.panne = panne;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getExplication() {
		return explication;
	}

	public void setExplication(String explication) {
		this.explication = explication;
	}

	public FrequenceConstat getFrequenceConstat() {
		return frequenceConstat;
	}

	public void setFrequenceConstat(FrequenceConstat frequenceConstat) {
		this.frequenceConstat = frequenceConstat;
	}

	public String getOrdre() {
		return ordre;
	}

	public void setOrdre(String ordre) {
		this.ordre = ordre;
	}

	public Panne getPanne() {
		return panne;
	}

	public void setPanne(Panne panne) {
		this.panne = panne;
	}

	public Date getDateApparition() {
		return dateApparition;
	}

	public void setDateApparition(Date dateApparition) {
		this.dateApparition = dateApparition;
	}

}
