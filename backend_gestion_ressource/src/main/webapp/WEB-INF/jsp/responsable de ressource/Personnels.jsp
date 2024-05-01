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
                    <form action="#">
                        <div class="form-input">
                            <input type="search" placeholder="Search..." #filter>
                            <button type="button" (click)="filterResults(filter.value)" class="search-btn"><i class='bx bx-search'></i></button>
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
                    <tbody>
                    <tr *ngFor="let user of filteredusersList">
                        <td>
                            <img src="assets/images/default.jpeg">
                            <p>{{ user.first_name + " " + user.last_name }}</p>
                        </td>
                        <td>{{ user.department }}</td>
                        <td>
                            <span class="status" [ngClass]="{ 'process': user.role === 'ChefDepartement', 'completed': user.role !== 'ChefDepartement' }">{{ user.role }}</span>
                        </td>
                    </tr>
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
