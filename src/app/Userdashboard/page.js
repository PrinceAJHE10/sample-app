"use client";
import React, { useState, useCallback, useEffect } from 'react';
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
  FiUser
} from 'react-icons/fi';
import NextImage from "next/image";
import Link from 'next/link';
import { db, storage, auth } from '../firebase/config';
import { collection, addDoc, doc, getDoc, getDocs, query, where, setDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { regions, provinces, cities, barangays } from '../../data/philippineLocations';
import { reauthenticateWithCredential, EmailAuthProvider, updateProfile } from 'firebase/auth';
import axios from 'axios';

// Access environment variables
const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`;
const UPLOAD_PRESET = process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

// Add A4 size styles at the top of your component or in a CSS file
const a4Styles = {
  width: '210mm', // Approx width of A4 paper
  minHeight: '297mm', // Approx height of A4 paper
  padding: '20mm', // Padding inside the paper
  margin: '10mm auto', // Center the paper horizontally
  backgroundColor: 'white', // Background color for the paper
  boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)', // Optional: adds shadow to mimic paper
  pageBreakAfter: 'always' // Ensures each record starts on a new page when printed
};

function userdashboard() {
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
    placeOfBirth: '',
    studentNo: '',
    dateSemesterAdmitted: '',
    category: '',
    highSchoolCollege: '',
    dateOfGraduationLastAttended: '',
    institute: '',
    availableCourses: [],
    availableMajors: [],
    contactNumber: '',
    personcontactNumber: '',
    thesisTitle: '',
    adviser: '',
  });
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
    if (name === 'birthday') {
        const calculatedAge = calculateAge(value);
        setFormData(prev => ({
            ...prev,
            [name]: value,
            age: calculatedAge
        }));
    } else if (name === 'course') {
        let majors = [];
        if (value === '(BSA) Bachelor of Science in Agriculture') {
            majors = ['Horticulture', 'Animal Science', 'Crop Protection'];

        } else if (['(BSAF) Bachelor of Science in Agroforestry', '(BSDevCom) Bachelor of Science in Development Communication', '(BSFT) Bachelor of Science in Food Technology'].includes(value)) {
            majors = ['General']; // Only 'General' major for these courses

        } else if (value === '(BSAIS) Bachelor of Science in Accounting Information System') {
            majors = ['General']; // Add majors  if needed

        } else if (value === '(BSAB) Bachelor of Science in Agri-Business') {
            majors = ['Enterprise Management']; // Add majors  if needed

        } else if (value === '(BPA) Bachelor of Public Administration') {
            majors = ['General']; // Add majors  if needed    

        }else if (['(BSIT) Bachelor of Science in Information Technology', '(BSIS) Bachelor of Science in Information System', '(BSABE) Bachelor of Science in Agricultural Biosystem Engineering', '(BSAE) Bachelor of Science in  Agricultural Engineering','(DIT) Diploma in Information Technology','(ACT) Associate in Computer Technology', ].includes(value)) {
            majors = ['General']; // Add majors  if needed  

        } else if (value === '(BEED) Bachelor of Elementary Education') {
            majors = ['General']; // Add majors  if needed

        } else if (value === '(BTLED) Bachelor of Technology and Livelihood Education') {
            majors = ['Home Economics'];

        } else if (value === '(BSED) Bachelor of Secondary Education') {
            majors = ['English', 'Filipino', 'Mathematics', 'Science']; // Add majors for BSED

        } else if (value === '(Phd) Doctor of Philosophy') {
            majors = ['Educational Management'];

        } else if (value === '(MAED) Master of Arts in Education') {
            majors = ['Educational Management', 'Language Teaching', 'Mathematics Teaching', 'Science Teaching']; // Add majors for BSED

        } else if (value === '(MBA) Master in Business Administration') {
            majors = ['Entreprenuership'];

        } else if (value === '(DAS) Diploma in Arts and Sciences') {
          majors = ['General'];
      }
        setFormData(prev => ({
            ...prev,
            [name]: value,
            availableMajors: majors,
            major: '' // Reset major selection when course changes
        }));
    } else if (name === 'institute') {
        let courses = [];
        switch (value) {
            case 'IARS':
                courses = [
                    '(BSA) Bachelor of Science in Agriculture',
                    '(BSAF) Bachelor of Science in Agroforestry',
                    '(BSDevCom) Bachelor of Science in Development Communication',
                    '(BSFT) Bachelor of Science in Food Technology'
                ];
                break;

            case 'IBEG':
                  courses = [
                      '(BSAIS) Bachelor of Science in Accounting Information System',
                      '(BSAB) Bachelor of Science in Agri-Business',
                      '(BPA) Bachelor of Public Administration'
                      
                  ];
                  break;
            case 'ICET':
                    courses = [
                        '(BSIT) Bachelor of Science in Information Technology',
                        '(BSIS) Bachelor of Science in Information System',
                        '(BSABE) Bachelor of Science in Agricultural Biosystem Engineering',
                        '(BSAE) Bachelor of Science in  Agricultural Engineering',
                        '(DIT) Diploma in Information Technology',
                        '(ACT) Associate in Computer Technology',
                        
                    ];
                    break;      
            case 'ITED':
                courses = [
                    '(BEED) Bachelor of Elementary Education',
                    '(BSED) Bachelor of Secondary Education',
                    '(BTLED) Bachelor of Technology and Livelihood Education'
                ];
                break;
            case 'IGPE':
                courses = [
                    '(Phd) Doctor of Philosophy',
                    '(MAED) Master of Arts in Education',
                    '(MBA) Master in Business Administration'
                ];
                break;
            case 'IMAS':
                  courses = [
                      '(DAS) Diploma in Arts and Sciences'
                  ];
                  break;
            // Add cases for other institutes if needed
            default:
                courses = [];
        }
        setFormData(prev => ({
            ...prev,
            [name]: value,
            availableCourses: courses,
            course: '' // Reset course selection when institute changes
        }));
    } else {
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
        // Create the alumni document with all form data
        const alumniData = {
            ...formData,
            email: userEmail, // Include the user's email
            createdAt: new Date().toISOString(), // Capture the current date and time
        };

        console.log('Alumni data to be saved:', alumniData);

        // Use setDoc with merge option to update or create the document
        const docRef = doc(db, 'alumni', userEmail); // Use userEmail as the document ID
        await setDoc(docRef, alumniData, { merge: true }); // Merge the data

        console.log('Document written with ID:', docRef.id);

        alert('Registration successful!');

        // Optionally, you can navigate to a different section or reset specific fields
        // setActiveMenu('courseRegistration'); // Change active menu to course registration
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
      const eventList = eventSnapshot.docs.map(doc => doc.data());
      setEvents(eventList);
    };

    fetchEvents();
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
        {formData.photoURL && (
          <div className="w-full h-full rounded-full overflow-hidden">
            <img
              src={formData.photoURL}
              alt="Profile"
              className="w-full h-full object-cover"
            />
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
          onChange={(e) => {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
              handleProfilePictureUpload(file);
            } else {
              alert('Please upload a valid image file.');
            }
          }}
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
            <FiChevronDown className={`w-4 h-4 ml-auto transition-transform ${alumniDropdownOpen ? 'rotate-100' : ''}`} />
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

  // Function to render the records with a document layout and photo
  const renderRecords = () => {
    return (
      <div>
        {studentRecords.length > 0 ? (
          studentRecords.map(record => (
            <div key={record.id} style={a4Styles} className="p-5">
              <div className="flex justify-between items-center mb-4">
                <div className="w-full">
                  <h2 className="text-3xl font-bold text-center mb-4">Alumni Personal Record</h2>
                  <br></br>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      
                      <p><strong>Name:</strong> {record.firstName} {record.middleName} {record.lastName}</p>
                      <p><strong>Date of Birth:</strong> {record.birthday}</p>
                      <p><strong>Age:</strong> {record.age}</p>
                      <p><strong>Place of Birth:</strong> {record.placeOfBirth}</p>
                      <p><strong>Date of Graduation:</strong>{record.graduationYear}</p>
                      <p><strong>Student No:</strong> {record.studentNo}</p>
                      <p><strong>Home Address:</strong> {record.streetAddress} {record.homeAddress}</p>
                      <p><strong>Degree/Title Course:</strong> {record.course}</p>
                      <p><strong>Major:</strong> {record.major}</p>
                      <p><strong>Thesis Title:</strong> {record.thesisTitle}</p>
                      <p><strong>Adviser:</strong> {record.adviser}</p>

                    </div>
                    <div>
                    <p>Contact Person</p>
                    <p><strong>Contact Number:</strong> {record.contactNumber}</p>
                    <p><strong>Father's Name:</strong> {record.fathersName}</p>
                    <p><strong>Mother.s Name:</strong> {record.mothersName}</p>
                    </div>
                  </div>
                  {record.photoURL && (
                    <div className="flex justify-center mt-4">
                      <img
                        src={record.photoURL}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
              <hr className="my-4" />
            </div>
          ))
        ) : (
          <p>No records found.</p>
        )}
      </div>
    );
  };

  // Render the events form and list
  const renderEvents = () => {
    const currentDate = new Date();
    const upcomingEvents = events.filter(event => new Date(event.dateTime) > currentDate);
    const pastEvents = events.filter(event => new Date(event.dateTime) <= currentDate);

    return (
        <div className="bg-white shadow-md rounded-lg p-6">
            

            {/* Upcoming Events Section */}
            <div className="bg-green-100 p-4 rounded-lg mb-4">
                <h3 className="text-xl font-semibold text-gray-800">Upcoming Events</h3>
                {upcomingEvents.length > 0 ? (
                    <div className="space-y-4">
                        {upcomingEvents.map((event, index) => (
                            <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-sm">
                                <h4 className="font-bold text-lg text-gray-800">{event.name}</h4>
                                <p className="text-gray-600">{new Date(event.dateTime).toLocaleString()}</p>
                                <p className="text-gray-700">{event.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No upcoming events available.</p>
                )}
            </div>

            {/* Past Events Section */}
            <div className="bg-red-100 p-4 rounded-lg">
                <h3 className="text-xl font-semibold text-gray-800">Past Events</h3>
                {pastEvents.length > 0 ? (
                    <div className="space-y-4">
                        {pastEvents.map((event, index) => (
                            <div key={index} className="border border-gray-300 rounded-lg p-4 shadow-sm">
                                <h4 className="font-bold text-lg text-gray-800">{event.name}</h4>
                                <p className="text-gray-600">{new Date(event.dateTime).toLocaleString()}</p>
                                <p className="text-gray-700">{event.description}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600">No past events available.</p>
                )}
            </div>
        </div>
    );
  };

  // Render different content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return (
          <div className="grid gap-6">
            {/* Stats Cards */}
            
            
            {/* Recent Activity */}
            
          </div>
        );

      case 'registration':
        return (
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold">Personal Information</h1>
                <p className="mt-2 text-gray-600 dark:text-gray-400">Please complete all fields before submitting</p>
              </div>

              
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Section */}
                
                <div className="bg-white border border-gray p-4 rounded-lg shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Middle Name</label>
                    <input
                      type="text"
                      name="middleName"
                      value={formData.middleName}
                      onChange={handleChange}
                      placeholder="Type N/A if Not Applicable"
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Birth</label>
                    <input
                      type="date"
                      name="birthday"
                      required
                      value={formData.birthday}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Age</label>
                    <input
                      type="text"
                      name="age"
                      value={formData.age}
                      readOnly
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 bg-gray-50 sm:text-sm"
                    />
                  </div>

                  {/* Place of Birth */}
                <div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Place of Birth</label>
                    <input
                      type="text"
                      name="placeOfBirth"
                      value={formData.placeOfBirth}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    />
                  </div>
                </div>
                
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Gender</label>
                    <select
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleChange}
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      
                    </select>
                  </div>
                  
                   {/* Student Number or ID */}
                   <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Student No.</label>
                    
                    <input
                      type="text"
                      name="studentNo"
                      value={formData.studentNo}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder='Student ID'
                    />
                  </div>
                  {/* New Contact Number Field */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Number</label>
                    <input
                      type="text"
                      name="contactNumber"
                      value={formData.contactNumber}
                      onChange={handleChange}
                      required
                      className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      placeholder="Enter contact number"
                    />
                  </div>
                </div>

                {/* Ethnicity and Address */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <EthnicitySection />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Home Address</label>
                    <div className="space-y-2">
                      {/* Province Dropdown */}
                      <select
                        name="province"
                        value={selectedProvince}
                        onChange={handleProvinceChange}
                        required
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="">Select Province</option>
                        {provinces.map(province => (
                          <option key={province.code} value={province.code}>
                            {province.name}
                          </option>
                        ))}
                      </select>

                      {/* Municipality/City Dropdown */}
                      <select
                        name="city"
                        value={selectedCity}
                        onChange={handleCityChange}
                        required
                        disabled={!selectedProvince}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="">Select Municipality/City</option>
                        {selectedProvince && provinces.find(p => p.code === selectedProvince)?.municipalities?.map(mun => (
                          <option key={mun.code} value={mun.code}>
                            {mun.name}
                          </option>
                        ))}
                      </select>

                      {/* Barangay Dropdown */}
                      <select
                        name="barangay"
                        value={selectedBarangay}
                        onChange={handleBarangayChange}
                        required
                        disabled={!selectedCity}
                        className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                      >
                        <option value="">Select Barangay</option>
                        {selectedCity && provinces.find(p => p.code === selectedProvince)
                          ?.municipalities?.find(m => m.code === selectedCity)?.barangays?.map(barangay => (
                            <option key={barangay} value={barangay}>
                              {barangay}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Street Address */}
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Street Address (Optional)</label>
                  <input
                    type="text"
                    name="streetAddress"
                    value={formData.streetAddress || ''}
                    onChange={handleChange}
                    placeholder="Street Name, Sitio or Purok"
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  />
                </div>
                {/* New Thesis Title Field */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Thesis Title</label>
                        <input
                            type="text"
                            name="thesisTitle"
                            value={formData.thesisTitle}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter thesis title"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Adviser</label>
                        <input
                            type="text"
                            name="adviser"
                            value={formData.adviser}
                            onChange={handleChange}
                            required
                            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            placeholder="Enter adviser's name"
                        />
                    </div>
                </div>
                <br></br>
                </div>

                {/* Contact Person Section */}
                <div className="bg-white border border-black p-4 rounded-lg shadow-md">
                    <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Contact Person</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Mother's Name</label>
                            <input
                                type="text"
                                name="mothersName"
                                required
                                value={formData.mothersName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Father's Name</label>
                            <input
                                type="text"
                                name="fathersName"
                                required
                                value={formData.fathersName}
                                onChange={handleChange}
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Contact Number</label>
                            <input
                                type="text"
                                name="personcontactNumber"
                                value={formData.personcontactNumber}
                                onChange={handleChange}
                                required
                                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                                placeholder="Enter contact number"
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center mt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div> 
              </form>
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

      case 'courseRegistration':
        return (
          <div className="bg-white p-6 rounded-lg shadow-sm">
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Institute</label>
                  <select
                    name="institute"
                    required
                    value={formData.institute}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Select Institute</option>
                    <option value="IARS">IARS (Institute of Agriculture and Related Sciences)</option>
                    <option value="IBEG">IBEG (Institute of Business Education and Governance)</option>
                    <option value="ICET">ICET (Institute of Computing Engineering and Technology)</option>
                    <option value="ITED">ITED (Institute of Teacher Education)</option>
                    <option value="IGPE">IGPE (Institute of Graduate and Professional Education)</option>
                    <option value="IMAS">IMAS (Institute of Mathematics Arts and Sciences)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Degree/Course</label>
                  <select
                    name="course"
                    required
                    value={formData.course}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Select Course</option>
                    {formData.availableCourses.map(course => (
                      <option key={course} value={course}>{course}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Major</label>
                  <select
                    name="major"
                    required
                    value={formData.major}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Select Major</option>
                    {formData.availableMajors.map(major => (
                      <option key={major} value={major}>{major}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Date of Graduation</label>
                  <select
                    name="graduationYear"
                    required
                    value={formData.graduationYear}
                    onChange={handleChange}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  >
                    <option value="">Select Graduation Year</option>
                    <option value="2020-2021">2020-2021</option>
                    <option value="2021-2022">2021-2022</option>
                    <option value="2022-2023">2022-2023</option>
                    <option value="2023-2024">2023-2024</option>
                    <option value="2024-2025">2024-2025</option>
                  </select>
                </div>
              </div>
              {/* Submit Button */}
              <div className="flex justify-center mt-6">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-8 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        );

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
                  onClick={() => handleMenuClick('registration')}
                  className={`flex items-center p-2 text-white rounded-lg w-full ${
                    activeMenu === 'registration' ? 'bg-blue-500' : 'hover:bg-blue-400'
                  }`}
                >
                  <FiUserPlus className="w-5 h-5 mr-3" />
                  <span className="ml-2">Registration</span>
                </button>
                <button 
                  onClick={() => handleMenuClick('courseRegistration')}
                  className={`flex items-center p-2 text-white rounded-lg w-full ${
                    activeMenu === 'courseRegistration' ? 'bg-blue-500' : 'hover:bg-blue-400'
                  }`}
                >
                  <FiUserPlus className="w-5 h-5 mr-3" />
                  <span className="ml-2">Alumni Course</span>
                </button>
              </div>
            )}
          </div>

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
    </div>
  );
}

export default userdashboard
