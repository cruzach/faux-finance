import React from 'react';

const SearchBox = ({ searchChange , handleEnter, value}) => {

return (
        <div className='pa2'>
            <input 
            className='pa3 ba'
            type='search' 
            placeholder='Symbol' 
            onChange={searchChange}
            onKeyPress={handleEnter}
            value = {value}
            />
        </div>
    );
}

export default SearchBox;