import React from 'react';

const ThirdStep = ( { setSelectedTime, selectedFilm } ) => {
    return (
        <div>
            {'Third step'} <br />
            {selectedFilm?.title}
        </div>
    );
};

export default ThirdStep;
