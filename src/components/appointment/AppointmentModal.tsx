import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { AppointmentForm } from './AppointmentForm';
import { useAppointments } from '@/hooks/useAppointments';
import { toast } from 'sonner';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AppointmentModal({ isOpen, onClose }: AppointmentModalProps) {
  const { scheduleAppointment, isScheduling } = useAppointments();

  const handleSubmit = async (data: any) => {
    try {
      await scheduleAppointment(data);
      toast.success("Appointment scheduled successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to schedule appointment. Please try again.");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 "
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh]  relative "
            onClick={e => e.stopPropagation()}
          >
            
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            
            <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Schedule Appointment
            </h2>
              <AppointmentForm onSubmit={handleSubmit} isSubmitting={isScheduling} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
} 