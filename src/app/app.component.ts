import {
  Component,
  ViewChild,
  ViewContainerRef,
  ComponentFactoryResolver,
  AfterContentInit,
  ComponentRef,
  TemplateRef,
  ChangeDetectionStrategy
} from '@angular/core';
import { AuthFormDynamicComponent } from './auth-form/auth-form-dynamic.component';
import { User } from './auth-form/auth-form.interface';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterContentInit {

  component: ComponentRef<AuthFormDynamicComponent>;
  rememberMe: boolean = false;
  @ViewChild('entry', { read: ViewContainerRef }) entry: ViewContainerRef;
  @ViewChild('tmpl') tmpl: TemplateRef<any>;
  ctx = {
    $implicit: 'Todd Motto',
    location: 'England, UK'
  };
  user: any = {
    name: 'Mark Hoppus',
    age: 44,
    location: 'California'
  };



  constructor(private resolver: ComponentFactoryResolver ) {

  }

  ngAfterContentInit() {
    // creating a dynamic component.
    const authFormFactory = this.resolver.resolveComponentFactory(AuthFormDynamicComponent);
    this.entry.createComponent(authFormFactory);
    this.component = this.entry.createComponent(authFormFactory, 0);
    this.component.instance.title = 'Create account';
    this.component.instance.submitted.subscribe(this.loginUser);
    //console.log('component ', component.instance);

    this.entry.createEmbeddedView(this.tmpl, {
      $implicit: 'Monica Gosschalk',
      location: 'England, UK'
    });
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

  moveComponent() {
    this.entry.move(this.component.hostView, 1);
  }

  addProp() {
    this.user.email = 'blink@blink-182.net';
  }

  changeName() {
    this.user.name = 'Travis Barker';
  }

  changeUser() {
    this.user = {
      name: 'Tom Delonge',
      age: 41,
      location: 'California'
    };
  }



}
