<%@ include file="header.jspf"%>
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

<!-- MAIN -->
<main>
    <div class="head-title">
        <div class="left">
            <h1>Dashboard</h1>
            <ul class="breadcrumb">
                <li>
                    <a href="#">Dashboard</a>
                </li>
                <li><i class='bx bx-chevron-right' ></i></li>
                <li>
                    <a class="active" href="#">Home</a>
                </li>
            </ul>
        </div>
        <!--
        <a href="#" class="btn-download">
          <i class='bx bxs-cloud-download' ></i>
          <span class="text">Download PDF</span>
        </a>-->
    </div>

    <ul class="box-info">
        <li>
            <i class='bx bxs-calendar-check' ></i>
            <span class="text">
          <h3>1020</h3>
          <p>New Order</p>
        </span>
        </li>
        <li>
            <i class='bx bxs-group' ></i>
            <span class="text">
          <h3>2834</h3>
          <p>Visitors</p>
        </span>
        </li>
        <li>
            <i class='bx bxs-dollar-circle' ></i>
            <span class="text">
          <h3>$2543</h3>
          <p>Total Sales</p>
        </span>
        </li>
    </ul>


    <div class="table-data">
        <div class="order">
            <div class="head">
                <h3>livraisons</h3>
                <i class='bx bx-search' ></i>
                <i class='bx bx-filter' ></i>
            </div>
            <table>
                <thead>
                <tr>
                    <th>Fournisseur</th>
                    <th>Date </th>
                    <th>Status</th>
                </tr>
                </thead>
                <tbody>
                <%  List<Proposition> propositions=(List<Proposition>)session.getAttribute("Proposition");
                    if (propositions != null && !propositions.isEmpty())
                  for (Proposition proposition : propositions) {
                      if(proposition.getEtatProposition().toString().equals("accepte")){%>
                <tr>
                    <td>
                        <img src="https://secure.gravatar.com/avatar/d09eaad01aea86c51b4f892b4f8abf6f?s=100&d=wavatar&r=g">
                        <p><%= proposition.getFournisseur().getSociete()%></p>
                    </td>
                    <td><%= proposition.getDateLivraison()%></td>
                    <td><span class="status <%
                        if(proposition.getDateLivraison().before(new java.util.Date())){%>completed">  livré</span></td>
                </tr>

                <%}else{%>process">
                pas encore </span></td>
                </tr>
                <%} }}%>

                </tbody>
            </table>
        </div>
        <div class="todo">
            <div class="head">
                <h3>Departements</h3>
                <i class='bx bx-plus' ></i>
                <i class='bx bx-filter' ></i>
            </div>

            <ul class="todo-list">
                <%
                    List<Departement> departements= (List<Departement>) session.getAttribute("departements");
                if (departements != null && !departements.isEmpty()) {
                    for (Departement dep : departements) { %>
                <li class="completed">
                    <p><%= dep.getNomDepartement() %></p> <!-- Display department name -->
                    <i class='bx bx-dots-vertical-rounded'></i>
                </li>
                <%
                    } // End of for-loop
                } else { %> <!-- Display message if no departments found -->
                <li class="not-completed">
                    <p>No Departments Available</p>
                </li>
                <%
                    }
                %>
            </ul>
        </div>
    </div>
</main>

<%@ include file="../footer.jspf"%>
