export interface AllFiles {
  id: string;
  url: string;
  name: string;
  type: string;
  size: number;
  cloudinaryPublicId?: string;
}

export interface AllFilesWithAudit extends AllFiles, auditFields_v {}
