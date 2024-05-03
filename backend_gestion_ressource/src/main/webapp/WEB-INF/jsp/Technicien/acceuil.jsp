<%@ page import="gestionRessource.backend.model.Panne"%>
<%@ page import="gestionRessource.backend.model.EtatPanne"%>
<%@ page import="java.util.List"%>
<%@ include file="header.jspf"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>

<link rel="stylesheet" href="./../../css/style_technicien.css">

<main>
	<div class="table-data">
		<div class="order">
			<div class="head">
				<h3>Mes Pannes</h3>
				<i class='bx bx-filter'></i>

			</div>
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Code Inventaire</th>
						<th>Type Ressouce</th>
						<th>Etat Panne</th>
						<th>Date Signalisation</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<%
					List<Panne> pannesFixed = (List<Panne>) session.getAttribute("fixed-pannes");
					for (Panne panne : pannesFixed) {
					%>
					<tr>
						<td>${status.index}</td>
						<td><%=panne.getRessource().getCodeInventaire()%></td>
						<input type="hidden"
							value="<%=panne.getRessource().getCodeInventaire()%>"
							id="codeInventaire_<%=panne.getId()%>">
						<td><%=panne.getRessource().getTypeRessource()%></td>
						<input type="hidden"
							value="<%=panne.getRessource().getTypeRessource()%>"
							id="typeRessource_<%=panne.getId()%>">
						<td><%=panne.getEtatPanne()%></td>
						<td><%=panne.getDateSignal()%></td>
						<td>
						
							<% if (panne.getEtatPanne() == EtatPanne.EnCours) { %>
							    <i class="bx bx-pencil icon" onclick="changePanneStatus(<%=panne.getId() %>)"></i>
							<% } %>
						
						</td>
					</tr>

					<%
					}
					%>
				</tbody>
			</table>
		</div>
	</div>

	<div class="table-data">
		<div class="order">
			<div class="head">
				<h3>Nouvelles pannes</h3>
				<i class='bx bx-filter'></i>
			</div>
			<table>
				<thead>
					<tr>
						<th>#</th>
						<th>Code Inventaire</th>
						<th>Type Ressouce</th>
						<th>Etat Panne</th>
						<th>Date Signalisation</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					<%
					List<Panne> pannes = (List<Panne>) session.getAttribute("list-pannes");
					for (Panne panne : pannes) {
					%>
					<tr>
						<td>${status.index}</td>
						<td><%=panne.getRessource().getCodeInventaire()%></td>
						<td><%=panne.getRessource().getTypeRessource()%></td>
						<td>Non Repare</td>
						<td><%=panne.getDateSignal()%></td>
						<td><a
							href="/technicien/addPanne?idPanne=<%=panne.getId()%>"><i
								class="bx bx-pencil icon"></a></i></td>
					</tr>

					<%
					}
					%>
				</tbody>
			</table>
		</div>
	</div>
</main>

