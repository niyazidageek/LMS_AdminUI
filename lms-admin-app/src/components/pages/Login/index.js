import React from "react";
import { render } from "react-dom";
import { Formik, Field, Form, FieldArray, validateYupSchema } from "formik";

const initialValues = {
  files: [{}]
};

let reader = new FileReader();

function handleSubmit(values){
    console.log(values);
}

const InviteFriends = () => (
  <div>
    <h1>Invite friends</h1>
    <p>Check the console to see the formik state.</p>
    <p>Reproduction</p>
    <ol>
      <li>Remove the first value of the form</li>
      <li>
        Check the <code>touched</code> state in the console log
      </li>
      <li>
        It indicates <code>touched.friends: []</code> but one value was actually
        touched
      </li>
    </ol>
    <Formik
      initialValues={initialValues}
      validate={() => ({ foo: true })}
      onSubmit={handleSubmit}
      render={({ values, errors, touched, handleReset, ...props }) => {
        return (
          <Form>
            <FieldArray
              name="files"
              render={({ insert, remove, push, formik }) => (
                <div>
                  {values.files.length > 0 &&
                    values.files.map((index) => (
                      <div className="row" key={index}>
                        <div className="col">
                          <Field
                            onChange={(e) =>
                              props.setFieldValue(
                                `files.${index}`,
                                reader.readAsDataURL(e.target.files[0])
                              )
                            }
                            name={`files.${index}`}
                            type="file"
                          />
                          {errors.files &&
                            errors.files[index] &&
                            errors.files[index] &&
                            touched.files &&
                            touched.files[index] && (
                              <div className="field-error">
                                {errors.files[index]}
                              </div>
                            )}
                        </div>

                        <div className="col">
                          <button
                            type="button"
                            className="secondary"
                            onClick={() => remove(index)}
                          >
                            X
                          </button>
                        </div>
                      </div>
                    ))}
                  <button
                    type="button"
                    className="secondary"
                    onClick={() => push({})}
                  >
                    Add Friend
                  </button>
                </div>
              )}
            />
            <br />
            <button
              onClick={(event) => {
                event.preventDefault();
                handleReset();
              }}
            >
              Reset
            </button>
            <button type="submit">Submit</button>
          </Form>
        );
      }}
    />
  </div>
);

render(<InviteFriends />, document.getElementById("root"));