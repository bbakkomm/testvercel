import { useState, useEffect } from 'react';
import { Form, useLocation, Navigate, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

import FormRow from '../../components/FormRow';
import customFetch from '../../utils/customFetch.js';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const password = formData.get('password');
  const passconfirm = formData.get('passconfirm');

  const data = Object.fromEntries(formData);
  
  if (password !== passconfirm) {
    toast.error('비밀번호가 틀립니다. 다시 확인해주세요.');
    return null;
  }

  try {
    await customFetch.patch(`/auth/pwreset/${data.tid}`, data);
    toast.success('비밀번호 변경이 완료되었습니다.');
    return redirect('/pwsuccess');
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function PwReset() {
  const { state } = useLocation();
  const [currentState, setCurrentState] = useState(state);

  useEffect(() => {
    setCurrentState(state);
  }, [state]);

  if (currentState === null) return <Navigate to="/Pw" />;

  return (
    <main className="pw">
      <h2 className="pw__title">비밀번호 재설정</h2>

      <Form method='post'>
        {/* pwd */}
        <FormRow type='id' name="tid" defaultValue={currentState !== null ? currentState.data.id : ''} hidden/>

        {/* pwd */}
        <FormRow type='password' name="password" labelText="새 비밀번호를 입력해주세요." placeholder="새 비밀번호"/>
            
        {/* pwd conf */}
        <FormRow type='password' name="passconfirm" labelText="비밀번호 확인해주세요." placeholder="새 비밀번호"/>

        <div className="btn">
          <button type='submit' className="input-submit btn-un">변경하기</button>
        </div>
      </Form>
    </main>
  )
}

export default PwReset