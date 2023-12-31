import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { NzButtonSize } from 'ng-zorro-antd/button';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';
import { Observable } from 'rxjs';
import { CanvasConfigObject } from 'src/app/models/canvasConfigObject.model';
import { Image as ImageModel } from 'src/app/models/image.model';
import { NewPosition } from 'src/app/models/newPosition.model';
import { Position } from 'src/app/models/position.model';
import { Text } from 'src/app/models/text.model';
import { AudioService } from 'src/app/services/audio.service';
import { ImageService } from 'src/app/services/image.service';
import { InteractionService } from 'src/app/services/interaction.service';
import { PositionService } from 'src/app/services/position.service';
import { TextService } from 'src/app/services/text.service';
import { loadInteractionByPageId } from 'src/app/store/Interaction/interaction.actions';
import { selectInteractions } from 'src/app/store/Interaction/interaction.selector';
import { loadPageInteractions } from 'src/app/store/page/page.actions';
import { selectPage } from 'src/app/store/page/page.selector';
@Component({
  selector: 'app-canvas-layout',
  templateUrl: './canvas-layout.component.html',
  styleUrls: ['./canvas-layout.component.scss'],
})
export class CanvasLayoutComponent implements OnInit, AfterViewInit {
  formCreateText!: FormGroup;
  formCreateInteraction!: FormGroup;
  formCreatePosition!: FormGroup;
  formResolution!: FormGroup;
  formUpdateSentence!: FormGroup;

  @ViewChild('canvas', { static: true })
  canvasRef!: ElementRef<HTMLCanvasElement>;
  ctx!: CanvasRenderingContext2D;

  $page: Observable<any> = this.store.select(selectPage);
  $interactions: Observable<any> = this.store.select(selectInteractions);

  canvasObject!: CanvasConfigObject;
  newPositions: NewPosition[] = [];
  size: NzButtonSize = 'large';
  images!: ImageModel[];
  texts!: Text[];
  interactionId!: number;
  pageId!: number;

