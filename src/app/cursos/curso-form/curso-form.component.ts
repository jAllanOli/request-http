import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

import { Cursos2Service } from "../cursos2.service";
import { AlertModalService } from "src/app/shared/alert-modal.service";

@Component({
  selector: "app-curso-form",
  templateUrl: "./curso-form.component.html",
  styleUrls: ["./curso-form.component.less"],
})
export class CursoFormComponent implements OnInit {
  form: FormGroup;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private cursosService: Cursos2Service,
    private alertModalService: AlertModalService,
    private location: Location,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    /* this.route.params
      .pipe(
        map((params: any) => params["id"]),
        switchMap((id) => this.cursosService.loadById(id))
      )
      .subscribe((curso: Curso) => this.updateForm(curso)); */

    const curso = this.route.snapshot.data["curso"];

    this.form = this.formBuilder.group({
      id: [curso.id],
      nome: [
        curso.nome,
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
      ],
    });
  }

  /*  updateForm(curso: Curso) {
    this.form.patchValue({
      id: curso.id,
      nome: curso.nome,
    });
  } */

  hasError(field: string) {
    return this.form.get(field).errors;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.valid) {
      console.log("submit", this.form.value);

      let modalSuccessMessage = "Curso criado com sucesso";
      let modalErrorMessage = "Erro ao criar curso";

      if (this.form.value.id) {
        modalSuccessMessage = "Curso atualizado com sucesso";
        modalErrorMessage = "Erro ao atualizar curso";
      }
      this.cursosService.save(this.form.value).subscribe(
        () => {
          this.alertModalService.showAlertSuccess(modalSuccessMessage);
          this.location.back();
        },
        () => this.alertModalService.showAlertDanger(modalErrorMessage)
      );

      /* if (this.form.value.id) {
        this.cursosService.update(this.form.value).subscribe(
          () => {
            this.alertModalService.showAlertSuccess(
              "Curso atualizado com sucesso"
            );
            this.location.back();
          },
          () =>
            this.alertModalService.showAlertDanger("Erro ao atualizar curso"),
          () => console.log("upadate completed")
        );
      } else {
        this.cursosService.create(this.form.value).subscribe(
          () => {
            this.alertModalService.showAlertSuccess("Curso criado com sucesso");
            this.location.back();
          },
          () => this.alertModalService.showAlertDanger("Erro ao criar curso"),
          () => console.log("request completed")
        );
      } */
    }
  }

  onCancel() {
    this.submitted = false;
    console.log("operacao cancelada");
    this.form.reset();
  }
}
