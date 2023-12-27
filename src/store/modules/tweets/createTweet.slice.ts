/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { create } from "../../../config/services/tweet.service";

interface TweetCreateType {
    content: string;
    idUser: string;
    type: "N";
    usernameAuthorTweet?: string
    token: string
}

interface TweetCreateState {
    data: TweetCreateType,
    loading: boolean
}
const initialState: TweetCreateState = {
    data: {} as TweetCreateType,
    loading: false
};

export const getTweets = createAsyncThunk('getTweets', async (tweet: TweetCreateType) => {
    const result = await create(tweet)

    try {
        if (result.code === 201) {
            return result.data
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
    name: 'createTweet',
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
        })
    }
});

export const { clearState } = tweetSlice.actions;
export default tweetSlice.reducer;