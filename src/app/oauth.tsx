"use client"
import { Box, dynamicObject, useDB } from '@zuzjs/ui';
import React, { useCallback, useEffect } from 'react';
import Cookies from "js-cookie"
import { LocalDB, SESS_ID } from '@/config';
import { User } from '@/types';
import { useStore } from '@zuzjs/store';

const Authenticate : React.FC = (props) => {

    const { insert, getByID } = useDB(LocalDB.you)
    const { dispatch } = useStore<User>(`user`)

    const oauth = async () => {

        getByID<User>(`you`, Cookies.get(SESS_ID)!)
            .then((you) => {
                dispatch({ ...you, loading: false })
            })
            .catch((err) => {
                dispatch({ loading: false, ID: null })
            })

    }

    useEffect(() => { oauth() }, [])

    return null
}

export default Authenticate;