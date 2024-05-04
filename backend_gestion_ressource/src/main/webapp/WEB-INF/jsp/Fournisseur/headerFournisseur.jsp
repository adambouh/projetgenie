<%@page import="gestionRessource.backend.model.User"%>
<%
// Récupérer l'objet fournisseur de la session
HttpSession FournisseurSession = request.getSession();
Object fournisseur = (Object) session.getAttribute("fournisseur");
%>

<div class="head">
	<ul>
		<li class="appel-offre-nav-link"><a href="/appels-d-offres">Appels
				D'offres</a></li>
				
		<c:if test="${not empty fournisseur}">
			<li class="mes-propositions-nav-link"><a href="/fournisseur/propositions">Mes
					Propositions</a></li>
			<li class="mes-notifications-nav-link"><a
				href="/fournisseur/notifications">Mes Notifications</a></li>
			<li class="ma-compte-nav-link"><a href="/fournisseur/compte">${fournisseur.login}</a></li>
		</c:if>
	</ul>
	<div class="bi-list-container">
		<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
			fill="currentColor" class="bi bi-list" viewBox="0 0 16 16">
                    <path fill-rule="evenodd"
				d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
                </svg>
		<ul id="menu-ul">
			<li class="appel-offre-nav-link"><a href="/appels-d-offres">Appels
					D'offres</a></li>

			<c:if test="${not empty fournisseur}">
				<li class="mes-propositions-nav-link"><a
					href="/fournisseur/propositions">Mes Propositions</a></li>
				<li class="mes-notifications-nav-link"><a
					href="/fournisseur/notifications">Mes Notifications</a></li>
				<li class="ma-compte-nav-link"><a href="/fournisseur/compte">${fournisseur.login} </a></li>
			</c:if>

		</ul>
	</div>
	<c:if test="${not empty fournisseur}">
		<a href="/fournisseur/logout">LogOut</a>
	</c:if>
	
	<c:if test="${empty fournisseur}">
		<a href="/fournisseur/login">LogIn</a>
	</c:if>
</div>