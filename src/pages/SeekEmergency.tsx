import React, { useState, useEffect } from 'react';
import { Plus, AlertTriangle, Clock, RefreshCw } from 'lucide-react';
import { Emergency } from '@/types/all-types';
import { getUserEmergencyRequests } from '@/actions/seekEmergency';
import { EmergencyRequestList } from '@/components/seekEmergency/EmergencyRequestList';
import { EmergencyRequestModal } from '@/components/seekEmergency/EmergencyRequestModal';
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useQueryClient } from '@tanstack/react-query';
import { createEmergencyRequest } from '@/actions/seekEmergency';
import { useUser,useAuth } from '@clerk/clerk-react';
import { useOnboarding } from '@/hooks/useOnboarding';
import { useEmergencyAlerts } from '@/hooks/useEmergencyAlerts';
import { toast } from 'sonner';

export default function EmergencyRequests() {
  const { allEmergencies,addEmergency,refetch,isLoading} = useEmergencyAlerts();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const [refreshing, setRefreshing] = useState(false);
  const queryClient = useQueryClient();
  const { user } = useUser();
  const {getToken} = useAuth();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const {data:onboardingData}  = useOnboarding();
  console.log(onboardingData);
  
  

  const handleNewRequest = async (newEmergencyData: Omit<Emergency, "id" | "status" | "createdAt">) => {
    try {
      // Add the user's email to the emergency request
      const emergencyWithEmail = {
        ...newEmergencyData,
        createdBy: userEmail || ''
      };
      const token = await getToken();
      // Create the emergency request
      const newEmergency = await createEmergencyRequest({name:emergencyWithEmail.name,contactName:emergencyWithEmail.contactName, contactPhone:emergencyWithEmail.contactPhone,location:emergencyWithEmail.location, urgencyLevel:emergencyWithEmail.urgencyLevel,hospitalName:emergencyWithEmail.hospitalName, description :emergencyWithEmail.description,userId:onboardingData.data.user.id},token);
      if(!newEmergency){
        // setIsModalOpen(false)
        toast.error('Failed to create emergency request. Please try again.');
        return
      }else{
        // optimistic update
        addEmergency(newEmergency);
        
        // Invalidate the emergencies query to refresh the dashboard
        queryClient.invalidateQueries({ queryKey: ['emergencies'] });
        
        setIsModalOpen(false);
      }
      
    } catch (error) {
      console.error('Error creating emergency request:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8">
        {/* Header with emergency info */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Emergency Assistance</h1>
              <p className="text-gray-600 mt-1">Request immediate help during emergencies</p>
            </div>
            <Button 
              onClick={() => setIsModalOpen(true)} 
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white font-medium shadow-md transition-all duration-200 transform hover:scale-105"
            >
              <AlertTriangle className="mr-2 h-5 w-5" /> Request Emergency Help
            </Button>
          </div>
          
          <div className="mt-6 p-4 bg-amber-50 border border-amber-200 rounded-md">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5 mr-2 flex-shrink-0" />
              <p className="text-sm text-amber-800">
                <span className="font-semibold">Important:</span> For life-threatening situations, please call your local emergency number (911, 999, 112) immediately.
                This service is designed to complement, not replace, official emergency services.
              </p>
            </div>
          </div>
        </div>

        {/* Recent requests section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-800">Your Recent Requests</h2>
              <p className="text-sm text-gray-500 mt-1">Track the status of your emergency assistance requests</p>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={()=>refetch()}
              disabled={refreshing || isLoading}
              className="flex items-center"
            >
              <RefreshCw className={`h-4 w-4 mr-1 ${refreshing ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div className="space-y-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-4 w-60" />
                    </div>
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              ))}
            </div>
          ) : allEmergencies.length > 0 ? (
            <EmergencyRequestList  /> 
            // null
          ) : (
            <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg">
              <Clock className="h-12 w-12 text-gray-300 mx-auto mb-3" />
              <h3 className="text-lg font-medium text-gray-700">No Emergency Requests</h3>
              <p className="text-gray-500 mt-1 max-w-md mx-auto">
                You haven't made any emergency requests yet. Click the "Request Emergency Help" button when you need assistance.
              </p>
            </div>
          )}
        </div>
      </div>

      <EmergencyRequestModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleNewRequest}
      />
    </div>
  );
}
