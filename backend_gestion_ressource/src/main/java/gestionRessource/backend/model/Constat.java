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
@Table(name = "Constat")
public class Constat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "explication")
	private String explication;

	@Column(name = "frequence")
	private String frequence;

	@Column(name = "ordreLogiciel")
	private String ordreLogiciel;

	@ManyToOne
	@JoinColumn(name = "panne_id")
	private Panne panne;

}
