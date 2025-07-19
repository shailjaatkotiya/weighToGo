import React from 'react';
import {
  TextField,
  Grid,
  Typography,
  MenuItem,
  CircularProgress,
  Button,
  Box,
  Divider
} from '@mui/material';
import type { Flight } from '../../types';
import { commonStyles, getDividerStyle } from '../../styles/shared';

interface PersonalDetailsFieldsProps {
  formData: {
    pnr: string;
    name: string;
    email: string;
    phone: string;
  };
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  sectionColor: string;
}

export const PersonalDetailsFields = ({ formData, onChange, sectionColor }: PersonalDetailsFieldsProps) => (
  <>
    <Grid item xs={12}>
      <Typography variant="h6" sx={{ color: sectionColor, mb: 2 }}>
        Personal Details
      </Typography>
    </Grid>
    
    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="PNR Number"
        name="pnr"
        value={formData.pnr}
        onChange={onChange}
        required
        sx={commonStyles.textField}
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Full Name"
        name="name"
        value={formData.name}
        onChange={onChange}
        required
        sx={commonStyles.textField}
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Email"
        name="email"
        type="email"
        value={formData.email}
        onChange={onChange}
        required
        sx={commonStyles.textField}
      />
    </Grid>

    <Grid item xs={12} sm={6}>
      <TextField
        fullWidth
        label="Phone"
        name="phone"
        value={formData.phone}
        onChange={onChange}
        required
        sx={commonStyles.textField}
      />
    </Grid>
  </>
);

interface FlightSelectionFieldProps {
  flights: Flight[];
  selectedFlightId: string;
  selectedFlight: Flight | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  formatDuration: (minutes: number) => string;
  sectionColor: string;
}

export const FlightSelectionField = ({ 
  flights, 
  selectedFlightId, 
  selectedFlight, 
  onChange, 
  formatDuration,
  sectionColor 
}: FlightSelectionFieldProps) => (
  <>
    <Grid item xs={12}>
      <Divider sx={getDividerStyle('secondary')} />
      <Typography variant="h6" sx={{ color: sectionColor, mb: 2 }}>
        Flight Details
      </Typography>
    </Grid>

    <Grid item xs={12}>
      <TextField
        select
        fullWidth
        label="Select Flight"
        name="flightId"
        value={selectedFlightId}
        onChange={onChange}
        required
        sx={commonStyles.textField}
      >
        {flights.map((flight) => (
          <MenuItem key={flight.flightId} value={flight.flightId}>
            {flight.flightNumber} - {flight.from} → {flight.to} ({flight.date})
          </MenuItem>
        ))}
      </TextField>
    </Grid>

    {selectedFlight && (
      <Grid item xs={12}>
        <Box sx={{ 
          p: 2, 
          bgcolor: 'rgba(132, 218, 93, 0.05)',
          borderRadius: 1,
          border: '1px solid var(--sgbus-green)',
          borderOpacity: 0.3
        }}>
          <Typography variant="h6" sx={{ color: 'var(--sgbus-green)', mb: 2 }}>
            Flight Information
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6} sm={3}>
              <Typography sx={commonStyles.bodyText}>
                <strong>Flight:</strong> {selectedFlight.flightNumber}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography sx={commonStyles.bodyText}>
                <strong>Airline:</strong> {selectedFlight.airline}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography sx={commonStyles.bodyText}>
                <strong>Route:</strong> {selectedFlight.from} → {selectedFlight.to}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography sx={commonStyles.bodyText}>
                <strong>Duration:</strong> {formatDuration(selectedFlight.duration)}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography sx={commonStyles.bodyText}>
                <strong>Departure:</strong> {selectedFlight.departureTime}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography sx={commonStyles.bodyText}>
                <strong>Arrival:</strong> {selectedFlight.arrivalTime}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography sx={commonStyles.bodyText}>
                <strong>Date:</strong> {selectedFlight.date}
              </Typography>
            </Grid>
            <Grid item xs={6} sm={3}>
              <Typography sx={commonStyles.bodyText}>
                <strong>Type:</strong> {selectedFlight.flightType}
              </Typography>
            </Grid>
          </Grid>
        </Box>
      </Grid>
    )}
  </>
);

interface WeightFieldProps {
  label: string;
  name: string;
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputProps?: object;
}

export const WeightField = ({ label, name, value, onChange, inputProps }: WeightFieldProps) => (
  <Grid item xs={12} sm={6}>
    <TextField
      fullWidth
      label={label}
      name={name}
      type="number"
      value={value}
      onChange={onChange}
      required
      inputProps={inputProps}
      sx={commonStyles.textField}
    />
  </Grid>
);

interface SubmitButtonProps {
  submitting: boolean;
  children: React.ReactNode;
}

export const SubmitButton = ({ submitting, children }: SubmitButtonProps) => (
  <Grid item xs={12}>
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
      <Button
        type="submit"
        variant="contained"
        size="large"
        disabled={submitting}
        sx={{
          ...commonStyles.primaryButton,
          minWidth: 200,
          py: 1.5,
          fontSize: '1.1rem',
        }}
      >
        {submitting ? (
          <>
            <CircularProgress size={20} sx={{ mr: 1, color: 'var(--black)' }} />
            Submitting...
          </>
        ) : (
          children
        )}
      </Button>
    </Box>
  </Grid>
); 