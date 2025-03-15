import React, { useState } from 'react';
import { AlertCircle, TrendingUp, Clock } from 'lucide-react';
import { Emergency } from '@/types/all-types';
import { useEmergencyAlerts } from '@/hooks/useEmergencyAlerts';
import { cn } from '@/lib/utils';
import { EmergencyDetailsModal } from './EmergencyDetailsModal';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertTriangle } from 'lucide-react';

export function EmergencyAlerts() {
  const [activeTab, setActiveTab] = useState<'all' | 'my'>('all');
  const [selectedEmergency, setSelectedEmergency] = useState<Emergency | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const {myEmergencies, allEmergencies,addEmergency,refetch,isLoading,isError} = useEmergencyAlerts();
  
  

  const emergencies = activeTab === 'all' ? allEmergencies : myEmergencies;

  // Function to determine background color based on urgency
  const getUrgencyStyles = (urgency: string) => {
    switch(urgency) {
      case 'high':
        return {
          bg: 'bg-red-50',
          icon: <AlertCircle className="h-5 w-5 text-red-400" />,
          title: 'text-red-800',
          text: 'text-red-700'
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50',
          icon: <TrendingUp className="h-5 w-5 text-yellow-400" />,
          title: 'text-yellow-800',
          text: 'text-yellow-700'
        };
      default:
        return {
          bg: 'bg-blue-50',
          icon: <Clock className="h-5 w-5 text-blue-400" />,
          title: 'text-blue-800',
          text: 'text-blue-700'
        };
    }
  };

  const handleEmergencyClick = (emergency: Emergency) => {
    setSelectedEmergency(emergency);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmergency(null);
  };

  return (
    <div>
      {isError && (
        <Alert variant="destructive">
          <AlertTriangle />
          <AlertTitle>Error fetching emergencies</AlertTitle>
          <AlertDescription>
            {"Something went wrong while fetching emergency alerts."}
          </AlertDescription>
        </Alert>
      )}

      <div className="bg-white shadow rounded-lg">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium text-gray-900">Emergency Alerts</h3>
            
            <div className="flex space-x-2 p-1 bg-gray-100 rounded-full">
              <button
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                  activeTab === 'all' 
                    ? "bg-white text-gray-800 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setActiveTab('all')}
              >
                All
              </button>
              <button
                className={cn(
                  "px-3 py-1 text-xs font-medium rounded-full transition-colors",
                  activeTab === 'my' 
                    ? "bg-white text-gray-800 shadow-sm" 
                    : "text-gray-500 hover:text-gray-700"
                )}
                onClick={() => setActiveTab('my')}
              >
                My
              </button>
            </div>
          </div>

          <div className="space-y-4 max-h-80 overflow-y-auto pr-1">
            {isLoading ? (
              <div className="text-center py-6">
                <div className="animate-pulse h-5 w-5 bg-gray-300 rounded-full mx-auto"></div>
                <p className="text-sm text-gray-500 mt-2">Loading alerts...</p>
              </div>
            ) :  emergencies && emergencies.length > 0 ? (
              emergencies.slice(0, 10).map((emergency, index) => {
                const styles = getUrgencyStyles(emergency.urgencyLevel);
                
                return (
                  <div 
                    key={emergency.id || index} 
                    className={`p-4 ${styles.bg} rounded-lg cursor-pointer hover:opacity-90 transition-opacity`}
                    onClick={() => handleEmergencyClick(emergency)}
                  >
                    <div className="flex">
                      <div className="flex-shrink-0">
                        {styles.icon}
                      </div>
                      <div className="ml-3">
                        <h4 className={`text-sm font-medium ${styles.title}`}>
                          {emergency.name ? `Urgent: ${emergency.name} Blood Required` : 'Emergency Alert'}
                        </h4>
                        <div className={`mt-1 text-sm ${styles.text}`}>
                          {emergency.hospitalName} needs assistance. Contact {emergency.contactPhone} if you can help.
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="text-center py-6">
                <p className="text-sm text-gray-500">No emergency alerts at this time.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Emergency Details Modal */}
      <EmergencyDetailsModal
        emergency={selectedEmergency}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
} 