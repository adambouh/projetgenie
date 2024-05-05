<%@ page import="gestionRessource.backend.model.AppelDoffre" %>
<%@ page import="java.util.List" %>
<%@ include file="header.jspf"%>
<script>
    tag="Appel d'offres";
</script>

<main>
    <div class="head-title">
        <div class="left">
            <h1>Appels d'Offres</h1>
        </div>

        <div class="table-data">
            <div class="order">
                <div class="head">
                    <h3>Liste des Appels d'Offres</h3>

                    <form action="Respo/newAppelDoffre" method="GET">
                        <div class="form-input">
                            <button class="btn btn-primary" type="submit">Add Appel d'Offre</button> <!-- Add New Appel d'Offre -->
                        </div>
                    </form>
                    <i class='bx bx-filter'></i>
                </div>

                <table class="table">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Date Debut</th>
                        <th>Date Fin</th>
                        <th>Etat Disponibilite</th>
                        <th>Actions</th>
                    </tr>
                    </thead>

                    <tbody>
                    <%
                        List<AppelDoffre> appelDoffres = (List<AppelDoffre>) session.getAttribute("appelDoffres"); // Get from session
                        if (appelDoffres != null && !appelDoffres.isEmpty()) {
                            for (AppelDoffre appelDoffre : appelDoffres) {
                    %>
                    <tr>
                        <td onclick="navigateTo('Respo/AppelDoffre=<%= appelDoffre.getId() %>')"><%= appelDoffre.getId() %></td> <!-- ID -->
                        <td><%= appelDoffre.getDateDebut() %></td> <!-- Date Debut -->
                        <td><%= appelDoffre.getDateFin() %></td> <!-- Date Fin -->
                        <td><%= appelDoffre.isEtatDisponibilite() ? "Disponible" : "Indisponible" %></td> <!-- Availability Status -->
                        <td>
                            <!-- Delete button -->
                            <form action="/api/appelDoffre/ArreteAppelDoffre" method="POST" style="display:inline-block;" onsubmit="handleFormSubmission(event)">
                               <input type="hidden" name="appelDoffre_id" value="<%= appelDoffre.getId() %>">
                                <button class="btn btn-danger" type="submit">Stop</button>
                            </form>
                        </td>
                    </tr>
                    <%
                        }
                    } else {
                    %>
                    <tr>
                        <td colspan="5">No Appel d'Offres found.</td> <!-- Message if no data -->
                    </tr>
                    <% } %>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    <script>
        function handleFormSubmission(event) {
            event.preventDefault();
            const form = event.target;

            fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
            })
                .then(response => {
                    if (response.ok) {
                        // Navigate to a specified URL
                        window.location.href = '/Respo/AppelDoffres';
                    } else {
                        console.error("Error adding resource to Appel D'offres");
                    }
                });
        }

    </script>
    <%@ include file="../footer.jspf" %>
