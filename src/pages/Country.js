import {React, useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import Spinner from '../components/Spinner';

const Country = () => {
    const {name} = useParams();
    const navigate = useNavigate();
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        if (name) {
			async function fetchData () {
				try {
					let response = await fetch(`https://restcountries.com/v3.1/name/${name}`);
					let result = await response.json();
					setCountries(result);
				} catch (error) {
					console.log(error);
				} 
				
			} 
			fetchData();
        }	
    }, [name]);

    return (
        <div className='container-fluid'>
            
			<div className="row">
				{
					countries.length > 0 && countries.map((country, i) => {
						return (
							<div className="col-sm-12 col-md-12 my-4" key={i}>
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
                                            <ul className="list-group list-group-flush">
                                                <li className="list-group-item">Official name: <b>{country.name.official}</b></li>
                                                <li className="list-group-item">Capital: <b>{country.capital[0]}</b></li>
                                                <li className="list-group-item">Region: <b>{country.subregion}</b></li>
                                            </ul>
										</div>
									</div>
								</div>
								<button className='btn btn-dark' onClick={()=>navigate(-1)}>
									<i class="fa-solid fa-rotate-left"></i> Back
            					</button>
				
							</div>	
						)
					})
				}
				{
					countries.length === 0 && <Spinner/>
				}
			</div>
		</div>
    );
}

export default Country;
