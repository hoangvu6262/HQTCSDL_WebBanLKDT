import React, { useEffect} from 'react';
import { GetAllUser } from '../../../redux/actions/user.action';
import { useSelector, useDispatch } from "react-redux";


export default function User() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GetAllUser());
    })

    return (
        <div>user</div>
    );
}