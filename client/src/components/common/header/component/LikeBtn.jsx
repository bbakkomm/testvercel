import { useState } from 'react';
import { Link, redirect, useLoaderData, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import customFetch from '../../../../utils/customFetch.js';

import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';

export const loader = async ({ req }) => {
    try {
        const res = await customFetch.get(`/users/current-user`, req);

        return res;
    } catch (error) {
        console.log(error);
    //   return redirect('/study');
    }
}

function LikeBtn(props) { 
    const { pagetype } = props;
    const currentLocation = useLocation().pathname;
    const navigate = useNavigate();
    const loadData = useLoaderData();
    
    let getStudy = {}
    let getCurrentUser = {}
    if (pagetype === 'detail') {
        getStudy = loadData[0];
        getCurrentUser = loadData[2];
    }

    const getStudyId = sessionStorage.getItem('singleStudyValue');
    const userId = getCurrentUser._id;

    let likeArr = getStudy.study.like;
    let isLikeUser = getStudy.study.like.includes(userId);

    // 좋아요 버튼
    const likeHandler = async (e) => {
        e.preventDefault();
        let likeState = '';

        try {
            if (!isLikeUser) {
                likeArr.push(userId);
                likeState = '찜 추가되었습니다.';
            } else {
                likeArr = likeArr.filter(value => value !== userId);
                likeState = '찜 해제되었습니다.';
            }

            let formData = { like: likeArr }
            const res = await customFetch.patch(`/study/${getStudyId}`, formData);

            toast.success(likeState);
            navigate(currentLocation);
        } catch (error) {
            toast.error(error?.response?.data?.msg);
            return error;
        }
    }

    return (
        <button className="header__like" onClick={likeHandler}>
            {isLikeUser ? <FavoriteOutlinedIcon className="like__icon" /> : <FavoriteBorderOutlinedIcon className="like__icon" />}
        </button>
    );
}

export default LikeBtn;