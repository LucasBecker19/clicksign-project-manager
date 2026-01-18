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
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: '#FFB23D',
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
    backgroundColor: '#53525D',
    opacity: 1,
  },
}));

export default CustomSwitch;