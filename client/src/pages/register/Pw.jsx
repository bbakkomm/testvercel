import { useEffect } from 'react';
import { Form, json, useActionData, useNavigate, } from 'react-router-dom';
import { toast } from 'react-toastify';

import FormRow from '../../components/FormRow';
import customFetch from '../../utils/customFetch.js';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const res = await customFetch.post('/auth/userpw', data);
    // toast.success('id search successful');
    return json({
      data: res,
      redirect: "/pwreset"
    });
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

function Pw() {
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData) {
      const { data, redirect } = actionData;
      navigate(redirect, { state: data, replace: true });
    }
  }, [actionData, navigate]);

  return (
    <main className="pw">
      <h2 className="pw__title">비밀번호 찾기</h2>
      <Form method='post'>
        {/* id */}
        <FormRow type='uid' name="uid" labelText="가입한 아이디를 입력해주세요." placeholder="아이디"/>

        {/* email */}
        <FormRow type='email' name="email" labelText="가입한 이메일을 입력해주세요." placeholder="이메일"/>
      
        <div className="btn">
          <button type='submit' className="input-submit btn-un btn-bg">비밀번호 찾기</button>
        </div>
      </Form>
    </main>
  )
}

export default Pw