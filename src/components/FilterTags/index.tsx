import { Select } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { BinIcon } from 'utils/drawer';
import TagControl from './components/TagControl';
import './FilterTags.scss';

export interface IOptionTag {
  label: string;
  value: string;
}

interface IFilterTags {
  placeholder?: string;
  isShowTagControl?: boolean;
  opts?: IOptionTag[];
  onChange?: (value: string[]) => void;
}

const FilterTags = (props: IFilterTags) => {
  const {
    isShowTagControl = false,
    placeholder = '',
    opts,
    onChange: handleChange,
  } = props;

  const handleDeleteTag = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const { t } = useTranslation();

  return (
    <div>
      <Select
        mode="multiple"
        style={{ width: '100%' }}
        placeholder={placeholder}
        onChange={handleChange}
        className="filter__tags"
        popupClassName="filter_popup"
        {...(isShowTagControl
          ? {
              dropdownRender: (menu) => {
                return (
                  <>
                    {menu}
                    <TagControl />
                  </>
                );
              },
            }
          : {})}
      >
        {opts?.map((opt) => (
          <Select.Option
            key={opt.value}
            className="filter__tagItem"
            value={opt.value}
          >
            <div className="filter__label">{opt.label}</div>
            <div className="filter__action" onClick={handleDeleteTag}>
              <BinIcon />
            </div>
          </Select.Option>
        ))}
      </Select>
    </div>
  );
};

export default FilterTags;
