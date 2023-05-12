import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { CursosRoutingModule } from "./cursos-routing.module";
import { CursosListaComponent } from "./cursos-lista/cursos-lista.component";
import { CursoFormComponent } from "./curso-form/curso-form.component";

@NgModule({
  declarations: [CursosListaComponent, CursoFormComponent],
  imports: [CommonModule, CursosRoutingModule, ReactiveFormsModule],
})
export class CursosModule {}