<!-- pop up pour modifier la panne et l'ajout de constat -->
<div class="pop-up-container" id="popUp_panne" style="display: none;">
	<div class="form-pop-up">
		<h3>Panne</h3>
		<br>
		<hr>
		<br>
		<form class="form" method="POST" action="/technicien/modifierPanne">
			<input type="hidden" value="" name="idPanne" id="idPanne">
			<div class="element-container">
				<label class="element-lebel">Code Inventaire</label> <input
					type="text" class="element-input codeInventaireInput" disabled>
				<input type="hidden" name="codeInventaire"
					class="codeInventaireInput">
			</div>
			<div class="element-container">
				<label class="element-lebel">Type Ressource</label> <input
					type="text" class="typeRessourceInput element-input" disabled>
				<input type="hidden" name="typeRessource" class="typeRessourceInput">
			</div>
			<div class="element-radio-container" style="margin-bottom: 15px;">
				<label class="element-lebel">Etat De Panne</label>
				<div class="radio-container" onclick="showConstatElements()">
					<input type="radio" name="etat" id="optionsRadios1" value="Severe">
					<label for="optionsRadios1" class="custom-radio"></label> <label
						for="optionsRadios1">Sévère</label>
				</div>
				<div class="radio-container" onclick="hideConstatElements()">
					<input type="radio" name="etat" id="optionsRadios2" value="Repare"
						checked> <label for="optionsRadios2" class="custom-radio"></label>
					<label for="optionsRadios2">Réparée</label>
				</div>
			</div>
			<div id="constat"
				style="display: none; flex-direction: column; margin-top: 15px; margin-bottom: 15px;">
				<hr>
				<div class="element-container" style="margin-top: 15px;">
					<label class="element-lebel">Date D'apprition</label> <input
						type="date" name="dateApparition" id="dateApparition"
						class="element-input">
				</div>
				<div class="element-container-texterea">
					<label class="element-lebel">Explication De Panne</label>
					<textarea type="text" rows="3" name="explication" id="explication"
						class="element-input" value=""></textarea>
				</div>
				<div class="element-container">
					<label class="element-lebel">Fréquence De Panne</label> <select
						name="frequence" class="element-input">
						<option value="rare">Rare</option>
						<option value="frequente">Fréquente</option>
						<option value="permanente">Permanente</option>
					</select>
				</div>

				<div class="element-radio-container" style="margin-bottom: 15px;"
					id="ordrePanne">
					<label class="element-lebel">Ordre De Panne</label>
					<div class="radio-container">
						<input type="radio" name="ordre" id="optionsRadios11"
							value="Logiciel" onclick="showDefautPanne()"> <label
							for="optionsRadios11" class="custom-radio"></label> <label
							for="optionsRadios11">Logiciel</label>
					</div>
					<div class="radio-container">
						<input type="radio" name="ordre" id="optionsRadios22"
							value="Matériel" onclick="hideDefautPanne()" checked> <label
							for="optionsRadios22" class="custom-radio"></label> <label
							for="optionsRadios22">Matériel</label>
					</div>
				</div>

				<div class="element-radio-container"
					style="margin-bottom: 15px; display: none;" id="defautPanne">
					<label class="element-lebel">Défaut Panne</label>
					<div class="radio-container">
						<input type="radio" name="ordreLogiciel" id="optionsRadios111"
							value="Système"> <label for="optionsRadios111"
							class="custom-radio"></label> <label for="optionsRadios111">Système</label>
					</div>
					<div class="radio-container">
						<input type="radio" name="ordreLogiciel" id="optionsRadios222"
							value="Logiciel utilitaire" checked> <label
							for="optionsRadios222" class="custom-radio"></label> <label
							for="optionsRadios222">Logiciel utilitaire</label>
					</div>
				</div>

			</div>

			<hr>
			<div class="btns-container">
				<button class="btn-annuler"
					onclick="event.preventDefault(); hideChangePanneStatus();">Annuler</button>
				<button class="btn-envoyer">Modifier</button>
			</div>
		</form>
	</div>
</div>

<!-- pop up de message d'erreur -->
<c:if test="${not empty messageError}">
	<div class="message-erreur-container">
		<div class="message-elements">

			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
				class="bi bi-exclamation-lg  warning-icon" viewBox="0 0 16 16">
	                <path
					d="M7.005 3.1a1 1 0 1 1 1.99 0l-.388 6.35a.61.61 0 0 1-1.214 0zM7 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0" />
	            </svg>

			<h2>Attention</h2>
			<p>${messageError}</p>
			<button class="custom-btn btn-ok" onclick="hideMessageError()">
				<span>OK</span>
			</button>
		</div>
	</div>
</c:if>

<!-- pop up de message de succes -->
<c:if test="${not empty messageSucces}">
	<div class="message-succes-container">
		<div class="message-elements">

			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor"
				class="bi bi-check-lg succes-icon" viewBox="0 0 16 16">
				  <path
					d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425z" />
				</svg>

			<h2>Validation</h2>
			<p>${messageSucces}</p>
			<button class="custom-btn btn-ok-succes"
				onclick="hideMessageSucces()">
				<span>OK</span>
			</button>
		</div>
	</div>
</c:if>

<script src="./../../js/script_technicien.js"></script>

<%@ include file="../footer.jspf"%>


</body>

</html>