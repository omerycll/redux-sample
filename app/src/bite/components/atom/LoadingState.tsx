import React from 'react';
import {Spin} from 'antd';

export const LoadingState: React.FC<{message?: string}> = ({
  message = 'Loading...',
}) => (
  <div style={{textAlign: 'center', padding: '4rem'}}>
    <Spin size='large' />
    <div style={{marginTop: '1rem', color: '#666'}}>{message}</div>
  </div>
);
