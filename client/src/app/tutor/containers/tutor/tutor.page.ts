import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';

import {AlertController} from '@ionic/angular';

import {DatatableComponent} from '@swimlane/ngx-datatable';

import {Subscription} from 'rxjs';

import {UserModel} from '../../../shared/models/user.model';

import {TutorSandbox} from '../../tutor.sandbox';
import {ViaCepSandbox} from '../../../shared/components/via-cep/via-cep.sandbox';
import {PetSandbox} from '../../../pet/pet.sandbox';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.page.html',
  styleUrls: ['./tutor.page.scss'],
})
export class TutorPage implements OnInit {

  public showImports: boolean = false;

  public tutorsCollection$ = this.tutorSandbox.tutorsCollection$;

  public isLoading$ = this.tutorSandbox.isLoadingTutor$;

  public isLoadingCsvTutor$ = this.tutorSandbox.isLoadingCsvTutor$;

  public isLoadingCsvContact$ = this.tutorSandbox.isLoadingCsvContact$;

  public paginator$ = this.tutorSandbox.paginator$;

  public isLoadingCsvPet$ = this.petSandbox.isLoadingCsvPet$;

  public filtering = false;

  public searchField;

  private subscriptions = new Subscription();

  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;

  temp = [];

  rows = [];

  constructor(
    private tutorSandbox: TutorSandbox,
    private viaCepSandbox: ViaCepSandbox,
    private petSandbox: PetSandbox,
    private alertController: AlertController,
    private changes: ChangeDetectorRef,
  ) {
    this.tutorSandbox.loadTutors(1);
    this.loadTutors();
  }

  ngOnInit() {
  }

  changePage(page) {
    this.tutorSandbox.loadTutors(page);
  }

  loadTutors() {
    this.subscriptions.add(
      this.tutorsCollection$.subscribe((data) => {
        this.temp = [...data];
        this.rows = data;
      }),
    );
  }

  onChangeSearch($event) {
    this.filtering = true;
    this.tutorSandbox.loadNextPage(0, $event);
    this.changes.detectChanges();
  }

  filterPet(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter((d: UserModel) => {
      return d.petsName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  filterCpf(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter((d: UserModel) => {
      return d.cpf.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  filterPhone(event) {
    const val = event.target.value.toLowerCase();
    const temp = this.temp.filter((d: UserModel) => {
      return (
        d.phone.toLowerCase().indexOf(val) !== -1 ||
        d.cell_phone.toLowerCase().indexOf(val) !== -1 ||
        !val
      );
    });
    this.rows = temp;
    this.table.offset = 0;
  }

  public presentModal() {
    this.viaCepSandbox.resetViaCep();
    this.petSandbox.resetPets();
    this.tutorSandbox.openModal(false);
  }

  public selectTutor(tutor) {
    this.tutorSandbox.selectTutor(tutor);
    this.tutorSandbox.openModal(true, tutor);
  }

  async confirmTutor(tutor) {
    const alert = await this.alertController.create({
      header: 'Confirma a exclusão?',
      message: `Ter certeza que deseja excluir o tutor: <strong>${tutor.name}</strong>?`,
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Cancelou');
          },
        },
        {
          text: 'Sim',
          handler: () => {
            this.tutorSandbox.deleteTutor(tutor);
          },
        },
      ],
    });
    await alert.present();
  }

  openViewTutor(tutor) {
    this.tutorSandbox.openTutorViewModal(tutor);
  }

  public onFileUpload(event) {
    const formData = new FormData();
    const file = (event.target as HTMLInputElement).files[0];
    formData.append('csv', file);
    this.tutorSandbox.uploadCsvTutor(formData);
  }

  /**
   *
   * @param event
   */
  public onContactFileUpload(event) {
    const formData = new FormData();
    const file = (event.target as HTMLInputElement).files[0];
    formData.append('csv', file);
    this.tutorSandbox.uploadCsvContact(formData);
  }

  /**
   *
   * @param event
   */
  public onPetFileUpload(event) {
    const formData = new FormData();
    const file = (event.target as HTMLInputElement).files[0];
    formData.append('csv', file);
    this.petSandbox.uploadCsvPet(formData);
  }
}
