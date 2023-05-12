import { Component, OnInit, ViewChild } from "@angular/core";
import { EMPTY, Observable, Subject } from "rxjs";
import { catchError, switchMap, take } from "rxjs/operators";

import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Curso } from "src/app/shared/models/curso";
import { AlertModalService } from "src/app/shared/alert-modal.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Cursos2Service } from "../cursos2.service";

@Component({
  selector: "app-cursos-lista",
  templateUrl: "./cursos-lista.component.html",
  styleUrls: ["./cursos-lista.component.less"],
})
export class CursosListaComponent implements OnInit {
  //cursos: Curso[];
  @ViewChild("deleteModal", { read: false, static: false }) deleteModal;

  cursos$: Observable<Curso[]>;
  error$ = new Subject<boolean>();
  deleteModalRef: BsModalRef;
  selectedCurso: Curso;

  constructor(
    private cursosService: Cursos2Service,
    private alertService: AlertModalService,
    private router: Router,
    private route: ActivatedRoute,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    //this.cursosService.list().subscribe((data) => (this.cursos = data));
    this.onRefresh();
  }

  onRefresh() {
    this.cursos$ = this.cursosService.list().pipe(
      catchError((error) => {
        console.error(error);
        //this.error$.next(true);
        this.handleError();
        return EMPTY;
      })
    );
  }

  handleError() {
    this.alertService.showAlertDanger(
      "Erro ao carregar cursos. Tente novamente."
    );
  }

  onEdit(id: number) {
    this.router.navigate(["editar", id], { relativeTo: this.route });
  }

  onDelete(curso: Curso) {
    this.selectedCurso = curso;
    console.log(this.selectedCurso);
    /* this.deleteModalRef = this.modalService.show(this.deleteModal, {
      class: "modal-sm",
    }); */
    const result$ = this.alertService.showConfirm(
      "Confirmação",
      "Tem certeza que deseja remover esse curso?",
      "Sim",
      "Cancelar"
    );

    result$
      .asObservable()
      .pipe(
        take(1),
        switchMap((result) =>
          result ? this.cursosService.remove(curso.id) : EMPTY
        )
      )
      .subscribe(
        (success) => {
          this.onRefresh();
        },
        (error) => {
          this.alertService.showAlertDanger(
            "Erro ao remover curso. Tente novamente."
          );
        }
      );
  }

  /* onConfirmDelete() {
    this.cursosService.remove(this.selectedCurso.id).subscribe(
      (success) => {
        this.onRefresh();
        this.deleteModalRef.hide();
      },
      (error) =>
        this.alertService.showAlertDanger(
          "Erro ao remover curso. Tente novamente."
        )
    );
  }

  onDeclineDelete() {
    this.deleteModalRef.hide();
  } */
}
