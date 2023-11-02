import { createContext, useState } from "react";
import { TweetDto } from "../config/services/tweet.service";
// import { UserDto, listUsers } from "../config/services/user.service";

export interface DataType {
    id: string,
    name: string,
    username: string,
    avatar: string,
    token: string
    following: [],
    followers: [],
    tweets: TweetDto[],
    reTweet: []
}

interface UserProviderProps {
    children: React.ReactNode
}

interface DataContextType {
    data: DataType | null;
    setData: (value: DataType) => void
}

const DataContext = createContext<DataContextType | null>(null)

const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
    const [data, setData] = useState<DataType | null>(null)
    return (
        <DataContext.Provider value={{ data, setData }}>{children}</DataContext.Provider>
    )
}

export { DataContext }
export default UserProvider