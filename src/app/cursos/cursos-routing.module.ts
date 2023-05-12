import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { CursosListaComponent } from "./cursos-lista/cursos-lista.component";
import { CursoFormComponent } from "./curso-form/curso-form.component";
import { CursoResolverGuard } from "./guards/curso-resolver.guard";

const routes: Routes = [
  { path: "", component: CursosListaComponent },
  {
    path: "novo",
    component: CursoFormComponent,
    resolve: {
      curso: CursoResolverGuard,
    },
  },
  {
    path: "editar/:id",
    component: CursoFormComponent,
    resolve: {
      curso: CursoResolverGuard,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CursosRoutingModule {}
