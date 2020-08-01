import { Injectable } from '@angular/core';
import { MatPaginatorIntl } from '@angular/material/paginator';

@Injectable()
export class CustomPaginator extends MatPaginatorIntl {
  // https://stackoverflow.com/questions/46869616/how-to-use-matpaginatorintl
  of: string;

  constructor() {
    super();

    this.getAndInitTranslations();
  }

  getAndInitTranslations() {
    this.firstPageLabel = '1ª página';
    this.itemsPerPageLabel = 'Items por página';
    this.lastPageLabel = 'Última página';
    this.nextPageLabel = 'Próxima página';
    this.previousPageLabel = 'Página anterior';
    this.of = 'de';
  }

  getRangeLabel = function (page, pageSize, length) {
    if (length === 0 || pageSize === 0) {
      return '0 de ' + length;
    }
    length = Math.max(length, 0);
    const startIndex = page * pageSize;
    // If the start index exceeds the list length, do not try and fix the end index to the end.
    const endIndex = startIndex < length ?
      Math.min(startIndex + pageSize, length) :
      startIndex + pageSize;
    return startIndex + 1 + ' - ' + endIndex + ' de ' + length;
  };
}
