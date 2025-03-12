export type Department = 
  | "General Medicine"
  | "Cardiology"
  | "Orthopedics"
  | "Pediatrics"
  | "Neurology"
  | "Dermatology";

export interface Appointment {
  id: string;
  hospitalName: string;
  hospitalId: string;
  department: Department;
  dateTime: string;
  reason: string;
  patientName: string;
  contactNumber: string;
  status: 'scheduled' | 'completed' | 'cancelled';
} 