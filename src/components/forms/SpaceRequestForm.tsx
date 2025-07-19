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
import type { SpaceRequestFormData } from '../../types';
import { useSpaceForm } from '../../hooks/useSpaceForm';
import { commonStyles, colors } from '../../styles/shared';
import {
  PersonalDetailsFields,
  FlightSelectionField,
  WeightField,
  SubmitButton
} from '../shared/FormFields';

const initialFormData: SpaceRequestFormData = {
  pnr: '',
  name: '',
  email: '',
  phone: '',
  flightId: '',
  weightKg: 0,
  itemDescription: ''
};

export default function SpaceRequestForm() {
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
    successMessage: 'Space request submitted successfully!'
  });

  if (loading) {
    return (
      <Box sx={commonStyles.loadingCenter}>
        <CircularProgress sx={{ color: colors.secondary }} />
      </Box>
    );
  }

  return (
    <Box sx={commonStyles.formContainer}>
      <Typography variant="h4" sx={{
        ...commonStyles.pageTitle,
        color: colors.secondary,
      }}>
        Request Luggage Space
      </Typography>

      {successMessage && (
        <Alert severity="success" sx={{ mb: 3 }}>
          {successMessage}
        </Alert>
      )}

      <Card sx={commonStyles.secondaryCard}>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <PersonalDetailsFields
                formData={formData}
                onChange={handleInputChange}
                sectionColor={colors.secondary}
              />

              <FlightSelectionField
                flights={flights}
                selectedFlightId={formData.flightId}
                selectedFlight={selectedFlight}
                onChange={handleInputChange}
                formatDuration={formatDuration}
                sectionColor={colors.secondary}
              />

              {/* Request-specific fields */}
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ color: colors.secondary, mb: 2 }}>
                  Request Details
                </Typography>
              </Grid>

              <WeightField
                label="Required Weight (kg)"
                name="weightKg"
                value={formData.weightKg}
                onChange={handleInputChange}
                inputProps={{ min: 1, max: 50 }}
              />

              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Item Description"
                  name="itemDescription"
                  value={formData.itemDescription}
                  onChange={handleInputChange}
                  required
                  placeholder="e.g., Documents, Electronics, Gifts"
                  sx={commonStyles.textField}
                />
              </Grid>

              <SubmitButton submitting={submitting}>
                Submit Request
              </SubmitButton>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
} 