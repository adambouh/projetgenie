<%@ page import="gestionRessource.backend.model.Panne"%>
<%@ page import="gestionRessource.backend.model.EtatPanne"%>
<%@ page import="java.util.List"%>
<%@ include file="header.jspf"%>
<link rel="stylesheet" href="../../css/style_technicien.css">

<script>
    tag = "Pannes"; // Optional JavaScript variable for context or tracking
</script>
<main>
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
                        href="/Respo/Panne=<%=panne.getId()%>">view </a></td>
            </tr>

            <%
                }
            %>
            </tbody>
        </table>
    </div>
</div></main>
<%@ include file="../footer.jspf"%>
