import './style/index.scss';
import React, { useState } from 'react';
import { YouPayBox } from './component/YouPayBox';
import { YouReceiveBox } from './component/YouReceiveBox';
import { TokenSelector } from './component/TokenSelector';
import { SwapButton } from './component/SwapButton';

const Main: React.FC = () => {
  const [inBalance, setInBalance] = useState('0');
  const [outBalance, setOutBalance] = useState('0');
  const [pay, setPay] = useState(0);
  const [receive, setReceive] = useState(0);
  const [tokenType, setTokenType] = useState('CTC');
  const [isMove, setIsMove] = useState(false);
  const [isTokenSelectorOpen, setIsTokenSelectorOpen] = useState(false);
  const [isSwapAvailable, setIsSwapAvailable] = useState(true);

  const toggleTokenSelectorOpen = () => setIsTokenSelectorOpen(!isTokenSelectorOpen);
  // Requirements 5
  const changePayAndReceive = () => {
    setIsMove((prevState) => !prevState)
  }

  return (
    <>
      <div>
        <section className="page swap-page">
          <div className="box-content">
            <div className="heading">
              <h2>Swap</h2>
            </div>

            <div className="swap-dashboard">
              {
                !isMove ? 
                  <YouPayBox onChangePay={(input) => setPay(input)} toggleTokenSelectorOpen={toggleTokenSelectorOpen}        
                  pay={pay} tokenType={tokenType} inBalance={inBalance} setInBalance={setInBalance}
                  onChangeSwap={setIsSwapAvailable} />
                : 
                  <YouReceiveBox toggleTokenSelectorOpen={toggleTokenSelectorOpen} setOutBalance={setOutBalance} setReceive={setReceive}
                  inBalance={inBalance} pay={pay} receive={receive} tokenType={tokenType} outBalance={outBalance} />
              }

              <button type="button" className="mark" onClick={changePayAndReceive}>
                <i className="blind">swap</i>
              </button>

              {
                isMove ? 
                  <YouPayBox onChangePay={(input) => setPay(input)} toggleTokenSelectorOpen={toggleTokenSelectorOpen}        
                  pay={pay} tokenType={tokenType} inBalance={inBalance} setInBalance={setInBalance}
                  onChangeSwap={setIsSwapAvailable} />
                : 
                  <YouReceiveBox toggleTokenSelectorOpen={toggleTokenSelectorOpen} setOutBalance={setOutBalance} setReceive={setReceive}
                  inBalance={inBalance} pay={pay} receive={receive} tokenType={tokenType} outBalance={outBalance} />
              }

              <SwapButton isSwapAvailable={isSwapAvailable} />
            </div>
          </div>
        </section>
      </div>

      {isTokenSelectorOpen && (
        <TokenSelector onClose={() => setIsTokenSelectorOpen(false)} onSelect={(type) => setTokenType(type)} />
      )}
    </>
  );
}

export { Main as default };
