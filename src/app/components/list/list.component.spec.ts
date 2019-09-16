import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ListComponent } from './list.component';
import { BrowserModule } from '@angular/platform-browser';
import { MatCardModule } from '@angular/material';
import { BooksService } from '../../services/books.service';
import { of } from 'rxjs';
import { Book } from '../../models/book';

// Mock service
class BooksServiceMock {
  books = of([]);
}

describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture< ListComponent>;
  let compiled: HTMLElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ BrowserModule, MatCardModule ],
      declarations: [ ListComponent ],
      providers: [ {provide: BooksService, useClass: BooksServiceMock} ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render list', fakeAsync(() => {
    const service = TestBed.get(BooksService);
    service.books = of(bookList);

    fixture.detectChanges();
    const list = compiled.querySelectorAll('li');
    expect(list.length).toBe(2);

    const title1 = compiled.querySelectorAll('mat-card-title')[0].textContent;
    expect(title1).toContain(bookList[0].title);

    const position1 = compiled.querySelectorAll('mat-card-subtitle')[0].textContent;
    expect(position1).toContain(bookList[0].position.x);
  }));
});

// list example
const bookList: Book[] = [
  {
    id: 'a1',
    title: 'title 1',
    author: 'auhor 1',
    width: 1,
    position: {
      x: 1,
      y: 1
    }
  },
  {
    id: 'a1',
    title: 'title 2',
    author: 'auhor 2',
    width: 1,
    position: {
      x: 1,
      y: 1
    }
  }
];
