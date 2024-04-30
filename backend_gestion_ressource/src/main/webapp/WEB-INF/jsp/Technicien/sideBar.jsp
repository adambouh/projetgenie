<!-- SIDEBAR -->
<section id="sidebar">
    <a href="#" class="brand">
      <i class='bx bxs-smile'></i>
      <span class="text">AdminHub</span>
    </a>
    <ul class="side-menu top">
      <li>
        <a routerLink="/home/technicien/pannes">
          <i class='bx bxs-dashboard'></i>
          <span class="text">Pannes</span>
        </a>
      </li>
    </ul>
    <ul class="side-menu">
      <li>
        <a routerLink="Profile">
          <i class='bx bxs-cog'></i>
          <span class="text">Profile</span>
        </a>
      </li>
      <li>
        <a (click)="logout()" class="logout">
          <i class="bx bx-log-out"></i>
          <span class="text">Logout</span>
        </a>
      </li>
    </ul>
  </section>
  <!-- SIDEBAR -->
  