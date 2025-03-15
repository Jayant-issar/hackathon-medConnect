import React, { useState } from 'react';
import { useHospitalsQuery } from '@/hooks/useHospitalsQuery';

interface AppointmentFormProps {
  onSubmit: (data: any) => void;
  isSubmitting: boolean;
}

export function AppointmentForm({ onSubmit, isSubmitting }: AppointmentFormProps) {
  const [hospitalId, setHospitalId] = useState('');
  const [department, setDepartment] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [reason, setReason] = useState('');
  const [patientName, setPatientName] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const { data: hospitals = [] } = useHospitalsQuery();

  const handleSubmit = () => {
    onSubmit({
      hospitalId,
      department,
      dateTime: dateTime ? new Date(dateTime).toISOString() : '',
      reason,
      patientName,
      contactNumber
    });
  };

  const departments = [
    "General Medicine",
    "Cardiology",
    "Orthopedics",
    "Pediatrics",
    "Neurology",
    "Dermatology"
  ];

  return (
    <div className=" grid grid-cols-2 gap-4 gap-x-4">
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Select Hospital</label>
        <select 
          value={hospitalId}
          onChange={(e) => setHospitalId(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select a hospital</option>
          {hospitals.data && hospitals.data.map((hospital) => (
            <option key={hospital.id} value={hospital.id}>
              {hospital.name}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Department</label>
        <select 
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">Select department</option>
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Date & Time</label>
        <input
          type="datetime-local"
          value={dateTime}
          onChange={(e) => setDateTime(e.target.value)}
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Reason for Visit</label>
        <input
          type="text"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Brief description of your condition"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Patient Name</label>
        <input
          type="text"
          value={patientName}
          onChange={(e) => setPatientName(e.target.value)}
          placeholder="Full name"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Contact Number</label>
        <input
          type="tel"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          placeholder="Phone number"
          className="w-full p-2 border rounded-md"
        />
      </div>

      <button 
        type="button" 
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Scheduling...' : 'Schedule Appointment'}
      </button>
    </div>
  );
}