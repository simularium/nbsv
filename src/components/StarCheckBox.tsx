import React from 'react';
import classNames from 'classnames';
import { Tooltip } from 'antd';
import { CheckboxChangeEvent, CheckboxProps } from 'antd/lib/checkbox';

const LEFT_PANEL_TOOLTIP_COLOR = '#3b3649';
const LEFT_PANEL_TOOLTIP_DELAY = 1; // in seconds

import '../../css/starCheckBox.css';

const StarCheckbox = ({
  checked,
  indeterminate,
  onChange,
  value,
  className,
}: CheckboxProps): JSX.Element => {
  const parentClassnames = className ? className.split(' ') : [];
  const wrapperClassnames = classNames([...parentClassnames, 'wrapper']);
  const checkboxClassNames = classNames(['icon-moon', 'checkbox'], {
    ['checked']: checked,
    ['indeterminate']: indeterminate,
  });

  return (
    <label className={wrapperClassnames}>
      <span className="container">
        <Tooltip
          title={checked ? 'Remove highlight' : 'Highlight'}
          placement="top"
          mouseEnterDelay={LEFT_PANEL_TOOLTIP_DELAY}
          color={LEFT_PANEL_TOOLTIP_COLOR}
        >
          <input
            checked={checked}
            type="checkbox"
            onChange={(e: any) =>
              onChange ? onChange(e as CheckboxChangeEvent) : null
            }
            value={value}
          />
        </Tooltip>
        <span className={checkboxClassNames} />
      </span>
    </label>
  );
};

export default StarCheckbox;
