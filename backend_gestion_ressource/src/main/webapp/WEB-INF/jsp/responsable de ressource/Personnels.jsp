<%@ page import="gestionRessource.backend.model.User" %>
<%@ page import="java.util.List" %>
<%@ page import="gestionRessource.backend.model.Role" %>
<%@ include file="header.jspf"%>
<script>
    tag="Personnels";
</script>
<main>
    <div class="head-title">
        <div class="left">
            <h1>Personels</h1>

        </div>
        <div class="table-data">
            <div class="order">
                <div class="head">
                    <h3>liste des personels</h3>

                    <form action="Respo/newPersonnels"  >
                        <div class="form-input">
                            <button class="btn btn-primary " type="submit" > Add User </button>

                        </div>
                    </form>
                    <i class='bx bx-filter'></i>
                </div>
                <table>
                    <thead>
                    <tr>
                        <th>nom</th>
                        <th>departement</th>
                        <th>Role</th>
                    </tr>
                    </thead>
                    <tbody><%
                    List<User> users= (List<User>) session.getAttribute("Users");
                        if (users != null && !users.isEmpty()) {
                        for (User use : users) {
                            if(!use.getRole().equals(Role.Fournisseur)){
                            if(!use.getRole().equals(Role.Responsable))
                                {
                        %>

                        <tr onclick="navigateTo('Respo/Personnels/<%= use.getLogin() %>')">

                    <td>
                            <img src="/images/default.jpeg">
                            <p><%=use.getFirst_name()%>  <%=use.getLast_name()%></p></a>
                        </td>
                        <td><%if(use.getDepartement()!=null ){%><%=use.getDepartement().getNomDepartement()%><%}%></td>
                        <td>
                            <span class="status <% if(!use.getRole().equals(Role.Enseignant)){%> process <%}else if(!use.getRole().equals(Role.ChefDepartement)){%>completed<%}else if(!use.getRole().equals(Role.Technicien)){%>pending<%}%>"><%=use.getRole()%></span>
                        </td>
                            </tr>
                    <%}}}}%>
                    <tr><a routerLink="1">
                        <td>
                            <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g">
                            <p>John Doe</p>
                        </td>
                        <td>01-10-2023</td>
                        <td><span class="status pending">Enseignant</span></td></a>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <%@ include file="../footer.jspf"%>
