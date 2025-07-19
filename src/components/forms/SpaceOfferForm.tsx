import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Alert,
  CircularProgress,
  TextField,
} from '@mui/material';
import type { SpaceOfferFormData } from '../../types';
import { useSpaceForm } from '../../hooks/useSpaceForm';
import { commonStyles, colors } from '../../styles/shared';
import {
  PersonalDetailsFields,
  FlightSelectionField,
  WeightField,
  SubmitButton
} from '../shared/FormFields';

const initialFormData: SpaceOfferFormData = {
  pnr: '',
  name: '',
  email: '',
  phone: '',
  flightId: '',
  weightKg: 0,
  pricePerKg: 0
};

export default function SpaceOfferForm() {
  const {
    flights,
    formData,
    selectedFlight,
    loading,
    submitting,
    successMessage,
    handleInputChange,
    handleSubmit,
    formatDuration,
  } = useSpaceForm({
    initialFormData,
    successMessage: 'Space offer submitted successfully!'
  });

  if (loading) {
    return (
      <Box sx={commonStyles.loadingCenter}>
        <CircularProgress sx={{ color: colors.primary }} />
      </Box>
    );
  }

  return (
    <Box sx={commonStyles.formContainer}>
      <Typography variant="h4" sx={{
        ...commonStyles.pageTitle,
        color: colors.primary,
      }}>
        Offer Luggage Space
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <Card sx={commonStyles.primaryCard}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <PersonalDetailsFields
                formData={formData}
                onChange={handleInputChange}
                sectionColor={colors.primary}
              />

              <FlightSelectionField
                flights={flights}
                selectedFlightId={formData.flightId}
                selectedFlight={selectedFlight}
                onChange={handleInputChange}
                formatDuration={formatDuration}
                sectionColor={colors.primary}
              />

              {/* Offer-specific fields */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: colors.secondary, mb: 2 }}>
                  Space Details
                </Typography>
              </Grid>

              <WeightField
                label="Available Weight (kg)"
                name="weightKg"
                value={formData.weightKg}
                onChange={handleInputChange}
                inputProps={{ min: 1, max: 50 }}
              />

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Price per kg (₹)"
                  name="pricePerKg"
                  type="number"
                  value={formData.pricePerKg}
                  onChange={handleInputChange}
                  required
                  inputProps={{ min: 1 }}
                  sx={commonStyles.textField}
                />
              </Grid>

              <SubmitButton submitting={submitting}>
                Submit Offer
              </SubmitButton>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
} 