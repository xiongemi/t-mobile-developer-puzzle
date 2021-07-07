import { Component, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import {
  getReadingList,
  removeFromReadingList,
  undoRemoveFromReadingList
} from '@tmo/books/data-access';
import { ReadingListItem } from '@tmo/shared/models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'tmo-reading-list',
  templateUrl: './reading-list.component.html',
  styleUrls: ['./reading-list.component.scss']
})
export class ReadingListComponent implements OnDestroy {
  readingList$ = this.store.select(getReadingList);

  private subscription = new Subscription();

  constructor(private readonly store: Store, private snackBar: MatSnackBar) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  removeFromReadingList(item: ReadingListItem) {
    this.store.dispatch(removeFromReadingList({ item }));
    const snackBarRef = this.snackBar.open(
      `Remove ${item.title} from reading list`,
      'Undo'
    );
    this.subscription.add(
      snackBarRef.onAction().subscribe(() => {
        this.store.dispatch(undoRemoveFromReadingList({ item }));
      })
    );
  }
}
