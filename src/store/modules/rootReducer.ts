import { combineReducers } from '@reduxjs/toolkit';
import listTweetSlice from './tweets/listTweet.slice';

export default combineReducers({
    tweets: listTweetSlice
});