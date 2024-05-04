<div class="sign-up-part">
	<div class="form-container">
		<div class="form-left-container">
			<div></div>
			<div></div>
			<div></div>
		</div>
		<div class="form-right-container">
			<form action="fournisseur-signup" method="POST" class="form" id="form">
				<h2 class="form-title">Sign Up</h2>
				<div class="inputs-container">
					<input type="text" name="societe" placeholder="Sciete" class="input" required/>
					<input type="password" name="password" placeholder="Password" class="input" required/>
					<small class="error-message"> 
						<c:if test="${not empty errorSignupFournisseur}">
							<c:out value="${errorSignupFournisseur}" />
						</c:if>
					</small>
				</div>
				<div class="btn-container">
					<button class="custom-btn btn-5">
						<span>Sign Up</span>
					</button>
				</div>
			</form>
		</div>
	</div>
</div>