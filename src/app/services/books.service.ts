import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { Book } from './../models/book';
import { DatabaseService } from './database.service';

@ Injectable({
  providedIn: 'root'
})
export class BooksService {
  readonly SHELF_LENGTH = 1500;
  readonly SHELF_AMOUNT = 5;
  books: Observable< Book[]>;

  constructor( private database: DatabaseService) {
    this.books = database.getAll();
  }

  getId(): string {
    return this.database.getId();
  }

  async add( book: Book ) {
    try {
      const books = await this.database.getAll().pipe(take(1)).toPromise();
      const booksSorted = this.sort([...books, book]);
      const booksPlaced = this.place(booksSorted);

      booksPlaced.forEach( bookPlaced => {
        this.database.add(bookPlaced);
      });

    } catch (error) {
      console.error(error);
    }
  }

  sort(books: Book[]): Book[] {
    return books.sort( (a, b) => {
      return (a.title >= b.title) ? 1 : -1;
     });
  }

  place(books: Book[]): Book[] {
    let widthFilled = 0;
    let positionY = 1;
    let positionX = 0;

    return books.map( (book) => {
      const { width } = book;

      if ( widthFilled + width <= this.SHELF_LENGTH) {
        widthFilled += width;
        positionX++;

        return {
          ...book,
          position: {
            x: positionX,
            y: positionY
          }
        };
      }

      if ( positionY < this.SHELF_AMOUNT) {
        positionY++;
        widthFilled = 0;
        positionX = 1;

        return {
          ...book,
          position: {
            x: positionX,
            y: positionY
          }
        };
      }

      throw new Error('Noy hay espacio suficiente');
    });
  }
}
