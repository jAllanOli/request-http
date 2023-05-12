import { Injectable } from "@angular/core";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { of } from "rxjs";

import { Curso } from "src/app/shared/models/curso";
import { CursosService } from "../cursos.service";

@Injectable({
  providedIn: "root",
})
export class CursoResolverGuard implements Resolve<Curso> {
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Curso | Observable<Curso> | Promise<Curso> {
    if (route.params && route.params["id"]) {
      return this.cursosService.loadById(route.params["id"]);
    }

    return of({
      id: null,
      nome: null,
    });
  }
  constructor(private cursosService: CursosService) {}
}
