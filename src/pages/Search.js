import {React, useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Search = () => {
	const navigate = useNavigate();
    const [countries, setCountries] = useState([]);
    const [keyword, setKeyword] = useState('');

    const searcher = (e) => {
        e.preventDefault();
        setKeyword(e.target.search.value);
    }

    useEffect(() => {
        if (keyword) {
			async function fetchData () {
				try {
					let response = await fetch(`https://restcountries.com/v3.1/name/${keyword}`);
					let result = await response.json();
					setCountries(result);
					setKeyword('');
				} catch (error) {
					console.log(error);
				} 
				
			} 
			fetchData();
        }	
    }, [keyword]);

    return (
        <div className='container'>
           <form className="d-flex" onSubmit={searcher}>
                <input className="form-control me-2" type="search" name='search' placeholder="Search by country..."/>
                <button className="btn btn-outline-primary" type="submit"><i class="fa-solid fa-magnifying-glass"></i></button>
            </form>
			{
				countries.length > 0?
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
						
												</div>
												<button className='btn btn-dark'>
													<Link style={{color: 'white', textDecoration: 'none'}} to={`/country/${country.name.common}`}>Click info</Link>
												</button>	
											</div>
										</div>
									</div>
								)
							})
						}
						<div>
							<button className='btn btn-dark' onClick={()=>navigate(-1)}>
								<i class="fa-solid fa-rotate-left"></i> Back
            				</button>
						</div>	
					</div>
				:
				<div className="alert alert-danger text-center my-4 fs-2">No results found</div>
			}
		</div>
    );
}

export default Search;
