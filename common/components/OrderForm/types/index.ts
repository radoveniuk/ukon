export type Activity = {
  created_at: string;
  description: string;
  effective_from: string;
  effective_to: string;
  id: number;
  organization_id: number;
  status: 'open' | 'stopped' | 'closed';
  suspended_from: string;
  suspended_to: string;
  updated_at: string;
  _?: Partial<Activity>;
}

export type CorporateBody = {
  cin: string,
  name: string,
  type: 'individual' | 'company';
  companyName: string,
  businessAddress: string,
  address: string,
  activities?: Activity[];
};