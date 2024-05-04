<%@page import="gestionRessource.backend.model.AppelDoffre"%>
<%@page import="java.util.List"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Appels D'offres</title>
<link rel="stylesheet" href="./../../css/style_fournisseur.css">

</head>
<body>
	<div class="fournisseur-container">

		<!-- including the header -->
		<%@ include file="headerFournisseur.jsp"%>

		<div class="separator" style="margin-top: 100px;"></div>

		<!-- including signup -->
		<c:if test="${empty fournisseur}">
			<%@ include file="signup.jsp"%>
		</c:if>

		<!-- Appels d'offres List -->
		<div class="appels-offres-container">
			<h1 class=".h1">Appels D'offres</h1>
			<p class=".p">Soumettez une Proposition pour l'appel d'offre qui
				vous convient le mieux, et spécifiez le détail de chaque besoin.</p>
			<div class="new-ended-all">
				<span class="new-choice active-choice"
					onclick="changeVisibleAppels('new-choice')">Nouvelles</span> <span
					class="ended-choice" onclick="changeVisibleAppels('ended-choice')">Terminées</span>
				<span class="all-choice" onclick="changeVisibleAppels('all-choice')">Toutes</span>
			</div>
			<div class="appels-offres">

				<c:set var="index" value="1"></c:set>
				<c:set var="today" value="<%=new java.util.Date()%>" />

				<c:forEach items="${appelsDoffresList}" var="appelDoffre">
					<c:if test="${appelDoffre.etatDisponibilite}">
						<c:choose>
							<c:when test="${today.before(appelDoffre.dateFin)}">
								<c:set var="cssClass" value="new" />
								<c:set var="showButton" value="true" />
							</c:when>
							<c:when test="${today.after(appelDoffre.dateFin)}">
								<c:set var="cssClass" value="ended" />
								<c:set var="showButton" value="false" />
							</c:when>
							<c:otherwise>
								<c:set var="cssClass" value="" />
								<c:set var="showButton" value="true" />
							</c:otherwise>
						</c:choose>
						<div class="cart-appel ${cssClass} all">
							<h3 class="offre-number">
								Appel Offre
								<c:out value="${index}"></c:out>
							</h3>
							<hr>
							
							<c:set var="nbOrdinateur" value="0"></c:set>
							<c:set var="nbImprimante" value="0"></c:set>
							
							<c:forEach items="${appelDoffre.ressources}" var="ressource">
								<c:if test="${ressource.typeRessource.equals('Ordinateur')}">
									<c:set var="nbOrdinateur" value="${nbOrdinateur + 1}" />
								</c:if>
								<c:if test="${!ressource.typeRessource.equals('Ordinateur')}">
									<c:set var="nbImprimante" value="${nbImprimante + 1}" />
								</c:if>
							</c:forEach>
							
							<div class="number-ressources-container">
								<p>
									<span>Nombre Ordinateur</span><span><c:out value="${nbOrdinateur}"></c:out></span>
								</p>
								<p>
									<span>Nombre Imprimante</span><span><c:out value="${nbImprimante}"></c:out></span>
								</p>
							</div>
							<div class="dates-container">
								<p>
									<span>Date Lance</span><span>${appelDoffre.dateDebut} </span>
								</p>
								<p>
									<span>Date Fin</span><span> ${appelDoffre.dateFin} </span>
								</p>
							</div>

							<div class="btn-container">
								<c:if test="${showButton == 'true'}">
									<a href="/fournisseur/soumettre-proposition?id=${appelDoffre.id}">
										<button class="custom-btn btn-5">Soumettre
											Proposition</button>
									</a>
								</c:if>
								<button class="custom-btn btn-5" onclick="showAppelDetails(`det_${index}`)">Details</button>
							</div>
						</div>

						<!-- Details d'appel -->
						
						<div class="window-detail" id="det_${index}">
							<div class="appel-detail">
								<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
									class="bi bi-x-lg cancel-svg" viewBox="0 0 16 16"
									onclick="cancelSVG()">
				                <path
											d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
				            	</svg>
								<div class="appel-ressources-detail">
									<table>
										<thead>
											<tr>
												<th>#</th>
												<th>Type Ressource</th>
												<th>Caractéristiques</th>
											</tr>
										</thead>
										<tbody>
											<c:set var="index_ress" value="1"></c:set>
											<c:forEach items="${appelDoffre.ressources}" var="ressource">
												<tr>
													<td>
														<c:out value="${index_ress}"></c:out>
													</td>
													<td>${ressource.typeRessource}</td>
													<c:if test="${ressource.typeRessource.equals('Ordinateur')}">
														<td class="ressource-caracteristiques-ordinateur">
															<span>CPU : ${ressource.cpu}</span> 
															<span>RAM : ${ressource.ram}</span> 
															<span>Disque : ${ressource.disqueDur}</span> 
															<span>Ecran : ${ressource.ecran}</span>
														</td>
													</c:if>
													<c:if test="${!ressource.typeRessource.equals('Ordinateur')}">
														<td class="ressource-caracteristiques-imprimante">
															<span>Resolution : ${ressource.resolution}</span>
															<span>Vitesse Impression : ${ressource.vitesseImpression}</span>
														</td>
													</c:if>
												</tr>
												<c:set var="index_ress" value="${index_ress + 1}" />
											</c:forEach>
										</tbody>
									</table>
								</div>
							</div>
						</div>
						
						<!-- Details d'appel -->

						<c:set var="index" value="${index + 1}" />
					</c:if>
				</c:forEach>

			</div>
		</div>
	</div>
	
	<c:if test="${not empty warningMessage}">
		<div class="message-erreur-container">
	        <div class="message-elements">
	
	            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-exclamation-lg  warning-icon"
	                viewBox="0 0 16 16">
	                <path
	                    d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
	            </svg>
	
	            <h2>Attention</h2>
	            <p>${warningMessage}</p>
	            <button class="custom-btn btn-ok" onclick="hideMessageError()"><span>OK</span></button>
	        </div>
	    </div>
	 </c:if>
	 
	 <c:if test="${not empty succesMessage}">
		<div class="message-succes-container">
	        <div class="message-elements">
	
	            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-check-lg succes-icon" viewBox="0 0 16 16">
				  <path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z"/>
				</svg>
	
	            <h2>Validation</h2>
	            <p>${succesMessage}</p>
	            <button class="custom-btn btn-ok-succes" onclick="hideMessageSucces()"><span>OK</span></button>
	        </div>
	    </div>
	 </c:if>

	<script src="./../../js/script_fournisseur.js"></script>
	<script>
        const elements = document.getElementsByClassName("appel-offre-nav-link");
        for (let element of elements) {
            element.style.color = "rgba(255, 27, 0, 1)";
        }
        

	     // hiding any message error
	     function hideMessageError() {
	       const ressourceDetails = document.querySelectorAll('.message-erreur-container');
	       if (ressourceDetails) {
	         ressourceDetails.forEach((element) => {
	               if (element) {
	                   element.style.display = "none";
	               }
	           });
	       }
	     }
	
	     // hiding any succes message
	     function hideMessageSucces() {
	       const ressourceDetails = document.querySelectorAll('.message-succes-container');
	       if (ressourceDetails) {
	         ressourceDetails.forEach((element) => {
	               if (element) {
	                   element.style.display = "none";
	               }
	           });
	       }
	     }
    </script>
    
</body>

</html>