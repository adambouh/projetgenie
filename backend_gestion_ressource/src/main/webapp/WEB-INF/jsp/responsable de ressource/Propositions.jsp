<%@ page import="gestionRessource.backend.model.Proposition" %>
<%@ page import="java.util.List" %>
<%@ page import="gestionRessource.backend.model.EtatProposition" %>
<%@ include file="header.jspf"%>

<script>
    tag = "Offres";
</script>

<main>
    <div class="head-title">
        <div class="left">
            <h1>Propositions</h1>
        </div>
    </div>

    <div class="table-data">
        <div class="order">
            <div class="head">
                <h3>Liste des propositions</h3>
                <form >
                    <div class="form-input">
                        <button class="btn btn-primary" type="submit">Add Proposition</button>
                    </div>
                </form>
            </div>

            <table>
                <thead>
                <tr>
                    <th style ="width:40px">ID</th>
                    <th>Date de Proposition</th>
                    <th>Date de Livraison</th>
                    <th>Montant Total</th>
                    <th>État de la Proposition</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <%
                    List<Proposition> propositions = (List<Proposition>) session.getAttribute("propositions");
                    if (propositions != null && !propositions.isEmpty()) {
                        for (Proposition proposition : propositions) {
                %>
                <tr onclick="navigateTo('/Respo/propositions/<%= proposition.getId() %>')">
                    <td><%= proposition.getId() %></td>
                    <td><%= proposition.getDateProposition() %></td>
                    <td><%= proposition.getDateLivraison() %></td>
                    <td><%= proposition.getMontantTotal() %></td>
                    <td><%= proposition.getEtatProposition() %></td>
                    <td>
                        <form action="/api/proposition/delete/<%= proposition.getId() %>" method="POST">
                            <button class="btn btn-danger" type="submit">Delete</button>
                        </form>
                    </td>
                </tr>
                <%
                    }
                } else {
                %>
                <tr>
                    <td colspan="6">No propositions found</td>
                </tr>
                <%
                    }
                %>
                </tbody>
            </table>
        </div>
    </div>
</main>

<script>
    function navigateTo(url) {
        window.location.href = url;
    }
</script>

<%@ include file="../footer.jspf" %>
