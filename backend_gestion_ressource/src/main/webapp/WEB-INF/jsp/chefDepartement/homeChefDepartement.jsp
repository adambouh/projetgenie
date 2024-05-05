<%@ include file="header.jspf" %>
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ page import="gestionRessource.backend.model.*" %>
<%@ page import="java.util.List" %>
<%@ page import="java.sql.Date" %>
<%@ page import="java.time.LocalDateTime" %>
<%@ page import="java.time.Instant" %>
<%@ page import="java.util.GregorianCalendar" %>
<%@ page import="java.util.Calendar" %>
<%@ page import="java.time.LocalDate" %>
<%@ page import="java.time.ZoneId" %>
<%@ page import="javax.servlet.http.HttpSession" %>

<main>
    <div class="table-data">
        <div class="order">
            <div class="head">
                <h3>Mes ressources</h3>
                <form action="#">
                    <div class="form-input">
                        <input type="search" placeholder="Search..." id="filterRessources">
                        <button type="button" class="search-btn" id="filterRessourcesBtn"><i class='bx bx-search'></i></button>
                    </div>
                </form>
                <i class='bx bx-filter'></i>
            </div>
            <table id="ressourcesTable">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Code Inventaire</th>
                    <th>Type Ressource</th>
                    <th>Caractéristiques</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                <%
                    List<Ressource> listeressources = (List<Ressource>) session.getAttribute("listressources");
                    for (Ressource ressource : listeressources) { %>
                <tr>
                    <td></td>
                    <td class="code-inventaire"><%= ressource.getCodeInventaire() %></td>
                    <td><%= ressource.getTypeRessource() %></td>
                    <td><%= ressource.getDetail().getMarque() %></td> <!-- Affichage de la marque -->
                    <td> <form method="post" action="/enseignant/addPanne">
                        <input type="hidden" name="idRessource" value="<%= ressource.getId() %>">
                        <button type="submit">Signaler une panne</button>
                    </form></td>
                </tr>
                <% } %>
                </tbody>
            </table>
        </div>
    </div>

    <div class="table-data" style="margin-top: 50px; margin-bottom: 50px;">
        <div class="order">
            <div class="head">
                <h3>Pannes</h3>
                <select class="choice-select" id="selectedPannes">
                    <option value="NonRepare">Non réparé</option>
                    <option value="Repare">Réparé</option>
                    <option value="EnCours">En cours</option>
                    <option value="Severe">Severe</option>
                    <option value="all">Tous</option>
                </select>
                <form action="#">
                    <div class="form-input">
                        <input type="search" placeholder="Search..." id="filterPannes">
                        <button type="button" class="search-btn" id="filterPannesBtn"><i class='bx bx-search'></i></button>
                    </div>
                </form>
                <i class='bx bx-filter'></i>
            </div>
            <table id="pannesTable">
                <thead>
                <tr>
                    <th>#</th>
                    <th>Code Inventaire</th>
                    <th>Type Ressource</th>
                    <th>Etat Panne</th>
                    <th>Date de signalisation</th>
                </tr>
                </thead>
                <tbody>
                <%
                    // Récupérer les pannes associées à chaque ressource
                    for (Ressource ressource : listeressources) {
                        List<Panne> listepannes = (List<Panne>) session.getAttribute("listepannes_" + ressource.getId());
                        for (Panne panne : listepannes) {
                %>
                <tr>
                    <td></td>
                    <td><%= ressource.getCodeInventaire() %></td>
                    <td><%= ressource.getTypeRessource() %></td>
                    <td><%= panne.getEtatPanne() %></td>
                    <td><%= panne.getDateSignal() %></td>
                </tr>
                <%
                        } // Fin de la boucle sur les pannes
                    } // Fin de la boucle sur les ressources
                %>
                </tbody>
            </table>
        </div>
    </div>
</main>

<%@ include file="../footer.jspf" %>
