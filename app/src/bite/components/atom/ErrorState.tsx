import React from 'react';
import {Alert} from 'antd';

interface ErrorStateProps {
  error: string | null;
}

export const ErrorState: React.FC<ErrorStateProps> = ({error}) => (
  <Alert
    message='Error'
    description={error || 'Failed to load data'}
    type='error'
    showIcon
    style={{marginTop: '1rem'}}
  />
);
