import { useState } from 'react';
import { useParams, useNavigate, useLoaderData } from 'react-router-dom';

const PetDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const pet = useLoaderData();
  
  // In a real app, you would fetch this data from an API using the id
  const {
    _id,
    name ,
    category,
    breed,
    age,
    gender,
    size,
    location,
    description,
    adoptionFee,
    vaccinated,
    spayedNeutered,
    healthStatus,
    postedBy,
    contactEmail,
    contactPhone,
    postedDate,
    image,
  } = pet;


  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    occupation: '',
    petExperience: '',
    livingSituation: '',
    adoptionReason: '',
    agreeTerms: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the form data to your backend
    console.log('Adoption request submitted:', { petId: id, ...formData });
    alert('Adoption request submitted successfully!');
    navigate('/thank-you');
  };

  return (
   <section>
     <div className="max-w-7xl h-16 mx-auto bg-black"> </div>
     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="mb-6 flex items-center text-indigo-600 hover:text-indigo-800"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Pets
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Pet Details Card */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="relative h-64 sm:h-80 lg:h-96">
              <img 
                src={ image} 
                alt={ name} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-white bg-opacity-90 rounded-full px-3 py-1 shadow-md">
                <span className="font-semibold text-indigo-700">৳{ adoptionFee}</span>
              </div>
            </div>

            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">{ name}</h1>
                  <p className="text-lg text-gray-600">{ breed}</p>
                </div>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  { category}
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Age</p>
                  <p className="font-medium">{ age} years</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Gender</p>
                  <p className="font-medium">{ gender}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Size</p>
                  <p className="font-medium">{ size}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Location</p>
                  <p className="font-medium">{ location}</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-900">About { name}</h3>
                <p className="mt-2 text-gray-600">{ description}</p>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500">Health Status</p>
                  <p className="font-medium">{ healthStatus}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Vaccinated</p>
                  <p className="font-medium">{ vaccinated ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Spayed/Neutered</p>
                  <p className="font-medium">{ spayedNeutered ? 'Yes' : 'No'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Posted</p>
                  <p className="font-medium">{postedDate}</p>
                </div>
              </div>

              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                <div className="mt-2">
                  <p className="text-gray-600">Posted by: { postedBy}</p>
                  <p className="text-gray-600">Email: { contactEmail}</p>
                  <p className="text-gray-600">Phone: { contactPhone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Adoption Form */}
          <div className="bg-white rounded-lg shadow-lg overflow-hidden p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Adoption Application</h2>
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    Full Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="address"
                    name="address"
                    rows={3}
                    required
                    value={formData.address}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="occupation" className="block text-sm font-medium text-gray-700">
                    Occupation <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="occupation"
                    name="occupation"
                    required
                    value={formData.occupation}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div>
                  <label htmlFor="petExperience" className="block text-sm font-medium text-gray-700">
                    Previous Pet Experience <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="petExperience"
                    name="petExperience"
                    rows={3}
                    required
                    value={formData.petExperience}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Tell us about any pets you've had before"
                  />
                </div>

                <div>
                  <label htmlFor="livingSituation" className="block text-sm font-medium text-gray-700">
                    Living Situation <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="livingSituation"
                    name="livingSituation"
                    required
                    value={formData.livingSituation}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Select your living situation</option>
                    <option value="own_house">Own house with yard</option>
                    <option value="own_apartment">Own apartment</option>
                    <option value="rent_house">Rent house with yard</option>
                    <option value="rent_apartment">Rent apartment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="adoptionReason" className="block text-sm font-medium text-gray-700">
                    Why do you want to adopt { name}? <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="adoptionReason"
                    name="adoptionReason"
                    rows={3}
                    required
                    value={formData.adoptionReason}
                    onChange={handleChange}
                    className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                </div>

                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="agreeTerms"
                      name="agreeTerms"
                      type="checkbox"
                      required
                      checked={formData.agreeTerms}
                      onChange={handleChange}
                      className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="agreeTerms" className="font-medium text-gray-700">
                      I agree to the adoption terms and conditions <span className="text-red-500">*</span>
                    </label>
                    <p className="text-gray-500">By checking this box, I confirm that all information provided is accurate.</p>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Submit Adoption Request
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
   </section>
  );
};

export default PetDetailPage;