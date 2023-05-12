import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { delay, take, tap } from "rxjs/operators";

import { Curso } from "../shared/models/curso";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root",
})
export class CursosService {
  private readonly API = `${environment.API}cursos`;

  constructor(private http: HttpClient) {}

  list() {
    return this.http.get<Curso[]>(this.API).pipe(delay(2000));
  }

  loadById(id: number) {
    return this.http.get<Curso>(`${this.API}/${id}`).pipe(take(1));
  }

  private create(curso: Curso) {
    return this.http.post(this.API, curso).pipe(take(1));
  }

  private update(curso: Curso) {
    return this.http.put<Curso>(`${this.API}/${curso.id}`, curso).pipe(take(1));
  }

  save(curso: Curso) {
    if (curso.id) {
      return this.update(curso);
    } else return this.create(curso);
  }

  remove(id: number) {
    return this.http.delete<Curso>(`${this.API}/${id}`).pipe(take(1));
  }
}