  stroke = 3;
  isEResize = false;
  isNResize = false;
  isDrag = false;
  visible = false;
  isVisible = false;
  isVisibleText = false;
  isVisibleAddPosition = false;
  text_id!: number;
  isLoading = true;
  min_rect_size = 10;
  pathPageImage =
    'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMIAAADDCAYAAADQvc6UAAABRWlDQ1BJQ0MgUHJvZmlsZQAAKJFjYGASSSwoyGFhYGDIzSspCnJ3UoiIjFJgf8LAwSDCIMogwMCcmFxc4BgQ4ANUwgCjUcG3awyMIPqyLsis7PPOq3QdDFcvjV3jOD1boQVTPQrgSkktTgbSf4A4LbmgqISBgTEFyFYuLykAsTuAbJEioKOA7DkgdjqEvQHEToKwj4DVhAQ5A9k3gGyB5IxEoBmML4BsnSQk8XQkNtReEOBxcfXxUQg1Mjc0dyHgXNJBSWpFCYh2zi+oLMpMzyhRcASGUqqCZ16yno6CkYGRAQMDKMwhqj/fAIcloxgHQqxAjIHBEugw5sUIsSQpBobtQPdLciLEVJYzMPBHMDBsayhILEqEO4DxG0txmrERhM29nYGBddr//5/DGRjYNRkY/l7////39v///y4Dmn+LgeHANwDrkl1AuO+pmgAAADhlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAAqACAAQAAAABAAAAwqADAAQAAAABAAAAwwAAAAD9b/HnAAAHlklEQVR4Ae3dP3PTWBSGcbGzM6GCKqlIBRV0dHRJFarQ0eUT8LH4BnRU0NHR0UEFVdIlFRV7TzRksomPY8uykTk/zewQfKw/9znv4yvJynLv4uLiV2dBoDiBf4qP3/ARuCRABEFAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghggQAQZQKAnYEaQBAQaASKIAQJEkAEEegJmBElAoBEgghgg0Aj8i0JO4OzsrPv69Wv+hi2qPHr0qNvf39+iI97soRIh4f3z58/u7du3SXX7Xt7Z2enevHmzfQe+oSN2apSAPj09TSrb+XKI/f379+08+A0cNRE2ANkupk+ACNPvkSPcAAEibACyXUyfABGm3yNHuAECRNgAZLuYPgEirKlHu7u7XdyytGwHAd8jjNyng4OD7vnz51dbPT8/7z58+NB9+/bt6jU/TI+AGWHEnrx48eJ/EsSmHzx40L18+fLyzxF3ZVMjEyDCiEDjMYZZS5wiPXnyZFbJaxMhQIQRGzHvWR7XCyOCXsOmiDAi1HmPMMQjDpbpEiDCiL358eNHurW/5SnWdIBbXiDCiA38/Pnzrce2YyZ4//59F3ePLNMl4PbpiL2J0L979+7yDtHDhw8vtzzvdGnEXdvUigSIsCLAWavHp/+qM0BcXMd/q25n1vF57TYBp0a3mUzilePj4+7k5KSLb6gt6ydAhPUzXnoPR0dHl79WGTNCfBnn1uvSCJdegQhLI1vvCk+fPu2ePXt2tZOYEV6/fn31dz+shwAR1sP1cqvLntbEN9MxA9xcYjsxS1jWR4AIa2Ibzx0tc44fYX/16lV6NDFLXH+YL32jwiACRBiEbf5KcXoTIsQSpzXx4N28Ja4BQoK7rgXiydbHjx/P25TaQAJEGAguWy0+2Q8PD6/Ki4R8EVl+bzBOnZY95fq9rj9zAkTI2SxdidBHqG9+skdw43borCXO/ZcJdraPWdv22uIEiLA4q7nvvCug8WTqzQveOH26fodo7g6uFe/a17W3+nFBAkRYENRdb1vkkz1CH9cPsVy/jrhr27PqMYvENYNlHAIesRiBYwRy0V+8iXP8+/fvX11Mr7L7ECueb/r48eMqm7FuI2BGWDEG8cm+7G3NEOfmdcTQw4h9/55lhm7DekRYKQPZF2ArbXTAyu4kDYB2YxUzwg0gi/41ztHnfQG26HbGel/crVrm7tNY+/1btkOEAZ2M05r4FB7r9GbAIdxaZYrHdOsgJ/wCEQY0J74TmOKnbxxT9n3FgGGWWsVdowHtjt9Nnvf7yQM2aZU/TIAIAxrw6dOnAWtZZcoEnBpNuTuObWMEiLAx1HY0ZQJEmHJ3HNvGCBBhY6jtaMoEiJB0Z29vL6ls58vxPcO8/zfrdo5qvKO+d3Fx8Wu8zf1dW4p/cPzLly/dtv9Ts/EbcvGAHhHyfBIhZ6NSiIBTo0LNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiECRCjUbEPNCRAhZ6NSiAARCjXbUHMCRMjZqBQiQIRCzTbUnAARcjYqhQgQoVCzDTUnQIScjUohAkQo1GxDzQkQIWejUogAEQo121BzAkTI2agUIkCEQs021JwAEXI2KoUIEKFQsw01J0CEnI1KIQJEKNRsQ80JECFno1KIABEKNdtQcwJEyNmoFCJAhELNNtScABFyNiqFCBChULMNNSdAhJyNSiEC/wGgKKC4YMA4TAAAAABJRU5ErkJggg==';
  text = '';
  width_device!: number;
  height_device!: number;
  constructor(
    private store: Store,
    private fb: FormBuilder,
    private imageService: ImageService,
    private textService: TextService,
    private interactionService: InteractionService,
    private notification: NzNotificationService,
    private modal: NzModalService,
    private positionService: PositionService,
    private audioService: AudioService
  ) {}
  ngOnInit(): void {
    this.ctx = this.canvasRef.nativeElement.getContext('2d')!;
    this.$page.subscribe((page) => {
      if (page) {
        this.isLoading = false;
      }
      this.pageId = page.id;
      this.canvasObject = new CanvasConfigObject();
      this.canvasObject.bg = page.image?.path;
      this.canvasObject.interactionsCanvas = page.interactions;
      this.width_device = page.width_device;
      this.height_device = page.height_device;
      this.formResolution = this.fb.group({
        width_device: [page.width_device, Validators.required],
        height_device: [page.height_device, Validators.required],
      });
      this.formUpdateSentence = this.fb.group({
        id: [page?.texts[0].id, Validators.required],
        text: [page?.texts[0].text, Validators.required],
        wordSync: [page?.texts[0].wordSync, Validators.required],
      });
      this.drawCanvas();
    });
    this.formCreateText = this.fb.group({
      text: ['', Validators.required],
    });
    this.formCreatePosition = this.fb.group({
      position_x: [0, Validators.min(0)],
      position_y: [0, Validators.min(0)],
      width: [this.min_rect_size, Validators.min(0)],
      height: [this.min_rect_size, Validators.min(0)],
    });
    this.$page.subscribe((page) => {
      this.formCreateInteraction = this.fb.group({
        bg: ['', Validators.required],
        blink: [''],
        text_id: ['', Validators.required],
        page_id: [page.id, Validators.required],
      });

      this.store.dispatch(loadInteractionByPageId({ id: page.id }));
    });
    this.imageService.getImages().subscribe((response) => {
      this.images = response.data;
    });
    this.textService.getAllTexts().subscribe((response) => {
      this.texts = response.data;
    });
  }
  ngAfterViewInit(): void {}
  showModalText(): void {
    this.isVisibleText = true;
  }

