import * as React from 'react';
import Select from 'react-select';
import './UiSelect.scss';

interface IProps {
  className?: string;
  value: Object;
  options: Object[];
  onChange: Function;
}

const UiSelect: React.FC<IProps> = ({ className, value, options, onChange }: IProps) => {
  const classNames = {
    select: (className ? className + ' ' : '') + 'ui-select',
  };

  return (
    <Select
      className={classNames.select}
      classNamePrefix="ui-select"
      isSearchable={false}
      value={value}
      options={options}
      onChange={onChange}
    />
  );
};

export default UiSelect;
