import { BsModalRef } from "ngx-bootstrap/modal";
import { Component, Input, OnInit } from "@angular/core";
import { Subject } from "rxjs";

@Component({
  selector: "app-confirm-modal",
  templateUrl: "./confirm-modal.component.html",
  styleUrls: ["./confirm-modal.component.less"],
})
export class ConfirmModalComponent implements OnInit {
  @Input() title: string;
  @Input() msg: string;
  @Input() confirmText: string;
  @Input() cancelText: string;

  confirmResult: Subject<boolean>;

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit() {
    this.confirmResult = new Subject();
  }

  onConfirm() {
    this.confirmAndClose(true);
  }

  onClose() {
    this.confirmAndClose(false);
  }

  private confirmAndClose(value: boolean) {
    this.confirmResult.next(value);
    this.bsModalRef.hide();
  }
}
