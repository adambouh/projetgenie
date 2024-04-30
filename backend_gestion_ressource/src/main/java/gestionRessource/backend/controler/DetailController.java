package gestionRessource.backend.controler;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import gestionRessource.backend.model.Detail;
import gestionRessource.backend.service.DetailService;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/detail")
public class DetailController {
	@Autowired
	private DetailService detailService;

	@GetMapping("/getDetailByProposition")
	public List<Detail> getDetailByProposition(@RequestParam Long propositionId) {
		List<Detail> details = detailService.getDetailByProposition(propositionId);
		return details;
	}
}
