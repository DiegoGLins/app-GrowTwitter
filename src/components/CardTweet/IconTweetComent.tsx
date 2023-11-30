import '../../App.css'
interface IconTweetComentProps {
    iconResponse?: string;
    count: number;
    children?: React.ReactNode;
    index: number
}

const IconTweetComent: React.FC<IconTweetComentProps> = ({ iconResponse, count, index }) => {

    return (
        <>
            <button value={index} style={{ border: 'none', backgroundColor: '#fff' }}>
                <img className='iconsTweet' style={{ height: '15px', width: '15x' }} src={iconResponse} alt="iconTweetComent"></img>
            </button>
            <div style={{ margin: '0px 0px 0px 8px', fontSize: '16px' }}>{count}</div>
        </>
    )
}

export default IconTweetComent