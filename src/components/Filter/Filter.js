import React from 'react';
import PropTypes from 'prop-types';
import './Filter.module.css';

const Filter = ({ filter, onChange }) => {
    return (
        <div>
            <p>Find contacts by name</p>
            <label>
                <input type='text'value={filter} onChange={onChange}></input>
            </label>
        </div>
    )
}
Filter.propTypes = {
    filter: PropTypes.string.isRequired,
    onChange:PropTypes.func.isRequired
}
export default Filter