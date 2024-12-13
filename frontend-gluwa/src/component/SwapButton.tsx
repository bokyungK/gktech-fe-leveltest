import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from "axios";

interface YoyReceiveBoxProps {
  isSwapAvailable: boolean;
}

export const SwapButton: React.FC<YoyReceiveBoxProps> = ({ isSwapAvailable }) => {
  // Requirements 8
  const [isClicked, setIsClicked] = useState(false);
  const { isSuccess } = useQuery({
    queryKey: ['swap', isClicked, ],
    queryFn: async () => {
      const res = await axios({
        method: 'post',
        url: 'https://inhousedashboard-test-app.azurewebsites.net/api/Interview/post-swap',
      })
      return res;
    },
    enabled: isClicked,
    refetchOnWindowFocus: false,
  })

  if (isSuccess) console.log('SWAP successful!');
  
  return (
    <div className="button-wrap">
      <button type="button" className="normal" disabled={isSwapAvailable} onClick={() => setIsClicked(true)}>
        Swap
      </button>
    </div>
  );
}

