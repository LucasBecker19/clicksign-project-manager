"use client";

import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const CustomSwitch = styled(Switch)(() => ({
  width: 48,
  height: 24,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(20px)',
      color: 'var(--color-surface)',
      '& + .MuiSwitch-track': {
        backgroundColor: 'var(--color-accent-strong)',
        opacity: 1,
      },
    },
  },
  '& .MuiSwitch-thumb': {
    width: 12,
    height: 12,
    marginTop: 4,
    marginLeft: 6,
  },
  '& .MuiSwitch-track': {
    borderRadius: 28 / 2,
    backgroundColor: 'var(--color-neutral-600)',
    opacity: 1,
  },
}));

export default CustomSwitch;