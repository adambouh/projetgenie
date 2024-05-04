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
		<form action="/soumettre-proposition-in" method="POST">
			<div class="soumettre-proposition">
				<h1 class=".h1">Soumettre Votre Propositions</h1>
				<p class=".p">Veuillez remplir les champs correspondants à chaque
					ressource et choisir la date de livraison.</p>			
				
				<div class="ressources-proposition-container">
					<input type="hidden" name="idAppelDoffre" value="${ appelDoffre.id }">
				
					<c:forEach items="${appelDoffre.ressources}" var="ressource">
					
						<c:if test="${ressource.typeRessource.equals('Ordinateur')}">			
							<div class="ressource-container">
								<div class="ressource">
									<h3>Ressource</h3>
									<hr>
									<div>
										<label for="">Type Ressource</label> <input type="text"
											class="input" value="Ordinateur" disabled />
									</div>
									<div>
										<label for="">CPU</label> <input type="text" class="input"
											value="${ressource.cpu}" disabled />
									</div>
									<div>
										<label for="">RAM</label> <input type="text" class="input"
											value="${ressource.ram}" disabled />
									</div>
									<div>
										<label for="">Disque Dur</label> <input type="text" class="input"
											value="${ressource.disqueDur}" disabled />
									</div>
									<div>
										<label for="">Ecran</label> <input type="text" class="input"
											value="${ressource.ecran}" disabled />
									</div>
								</div>
								<div class="proposition">
									<h3>Sa Proposition</h3>
									<hr>
									<div>
										<label for="">Marque</label> <input type="text" name="marque[]" class="input"
											placeholder="Marque X" required />
									</div>
									<div>
										<label for="">Durée Garantie</label> <input type="text" name="dureeGarantie[]"
											class="input" placeholder="En mois"
											oninput="controleInput(this)" required />
									</div>
									<div>
										<label for="">Prix</label> <input type="text" name="prix[]" class="input prix"
											name="prix" placeholder="En dhs"
											oninput="controleInput(this); calculerTotal();" required />
									</div>
									<input type="hidden" name="idRessource[]" value="${ressource.id }">
								</div>
							</div>
							<hr>
						</c:if>
						<c:if test="${!ressource.typeRessource.equals('Ordinateur')}">
							<div class="ressource-container">
								<div class="ressource">
									<h3>Ressource</h3>
									<hr>
									<div>
										<label for="">Type Ressource</label> <input type="text"
											class="input" value="Imprimante" disabled />
									</div>
									<div>
										<label for="">Résolution</label> <input type="text" class="input"
											value="${ ressource.resolution }" disabled />
									</div>
									<div>
										<label for="">Vitesse</label> <input type="text" class="input"
											value="${ ressource.vitesseImpression }" disabled />
									</div>
								</div>
								<div class="proposition">
									<h3>Sa Proposition</h3>
									<hr>
									<div>
										<label for="">Marque</label> <input type="text" name="marque[]" class="input"
											placeholder="Marque X" required />
									</div>
									<div>
										<label for="">Durée Garantie</label> <input type="text" name="dureeGarantie[]"
											class="input" placeholder="En mois"
											oninput="controleInput(this)" required />
									</div>
									<div>
										<label for="">Prix</label> <input type="text" name="prix[]" class="input prix"
											name="prix" placeholder="En dhs"
											oninput="controleInput(this); calculerTotal();" required />
									</div>
									<input type="hidden" name="idRessource[]" value="${ressource.id }">
								</div>
							</div>
							<hr>
						</c:if>
					
					</c:forEach>
						
				</div>
				<div class="proposition-down-elements">
					<div class="total-amount-container">
						<label for="">Montant Total (DHs)</label> <input type="text" name="montantTotal"
							class="input" id="prix-total" value="0.0" disabled />
					</div>
					<div>
						<label for="">Date Livraison</label> <input type="date" name="dateLivraison"
							class="input" id="dateInput" required />
					</div>
					<div class="btn-container">
						<button class="custom-btn btn-5">
							<span>Envoyer Proposition</span>
						</button>
					</div>
				</div>
				
			</div>
		</form>
	
	
	</div>

	<script src="./../../js/script_fournisseur.js"></script>
	<script>
        const elements = document.getElementsByClassName("appel-offre-nav-link");
        for (let element of elements) {
            element.style.color = "rgba(255, 27, 0, 1)";
        }
    </script>
</body>

</html>