import '../../App.css'
interface IconTweetComentProps {
    iconResponse?: string;
    count: number;
    children?: React.ReactNode;
}

const IconTweetComent: React.FC<IconTweetComentProps> = ({ iconResponse, count, }) => {

    return (
        <>
            <img className='iconsTweet' style={{ height: '18px', width: '18x' }} src={iconResponse} alt="iconTweetComent"></img>
            <div style={{ margin: '0px 0px 0px 18px', fontSize: '16px' }}>{count}</div>
        </>
    )
}

export default IconTweetComent