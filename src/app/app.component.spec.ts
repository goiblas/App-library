import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule, MatToolbarModule } from '@angular/material';

describe('AppComponent', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserModule,
        RouterTestingModule,
        MatButtonModule,
        MatToolbarModule,
      ],
      declarations: [
        AppComponent
      ]
    }).compileComponents();
  }));

  let component: AppComponent;
  let fixture: ComponentFixture< AppComponent>;
  let compiled: HTMLElement;

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
    component = fixture.componentInstance;
  });

  it('should create app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should have title APP Library', () => {
    const title = compiled.querySelector('h1 a').textContent;
    expect(title).toContain('APP Library');
  });

  it('should have add button', () => {
    const title = compiled.querySelector('#add-button').textContent;
    expect(title).toContain('Añadir');
  });
});
