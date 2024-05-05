<%@ page import="gestionRessource.backend.model.Ressource"%>
<%@ page import="java.util.List"%>
<%@ include file="header.jspf"%>
<link rel="stylesheet" href="../../css/style_technicien.css">

<main>
    <div class="table-data">
        <div class="order">
            <div class="head">
                <h3>Liste des Ressources</h3>
                <i class='bx bx-filter'></i>
            </div>
            <table>
                <thead>
                <tr>
                    <th>#</th>
                    <th>Code Inventaire</th>
                    <th>Type Ressource</th>
                    <th>État Demande</th>
                    <th>Date de Création</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <%
                    List<Ressource> ressources = (List<Ressource>) session.getAttribute("ressources");
                    if (ressources != null && !ressources.isEmpty()) {
                        int index = 1;
                        for (Ressource ressource : ressources) {
                %>
                <tr>
                    <td><%= index %></td>
                    <td><%= ressource.getCodeInventaire() != null ? ressource.getCodeInventaire() : " " %></td>
                    <td><%= ressource.getTypeRessource() != null ? ressource.getTypeRessource() : " " %></td>
                    <td><%= ressource.getEtatDemande() != null ? ressource.getEtatDemande().name() : " " %></td>
                    <td><%= ressource.getDateCreation() != null ? ressource.getDateCreation().toString() : " " %></td>
                    <td>
                        <a href="<c:url value='/Respo/Ressource=<%= ressource.getId() != null ? ressource.getId() : "" %>' />">Voir</a>
                        | <a href="<c:url value='/Respo/EditRessource=<%= ressource.getId() != null ? ressource.getId() : "" %>' />">Modifier</a>
                    </td>
                </tr>
                <%
                        index++;
                    }
                } else {
                %>
                <tr>
                    <td colspan="6">Aucune ressource trouvée</td>
                </tr>
                <%
                    }
                %>
                </tbody>
            </table>
        </div>
    </div>
</main>

<%@ include file="../footer.jspf"%>
