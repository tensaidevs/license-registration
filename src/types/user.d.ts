export interface User {
  id: string;
  roleId: string;
  recruitmentDriveId?: string | null;
  email: string;
  username?: string | null;
  password?: string | null;
  firstName: string;
  middleName?: string | null;
  lastName?: string | null;
  gender?: string | null;
  dateOfBirth?: string | null;
  mobileNumber?: string | null;
  nationality?: string | null;
  identificationType?: string | null;
  identificationNumber?: string | null;
  address?: string | null;
  location?: string | null;
  avatarId?: string | null;
  meetingId?: string | null;
  isVerified: boolean;
  isActive: boolean;
  isLocked: boolean;
  lastLogin?: string | null;
  lockedAt?: string | null;
  resetToken?: string | null;
  verificationToken?: string | null;
  passwordResetToken?: string | null;
  tokenExpiresAt?: string | null;
  createdBy?: string | null;
}

export interface UserWithAudit extends User, AuditFieldsIII {}
