import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})

export class PublicComponent implements OnInit{

  
  declare document: Document;
  ngOnInit(): void {
    this.changeVisibleAppels("new-choice")
  }

  changeVisibleAppels(choice: string) {

    const newChoices = document.querySelector('.new-choice') as HTMLElement;
    if (newChoices) {
      newChoices.classList.remove('active');
    }
    const endedChoices = document.querySelector('.ended-choice') as HTMLElement;
    if (endedChoices) {
      endedChoices.classList.remove('active');
    }
    const allChoices = document.querySelector('.all-choice') as HTMLElement;
    if (allChoices) {
      allChoices.classList.remove('active');
    }

    const choiceSelected = document.querySelector('.' + choice) as HTMLElement;
    if (choiceSelected) {
      choiceSelected.classList.add('active');
    }

    const allAppels = document.querySelectorAll('.all');

    if (allAppels) {
      Array.from(allAppels).forEach((element) => {
        if (element instanceof HTMLElement) {
          element.style.display = "none";
        }
      });
    }

    if (choice == "all-choice") {
      const appels = document.querySelectorAll('.all');
      if (appels) {
        Array.from(appels).forEach((element: Element) => {
          if (element instanceof HTMLElement) {
            element.style.display = "block";
          }
        });
      }
    } else if ( choice == "new-choice" ) {
      const appels = document.querySelectorAll('.new');
      if (appels) {
        Array.from(appels).forEach((element) => {
          if (element instanceof HTMLElement) {
            element.style.display = "block";
          }
        });
      }
    } else if ( choice == "ended-choice" ) {
      const appels = document.querySelectorAll('.ended');
      if (appels) {
        Array.from(appels).forEach((element) => {
          if (element instanceof HTMLElement) {
            element.style.display = "block";
          }
        });
      }
    }

  }
}
