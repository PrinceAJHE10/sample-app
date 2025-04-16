"use client";
import React, { useState, useCallback, useEffect, useRef } from 'react';
import { 
  FiHome, 
  FiUsers, 
  FiSettings, 
  FiMenu,
  FiCalendar,
  FiUserCheck,
  FiLogOut,
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiUserPlus,
  FiFolder,
  FiSearch,
  FiUser,
  FiCreditCard,
  FiX,
  FiPlus,
  FiTrash2,
  FiEye,
  FiEdit2,
  FiDownload,
  FiPrinter
} from 'react-icons/fi';
import NextImage from "next/image";
import Link from 'next/link';
import { db, storage, auth } from '../firebase/config';
import { collection, addDoc, doc, getDoc, getDocs, query, where, updateDoc, deleteDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { regions, provinces, cities, barangays } from '../../data/philippineLocations';
import { reauthenticateWithCredential, EmailAuthProvider, updateProfile } from 'firebase/auth';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';  // Change this import
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function admindashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [graduatingDropdownOpen, setGraduatingDropdownOpen] = useState(false);
  const [alumniDropdownOpen, setAlumniDropdownOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    middleName: '',
    lastName: '',
    birthday: '',
    age: '',
    gender: '',
    ethnicity: '',
    homeAddress: '',
    course: '',
    major: '',
    graduationYear: '',
    mothersName: '',
    fathersName: '',
    photoURL: '',
  });
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedProvince, setSelectedProvince] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedBarangay, setSelectedBarangay] = useState('');
  const [customEthnicity, setCustomEthnicity] = useState('');
  const [studentRecords, setStudentRecords] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [events, setEvents] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [emailInput, setEmailInput] = useState(userEmail);
  const [passwordInput, setPasswordInput] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const [feedbackType, setFeedbackType] = useState('');
  const [toast, setToast] = useState({ open: false, message: '' });
  const [editMode, setEditMode] = useState(false);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const chartRef = useRef();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState('');
  const [eventName, setEventName] = useState('');
  const [eventDateTime, setEventDateTime] = useState('');
  const [eventDescription, setEventDescription] = useState('');
  const [eventsList, setEventsList] = useState([]);
  const [editEventIndex, setEditEventIndex] = useState(null);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [selectedSchoolYear, setSelectedSchoolYear] = useState('2024-2025');
  const [coursesData, setCoursesData] = useState({
    ICET: [],
    IARS: [],
    IBEG: [],
    ITED: [],
    IGPE: []
  });
  const [alumniCounts, setAlumniCounts] = useState({
    ICET: 0,
    ITED: 0,
    IGPE: 0,
    IBEG: 0,
    IARS: 0
  });
  const [courseData, setCourseData] = useState([]);
  const [graduates, setGraduates] = useState([]);
  const [selectedUserForGraduation, setSelectedUserForGraduation] = useState(null);
  const [graduationYear, setGraduationYear] = useState('2024-2025'); // Updated to latest school year
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  // Add a new state for the selected graduate details
  const [selectedGraduateDetails, setSelectedGraduateDetails] = useState(null);
  const [showRecentUsersModal, setShowRecentUsersModal] = useState(false);
  const [selectedRecordsYear, setSelectedRecordsYear] = useState('All Years');
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  const toggleGraduatingDropdown = () => {
    setGraduatingDropdownOpen(!graduatingDropdownOpen);
  };

  const toggleAlumniDropdown = () => {
    setAlumniDropdownOpen(!alumniDropdownOpen);
  };

  const calculateAge = (birthDate) => {
    if (!birthDate) return '';
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
        ...prev,
        [name]: value
    }));
  };

  const compressImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new window.Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions while maintaining aspect ratio
          const MAX_WIDTH = 800;
          const MAX_HEIGHT = 800;
          
          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else {
            if (height > MAX_HEIGHT) {
              width *= MAX_HEIGHT / height;
              height = MAX_HEIGHT;
            }
          }
          
          canvas.width = width;
          canvas.height = height;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          
          // Convert to blob with reduced quality
          canvas.toBlob(
            (blob) => {
              resolve(new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              }));
            },
            'image/jpeg',
            0.7 // Adjust quality (0.7 = 70% quality)
          );
        };
        img.src = event.target.result;
      };
      reader.readAsDataURL(file);
    });
  };

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please upload an image file');
        return;
      }
      
      // Validate file size (max 1MB)
      const maxSize = 1 * 1024 * 1024; // 1MB
      let imageToUpload = file;

      if (file.size > maxSize) {
        try {
          imageToUpload = await compressImage(file);
          if (imageToUpload.size > maxSize) {
            alert('Image is too large. Please choose a smaller image.');
            return;
          }
        } catch (error) {
          console.error('Error compressing image:', error);
          alert('Error processing image. Please try again with a smaller image.');
          return;
        }
      }

      setPhoto(imageToUpload);
      // Create URL for preview
      const objectUrl = URL.createObjectURL(imageToUpload);
      setPhotoPreview(objectUrl);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let photoURL = '';
      
      // Upload photo if one is selected
      if (photo) {
        try {
          // Create a unique filename using timestamp and original filename
          const filename = `${Date.now()}-${photo.name}`;
          const storageRef = ref(storage, `alumni-photos/${filename}`);
          
          // Upload the photo
          const uploadResult = await uploadBytes(storageRef, photo);
          
          // Get the download URL
          photoURL = await getDownloadURL(uploadResult.ref);
          
          console.log('Photo uploaded successfully:', photoURL);
        } catch (error) {
          console.error('Error uploading photo:', error);
          throw new Error('Failed to upload photo');
        }
      }

      // Create the alumni document with all form data
      const alumniData = {
        ...formData,
        photoURL, // Add the photo URL to the document
        email: userEmail, // Include the user's email
        createdAt: new Date().toISOString(),
      };

      // Save to Firestore
      const docRef = await addDoc(collection(db, 'alumni'), alumniData);
      console.log('Document written with ID:', docRef.id);

      // Reset form
      setFormData({
        firstName: '',
        middleName: '',
        lastName: '',
        birthday: '',
        age: '',
        gender: '',
        ethnicity: '',
        homeAddress: '',
        course: '',
        major: '',
        graduationYear: '',
        mothersName: '',
        fathersName: '',
        photoURL: '',
      });
      
      // Reset photo states
      setPhoto(null);
      if (photoPreview) {
        URL.revokeObjectURL(photoPreview);
      }
      setPhotoPreview(null);

      alert('Registration successful!');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleMenuClick = (menuItem) => {
    setActiveMenu(menuItem);
    // Close dropdowns on mobile when menu item is selected
    if (window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handleProvinceChange = (e) => {
    const provinceCode = e.target.value;
    setSelectedProvince(provinceCode);
    setSelectedCity('');
    setSelectedBarangay('');

    const province = provinces.find(p => p.code === provinceCode);
    if (province) {
      // Automatically select first municipality if available
      const firstMunicipality = province.municipalities?.[0];
      if (firstMunicipality) {
        setSelectedCity(firstMunicipality.code);
        // Automatically select first barangay if available
        if (firstMunicipality.barangays?.length > 0) {
          setSelectedBarangay(firstMunicipality.barangays[0]);
        }
      }

      setFormData(prev => ({
        ...prev,
        homeAddress: province.name
      }));
    }
  };

  const handleCityChange = (e) => {
    const cityCode = e.target.value;
    setSelectedCity(cityCode);
    setSelectedBarangay('');

    const province = provinces.find(p => p.code === selectedProvince);
    const municipality = province?.municipalities?.find(m => m.code === cityCode);
    if (municipality && province) {
      // Automatically select first barangay if available
      if (municipality.barangays?.length > 0) {
        setSelectedBarangay(municipality.barangays[0]);
      }

      setFormData(prev => ({
        ...prev,
        homeAddress: `${municipality.name}, ${province.name}`
      }));
    }
  };

  const handleBarangayChange = (e) => {
    const barangay = e.target.value;
    setSelectedBarangay(barangay);

    const province = provinces.find(p => p.code === selectedProvince);
    const municipality = province?.municipalities?.find(m => m.code === selectedCity);
    
    if (province && municipality) {
      setFormData(prev => ({
        ...prev,
        homeAddress: `${barangay}, ${municipality.name}, ${province.name}`
      }));
    }
  };

  useEffect(() => {
    const fetchUserRecords = async () => {
      if (!userEmail) return;

      const recordsRef = collection(db, "alumni");
      const q = query(recordsRef, where("email", "==", userEmail));
      const querySnapshot = await getDocs(q);
      const records = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setStudentRecords(records);
    };

    if (activeMenu === 'records') {
      fetchUserRecords();
    }
  }, [activeMenu, userEmail]);

  useEffect(() => {
    auth.onAuthStateChanged(user => {
      if (user) {
        setUserEmail(user.email);
      } else {
        setUserEmail('');
      }
    });
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      const eventsCollection = collection(db, "events");
      const eventSnapshot = await getDocs(eventsCollection);
      const eventList = eventSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEventsList(eventList);
    };

    fetchEvents();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "alumni"));
      const users = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRegisteredUsers(users);
    };

    fetchUsers();
  }, []);

  const handleLogout = () => {  
    if (window.confirm("Are you sure you want to log out?")) {
      auth.signOut()
        .then(() => {
          console.log("Logged out successfully");
          // Clear user session and redirect to login page
          setUserEmail(''); // Clear the user email state
          window.location.href = '/Loginpage'; // Redirect to login page, adjust the path as necessary
        })
        .catch((error) => {
          console.error("Logout failed", error);
        });
    }
  };

  const handleEmailChange = (newEmail) => {
    // Implement email update logic here
    console.log('Email updated to:', newEmail);
    setUserEmail(newEmail);
  };

  const handlePasswordChange = (newPassword) => {
    e.preventDefault();
    // Implement password update logic here
    console.log('Password updated to:', newPassword);
    setUserPassword(''); // Clear the password field after update
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const updateEmail = async () => {
    try {
      // Assume a function updateUserEmail exists to update email
      await updateUserEmail(emailInput);
      setUserEmail(emailInput);
      setFeedbackMessage('Email updated successfully.');
      setFeedbackType('success');
    } catch (error) {
      setFeedbackMessage('Failed to update email.');
      setFeedbackType('error');
    }
  };

  const updatePassword = async () => {
    try {
      // Assume a function updateUserPassword exists to update password
      await updateUserPassword(passwordInput);
      setPasswordInput('');
      setFeedbackMessage('Password updated successfully.');
      setFeedbackType('success');
    } catch (error) {
      setFeedbackMessage('Failed to update password.');
      setFeedbackType('error');
    }
  };

  // Function to re-authenticate user
  const reauthenticate = (currentPassword) => {
    const user = auth.currentUser;
    const cred = EmailAuthProvider.credential(user.email, currentPassword);
    return reauthenticateWithCredential(user, cred);
  };

  const handleProfilePictureUpload = async (file) => {
    if (!file) return;
    const storageRef = ref(storage, `profile-pictures/${auth.currentUser.uid}/${file.name}`);
    try {
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);
      await updateProfile(auth.currentUser, { photoURL });
      showToast('Profile picture updated successfully.');
    } catch (error) {
      showToast('Failed to update profile picture.');
    }
  };

  // Update the photo preview section in the form
  const PhotoPreviewSection = () => (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-32 h-32 relative">
        {photoPreview ? (
          <div className="w-full h-full rounded-full overflow-hidden">
            <img
              src={photoPreview}
              alt="Profile preview"
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-full rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <FiUser className="w-12 h-12 text-gray-400" />
          </div>
        )}
      </div>
      <div>
        <label className="block text-sm text-center font-medium text-gray-700 dark:text-gray-300 mb-2">
          Upload Photo
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
      </div>
    </div>
  );

  // Update the ethnicity select field and add the custom input
  const EthnicitySection = () => (
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Ethnicity</label>
      <select
        name="ethnicity"
        required
        value={formData.ethnicity}
        onChange={handleChange}
        className="block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
      >
        <option value="">Select Ethnicity</option>
        <option value="Aeta">Aeta</option>
        <option value="Agta">Agta</option>
        <option value="Agta-Agay">Agta-Agay</option>
        <option value="Agutaynen">Agutaynen</option>
        <option value="Alangan-Mangyan">Alangan-Mangyan</option>
        <option value="Alta">Alta</option>
        <option value="Applai">Applai</option>
        <option value="Aromanen-Manuvu">Aromanen-Manuvu</option>
        <option value="Ata-Manobo">Ata-Manobo</option>
        <option value="Ati">Ati</option>
        <option value="Ayangan">Ayangan</option>
        <option value="Ayta">Ayta</option>
        <option value="Ayta-Ambala">Ayta-Ambala</option>
        <option value="Ayta-Batak">Ayta-Batak</option>
        <option value="Ayta-Mag-indi">Ayta-Mag-indi</option>
        <option value="Ayta-Magbukun">Ayta-Magbukun</option>
        <option value="Ayta-Sambal">Ayta-Sambal</option>
        <option value="B'laan">B'laan</option>
        <option value="Badjau">Badjau</option>
        <option value="Bagobo">Bagobo</option>
        <option value="Bagobo-Clata">Bagobo-Clata</option>
        <option value="Bagobo-Tagabawa">Bagobo-Tagabawa</option>
        <option value="Balangao">Balangao</option>
        <option value="Banwaon">Banwaon</option>
        <option value="Batak">Batak</option>
        <option value="Bicolano">Bicolano</option>
        <option value="Bontoc">Bontoc</option>
        <option value="Buhid">Buhid</option>
        <option value="Bukidnon">Bukidnon</option>
        <option value="Cebuano">Cebuano</option>
        <option value="Cuyunon">Cuyunon</option>
        <option value="Dumagat">Dumagat</option>
        <option value="Dumagat-Remontado">Dumagat-Remontado</option>
        <option value="Gaddang">Gaddang</option>
        <option value="Hilagaynon(Ilonggo)">Hiligaynon (Ilonggo)</option>
        <option value="Ibaloi">Ibaloi</option>
        <option value="Ibanag">Ibanag</option>
        <option value="Ifugao">Ifugao</option>
        <option value="Ilocano">Ilocano</option>
        <option value="Iranun">Iranun</option>
        <option value="Isneg">Isneg</option>
        <option value="Itneg">Itneg (Tingguian)</option>
        <option value="Ivatan">Ivatan</option>
        <option value="Kalagan">Kalagan</option>
        <option value="Kalanguya">Kalanguya</option>
        <option value="Kalinga">Kalinga</option>
        <option value="Kankanaey">Kankanaey</option>
        <option value="Kapampangan">Kapampangan</option>
        <option value="Maguindanaon">Maguindanaon</option>
        <option value="Mangyan">Mangyan</option>
        <option value="Manobo">Manobo</option>
        <option value="Maranao">Maranao</option>
        <option value="Pangasinense">Pangasinense</option>
        <option value="Sama-Bajau">Sama-Bajau</option>
        <option value="Subanen">Subanen</option>
        <option value="T'boli">T'boli</option>
        <option value="Tagakaolo">Tagakaolo</option>
        <option value="Tagalog">Tagalog</option>
        <option value="Tagbanwa">Tagbanwa</option>
        <option value="Tausug">Tausug</option>
        <option value="Teduray">Teduray</option>
        <option value="Tuwali">Tuwali</option>
        <option value="Waray">Waray</option>
        <option value="Yakan">Yakan</option>                                  
      </select>
    </div>
  );

  // Update the Alumni Dropdown to include a new submenu for Records
  const AlumniDropdown = () => (
    <div className="relative">
      <button 
        onClick={toggleAlumniDropdown}
        className="w-full flex items-center p-3 text-white rounded-lg hover:bg-blue-400"
      >
        <FiUserCheck className="w-5 h-5" />
        {!isCollapsed && (
          <>
            <span className="ml-3">Alumni</span>
            <FiChevronDown className={`w-4 h-4 ml-auto transition-transform ${alumniDropdownOpen ? 'rotate-180' : ''}`} />
          </>
        )}
      </button>
      
      {/* Alumni Dropdown Menu */}
      {alumniDropdownOpen && !isCollapsed && (
        <div className="pl-11 mt-2 space-y-2">
          <button 
            onClick={() => handleMenuClick('records')}
            className={`flex items-center p-2 text-white rounded-lg w-full ${
              activeMenu === 'records' ? 'bg-blue-500' : 'hover:bg-blue-400'
            }`}
          >
            <FiFolder className="w-5 h-5 mr-3" />
            Records
          </button>
          <button 
            onClick={() => handleMenuClick('membershipCard')}
            className={`flex items-center p-2 text-white rounded-lg w-full ${
              activeMenu === 'membershipCard' ? 'bg-blue-500' : 'hover:bg-blue-400'
            }`}
          >
            <FiCreditCard className="w-5 h-5 mr-3" />
            Membership Card
          </button>
        </div>
      )}
    </div>
  );

  // Graduating Class Dropdown
  const GraduatingClassDropdown = () => (
    <div className="relative">
      <button 
        onClick={toggleGraduatingDropdown}
        className="w-full flex items-center p-3 text-white rounded-lg hover:bg-blue-400"
      >
        <FiUsers className="w-5 h-5" />
        {!isCollapsed && (
          <>
            <span className="ml-3">Graduating Class</span>
            <FiChevronDown className={`w-4 h-4 ml-auto transition-transform ${
              graduatingDropdownOpen ? 'rotate-180' : ''
            }`} />
          </>
        )}
      </button>
      
      {graduatingDropdownOpen && !isCollapsed && (
        <div className="pl-11 mt-2 space-y-2">
          <button 
            onClick={() => handleMenuClick('listOfRegistered')}
            className={`flex items-center p-2 text-white rounded-lg w-full ${
              activeMenu === 'listOfRegistered' ? 'bg-blue-500' : 'hover:bg-blue-400'
            }`}
          >
            <FiUserPlus className="w-5 h-5 mr-3" />
            List of Registered
          </button>
          <button 
            onClick={() => handleMenuClick('listOfGraduates')}
            className={`flex items-center p-2 text-white rounded-lg w-full ${
              activeMenu === 'listOfGraduates' ? 'bg-blue-500' : 'hover:bg-blue-400'
            }`}
          >
            <FiUser className="w-5 h-5 mr-3" />
            List of Graduates
          </button>
        </div>
      )}
    </div>
  );

  // Function to handle updates to email and password
  const handleUpdate = async () => {
    try {
      // Re-authenticate the user with the current password before updating
      await reauthenticate(currentPassword);
      // Update email if it has changed
      if (emailInput !== userEmail) {
        await updateEmail(auth.currentUser, emailInput);
        setUserEmail(emailInput); // Update the state to reflect the new email
      }
      // Update password if it has been entered
      if (passwordInput) {
        await updatePassword(auth.currentUser, passwordInput);
        setPasswordInput(''); // Clear the password input after update
      }
      showToast('Update successful.');
      setEditMode(false); // Exit edit mode after successful update
    } catch (error) {
      showToast('Failed to update account settings.');
      console.error('Update error:', error);
    }
  };

  // Settings form section
  const SettingsForm = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Settings</h2>
      <div className="space-y-4">
        {!editMode ? (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Email</label>
              <div className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-gray-100">
                {userEmail}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <div className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-gray-100">
                {userPassword || '•'.repeat(10)}  {/* Show password if available */}
              </div>
            </div>
            {/* Edit Button */}
            {/* <button onClick={() => setEditMode(true)} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Edit
            </button> */}
            {/* Dark Mode Toggle Button */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700">Dark Mode</label>
              <button 
                onClick={toggleDarkMode} 
                className="mt-1 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded"
              >
                {darkMode ? 'Disable' : 'Enable'}
              </button>
            </div>
          </>
        ) : (
          <>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                placeholder="Update email"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Current Password</label>
              <input
                type="text"  // Changed from password to text to show the password
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                placeholder="Enter current password"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <input
                type="text"  // Changed from password to text to show the password
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                placeholder="New password (optional)"
              />
            </div>
            <button onClick={handleUpdate} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              Update
            </button>
            <button onClick={() => setEditMode(false)} className="mt-2 ml-2 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600">
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );

  // Simple Toast Component (if not using a UI library)
  const Toast = ({ message, open, handleClose }) => (
    open ? (
      <div style={{
        position: 'fixed', bottom: '20px', right: '20px', backgroundColor: 'black',
        color: 'white', padding: '16px', borderRadius: '8px'
      }}>
        {message}
        <button onClick={handleClose} style={{ marginLeft: '24px', color: 'white', background: 'none', border: 'none' }}>Close</button>
      </div>
    ) : null
  );

  // Filter users based on search term
  const filteredUsers = registeredUsers.filter(user =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to handle selecting a user to view details or closing the details view
  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  // Function to clear the selected user and return to the list
  const clearSelectedUser = () => {
    setSelectedUser(null);
  };

  // Render the user details with a close icon
  const renderUserDetails = () => (
    selectedUser && (
      <div className="relative bg-white p-4 rounded shadow">
        <h1 className="text-2xl">{selectedUser.firstName} {selectedUser.middleName} {selectedUser.lastName}</h1>
        <p><strong>Email:</strong> {selectedUser.email}</p>
        <p><strong>Gender:</strong> {selectedUser.gender}</p>
        <p><strong>Date of Birth:</strong> {selectedUser.birthday}</p>
        <p><strong>Age:</strong> {selectedUser.age}</p>
        <p><strong>Home Address:</strong> {selectedUser.streetAddress} {selectedUser.homeAddress}</p>
        <p><strong>Contact Number:</strong> {selectedUser.contactNumber}</p>
        <p><strong>Ethnicity:</strong> {selectedUser.ethnicity}</p>
        <p><strong>Course:</strong> {selectedUser.course}</p>
        <p><strong>Major:</strong> {selectedUser.major}</p>
        <p><strong>Thesis Title:</strong> {selectedUser.thesisTitle}</p>
        <p><strong>Adviser:</strong> {selectedUser.adviser}</p>
        <p><strong>Date of Graduation:</strong> {selectedUser.graduationYear}</p>

        <div>
        <br></br>
                      <p>Contact Person</p>

                      
                      <p><strong>Father's Name:</strong> {selectedUser.fathersName}</p>
                      <p><strong>Mother.s Name:</strong> {selectedUser.mothersName}</p>
                      <p><strong>Contact Number:</strong> {selectedUser.personcontactNumber}</p>

                    </div>
        {/* Add more fields as necessary */}
        
        
        <button onClick={clearSelectedUser} className="absolute top-0 right-0 p-2">
          <FiX className="w-6 h-6 text-gray-600 hover:text-gray-800" />
        </button>
      </div>
    )
  );

  // Render the list of registered or details of a selected user
  const renderUserList = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400 w-5 h-5" />
        </div>
        <input
          type="text"
          placeholder="Search by name, course, or email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="
            w-full p-2 pl-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        {searchTerm && (
          <button 
            onClick={() => setSearchTerm('')}
            className="
              absolute 
              inset-y-0 
              right-0 
              pr-3 
              flex 
              items-center 
              text-gray-400 
              hover:text-gray-600 
              dark:hover:text-gray-300
            "
          >
            <FiX className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Filtering and Count */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-gray-600 dark:text-gray-300">
          Total Registered Users : {filteredUsers.length}
        </div>
        
        
      </div>

      {/* User List */}
      <div className="space-y-2">
        {filteredUsers.map(user => (
          <div 
            key={user.id} 
            onClick={() => handleSelectUser(user)} 
            className="
              cursor-pointer 
              p-3 
              hover:bg-blue-100 
              dark:hover:bg-gray-700 
              rounded-lg 
              transition-colors 
              flex 
              items-center 
              justify-between
            "
          >
            <div>
              <p className="font-semibold text-gray-800 dark:text-white">
                {user.firstName} {user.lastName}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {user.course} | {user.email}
              </p>
            </div>
            <FiChevronRight className="text-gray-400 dark:text-gray-500" />
          </div>
        ))}
      </div>

      {/* No Results State */}
      {filteredUsers.length === 0 && (
        <div className="text-center py-6 text-gray-500 dark:text-gray-400">
          <FiSearch className="mx-auto w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
          <p>No users found matching your search</p>
        </div>
      )}
    </div>
  );

  // ID Card Component
  const IDCard = ({ user }) => {
    const downloadPDF = () => {
      const card = document.getElementById(`id-card-${user.id}`);
      html2canvas(card, { scale: 3 }).then((canvas) => {  // Increase scale for better resolution
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF({
          orientation: 'landscape',
          unit: 'mm',
          format: [85.6, 54]  // Set the format to match CR80 size
        });
        pdf.addImage(imgData, 'PNG', 0, 0, 85.6, 54);  // Adjust image to fit the card size
        pdf.save(`${user.firstName}-${user.lastName}-ID_Card.pdf`);
      });
    };

    return (
      <div className="p-4 border rounded shadow-sm bg-white">
        <h3 className="text-lg font-bold">{user.firstName} {user.lastName}</h3>
        <p>Email: {user.email}</p>
        <p>Course: {user.course}</p>
        <p>Graduation Year: {user.graduationYear}</p>
        {/* Add more fields as necessary */}
        <button onClick={() => downloadPDF()}>Download ID Card</button>
      </div>
    );
  };

  // Function to calculate analytics data
  const calculateAnalytics = () => {
    const totalUsers = registeredUsers.length;
    const instituteCounts = registeredUsers.reduce((acc, user) => {
        const institute = user.institute; // Directly use the institute from user data
        acc[institute] = (acc[institute] || 0) + 1; // Count users per institute
        return acc;
    }, {});

    return { totalUsers, instituteCounts };
  };

  // Add a useEffect to watch for changes in selectedSchoolYear
  useEffect(() => {
    fetchAlumniData(); // Re-fetch alumni data when the school year changes
  }, [selectedSchoolYear]);

  // Update the fetchAlumniData function to consider the selected school year
  const fetchAlumniData = async () => {
    try {
        const alumniCollection = collection(db, "alumni");
        const querySnapshot = await getDocs(alumniCollection);
        const counts = {
            ICET: 0,
            ITED: 0,
            IGPE: 0,
            IBEG: 0,
            IARS: 0
        };

        querySnapshot.forEach(doc => {
            const data = doc.data();
            const institute = data.institute; // Assuming each document has an 'institute' field
            const graduationYear = data.graduationYear; // Assuming each document has a 'graduationYear' field
            if (counts[institute] !== undefined && graduationYear === selectedSchoolYear) {
                counts[institute]++;
            }
        });

        setAlumniCounts(counts);
    } catch (error) {
        console.error("Error fetching alumni data: ", error);
    }
  };

  // Update the pie chart data based on the alumni counts
  const getPieChartData = () => {
    return {
        ICET: alumniCounts.ICET,
        ITED: alumniCounts.ITED,
        IGPE: alumniCounts.IGPE,
        IBEG: alumniCounts.IBEG,
        IARS: alumniCounts.IARS
    };
  };

  // Update the AnalyticsDisplay component to use the new data
  const AnalyticsDisplay = ({ onPieClick }) => {
    const pieData = getPieChartData();

    const data = {
        labels: Object.keys(pieData),
        datasets: [
            {
                label: 'Total Alumni',
                data: Object.values(pieData),
                backgroundColor: [
                    'rgba(251, 138, 8, 0.97)', 
                    'rgba(20, 8, 251, 0.94)',
                    'rgba(153, 153, 153, 0.96)',
                    'rgba(254, 36, 72, 0.8)',
                    'rgba(10, 255, 22, 0.91)'
                ],
                borderColor: [
                    'rgb(255, 255, 255)',
                ],
                borderWidth: 1  
            }
        ]
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'top',
                align: 'end', // Align legend to the end (right)
            },
            tooltip: {
                mode: 'index',
                intersect: false,
                callbacks: {
                    label: function(tooltipItem) {
                        return `${tooltipItem.label}: ${tooltipItem.raw}`; // Customize tooltip label
                    }
                }
            },
        },
        onHover: (event, chartElement) => {
            if (chartElement.length) {
                // Change cursor to pointer when hovering over a segment
                event.native.target.style.cursor = 'pointer';
            } else {
                event.native.target.style.cursor = 'default';
            }
        },
    };

    return (
        <div className="analytics-display" style={{ width: '100%', height: '300px' }}>
            <Pie ref={chartRef} data={data} options={options} onClick={onPieClick} />
        </div>
    );
  };

  // Add the new function to count users by institute
  const countUsersByInstitute = (users) => {
    const instituteMapping = {
        ICET: ['BSIT', 'BSCS'],
        ITED: ['BSEd', 'BEEd'],
        IGPE: ['BPES'],
        IBEJ: ['BAELS'],
        IARS: ['ABSS']
    };

    const counts = {
        ICET: 0,
        ITED: 0,
        IGPE: 0,
        IBEG: 0,
        IARS: 0
    };

    users.forEach(user => {
        const course = user.course; // Assuming 'course' is a property in user object
        for (const [institute, courses] of Object.entries(instituteMapping)) {
            if (courses.includes(course)) {
                counts[institute]++;
                break; // Stop checking once a match is found
            }
        }
    });

    return counts;
  };

  // Function to handle adding/updating events
  const handleEventSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { name: eventName, dateTime: eventDateTime, description: eventDescription };

    try {
        if (editEventIndex !== null) {
            // Update existing event
            const eventToUpdate = eventsList[editEventIndex];
            const eventRef = doc(db, "events", eventToUpdate.id);
            await updateDoc(eventRef, newEvent);
            const updatedEvents = [...eventsList];
            updatedEvents[editEventIndex] = { ...newEvent, id: eventToUpdate.id };
            setEventsList(updatedEvents);
            setMessage('Event updated successfully!');
        } else {
            // Add new event
            const docRef = await addDoc(collection(db, "events"), newEvent);
            setEventsList([...eventsList, { ...newEvent, id: docRef.id }]);
            setMessage('Event added successfully!');
        }

        // Reset form fields
        setEventName('');
        setEventDateTime('');
        setEventDescription('');
    } catch (error) {
        console.error("Error adding/updating event: ", error);
        setMessage('Error adding/updating event.');
    } finally {
        setShowMessage(true);
    }
  };

  // Function to handle editing an event
  const handleEditEvent = (index) => {
    const eventToEdit = eventsList[index];
    setEventName(eventToEdit.name);
    setEventDateTime(eventToEdit.dateTime);
    setEventDescription(eventToEdit.description);
    setEditEventIndex(index);
  };

  // Function to handle deleting an event
  const handleDeleteEvent = async (index) => {
    const eventToDelete = eventsList[index];

    // Confirmation dialog
    const confirmDelete = window.confirm(`Are you sure you want to delete the event: "${eventToDelete.name}"?`);
    if (!confirmDelete) {
        return; // Exit the function if the user cancels
    }

    const eventRef = doc(db, "events", eventToDelete.id);
    
    try {
        await deleteDoc(eventRef);
        const updatedEvents = eventsList.filter((_, i) => i !== index);
        setEventsList(updatedEvents);
        setMessage('Event deleted successfully!');
    } catch (error) {
        console.error("Error deleting event: ", error);
        setMessage('Error deleting event.');
    } finally {
        setShowMessage(true);
    }
  };

  // Render the events form and list
  const renderEvents = () => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Manage Events</h2>
        <form onSubmit={handleEventSubmit} className="mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                    type="text"
                    placeholder="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    required
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="datetime-local"
                    value={eventDateTime}
                    onChange={(e) => setEventDateTime(e.target.value)}
                    required
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
            <textarea
                placeholder="Description"
                value={eventDescription}
                onChange={(e) => setEventDescription(e.target.value)}
                required
                className="border border-gray-300 p-3 rounded-md w-full mt-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-600 text-white p-3 rounded-md mt-4 hover:bg-blue-700 transition duration-200">
                {editEventIndex !== null ? 'Update Event' : 'Add Event'}
            </button>
            {editEventIndex !== null && (
                <button 
                    type="button" 
                    onClick={() => {
                        setEventName('');
                        setEventDateTime('');
                        setEventDescription('');
                        setEditEventIndex(null); // Clear the edit index
                    }} 
                    className="bg-gray-400 text-white p-3 rounded-md mt-4 ml-2 hover:bg-gray-500 transition duration-200"
                >
                    Cancel
                </button>
            )}
        </form>
        <ul className="space-y-4">
            {eventsList.map((event, index) => (
                <li key={index} className="border-b border-gray-200 pb-4">
                    <div className="p-4 border rounded shadow-sm bg-white">
                        <h3 className="font-bold text-lg text-gray-800">{event.name}</h3>
                        <p className="text-gray-600">{new Date(event.dateTime).toLocaleString()}</p>
                        <p className="text-gray-700">{event.description}</p>
                        <div className="mt-2">
                            <button onClick={() => handleEditEvent(index)} className="text-blue-500 hover:underline mr-4">Edit</button>
                            <button onClick={() => handleDeleteEvent(index)} className="text-red-500 hover:underline">Delete</button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    </div>
  );

  // Render different content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-blue-500 p-4 rounded-lg shadow-lg flex items-center">
              <FiUserCheck className="w-12 h-12 text-white mr-4" />
              <div>
                <h3 className="text-lg font-bold text-white">Alumni</h3>
                <p className="text-2xl text-white">{graduates.length}</p>
              </div>
            </div>
            <div className="bg-green-500 p-4 rounded-lg shadow-lg flex items-center">
              <FiCalendar className="w-12 h-12 text-white mr-4" />
              <div>
                <h3 className="text-lg font-bold text-white">Total Events</h3>
                <p className="text-2xl text-white">{eventsList.length}</p>
              </div>
            </div>
            <div className="bg-yellow-500 p-4 rounded-lg shadow-lg flex items-center">
              <FiUsers className="w-12 h-12 text-white mr-4" />
              <div>
                <h3 className="text-lg font-bold text-white">Registered Users</h3>
                <p className="text-2xl text-white">{registeredUsers.length}</p>
              </div>
            </div>
            {showRecentUsersModal && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold">Recent Registered Users</h2>
                    <button 
                      onClick={() => setShowRecentUsersModal(false)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <FiX className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-3">
                    {registeredUsers
                      .sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt))
                      .slice(0, 10)
                      .map(user => (
                        <div 
                          key={user.id} 
                          className="flex items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg"
                        >
                          <div className="mr-4">
                            <FiUser className="w-8 h-8 text-blue-500" />
                          </div>
                          <div>
                            <p className="font-semibold">
                              {user.firstName} {user.lastName}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {user.course} | {user.institute}
                            </p>
                          </div>
                          <div className="ml-auto text-sm text-gray-500 dark:text-gray-400">
                            {/* Format the registration date */}
                            {new Date(user.registeredAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            )}
            <AnalyticsDisplay onPieClick={handlePieClick} />

            {/* New Container for School Year Selection */}
            <div className="col-span-2 md:col-span-2 lg:col-span-2 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold mb-2">Select School Year</h2>
                <select 
                    className="border border-gray-300 rounded-md p-2 mb-4 w-full"
                    value={selectedSchoolYear}
                    onChange={(e) => setSelectedSchoolYear(e.target.value)}
                >
                    <option value="2020-2021">2020-2021</option>
                    <option value="2021-2022">2021-2022</option>
                    <option value="2022-2023">2022-2023</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                </select>

                {/* Display all institutes and their courses */}
                {Object.keys(coursesData).map((institute) => (
                    <div key={institute} className="mb-4">
                        <h3 className="text-lg font-semibold mb-2">{institute}</h3>
                        <div className="space-y-2">
                            {Array.isArray(coursesData[institute]) && coursesData[institute].map((course, index) => (
                                <div key={index} className="p-2 border border-gray-300 rounded-md">
                                    <p>{course}</p>
                                </div>
                            ))}
                            {/* Optional: Display a message if no courses are available */}
                            {(!coursesData[institute] || coursesData[institute].length === 0) && (
                                <p className="text-gray-500">No courses available for this institute.</p>
                            )}
                        </div>
                    </div>
                ))}
            </div>
          </div>
        );

      case 'listOfRegistered':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm ">
            {selectedUser ? renderUserDetails() : renderUserList()}
          </div>
        );

      case 'membershipCard':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {registeredUsers.map(user => (
                <IDCard key={user.id} user={user} />
              ))}
            </div>
          </div>
        );

      case 'records':
        return renderRecords();

      case 'events':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            {renderEvents()}
          </div>
        );

      case 'settings':
        return <SettingsForm />;

      case 'listOfGraduates':
        return renderGraduatesList();

      default:
        return null;
    }
  };

  const showToast = (message) => {
    setToast({ open: true, message });
    setTimeout(() => setToast({ open: false, message: '' }), 3000);
  };

  const handleEmailUpdate = async () => {
    try {
      await reauthenticate(passwordInput); // Ensure the user is re-authenticated
      await updateEmail(auth.currentUser, emailInput);
      showToast('Email updated successfully.');
    } catch (error) {
      showToast('Failed to update email.');
    }
  };

  const handlePasswordUpdate = async () => {
    try {
      await reauthenticate(passwordInput); // Re-authenticate with the current password
      await updatePassword(auth.currentUser, newPassword);
      showToast('Password updated successfully.');
    } catch (error) {
      showToast('Failed to update password.');
    }
  };

  // Apply dark mode class dynamically
  const themeClass = darkMode ? 'dark' : '';

  const handlePieClick = async (activePoints) => {
    if (activePoints.length) {
        const index = activePoints[0].index; // Get the index of the clicked segment
        const institute = Object.keys(alumniCounts)[index]; // Get the institute name
        setSelectedInstitute(institute);
        
        // Fetch course data for the selected institute
        const courseData = await fetchCourseData(institute);
        setCourseData(courseData); // Set the course data for the modal
        setIsModalOpen(true); // Open the modal
    }
  };

  const CourseModal = ({ isOpen, onClose, institute }) => {
    const instituteCourses = {
        ICET: ['BSIT', 'BSCS', 'DIT'],
        ITED: ['BSEd', 'BEEd'],
        IGPE: ['BPES'],
        IBEJ: ['BAELS'],
        IARS: ['ABSS']
    };

    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg">
                    <h2 className="text-xl font-bold">{institute} Courses</h2>
                    <ul>
                        {instituteCourses[institute]?.map(course => (
                            <li key={course}>{course}</li>
                        ))}
                    </ul>
                    <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Close
                    </button>
                </div>
            </div>
        )
    );
  };

  // Add this function to handle message visibility
  useEffect(() => {
    if (showMessage) {
        const timer = setTimeout(() => {
            setShowMessage(false);
            setMessage('');
        }, 3000); // Message will disappear after 3 seconds
        return () => clearTimeout(timer);
    }
  }, [showMessage]);

  // Render the message box conditionally
  const MessageBox = () => (
    showMessage && (
        <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded shadow-lg">
            {message}
        </div>
    )
  );

  // Fetch courses from Firestore
  const fetchCourses = async () => {
    try {
        const coursesCollection = collection(db, "courses");
        const querySnapshot = await getDocs(coursesCollection);
        const courses = {};
        
        querySnapshot.forEach(doc => {
            const data = doc.data();
            courses[data.institute] = data.courses; // Assuming each document has 'institute' and 'courses' fields
        });

        setCoursesData(courses);
    } catch (error) {
        console.error("Error fetching courses: ", error);
    }
  };

  // Call fetchCourses when the component mounts
  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourseData = async (institute) => {
    const courseCounts = {
        BSIT: 0,
        BSECE: 0,
        // Add other courses as needed
    };

    const alumniCollection = collection(db, "alumni");
    const querySnapshot = await getDocs(alumniCollection);
    querySnapshot.forEach(doc => {
        const data = doc.data();
        if (data.institute === institute) {
            const course = data.course; // Assuming each document has a 'course' field
            if (courseCounts[course] !== undefined) {
                courseCounts[course]++;
            }
        }
    });

    return Object.entries(courseCounts).map(([name, graduates]) => ({ name, graduates }));
  };

  const CourseBreakdownModal = ({ isOpen, onClose, courseData }) => {
    return (
        isOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded shadow-lg">
                    <h2 className="text-xl font-bold">{selectedInstitute} Course Breakdown</h2>
                    <ul>
                        {courseData.map(course => (
                            <li key={course.name} className="flex justify-between">
                                <span>{course.name}</span>
                                <span>{course.graduates} graduates</span>
                            </li>
                        ))}
                    </ul>
                    <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
                        Close
                    </button>
                </div>
            </div>
        )
    );
  };

  const handleGraduatingClassChange = (value) => {
    if (value === "listOfGraduates") {
        setActiveMenu('listOfGraduates'); // Navigate to the list of graduating students
    } else {
        setSelectedSchoolYear(value); // Handle other selections
    }
  };

  // Function to handle adding a graduate
  const handleAddGraduate = async () => {
    if (selectedUserForGraduation && graduationYear) {
        // Create the graduate data object
        const graduateData = {
            firstName: selectedUserForGraduation.firstName,
            middleName: selectedUserForGraduation.middleName,
            lastName: selectedUserForGraduation.lastName,
            course: selectedUserForGraduation.course,
            major: selectedUserForGraduation.major,
            graduationYear: graduationYear,
            institute: selectedUserForGraduation.institute,
            studentNo: selectedUserForGraduation.studentNo,
            gender: selectedUserForGraduation.gender,
        };

        try {
            // Add the graduate data to the 'graduates' collection
            const docRef = await addDoc(collection(db, 'graduates'), graduateData);

            // Update local state with the new graduate
            setGraduates(prev => [...prev, { id: docRef.id, ...graduateData }]);

            // Reset selection and graduation year
            setSelectedUserForGraduation(null);
            setGraduationYear('2024-2025'); // Updated to latest school year
            showToast('Graduate added successfully.');
        } catch (error) {
            console.error('Error adding graduate:', error);
            showToast('Failed to add graduate.');
        }
    } else {
        showToast('Please select a user and a graduation year.');
    }
  };

  // Add this function to handle graduate removal
  const handleRemoveGraduate = async (graduateId) => {
    // Show confirmation dialog
    const confirmDelete = window.confirm('Are you sure you want to remove this graduate?');
    
    if (confirmDelete) {
      try {
        // Remove from Firestore
        await deleteDoc(doc(db, 'graduates', graduateId));
        
        // Update local state
        setGraduates(prev => prev.filter(graduate => graduate.id !== graduateId));
        
        // Show success toast
        showToast('Graduate removed successfully.');
      } catch (error) {
        console.error('Error removing graduate:', error);
        showToast('Failed to remove graduate.');
      }
    }
  };

  // Render the List of Graduates
  const renderGraduatesList = () => {
    // Filter graduates based on the selected graduation year
    const filteredGraduates = graduationYear 
      ? graduates.filter(graduate => graduate.graduationYear === graduationYear)
      : graduates;

    // Function to handle graduate row click
    const handleGraduateClick = (graduate) => {
      setSelectedGraduateDetails(graduate);
    };

    // Function to close the graduate details modal
    const closeGraduateDetailsModal = () => {
      setSelectedGraduateDetails(null);
    };

    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm relative">
        <div className="flex justify-between items-center mb-4">
          <select 
            value={graduationYear} 
            onChange={(e) => setGraduationYear(e.target.value)} 
            className="border border-gray-300 rounded-md p-2"
          >
            <option value="">All Graduation Years</option>
            <option value="2020-2021">2020-2021</option>
            <option value="2021-2022">2021-2022</option>
            <option value="2022-2023">2022-2023</option>
            <option value="2023-2024">2023-2024</option>
            <option value="2024-2025">2024-2025</option>
          </select>

          {/* Optional: Add a count of filtered graduates */}
          <div className="text-gray-600">
            Total Graduates: {filteredGraduates.length}
          </div>
        </div>

        {/* Add headers for the new fields */}
        <div className="font-bold grid grid-cols-6 mb-2 px-2">
          <div className="col-span-2">Name</div>
          <div className="col-span-2">Course</div>
          <div>Institute</div>
          <div className="text-center">Actions</div>
        </div>

        {filteredGraduates.length > 0 ? (
          <ul>
            {filteredGraduates.map((graduate, index) => (
              <li 
                key={graduate.id} 
                className="mb-1 grid grid-cols-6 items-center px-2 py-1 hover:bg-blue-100 transition-colors cursor-pointer"
                onClick={() => handleGraduateClick(graduate)}
              >
                <div className="col-span-2">
                  {graduate.firstName} {graduate.middleName} {graduate.lastName} 
                </div>
                <div className="col-span-2">{graduate.course}</div>
                <div>{graduate.institute}</div>
                <div className="flex justify-center">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent row click when clicking delete
                      handleRemoveGraduate(graduate.id);
                    }}
                    className="text-red-500 hover:text-red-700 transition p-1 rounded-full hover:bg-red-100"
                    title="Remove Graduate"
                  >
                    <FiTrash2 className="w-5 h-5" />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500 py-4">
            No graduates found for the selected year.
          </div>
        )}

        {/* Graduate Details Modal */}
        {selectedGraduateDetails && (
          <div className="fixed inset-0 flex items-center justify-center z-50 ">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full relative border-1 border-black">
              <button 
                onClick={closeGraduateDetailsModal}
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
              >
                <FiX className="w-6 h-6" />
              </button>
              
              <h2 className="text-2xl font-bold mb-4 text-center">
                Graduate Details
              </h2>
              
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Student ID</label>
                    <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 p-2">
                      {selectedGraduateDetails.studentNo}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 p-2">
                      {selectedGraduateDetails.gender}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 p-2">
                      {selectedGraduateDetails.firstName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                    <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 p-2">
                      {selectedGraduateDetails.middleName}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Last Name</label>
                    <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 p-2">
                      {selectedGraduateDetails.lastName}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                    <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 p-2">
                      {selectedGraduateDetails.graduationYear}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Course</label>
                    <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 p-2">
                      {selectedGraduateDetails.course}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Major</label>
                    <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 p-2">
                      {selectedGraduateDetails.major}
                    </p>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700">Institute</label>
                  <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 p-2">
                    {selectedGraduateDetails.institute}
                  </p>
                </div>
                
                {/* Additional Details */}
                
              </div>
            </div>
          </div>
        )}

        {/* Existing Add Graduate Button and Dropdown */}
        <div className="flex justify-center mt-4">
          <button 
            onClick={() => {
              setShowUserDropdown(!showUserDropdown);
              setSelectedUserForGraduation(null);
            }} 
            className="flex items-center bg-blue-500 text-white p-2 rounded-md"
          >
            <FiPlus className="mr-2" />
            Add Graduate
          </button>
        </div>

        {/* Existing Dropdown and Confirmation Modal */}
        {showUserDropdown && (
          <div className="absolute bg-white border border-gray-300 rounded-md shadow-lg z-10 w-full left-0 mt-2">
            {registeredUsers.map(user => (
              <div 
                key={user.id} 
                onClick={() => {
                  // Select the user and prepare for confirmation
                  setSelectedUserForGraduation(user);
                  setShowUserDropdown(false);
                  setShowConfirmModal(true);
                }} 
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {user.firstName} {user.middleName} {user.lastName} - {user.course} ({user.major})
              </div>
            ))}
          </div>
        )}

        {/* Confirmation Modal */}
        {showConfirmModal && selectedUserForGraduation && (
          <GraduateConfirmModal 
            graduate={selectedUserForGraduation}
            graduationYear={graduationYear}
            onConfirm={() => {
              // Call the add graduate function
              handleAddGraduate();
              // Close the modal
              setShowConfirmModal(false);
            }}
            onCancel={() => {
              // Reset selection and close modal
              setSelectedUserForGraduation(null);
              setShowConfirmModal(false);
            }}
          />
        )}
      </div>
    );
  };

  // Fetch graduates from Firestore when the component mounts
  useEffect(() => {
    const fetchGraduates = async () => {
        const graduatesCollection = collection(db, 'graduates');
        const querySnapshot = await getDocs(graduatesCollection);
        const graduatesList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setGraduates(graduatesList);
    };

    fetchGraduates();
  }, []);

  // Add this modal component within the component
  const GraduateConfirmModal = ({ graduate, graduationYear, onConfirm, onCancel }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full border-1 border-black">
            <h2 className="text-2xl font-bold mb-4 text-center">Confirmation Graduate Details</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
              <div>
                  <label className="block text-sm font-medium text-gray-700">Student ID</label>
                  <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-200 p-2">{graduate.studentNo}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">First Name</label>
                  <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-200 p-2">{graduate.firstName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Middle Name</label>
                  <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-200 p-2">{graduate.middleName || 'N/A'}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Last Name</label>
                  <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-200 p-2">{graduate.lastName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Gender</label>
                  <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-200 p-2">{graduate.gender}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Course</label>
                  <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-200 p-2">{graduate.course}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Major</label>
                  <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-200 p-2">{graduate.major}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Graduation Year</label>
                  <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-200 p-2">{graduationYear}</p>
                </div>

              </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Institute</label>
                <p className="mt-1 block w-full rounded-md border-gray-300 bg-gray-200 p-2">{graduate.institute}</p>
              </div>
            
            
            <div className="mt-6 flex justify-between space-x-4">
              <button 
                onClick={onCancel} 
                className="flex-1 bg-gray-300 text-gray-800 py-2 rounded-md hover:bg-gray-400 transition"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirm} 
                className="flex-1 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
    );
  };

  const renderRecords = () => {
    // Define columns for the table
    const columns = [
      { header: 'Student ID', key: 'studentNo' },
      { header: 'Name', key: 'fullName' },
      { header: 'Course', key: 'course' },
      { header: 'Gender', key: 'gender' },
      { header: 'Institute', key: 'institute' },
      { header: 'Email', key: 'email' },
      { header: 'Contact Number', key: 'contactNumber' }
    ];

    // Prepare data with full name and filter by school year and search term
    const tableData = registeredUsers
      .filter(user => 
        (selectedRecordsYear === 'All Years' || user.graduationYear === selectedRecordsYear) &&
        (searchTerm === '' || 
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .map(user => ({
        ...user,
        fullName: `${user.firstName} ${user.middleName || ''} ${user.lastName}`,
      }));

    return (
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center mb-4">
          
          <div className="flex items-center space-x-4">
            {/* School Year Dropdown */}
            <select
              value={selectedRecordsYear}
              onChange={(e) => setSelectedRecordsYear(e.target.value)}
              className="mr-4 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All Years">All Years</option>
              <option value="2020-2021">2020-2021</option>
              <option value="2021-2022">2021-2022</option>
              <option value="2022-2023">2022-2023</option>
              <option value="2023-2024">2023-2024</option>
              <option value="2024-2025">2024-2025</option>
            </select>

            {/* Search Input */}
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 pl-8 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
              />
              <FiSearch className="absolute left-2 top-3 text-gray-400" />
              {searchTerm && (
                <button 
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2 top-3 text-gray-400 hover:text-gray-600"
                >
                  <FiX />
                </button>
              )}
            </div>

            {/* Export Buttons */}
            <button 
              onClick={handleExportToCSV}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 flex items-center mr-2"
            >
              <FiDownload className="mr-2" /> CSV
            </button>
            <button 
              onClick={handleExportToPDF}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 flex items-center"
            >
              <FiPrinter className="mr-2" /> PDF
            </button>
          </div>
        </div>

        {/* Table Container with Scrolling */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            {/* Table Header */}
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
                {columns.map((column) => (
                  <th 
                    key={column.key} 
                    className="p-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider border-b"
                  >
                    {column.header}
                  </th>
                ))}
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {tableData.map((user) => (
                <tr 
                  key={user.id} 
                  className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  <td className="p-3 border-b">{user.studentNo}</td>
                  <td className="p-3 border-b">{user.fullName}</td>
                  <td className="p-3 border-b">{user.course}</td>
                  <td className="p-3 border-b">{user.gender}</td>
                  <td className="p-3 border-b">{user.institute}</td>
                  <td className="p-3 border-b">{user.email}</td>
                  <td className="p-3 border-b">{user.contactNumber}</td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* No Results State */}
          {tableData.length === 0 && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              <FiSearch className="mx-auto w-12 h-12 mb-4 text-gray-300 dark:text-gray-600" />
              <p>No users found matching your search or selected year</p>
            </div>
          )}
        </div>

        {/* Pagination and Total Users */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">
            Total Users: {tableData.length}
          </span>
          <div className="flex space-x-2">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Previous
            </button>
            <button 
              disabled={currentPage * usersPerPage >= tableData.length}
              onClick={() => setCurrentPage(currentPage + 1)}
              className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    );
  };

  // Helper functions
  const handleViewUserDetails = (user) => {
    setSelectedUser(user);
  };

  const handleEditUser = (user) => {
    // Implement edit user logic
    setFormData(user);
    setEditMode(true);
  };

  const handleDeleteUser = async (userId) => {
    try {
      // Implement delete user logic
      await deleteDoc(doc(db, 'users', userId));
      setRegisteredUsers(registeredUsers.filter(user => user.id !== userId));
      setToast({ open: true, message: 'User deleted successfully' });
    } catch (error) {
      setToast({ open: true, message: 'Error deleting user' });
    }
  };

  const handleExportToCSV = () => {
    const headers = [
      'Student ID', 'First Name', 'Middle Name', 'Last Name', 'Gender', 
      'Course', 'Institute', 'Email', 'Contact Number'
    ];

    const csvData = registeredUsers.map(user => [
      user.studentNo,
      user.firstName,
      user.middleName || '',
      user.lastName,
      user.gender,
      user.course,
      user.institute,
      user.email,
      user.contactNumber
    ]);

    let csv = headers.join(',') + '\n';
    csvData.forEach(row => {
      csv += row.join(',') + '\n';
    });

    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'registered_users.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleExportToPDF = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF('landscape');
    
    // Add title
    doc.setFontSize(18);
    doc.text('Registered Alumni Report', 14, 22);
    
    // Add current date and batch
    doc.setFontSize(10);
    doc.text(`Generated on: ${new Date().toLocaleDateString()}`, 14, 30);
    doc.text(`Batch: ${selectedRecordsYear}`, 14, 38);

    // Prepare data for PDF
    const tableData = registeredUsers
      .filter(user => 
        (selectedRecordsYear === 'All Years' || user.graduationYear === selectedRecordsYear) &&
        (searchTerm === '' || 
          user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
        )
      )
      .map(user => [
        user.studentNo,
        `${user.firstName} ${user.middleName || ''} ${user.lastName}`,
        user.gender,
        user.course,
        user.major,
        user.institute,
        user.email,
        user.contactNumber,
        user.graduationYear // Add batch/graduation year
      ]);

    // Create table using autoTable method
    autoTable(doc, {
      startY: 50, // Adjusted to make room for additional text
      head: [
        ['Student ID', 'Name', 'Gender', 'Course', 'Major', 'Institute',  'Email', 'Contact Number', 'Batch']
      ],
      body: tableData,
      theme: 'striped',
      styles: {
        fontSize: 8,
        cellPadding: 3
      },
      headStyles: {
        fillColor: [33, 150, 243], // Blue color for header
        textColor: 255 // White text
      }
    });

    // Save the PDF
    doc.save(`alumni_records_report_${selectedRecordsYear}.pdf`);
  };

  return (
    <div className={`min-h-screen bg-gray-50 dark:bg-gray-900 ${themeClass}`}>
      {/* Sidebar */}
      <aside className={`fixed top-0 left-0 z-40 h-screen transition-all duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } bg-blue-700 dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${
        isCollapsed ? 'w-20' : 'w-64'
      } ${themeClass}`}>
        <div className={`flex items-center gap-3 p-3 border-b ${isCollapsed ? 'justify-center' : ''}`}>
          <NextImage
            src="/dssc-alumni-logo.png"
            alt="DSSC Alumni Logo"
            width={40}
            height={40}
            className="rounded-full"
          />
          {!isCollapsed && <h2 className="text-xl font-semibold text-white">DSSC Alumni</h2>}
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden ml-auto">
            <FiMenu className="w-6 h-6 text-white" />
          </button>
        </div>
        <nav className="p-4 space-y-2">
          <button 
            onClick={() => handleMenuClick('dashboard')}
            className={`flex items-center p-3 text-white rounded-lg hover:bg-blue-400 w-full ${
              activeMenu === 'dashboard' ? 'bg-blue-500' : ''
            }`}
          >
            <FiHome className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Dashboard</span>}
            
          </button>
          {/* Graduating Class Dropdown */}
          <GraduatingClassDropdown />

          {/* Alumni Dropdown */}
          <AlumniDropdown />

          <button 
            onClick={() => handleMenuClick('events')}
            className={`flex items-center p-3 text-white rounded-lg hover:bg-blue-400 w-full ${
              activeMenu === 'events' ? 'bg-blue-500' : ''
            }`}
          >
            <FiCalendar className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Events</span>}
          </button>
          
          <button 
            onClick={() => handleMenuClick('settings')}
            className={`flex items-center p-3 text-white rounded-lg hover:bg-blue-400 w-full ${
              activeMenu === 'settings' ? 'bg-blue-500' : ''
            }`}
          >
            <FiSettings className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Settings</span>}
          </button>
          {/* Dark Mode Toggle Button inside Settings */}
          <div className={`pl-11 mt-2 space-y-2 ${activeMenu === 'settings' ? '' : 'hidden'}`}>
            
          </div>
          <button 
          onClick={handleLogout} className="flex items-center p-3 text-white dark:text-white rounded-lg hover:bg-blue-400 dark:hover:bg-blue-400 w-full">
            <FiLogOut className="w-5 h-5" />
            {!isCollapsed && <span className="ml-3">Log out</span>}
            </button>
        </nav>

        {/* Collapse Toggle Button */}
        
      </aside>

      {/* Main Content */}
      
      <div className={`p-4 ${sidebarOpen ? (isCollapsed ? 'lg:ml-20' : 'lg:ml-64') : ''} ${themeClass}`}>
        {/* Top Navigation */}
        <nav className="mb-6">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden">
                <FiMenu className="w-6 h-6" />
              </button>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white">
                {activeMenu.charAt(0).toUpperCase() + activeMenu.slice(1)}
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {/* Display user email instead of the gray circle */}
              <div className="text-gray-800 dark:text-white text-sm">
                {userEmail || 'No user logged in'}
              </div>
            </div>
          </div>
        </nav>

        {/* Dynamic Content */}
        {renderContent()}
      </div>

      {/* Toast Notification */}
      {toast.open && (
        <Toast message={toast.message} open={toast.open} handleClose={() => setToast({ open: false, message: '' })} />
      )}

      {/* Render the modal */}
      <CourseModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        institute={selectedInstitute} 
      />

      {/* Render the message box */}
      <MessageBox />

      {/* Render the course breakdown modal */}
      <CourseBreakdownModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        courseData={courseData} 
      />
    </div>
  );
}

export default admindashboard;
