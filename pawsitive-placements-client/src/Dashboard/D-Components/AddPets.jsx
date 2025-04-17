import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { FaUpload, FaTrash } from 'react-icons/fa';
import axios from 'axios';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import Swal from 'sweetalert2';


const image_upload_key = import.meta.env.VITE_IMAGE_UPLOAD_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_upload_key}`

const AddPets = ({ pet = {}}) => {
  // State for image preview
  const [previewImage, setPreviewImage] = useState(pet.image || '');
  const axiosSecure= useAxiosSecure();
  

  // Initialize react-hook-form
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors }
  } = useForm({
    defaultValues: {
      name: '',
      category: '',
      breed: '',
      age: '',
      gender: '',
      size: '',
      location: '',
      description: '',
      adoptionFee: '',
      vaccinated: false,
      spayedNeutered: false,
      healthStatus: '',
      contactEmail: '',
      contactPhone: '',
      ...pet // Spread existing pet data if editing
    }
  });

  const [imageFile, setImageFile] = useState(null); // Add this state

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
        setValue('image', reader.result); // Still keep base64 for preview
      };
      reader.readAsDataURL(file);
      setImageFile(file); // Store the actual file for upload
    }
  };

  // Remove image
  const removeImage = () => {
    setPreviewImage('');
    setValue('image', '');
  };

  // Form submission handler
  const onSubmit = async (data) => {
    try {
      // 1. First upload image to ImgBB if exists
      let imageUrl = '';
      if (imageFile) {
        const formData = new FormData();
        formData.append('image', imageFile);
        
        const imgResponse = await axios.post(image_hosting_api, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        if (imgResponse.data.success) {
          imageUrl = imgResponse.data.data.display_url;
        } else {
          throw new Error('Image upload failed');
        }
      }
  
      // 2. Prepare pet data with image URL
      const petData = {
        ...data,
        image: imageUrl, // Use the ImgBB URL instead of base64
        // Add any other fields you need
      };
  

      console.log(petData)
      // 3. Now send petData to your backend
      const response = await axiosSecure.post('/pets', petData);
      if(response.data.insertedId>0){
        Swal.fire({
            title: "You're not logged in!",
            text: "Please login to continue.",
            imageUrl: "https://cdn-icons-png.flaticon.com/512/565/565547.png", // Replace with your own image if needed
            imageWidth: 100,
            imageHeight: 100,
            imageAlt: "Login required",
            icon: "info",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Login Now",
            cancelButtonText: "Cancel"
          }).then((result) => {
            if (result.isConfirmed) {
              navigate("/login" , {state : {from : location}}) // Navigate to login page
            }
          });
      }
      
      // 4. Reset form on success
      reset();
      setPreviewImage('');
      setImageFile(null);
      
      // Show success message
     
      
    } catch (error) {
      console.error('Error:', error);
      alert('Submission failed. Please try again.');
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-lg shadow-md p-6 space-y-6 border border-[#93B1B5]">
        <h2 className="text-2xl font-bold text-[#0B2E33] border-b border-[#B8E3E9] pb-2">
          {pet._id ? 'Edit Pet Listing' : 'Create New Pet Listing'}
        </h2>

        {/* Image Upload */}
        <div className="flex flex-col items-center">
          <div className="w-40 h-40 rounded-lg overflow-hidden border-2 border-[#B8E3E9] mb-3 relative bg-[#f5f5f5]">
            {previewImage ? (
              <img src={previewImage} alt="Pet preview" className="w-full h-full object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-[#4F7C82]">
                <FaUpload className="text-4xl" />
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            <label className="btn bg-[#4F7C82] hover:bg-[#0B2E33] text-white cursor-pointer">
              <FaUpload className="mr-2" />
              Upload Image
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            
            {previewImage && (
              <button 
                type="button"
                onClick={removeImage}
                className="btn btn-outline text-[#0B2E33] hover:bg-[#93B1B5]"
              >
                <FaTrash className="mr-2" />
                Remove
              </button>
            )}
          </div>
        </div>

        {/* Basic Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Name */}
          <div>
            <label className="label">
              <span className="label-text text-[#0B2E33]">Pet Name*</span>
            </label>
            <input
              type="text"
              className={`input input-bordered w-full ${errors.name ? 'border-red-500' : 'focus:border-[#4F7C82]'}`}
              {...register('name', { required: 'Pet name is required' })}
            />
            {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="label">
              <span className="label-text text-[#0B2E33]">Category*</span>
            </label>
            <select
              className={`select select-bordered w-full ${errors.category ? 'border-red-500' : 'focus:border-[#4F7C82]'}`}
              {...register('category', { required: 'Category is required' })}
            >
              <option value="">Select category</option>
              <option value="Dog">Dog</option>
              <option value="Cat">Cat</option>
              <option value="Bird">Bird</option>
              <option value="Other">Other</option>
            </select>
            {errors.category && <p className="mt-1 text-sm text-red-500">{errors.category.message}</p>}
          </div>

          {/* Breed */}
          <div>
            <label className="label">
              <span className="label-text text-[#0B2E33]">Breed*</span>
            </label>
            <input
              type="text"
              className={`input input-bordered w-full ${errors.breed ? 'border-red-500' : 'focus:border-[#4F7C82]'}`}
              {...register('breed', { required: 'Breed is required' })}
            />
            {errors.breed && <p className="mt-1 text-sm text-red-500">{errors.breed.message}</p>}
          </div>

          {/* Age */}
          <div>
            <label className="label">
              <span className="label-text text-[#0B2E33]">Age*</span>
            </label>
            <input
              type="text"
              className={`input input-bordered w-full ${errors.age ? 'border-red-500' : 'focus:border-[#4F7C82]'}`}
              {...register('age', { required: 'Age is required' })}
              placeholder="e.g. 2 years"
            />
            {errors.age && <p className="mt-1 text-sm text-red-500">{errors.age.message}</p>}
          </div>

          {/* Gender */}
          <div>
            <label className="label">
              <span className="label-text text-[#0B2E33]">Gender*</span>
            </label>
            <select
              className={`select select-bordered w-full ${errors.gender ? 'border-red-500' : 'focus:border-[#4F7C82]'}`}
              {...register('gender', { required: 'Gender is required' })}
            >
              <option value="">Select gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <p className="mt-1 text-sm text-red-500">{errors.gender.message}</p>}
          </div>

          {/* Size */}
          <div>
            <label className="label">
              <span className="label-text text-[#0B2E33]">Size*</span>
            </label>
            <select
              className={`select select-bordered w-full ${errors.size ? 'border-red-500' : 'focus:border-[#4F7C82]'}`}
              {...register('size', { required: 'Size is required' })}
            >
              <option value="">Select size</option>
              <option value="Small">Small</option>
              <option value="Medium">Medium</option>
              <option value="Large">Large</option>
            </select>
            {errors.size && <p className="mt-1 text-sm text-red-500">{errors.size.message}</p>}
          </div>

          {/* Location */}
          <div>
            <label className="label">
              <span className="label-text text-[#0B2E33]">Location*</span>
            </label>
            <input
              type="text"
              className={`input input-bordered w-full ${errors.location ? 'border-red-500' : 'focus:border-[#4F7C82]'}`}
              {...register('location', { required: 'Location is required' })}
            />
            {errors.location && <p className="mt-1 text-sm text-red-500">{errors.location.message}</p>}
          </div>

          {/* Adoption Fee */}
          <div>
            <label className="label">
              <span className="label-text text-[#0B2E33]">Adoption Fee*</span>
            </label>
            <div className="relative">
              <span className="absolute left-3 top-3 text-[#0B2E33]">৳</span>
              <input
                type="number"
                className={`input input-bordered w-full pl-8 ${errors.adoptionFee ? 'border-red-500' : 'focus:border-[#4F7C82]'}`}
                {...register('adoptionFee', { 
                  required: 'Adoption fee is required',
                  min: { value: 0, message: 'Fee cannot be negative' }
                })}
              />
            </div>
            {errors.adoptionFee && <p className="mt-1 text-sm text-red-500">{errors.adoptionFee.message}</p>}
          </div>
        </div>

        {/* Health Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Vaccinated */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-sm border-[#4F7C82]"
              {...register('vaccinated')}
            />
            <span className="label-text text-[#0B2E33]">Vaccinated</span>
          </label>

          {/* Spayed/Neutered */}
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              className="checkbox checkbox-sm border-[#4F7C82]"
              {...register('spayedNeutered')}
            />
            <span className="label-text text-[#0B2E33]">Spayed/Neutered</span>
          </label>

          {/* Health Status */}
          <div className="md:col-span-1">
            <label className="label">
              <span className="label-text text-[#0B2E33]">Health Status*</span>
            </label>
            <select
              className={`select select-bordered w-full ${errors.healthStatus ? 'border-red-500' : 'focus:border-[#4F7C82]'}`}
              {...register('healthStatus', { required: 'Health status is required' })}
            >
              <option value="">Select health status</option>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Needs Care">Needs Care</option>
            </select>
            {errors.healthStatus && <p className="mt-1 text-sm text-red-500">{errors.healthStatus.message}</p>}
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="label">
            <span className="label-text text-[#0B2E33]">Description*</span>
          </label>
          <textarea
            className={`textarea textarea-bordered w-full h-32 ${errors.description ? 'border-red-500' : 'focus:border-[#4F7C82]'}`}
            {...register('description', { 
              required: 'Description is required',
              minLength: { value: 20, message: 'Description should be at least 20 characters' }
            })}
            placeholder="Tell us about the pet's personality, behavior, special needs..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>}
        </div>

        {/* Contact Information Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Contact Email */}
          <div>
            <label className="label">
              <span className="label-text text-[#0B2E33]">Contact Email*</span>
            </label>
            <input
              type="email"
              className={`input input-bordered w-full ${errors.contactEmail ? 'border-red-500' : 'focus:border-[#4F7C82]'}`}
              {...register('contactEmail', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
            />
            {errors.contactEmail && <p className="mt-1 text-sm text-red-500">{errors.contactEmail.message}</p>}
          </div>

          {/* Contact Phone */}
          <div>
            <label className="label">
              <span className="label-text text-[#0B2E33]">Contact Phone*</span>
            </label>
            <input
              type="tel"
              className={`input input-bordered w-full ${errors.contactPhone ? 'border-red-500' : 'focus:border-[#4F7C82]'}`}
              {...register('contactPhone', { 
                required: 'Phone number is required',
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: 'Invalid phone number'
                }
              })}
              placeholder="e.g. 01712345678"
            />
            {errors.contactPhone && <p className="mt-1 text-sm text-red-500">{errors.contactPhone.message}</p>}
          </div>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-[#93B1B5]">
          <button
            type="button"
            onClick={() => reset()}
            className="btn btn-ghost text-[#0B2E33] hover:bg-[#93B1B5]"
          >
            Reset
          </button>
          <button
            type="submit"
            className="btn text-white bg-[#4F7C82] hover:bg-[#0B2E33]"
          >
            {pet._id ? 'Update Pet' : 'Submit Listing'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPets;