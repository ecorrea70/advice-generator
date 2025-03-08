import { useCallback, useEffect, useState } from '@lynx-js/react';
import './App.css';

interface Advice {
  slip: {
    id: number;
    advice: string;
  };
}

const fetchAdvice = async (): Promise<string> => {
  try {
    const request = new Request('https://api.adviceslip.com/advice');
    const response = await fetch(request);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = (await response.json()) as Advice;
    return data.slip.advice;
  } catch (error) {
    return 'Failed to fetch advice';
  }
};

export function App() {
  const [advice, setAdvice] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAdvice().then((data) => {
      setAdvice(data);
      setIsLoading(false);
    });
  }, []);

  const onTap = useCallback(() => {
    setIsLoading(true);
    fetchAdvice().then((data) => {
      setAdvice(data);
      setIsLoading(false);
    });
  }, []);

  return (
    <view>
      <view className="header">
        <text className="header-title">Advice Generator</text>
      </view>
      <view className="container">
        <view className="advice-card">
          {isLoading ? (
            <text className="advice-card-text">Loading...</text>
          ) : (
            <text className="advice-card-text">{advice}</text>
          )}
        </view>
        <view className="button" bindtap={onTap}>
          <text className="button-text">Get Advice</text>
        </view>
      </view>
    </view>
  );
}
