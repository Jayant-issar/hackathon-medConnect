import { useState, useMemo } from "react";
import { HospitalCard } from "@/components/HospitalCard";
import { Loader2 } from "lucide-react";
import { BedType } from "@/types/medical";
import SearchBar from "@/components/hospitals/Search-Bar";
import { Hospital } from "@/types/all-types";
import { useHospitalsQuery } from "@/hooks/useHospitalsQuery";

const Hospitals = () => {
  const [search, setSearch] = useState("");
  const [selectedBedType, setSelectedBedType] = useState<BedType | "">("");
  const [minAvailable, setMinAvailable] = useState("");
  const { data: hospitalsData, isLoading } = useHospitalsQuery();

  const filteredHospitals = useMemo(() => {
    let filtered: Hospital[] = hospitalsData?.data || [];

    if (search) {
      filtered = filtered.filter((hospital) =>
        hospital.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedBedType && minAvailable) {
      filtered = filtered.filter((hospital) => {
        const bedInfo = hospital.beds.find((bed) => bed.type === selectedBedType);
        return bedInfo && bedInfo.available >= parseInt(minAvailable || "0");
      });
    }

    return filtered;
  }, [hospitalsData, search, selectedBedType, minAvailable]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-medical-light p-4">
      <div className="container mx-auto animate-fade-in">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-medical-purple to-medical-blue bg-clip-text text-transparent mb-8">
          Find Hospital Beds
        </h1>

        <SearchBar
          handleSearch={handleSearch}
          search={search}
          setSearch={setSearch}
          selectedBedType={selectedBedType}
          setSelectedBedType={setSelectedBedType}
          minAvailable={minAvailable}
          setMinAvailable={setMinAvailable}
        />

        {isLoading ? (
          <div className="flex justify-center items-center min-h-[200px]">
            <Loader2 className="w-8 h-8 animate-spin text-medical-purple" />
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredHospitals.map((hospital) => (
              <div key={hospital.id} className="animate-scale-in">
                <HospitalCard hospital={hospital} />
              </div>
            ))}
            {filteredHospitals.length === 0 && (
              <p className="text-center text-gray-500 py-8">
                No hospitals found matching your criteria
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Hospitals;
