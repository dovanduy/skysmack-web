import { Operators } from './rsql-filter-operators';
import { RSQLFilterExpressionOptions } from './rsql-filter-expression-options'; 

export class RSQLFilterExpression {
  public field: string;
  public operator: Operators;
  public value: string | Array<string | number | boolean> | Date | number | boolean | undefined;
  public options: RSQLFilterExpressionOptions;

  constructor(
    field: string,
    operator: Operators,
    value: string | Array<string | number | boolean> | Date | number | boolean | undefined,
    options: RSQLFilterExpressionOptions = { includeTimestamp: false }
  ) {
    this.field = field;
    this.operator = operator;
    this.value = value;
    this.options = options;
  }

  /**
   * Builds the individual filter expression into the proper format.
   */
  public build(): string {
    let filterString = '';
    let shouldQuote = false;
    // convert the value into an appropriate string.
    let valueString: string = '';
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
          return quote(val);
        } else {
          return quote(i);
        }
      });
      valueString = quotedValues.join(',');
    }
    if (this.value instanceof Date) {
      if (this.options.includeTimestamp) {
        valueString = this.buildDateString(this.value, true) + this.buildTimestamp(this.value);
      } else {
        valueString = this.buildDateString(this.value, false);
      }

      shouldQuote = true;
    }

    if (this.value === null) {
      valueString = 'null';
    }
    // construct the filter string
    filterString += this.field;
    switch (this.operator) {
      case Operators.Equal:
        filterString = `${filterString}=in=${shouldQuote ? quote(valueString) : valueString}`;
        break;
      case Operators.NotEqual:
        filterString = `${filterString}!=${shouldQuote ? quote(valueString) : valueString}`;
        break;
      case Operators.Like:
        filterString = `${filterString}==${quote(valueString)}`;
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
        filterString = `${filterString}==${quote(`${valueString}*`)}`
        break;
      case Operators.EndsWith:
        filterString = `${filterString}==${quote(`*${valueString}`)}`
        break;
      case Operators.Contains:
        filterString = `${filterString}==${quote(`*${valueString}*`)}`
        break;
      case Operators.DoesNotContain:
        filterString = `${filterString}!=${quote(`*${valueString}*`)}`
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
  
  private buildDateString(dateObject: Date, useUTC: boolean): string {
    let year: number;
    let month: number;
    let date: number;

    if (useUTC) {
      year = dateObject.getUTCFullYear();
      month = dateObject.getUTCMonth() + 1;
      date = dateObject.getUTCDate();
    } else {
      year = dateObject.getFullYear();
      month = dateObject.getMonth() + 1;
      date = dateObject.getDate();
    }

    const yearString = this.numberToString(year, 4);
    const monthString = this.numberToString(month, 2);
    const dateString = this.numberToString(date, 2);

    return [yearString, monthString, dateString].join('-');
  }

  /**
   * Returns a timestamp in the ISO 8601 format for the given Date object, using UTC values (i.e. 'T'HH:mm:ss.SSS'Z').
   */
  private buildTimestamp(dateObject: Date): string {
    const hours = dateObject.getUTCHours();
    const minutes = dateObject.getUTCMinutes();
    const seconds = dateObject.getUTCSeconds();
    const millis = dateObject.getUTCMilliseconds();

    const hoursString = this.numberToString(hours, 2);
    const minutesString = this.numberToString(minutes, 2);
    const secondsString = this.numberToString(seconds, 2);
    const millisString = this.numberToString(millis, 3);

    return 'T' + [hoursString, minutesString, secondsString].join(':') + '.' + millisString + 'Z';
  }

  /**
   * Returns a string of the given number, ensuring the total number of digits
   * is as specified by left-padding with zeros if necessary.
   * e.g. numberToString(8, 3) === '008'
   */
  private numberToString(num: number, digitCount: number): string {
    let s = String(num);

    while (s.length < digitCount) {
      s = '0' + s;
    }

    return s;
  }
}

export function quote(value: string | boolean): string {
  return `${value}`;
}
