export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  layoutInterest: string;
  preferredContact: 'whatsapp' | 'call' | 'email';
  consentPdpa: boolean;
  status: 'new' | 'contacted' | 'junk';
  createdAt: string;
  notes?: string;
}

export interface LayoutOption {
  id: string;
  name: string;
  sqft: number;
  rooms: string;
  bathrooms: number;
  carparks: number;
  startingPrice: number;
  estimatedMaintenance: number;
  visualDescription: string;
  idealFor: string;
}

export interface Amenity {
  name: string;
  distance: string;
  duration: string;
  category: 'education' | 'healthcare' | 'shopping' | 'transport';
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
