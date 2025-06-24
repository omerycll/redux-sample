import React from 'react';
import {Breadcrumb as AntBreadcrumb} from 'antd';
import {Link} from 'react-router';
import {HomeOutlined} from '@ant-design/icons';

export interface BreadcrumbItem {
  title: string;
  path?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  separator?: string;
  style?: React.CSSProperties;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  items,
  separator = '/',
  style,
}) => {
  return (
    <AntBreadcrumb style={{marginBottom: '1rem', ...style}}>
      {items.map((item, index) => {
        const isLast = index === items.length - 1;

        return (
          <AntBreadcrumb.Item key={index} separator={isLast ? null : separator}>
            <span style={{display: 'inline-block', marginRight: '4px'}}>
              {item.icon}
            </span>
            {item.path && !isLast ? (
              <Link to={item.path}>{item.title}</Link>
            ) : (
              item.title
            )}
          </AntBreadcrumb.Item>
        );
      })}
    </AntBreadcrumb>
  );
};
