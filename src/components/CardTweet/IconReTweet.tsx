import '../../App.css'
interface IconReTweetProps {
    iconReTweet?: string;
    count: number;
    children?: React.ReactNode;
}

const IconReTweet: React.FC<IconReTweetProps> = ({ iconReTweet, count, }) => {

    return (
        <>
            <img className='iconsTweet' style={{ height: '18px', width: '18x' }} src={iconReTweet} alt="ReTweet"></img>
            <div style={{ margin: '0px 0px 0px 18px', fontSize: '16px' }}>{count}</div>
        </>
    )
}

export default IconReTweet