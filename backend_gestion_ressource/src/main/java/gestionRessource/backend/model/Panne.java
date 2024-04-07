package gestionRessource.backend.model;

import java.sql.Date;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "Panne")
public class Panne {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "dateSignal")
	private Date dateSignal;

	@Column(name = "etat")
	private String etat;

	@OneToMany(mappedBy = "panne")
	private List<Constat> constats;

}
