import { OrganizationRepository } from '../../../domain/repositories/OrganizationRepository';
import { Organization } from '../../../domain/models/Organization';
import { supabase } from '../../database/supabase';

export class SupabaseOrganizationRepository implements OrganizationRepository {
  async getOrganizations(): Promise<Organization[]> {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw new Error(error.message);
    return data as Organization[];
  }

  async getOrganizationById(id: string): Promise<Organization | null> {
    const { data, error } = await supabase
      .from('organizations')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as Organization;
  }

  async saveOrganization(organization: Partial<Organization>): Promise<Organization> {
    const { data, error } = await supabase
      .from('organizations')
      .insert(organization)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Organization;
  }

  async updateOrganization(id: string, organization: Partial<Organization>): Promise<Organization> {
    const { data, error } = await supabase
      .from('organizations')
      .update(organization)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Organization;
  }

  async deleteOrganization(id: string): Promise<void> {
    const { error } = await supabase
      .from('organizations')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  }
}