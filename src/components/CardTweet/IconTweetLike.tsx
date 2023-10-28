import '../../App.css'
interface IconTweetComentProps {
    iconLike?: string;
    count: number;
    children?: React.ReactNode;
}

const IconTweetLike: React.FC<IconTweetComentProps> = ({ iconLike, count, }) => {

    return (
        <>
            <img className='iconsTweet' style={{ height: '18px', width: '18x' }} src={iconLike} alt="iconTweetLike"></img>
            <div style={{ margin: '0px 0px 0px 18px', fontSize: '16px' }}>{count}</div>
        </>
    )
}

export default IconTweetLike