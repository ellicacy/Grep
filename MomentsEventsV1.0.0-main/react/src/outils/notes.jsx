import React from "react";
import { Grid } from "@mui/material";
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';

export const notes = (note) => {
    let stars = [];
    const MAX_STARS = 5;
    for (let i = 0; i < MAX_STARS; i++) {
        if (i < Math.floor(note)) {
            // filled star
            stars.push(
                <BsStarFill key={i} size={'16px'} />
            );
        } else if (i === Math.floor(note) && note % 1 >= 0.25 && note % 1 <= 0.75) {
            // half-filled star
            stars.push(
                <BsStarHalf key={i} size={'16px'} enableBackground='grey' />

            );
        } else if (i === Math.floor(note) && note % 1 >= 0.75) {
            // half-filled star
            stars.push(
                <BsStarFill key={i} size={'16px'} />

            );
        } else {
            // empty star
            stars.push(
                <BsStar key={i} size={'16px'} />
            );
        }
    }

    return (
        <>
            {stars}
        </>
    );
};
