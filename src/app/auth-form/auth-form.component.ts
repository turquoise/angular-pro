import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ContentChild,
  QueryList,
  ContentChildren,
  AfterContentInit,
  ViewChild,
  ViewChildren,
  AfterViewInit,
  ChangeDetectorRef,
  ElementRef,
  Renderer
} from '@angular/core';

import { AuthRememberComponent } from './auth-remember.component';
import { AuthMessageComponent } from './auth-message.component';

import { User } from './auth-form.interface';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css']
})
export class AuthFormComponent implements OnInit, AfterContentInit, AfterViewInit {

  showMessage: boolean;
  @ViewChild('email') email: ElementRef;
  //@ViewChild(AuthMessageComponent) message: AuthMessageComponent;
  @ViewChildren(AuthMessageComponent) message: QueryList<AuthMessageComponent>;
  //@ContentChild(AuthRememberComponent) remember: AuthRememberComponent;
  @ContentChildren(AuthRememberComponent) remember: QueryList<AuthRememberComponent>;
  @Output() submitted: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private cd: ChangeDetectorRef,
    private renderer: Renderer
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.renderer.setElementAttribute(this.email.nativeElement, 'placeholder', 'Enter your email address');
    this.renderer.setElementClass(this.email.nativeElement, 'email', true);
    this.renderer.invokeElementMethod(this.email.nativeElement, 'focus');
    // console.log('this.email ', this.email.nativeElement);
    // this.email.nativeElement.setAttribute('placeholder', 'Enter your email address');
    // this.email.nativeElement.classList.add('email');
    // this.email.nativeElement.focus();
    //console.log('this.message ', this.message);
    if (this.message) {
        this.message.forEach( (message) => {
          message.days = 30;
        });
        this.cd.detectChanges();
    }

  }

  ngAfterContentInit() {
    // if (this.message) {
    //   this.message.days = 30;
    // }
    //console.log('this.remember ', this.remember);
    this.remember.forEach( (item) => {
      item.checked.subscribe( (checked: boolean) => this.showMessage = checked );
    });
    // if (this.remember) {
    //   this.remember.checked
    //     .subscribe( (checked: boolean) => {
    //       this.showMessage = checked;
    //     })
    // }

  }

  onSubmit(value: User) {
    this.submitted.emit(value);
  }

}
