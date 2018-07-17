import React, { Component } from 'react'
import { connect } from 'react-redux'
import { formatTweet, formatDate } from '../utils/helpers'
import TiArrowBackOutline from 'react-icons/lib/ti/arrow-back-outline'
import TiHeartOutline from 'react-icons/lib/ti/heart-outline'
import TiHeartFullOutline from 'react-icons/lib/ti/heart-full-outline'
import { handleToggleTweet } from '../actions/tweets.js'
import { Link, withRouter } from 'react-router-dom'

class Tweet extends Component {

	handleLiked = (e) => {
		e.preventDefault()

		const { dispatch, tweet, authedUser } = this.props
		dispatch(handleToggleTweet({
			id: tweet.id,
			hasLiked: tweet.hasLiked,
			authedUser
		}))
	}

	toParent = (e, id) => {
		e.preventDefault()

		this.props.history.push(`/tweet/${id}`)
	}

	render() {
		const { tweet } = this.props

		if (tweet === null) {
			return <p>This Tweet does't existed</p>
		}

		const {
			name, avatar, timestamp, text, hasLiked, likes, repiles, id, parent
		} = tweet

		return (
			<Link to={`/tweet/${id}`} className='tweet'>
				<img
					src={avatar}
					alt={`Avatar of ${name}`}
					className='avatar'
				/>
				<div className='tweet-info'>
					<div>
						<span>{name}</span>
						<div>{formatDate(timestamp)}</div>
						{parent && (
							<button className='replying-to' onClick={(e) => this.toParent(e, parent.id)}>
								Replying to @{parent.author}
							</button>
						)}
						<p>{text}</p>
					</div>
					<div className='tweet-icons'>
						<TiArrowBackOutline className='tweet-icon'/>
						<span>{repiles !== 0 && repiles}</span>
						<button className='heart-button' onClick={this.handleLiked}>
							{hasLiked === true
								? <TiHeartFullOutline color='#e0245e' className='tweet-icon'/>
								: <TiHeartOutline className='tweet-icon'/>
							}
						</button>
						<span>{likes !== 0 && likes}</span>
					</div>
				</div>
			</Link>
		)
	}
}

function mapStateToProps({ authedUser, users, tweets }, { id }) {
	// body...
	const tweet = tweets[id]
	const parentTweet = tweets[tweet.replyingTo]

	return {
		authedUser,
		tweet: tweet
			? formatTweet(tweet, users[tweet.author], authedUser, parentTweet)
			: null
	}
}

export default withRouter(connect(mapStateToProps)(Tweet))