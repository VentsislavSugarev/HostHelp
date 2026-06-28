import { Organization } from '../models/Organization';

export interface OrganizationRepository {
  getOrganizations(): Promise<Organization[]>;
  getOrganizationById(id: string): Promise<Organization | null>;
  saveOrganization(organization: Partial<Organization>): Promise<Organization>;
  updateOrganization(id: string, organization: Partial<Organization>): Promise<Organization>;
  deleteOrganization(id: string): Promise<void>;
}