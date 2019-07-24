import { PackageType } from '@skysmack/framework';
import { EmailsTypeId } from './emails-type';

export const EmailsSmtpTypeId = 'a0b76bc0-28e1-4074-ba3e-1ac080c551ad';

export class EmailsSmtpType implements PackageType {
  id = EmailsSmtpTypeId;
  dependencies = [EmailsTypeId];
}
