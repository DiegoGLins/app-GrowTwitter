import { IconsTweetStyled } from "./IconsTweetStyled";
import '../../App.css'

interface IconTweetProps {
    iconComent: string;
    iconLike: string
    countComent: number;
    countLike: number
    children?: React.ReactNode;
}

const IconsTweet: React.FC<IconTweetProps> = ({ iconComent, iconLike, countComent, countLike }) => {
    return (
        <>
            <IconsTweetStyled>
                <img className='iconComent' style={{ height: '18px', width: '18x' }} src={iconComent} alt="iconTweetComent"></img>
                <div style={{ margin: '0px 0px 0px 8px', fontSize: '16px' }}>{countComent}</div>
            </IconsTweetStyled>
            <IconsTweetStyled>
                <img className='iconLike' style={{ height: '17px', width: '17px' }} src={iconLike} alt="iconTweetLike"></img>
                <div style={{ margin: '0px 0px 0px 8px', fontSize: '16px' }}>{countLike}</div>
            </IconsTweetStyled>
        </>
    )
}

export default IconsTweet