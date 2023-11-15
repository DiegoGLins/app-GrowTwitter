/* eslint-disable @typescript-eslint/no-non-null-asserted-optional-chain */
import { useEffect, useState } from "react"
import { TweetDto, listAll } from "../../config/services/tweet.service"
import { FeedBoxStyled } from "./FeedBoxStyled"
import { Box, CircularProgress } from "@mui/material"
import AlertInfo from "../Alerts"
import CardTweet from "../CardTweet"
import { UserDto, getUserById } from "../../config/services/user.service"

interface FeedBoxProps {
    children?: React.ReactNode
}

export const FeedBox: React.FC<FeedBoxProps> = ({ children }) => {

    const [allTweets, setAllTweets] = useState<TweetDto[]>([])
    const [loading, setLoading] = useState(false)
    const [userlogged, setUserLogged] = useState<UserDto>()
    const [error, setError] = useState('Nenhum tweet para listar');

    useEffect(() => {
        async function getTweetsUser() {
            setLoading(true)
            const response = await listAll()
            if (response.code !== 200) {
                setError(response?.message!)
                return
            }
            setAllTweets(response?.data!)
            setLoading(false)

        }
        getTweetsUser()
    }, [])

    useEffect(() => {
        async function getUserLogged() {
            const response = await getUserById()
            if (response.code !== 200) {
                setError(response?.message!)
                return
            }
            setUserLogged(response?.data!)
        }
        getUserLogged()
    }, [])

    const findAvatar = allTweets.find(item => item.user.avatar === userlogged?.avatar)?.user.avatar
    console.log(findAvatar)

    return (
        <>
            <FeedBoxStyled>
                {loading ?
                    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', paddingTop: '60px' }}>
                        <CircularProgress />
                    </Box>
                    : !allTweets.length ? <AlertInfo><strong>{error}</strong></AlertInfo> : allTweets.map((item, index) => (
                        <CardTweet index={index} key={item.id} tweet={item} name={item.user.name} avatarTweet={item.user.avatar} />
                    ))}
                {children}
            </FeedBoxStyled>
        </>
    )
}
