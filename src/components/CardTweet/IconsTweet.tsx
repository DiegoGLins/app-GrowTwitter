
import '../../App.css'

interface IconTweetProps {
    icon: string;
    count: number;
    children?: React.ReactNode;
}

const IconsTweet: React.FC<IconTweetProps> = ({ icon, count, }) => {

    return (
        <>
            <img className='iconResponse' style={{ height: '18px', width: '18x' }} src={icon} alt="iconTweetComent"></img>
            <div style={{ margin: '0px 0px 0px 18px', fontSize: '16px' }}>{count}</div>
        </>
    )
}

export default IconsTweet