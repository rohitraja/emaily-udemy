//SurveyField contains login to render single
// label and input

import React from "react";

export default ({ input, label, meta: { error, touched } }) => {
  //{...input} will assign all the properties to input tag eg. onClick(), onBlur() and so on chapter 154
  return (
    <div>
      <label>{label}</label>
      <input {...input} style={{ marginBottom: "5px" }} />
      <div className="red-text" style={{ marginBottom: "20px" }}>
        {touched && error}
      </div>
    </div>
  );
};
