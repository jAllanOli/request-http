import { Component, OnInit } from "@angular/core";

import { UploadFileService } from "../upload-file.service";
import { environment } from "src/environments/environment";
import { filterResponse, uploadProgress } from "src/app/shared/rxjs-operators";

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.less"],
})
export class UploadFileComponent implements OnInit {
  files: Set<File>;
  progress = 0;

  constructor(private service: UploadFileService) {}

  ngOnInit() {}

  onChange(event) {
    console.log(event);
    this.files = new Set();
    const selectedFiles = <FileList>event.srcElement.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i]);
    }
    this.progress = 0;
  }

  onUpload() {
    if (this.files && this.files.size > 0) {
      this.service
        .upload(this.files, `${environment.BASE_URL}/upload`)
        .pipe(
          uploadProgress((progress) => {
            console.log(progress);
            this.progress = progress;
          }),
          filterResponse()
        )
        .subscribe((response) => console.log("upload concluido"));
      /* .subscribe((event: HttpEvent<Object>) => {
          //HttpEventType
          console.log(event);
          if (event.type === HttpEventType.Response) {
            console.log("Upload Concluído");
          } else if (event.type === HttpEventType.UploadProgress) {
            const percentDone = Math.round((event.loaded * 100) / event.total);
            console.log("Progresso:", percentDone);
            this.progress = percentDone;
          }
        }); */
    }
  }

  onDownloadPDF() {
    this.service
      .download(`${environment.BASE_URL}/downloadPDF`)
      .subscribe((res: any) => {
        this.service.handleFile(res, "doc.pdf");
      });
  }
  onDownloadExcel() {
    this.service
      .download(`${environment.BASE_URL}/downloadExcel`)
      .subscribe((res: any) => {
        this.service.handleFile(res, "planilhinha.xlsx");
      });
  }
}
