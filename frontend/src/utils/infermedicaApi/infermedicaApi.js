import axios from 'axios';
import { api, app_id, app_key } from './keys';
export const inferDiagnosis = (body, interviewId) => {
  return axios.post(api + 'diagnosis/', body, {
    headers: {
      'App-Id': app_id,
      'App-Key': app_key,
      'Content-Type': 'application/json',
      'Interview-Id': interviewId,
      'Dev-Mode': 'true',
    },
  });
};
export const inferExplain = (body, interviewId) => {
  return axios.post(api + 'explain/', body, {
    headers: {
      'App-Id': app_id,
      'App-Key': app_key,
      'Content-Type': 'application/json',
      'Interview-Id': interviewId,
      'Dev-Mode': 'true',
    },
  });
};
export const inferSuggest = (body, interviewId) => {
  return axios.post(api + 'suggest/', body, {
    headers: {
      'App-Id': app_id,
      'App-Key': app_key,
      'Content-Type': 'application/json',
      'Interview-Id': interviewId,
      'Dev-Mode': 'true',
    },
  });
  // return res.data;
};

export const inferTraige = (body, interviewId) => {
  return axios.post(api + 'triage/', body, {
    headers: {
      'App-Id': app_id,
      'App-Key': app_key,
      'Content-Type': 'application/json',
      'Interview-Id': interviewId,
      'Dev-Mode': 'true',
    },
  });
  // return res.data;
};
export const inferSpecialist = (body, interviewId) => {
  return axios.post(api + 'recommend_specialist/', body, {
    headers: {
      'App-Id': app_id,
      'App-Key': app_key,
      'Content-Type': 'application/json',
      'Interview-Id': interviewId,
      'Dev-Mode': 'true',
    },
  });
  // return res.data;
};
export const inferSearch = async (
  phrase,
  age,
  sex,
  max_results,
  interviewId
) => {
  console.log(phrase, age, sex, max_results, interviewId);
  const res = await axios.get(
    api +
      'search?' +
      'phrase=' +
      phrase +
      '&age.value=' +
      age +
      '&sex=' +
      sex +
      '&max_results=' +
      max_results +
      '&type=sympton',
    {
      headers: {
        'App-Id': app_id,
        'App-Key': app_key,
        'Content-Type': 'application/json',
        'Interview-Id': interviewId,
        'Dev-Mode': 'true',
      },
    }
  );
  return res.data;
};
export const inferParse = async (body, interviewId) => {
  const res = await axios.post(api + 'parse/', body, {
    headers: {
      'App-Id': app_id,
      'App-Key': app_key,
      'Content-Type': 'application/json',
      'Interview-Id': interviewId,
      'Dev-Mode': 'true',
    },
  });
  return res.data;
};
export const inferConditionbyId = async (condition, age, interviewId) => {
  const res = await axios.get(
    api + 'conditions/' + condition + '?age.value=' + age,
    {
      headers: {
        'App-Id': app_id,
        'App-Key': app_key,
        'Content-Type': 'application/json',
        'Interview-Id': interviewId,
        'Dev-Mode': 'true',
      },
    }
  );
  return res.data;
};
export const inferSymptombyId = async (symptom, age, interviewId) => {
  const res = await axios.get(
    api + 'symptoms/' + symptom + '?age.value=' + age,
    {
      headers: {
        'App-Id': app_id,
        'App-Key': app_key,
        'Content-Type': 'application/json',
        'Interview-Id': interviewId,
        'Dev-Mode': 'true',
      },
    }
  );
  return res.data;
};
