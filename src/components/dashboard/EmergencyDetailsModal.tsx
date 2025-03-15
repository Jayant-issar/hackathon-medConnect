import React from 'react';
import { X, AlertTriangle, MapPin, Phone, Clock, User, CalendarClock } from 'lucide-react';
import { Emergency } from '@/types/all-types';


interface EmergencyDetailsModalProps {
  emergency: Emergency | null;
  isOpen: boolean;
  onClose: () => void;
}

export function EmergencyDetailsModal({ emergency, isOpen, onClose }: EmergencyDetailsModalProps) {
  if (!isOpen || !emergency) return null;

  // Get appropriate colors based on urgency
  const getUrgencyColor = (urgency: string) => {
    switch(urgency) {
      case 'high': return 'bg-red-50 border-red-200 text-red-700';
      case 'medium': return 'bg-yellow-50 border-yellow-200 text-yellow-700';
      default: return 'bg-blue-50 border-blue-200 text-blue-700';
    }
  };

  const getUrgencyLabel = (urgency: string) => {
    switch(urgency) {
      case 'high': return 'High Priority';
      case 'medium': return 'Medium Priority';
      default: return 'Low Priority';
    }
  };

  const getStatusLabel = (status: string) => {
    switch(status) {
      case 'pending': return 'Pending';
      case 'inProgress': return 'In Progress';
      case 'resolved': return 'Resolved';
      default: return status;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'inProgress': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="text-lg font-medium text-gray-900">Emergency Details</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Urgency Badge */}
          <div className={`mb-5 px-3 py-2 rounded-md ${getUrgencyColor(emergency.urgencyLevel)}`}>
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2" />
              <span className="font-medium">{getUrgencyLabel(emergency.urgencyLevel)}</span>
            </div>
          </div>

          {/* Status and Blood Type */}
          <div className="flex justify-between items-center mb-5">
            {/* <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(emergency.status)}`}>
              {getStatusLabel(emergency.status)}
            </span> */}

            {emergency.name && (
              <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                Emergency: {emergency.name}
              </span>
            )}
          </div>

          {/* Hospital Info */}
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Hospital Information</h4>
            <div className="p-3 bg-gray-50 rounded-md">
              <p className="font-medium text-gray-800 mb-1">{emergency.hospitalName}</p>
              <div className="flex items-center text-gray-500 text-sm">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{emergency.location}</span>
              </div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-5">
            <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Contact Information</h4>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="flex items-center mb-2">
                <User className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-gray-800">{emergency.contactName}</span>
              </div>
              <div className="flex items-center">
                <Phone className="h-4 w-4 text-gray-400 mr-2" />
                <a 
                  href={`tel:${emergency.contactPhone}`} 
                  className="text-blue-600 hover:underline"
                >
                  {emergency.contactPhone}
                </a>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          {emergency.description && (
            <div className="mb-5">
              <h4 className="text-sm font-semibold text-gray-500 uppercase mb-2">Additional Information</h4>
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-gray-700">{emergency.description}</p>
              </div>
            </div>
          )}

          {/* Timestamps */}
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center text-sm text-gray-500">
              <CalendarClock className="h-4 w-4 mr-1" />
              {/* <span>Created: {new Date(emergency.createdAt).toLocaleString()}</span> */}
            </div>
            {/* {emergency.createdBy && (
              <div className="flex items-center text-sm text-gray-500 mt-1">
                <User className="h-4 w-4 mr-1" />
                <span>By: {emergency.createdBy}</span>
              </div>
            )} */}
          </div>
        </div>

        {/* Footer */}
        <div className="px-4 py-3 bg-gray-50 border-t rounded-b-lg">
            <a 
              href={`tel:${emergency.contactPhone}`}
              className="block w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 text-center"
            >
              Contact Now
            </a>
        </div>
      </div>
    </div>
  );
} 