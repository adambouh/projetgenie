package gestionRessource.backend.service;

import java.util.List;

import gestionRessource.backend.model.Proposition;

public interface PropositionService {

	Proposition saveProposition(Proposition proposition);

	List<Proposition> getPropositionOrderByMoinsDisant();

	List<Proposition> getPropositionByFournisseur(Long fournisseurId);

	Proposition getPropositionByFournisseurAndAppelDoffre(Long fournisseurId, Long appelDoffreId);

	List<Proposition> getAllPropositions();
}
