import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Appointment } from "@/types/appointment";

// Mock data
const mockAppointments: Appointment[] = [
  {
    id: '1',
    hospitalName: 'LifeSource Blood Bank',
    hospitalId: 'lsbb1',
    department: 'General Medicine',
    dateTime: new Date(Date.now() + 86400000).toISOString(), // Tomorrow
    reason: 'Blood Donation',
    patientName: 'John Doe',
    contactNumber: '123-456-7890',
    status: 'scheduled'
  },
  {
    id: '2',
    hospitalName: 'City General Hospital',
    hospitalId: 'cgh1',
    department: 'General Medicine',
    dateTime: '2024-03-15T14:30:00Z',
    reason: 'General Checkup',
    patientName: 'John Doe',
    contactNumber: '123-456-7890',
    status: 'scheduled'
  }
];

// Mock API functions
const fetchAppointments = async (): Promise<Appointment[]> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return mockAppointments;
};

const scheduleAppointment = async (appointment: Omit<Appointment, 'id'>): Promise<Appointment> => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  console.log('Scheduling appointment:', appointment);
  return {
    ...appointment,
    id: Math.random().toString(36).substr(2, 9)
  };
};

export function useAppointments() {
  const queryClient = useQueryClient();

  const { data: appointments = [], isLoading } = useQuery({
    queryKey: ['appointments'],
    queryFn: fetchAppointments,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const scheduleMutation = useMutation({
    mutationFn: scheduleAppointment,
    onMutate: async (newAppointment) => {
      // Cancel any outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['appointments'] });

      // Snapshot the previous value
      const previousAppointments = queryClient.getQueryData(['appointments']);

      // Optimistically update to the new value
      queryClient.setQueryData(['appointments'], (old: Appointment[] = []) => [
        ...old,
        { ...newAppointment, id: 'temp-' + Date.now() }
      ]);

      // Return a context object with the snapshotted value
      return { previousAppointments };
    },
    onError: (err, newAppointment, context) => {
      queryClient.setQueryData(['appointments'], context?.previousAppointments);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['appointments'] });
    },
  });

  return {
    appointments,
    isLoading,
    scheduleAppointment: scheduleMutation.mutate,
    isScheduling: scheduleMutation.isPending
  };
}