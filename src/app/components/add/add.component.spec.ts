import { Router } from '@angular/router';
import { BooksService } from '../../services/books.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddComponent } from './add.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormBuilder } from '@angular/forms';

class BooksServiceMock {
  add() {}
  getId() {}
}
class RouterMock {
  navigate() {}
}
describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture< AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddComponent ],
      providers: [
        { provide: Router , useClass: RouterMock},
        { provide: BooksService, useClass: BooksServiceMock },
        FormBuilder ],
      schemas: [ NO_ERRORS_SCHEMA ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should redirect to list after submit', () => {
      const router = TestBed.get(Router);
      spyOn(router, 'navigate');
      sendForm();

      expect(router.navigate).toBeCalledWith(['/']);
  });

  it('should save new book ', () => {
      const booksService = TestBed.get(BooksService);
      spyOn(booksService, 'add');
      sendForm();

      expect(booksService.add).toBeCalledTimes(1);
  });

  it('should reset form after submit', () => {
      sendForm();
      const inputTitle = component.addForm.get('title');
      expect(inputTitle.value).toBeNull();
  });

  const sendForm = () => {
    component.addForm.get('title').setValue('titulo');
    component.addForm.get('author').setValue('autor');
    component.submit();
  };
});
