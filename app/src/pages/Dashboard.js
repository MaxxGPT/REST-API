import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from "react-toastify";
import { request } from '../services/Request';
import { Row, Col, Container, Button } from 'react-bootstrap';
import { Line, defaults } from 'react-chartjs-2';

export const Dashboard = () => {

	const [userData, setUserData] = useState({});
	const [usage, setUsage] = useState([]);

	useEffect(() => {
		request('/api/users/me', {})
			.then(
				(result) => {
					setUserData(result.data);
				}
			);
		getUSage();
	}, []);

	const getUSage = () => {
		request('/api/users/usage', {})
			.then(
				(result) => {
					const _data = {
						labels: result.data.map(day => day._id),
						datasets: [{
							label: 'Requests per day',
							borderColor: 'rgba(75,192,192,1)',
							data: result.data.map(day => day.req),
							fill: false,
						}]
					}
					setUsage(_data);
				}
			);
	}

	const redirectToLogin = () => {
		window.location.href = '/login';
	}

	const deleteAccount = () => {
		const response = window.confirm("Are you sure to delete your account?");
		if (response === true) {
			request('/api/users', {
				method: 'DELETE'
			}).then((result) => {
				if (result.error) {
					toast.error('There was an error removing the selected user. Please try again.');
				} else {
					redirectToLogin()
				}
			});
		}
	};

	const regenerateAPI = () => {
		const response = window.confirm("Are you sure to generate a new API key?");
		if (response === true) {
			request('/api/users/generateApi', {
			}).then((result) => {
				if (result.error) {
					toast.error('There was an error removing the selected user. Please try again.');
				} else {
					setUserData((_userdata) => {
						return { ..._userdata, apiKey: result.data.apiKey }
					});
					toast.success('Your API Key has been updated.');
				}
			});
		}
	};

	return (
		<Container>
			<ToastContainer />
			<div>
				<h2> User Dashboard </h2>
				<Row>
					<Col><b>Full Name:</b></Col>
					<Col>{userData.name}</Col>
				</Row>
				<Row>
					<Col><b>Email:</b></Col>
					<Col>{userData.email}</Col>
				</Row>
				<Row>
					<Col><b>API Key:</b></Col>
					<Col>{userData.apiKey}</Col>
				</Row>
				<Row>
					<Col><b>Subscription Level:</b></Col>
					<Col>{userData.subscription}</Col>
				</Row>
				<br />
				<Row>
					{userData.isAdmin &&
						<Col>
							<Button variant="info" href="/sources">Source List</Button>
						</Col>
					}
					<Col>
						<Button variant="info" href="/profile/user">Update information</Button>
					</Col>
					<Col>
						<Button variant="info" href="/profile/password">Change password</Button>
					</Col>
					<Col>
						<Button variant="warning" onClick={regenerateAPI}>Regenerate API Key</Button>
					</Col>
					<Col>
						<Button variant="danger" onClick={deleteAccount}>Delete account</Button>
					</Col>
				</Row>
				<Row>
					<Col>
						<Button variant="info" href="/profile/subscription">Manage Subscription</Button>
					</Col>
				</Row>
				<Row className="mt-5">
					<Col>
						<h2>Usage </h2>
						<Line data={usage} />
					</Col>
				</Row>
			</div>
		</Container>
	);

}

export default Dashboard;