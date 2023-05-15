import { HttpClient, HttpParams } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from "rxjs/operators";

@Component({
  selector: "app-lib-search",
  templateUrl: "./lib-search.component.html",
  styleUrls: ["./lib-search.component.less"],
})
export class LibSearchComponent implements OnInit {
  queryField = new FormControl();

  readonly SEARCH_URL = "https://api.cdnjs.com/libraries";

  results$: Observable<any>;
  total: number;
  readonly FIELDS = "name,description,version,homepage";

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.results$ = this.queryField.valueChanges.pipe(
      //tira requests com white spaces
      map((value) => value.trim()),
      //filtra pra fazer o request a partir de x caracteres
      filter((value) => value.length > 1),
      //aplica um delay
      debounceTime(200),
      //evita requisições duplicadas
      distinctUntilChanged(),
      //tap(value => console.log(value)),
      //faz a busca
      switchMap((value) =>
        this.http.get(this.SEARCH_URL, {
          params: {
            search: value,
            fields: this.FIELDS,
          },
        })
      ),
      tap((res: any) => (this.total = res.total)),
      map((res: any) => res.results)
    );
  }

  onSearch() {
    const fields = "name,description,version,homepage";
    let value = this.queryField.value;
    if (value && (value = value.trim()) !== "") {
      /* const params_ = {
        search: value,
        fields: fields,
      }; */

      let params = new HttpParams();

      params = params.set("search", value);
      params = params.set("fields", fields);

      this.results$ = this.http
        //.get(`${this.SEARCH_URL}?fields=${fields}&search=${value}`)
        .get(this.SEARCH_URL, { params: params })
        .pipe(
          tap((res: any) => (this.total = res.total)),
          map((res: any) => res.results)
        );
    }
  }
}
