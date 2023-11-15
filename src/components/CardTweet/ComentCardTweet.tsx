

interface ComentCardTweetProps {
    nameUserReTweet: string | string[]
    avatarReTweet: string
}

const ComentCardTweet: React.FC<ComentCardTweetProps> = ({ avatarReTweet, nameUserReTweet }) => {

    return (
        <div style={{ display: 'flex', borderTop: '1.7px solid #e9e9e9', borderBottom: '1.7px solid #e9e9e9', borderBottomStyle: 'inset', width: '99%', padding: '6px 0px 0px 0px' }}>
            <img style={{ height: '22px', width: '22px', borderRadius: '100%', border: '1px solid #5c534d', margin: '0px 3px 8px 15px' }} src={avatarReTweet} alt='avatar'></img>
            <p style={{ maxWidth: '200px', minHeight: '15px', padding: '2px 0px 0px 5px' }}><strong>{nameUserReTweet.length > 2 ? `${nameUserReTweet[0]} e mais ${nameUserReTweet.length - 1} pessoas` : nameUserReTweet.length > 1 ? `${nameUserReTweet[0]} e mais ${nameUserReTweet.length - 1} pessoa` : nameUserReTweet}</strong> </p>
            <p style={{ padding: '2px 0px 0px 8px' }}>{nameUserReTweet.length > 2 ? 'comentaram isso' : 'comentou'}</p>
        </div>
    )
}

export default ComentCardTweet