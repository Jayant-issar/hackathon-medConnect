import React from 'react';
import { AlertTriangle, MapPin, Clock, User, Phone } from 'lucide-react';
import { Emergency } from '@/types/all-types';
import { formatDate } from '@/lib/utils';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEmergencyAlerts } from '@/hooks/useEmergencyAlerts';
import {  useUser } from '@clerk/clerk-react';
import { useOnboarding } from '@/hooks/useOnboarding';



export function EmergencyRequestList() {
  // const getStatusColor = (status: Emergency['status']) => {
  //   switch (status) {
  //     case 'pending':
  //       return 'bg-yellow-100 text-yellow-800';
  //     case 'inProgress':
  //       return 'bg-blue-100 text-blue-800';
  //     case 'resolved':
  //       return 'bg-green-100 text-green-800';
  //     default:
  //       return 'bg-gray-100 text-gray-800';
  //   }
  // };

  const geturgencyLevelColor = (urgencyLevel: Emergency['urgencyLevel']) => {
    switch (urgencyLevel) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-orange-100 text-orange-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  const {data:onboardingData} = useOnboarding();
  const { allEmergencies, isLoading } = useEmergencyAlerts();
  const userId = onboardingData?.data?.user?.id;

  const myEmergencies = userId? allEmergencies.filter((emergency)=> emergency.userId = userId) : [];
  return (
    <div className="space-y-6">
      {myEmergencies.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <p className="text-center text-gray-500">No emergency requests found.</p>
          </CardContent>
        </Card>
      ) : (
        myEmergencies.map((emergency) => (
          <Card key={emergency.id}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-xl font-semibold">
                    {emergency.name} Blood Needed
                  </CardTitle>
                  <CardDescription>{emergency.hospitalName}</CardDescription>
                </div>
                <div className="flex gap-2">
                  {/* <Badge variant="secondary" className={getStatusColor(emergency.status)}>
                    {emergency.status}
                  </Badge> */}
                  <Badge variant="secondary" className={geturgencyLevelColor(emergency.urgencyLevel)}>
                    {emergency.urgencyLevel} urgencyLevel
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center">
                  <MapPin className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{emergency.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 text-gray-400 mr-2" />
                  {/* <span>{formatDate(emergency.createdAt)}</span> */}
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{emergency.contactName}</span>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-gray-400 mr-2" />
                  <span>{emergency.contactPhone}</span>
                </div>
              </div>
              {emergency.description && (
                <div className="mt-4">
                  <h4 className="font-medium text-sm text-gray-700 mb-1">Additional Information:</h4>
                  <p className="text-sm text-gray-600">{emergency.description}</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
