function Member(props) {
    const {member, create} = props;
    // console.log(member._id, create);

    return (
        <li className="member__item">
            <img src={ member.thumb } alt={ member.name } className="member__img"/>
            <div className="member__info">
                <div className="member__data">
                    <p className="member__title">{member.name}</p>
                    { member._id === create ? (<span className="member__status">★</span>) : ('')}
                </div>
                <p className="member__text">{ member.introduce }</p>
            </div>
        </li>
    );
}

export default Member