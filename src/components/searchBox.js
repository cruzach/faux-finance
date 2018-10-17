import React from 'react';

const SearchBox = ({ searchChange}) => {

return (
        <div className='pa2'>
            <input 
            className='pa3 ba'
            type='search' 
            placeholder='Symbol' 
            onKeyPress={searchChange}
            />
        </div>

    );

    

    
}

export default SearchBox;