import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-upload-file",
  templateUrl: "./upload-file.component.html",
  styleUrls: ["./upload-file.component.less"],
})
export class UploadFileComponent implements OnInit {
  files: Set<File>;

  constructor() {}

  ngOnInit() {}

  onChange(event) {
    console.log(event);
    this.files = new Set();
    const selectedFiles = <FileList>event.srcElement.files;
    for (let i = 0; i < selectedFiles.length; i++) {
      this.files.add(selectedFiles[i]);
    }
  }

  onUpload() {
    //if(this)
  }
}
