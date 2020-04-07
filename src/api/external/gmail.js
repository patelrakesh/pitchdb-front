import axios from 'axios';

const GOOGLE_BASE_URL = "https://www.googleapis.com/gmail/v1";

export default {
  sendEmail: (emailObj, token) => {
    return axios.post(`${GOOGLE_BASE_URL}/users/me/messages/send`, emailObj, { headers: { Authorization: `Bearer ${token}` } });
  },

  formatMessage: (senderName, from, to, subject, body) => {
    let message = "From: ";
    message += '"' + senderName + '" ';
    message += "<" + from + ">\r\n";
    message += "To: ";
    message += (process.env.REACT_APP_ENV === 'prod' ? to : "sbeltrancaicedo@gmail.com") + "\r\n";
    //ronstoryjr@gmail.com
    message += "Subject: ";
    message += subject + "\r\n";
    message += "Content-type: text/html" + "\r\n\r\n";
    message += body + "\r\n";

    return Buffer.from(message).toString('base64').replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  }
}