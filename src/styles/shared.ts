import type { SxProps, Theme } from '@mui/material/styles';

// Common color constants from CSS variables
export const colors = {
  primary: 'var(--sgbus-green)',
  secondary: 'var(--mint)',
  background: 'var(--black)',
  textPrimary: 'var(--tea-green)',
} as const;

// Common spacing and layout styles
export const commonStyles = {
  // Container styles
  pageContainer: {
    maxWidth: 1200,
    mx: 'auto',
    p: 3,
  } as SxProps<Theme>,

  formContainer: {
    maxWidth: 800,
    mx: 'auto',
    p: 3,
  } as SxProps<Theme>,

  fullHeightContainer: {
    minHeight: '100vh',
    bgcolor: colors.background,
    py: 4,
  } as SxProps<Theme>,

  // Loading states
  loadingCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '50vh',
  } as SxProps<Theme>,

  // Typography styles
  pageTitle: {
    color: colors.primary,
    mb: 4,
    textAlign: 'center',
    fontWeight: 'bold',
  } as SxProps<Theme>,

  sectionTitle: {
    color: colors.primary,
    mb: 2,
    fontWeight: 'bold',
  } as SxProps<Theme>,

  subtitle: {
    color: colors.textPrimary,
    mb: 4,
    textAlign: 'center',
  } as SxProps<Theme>,

  bodyText: {
    color: colors.textPrimary,
  } as SxProps<Theme>,

  // Card styles
  primaryCard: {
    bgcolor: 'rgba(132, 218, 93, 0.1)',
    border: '1px solid',
    borderColor: colors.primary,
    borderRadius: 2,
  } as SxProps<Theme>,

  secondaryCard: {
    bgcolor: 'rgba(69, 183, 123, 0.1)',
    border: '1px solid',
    borderColor: colors.secondary,
    borderRadius: 2,
  } as SxProps<Theme>,

  // Layout helpers
  flexCenter: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  } as SxProps<Theme>,

  flexBetween: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  } as SxProps<Theme>,

  flexColumn: {
    display: 'flex',
    flexDirection: 'column',
  } as SxProps<Theme>,

  // Form field styles
  textField: {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: colors.secondary },
      '&:hover fieldset': { borderColor: colors.primary },
      '&.Mui-focused fieldset': { borderColor: colors.primary },
    },
    '& .MuiInputLabel-root': { color: colors.textPrimary },
    '& .MuiInputBase-input': { color: colors.textPrimary },
  } as SxProps<Theme>,

  // Button styles
  primaryButton: {
    bgcolor: colors.primary,
    color: colors.background,
    fontWeight: 'bold',
    '&:hover': {
      bgcolor: colors.primary,
      opacity: 0.8,
    },
  } as SxProps<Theme>,

  secondaryButton: {
    border: `1px solid ${colors.secondary}`,
    color: colors.secondary,
    '&:hover': {
      borderColor: colors.primary,
      color: colors.primary,
    },
  } as SxProps<Theme>,

  // Chip styles
  successChip: {
    bgcolor: colors.primary,
    color: colors.background,
    fontWeight: 'bold',
  } as SxProps<Theme>,

  infoChip: {
    bgcolor: colors.secondary,
    color: colors.background,
    fontWeight: 'bold',
  } as SxProps<Theme>,
} as const;

// Utility functions for dynamic styles
export const getLoadingSpinnerColor = (variant: 'primary' | 'secondary' = 'primary') => ({
  color: variant === 'primary' ? colors.primary : colors.secondary,
});

export const getDividerStyle = (color: 'primary' | 'secondary' = 'secondary') => ({
  borderColor: color === 'primary' ? colors.primary : colors.secondary,
  my: 2,
});

export const getCardElevationStyle = (elevated = false) => ({
  elevation: elevated ? 3 : 1,
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    elevation: elevated ? 6 : 3,
    transform: 'translateY(-2px)',
  },
}); 