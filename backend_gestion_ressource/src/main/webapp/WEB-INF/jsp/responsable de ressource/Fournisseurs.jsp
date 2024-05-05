<%@ page import="gestionRessource.backend.model.User" %>
<%@ page import="java.util.List" %>
<%@ page import="gestionRessource.backend.model.Role" %>
<%@ page import="gestionRessource.backend.model.Fournisseur" %>
<%@ include file="header.jspf"%>
<script>
    tag="fournisseurs";
</script>
<main>
    <div class="head-title">
        <div class="left">
            <h1>Fournisseurs</h1>

        </div>
        <div class="table-data">
            <div class="order">
                <div class="head">
                    <h3>liste des Fournisseurs</h3>

                    </form>
                    <i class='bx bx-filter'></i>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>nom</th>
                        <th>Etat</th>
                    </tr>
                    </thead>
                    <tbody><%
                    List<Fournisseur> users= (List<Fournisseur>) session.getAttribute("Users");
                        if (users != null && !users.isEmpty()) {
                        for (Fournisseur use : users) {
                            if(use.getRole().equals(Role.Fournisseur)){

                        %>

                        <tr >

                    <td>
                            <img src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
                            <p><%=use.getFirst_name()%>  <%=use.getLast_name()%></p></a>
                        </td>
                        <td>
                            <span class="status <% if(use.getEtatFournisseur() !=  null) out.print( "pending"); else out.print("completed");%>"><%if(use.getEtatFournisseur() !=  null) out.print(use.getEtatFournisseur());%></span>
                        </td>
                            <td>
                                <form action="/api/fournisseur/addFournisseurToBlackList"  onsubmit="handleFormSubmission(event)" >
                                    <div class="form-input">
                                        <input type="hidden" name="fournisseur_id" value="<%= use.getId() %>">
                                        <button class="btn btn-primary " type="submit" style="background:#e63c3c" >Blacklist</button>

                                    </div>
                                </form>
                            </td>
                            </tr>
                    <%}}}%>

                    </tbody>
                </table>
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
                            window.location.href = '/Respo/Fournisseurs';
                        } else {
                            console.error("Error adding resource to Appel D'offres");
                        }
                    });
            }

        </script>
        <%@ include file="../footer.jspf"%>
