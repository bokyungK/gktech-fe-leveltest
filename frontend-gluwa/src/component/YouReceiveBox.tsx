import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

interface YoyReceiveBoxProps {
  toggleTokenSelectorOpen: () => void;
  setReceive: (value: number) => void;
  setOutBalance: (value: string) => void;
  pay: number;
  receive: number;
  inBalance: string;
  outBalance: string;
  tokenType: string;
}

export const YouReceiveBox: React.FC<YoyReceiveBoxProps> = ({ toggleTokenSelectorOpen, setReceive, setOutBalance, pay, receive, inBalance, outBalance, tokenType }) => {
  const [isTokenSelectorHidden, setIsTokenSelectorHidden] = useState(false)
  const { data: dataOfBalance } = useQuery({
    queryKey: ['outBalance'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: 'https://inhousedashboard-test-app.azurewebsites.net/api/Interview/get-price',
      })
      return res.data;
    },
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    // Renew outBalance when changing currency
    if (dataOfBalance && tokenType) {
      setOutBalance(dataOfBalance[tokenType]);
    }

    // Requirements 6 ~ 7
    if (dataOfBalance) {
      setReceive((pay * parseFloat(inBalance)) / parseFloat(outBalance));
    }
  }, [dataOfBalance, pay, inBalance, outBalance])

  // Requirements 4
  useEffect(() => {
    if (tokenType) {
      setIsTokenSelectorHidden(true);
    } else {
      setIsTokenSelectorHidden(false);
    }
  }, [tokenType])

  return (
    <div className="swap-item">
      <div className="title">
        <h3>You receive</h3>
      </div>

      <div className="amount-input">
        <div className="input">
          <input type="number" placeholder={String(receive)} readOnly />
        </div>
        <button type="button" className={`currency-label select ${isTokenSelectorHidden && 'flex'}`} onClick={toggleTokenSelectorOpen}>
          Select token
        </button>
      </div>

      <div className="item-flex amount">
        <div className="rt">
          <div className="balance">
            <span>Balance: {outBalance}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

