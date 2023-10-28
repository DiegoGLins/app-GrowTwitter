/* eslint-disable @typescript-eslint/no-explicit-any */
import apiService from "./api.service"

export interface UserDto {
    id: string,
    name: string,
    username: string,
    email: string
    password: string,
    token?: string,
    following: []
    followers: []
    tweets: []
    reTweet: []
}

export async function listUsers() {
    try {
        const response = await apiService.get('users')
        const users = response.data.data.map((item: UserDto) => {
            return {
                id: item.id,
                name: item.name,
                username: item.username,
                email: item.email,
                tweets: item.tweets,
                reTweet: item.reTweet
            }
        })
        return { users }

    } catch (error: any) {
        throw new Error(error.response.data.message)
    }
}