package gestionRessource.backend.dto;

import java.util.List;

public class NotificationDTO {
	private String message;
	private Long userId;
	private List<Long> listeUserId;
	private Long depId;

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public List<Long> getListeUserId() {
		return listeUserId;
	}

	public void setListeUserId(List<Long> listeUserId) {
		this.listeUserId = listeUserId;
	}

	public Long getDepId() {
		return depId;
	}

	public void setDepId(Long depId) {
		this.depId = depId;
	}

}
