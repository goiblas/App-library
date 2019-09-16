import { take } from 'rxjs/operators';
import { Book } from './../models/book';
import { DatabaseService } from './database.service';
import { TestBed, fakeAsync } from '@angular/core/testing';

import { BooksService } from './books.service';
import { of } from 'rxjs';

// Mock dates
const idFake = '111';
const bookFake: Book = {
  title: 'titulo',
  author: 'yo',
  width: 120,
  id: 'a1'
};

const numbersOfBooks = 10;

// Mock database service
class DatabaseServiceMock {
  getId() {
    return idFake;
  }
  getAll() {
    return of(new Array(numbersOfBooks).fill(bookFake));
  }
  add() {
    return Promise.resolve();
  }
}

describe('BooksService', () => {
  let service: BooksService;
  let databaseService: DatabaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
          BooksService,
          { provide: DatabaseService, useClass: DatabaseServiceMock }
        ]
    });
    service = TestBed.get(BooksService);
    databaseService = TestBed.get(DatabaseService);
  });

  // general
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // id
  describe('Id', () => {
    it('should get id', () => {
      expect(service.getId()).toBe(idFake);
    });
  });

  // books store
  describe('Books store', () => {
    it('should get all books', fakeAsync(() => {
      service.books.pipe(take(1)).subscribe( books => {
        expect(books.length).toBe(numbersOfBooks);
      });
    }));
  });

  // Add new book
  describe('Add new book', () => {
    it('should call database each book', fakeAsync(() => {
      spyOn(databaseService, 'add');
      service.add(bookFake).then(() => {
        expect(databaseService.add).toBeCalledTimes(numbersOfBooks + 1);
      });
    }));
  });

  // Place books
  describe('Place books', () => {
    it('should add position', () => {
      const [ bookPlaced ] = service.place([bookFake]);
      expect(bookPlaced.position.x).toBe(1);
      expect(bookPlaced.position.y).toBe(1);
    });

    it('should change shelf when is filled', () => {
      const hugeBook = {
        ...bookFake,
        width: 1000
      };
      const [ , secondBook ] = service.place([hugeBook, hugeBook]);
      expect(secondBook.position.y).toBe(2);
    });

    it('should throw error when all is filled', () => {
      const bigBook = {
        ...bookFake,
        width: 500
      };
      const allBooks = new Array(20).fill(bigBook);
      expect(() => service.place(allBooks) ).toThrowError();
    });
  });

  // sort books
  describe('sort books', () => {
    it('should sort 2 books', () => {

      const twoBooksSorted = [{
        title: 'Archangel',
        ...bookFake,
      }, {
        title: 'Las aristas de la muerte',
        ...bookFake,
      }];

      const twoBooksUnsorted = [{
        title: 'Las aristas de la muerte',
        ...bookFake,
      }, {
        title: 'Archangel',
        ...bookFake,
      }];

      expect(service.sort(twoBooksUnsorted)).toEqual(twoBooksSorted);
    });

    it('should sort numbers before letters', () => {
      const numberBeforeLettersUnsorted = [{
        title: 'Amelia',
        ...bookFake,
      }, {
        title: '12 Monos',
        ...bookFake,
      }];

      const numberBeforeLettersSorted = [{
        title: '12 Monos',
        ...bookFake,
      }, {
        title: 'Amelia',
        ...bookFake,
      }];

      expect(service.sort(numberBeforeLettersUnsorted)).toEqual(numberBeforeLettersSorted);
    });

  });

});

