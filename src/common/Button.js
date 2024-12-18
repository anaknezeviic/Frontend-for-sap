import React from 'react';
import Button from '@mui/material/Button';
import '../styles/Button.css';

export default function ContainedButtons() {
    function handleClick() {
        console.log("Clicked.")
    }
    return (
        <div class = 'container'>
            <Button
                variant="contained"
                onClick={handleClick}
            >
                Add insurance product
            </Button>
        </div>

    );
}