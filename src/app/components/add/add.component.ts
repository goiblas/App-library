import { BooksService } from './../../services/books.service';
import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
})
export class AddComponent implements OnInit {
  addForm: FormGroup;
  constructor(
    private booksService: BooksService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.addForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      author: ['', [Validators.required]],
      width: [1, [Validators.min(1), Validators.max(500)]]
    });
  }

  submit() {
    if (this.addForm.invalid) { return; }

    const title = this.addForm.get('title').value;
    const author = this.addForm.get('author').value;
    const width = this.addForm.get('width').value;
    const id = this.booksService.getId();

    const book = {
      title, author, width, id
    };

    this.booksService.add(book);
    this.addForm.reset();
    this.router.navigate(['/']);
  }
}
