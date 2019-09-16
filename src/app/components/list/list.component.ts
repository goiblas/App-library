import { BooksService } from './../../services/books.service';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor( @Inject(BooksService) private booksService: BooksService  ) { }

  ngOnInit() {
  }

}
