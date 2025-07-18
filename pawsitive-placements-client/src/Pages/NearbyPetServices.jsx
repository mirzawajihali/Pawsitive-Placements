// filepath: d:\M-12 FInal Project\Pawsitive-Placements\pawsitive-placements-client\src\Pages\NearbyPetServices.jsx
import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet/dist/leaflet.css';
import { FaMapMarkerAlt, FaHospital, FaStore, FaPaw } from 'react-icons/fa';
import SectionTitle from '../components/SectionTitle';
import { Helmet } from 'react-helmet';

// Fix for default marker icons in Leaflet
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const NearbyPetServices = () => {
  const [userLocation, setUserLocation] = useState([51.505, -0.09]); // Default to London
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('hospitals');
  const mapRef = useRef();

  // Search provider for finding places
  const provider = useMemo(() => new OpenStreetMapProvider(), []);
  
  // Find nearby places based on active tab
  const findNearbyPlaces = useCallback(async (location) => {
    try {
      setLoading(true);
      const query = activeTab === 'hospitals' ? 'veterinary' : 'pet shop';
      
      // Search for places near the user's location
      const results = await provider.search({ 
        query,
        proximity: {
          latitude: location[0],
          longitude: location[1]
        },
        params: {
          'boundary.circle.radius': 5, // 5km radius
          limit: 20 // limit results
        }
      });
      
      setPlaces(results);
      setLoading(false);
    } catch (errorMsg) {
      console.error(errorMsg);
      setError("Failed to fetch nearby places");
      setLoading(false);
    }
  }, [activeTab, provider]);

  // Get user's current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
          setLoading(false);
          findNearbyPlaces([latitude, longitude]);
        },
        (error) => {
          setError(error.message);
          setLoading(false);
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
      setLoading(false);
    }
  }, [findNearbyPlaces]);

  // Update places when tab changes
  useEffect(() => {
    if (userLocation) {
      findNearbyPlaces(userLocation);
    }
  }, [activeTab, findNearbyPlaces, userLocation]);

  // Component to handle map view changes
  const MapUpdater = ({ center }) => {
    const map = useMap();
    map.setView(center, 14);
    return null;
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#B9D9EB]"></div>
      <p className="ml-4 text-[#041E2B] font-medium">Loading your location...</p>
    </div>
  );
  
  if (error) return (
    <div className="flex justify-center items-center min-h-[60vh] text-center px-4">
      <div className="bg-red-50 p-6 rounded-lg border-l-4 border-red-500">
        <h3 className="text-xl font-bold text-red-700 mb-2">Error</h3>
        <p className="text-red-600">{error}</p>
        <p className="mt-4 text-[#353E43]">
          Please check your internet connection and location settings, then try again.
        </p>
      </div>
    </div>
  );

  return (
    <section className="pb-12 px-4 bg-[#F8FBFD]">
      <Helmet>
        <title>Nearby Pet Services | Pawsitive Placements</title>
        <meta name="description" content="Find nearby pet hospitals and pet shops to care for your furry friends" />
      </Helmet>
      <div className="max-w-7xl h-16 mx-auto bg-black">
      

      </div> 

      
      <div className="container mx-auto">
        <SectionTitle 
          title="Nearby Pet Services" 
          description="Find veterinary clinics and pet shops near your location" 
        />
        
        <div className="mt-12 max-w-6xl mx-auto">
          {/* Tabs */}
          <div className="mb-8 flex justify-center">
            <div className="bg-white rounded-lg shadow-md p-2 inline-flex">
              <button 
                className={`flex items-center px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  activeTab === 'hospitals' 
                    ? 'bg-[#041E2B] text-white shadow-md' 
                    : 'text-[#353E43] hover:bg-[#EFF8FC]'
                }`}
                onClick={() => setActiveTab('hospitals')}
              >
                <FaHospital className="mr-2" />
                Veterinary Clinics
              </button>
              <button 
                className={`flex items-center px-6 py-3 rounded-md font-medium transition-all duration-300 ${
                  activeTab === 'shops' 
                    ? 'bg-[#041E2B] text-white shadow-md' 
                    : 'text-[#353E43] hover:bg-[#EFF8FC]'
                }`}
                onClick={() => setActiveTab('shops')}
              >
                <FaStore className="mr-2" />
                Pet Shops
              </button>
            </div>
          </div>

          {/* Map Container */}
          <div className="rounded-xl overflow-hidden shadow-lg border-4 border-white">
            <MapContainer
              center={userLocation}
              zoom={14}
              style={{ height: '600px', width: '100%' }}
              ref={mapRef}
              className="z-0"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              <MapUpdater center={userLocation} />
              
              {/* User location marker */}
              <Marker position={userLocation}>
                <Popup className="custom-popup">
                  <div className="text-center">
                    <FaMapMarkerAlt className="mx-auto text-[#041E2B] text-lg mb-1" />
                    <h3 className="font-bold text-[#041E2B]">Your Location</h3>
                  </div>
                </Popup>
              </Marker>
              
              {/* Nearby places markers */}
              {places.map((place, index) => (
                <Marker 
                  key={index} 
                  position={[place.y, place.x]}
                >
                  <Popup className="custom-popup">
                    <div>
                      <div className="flex items-center mb-2">
                        {activeTab === 'hospitals' ? (
                          <FaHospital className="text-[#B9D9EB] mr-2" />
                        ) : (
                          <FaStore className="text-[#B9D9EB] mr-2" />
                        )}
                        <h3 className="font-bold text-[#041E2B]">{place.label.split(',')[0]}</h3>
                      </div>
                      <p className="text-[#353E43] text-sm">{place.label.split(',').slice(1).join(',')}</p>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Service Info */}
          <div className="mt-12 bg-white p-8 rounded-xl shadow-md border-t-4 border-[#B9D9EB]">
            <h3 className="text-xl font-bold text-[#041E2B] mb-4 flex items-center">
              <FaPaw className="mr-2 text-[#B9D9EB]" />
              {activeTab === 'hospitals' ? 'About Veterinary Clinics' : 'About Pet Shops'}
            </h3>
            <p className="text-[#353E43]">
              {activeTab === 'hospitals' 
                ? 'Veterinary clinics provide essential healthcare services for your pets. Regular check-ups help ensure your pet stays healthy and happy. Always keep contact information for your nearest clinic in case of emergencies.' 
                : 'Pet shops offer food, toys, and other supplies needed for your pet\'s wellbeing. Quality nutrition and appropriate toys are important for your pet\'s health and happiness.'}
            </p>
            
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#F8FBFD] p-4 rounded-lg border-l-4 border-[#B9D9EB]">
                <h4 className="font-semibold text-[#041E2B] mb-2">
                  {activeTab === 'hospitals' ? 'Services Offered' : 'Products Available'}
                </h4>
                <ul className="list-disc list-inside text-[#353E43] space-y-1">
                  {activeTab === 'hospitals' ? (
                    <>
                      <li>Routine check-ups and vaccinations</li>
                      <li>Emergency care</li>
                      <li>Dental procedures</li>
                      <li>Surgery and specialized treatments</li>
                    </>
                  ) : (
                    <>
                      <li>Premium pet food and treats</li>
                      <li>Toys and enrichment items</li>
                      <li>Bedding and housing</li>
                      <li>Grooming supplies</li>
                    </>
                  )}
                </ul>
              </div>
              
              <div className="bg-[#F8FBFD] p-4 rounded-lg border-l-4 border-[#B9D9EB]">
                <h4 className="font-semibold text-[#041E2B] mb-2">Tips</h4>
                <ul className="list-disc list-inside text-[#353E43] space-y-1">
                  {activeTab === 'hospitals' ? (
                    <>
                      <li>Schedule regular wellness exams</li>
                      <li>Keep vaccination records updated</li>
                      <li>Ask about preventative care</li>
                      <li>Have an emergency plan in place</li>
                    </>
                  ) : (
                    <>
                      <li>Research pet food ingredients</li>
                      <li>Choose appropriate toys for your pet's size</li>
                      <li>Consider your pet's specific needs</li>
                      <li>Ask staff for recommendations</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add some custom CSS for the map */}
      <style jsx>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 10px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .custom-popup .leaflet-popup-content {
          margin: 12px 16px;
          min-width: 200px;
        }
        
        .leaflet-container {
          font-family: 'Poppins', sans-serif;
        }
      `}</style>
    </section>
  );
};

export default NearbyPetServices;
