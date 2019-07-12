import React from 'react';
import PropTypes from 'prop-types';
import Select from 'react-select';
import './UiSelect.scss';


const UiSelect = ({ className, value, options, onChange }) => {
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

UiSelect.propTypes = {
  className: PropTypes.string,
  value: PropTypes.object,
  options: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};

export default UiSelect;
