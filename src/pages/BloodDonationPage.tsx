import React, { useState, useMemo } from 'react';
import { Drive } from '@/types/all-types';
import { DriveCard } from '@/components/donationDrive/DriveCard';
import { SearchBar } from '@/components/donationDrive/SearchBar';
import { FilterBar } from '@/components/donationDrive/FilterBar';
import { RegistrationModal } from '@/components/donationDrive/RegistrationModal';
import { useDonationDrivesQuery } from '@/hooks/useDonationDrivesQuery';
import { Loader2 } from 'lucide-react';

function BloodDonationPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [selectedDrive, setSelectedDrive] = useState<Drive | null>(null);
  const { data: drivesData, isLoading } = useDonationDrivesQuery();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDrives = useMemo(() => {
    let filtered: Drive[] = drivesData || [];

    if (searchTerm) {
      filtered = filtered.filter((drive) =>
        drive.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (selectedFilter !== 'all') {
        filtered = filtered.filter((drive) => drive.urgentTypes.includes(selectedFilter));
    }

    return filtered;
  }, [drivesData, searchTerm, selectedFilter]);


  const handleFilterChange = (filter: string) => {
    setSelectedFilter(filter);
  };

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleRegister = (drive: Drive) => {
    setSelectedDrive(drive);
    setShowRegisterModal(true);
  };

  const closeModal = () => {
    setShowRegisterModal(false);
    setSelectedDrive(null);
  };

  const confirmRegistration = (bloodType: string, timeSlot: string) => {
    // You can add logic here to submit the registration to an API
    console.log(`Registering for drive: ${selectedDrive?.title}`);
    console.log(`Blood Type: ${bloodType}, Time Slot: ${timeSlot}`);
    closeModal();
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Blood Donation Drives</h1>
          <p className="mt-2 text-gray-600">Find and register for upcoming blood donation drives in your area</p>
        </div>

        <SearchBar onSearch={handleSearch} />
        <FilterBar selectedFilter={selectedFilter} onFilterChange={handleFilterChange} />

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="w-8 h-8 animate-spin text-medical-purple" />
          </div>
        ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredDrives.map((drive) => (
            <DriveCard key={drive.id} drive={drive} onRegister={handleRegister} />
          ))}
          {filteredDrives.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No donation drives found matching your criteria
              </p>
            )}
        </div>
        )}
      </div>

      {showRegisterModal && selectedDrive && (
        <RegistrationModal
          drive={selectedDrive}
          onClose={closeModal}
          onConfirm={confirmRegistration}
        />
      )}
    </div>
  );
}

export default BloodDonationPage;
