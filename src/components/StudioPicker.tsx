import React, { ChangeEvent } from 'react';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import { Studio } from '../api';

interface StudioPickerProps {
  selectedStudio: Studio;
  selectStudio: (s: Studio) => void;
}

const StudioPicker: React.FC<StudioPickerProps> = ({
  selectedStudio,
  selectStudio,
}) => {
  function handleChange(event: ChangeEvent<{ value: unknown }>): void {
    selectStudio(event.target.value as Studio);
  }

  return (
    <FormControl /* className={classes.formControl} */>
      <FormHelperText>Velg studio</FormHelperText>
      <Select
        value={selectedStudio}
        onChange={handleChange}
        displayEmpty
        /* className={classes.selectEmpty} */
        inputProps={{ 'aria-label': 'Without label' }}
      >
        <MenuItem value='' disabled>
          Velg studio
        </MenuItem>
        <MenuItem value={Studio.Studio1}>Studio 1</MenuItem>
        <MenuItem value={Studio.Studio2}>Studio 2</MenuItem>
        <MenuItem value={Studio.Autoavvikler}>Autoavvikler</MenuItem>
      </Select>
    </FormControl>
  );
};

export default StudioPicker;
