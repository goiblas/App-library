import { Injectable } from '@angular/core';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@ Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  private collection: AngularFirestoreCollection< Book >;

  /**
   * @param database: AngularFirestore
   * https://github.com/angular/angularfire2/blob/master/docs/firestore/collections.md
   */
  constructor(private database: AngularFirestore) {
    this.collection = database.collection< Book >('books');
  }

  getId(): string {
    return this.database.createId();
  }

  getAll(): Observable< Book[] > {
    return this.collection.valueChanges();
  }

  add( book: Book): Promise< any > {
    return this.collection.doc(book.id).set(book);
  }
}
