import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Country {
  name: string;
  population: number;
  region: string;
  capital: string;
  flag: string;
}

const Country = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('https://restcountries.com/v2/all');
        setCountries(response.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  console.log(React)
  return (
    <div className='bg-[#FAFAFA;]'>
      <header className='flex justify-between w-full h-[80px] bg-[#FFF;]'>
        <h1 className='text-2xl font-sans font-extrabold pt-[23px] pl-[80px] text-black '>Where in the world?</h1>
        <h2 className='text-black font-semibold text-base font-sans mt-[29px] mr-[80px] cursor-pointer'>&#9790;Dark Mode</h2>
      </header>
      <input
        className='w-[480px] h-[56px] bg-[#FFF;] mt-[48px] ml-[80px]'
        type="text"
        placeholder=' -  Search for a country…'
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <div className="grid grid-cols-4 gap-x-10 gap-y-10 pl-[80px] pr-[80px] pt-[200px]">
        {filteredCountries.map((country, index) => (
          <div key={index} className="bg-[#FFF] p-4 cursor-pointer">
            <img src={country.flag} alt={country.name} className="w-full h-auto" />
            <p className="text-lg font-semibold">Name: {country.name}</p>
            <p>Population: {country.population}</p>
            <p>Region: {country.region}</p>
            <p>Capital: {country.capital}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Country;
