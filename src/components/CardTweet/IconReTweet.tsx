import '../../App.css'
interface IconReTweetProps {
    iconReTweet?: string;
    count: number;
    children?: React.ReactNode;
}

const IconReTweet: React.FC<IconReTweetProps> = ({ iconReTweet, count, }) => {

    return (
        <>
            <img className='iconsTweet' style={{ height: '15px', width: '15x' }} src={iconReTweet} alt="ReTweet"></img>
            <div style={{ margin: '0px 0px 0px 8px', fontSize: '16px' }}>{count}</div>
        </>
    )
}

export default IconReTweet