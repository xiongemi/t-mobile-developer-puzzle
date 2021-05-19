# Code Review

In libs/books/feature/src/lib/book-search/book-search.component.ts:

- Subscription is not unsubscribed on ngOnDestroy, potential memory leak.

```
  ngOnInit(): void {
    this.store.select(getAllBooks).subscribe(books => {
      this.books = books;
    });
  }
```

Could use `| async` pipe, so we don't need to worry about unsubscribing.

```
books$: Observable<ReadingListBook[]>;

ngOnInit(): void {
  this.books$ = this.store.select(getAllBooks);
}
```

- Could use datePipe to replace function `formatDate`.
- When removing the characters in the search box, goes back to empty search result. However, enter anything in the search box afterwards, shows previous search results. Could listens to this.searchForm.value.term.valueChanges and fire action to clear search.

- Correctly, there is some inconsistently formatting in the code. I updated the the .pretterrc and run `npm run format:write`.

# Accessiblity

## Lighthouse Errors

- Search button icon in the book search bar does not have an aria-label.
- "Try searching for a topic, for example..." text does not have enough color contract with the background.

## Manual Scan

- Close button icon inside the reading list side nav does not have an aria-label.
- Book images under the book search result do not have alt text.
- Book images under the reading list do not have alt text.
- Javascript text should be a button rather than a link.
