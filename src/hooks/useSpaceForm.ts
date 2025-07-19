import { useState, useEffect } from 'react';
import type { Flight, User, SpaceOfferFormData, SpaceRequestFormData } from '../types';
import { useSpaceData } from './useSpaceData';

type FormData = SpaceOfferFormData | SpaceRequestFormData;

interface UseSpaceFormProps<T extends FormData> {
  initialFormData: T;
  successMessage: string;
}

export const useSpaceForm = <T extends FormData>({
  initialFormData,
  successMessage: customSuccessMessage
}: UseSpaceFormProps<T>) => {
  const { flights, users, currentUser, loading: dataLoading, error: dataError } = useSpaceData();
  const [formData, setFormData] = useState<T>(initialFormData);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Pre-fill form with current user data when available
  useEffect(() => {
    if (currentUser && users.length > 0) {
      const currentUserData = users.find((user: User) => user.userId === currentUser.userId);
      if (currentUserData) {
        setFormData(prev => ({
          ...prev,
          name: currentUserData.name,
          email: currentUserData.email,
          phone: currentUserData.phone
        }));
      }
    }
  }, [currentUser, users]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'weightKg' || name === 'pricePerKg' ? Number(value) : value
    }));

    // Handle flight selection
    if (name === 'flightId') {
      const flight = flights.find(f => f.flightId === value);
      setSelectedFlight(flight || null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      // Simulate API call - in a real app, this would be an actual API endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSuccessMessage(customSuccessMessage);
      
      // Reset form but keep user details
      const resetData = {
        ...initialFormData,
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      } as T;
      
      setFormData(resetData);
      setSelectedFlight(null);
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setSubmitting(false);
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return {
    // Data
    flights,
    users,
    formData,
    selectedFlight,
    
    // States
    loading: dataLoading,
    submitting,
    successMessage,
    error: dataError,
    
    // Handlers
    handleInputChange,
    handleSubmit,
    
    // Utilities
    formatDuration,
    
    // Actions
    clearSuccessMessage: () => setSuccessMessage(''),
  };
}; 