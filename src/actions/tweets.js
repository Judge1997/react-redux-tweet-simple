import { saveLikeToggle, saveTweet } from '../utils/api'
import { showLoading, hideLoading } from 'react-redux-loading'

export const RECEIVE_TWEETS = 'RECEIVE_TWEETS'
export const TOGGLE_TWEET = 'TOGGLE_TWEET'
export const ADD_TWEET = 'ADD_TWEET'

export function receiveTweets(tweets) {
	// body...
	return {
		type: RECEIVE_TWEETS,
		tweets,
	}
}

function toggleTweet({ id, authedUser, hasLiked }) {
	// body...
	return {
		type: TOGGLE_TWEET,
		id,
		authedUser,
		hasLiked
	}
}

function addTweet(tweet) {
	// body...
	return {
		type: ADD_TWEET,
		tweet
	}
}

export function handleToggleTweet(info) {
	// body...
	return (dispatch) => {
		dispatch(toggleTweet(info))

		return saveLikeToggle(info)
			.catch((e) => {
				console.warm('Error in handleToggleTweet: ', e)
				dispatch(toggleTweet(info))
				alert('The was an error liking the tweet, Try again.')
			})
	}
}

export function handleAddTweet(text, replyingTo) {
	// body...
	return (dispatch, getState) => {
		const { authedUser } = getState()
		dispatch(showLoading())

		return saveTweet({
			text,
			author: authedUser,
			replyingTo
		})
		.then((tweet) => {
			return dispatch(addTweet(tweet))
		})
		.then(() => dispatch(hideLoading()))
		// .catch((e) => {
		// 	console.warm('Error in handleAddTweet: ', e)
		// 	dispatch(toggleTweet(info))
		// 	alert('The was an error adding the tweet, Try again.')
		// })
	}
}