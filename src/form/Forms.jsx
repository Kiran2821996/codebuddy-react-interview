import { useState } from 'react';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import './Form.css';

function Forms() {
  const [user, setUser] = useState({});
  const [saveNext1, setSaveNext1] = useState(false);
  const [saveNext2, setSaveNext2] = useState(false);
  // navigate to post
  const navigate = useNavigate();

  // Handling form submits
  const handleForm1Submit = values => {
    setUser({ ...values });
    setSaveNext1(!saveNext1);
  };

  const handleForm2Submit = values => {
    setUser({ ...values });
    setSaveNext2(!saveNext2);
  };

  const handleFinalSubmit = values => {
    setUser({ ...values });
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(values),
    };
    fetch('https://codebuddy.review/submit', requestOptions).then(response => response.json());
    navigate('/posts');
  };

  // Handling previous forms
  const handleBack1 = () => {
    setSaveNext1(!saveNext1);
  };

  const handleBack2 = () => {
    setSaveNext2(!saveNext2);
  };

  // handling tabbed navigation
  const jumpToForm1 = () => {
    setSaveNext1(false);
  };

  const jumpToForm2 = () => {
    setSaveNext1(true);
    setSaveNext2(false);
  };

  const jumpToForm3 = () => {
    setSaveNext2(true);
  };

  return (
    <div>
      <Button onClick={jumpToForm1}>Form1</Button>{' '}
      <Button
        onClick={jumpToForm2}
        disabled={user.emailId === undefined && user.password === undefined}
      >
        Form2
      </Button>{' '}
      <Button
        onClick={jumpToForm3}
        disabled={user.firstName === undefined && user.address === undefined}
      >
        Form3
      </Button>
      {!saveNext1 ? (
        <div className="form form1">
          <Formik
            initialValues={{
              emailId: '',
              password: '',
            }}
            validationSchema={Yup.object({
              emailId: Yup.string().email('Invalid email address').required('Required'),
              password: Yup.string()
                .required('No password provided')
                .min(8, 'Password is should be 8 chars minimum.')
                .matches(
                  /^(?=.*[a-z].*[a-z])(?=.*[A-Z].*[A-Z])(?=.*\d.*\d)(?=.*[@$!%*?&].*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  'Must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters',
                ),
            })}
            onSubmit={values => handleForm1Submit(values)}
          >
            <Form>
              <div className="form_div">
                <label htmlFor="emailId">
                  Email<span>*</span>:
                </label>
                <Field name="emailId" type="email"  />
              </div>
              <div className="err_msg">
                <ErrorMessage name="emailId" />
              </div>
              <div className="form_div">
                <label htmlFor="password">
                  Password<span>*</span>:
                </label>
                <Field name="password" type="password" />
              </div>
              <div className="err_msg">
                <ErrorMessage name="password" />
              </div>
              <Button variant="primary" disabled>
                BACK
              </Button>{' '}
              <Button variant="primary" disabled>
                SAVE
              </Button>{' '}
              <Button variant="primary" type="submit">
                SAVE AND NEXT
              </Button>
            </Form>
          </Formik>
        </div>
      ) : !saveNext2 ? (
        <div className="form form2">
          <Formik
            initialValues={{
              firstName: ' ',
              lastName: '',
              address: '',
            }}
            validationSchema={Yup.object({
              firstName: Yup.string()
                .min(2, 'Must be minimum 2 characters')
                .max(50, 'Must be 50 characters or less')
                .matches(/[a-zA-Z]/, 'Characters can only be alphabets.')
                .required('Required'),
              lastName: Yup.string()
                .min(2, 'Must be minimum 2 characters')
                .max(20, 'Must be 20 characters or less')
                .matches(/[a-zA-Z]/, 'Characters can only be alphabets.'),
              address: Yup.string().min(10, 'Must be minimum 10 characters').required('Required'),
            })}
            onSubmit={values => handleForm2Submit(values)}
          >
            <Form>
              <div className="form_div">
                {' '}
                <label htmlFor="firstName">First Name:</label>
                <Field type="text" name="firstName" />
              </div>
              <div className="err_msg">
                {' '}
                <ErrorMessage name="firstName" />
              </div>
              <div className="form_div">
                {' '}
                <label htmlFor="lastName">Last Name:</label>
                <Field type="text" name="lastName" />
              </div>
              <div className="err_msg">
                {' '}
                <ErrorMessage name="lastName" />
              </div>
              <div className="form_div">
                {' '}
                <label htmlFor="address">
                  Address<span>*</span>:
                </label>
                <Field type="text" name="address" />
              </div>
              <div className="err_msg">
                <ErrorMessage name="address" />
              </div>
              <Button variant="primary" onClick={handleBack1}>
                BACK
              </Button>{' '}
              <Button variant="primary" disabled>
                SAVE
              </Button>{' '}
              <Button variant="primary" type="submit">
                SAVE AND NEXT
              </Button>
            </Form>
          </Formik>
        </div>
      ) : (
        <div className="form form3">
          <Formik
            initialValues={{
              countryCode: '',
              phoneNumber: '',
            }}
            validationSchema={Yup.object({
              phoneNumber: Yup.string()
                .min(10, 'should be 10 digits minimum.')
                .max(10, 'should be 10 digits maxmimum.')
                .matches(/[0-9]/, 'Characters can only be alphabets.')
                .required('Required'),
            })}
            onSubmit={values => handleFinalSubmit(values)}
          >
            <Form>
              <div className="form_div">
                <label htmlFor="countryCode">
                  Country Code<span>*</span>:
                </label>

                <Field name="countryCode" as="select">
                  <option value="+91">India (+91)</option>
                  <option value="+1">America (+1)</option>
                </Field>
              </div>
              <div className="form_div">
                {' '}
                <label htmlFor="phoneNumber">
                  Phone Number<span>*</span>:
                </label>
                <Field name="phoneNumber" type="number" />
              </div>
              <div className="err_msg">
                {' '}
                <ErrorMessage name="phoneNumber" />
              </div>
              <div className="form_div">
                {' '}
                <label>
                  {' '}
                  <input type="checkbox" name="termsAndConditions" required />
                  Accept Terms and conditions
                </label>
              </div>
              <Button variant="primary" onClick={handleBack2}>
                BACK
              </Button>{' '}
              <Button variant="primary" type="submit">
                SAVE
              </Button>{' '}
              <Button variant="primary" disabled>
                SAVE AND NEXT
              </Button>
            </Form>
          </Formik>
        </div>
      )}
    </div>
  );
}

export default Forms;
