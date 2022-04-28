import {React, useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../components/Spinner';

const Countries = () => {
    const [countries, setCountries] = useState([]);

    useEffect(() => {
		async function fetchData () {
			try {
				let response = await fetch(`https://restcountries.com/v3.1/all`);
				let result = await response.json();
				setCountries(result);
			} catch (error) {
				console.log(error);
			} 
				
		} 
		fetchData();
    })

    return (
        <div className='container-fluid'>
			{
				<div className="row">
					{
						countries.length > 0 && countries.map((country) => {
							return (
								<div className="col-sm-12 col-md-6 my-4" key={country.name.common}>
									<div className="card shadow mb-4">
										<div className="card-header py-3">
												<h5 className="m-0 font-weight-bold text-gray-800">{country.name.common}</h5>
										</div>
										<div className="card-body">
											<div className="text-center">
												<img 
													className="img-fluid px-3 px-sm-4 mt-3 mb-4" 
													src={country.flags.svg}
													alt={country.name.common} 
													style={{ width: '90%', height: '400px', objectFit: 'fill' }} 
												/>
											</div>
										</div>
										<div className='p-3'>
											<button className='btn btn-dark'>
												<Link style={{color: 'white', textDecoration: 'none'}} to={`/country/${country.name.common}`}>Click info</Link>
											</button>
										</div>
									</div>
								</div>
							)
						})
					}
					{
						countries.length === 0 && <Spinner/>
					}
				</div>
			}
    	</div>
    );
}

export default Countries;