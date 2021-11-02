import * as Yup from "yup";

const lessonSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name shoudl be minimum 3 chars long!")
    .max(30, "You have exceeded the limit chars!")
    .required("Required!"),

  startDate: Yup.date().required("Date is requrired!"),

  endDate: Yup.date().required("Date is requrired!"),

  groupId: Yup.number().required("Group is required!"),
  
  files: Yup.array()
        .of(
          Yup.object().shape({
            file:Yup.mixed().test("fileSize", "The file is too large", (value) => {
                if (!value.length) return true // attachment is optional
                return value[0].size <= 2000000
              }),
          })
        )
  
});

export default lessonSchema;