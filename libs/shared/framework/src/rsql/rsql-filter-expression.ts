import { Operators } from './rsql-filter-operators';

export class RSQLFilterExpression {
  public field: string;
  public operator: Operators;
  public value: string | Array<string | number | boolean> | Date | number | boolean | undefined;

  constructor(
    field: string,
    operator: Operators,
    value: string | Array<string | number | boolean> | Date | number | boolean | undefined
  ) {
    this.field = field;
    this.operator = operator;
    this.value = value;
  }

  /**
   * Builds the individual filter expression into the proper format.
   */
  public build(): string {
    let filterString = '';
    let shouldQuote = false;
    // convert the value into an appropriate string.
    let valueString: any = '';
    if (typeof this.value === 'string') {
      valueString = this.value;
      valueString = valueString.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
      shouldQuote = true;
    }
    if (typeof this.value === 'number') {
      valueString = this.value.toString();
    }
    if (typeof this.value === 'boolean') {
      valueString = this.value ? 'true' : 'false';
    }
    if (this.value instanceof Array) {
      const quotedValues = this.value.filter(i => i !== undefined).map(i => {
        if (typeof i === 'number') {
          return i;
        } else if (typeof i === 'string') {
          const val = (i as string).replace(/\\/g, '\\\\').replace(/"/g, '\\"');
          return this.quote(val);
        } else {
          return this.quote(i as any) as any;
        }
      });
      valueString = quotedValues.join(',');
    }
    if (this.value instanceof Date) {
      const year = this.value.getFullYear();
      const month = this.value.getMonth() + 1;
      const date = this.value.getDate();

      // Ensure that all year values have four digits, and that month and
      // date values have two digits, by adding leading zeros as necessary
      let yearString = String(year);
      let monthString = String(month);
      let dateString = String(date);

      if (year === 0) {
        yearString = '0000';
      } else if (year < 10) {
        yearString = `000${yearString}`;
      } else if (year < 100) {
        yearString = `00${yearString}`;
      } else if (year < 1000) {
        yearString = `0${yearString}`;
      }

      if (month < 10) {
        monthString = `0${monthString}`;
      }

      if (date < 10) {
        dateString = `0${dateString}`;
      }

      valueString = [yearString, monthString, dateString].join('-');
      shouldQuote = true;
    }
    if (this.value === null) {
      valueString = 'null';
    }
    // construct the filter string
    filterString += this.field;
    switch (this.operator) {
      case Operators.Equal:
        filterString = `${filterString}=in=${shouldQuote ? this.quote(valueString) : valueString}`;
        break;
      case Operators.NotEqual:
        filterString = `${filterString}!=${shouldQuote ? this.quote(valueString) : valueString}`;
        break;
      case Operators.Like:
        filterString = `${filterString}==${this.quote(valueString)}`;
        break;
      case Operators.GreaterThan:
        filterString = `${filterString}>${valueString}`;
        break;
      case Operators.GreaterThanEqualTo:
        filterString = `${filterString}>=${valueString}`
        break;
      case Operators.LessThan:
        filterString = `${filterString}<${valueString}`
        break;
      case Operators.LessThanEqualTo:
        filterString = `${filterString}<=${valueString}`
        break;
      case Operators.StartsWith:
        filterString = `${filterString}==${this.quote(`${valueString}*`)}`
        break;
      case Operators.EndsWith:
        filterString = `${filterString}==${this.quote(`*${valueString}`)}`
        break;
      case Operators.Contains:
        filterString = `${filterString}==${this.quote(`*${valueString}*`)}`
        break;
      case Operators.DoesNotContain:
        filterString = `${filterString}!=${this.quote(`*${valueString}*`)}`
        break;
      case Operators.In:
        filterString = `${filterString}=in=(${valueString})`
        break;
      case Operators.NotIn:
        filterString = `${filterString}=out=(${valueString})`
        break;
      case Operators.IsEmpty:
        filterString = `${filterString}==""`
        break;
      case Operators.IsNotEmpty:
        filterString = `${filterString}!=""`
        break;
      case Operators.IsNull:
        filterString = `${filterString}==null`
        break;
      case Operators.IsNotNull:
        filterString = `${filterString}!=null`
        break;
    }

    return filterString;
  }

  private quote(value: string | boolean): string {
    return `${value}`;
  }
}
