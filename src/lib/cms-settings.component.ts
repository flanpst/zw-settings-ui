import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, first } from 'rxjs';
import { CmsSettingsService } from './cms-settings.service';
import { ENVIRONMENT } from './cms-settings.module';

@Component({
  selector: 'zwcms-cms-settings',
  templateUrl: './cms-settings.component.html',
  styleUrls: ['./cms-settings.component.css']
})
export class CmsSettingsComponent implements OnInit {

  loading = false;
  avatarUrl?: string;
  form: FormGroup;
  tokenUser: any;


  logoTopUrl: string;
  logoTopDestaque: string;
  logoFooterUrl: string;
  logoFooterDestaque: string;

  constructor(
    @Inject(ENVIRONMENT) protected environment,
    private msg: NzMessageService,
    private formBuilder: FormBuilder,
    private service: CmsSettingsService
  ) { }

  UPLOAD_FILE = `${this.environment.server_url}` + '/logotipo/images'

  ngOnInit(): void {
    this.iniciarForm()
    this.iniciarDados()
  }

  iniciarForm(){
    this.form = this.formBuilder.group({
      facebook: new FormControl(''),
      twitter: new FormControl(''),
      instagram: new FormControl(''),
      youtube: new FormControl(''),
      pinterest: new FormControl(''),
      linkedin: new FormControl(''),
      address: new FormControl(''),
      phone: new FormControl(''),
      email: new FormControl(''),
      open_time: new FormControl(''),
      admin_mail: new FormControl(''),
      active_whatsapp: new FormControl(false),
      whatsapp: new FormControl(''),
      logo_top: new FormControl(''),
      logo_footer: new FormControl(''),
      logo_description: new FormControl(''),
    })
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  setMediaUploadHeaders = (file: NzUploadFile) => {

    const tokenUser = localStorage.getItem('token');

    return {
      "authorization": 'Bearer ' + tokenUser
    }
  };

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.loading = false;
          this.avatarUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Network error');
        this.loading = false;
        break;
    }
  }

  iniciarDados(){
    this.service
      .findAll()
      .pipe(first())
      .subscribe(data => {
        this.form.patchValue(data[0])
        this.logoTopUrl = `${this.environment.thumb_url}` + '/logotipo/' + data[0]['logo_top']
        this.logoFooterUrl = `${this.environment.thumb_url}` + '/logotipo/' + data[0]['logo_footer']
      })
  }

  onSubmit(){

    this.form.removeControl('checked')

    for(const i in this.form.controls){
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }

    if(this.form.invalid){
      return;
    }
    this.form.patchValue({
      logo_top: this.logoTopDestaque,
      logo_footer: this.logoFooterDestaque
    })

    this.service
    .updateConfig(this.form.value)
    .pipe(first())
    .subscribe(() => {
      this.msg.success('As configurações foram salvas com sucesso!');

    })
  }

  //IMAGE LOGO TOP
  getFileUrlLogoTop(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.logoTopDestaque = info.file!.originFileObj!['name']
          this.loading = false;
          this.logoTopUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Erro ao enviar');
        this.loading = false;
        break;
    }
  }

  //IMAGE LOGO FOOTER
  getFileUrlLogoFooter(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.loading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        this.getBase64(info.file!.originFileObj!, (img: string) => {
          this.logoFooterDestaque = info.file!.originFileObj!['name']
          this.loading = false;
          this.logoFooterUrl = img;
        });
        break;
      case 'error':
        this.msg.error('Erro ao enviar');
        this.loading = false;
        break;
    }
  }

}
