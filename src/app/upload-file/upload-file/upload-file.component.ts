import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.less"],
})
export class UploadFileComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onChange(event) {
    console.log(event);
    const selectedFiles = <FileList>event.srcElement.files;
  }
}
