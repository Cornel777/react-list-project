import { useState, useRef } from 'react';
import { TextField, IconButton } from '@mui/material';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { StyledTableCell } from "../CharacterList/styled/styledListTable";
import { Character } from "../../types/Character";

interface EditableCellProps {
  value: string;
  field: 'height' | 'gender';
  favorite: Character;
  isFocused: boolean;
  onSave: (favorite: Character, value: string, field: string) => void;
}

const EditableCell: React.FC<EditableCellProps> = ({ 
  value, 
  field, 
  favorite, 
  isFocused,
  onSave 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleEdit = () => setIsEditing(true);
  
  const handleSave = (newValue: string) => {
    onSave(favorite, newValue, field);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && inputRef.current) {
      handleSave(inputRef.current.value);
    }
    if (e.key === 'Escape') {
      setIsEditing(false);
    }
  };

  return (
    <StyledTableCell
    >
      {isEditing ? (
        <TextField 
          inputRef={inputRef}
          defaultValue={value}
          onBlur={(e) => handleSave(e.target.value)}
          onKeyDown={handleKeyDown}
          autoFocus
          size="small"
        />
      ) : (
        <>
          {value}
          {isFocused && (
            <IconButton
              aria-label={`edit ${field}`}
              sx={{ marginLeft: '0.5rem' }}
              onClick={handleEdit}
            >
              <ModeEditIcon />
            </IconButton>
          )}
        </>
      )}
    </StyledTableCell>
  );
};

export default EditableCell;