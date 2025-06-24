import React from 'react';
import {Typography, Space, Button} from 'antd';
import {ArrowLeftOutlined} from '@ant-design/icons';

const {Title} = Typography;

interface PageHeaderProps {
  isBack?: () => void;
  title: string;
  buttons?: {
    text: string;
    icon?: React.ReactNode;
    type?: 'primary' | 'default' | 'dashed' | 'link' | 'text' | 'ghost';
    danger?: boolean;
    onClick: () => void;
  }[];
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  isBack,
  title,
  buttons,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '1rem',
      }}
    >
      <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
        {isBack && (
          <Button icon={<ArrowLeftOutlined />} onClick={isBack}></Button>
        )}
        <Title level={2} style={{margin: 0}}>
          {title}
        </Title>
      </div>
      <Space>
        {buttons?.map((button) => (
          <Button
            key={button.text}
            icon={button.icon}
            onClick={button.onClick}
            type={button.type}
            danger={button.danger}
          >
            {button.text}
          </Button>
        ))}
      </Space>
    </div>
  );
};
