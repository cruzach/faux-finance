import React from 'react';

const SearchBox = ({ searchChange , handleEnter}) => {

return (
        <div className='pa2'>
            <input 
            className='pa3 ba'
            type='search' 
            placeholder='Symbol' 
            onChange={searchChange}
            onKeyPress={handleEnter}
            />
        </div>
    );
}

export default SearchBox;