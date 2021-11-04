import * as Yup from "yup";

const quizSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name shoudl be minimum 3 chars long!")
    .max(30, "You have exceeded the limit chars!")
    .required("Required!"),

  subjectId: Yup.number().required("Subject is required!"),
});

export default quizSchema;