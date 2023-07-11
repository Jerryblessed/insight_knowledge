import React, { useState, useEffect } from 'react'
import './Home.css'
import { StyledFirebaseAuth } from 'react-firebaseui'
import firebase from '../firebase/firebase'
import LoadingScreen from './LoadingScreen'

const Home = ({ setUser }) => {
	const [loading, setLoading] = useState(true)
	var uiConfig = {
		signInflow: 'popup',
		signInOptions: [
			firebase.auth.GoogleAuthProvider.PROVIDER_ID,
			firebase.auth.FacebookAuthProvider.PROVIDER_ID,
			firebase.auth.EmailAuthProvider.PROVIDER_ID,
		],
		callbacks: {
			signInSuccessWithAuthResult: () => false,
		},
	}
	useEffect(() => {
		let isMounted = true
		firebase.auth().onAuthStateChanged((user) => {
			// setIsLoggedIn(!!user)
			if (user && isMounted) {
				setUser({
					uid: firebase.auth().currentUser.uid,
					name: firebase.auth().currentUser.displayName,
					email: firebase.auth().currentUser.email,
				})
				console.log('User Logged In')
			} else {
				console.log('User Signed Out')
				setUser({})
			}
			console.log('auth change')
			if (isMounted) setLoading(false)
		})
		return () => (isMounted = false)
	}, [setUser])
	return (
		<>
			{loading ? (
				<LoadingScreen />
			) : (
				<div id='Home'>
					<div id='logo'>
						<div id='logo-name'>
							<b>Insight</b>Quiz
						</div>
						<div id='description'>
						InsightQuiz empowers one to create engaging trivia quizzes, personality tests, 
						polls, and surveys, all in one place hence fostering interactive learning experiences.

						</div>
					</div>

					<div id='login-card'>
						<label className='login-label'>
							<b>I</b>
						</label>
						<StyledFirebaseAuth
							borderRadius='40px'
							uiConfig={uiConfig}
							firebaseAuth={firebase.auth()}
						/>
					</div>
				</div>
			)}
		</>
	)
}

export default Home
