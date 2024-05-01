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

		<!-- Propositions List -->
		<div class="propositions-container">
			<h1 class=".h1">Details de votre Proposition</h1>
			<p class=".p">Les details que vous avez ajoutés lors de soumission de votre proposition.</p>

			<div class="table-container">
				<table>
					<thead>
						<tr>
							<th>Type De Ressource</th>
							<th>Ses Caractéristiques</th>
							<th>Marque</th>
							<th>Duree Garantie </th>
							<th>Prix</th>
						</tr>
					</thead>
					<tbody>
						<c:forEach items="${details}" var="detail">
						
							<tr>
								<td>${detail.ressource.typeRessource }</td>
								<c:if test="${detail.ressource.typeRessource.equals('Ordinateur')}">
									<td class="ressource-caracteristiques-ordinateur">
										<span>CPU : ${detail.ressource.cpu}, </span>
										<span>RAM : ${detail.ressource.ram}, </span> 
										<span>Disque : ${detail.ressource.disqueDur}, </span> 
										<span>Ecran : ${detail.ressource.ecran}</span>
									</td>
								</c:if>
								<c:if test="${!detail.ressource.typeRessource.equals('Ordinateur')}">
									<td class="ressource-caracteristiques-imprimante">
										<span>Resolution : ${detail.ressource.resolution}, </span>
										<span>Vitesse Impression : ${detail.ressource.vitesseImpression}</span>
									</td>
								</c:if>			
								<td>${detail.marque }</td>		
								<td>${detail.dureeGarantie } Mois</td>	
								<td>${detail.prix} DHs</td>
							</tr>
							
						</c:forEach>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	
	<script src="./../../js/script_fournisseur.js"></script>
	<script>
        const elements = document.getElementsByClassName("mes-propositions-nav-link");
        for (let element of elements) {
            element.style.color = "rgba(255, 27, 0, 1)";
        }
    </script>
</body>
</html>