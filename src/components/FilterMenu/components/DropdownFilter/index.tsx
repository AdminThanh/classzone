import { DatePicker, Select } from 'antd';
import { IDatepicker, ISelection, TField } from 'components/FilterMenu';
import React from 'react';
import { DatePickerIcon } from 'utils/drawer';
import './DropdownFilter.scss';

interface IPropsDropdownFilter {
  fields: TField[];
  onChange?: (changeValue: any) => void;
}

const DropdownFilter = (props: IPropsDropdownFilter) => {
  const { fields, onChange: fireChangeFilter } = props;

  const handleChangeInput = (name: string, value: string) => {
    if (fireChangeFilter) {
      fireChangeFilter({
        [name]: value,
      });
    }
  };

  const renderInput = (fld: TField) => {
    switch (fld.type) {
      case 'datepicker':
        return (
          <DatePicker
            placeholder={fld.placeholder || ''}
            suffixIcon={<DatePickerIcon />}
            name={fld.name}
            onChange={(_, value) => handleChangeInput(fld.name, value)}
          />
        );
      case 'select':
        return (
          <Select
            onChange={(value) => handleChangeInput(fld.name, value)}
            placeholder={fld.placeholder || ''}
          >
            {fld.options.map((opt) => (
              <Select.Option key={opt.value} value={opt.value}>
                {opt.label}
              </Select.Option>
            ))}
          </Select>
        );
      default:
        console.error('Field type not found');
    }
  };

  return (
    <div className="dropdownFilter">
      <div className="dropdownFilter__skeleton">
        {fields.map((fld, idx) => (
          <div key={idx} className="dropdownFilter__item">
            <div className="dropdownFilter__label">{fld.label}:</div>
            <div className="dropdownFilter__input">{renderInput(fld)}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DropdownFilter;
