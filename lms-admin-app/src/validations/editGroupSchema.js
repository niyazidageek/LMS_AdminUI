import * as Yup from 'yup';

const editGroupSchema = Yup.object().shape(
    {

        name: Yup.string()
            .min(3,'Name shoudl be minimum 3 chars long!')
            .max(30,"You have exceeded the limit chars!")
            .required('Required!'),

        startDate: Yup.date()
        .required('Date is requrired!'),

        endDate: Yup.date()
        .required('Date is requrired!')

    }
);

export default editGroupSchema;