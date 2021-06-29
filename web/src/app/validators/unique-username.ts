import { Injectable } from "@angular/core";
import { AbstractControl, AsyncValidator, ValidationErrors } from "@angular/forms";
import { Observable, of, timer } from "rxjs";
import { map, catchError, switchMap } from 'rxjs/operators';

import { UserService } from "../services/user.service";

@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {

    constructor(
        private userService: UserService
    ) { }

    validate = (control: AbstractControl) => {
        return timer(1000).pipe(
            switchMap(() => {
                return this.userService.validUsername(control.value).pipe(
                    map(isValid => isValid ? null : { unique: true }),
                    catchError(() => of(null))
                );
            })
        )
    }
}
