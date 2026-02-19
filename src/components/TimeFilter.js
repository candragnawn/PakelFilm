import { ToggleButton, ToggleButtonGroup } from "react-bootstrap";
import React from "react";

const TimeFilter = ({ current, onChange }) => {
  return (
    <ToggleButtonGroup
      type="radio"
      name="time-option"
      value={current}
      onChange={onChange}
      className="custoom-toggle-group"
    >
      <ToggleButton id="tbg-day" value="day" variant="outline-light" size="sm" className="px-3">
        Today
      </ToggleButton>
      <ToggleButton id="tbg-week" value="week" variant="outline-light" size="sm" className="px-3">
        This Week
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TimeFilter;
