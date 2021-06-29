import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Option } from './models/option';
import { OptionService } from './services/option.service';
import { UploaderService } from './services/uploader.service';
import { UserService } from './services/user.service';
import { UniqueUsername } from './validators/unique-username';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('inputFile') inputFile: ElementRef;

  options$: Observable<Option>

  isValidFormSubmitted = false;
  userForm: FormGroup;
  invalidFile: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploaderService,
    private userService: UserService,
    private uniqueUsername: UniqueUsername,
    private optionsService: OptionService
  ) {
    this.options$ = this.optionsService.getAll();
  }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(4)],
        this.uniqueUsername.validate],
      option: [null, [Validators.required]],
      fileUrl: ['']
    });
  }

  get username() {
    return this.userForm.get('username');
  }

  get option() {
    return this.userForm.get('option');
  }

  get fileUrl() {
    return this.userForm.get('fileUrl');
  }

  updateFileUrl(url) {
    this.fileUrl.setValue(url);
  }

  onFormSubmit() {
    this.isValidFormSubmitted = false;
    if (this.userForm.valid) {
      this.userService.save(this.userForm.value).subscribe(
        (user: any) => {
          this.isValidFormSubmitted = true;
          setTimeout(() => {
            this.isValidFormSubmitted = false;
          }, 2000);
          this.resetForm(this.userForm);
        }
      )
    }
  }

  resetForm(form: FormGroup) {
    form.reset();
    this.inputFile.nativeElement.value = "";
  }

  setFormValues() {
    let formValue = {
      username: 'Joao',
      option: {
        id: 2,
        name: "Option 2",
        otherAtt: "Qwerty"
      },
      fileUrl: ''
    };
    this.userForm.setValue(formValue);
    this.userForm.get('username').markAsTouched()
  }

  compareOption(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  uploadFile(file: File) {
    this.updateFileUrl('');
    this.invalidFile = false;   
    if (file.type === 'image/png' && file.size < 5000000) {
      this.uploadService.upload(file).subscribe(
        (fileUrl: string) => {
          this.updateFileUrl(fileUrl);
        }
      )
    } else {
      this.invalidFile = true;
    }
  }
}
