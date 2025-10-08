import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import { Box, Button, Text, VStack } from '@chakra-ui/react'
import { ethers } from 'ethers'
import Web3Modal from 'web3modal'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [provider, setProvider] = useState(null);
  const [account, setAccount] = useState(null);
  
  const connectWallet = async () => {
    try {
      const web3Modal = new Web3Modal();
      const connection = await web3Modal.connect();
      const newProvider = new ethers.BrowserProvider(connection);
      const signer = await newProvider.getSigner();
      const address = await signer.getAddress();

      setProvider(newProvider);
      setAccount(address);
    } catch (error) {
      console.error("Wallet connection failed:", error);
    }
  };

   return (
    <Box p={10} textAlign="center" bg="gray.50" minH="100vh">
      <VStack spacing={4}>
        <Text fontSize="2xl" fontWeight="bold">
          Smart Contract Explorer
        </Text>

        {account ? (
          <Text>Connected: {account}</Text>
        ) : (
          <Button colorScheme="teal" onClick={connectWallet}>
            Connect Wallet
          </Button>
        )}
      </VStack>
    </Box>
  );
}

export default App;