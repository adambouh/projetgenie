<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
	<%
	// Récupérer l'objet fournisseur de la session
	HttpSession FournisseurSession1 = request.getSession();
	User fournisseur1 = (User) session.getAttribute("fournisseur");
	%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Appels D'offres</title>
<link rel="stylesheet" href="./../../css/style_fournisseur.css">
<style type="text/css">

 /* compte style */
 .compte-informations-container {
    width: 100%;
    height: calc(100vh - 100px);
    display: flex;
    justify-content: center;
    align-items: center;
}
.compte-cart {
    width: 60%;
    min-width: 350px;
    min-height: 300px;
    height: 30%;
    box-shadow: 2px 2px 2px 1px rgb(204, 203, 203);
}
.compte-cart h4 {
    text-align: center;
}
.compte-cart .infos-container {
    padding: 20px 50px;
}
.compte-cart .infos-container .info-container {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: center;
}
.compte-cart .infos-container .info-container span, .compte-cart .infos-container .info-container a {
    text-align: center;
}
.compte-cart .link-retour {
    text-align: center;
    width: 100%;
}

</style>
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
                        <span>Casablanca</span>
                    </div>
                    <div class="info-container">
                        <span>Gérant</span>
                        <span>Loqman ikiwit</span>
                    </div>
                    <div class="info-container">
                        <span>Adresse</span>
                        <span>Casablanca 54, r879</span>
                    </div>
                    <div class="info-container">
                        <span>Site internet</span>
                        <a href="">www.ikiwit.com</a>
                    </div>
                </div>
                <hr>
                <p class="link-retour"><a href="index.html"><small>Appels D'offres</small></a></p>
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