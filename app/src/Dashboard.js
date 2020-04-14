import React, {useState, useEffect} from 'react';
import { request } from './services/Request';
import { Row, Col, Container } from 'react-bootstrap';

export const Dashboard = () => {

	const [userData, setUserData] = useState({});

	useEffect(()=>{
		request('/api/users/me',{})
		.then(
			(result) => {
				console.log(result);
				setUserData(result.data);
			}
		);	
	}, []);

	const deleteAccount = () => {
		request('/api/users/remove', {
			method: 'DELETE'
		}).then( (result) => {
			if(result.error){
				alert('There was an error removing the selected user. Please try again.');
			}else{
				window.location.href = '/login';
			}
		});	
	};

	const regenerateAPI = () => {
		request('/api/users/generateApi', {
		}).then( (result) => {
			if(result.error){
				alert('There was an error regenerating the api key. Please try again.');
			}else{
				window.location.reload();
			}
		});	
	};

	return (
		<Container>
		    <div>
		        <h2> User Dashboard </h2>  
		        <Row>
		        	<Col><b>Full Name:</b></Col>
		        	<Col>{ userData.firstName +' '+ userData.lastName }</Col>
		        </Row>
		        <Row>
		        	<Col><b>Email:</b></Col>
		        	<Col>{ userData.email }</Col>
		        </Row>
		        <Row>
		        	<Col><b>API Key:</b></Col>
		        	<Col>{ userData.apiKey }</Col>
		        </Row>
		        <Row>
		        	<Col><b>Subscription Level:</b></Col>
		        	<Col>{ userData.permissionLevel }</Col>
		        </Row>
		        <br/>	
		        <Row>
		        	<Col>
		        		<a href="/profile/user" className="btn btn-info">Update information</a>
		        	</Col>
		        	<Col>
		        		<a href="/profile/password" className="btn btn-info">Change password</a>
		        	</Col>
		        	<Col>
		        		<button className="btn btn-warning" onClick={regenerateAPI}>Regenerate API Key</button>
		        	</Col>
		        	<Col>
		        		<button className="btn btn-danger" onClick={deleteAccount}>Delete account</button>
		        	</Col>
		        </Row>
		    </div>
		</Container>
	);

}