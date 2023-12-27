/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { TweetDto, listAll } from "../../../config/services/tweet.service";
import { LikeCreateDto } from "../../../config/services/like.service";
import { UserDto } from "../../../config/services/user.service";


interface TweetListType {
    token: any;
    id: string;
    content: string;
    idUser: string;
    authorTweet: string;
    avatarTweet?: string
    likes: LikeCreateDto[];
    type?: "N" | "R"
    tweeetOriginal?: TweetDto
    reTweet: TweetDto[]
    user: UserDto,
}

interface TweetState {
    data: TweetListType[] | undefined,
    loading: boolean
}

const initialState: TweetState = {
    data: [],
    loading: false
};

export const getTweets = createAsyncThunk('getTweets', async () => {
    const result = await listAll()

    try {
        if (result.code === 200) {
            return result?.data
        }
    } catch (error) {
        return {
            ok: false,
            code: 500,
            message: "Erro ao listar tweets"
        }
    }
})


const tweetSlice = createSlice({
    name: 'tweets',
    initialState,
    reducers: {
        clearState: () => {
            return initialState;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(getTweets.pending, (state) => {
            state.loading = true
            return state
        });
        builder.addCase(getTweets.fulfilled, (state) => {
            state.loading = false
            state.data?.map(item => item)
            return state
        })
    }
});

export const { clearState } = tweetSlice.actions;
export default tweetSlice.reducer;