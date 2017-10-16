import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  AfterContentInit,
  ComponentRef
} from '@angular/core';
import { AuthFormDynamicComponent } from './auth-form/auth-form-dynamic.component';
import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {

  component: ComponentRef<AuthFormDynamicComponent>;

  rememberMe: boolean = false;
  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver ) {

  }

  ngAfterContentInit() {
    // creating a dynamic component.
    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormDynamicComponent);
    this.component = this.entry.createComponent(authFormFactory);
    this.component.instance.title = 'Create account';
    this.component.instance.submitted.subscribe(this.loginUser);
    //console.log('component ', component.instance);
  }

  createUser(user: User) {
    console.log('Create account', user);
  }

  loginUser(user: User) {
    console.log('Login', user);
  }

  rememberUser(remember: boolean) {
    this.rememberMe = remember;

  }

  destroyComponent() {
    //onsole.log('this.component ', this.component);
    this.component.destroy();
  }



}
