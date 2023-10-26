import { FeedBoxStyled } from "./FeedBoxStyled"

interface FeedBoxProps {
    children?: React.ReactNode
}

const FeedBox: React.FC<FeedBoxProps> = ({ children }) => {
    return (
        <>
            <FeedBoxStyled>
                {children}
            </FeedBoxStyled>
        </>
    )
}

export default FeedBox