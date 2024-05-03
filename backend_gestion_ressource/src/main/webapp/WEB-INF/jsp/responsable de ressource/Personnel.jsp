<%@ page import="gestionRessource.backend.model.User" %>
<%@ page import="gestionRessource.backend.model.Departement" %>
<%@ page import="java.util.List" %>
<%@ page import="gestionRessource.backend.model.Role" %>
<%@ include file="header.jspf" %>

<script>
    tag = "Personnels"; // Optional JavaScript variable for context or tracking
</script>

<%
    // Get user information from the session
    User user = (User) session.getAttribute("user1");
%>

<link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css">
<link rel="stylesheet" type="text/css" href="../../css/Profile.css">

<div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <!-- User Information Display -->
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                <img class="rounded-circle mt-5" width="150px" src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg">
                <span class="font-weight-bold"><%= user.getFirst_name() %> <%= user.getLast_name() %></span>
                <span class="text-black-50"><%= user.getLogin() %></span>
            </div>
        </div>

        <!-- Profile Form -->
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Profile Settings</h4>
                </div>
                <div class="row mt-2">
                    <div class="col-md-6">
                        <label class="labels">First Name</label>
                        <input type="text" id="firstname" class="form-control" placeholder="First Name" value="<%= user.getFirst_name() %>">
                    </div>
                    <div class="col-md-6">
                        <label class="labels">Last Name</label>
                        <input type="text" id="lastname" class="form-control" placeholder="Last Name" value="<%= user.getLast_name() %>">
                    </div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12">
                        <label class="labels">Login</label>
                        <input type="text" id="login" class="form-control" placeholder="Enter Username" value="<%= user.getLogin() %>">
                    </div>
                    <div class="col-md-12">
                        <label class="labels">Departement</label>
                        <select  id="departementId" class="form-control">
                            <%
                                List<Departement> departements = (List<Departement>) session.getAttribute("departements");
                                if (departements != null && !departements.isEmpty()) {
                                    for (Departement dep : departements) {
                            %>
                            <option value=<%= dep.getId() %>><%= dep.getNomDepartement() %></option>
                            <%
                                    }
                                }
                            %>
                        </select>
                    </div>
                    <div class="col-md-12">
                        <label class="labels">Role</label>
                        <select class="form-control" id="role" required>
                            <option value="" disabled>Choose...</option>
                            <option value="ChefDepartement" <%= user.getRole().equals(Role.ChefDepartement) ? "selected" : "" %>>ChefDepartement</option>
                            <option value="Enseignant" <%= user.getRole().equals(Role.Enseignant) ? "selected" : "" %>>Enseignant</option>
                        </select>


                    </div>
                </div>
            </div>
        </div>

        <!-- Form with Hidden Fields and JavaScript -->
        <form method="POST" action="modifyPersonnel" id="userForm" onsubmit="return setHiddenValues()">
            <!-- Simulate PUT request -->
            <input type="hidden" name="method" value="PUT">

            <!-- Hidden fields populated by JavaScript -->
            <input type="hidden" name="firstname" id="hiddenFirstname">
            <input type="hidden" name="lastname" id="hiddenLastname">
            <input type="hidden" name="login" id="hiddenLogin">
            <input type="hidden" name="departementId" id="hiddenDepartementId">  <!-- Ensure correct assignment -->
            <input type="hidden" name="id" id="hiddenId">
            <input type="hidden" name="role" id="hiddenrole">


            <div class="mt-5 text-center">
                <button class="btn btn-primary profile-button" type="submit">Save Profile</button>
            </div>
        </form>

        <!-- JavaScript to Set Hidden Values -->
        <script>
            function setHiddenValues() {
                var firstnameField = document.getElementById('firstname');
                var lastnameField = document.getElementById('lastname');
                var loginField = document.getElementById('login');
                var departField = document.getElementById('departementId'); // This seems correct
                var roleField = document.getElementById('role'); // This seems correct

                // Correctly set values to hidden fields
                if (firstnameField) {
                    document.getElementById('hiddenFirstname').value = firstnameField.value; // Correct
                }
                if (lastnameField) {
                    document.getElementById('hiddenLastname').value = lastnameField.value; // Correct
                }
                if (loginField) {
                    document.getElementById('hiddenLogin').value = loginField.value; // Correct
                }
                if (departField) {
                    document.getElementById('hiddenDepartementId').value = departField.value; // Ensure correct assignment
                }
                if (roleField) {
                    document.getElementById('hiddenrole').value = roleField.value; // Ensure correct assignment
                }

                document.getElementById('hiddenId').value = <%= user.getId() %>; // Ensure correct assignment

                return true;  // Allow form submission
            }
        </script>

        <!-- Password Change Form -->
        <form method="POST" action="modifyPasswordPersonnel" onsubmit="return setHiddenPass()">
            <div class="row mt-3">
                <div class="col-md-12">
                    <label class="labels">Password</label>
                    <input type="password" class="form-control" placeholder="Enter New Password" name="password" id="newPassword">
                </div>
            </div>

            <!-- Hidden fields to simulate PUT and user ID -->
            <input type="hidden" name="_method" value="PUT">
            <input type="hidden" name="user_id" value="<%= user.getId() %>">

            <div class="mt-5 text-center">
                <button class="btn btn-primary profile-button" type="submit">Change Password</button>
            </div>
        </form>

        <!-- JavaScript to Set Hidden Password Field -->
        <script>
            function setHiddenPass() {
                var newPasswordField = document.getElementById('newPassword');
                var hiddenPasswordField = document.getElementById('hiddenPassword'); // This ID should exist
                if (newPasswordField && hiddenPasswordField) {
                    hiddenPasswordField.value = newPasswordField.value;
                }
                return true;  // Allow form submission
            }
        </script>
    </div>
</div>

<%@ include file="../footer.jspf" %>
