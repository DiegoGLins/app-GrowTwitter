import { FeedBoxStyled } from "./FeedBoxStyled"

interface FeedBoxProps {
    children?: React.ReactNode
}

export const FeedBox: React.FC<FeedBoxProps> = ({ children }) => {
    return (
        <>
            <FeedBoxStyled>
                {children}
            </FeedBoxStyled>
        </>
    )
}
