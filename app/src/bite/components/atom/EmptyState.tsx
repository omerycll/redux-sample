import React from 'react';
import {Empty} from 'antd';

export const EmptyState: React.FC<{message?: string}> = ({
  message = 'No data found.',
}) => <Empty description={message} style={{padding: '4rem'}} />;
