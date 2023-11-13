

interface ComentCardTweetProps {
    nameUserReTweet: string
    avatarReTweet: string
}

const ComentCardTweet: React.FC<ComentCardTweetProps> = ({ avatarReTweet, nameUserReTweet }) => {

    return (
        <div style={{ display: 'flex', borderBottom: '1.7px solid #e9e9e9', borderBottomStyle: 'inset', width: '99%' }}>
            <img style={{ height: '22px', width: '22px', borderRadius: '100%', border: '1px solid #5c534d', margin: '0px 3px 8px 15px' }} src={avatarReTweet} alt='avatar'></img>
            <p style={{ maxWidth: '105px', minHeight: '15px', padding: '2px 0px 0px 5px' }}><strong>{nameUserReTweet}</strong> </p>
            <p style={{ padding: '2px 0px 0px 8px' }}>comentou isso</p>
        </div>
    )
}

export default ComentCardTweet