import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ApiService } from "../../../core/_services/api.service";
import { endpoint } from "../../../../environments/environment";
import { AlertService } from "../../../core/_services/alert.service";
import { CancelationReasonService } from "../../../core/_services/cancellationReason.service";
import { CancellationReason } from "../../../core/_models/cancellationReason.model";
import { CancelFileModel } from "../../../core/_models/cancelFile.model";
import { BankFilesService } from "../../../core/_services/bankFiles.service";

@Component({
  selector: "app-file-cancel",
  templateUrl: "./file-cancel.component.html",
})
export class CancelFileComponent implements OnInit {
  bankFile: number;
  reasons: CancellationReason[];
  reasonsSelected: CancellationReason = new CancellationReason();
  cancel: CancelFileModel = new CancelFileModel();

  ngOnInit() {
    this.cancelReasonService.getAll().subscribe((res) => (this.reasons = res));
  }

  @Output() notifyParent: EventEmitter<any> = new EventEmitter();

  constructor(
    public activeModal: NgbActiveModal,
    private cancelReasonService: CancelationReasonService,
    private alertService: AlertService,
    private bankFileService: BankFilesService
  ) {}
  confirmCancelFile() {
    if (!this.reasonsSelected.id)
    return this.alertService.error(
      "El motivo es obligatorio"
    );
  if (!this.cancel.commentary && this.reasonsSelected.isCommentaryRequired)
    return this.alertService.error(
      "El comentario es obligatorio para este motivo"
    );
    this.alertService.question(() => {
      this.cancelFile();
    }, "Esta seguro que desea anular el archivo?");
  }
  cancelFile() {
  
    this.cancel.reasonCancellationId = this.reasonsSelected.id;
    this.bankFileService.cancelFile(this.cancel).subscribe(
      (response) => {
        this.alertService.success("Archivo eliminado exitosamente");
        this.activeModal.close();
        this.notifyParent.emit();
      },
      (error) => {
        this.alertService.error(error.error);
      }
    );
  }
}
