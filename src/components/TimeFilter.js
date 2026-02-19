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
      <ToggleButton id="tbg-day" value="day" variant="outline-light" size="sm">
        Today
      </ToggleButton>
      <ToggleButton id="tbg-day" value="day" variant="outline-light" size="sm">
        This Week
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TimeFilter;
