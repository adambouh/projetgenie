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

		<div class="notifications-container">
			<h1 class=".h1">Notifications</h1>
			<p class=".p">Toutes les réponses à vos propositions seront
				notifiées ici, dans votre liste de notifications.</p>

			<div class="table-container">
				<table>
					<thead>
						<tr>
							<th>#</th>
							<th>Emetteur</th>
							<th>Contenu</th>
							<th>Date Envoi</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						<c:set var="index" value="1"></c:set>
						<c:forEach items="${notifications}" var="notification">
							<tr>
							
								<td><c:out value="${index}"></c:out></td>
								<td>${ notification.emetteur.id }</td>
								<td>${ notification.contenu }</td>
								<td>${ notification.date_envoi }</td>
								<c:if test="${notification.etat_lu}">
									<td></td>
								</c:if>
								<c:if test="${!notification.etat_lu}">
									<td><a href="/changeNotifStatus/${notification.id}"><button>Marquer Le Vue</button></a></td>
								</c:if>
								
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
        const elements = document.getElementsByClassName("mes-notifications-nav-link");
        for (let element of elements) {
            element.style.color = "rgba(255, 27, 0, 1)";
        }
    </script>
</body>
</html>