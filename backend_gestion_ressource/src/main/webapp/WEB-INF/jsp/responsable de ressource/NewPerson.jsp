<%@ page import="gestionRessource.backend.model.Departement" %>
<%@ page import="gestionRessource.backend.model.Role" %>
<%@ page import="java.util.List" %>
<%@ include file="header.jspf" %>


<script>
    tag = "Personnels"; // Optional JavaScript variable for context or tracking
</script>

<!-- Include CSS and JS dependencies -->
<link rel="stylesheet" href="https://unpkg.com/bootstrap@5.3.3/dist/css/bootstrap.min.css">

<!-- Form to create a new user with JavaScript -->
<div class="container mt-5">
    <h3>Create New User</h3>
    <!-- We use a standard form for input, but handle submission with JavaScript -->
    <form id="createUserForm">
        <!-- User data collection fields -->
        <div class="form-group">
            <label for="firstname">First Name:</label>
            <input type="text" id="firstname" class="form-control" placeholder="Enter first name">
        </div>

        <div class="form-group">
            <label for="lastname">Last Name:</label>
            <input type="text" id="lastname" class="form-control" placeholder="Enter last name">
        </div>

        <div class="form-group">
            <label for="login">Login:</label>
            <input type="text" id="login" class="form-control" placeholder="Enter login">
        </div>

        <div class="form-group">
            <label for="password">Password:</label>
            <input type="password" id="password" class="form-control" placeholder="Enter password">
        </div>

        <div class="form-group">
            <label for="departementId">Department:</label>
            <select id="departementId" class="form-control">
                <option value="" disabled selected>Select a department</option>
                <%-- Assuming a list of departments is available --%>
                <%
                    List<Departement> departements = (List<Departement>) session.getAttribute("departements");
                    if (departements != null) {
                        for (Departement dep : departements) {
                %>
                <option value="<%= dep.getId() %>"><%= dep.getNomDepartement() %></option>
                <%
                        }
                    }
                %>
            </select>
        </div>

        <div class="form-group">
            <label for="role">Role:</label>
            <select id="role" class="form-control">
                <option value="" disabled selected>Select a role</option>
                <%-- Displaying roles from the Role enum --%>
                <%
                    for (Role role : Role.values()) {
                %>
                <option value="<%= role.toString() %>"><%= role.toString() %></option>
                <%
                    }
                %>
            </select>
        </div>

        <!-- JavaScript button to handle form submission -->
        <button type="button" onclick="submitUserForm()" class="btn btn-primary mt-3">Create User</button>
    </form>

    <!-- JavaScript function to submit form as JSON -->
    <script>
        function submitUserForm() {
            const form = document.getElementById("createUserForm");
            const user = {
                firstname: form.querySelector("#firstname").value,
                lastname: form.querySelector("#lastname").value,
                login: form.querySelector("#login").value,
                password: form.querySelector("#password").value,
                departementId: form.querySelector("#departementId").value,
                role: form.querySelector("#role").value
            };

            fetch("/api/user/addUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json" // Ensure proper content type
                },
                body: JSON.stringify(user)
            })
                .then(response => {
                    if (response.ok) {
                      navigateTo('Respo/Personnels');
                    } else {
                        alert("Failed to create user");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("An error occurred while creating the user");
                });
        }
    </script>
</div>

<%@ include file="../footer.jspf" %>
