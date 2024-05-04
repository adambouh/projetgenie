<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
	pageEncoding="ISO-8859-1"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<!DOCTYPE html>
<html lang="en">

<head>
<meta charset="UTF-8">
<title>Appels D'offres</title>
<link rel="stylesheet" href="./../../css/style_fournisseur.css">
<link rel="stylesheet" href="./../../css/login_fournisseur.css">

</head>

<body>

	<div class="fournisseur-container">

		<div class="login-part">
			<div class="login-form-container">
				<form action="fournisseur-in" method="POST" class="form" id="form">
					<h2 class="form-title">LogIn</h2>
					<div class="inputs-container">
						<input type="text" name="login" placeholder="Sciete" class="input"required /> 
						<input type="password" name="password" placeholder="Password" class="input" required /> 
						<small class="error-message"> 
							<c:if test="${not empty errorLoginFournisseur}">
								<c:out value="${errorLoginFournisseur}" />
							</c:if>
						</small>

					</div>
					<div class="login-btn-container">
						<a href="/appels-d-offres">Sign Up</a>
						<button class="custom-btn btn-5">
							<span>LogIn</span>
						</button>
					</div>
				</form>
			</div>
		</div>

	</div>

</body>

</html>