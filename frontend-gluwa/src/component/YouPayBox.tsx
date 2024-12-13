import { useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

interface YoyPayBoxProps {
  toggleTokenSelectorOpen: () => void;
  onChangePay: (value: number) => void;
  setInBalance: (value: string) => void;
  onChangeSwap: (value: boolean) => void;
  pay: number;
  inBalance: string;
  tokenType: string;
}

export const YouPayBox: React.FC<YoyPayBoxProps> = ({ toggleTokenSelectorOpen, onChangePay, onChangeSwap, setInBalance, pay, inBalance, tokenType }) => {
  // Requirements 1
  const { data: dataOfBalance, isSuccess } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const res = await axios({
        method: 'get',
        url: 'https://inhousedashboard-test-app.azurewebsites.net/api/Interview/get-balance',
      })
      return res.data;
    },
    refetchOnWindowFocus: false,
  })

  useEffect(() => {
    if (isSuccess) {
      setInBalance(dataOfBalance[tokenType])
    }
  }, [dataOfBalance, tokenType])

  // Requirements 2
  const changeInputMoney = (event: any) => {
    onChangePay(event.target.value);
  }

  useEffect(() => {
    if (isSuccess) {
      if (pay > parseFloat(inBalance) || pay == 0 || !pay) {
        onChangeSwap(true);
      } else {
        onChangeSwap(false);
      }
    }
  }, [pay])

  return (
    <div className="swap-item active">
      <div className="title">
        <h3>You pay</h3>
      </div>

      <div className="amount-input">
        <div className="input">
          <input onChange={changeInputMoney} type="number" placeholder='0' value={pay} />
        </div>
        <button type="button" className="currency-label" onClick={toggleTokenSelectorOpen}>
          <div className={`token ${tokenType}`} data-token-size="28"></div>
          <strong className="name">{tokenType}</strong>
        </button>
      </div>

      <div className="amount item-flex">
        <div className="lt">
        </div>
        <div className="rt">
          <div className="balance">
            <span>Balance: {inBalance}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

