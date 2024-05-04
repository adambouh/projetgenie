<%@ page import="gestionRessource.backend.model.Proposition" %>
<%@ page import="gestionRessource.backend.model.EtatProposition" %>
<%@ page import="gestionRessource.backend.model.AppelDoffre" %>
<%@ page import="gestionRessource.backend.model.Fournisseur" %>
<%@ page import="gestionRessource.backend.model.Detail" %>
<%@ page import="java.util.Optional" %>
<%@ page import="java.util.List" %>
<%@ include file="header.jspf" %>

<link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css">

<%
    Optional<Proposition> optionalProposition = (Optional<Proposition>) session.getAttribute("proposition");
    Proposition proposition = null;
    if (optionalProposition.isPresent()) {
        proposition = optionalProposition.get();
    }

    List<Detail> propositionDetails = (List<Detail>) session.getAttribute("propositionDetails");
%>

<!-- Container with border and rounded corners for better visual appeal -->
<div class="container mt-5">
    <div class="row">
        <!-- Border box for Proposition information -->
        <div class="col-md-12 border rounded p-4 shadow-sm"> <!-- Border, rounded corners, and shadow -->
            <h4 class="text-center mb-4">Proposition Details</h4> <!-- Header for the section -->

            <% if (proposition != null) { %>
            <!-- Display information about the Proposition -->
            <div class="row">
                <div class="col-md-6">
                    <label class="labels">Date of Proposition:</label>
                    <span><%= proposition.getDateProposition() %></span> <!-- Display the date of the proposition -->
                </div>
                <div class="col-md-6">
                    <label class="labels">Date of Delivery:</label>
                    <span><%= proposition.getDateLivraison() %></span> <!-- Display the delivery date -->
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-6">
                    <label class="labels">Total Amount:</label>
                    <span><%= proposition.getMontantTotal() %></span> <!-- Display the total amount -->
                </div>
                <div class="col-md-6">
                    <label class="labels">Proposition Status:</label>
                    <span><%= proposition.getEtatProposition().name() %></span> <!-- Display the proposition status -->
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-6">
                    <label class="labels">Appel D'offre:</label>
                    <span><%= proposition.getAppelDoffre().getId() %></span> <!-- Display related Appel D'offre -->
                </div>
                <div class="col-md-6">
                    <label class="labels">Fournisseur:</label>
                    <span><%= proposition.getFournisseur().getSociete() %></span> <!-- Display related Fournisseur -->
                </div>
            </div>

            <!-- Display Details associated with the Proposition -->
            <div class="row mt-3">
                <div class="col-md-12">
                    <h5>Proposition Details:</h5>
                    <% if (propositionDetails != null && !propositionDetails.isEmpty()) { %>
                    <ul>
                        <% for (Detail detail : propositionDetails) { %>
                        <li>
                            <strong>Ressource ID:</strong> <%= detail.getRessource().getId() %> <br>
                            <strong>Marque:</strong> <%= detail.getMarque() %> <br>
                            <strong>Price:</strong> <%= detail.getPrix() %> <br>
                            <strong>Warranty Duration:</strong> <%= detail.getDureeGarantie() %> years
                        </li>
                        <% } %>
                    </ul>
                    <% } else { %>
                    <p>No details found for this proposition.</p>
                    <% } %>
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-12">
                    <!-- Buttons to Accept or Refuse the Proposition -->
                    <form action="/api/proposition/refuse/<%= proposition.getId() %>" method="POST" style="display:inline-block;" onsubmit="navigateTo('/Respo/Propositions')">
                        <button type="submit" class="btn btn-danger">Refuse</button> <!-- Button to refuse -->
                    </form>
                    <form action="/api/proposition/accepte/<%= proposition.getId() %>" method="POST" style="display:inline-block;" onsubmit="navigateTo('/Respo/Propositions')">
                        <button type="submit" class="btn btn-success">Accepte</button> <!-- Button to accept -->
                    </form>
                </div>
            </div>
            <% } else { %>
            <p>No Proposition found.</p> <!-- Message if Proposition not found -->
            <% } %>
        </div> <!-- End of bordered box -->
    </div> <!-- End of row -->
</div> <!-- End of container -->

<%@ include file="../footer.jspf" %>
