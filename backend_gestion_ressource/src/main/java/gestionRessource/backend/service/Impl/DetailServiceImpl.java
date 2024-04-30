package gestionRessource.backend.service.Impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import gestionRessource.backend.model.Detail;
import gestionRessource.backend.model.Proposition;
import gestionRessource.backend.repository.DetailRepository;
import gestionRessource.backend.repository.PropositionRepository;
import gestionRessource.backend.service.DetailService;

@Service
public class DetailServiceImpl implements DetailService {
	@Autowired
	private DetailRepository detailRepository;

	@Autowired
	private PropositionRepository propositionRepository;

	@Override
	public Detail saveDetail(Detail detail) {
		return detailRepository.save(detail);
	}

	@Override
	public List<Detail> getDetailByProposition(Long propositionId) {
		Optional<Proposition> propositionOptional = propositionRepository.findById(propositionId);
		Proposition proposition = propositionOptional.get();
		return detailRepository.findByProposition(proposition);
	}
}
