package gestionRessource.backend.service;

import java.util.List;

import gestionRessource.backend.model.Detail;

public interface DetailService {

	Detail saveDetail(Detail detail);

	List<Detail> getDetailByProposition(Long propositionId);

}
