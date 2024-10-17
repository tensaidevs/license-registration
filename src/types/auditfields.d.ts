// Audit fields
export interface AuditFieldsI {
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface AuditFieldsII {
  createdBy?: string | null;
  updatedBy?: string | null;
  deletedBy?: string | null;
}

export interface AuditFieldsIII extends AuditFieldsI {
  isDeleted?: boolean | null;
  deletedAt?: string | null;
}

export interface AuditFieldsIV extends AuditFieldsIII, AuditFieldsII {}

export interface AuditFieldsV extends AuditFieldsIV, AuditFieldsI {}
