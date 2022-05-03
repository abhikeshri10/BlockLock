import axios from 'axios';
import jwtDecode from 'jwt-decode';
var user = '';
var usersecret = '';
if (localStorage.getItem('token')) {
  const token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  console.log(decoded);
  user = decoded.user.username;
  usersecret = decoded.user.password;
}
export const getAppointDetails = async () => {
  console.log('Hello');
  return axios
    .get('http://localhost:5000/doctor/getAppointments', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
};
export const sendvideourl = async (appointment, url) => {
  console.log(url);
  console.log(appointment);
  var chatid = '';
  console.log(user, usersecret);
  await axios
    .put(
      'https://api.chatengine.io/chats/',
      {
        usernames: [user, appointment.PatientUsername],
        is_direct_chat: true,
      },
      {
        headers: {
          'Project-ID': process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
          'User-Name': user,
          'User-Secret': usersecret,
        },
      }
    )
    .then((res) => {
      chatid = res.data.id;
      console.log(res.data.id);
    })
    .catch((err) => {
      console.log(
        user,
        usersecret,
        process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID
      );
      console.log(err);
      console.log('Error in creating chat');
    });

  await axios
    .post(
      'https://api.chatengine.io/chats/' + chatid + '/messages/',
      {
        text: 'Join this link for video consultation : ' + url,
      },
      {
        headers: {
          'Project-ID': process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID,
          'User-Name': user,
          'User-Secret': usersecret,
        },
      }
    )
    .then((res) => {})
    .catch((err) => {
      console.log('Error in creating chat');
    });
  window.location.href = url;
};
