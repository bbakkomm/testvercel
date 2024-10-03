import { useEffect, useState } from 'react';
import { redirect, useLoaderData, useNavigate } from 'react-router-dom';

// api
import customFetch from "../utils/customFetch.js";

import SearchBtn from '../components/common/header/component/SearchBtn';
import StudyCard from '../components/common/studycard/CommonStudyCard';
import SearchNotFound from '../components/common/studycard/SearchNotFound';

// icon
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';

export const loader = async ({ req }) => {
	try {
		const resUser = await customFetch.get('/users/current-user', req);
		const res = await customFetch.get('/study', req);
		return [res.data, resUser];
	} catch (error) {
		console.log(error);
		return redirect('/login');
	}
}

function Study() {
	const loadData = useLoaderData();
	let { studys } = loadData[0];

	studys = [...studys].reverse();
	const cloneLatest = [...studys];

	const [studyCard, setStudyCard] = useState(studys);
	const [search, setSearch] = useState('');
	const [studyTab, setStudyTab] = useState('all');
	const [studySort, setStudySort] = useState('latest'); // latest: 최신순, like: 좋아요순

	const studyList = studyCard.map((item, idx)=>{
		return (
			<StudyCard 
				studyType={'all'}
				key={`study_${idx}`}
				objId={item._id}
				idx={idx}
				title={item.title}
				thumb={item.thumb}
				startDate={item.startDate}
				endDate={item.endDate}
				time={item.time}
				place={item.place}
				price={item.price}
				minimumPerson={item.minimumPerson}
				maximumPerson={item.maximumPerson}
				skillTag={item.skillTag}
				complete={item.complete}
				status={item.status}
				name={item.name}
				location={item.loaction}
				cost={item.cost}
				like={item.like}
			/>      
		)
	});

	useEffect(()=>{
		if (studySort === "latest") {
			studys = cloneLatest;
		} else {
			studys = studys.sort((a,b) => b.like.length - a.like.length);
		}

		const filter = studys.filter((item)=>{
			const searchValue = item.title.toLowerCase().includes(search.toLowerCase());

			if (studyTab === 'open') {
				return !item.complete && searchValue;
			} else if (studyTab === 'close') {
				return item.complete && searchValue;
			}

			return searchValue;
		});

		setStudyCard(filter);
	}, [search, studyTab, studySort]);

	const titleChange = (e)=>{
		setSearch(e.target.value)
	}

return (
	<div className="study-wrap">
		<div className="search-box">
			<SearchBtn/>
			<input type="text" value={search} placeholder="원하는 스터디를 찾아보세요!" onChange={titleChange} className="search-box__input" />
		</div>
		<div className="menu-box">
			<button className={'menu-box__item' + (studyTab === "all" ? " active" : "")} onClick={()=>{setStudyTab("all")}} >전체</button>
			<button className={'menu-box__item' + (studyTab === "open" ? " active" : "")} onClick={()=>{setStudyTab("open")}} >모집중</button>
			<button className={'menu-box__item' + (studyTab === "close" ? " active" : "")} onClick={()=>{setStudyTab("close")}} >완료</button>
		</div>
		<div className="study-header">
			<div className="study-header__length">
				<span className="study-header__length--desc">전체 </span>
				<span className="study-header__length--total">{studyCard.length}</span>
				<span className="study-header__length--desc">개</span>
			</div>
			<div className="study-header__sort">
				<button className="study-header__sort--total" onClick={() => {studySort === "latest" ? setStudySort("like") : setStudySort("latest")}}>
					{studySort === "latest" ? "최신순" : "좋아요순"}
					<KeyboardArrowDownOutlinedIcon />
				</button>
			</div>
		</div>
		{
			studyCard.length === 0 ? <SearchNotFound /> : studyList
		}
	</div>
	)
}

export default Study