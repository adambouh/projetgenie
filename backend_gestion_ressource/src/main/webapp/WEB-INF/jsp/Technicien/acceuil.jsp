<!-- including the home -->
<%@ include file="./../home.jsp" %>
    <%@ include file="sideBar.jsp" %>
        <!-- <main>
    <div class="table-data" style="margin-top: 50px; margin-bottom: 50px;">
        <div class="order">
            <div class="head">
                <h3>Mes Pannes</h3>

                <select class="choice-select" [(ngModel)]="selectedPannes" (change)="changeMyPannes()">
                    <option value="Repare">R�par�</option>
                    <option value="EnCours">En cours</option>
                    <option value="Severe">Severe</option>
                    <option value="All">Tous</option>
                </select>
                <i class='bx bx-filter'></i>

            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Code Inventaire
                        </th>
                        <th>
                            Type Ressouce
                        </th>
                        <th>
                            Etat Panne
                        </th>
                        <th>
                            Date Signalisation
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <style>
                    tbody td {
                        vertical-align: top;
                    }
                </style>
                <tbody>
                    <tr *ngFor="let panne of myFiltredPannes let i = index">
                        <td>
                            {{ i }}
                        </td>
                        <td>
                            <!panne.getcodeIn>
                            {{ panne.ressource.codeInventaire }}
                        </td>
                        <td>
                            {{panne.ressource.typeRessource}}
                        </td>
                        <td *ngIf="panne.etatPanne == 'Repare'">R�par�</td>
                        <td *ngIf="panne.etatPanne == 'EnCours'">En Cours</td>
                        <td *ngIf="panne.etatPanne == 'Severe'">S�v�re</td>

                        <td>{{panne.dateSignal}}</td>
                        <td>
                            <i class="bx bx-pencil icon" style="color: #3C91E6;" (click)="popUpPanne(panne)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>

    <div class="table-data" style="margin-top: 50px; margin-bottom: 50px;">
        <div class="order">
            <div class="head">
                <h3>Nouvelles pannes</h3>
                <i class='bx bx-filter'></i>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>
                            Code Inventaire
                        </th>
                        <th>
                            Type Ressouce
                        </th>
                        <th>
                            Etat Panne
                        </th>
                        <th>
                            Date Signalisation
                        </th>
                        <th>
                            Actions
                        </th>
                    </tr>
                </thead>
                <style>
                    tbody td {
                        vertical-align: top;
                    }
                </style>
                <tbody>
                    <tr *ngFor="let panne of newFiltredPannes let i = index">
                        <td>
                            {{ i }}
                        </td>
                        <td>
                            {{ panne.ressource.codeInventaire }}
                        </td>
                        <td>
                            {{panne.ressource.typeRessource}}
                        </td>
                        <td>Non Repar�</td>

                        <td>{{panne.dateSignal}}</td>
                        <td>
                            <i class="bx bx-pencil icon" (click)="takePanne(panne)"></i>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</main>

<div class="pop-up-container" #popUp_panne style="display:none;">
    <div class="form-pop-up">
        <h3>Panne</h3>
        <br>
        <hr><br>
        <form class="form" [formGroup]="formulaire_modifier_panne">
            <div class="element-container">
                <label class="element-lebel">Code Inventaire</label>
                <input type="text" name="codeInventaire" formControlName="codeInventaire" class="element-input">
            </div>
            <div class="element-container">
                <label class="element-lebel">Type Ressource</label>
                <input type="text" name="typeRessource" formControlName="typeRessource" class="element-input">
            </div>
            <div class="element-radio-container" style="margin-bottom: 15px;">
                <label class="element-lebel">Etat De Panne</label>
                <div class="radio-container" (click)="showConstatElements()">
                    <input type="radio" name="etat" formControlName="etat" id="optionsRadios1" value="Severe">
                    <label for="optionsRadios1" class="custom-radio"></label>
                    <label for="optionsRadios1">S�v�re</label>
                </div>
                <div class="radio-container" (click)="hideConstatElements()">
                    <input type="radio" name="etat" formControlName="etat" id="optionsRadios2" value="Repare">
                    <label for="optionsRadios2" class="custom-radio"></label>
                    <label for="optionsRadios2">R�par�e</label>
                </div>
            </div>
            <div #constat style="display: none; flex-direction: column; margin-top: 15px; margin-bottom: 15px;">
                <hr>
                <div class="element-container" style="margin-top: 15px;">
                    <label class="element-lebel">Date D'apprition</label>
                    <input type="date" name="dateApparition" id="dateApparition" formControlName="dateApparition" class="element-input">
                </div>
                <div class="element-container-texterea">
                    <label class="element-lebel">Explication De Panne</label>
                    <textarea type="text" rows="3" name="explication" formControlName="explication"
                        class="element-input" value=""></textarea>
                </div>
                <div class="element-container">
                    <label class="element-lebel">Fr�quence De Panne</label>
                    <select name="frequence" formControlName="frequence" class="element-input">
                        <option value="rare">Rare</option>
                        <option value="frequente">Fr�quente</option>
                        <option value="permanente">Permanente</option>
                    </select>
                </div>

                <div class="element-radio-container" style="margin-bottom: 15px;" #ordrePanne>
                    <label class="element-lebel">Ordre De Panne</label>
                    <div class="radio-container">
                        <input type="radio" name="ordre" formControlName="ordre" id="optionsRadios11" value="Logiciel"  (click)="showDefautPanne()">
                        <label for="optionsRadios11" class="custom-radio"></label>
                        <label for="optionsRadios11">Logiciel</label>
                    </div>
                    <div class="radio-container">
                        <input type="radio" name="ordre" formControlName="ordre" id="optionsRadios22" value="Mat�riel" (click)="hideDefautPanne()">
                        <label for="optionsRadios22" class="custom-radio"></label>
                        <label for="optionsRadios22">Mat�riel</label>
                    </div>
                </div>

                <div class="element-radio-container" style="margin-bottom: 15px; display: none;" #defautPanne>
                    <label class="element-lebel">D�faut Panne</label>
                    <div class="radio-container">
                        <input type="radio" name="ordreLogiciel" formControlName="ordreLogiciel" id="optionsRadios111" value="Syst�me">
                        <label for="optionsRadios111" class="custom-radio"></label>
                        <label for="optionsRadios111">Syst�me</label>
                    </div>
                    <div class="radio-container">
                        <input type="radio" name="ordreLogiciel" formControlName="ordreLogiciel" id="optionsRadios222" value="Logiciel utilitaire">
                        <label for="optionsRadios222" class="custom-radio"></label>
                        <label for="optionsRadios222">Logiciel utilitaire</label>
                    </div>
                </div>

            </div>

            <hr>
            <div class="btns-container">
                <button class="btn-annuler" (click)="removePopUpPanne()">Annuler</button>
                <button class="btn-envoyer" (click)="updatePanne()">Modifier</button>
            </div>
        </form>
    </div>
</div> -->
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>

        <body>
            <p>
                Hello Aya
            </p>
            <? panne : list-pannes>
            >
        </body>

        </html>