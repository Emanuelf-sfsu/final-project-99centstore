import React, { useState } from 'react';
import './CreateListing.css';
const CreateListing = (props) => {
    // Only accessible by Admin
    // Create a Listing here
    const [value,setValue] = useState(props.name);
    const handleChange = (e) => {
        setValue(e.target.value);
        console.log(e.target.value);
    };

    return (
        <form>
            <label for='listingName'>Item for sale:</label>
            <input type="text" id='listingName' name="listingName" placeholder='Product Name'/>
            
            <p>
                <textarea value={value} onChange={handleChange} id='description' placeholder='Enter a Description . . .'name='description'/>
            </p>
            <p name='price'>
                $ <input name="price" />
            </p>
            <label>
                
                <input type="file" name="imageFile" />
            </label>

            
            <div class='row'>
                <input type='submit' value='Submit' />
            </div>

        </form>
    )
};

export default CreateListing;
