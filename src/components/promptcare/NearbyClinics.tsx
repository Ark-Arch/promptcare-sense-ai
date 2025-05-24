
import { useState } from 'react';
import type { Clinic } from '@/types/promptcare';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import Spinner from './Spinner';
import { MapPin, ExternalLink } from 'lucide-react';

const NearbyClinics = () => {
  const [clinics, setClinics] = useState<Clinic[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [permissionDenied, setPermissionDenied] = useState(false);

  const mockClinics: Clinic[] = [
    { id: '1', name: 'City General Clinic', distance: '1.2 km', mapUrl: 'https://maps.google.com/?q=City+General+Clinic' },
    { id: '2', name: 'Wellness Medical Center', distance: '2.5 km', mapUrl: 'https://maps.google.com/?q=Wellness+Medical+Center' },
    { id: '3', name: 'Community Health Hub', distance: '3.1 km', mapUrl: 'https://maps.google.com/?q=Community+Health+Hub' },
  ];

  const handleFindClinics = () => {
    setIsLoading(true);
    setPermissionDenied(false);
    setClinics(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('User position:', position.coords.latitude, position.coords.longitude);
          // Simulate fetching clinics based on location
          setTimeout(() => {
            setClinics(mockClinics);
            setIsLoading(false);
          }, 1500);
        },
        (error) => {
          setIsLoading(false);
          setPermissionDenied(true);
          console.error('Geolocation error:', error);
          toast.error('Could not retrieve location. Please enable location services in your browser/system settings.', {
            duration: 5000,
          });
        }
      );
    } else {
      setIsLoading(false);
      toast.error('Geolocation is not supported by your browser.', { duration: 5000 });
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto mt-8 p-6 bg-promptcare-surface rounded-xl shadow-xl animate-fade-in-up animation-delay-400">
      <h2 className="text-2xl font-semibold text-promptcare-primary mb-4 text-center">Nearby Clinics</h2>
      {!clinics && !isLoading && (
        <div className="text-center">
          <Button onClick={handleFindClinics} className="bg-promptcare-primary hover:bg-opacity-80 text-promptcare-primary-foreground">
            <MapPin className="w-5 h-5 mr-2" />
            Find Clinics Near Me
          </Button>
          {permissionDenied && (
            <p className="text-sm text-red-500 mt-2">
              Location access was denied. Please enable it to find nearby clinics.
            </p>
          )}
        </div>
      )}

      {isLoading && (
        <div className="flex justify-center items-center py-8">
          <Spinner size={32} />
          <p className="ml-3 text-muted-foreground">Searching for clinics...</p>
        </div>
      )}

      {clinics && clinics.length > 0 && (
        <div className="space-y-4">
          {clinics.map((clinic) => (
            <div key={clinic.id} className="p-4 border border-border rounded-lg bg-white hover:shadow-md transition-shadow">
              <h3 className="font-semibold text-lg text-gray-800">{clinic.name}</h3>
              <p className="text-sm text-muted-foreground">{clinic.distance} away</p>
              <a
                href={clinic.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm text-promptcare-primary hover:underline mt-1"
              >
                Open in Maps <ExternalLink className="w-3 h-3 ml-1" />
              </a>
            </div>
          ))}
           <div className="text-center mt-6">
             <Button onClick={handleFindClinics} variant="outline" className="border-promptcare-primary text-promptcare-primary hover:bg-promptcare-primary hover:text-promptcare-primary-foreground">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh List
            </Button>
           </div>
        </div>
      )}
       {clinics && clinics.length === 0 && !isLoading && (
         <p className="text-center text-muted-foreground">No clinics found based on your location, or an error occurred.</p>
       )}
    </div>
  );
};

export default NearbyClinics;
