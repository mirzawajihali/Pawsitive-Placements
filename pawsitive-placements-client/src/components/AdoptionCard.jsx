import React from 'react';

const AdoptionCard = ({ application }) => {
    const {
        fullName, email, phone, image, petName, breed, category, adoptionFee, location,
        address, occupation, adoptionReason, petExperience, livingSituation
    } = application;

    return (
        <div className="w-full max-w-4xl bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col md:flex-row">
            {/* Image Section - Left Side */}
            <div className="md:w-1/3 h-48 md:h-auto relative overflow-hidden">
                <img 
                    src={image} 
                    alt={petName} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
                />
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
                    <h2 className="text-xl font-bold text-white">{petName}</h2>
                    <p className="text-gray-200 text-sm">{breed}</p>
                </div>
                <span className="absolute top-3 right-3 bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                    {category}
                </span>
            </div>

            {/* Details Section - Right Side */}
            <div className="md:w-2/3 p-4 md:p-6 flex flex-col">
                {/* Top Row - Pet Info */}
                <div className="flex justify-between items-start mb-3">
                    <div>
                        <p className="text-sm text-gray-600 flex items-center">
                            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {location}
                        </p>
                    </div>
                    <span className="bg-green-100 text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded">
                        ৳{adoptionFee}
                    </span>
                </div>

                {/* Middle Section - Applicant Info */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-1 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            Applicant
                        </h3>
                        <div className="space-y-1 text-sm pl-6">
                            <p><span className="font-medium text-gray-700">Name:</span> {fullName}</p>
                            <p><span className="font-medium text-gray-700">Phone:</span> {phone}</p>
                            <p><span className="font-medium text-gray-700">Email:</span> {email}</p>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-md font-semibold text-gray-800 mb-1 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Details
                        </h3>
                        <div className="space-y-1 text-sm pl-6">
                            <p><span className="font-medium text-gray-700">Occupation:</span> {occupation}</p>
                            <p><span className="font-medium text-gray-700">Address:</span> {address}</p>
                            <p><span className="font-medium text-gray-700">Living:</span> {livingSituation.replace(/_/g, ' ')}</p>
                        </div>
                    </div>
                </div>

                {/* Bottom Section - Adoption Details */}
                <div className="mt-auto">
                    <div className="mb-3">
                        <h3 className="text-md font-semibold text-gray-800 mb-1 flex items-center">
                            <svg className="w-4 h-4 mr-2 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Adoption Reason
                        </h3>
                        <p className="text-sm pl-6 text-gray-700">{adoptionReason}</p>
                    </div>

                    {/* Action Button */}
                    <button className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center text-sm">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        View Full Details
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AdoptionCard;