  handleOkText(): void {
    console.log(this.text);
  }

  handleCancelText(): void {
    this.isVisibleText = false;
  }
  open(): void {
    this.visible = true;
  }

  close(): void {
    this.visible = false;
  }
  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
  showModalAddPosition(id: number): void {
    this.interactionId = id;

    this.isVisibleAddPosition = true;
  }
  showConfirm(): void {
    this.modal.confirm({
      nzTitle: '<i>Do you Want to save positions?</i>',
      nzContent: '<b>Save position of this</b>',
      nzOnOk: () => {
        this.positionService
          .createPositionsByInteractionId(this.canvasObject.interactionsCanvas)
          .subscribe((response) => {
            if (response.success) {
              this.createNotification('success', response.message);
            }
          });
      },
    });
  }
  handleOkAddPosition(): void {
    this.isVisibleAddPosition = false;
  }

  handleCancelAddPosition(): void {
    this.isVisibleAddPosition = false;
  }
  handleSubmitChangeResolution() {
    console.log(this.formResolution.value, this.pageId);
  }
  handleSubmitUpdateSentence() {
    this.textService
      .updateSentence(this.formUpdateSentence.value)
      .subscribe((response) => {
        if (response.success) {
          this.notification.create(
            'success',
            'Sentence notification',
            response.message
          );
        }
      });
  }
  handleSubmitCreatePosition() {
    const newPosition = new Position();
    newPosition.position_x = this.formCreatePosition.value.position_x;
    newPosition.position_y = this.formCreatePosition.value.position_y;
    newPosition.width = this.formCreatePosition.value.width;
    newPosition.height = this.formCreatePosition.value.height;

    this.canvasObject.interactionsCanvas =
      this.canvasObject.interactionsCanvas?.map((interaction) => {
        if (interaction.id !== this.interactionId) return interaction;
        return {
          ...interaction,
          positions: [...interaction.positions, { ...newPosition }],
        };
      });
    this.newPositions.push({
      interactionId: this.interactionId,
      position: newPosition,
    });
    this.drawCanvas();
    this.isVisibleAddPosition = false;
    this.createNotification(
      'success',
      'Added new position to interaction ' + this.interactionId
    );
  }
  handleChange(info: NzUploadChangeParam): void {
    if (info.file.status !== 'uploading') {
      const path = info.file.response.url;
      const filename = info.file.response.original_filename;
      this.imageService
        .createImage({ path, filename })
        .subscribe((response) => {
          const image = new ImageModel();
          image.path = response.data.path;
          image.filename = response.data.filename;
          image.id = response.data.id;
          image.created_at = response.data.created_at;
          image.updated_at = response.data.updated_at;
          this.images.push(image);
          this.formCreateInteraction.patchValue({ image_id: image.id });
          this.pathPageImage = response.data.path;
          this.isVisible = false;
        });
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  }
  handleSubmitCreateText() {
    this.textService
      .createText(this.formCreateText.value)
      .subscribe((response) => {
        if (response.success) {
          this.formCreateText.reset();
          this.isVisibleText = false;
          const text = new Text();
          text.id = response.data.id;
          text.icon = response.data.icon;
          text.wordSync = response.data.wordSync;
          text.text = response.data.text;
          this.texts.unshift(text);
          this.formCreateInteraction.patchValue({ text_id: text.id });
          this.text_id = text.id;
        }
      });
  }
  handleChangeUploadAudio(info: NzUploadChangeParam) {
    if (info.file.status !== 'uploading') {
      const path = info.file.response.url;
      const filename = info.file.response.original_filename;

      this.audioService
        .createAudio({
          filename,
          path,
          time: 10,
          text_id: this.text_id,
        })
        .subscribe((response) => {
          if (response.success) {
            this.createNotification('success', response.message);
          } else {
            this.createNotification('error', response.message);
          }
        });
    }
    if (info.file.status === 'done') {
      console.log(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      console.log(`${info.file.name} file upload failed.`);
    }
  }
  handleSubmitCreateInteraction() {
    this.interactionService
      .createInteraction(this.formCreateInteraction.value)
      .subscribe((response) => {
        if (response.success) {
          this.createNotification('success', response.message);
          this.formCreateInteraction.reset();
          this.close();

          this.interactionService
            .getInteractionFull(response.data.id)
            .subscribe((response) => {
              this.store.dispatch(
                loadPageInteractions({ value: response.data })
              );
            });
        }
      });
  }
  createNotification(type: string, message: string): void {
    this.notification.create(type, 'Interactions Notification', message);
  }
  onMouseUp() {
    this.canvasObject.interactionsCanvas =
      this.canvasObject.interactionsCanvas?.map((interaction) => {
        return {
          ...interaction,
          positions: [
            ...interaction.positions?.map((position) => ({
              ...position,
              isDragging: 0,
              isResizing: 0,
            })),
          ],
        };
      });
  }
  onMouseDown(event: MouseEvent) {
    const rect = this.canvasRef.nativeElement.getBoundingClientRect(); // chỉ số của khung canvas
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    this.canvasObject.interactionsCanvas =
      this.canvasObject.interactionsCanvas?.map((interaction) => {
        return {
          ...interaction,
          positions: interaction.positions?.map((position) => {
            if (
              mouseX >= position.position_x + this.stroke &&
              mouseX <= position.position_x + position.width - this.stroke &&
              mouseY >= position.position_y + this.stroke &&
              mouseY <= position.position_y + position.height - this.stroke
            ) {
              return {
                ...position,
                isDragging: 1,
                isResizing: 0,
                dragStartX: mouseX,
                dragStartY: mouseY,
              };
            } else if (
              mouseX >= position.position_x &&
              mouseX <= position.position_x + position.width &&
              mouseY >= position.position_y &&
              mouseY <= position.position_y + position.height
            ) {
              const offsetX = mouseX - position.position_x;
              const offsetY = mouseY - position.position_y;
              const borderSize = 4;

              if (
                offsetX >= position.width - borderSize &&
                offsetX <= position.width
              ) {
                return {
                  ...position,
                  isDragging: 0,
                  isResizing: 1,
                  resizeDirect: 'r',
                };
              } else if (
                offsetY >= position.height - borderSize &&
                offsetY <= position.height
              ) {
                return {
                  ...position,
                  isDragging: 0,
                  isResizing: 1,
                  resizeDirect: 'b',
                };
              } else {
                return position;
              }
            } else {
              return position;
            }
          }),
        };
      });
  }
  onMouseMove(event: MouseEvent) {
    this.isDrag = false;
    this.isEResize = false;
    this.isNResize = false;
    const rect = this.canvasRef.nativeElement.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    this.canvasObject.interactionsCanvas?.map((interaction) => {
      interaction.positions?.map((position) => {
        if (
          mouseX >= position.position_x + this.stroke &&
          mouseX <= position.position_x + position.width - this.stroke &&
          mouseY >= position.position_y + this.stroke &&
          mouseY <= position.position_y + position.height - this.stroke
        ) {
          this.isDrag = true;
          this.isEResize = false;
          this.isNResize = false;
        }
        if (
          mouseX >= position.position_x &&
          mouseX <= position.position_x + position.width &&
          mouseY >= position.position_y &&
          mouseY <= position.position_y + position.height
        ) {
          const offsetX = mouseX - position.position_x;
          const offsetY = mouseY - position.position_y;

          const borderSize = 4;

          if (offsetX >= 0 && offsetX <= borderSize) {
            this.isDrag = false;
            this.isEResize = true;
            this.isNResize = false;
          }

          if (
            offsetX >= position.width - borderSize &&
            offsetX <= position.width
          ) {
            this.isDrag = false;
            this.isEResize = true;
            this.isNResize = false;
          }

          if (offsetY >= 0 && offsetY <= borderSize) {
            this.isDrag = false;
            this.isEResize = false;
            this.isNResize = true;
          }

          if (
            offsetY >= position.height - borderSize &&
            offsetY <= position.height
          ) {
            this.isDrag = false;
            this.isEResize = false;
            this.isNResize = true;
          }
        }
      });
    });

    this.canvasObject.interactionsCanvas?.forEach((interaction) => {
      interaction.positions?.forEach((position) => {
        if (position.isDragging === 1) {
          const rect = this.canvasRef.nativeElement.getBoundingClientRect();
          const mouseX = event.clientX - rect.left;
          const mouseY = event.clientY - rect.top;

          const deltaX = mouseX - position.dragStartX;
          const deltaY = mouseY - position.dragStartY;

          position.position_x += deltaX;
          position.position_y += deltaY;

          this.drawCanvas();

          position.dragStartX = mouseX;
          position.dragStartY = mouseY;
        }
        if (position.isResizing === 1) {
          switch (position.resizeDirect) {
            case 'r':
              let deltaX = event.offsetX - position.position_x;
              if (deltaX <= this.min_rect_size) deltaX = this.min_rect_size;

              position.width = deltaX;
              this.drawCanvas();
              break;
            case 'b':
              let deltaY = event.offsetY - position.position_y;
              if (deltaY <= this.min_rect_size) deltaX = this.min_rect_size;

              position.height = deltaY;
              this.drawCanvas();
              break;
          }
        }
      });
    });
  }

  drawCanvas() {
    const background = new Image();
    background.src = this.canvasObject.bg;
    background.onload = () => {
      this.ctx.drawImage(
        background,
        0,
        0,
        this.canvasRef.nativeElement.width,
        this.canvasRef.nativeElement.height
      );
      this.drawInteractions();
    };
  }

  drawInteractions() {
    this.canvasObject.interactionsCanvas?.forEach((interaction) => {
      this.ctx.fillStyle = interaction.bg;
      interaction.positions?.forEach((position) => {
        this.ctx.fillRect(
          position.position_x,
          position.position_y,
          position.width,
          position.height
        );
        this.ctx.beginPath();
        this.ctx.moveTo(
          position.position_x + position.width,
          position.position_y
        );
        this.ctx.lineTo(
          position.position_x + position.width,
          position.position_y + position.height
        );
        this.ctx.stroke();

        this.ctx.beginPath();
        this.ctx.moveTo(
          position.position_x,
          position.position_y + position.height
        );
        this.ctx.lineTo(
          position.position_x + position.width,
          position.position_y + position.height
        );
        this.ctx.stroke();
      });
    });
  }
}
