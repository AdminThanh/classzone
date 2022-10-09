import { useRef, useState } from 'react';
import { Dropdown, Input, Menu, Select } from 'antd';
import { DownArrowIcon, UpArrowIcon } from 'utils/drawer';
import './FilterMenu.scss';
import clsx from 'clsx';
import DropdownFilter from './components/DropdownFilter';

export interface IOption {
  value: number | string;
  label: string;
}

export interface IFilterItem {
  name: string;
  label?: string;
  placeholder?: string;
}

export interface IDatepicker extends IFilterItem {
  type: 'datepicker';
}

export interface ISelection extends IFilterItem {
  type: 'select';
  options: IOption[];
}

export type TField = IDatepicker | ISelection;

interface IPropsFilterMenu {
  searchPlaceholder: string;
  fields: TField[];
  initialValues: {
    [key: string]: any;
  };
  changeDelay?: number;
  onChange?: (values: any) => void;
}

const FilterMenu = (props: IPropsFilterMenu) => {
  const {
    searchPlaceholder = '',
    initialValues,
    fields,
    changeDelay = 0,
    onChange: fireChange,
  } = props;
  const [isShowDropdown, setIsShowDropdown] = useState<Boolean>(false);
  const [values, setValues] = useState(initialValues);
  const timer: any = useRef(null);

  const timeoutEvent = (handleChange: () => void, delay = 0) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(() => {
      handleChange();
    }, delay);
  };

  const handleChangeSearch = (e: React.ChangeEvent<{ value: string }>) => {
    const handleChange = () => {
      const newValues = {
        ...values,
        search: e.target.value,
      };

      setValues(newValues);

      if (fireChange) {
        fireChange(newValues);
      }
    };

    timeoutEvent(handleChange, changeDelay);
  };

  const handleChangeFilter = (changeValue: { name: string; value: any }) => {
    const newValues = {
      ...values,
      ...changeValue,
    };

    setValues(newValues);

    if (fireChange) {
      fireChange(newValues);
    }
  };

  return (
    <div className="filterMenu">
      <Dropdown
        overlay={
          <DropdownFilter onChange={handleChangeFilter} fields={fields} />
        }
        trigger={['click']}
        onOpenChange={(isOpen: Boolean) => {
          setIsShowDropdown(isOpen);
        }}
      >
        <Input
          placeholder={searchPlaceholder}
          className="filterMenu__search"
          onChange={handleChangeSearch}
          suffix={
            <DownArrowIcon
              className={clsx({
                'icon--active': isShowDropdown,
              })}
            />
          }
        />
      </Dropdown>
    </div>
  );
};

export default FilterMenu;
