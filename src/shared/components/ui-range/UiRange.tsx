import * as React from 'react';
import {Range, Handle, RangeProps} from 'rc-slider';
import Tooltip from 'rc-tooltip';
import 'rc-slider/assets/index.css';

export interface IProps extends RangeProps {
}

class UiRange extends React.Component<IProps> {
  render() {
    const handle = (props) => {
      const {value, dragging, index, ...restProps} = props;
      return (
        <Tooltip
          prefixCls="rc-slider-tooltip"
          overlay={value}
          visible={dragging}
          placement="top"
          key={index}
        >
          <Handle value={value} {...restProps} />
        </Tooltip>
      );
    };
    const handleStyle = [
      {
        borderColor: '#2684FF',
        backgroundColor: 'white'
      },
      {
        borderColor: '#2684FF',
        backgroundColor: 'white'
      }
    ];
    const dotStyle = {
      backgroundColor: '',
      borderColor: 'hsl(0, 0%, 80%)',
    };
    const railStyle = {
      backgroundColor: 'hsl(0, 0%, 80%)',
      height: '4px',
    };
    const trackStyle = [{
      backgroundColor: '#2684FF',
    }];

    return (
      <Range
        {...this.props}
        allowCross={false}
        handle={handle}
        handleStyle={handleStyle}
        dotStyle={dotStyle}
        railStyle={railStyle}
        trackStyle={trackStyle}
      />
    );
  }
}

export default UiRange;
