import { Injectable } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";

import { AlertModalComponent } from "./alert-modal/alert-modal.component";
import { ConfirmModalComponent } from "./confirm-modal/confirm-modal.component";

enum AlertTypes {
  DANGER = "danger",
  SUCCESS = "success",
}

@Injectable({
  providedIn: "root",
})
export class AlertModalService {
  constructor(private modalService: BsModalService) {}

  private showAlert(
    message: string,
    type: AlertTypes,
    dismissTimeout?: number
  ) {
    const bsModalRef = this.modalService.show(AlertModalComponent);
    bsModalRef.content.type = type;
    bsModalRef.content.message = message;

    if (dismissTimeout) {
      setTimeout(() => bsModalRef.hide(), dismissTimeout);
    }
  }

  showAlertDanger(message: string) {
    this.showAlert(message, AlertTypes.DANGER);
  }

  showAlertSuccess(message: string) {
    this.showAlert(message, AlertTypes.SUCCESS, 2000);
  }

  showConfirm(
    title: string,
    msg: string,
    confirmText?: string,
    cancelText?: string
  ) {
    const bsModalRef = this.modalService.show(ConfirmModalComponent);
    bsModalRef.content.title = title;
    bsModalRef.content.msg = msg;

    if (confirmText) {
      bsModalRef.content.confirmText = confirmText;
    }

    if (cancelText) {
      bsModalRef.content.cancelText = cancelText;
    }

    return (<ConfirmModalComponent>bsModalRef.content).confirmResult;
  }
}
