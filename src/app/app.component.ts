import { Component, ViewChild, ViewContainerRef, ComponentFactoryResolver, AfterContentInit } from '@angular/core';
import { AuthFormDynamicComponent } from './auth-form/auth-form-dynamic.component';
import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {

  rememberMe: boolean = false;
  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver ) {

  }

  ngAfterContentInit() {
    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormDynamicComponent);
    const component = this.entry.createComponent(authFormFactory);
  }

  createUser(user: User) {
    console.log('Create account', user);
  }

  loginUser(user: User) {
    console.log('Login', user, this.rememberMe);
  }

  rememberUser(remember: boolean) {
    this.rememberMe = remember;

  }



}
