import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  finishBookInReadingList,
  getFinishedBooks,
  hasFinishedBooks,
  getUnfinishedBooks,
  removeFromReadingList
} from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent {
  readingList$ = this.store.select(getUnfinishedBooks);
  finishedBooks$ = this.store.select(getFinishedBooks);
  hasFinishedBooks$ = this.store.select(hasFinishedBooks);

  constructor(private readonly store: Store) {}

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
  }

  finishBook(item: ReadingListItem) {
    this.store.dispatch(finishBookInReadingList({ item }));
  }
}
