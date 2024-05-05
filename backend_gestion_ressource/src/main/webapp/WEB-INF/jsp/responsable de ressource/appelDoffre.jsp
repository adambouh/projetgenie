<%@ page import="gestionRessource.backend.model.AppelDoffre" %>
<%@ page import="gestionRessource.backend.model.Ressource" %>
<%@ page import="gestionRessource.backend.model.Departement" %>
<%@ page import="gestionRessource.backend.model.User" %>
<%@ page import="gestionRessource.backend.model.EtatDemande" %>
<%@ page import="java.util.List" %>
<%@ page import="java.sql.Date" %>
<%@ include file="header.jspf" %>

<link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css">

<%
    AppelDoffre appelDoffre = (AppelDoffre) session.getAttribute("appelDoffre");
    List<Ressource> ressources = (List<Ressource>) session.getAttribute("ressources");
    List<Ressource> Ressources = (List<Ressource>) session.getAttribute("Ressources");

%>

<div class="container mt-5">
    <div class="row">
        <!-- Border box for Appel D'offres information -->
        <div class="col-md-12 border rounded p-4 shadow-sm">
            <h4 class="text-center mb-4">Appel D'offres Details</h4>

            <!-- Display information about the Appel D'offre -->
            <div class="row">
                <div class="col-md-6">
                    <label class="labels">Date Debut:</label>
                    <span><%= appelDoffre.getDateDebut() %></span>
                </div>
                <div class="col-md-6">
                    <label class="labels">Date Fin:</label>
                    <span><%= appelDoffre.getDateFin() %></span>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-6">
                    <label class="labels">Etat Disponibilite:</label>
                    <span><%= appelDoffre.isEtatDisponibilite() ? "Disponible" : "Indisponible" %></span>
                </div>
                <div class="col-md-6">
                    <label class="labels">Ressources Associees:</label>
                    <span><%= ressources != null ? ressources.size() : 0 %> Ressources</span>
                </div>
            </div>

            <!-- Form to add a new Ressource to the Appel D'offres -->
            <div class="row mt-3">
                <div class="col-md-12">
                    <h5>Add Ressource to Appel D'offres</h5>
                    <form action="/api/ressource/addRessourcetoAppelDOffre" method="POST" onsubmit="handleFormSubmission(event,<%=appelDoffre.getId()%>)">
                        <div class="form-group">
                            <label for="ressourceId">Ressource ID:</label>
                            <select class="form-control" id="ressourceId" name="ressourceId" required>
                                <%
                                    if (Ressources != null && !Ressources.isEmpty()) {
                                        for (Ressource ressource : Ressources) {
                                            if(!ressource.getEtatDemande().toString().equals("Traité")){
                                %>
                                <option value="<%= ressource.getId() %>"><%= ressource.getCodeInventaire() %> - <%= ressource.getTypeRessource() %></option>
                                <%
                                        }
                                    }}
                                %>
                            </select>
                        </div>
                        <input type="hidden" name="appelId" value="<%= appelDoffre.getId() %>"> <!-- ID of the Appel D'offre -->
                        <button type="submit" class="btn btn-primary">Add Ressource</button>
                    </form>
                </div>
            </div>

            <!-- Table to list resources associated with the Appel D'offres -->
            <div class="row mt-3">
                <div class="col-md-12">
                    <h5>Associated Resources</h5>
                    <table class="table">
                        <thead>
                        <tr>
                            <th>Ressource ID</th>
                            <th>Type Ressource</th>
                            <th>Code Inventaire</th>
                            <th>Etat Demande</th>
                        </tr>
                        </thead>
                        <tbody>
                        <%
                            if (ressources != null && !ressources.isEmpty()) {
                                for (Ressource ressource : ressources) {
                        %>
                        <tr>
                            <td><%= ressource.getId() %></td>
                            <td><%= ressource.getTypeRessource() %></td>
                            <td><%= ressource.getCodeInventaire() %></td>
                            <td><%= ressource.getEtatDemande().name() %></td>
                        </tr>
                        <%
                            }
                        } else {
                        %>
                        <tr>
                            <td colspan="4">No Resources associated.</td>
                        </tr>
                        <%
                            }
                        %>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    function handleFormSubmission(event, appelId) {
        event.preventDefault();
        const form = event.target;

        fetch(form.action, {
            method: 'POST',
            body: new FormData(form),
        })
            .then(response => {
                if (response.ok) {
                    // Navigate to a specified URL
                    window.location.href = '/Respo/AppelDoffre='+appelId;
                } else {
                    console.error("Error adding resource to Appel D'offres");
                }
            });
    }

</script>
<%@ include file="../footer.jspf" %>
