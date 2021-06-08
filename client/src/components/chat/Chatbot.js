import { useState, useEffect } from 'react';
import axios from 'axios';
import Chatbot, { Loading } from 'react-simple-chatbot';

const FetchUserCategories = ({ steps, triggerNextStep }) => {
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState({});
  const [trigger, setTrigger] = useState(false);

  useEffect(() => {
    async function loadResult() {
      try {
        const { data } = await axios.post('/api/search/chatmessage', {
          search_query: steps['userInput'].value,
          labels: ['Laptops', 'Cameras', 'Mobiles', 'PCs', 'negative'],
        });

        setLoading(false);
        setResult(data);
        console.log(data);
      } catch (err) {
        console.error(err.message);
      }
    }

    loadResult();
  }, []);

  const triggerNext = () => {
    setTrigger(true);
    triggerNextStep();
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : result.success ? (
        result.data.labels[0] === 'negative' ? (
          `Can't find this on our site`
        ) : (
          `Hey we found the category where you can look for products: ${result.data.labels[0]}`
        )
      ) : (
        ''
      )}
      {!loading && (
        <div
          style={{
            textAlign: 'center',
            marginTop: 20,
          }}
        >
          {!trigger && (
            <button onClick={() => triggerNext()}>Search Again</button>
          )}
        </div>
      )}
    </>
  );
};

export const ChatMessaging = () => {
  const [show, setShow] = useState(false);

  const toggleFloatingHandler = () => {
    setShow(!show);
  };

  const steps = [
    {
      id: '1',
      message: 'Hi!',
      trigger: '2',
    },
    {
      id: '2',
      message:
        "Please provide what's in your mind and we will suggest some categories for you",
      trigger: 'userInput',
    },
    {
      id: 'userInput',
      user: true,
      trigger: '3',
    },
    {
      id: '3',
      component: <FetchUserCategories />,
      waitAction: true,
      trigger: '2',
    },
  ];

  return (
    <Chatbot
      floating={true}
      opened={show}
      toggleFloating={toggleFloatingHandler}
      steps={steps}
    />
  );
};
