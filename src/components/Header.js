import React from 'react';
import Search from './Search';

export default function Header({ searchCity }) {

    return ( 

        <header className="Header">
            <Search searchCity = { searchCity } /> 
        </header>
        
    );

}