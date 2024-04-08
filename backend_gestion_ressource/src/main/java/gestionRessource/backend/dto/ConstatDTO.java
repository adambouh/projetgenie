package gestionRessource.backend.dto;

import gestionRessource.backend.model.FrequenceConstat;

public class ConstatDTO {
	private String explication;
	private FrequenceConstat frequenceConstat;
	private String ordreLogiciel;
	private String ordreMateriel;
	private Long panne_id;

	public ConstatDTO(String explication, FrequenceConstat frequenceConstat, String ordreLogiciel, String ordreMateriel,
			Long panne_id) {
		super();
		this.explication = explication;
		this.frequenceConstat = frequenceConstat;
		this.ordreLogiciel = ordreLogiciel;
		this.ordreMateriel = ordreMateriel;
		this.panne_id = panne_id;
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

	public String getOrdreLogiciel() {
		return ordreLogiciel;
	}

	public void setOrdreLogiciel(String ordreLogiciel) {
		this.ordreLogiciel = ordreLogiciel;
	}

	public String getOrdreMateriel() {
		return ordreMateriel;
	}

	public void setOrdreMateriel(String ordreMateriel) {
		this.ordreMateriel = ordreMateriel;
	}

	public Long getPanne_id() {
		return panne_id;
	}

	public void setPanne_id(Long panne_id) {
		this.panne_id = panne_id;
	}

}
