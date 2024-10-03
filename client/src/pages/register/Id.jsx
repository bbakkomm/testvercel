import { useEffect } from 'react';
import { Form, json, useActionData, useNavigate, } from 'react-router-dom';
import { toast } from 'react-toastify';

import FormRow from '../../components/FormRow';
import customFetch from '../../utils/customFetch.js';

export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  try {
    const res = await customFetch.post('/auth/userid', data);
    toast.success('아이디를 찾았습니다.');
    return json({
      data: res,
      redirect: "/idsuccess"
    });
  } catch (error) {
    toast.error(error?.response?.data?.msg);
    return error;
  }
};

const Id = () => {
  const actionData = useActionData();
  const navigate = useNavigate();

  useEffect(() => {
    if (actionData) {
      const { data, redirect } = actionData;
      navigate(redirect, { state: data, replace: true });
    }
  }, [actionData, navigate]);

  return (
    <main className="id">
      <h2 className="id__title">아이디 찾기</h2>
      <Form method='post'>
        {/* email */}
        <FormRow type='email' name="email" labelText="가입한 이메일을 입력해주세요." placeholder="이메일"/>
      
        <div className="btn">
          <button type='submit' className="input-submit btn-un btn-bg">아이디 찾기</button>
          {/* <Link to="/IdSuccess" className="btn-un">아이디 찾기</Link> */}
        </div>
      </Form>
    </main>
  )
}

export default Id