
import * as Yup from 'yup';

export const search_Validation = () => {
  return Yup.object().shape({
    licence_plate: Yup.string().required(),
    start_Date: Yup.date().required(),
    end_Date: Yup.date().required(),
  });
};

export const initialValues = {
  licence_plate: '',
  start_Date: new Date(),
  end_Date: null,
};
