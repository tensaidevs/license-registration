import { AuditFieldsI } from "./auditfields";


export interface ArmsApplication extends AuditFieldsI {
  id: string;
  name: string;
  fatherName: string;
  CNICNumber: string;
  criminalCase: boolean;
  applicationfor: string;
  weaponType: string;
  cartridges: string;
  licenseNumber: string;
  weaponNumber: string;
  area: string;
  issueDate: string;
  expiryDate: string;
  status: string;
}
