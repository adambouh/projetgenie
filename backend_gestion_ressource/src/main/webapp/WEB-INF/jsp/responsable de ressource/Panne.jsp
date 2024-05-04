<%@ page import="gestionRessource.backend.model.Panne" %>
<%@ page import="gestionRessource.backend.model.EtatPanne" %>
<%@ page import="gestionRessource.backend.model.Constat" %>
<%@ page import="java.util.List" %>
<%@ include file="header.jspf" %>

<link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<%    Panne panne = (Panne) session.getAttribute("panne");
%>
<!-- Container with border and rounded corners for better visual appeal -->
<div class="container mt-5">
    <div class="row">
        <!-- Border box for Panne information -->
        <div class="col-md-12 border rounded p-4 shadow-sm"> <!-- Border, rounded corners, and shadow -->
            <h4 class="text-center mb-4">Panne Details</h4> <!-- Header for the section -->

            <!-- Display information about Panne -->
            <div class="row">
                <div class="col-md-6">
                    <label class="labels">Date Signal:</label>
                    <span><%= panne.getDateSignal() %></span> <!-- Display the dateSignal -->
                </div>
                <div class="col-md-6">
                    <label class="labels">Date Panne:</label>
                    <span><%= panne.getDateSignal() %></span> <!-- Display the datePanne -->
                </div>
            </div>

            <div class="row mt-3">
                <div class="col-md-6">
                    <label class="labels">Etat Panne:</label>
                    <span><%= panne.getEtatPanne().name() %></span> <!-- Display the etatPanne -->
                </div>
                <div class="col-md-6">
                    <label class="labels">Ressource:</label>
                    <span><%= panne.getRessource().getId() %></span> <!-- Display the related Ressource's name -->
                </div>

            </div>

            <div class="row mt-3">
                <div class="col-md-6">
                    <label class="labels">User:</label>
                    <a href="Respo/Personnels/<%=panne.getUser().getLogin()%>"><span><%= panne.getUser().getFirst_name() %> <%= panne.getUser().getLast_name() %></span> </a><!-- Display the associated User -->
                </div>
                <div class="col-md-6">
                <label class="labels">Fournisseur:</label>
                    <a href="home"><span><%= panne.getRessource().getDetail().getProposition().getFournisseur().getSociete() %></span></a> <!-- Display the related Ressource's name -->
            </div>


            </div>

            <div class="row mt-3">
                <div class="col-md-12">
                    <label class="labels">Constats:</label>
                    <%
                        List<Constat> constats = panne.getConstats();
                        if (constats != null && !constats.isEmpty()) {
                    %>
                    <ul>
                        <%
                            for (Constat constat : constats) {
                        %>
                        <li><%= constat.getExplication() %></li>
                        <%
                            }
                        %>
                    </ul>
                    <%
                    } else {
                    %>
                    <p>No Constats found.</p> <!-- Display message if there are no constats -->
                    <%
                        }
                    %>
                </div>
            </div>
        </div> <!-- End of bordered box -->
    </div> <!-- End of row -->
</div> <!-- End of container -->

<%@ include file="../footer.jspf" %>
