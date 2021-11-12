import * as React from 'react';
import Checkbox from '@mui/material/Checkbox';
import {alpha, styled} from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import {Chip} from "@mui/material";
import {useEffect} from "react";

const icon = <CheckBoxOutlineBlankIcon fontSize="small"/>;
const checkedIcon = <CheckBoxIcon fontSize="small"/>;

export default function CheckboxesTags({categoriesList, setCategories, actualCategories}) {
    const CustomField = styled(TextField)({
        '& label.Mui-focused': {
            color: 'green',
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'red',
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    });
    useEffect(()=>{},[actualCategories])
    return (
        <Autocomplete
            onChange={(e, getTagProps) => {
                setCategories(getTagProps)
            }}
            multiple
            id="tags-filled"
            options={categoriesList}
            defaultValue={actualCategories}
            freeSolo
            renderTags={(value, getTagProps) =>
                value.map((option, index) => (
                    <Chip variant="outlined" label={option} {...getTagProps({index})} />
                ))

            }
            renderInput={(params) => (
                <CustomField
                    {...params}
                    label="Catégories*"
                    placeholder="Ecrire une catégorie..."
                />
            )}
        />
    );
}
