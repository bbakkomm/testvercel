const FormWrapRow = ({ type, name, labelText, defaultValue, placeholder, onChange, tonck }) => {
    return (
        <div className='form-row'>
            <label htmlFor={name} className='input-label'>
                {labelText || name}
            </label>
            <div className="input-wrap">
                <input
                    type={type}
                    id={name}
                    name={name}
                    className='input-write'
                    placeholder={placeholder}
                    defaultValue={defaultValue || ''}
                    onChange={onChange}
                    required
                />
                <button type="button" className="btn-small" onClick={tonck}>중복확인</button>
            </div>
        </div>
    );
};
export default FormWrapRow;