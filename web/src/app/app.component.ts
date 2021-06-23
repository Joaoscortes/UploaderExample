import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UploaderService } from './services/uploader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  @ViewChild('inputFile') inputFile: ElementRef;

  uploadedImages = [];
  uploadedFiles = [];

  isValidFormSubmitted = false;
  userForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private uploadService: UploaderService
  ) { }

  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      username: ['', [
        Validators.required,
        Validators.minLength(4)]],
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
      // TODO Save form api call
      this.isValidFormSubmitted = true;
    } else {
      return;
    }
    this.resetForm(this.userForm);
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
  }

  compareOption(o1: any, o2: any): boolean {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
  }

  uploadFile(file: File) {
    // TODO Validate file type and size
    this.uploadService.upload(file).subscribe(
      (fileUrl: string) => {
        switch (file.type) {
          case 'image/png':
            this.updateFileUrl(fileUrl);
            this.uploadedImages.push(fileUrl)
            break;
          default:
            this.uploadedFiles.push(fileUrl)
            break;
        }
      }
    )
  }

  /**
  Sample Data
  */
  options: any[] = [
    {
      id: 1,
      name: "Option 1",
      otherAtt: "Qwerty"
    },
    {
      id: 2,
      name: "Option 2",
      otherAtt: "Qwerty"
    },
    {
      id: 3,
      name: "Option 3",
      otherAtt: "Qwerty"
    }
  ]
}
