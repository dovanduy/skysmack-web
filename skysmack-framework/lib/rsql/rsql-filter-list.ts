import { RSQLFilterExpression } from './rsql-filter-expression';
import { RSQLConnectors } from './rsql-connectors';

export class RSQLFilterList {
  private andList: Array<RSQLFilterExpression | RSQLFilterList>;
  private orList: Array<RSQLFilterExpression | RSQLFilterList>;

  constructor() {
    this.andList = [];
    this.orList = [];
  }

  public and(filter: RSQLFilterExpression | RSQLFilterList) {
    if (filter !== undefined && filter !== null && filter.build() !== '') {
      this.andList.push(filter);
    }
  }

  public or(filter: RSQLFilterExpression | RSQLFilterList) {
    if (filter !== undefined && filter !== null && filter.build() !== '') {
      this.orList.push(filter);
    }
  }

  /**
   * Builds the filter string for this list of filters.
   * If there is more than one filter expression, it puts
   * parenthesis around the expression.
   */
  public build(): string {
    let filterString = '';
    // const includeParens = this.andList.length + this.orList.length > 1;
    let includeConnector = false;
    // if (includeParens) {
    //   filterString += '(';
    // }
    for (let filter of this.andList) {
      if (includeConnector) {
        filterString += RSQLConnectors.And;
      }
      filterString += filter.build();
      includeConnector = true;
    }
    for (let filter of this.orList) {
      if (includeConnector) {
        filterString += RSQLConnectors.Or;
      }
      filterString += filter.build();
      includeConnector = true;
    }
    // if (includeParens) {
    //   filterString += ')';
    // }

    return filterString;
  }
}
