import React from 'react';
import { 
  Activity, 
  Droplet, 
  Building2, 
  Users, 
  Bell,
  Search,
  MapPin,
  TrendingUp,
  AlertCircle,
  Heart,
  Calendar,
  UserCircle,
  Settings,
  LayoutDashboard,
  LogOut,
  Clock,
  Phone,
  PlusCircle,
  CalendarCheck,
  ArrowUpCircle,
  ChevronRight,
  Syringe,
  BadgeCheck
} from 'lucide-react';
import { UserButton } from '@clerk/clerk-react';
import { AppointmentButton } from '@/components/appointment/AppointmentButton';
import { AppointmentModal } from '@/components/appointment/AppointmentModal';
import { useAppointments } from '@/hooks/useAppointments';
import { format } from 'date-fns';
import { useEmergencyAlerts } from '@/hooks/useEmergencyAlerts';
import { EmergencyAlerts } from '@/components/dashboard/EmergencyAlerts';
import { useUser } from '@clerk/clerk-react';
import { NotificationsDropdown } from '@/components/dashboard/NotificationsDropdown';

const nearbyFacilities = [
  {
    name: 'City General Hospital',
    type: 'Hospital',
    distance: '0.8 km',
    beds: 23,
    status: 'Open',
  },
  {
    name: 'LifeSource Blood Bank',
    type: 'Blood Bank',
    distance: '1.2 km',
    status: 'Open',
  },
  {
    name: 'Metro Healthcare Center',
    type: 'Hospital',
    distance: '2.1 km',
    beds: 15,
    status: 'Open',
  },
  {
    name:"Narayana Hospital",
    type:"Hospital",
    distance:"3.5 km",
    beds:10,
    status:"Open"
  },
  {
    name:"Apollo Hospital",
    type:"Hospital",
    distance:"4.2 km",
    beds:20,
    status:"Open"
  },
  {
    name:"Apollo Blood Bank",
    type:"Blood Bank",
    distance:"4.5 km",
    status:"Open"
  }
]
function Dashboard() {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = React.useState(false);
  const { appointments, isLoading } = useAppointments();
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;

  return (
    <div className="min-h-screen bg-gray-50 flex -ml-64 ">
      

      {/* Main Content */}
      <div className="flex-1 ml-64">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-gray-600">
                  <Clock className="h-4 w-4 inline mr-1" />
                  Last updated: 2 minutes ago
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <NotificationsDropdown />
                </div>
                <UserButton/>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Search Bar */}
          <div className="relative mb-8">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search for hospitals, blood banks, or services..."
            />
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-medium text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <AppointmentButton onClick={() => setIsAppointmentModalOpen(true)} />
              <button className="flex items-center p-4 bg-red-50 rounded-lg hover:bg-red-100 transition-colors">
                <Droplet className="h-6 w-6 text-red-500 mr-3" />
                <span className="text-sm font-medium text-red-700">Donate Blood</span>
              </button>
              <button className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors">
                <Phone className="h-6 w-6 text-green-500 mr-3" />
                <span className="text-sm font-medium text-green-700">Emergency Contact</span>
              </button>
              <button className="flex items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors">
                <Building2 className="h-6 w-6 text-purple-500 mr-3" />
                <span className="text-sm font-medium text-purple-700">Find Hospital</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Building2 className="h-6 w-6 text-gray-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Nearby Hospitals</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">12</div>
                        <span className="ml-2 text-sm text-green-600">+2 new</span>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Droplet className="h-6 w-6 text-red-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Blood Banks</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">8</div>
                        <span className="ml-2 text-sm text-gray-600">in 5km radius</span>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Activity className="h-6 w-6 text-green-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Available Beds</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">156</div>
                        <span className="ml-2 text-sm text-red-600">-12 today</span>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white overflow-hidden shadow rounded-lg">
              <div className="p-5">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Users className="h-6 w-6 text-blue-400" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">Blood Donors</dt>
                      <dd className="flex items-baseline">
                        <div className="text-2xl font-semibold text-gray-900">2.4k</div>
                        <span className="ml-2 text-sm text-green-600">+8% this week</span>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Grid */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Nearby Facilities */}
            <div className="lg:col-span-2 bg-white shadow rounded-lg">
              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-medium text-gray-900">Nearby Facilities</h3>
                  <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center">
                    View all
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </button>
                </div>
                <div className="space-y-4">
                  {nearbyFacilities.map((facility, index) => (
                    <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
                      <div className="flex-shrink-0">
                        {facility.type === 'Hospital' ? (
                          <Building2 className="h-6 w-6 text-blue-500" />
                        ) : (
                          <Droplet className="h-6 w-6 text-red-500" />
                        )}
                      </div>
                      <div className="ml-4 flex-1">
                        <h4 className="text-sm font-medium text-gray-900">{facility.name}</h4>
                        <div className="mt-1 flex items-center space-x-4 text-sm text-gray-500">
                          <span>{facility.type}</span>
                          <span>•</span>
                          <div className="flex items-center">
                            <MapPin className="h-4 w-4 mr-1" />
                            {facility.distance}
                          </div>
                          {facility.beds && (
                            <>
                              <span>•</span>
                              <span>{facility.beds} beds available</span>
                            </>
                          )}
                        </div>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        {facility.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="space-y-6">
              
              {/* Emergency Alerts */}
              <EmergencyAlerts userEmail={userEmail} />

              {/* Upcoming Appointments */}
              <div className="bg-white shadow rounded-lg">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Upcoming Appointments</h3>
                    <CalendarCheck className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    {appointments.map((appointment) => (
                      <div key={appointment.id} className="p-4 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-blue-800">
                            {appointment.department}
                          </span>
                          <span className="text-xs text-blue-600">
                            {format(new Date(appointment.dateTime), 'MMM d, h:mm a')}
                          </span>
                        </div>
                        <p className="text-sm text-blue-600">{appointment.hospitalName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Blood Donation Stats */}
              <div className="bg-white shadow rounded-lg">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-medium text-gray-900">Your Blood Donations</h3>
                    <Syringe className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-gray-900">5</p>
                        <p className="text-sm text-gray-500">Total donations</p>
                      </div>
                      <BadgeCheck className="h-8 w-8 text-green-500" />
                    </div>
                    <div className="flex items-center space-x-4 text-sm">
                      <div className="flex-1">
                        <p className="text-gray-500">Last donation</p>
                        <p className="font-medium text-gray-900">Jan 15, 2024</p>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-500">Next eligible</p>
                        <p className="font-medium text-green-600">Apr 15, 2024</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              
            </div>
          </div>
        </main>
      </div>

      {/* Add the modal */}
      <AppointmentModal 
        isOpen={isAppointmentModalOpen}
        onClose={() => setIsAppointmentModalOpen(false)}
      />
    </div>
  );
}

export default Dashboard;
