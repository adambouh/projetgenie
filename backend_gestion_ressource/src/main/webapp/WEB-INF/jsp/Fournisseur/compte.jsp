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
		
		<div class="compte-informations-container">
            <div class="compte-cart">
                <h4>Hirochima</h4>
                <hr>
                <div class="infos-container">
                    <div class="info-container">
                        <span>Lieu</span>
                        <span>
	                        <c:if test="${not empty fournisseur.lieu}">
	                        	${fournisseur.lieu}
	                        </c:if>
	                        <c:if test="${empty fournisseur.lieu}">
	                        	A remplire
	                        </c:if>
                        </span>
                    </div>
                    <div class="info-container">
                        <span>Gérant</span>
                        <span>
	                        <c:if test="${not empty fournisseur.gerant}">
	                        	${fournisseur.gerant}
	                        </c:if>
	                        <c:if test="${empty fournisseur.gerant}">
	                        	A remplire
	                        </c:if>
                        </span>
                    </div>
                    <div class="info-container">
                        <span>Adresse</span>
                        <span>
                        	<c:if test="${not empty fournisseur.adresse}">
	                        	${fournisseur.adresse}
	                        </c:if>
	                        <c:if test="${empty fournisseur.adresse}">
	                        	A remplire
	                        </c:if>
                        </span>
                    </div>
                    <div class="info-container">
                        <span>Site internet</span>
                        <a href="/${fournisseur.siteInternet}">
                        	<c:if test="${not empty fournisseur.siteInternet}">
	                        	${fournisseur.siteInternet}
	                        </c:if>
	                        <c:if test="${empty fournisseur.siteInternet}">
	                        	A remplire
	                        </c:if>
                        </a>
                    </div>
                </div>
                <hr>
                <p class="link-retour"><a href="/appels-d-offres"><small>Appels D'offres</small></a></p>
            </div>
        </div>
		
	</div>

	<script src="./../../js/script_fournisseur.js"></script>
	<script>
        const elements = document.getElementsByClassName("ma-compte-nav-link");
        for (let element of elements) {
            element.style.color = "rgba(255, 27, 0, 1)";
        }
    </script>
</body>

</html>