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
			<h1 class=".h1">Propositions</h1>
			<p class=".p">Les résultats de vos propositions seront affichés
				ici, dans votre liste de propositions.</p>

			<div class="table-container">
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Date Proposition</th>
							<th>Etat Proposition</th>
							<th>Montant Total</th>
							<th>Date Livraison</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<c:set var="index" value="1"></c:set>
						<c:forEach items="${propositions}" var="proposition">
						
							<tr>
								<td><c:out value="${index}"></c:out></td>
								<td>${proposition.dateProposition }</td>

								<c:if test="${proposition.etatProposition == 'accepte' }">
									<td class="td-status"><small class="accepted">acceptée</small></td>
								</c:if>
								<c:if test="${proposition.etatProposition == 'NonTraite' }">
									<td class="td-status"><small class="encours">En Cours</small></td>
								</c:if>
								<c:if test="${proposition.etatProposition == 'refuse' }">
									<td class="td-status"><small class="refused">réfusée</small></td>
								</c:if>
								
								<td>${proposition.montantTotal} DHs</td>
								<td>${proposition.dateLivraison }</td>
								<td><a href="/fournisseur/propositions/detail?idProposition=${ proposition.id }"><button >Details Proposition</button></a></td>
							</tr>
							
							<c:set var="index" value="${index + 1}" />
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