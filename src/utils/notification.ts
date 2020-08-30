import { message } from 'antd';

message.config({
  duration: 5,
});

export default {
  success: (text: string) => {
    return message.success(text);
  },
  error: (text: string) => {
    return message.error(text, 7);
  },
};
