import {createSelector} from "@reduxjs/toolkit";

export const userSelector = createSelector(store => store.persistedReducer.user, item => item)
export const findUserSelector = createSelector(store => store.persistedReducer.findUsers, item => item)
export const getChatSelector = createSelector(store => store.persistedReducer.getChat, item => item)
export const getGroupSelector = createSelector(store => store.persistedReducer.getGroup, item => item)

