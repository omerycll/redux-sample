import React from 'react';
import {Button, Drawer, Input, InputNumber, Select} from 'antd';

interface FilterItem {
  name: string;
  type: 'text' | 'number' | 'select';
  value: any;
  onChange: (value: any) => void;
  options?: {label: string; value: any}[]; // select için
}

interface FilterProps {
  open: boolean;
  onClose: () => void;
  filters: FilterItem[];
  resetFilters: () => void;
}

export const Filter: React.FC<FilterProps> = ({
  open,
  onClose,
  filters,
  resetFilters,
}) => {
  return (
    <Drawer
      title='Filter'
      closable={true}
      onClose={onClose}
      open={open}
      footer={<Button onClick={resetFilters}>Reset</Button>}
    >
      {filters.map((filter, idx) => (
        <div key={idx} style={{marginBottom: 16}}>
          <label style={{display: 'block', marginBottom: 4}}>
            {filter.name}
          </label>
          {filter.type === 'text' && (
            <Input
              value={filter.value}
              onChange={(e) => filter.onChange(e.target.value)}
            />
          )}
          {filter.type === 'number' && (
            <InputNumber
              value={filter.value}
              onChange={filter.onChange}
              style={{width: '100%'}}
            />
          )}
          {filter.type === 'select' && filter.options && (
            <Select
              value={filter.value}
              onChange={filter.onChange}
              options={filter.options}
              style={{width: '100%'}}
            />
          )}
        </div>
      ))}
    </Drawer>
  );
};
