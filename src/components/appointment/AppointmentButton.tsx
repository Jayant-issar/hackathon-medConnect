import React from 'react';
import { PlusCircle } from 'lucide-react';

interface AppointmentButtonProps {
  onClick: () => void;
}

export function AppointmentButton({ onClick }: AppointmentButtonProps) {
  return (
    <button 
      onClick={onClick}
      className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
    >
      <PlusCircle className="h-6 w-6 text-blue-500 mr-3" />
      <span className="text-sm font-medium text-blue-700">Schedule Appointment</span>
    </button>
  );
} 