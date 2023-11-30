import '../../App.css'
interface IconTweetComentProps {
    iconLike?: string;
    count: number;
    children?: React.ReactNode;
}

const IconTweetLike: React.FC<IconTweetComentProps> = ({ iconLike, count, }) => {

    return (
        <>
            <img className='iconsTweet' style={{ height: '15px', width: '15x' }} src={iconLike} alt="iconTweetLike"></img>
            <div style={{ margin: '0px 0px 0px 8px', fontSize: '16px' }}> {count}</div>
        </>
    )
}

export default IconTweetLike