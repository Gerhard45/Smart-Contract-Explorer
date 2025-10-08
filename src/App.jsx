import { useEffect, useState } from "react";
import { Box, Button, Input, Text, VStack } from "@chakra-ui/react";
import { getEthBalance } from "./utils/ethers";

function App() {
  const [address, setAddress] = useState("");
  const [balance, setBalance] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBalance = async () => {
    setError(null);
    setLoading(true);
    try {
      if (!address) throw new Error("Enter an address");
      const bal = await getEthBalance(address, "mainnet"); // or "sepolia"
      setBalance(bal);
    } catch (e) {
      setError(e.message || "Failed to fetch balance");
      setBalance(null);
    } finally {
      setLoading(false);
    }
  };

  // Example prefill (optional)
  useEffect(() => {
    // setAddress("vitalik.eth") // ENS names are supported too
  }, []);

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <VStack spacing={4} maxW="xl" mx="auto">
        <Text fontSize="2xl" fontWeight="bold">Smart Contract Explorer</Text>
		<Text fontSize="1xl" fontWeight="bold">Get Wallet Balance:</Text>
        <Input
          placeholder="Enter wallet address or ENS name"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <Button colorScheme="teal" onClick={fetchBalance} isLoading={loading}>
          Get Balance
        </Button>

        {error && <Text color="red.500">{error}</Text>}

        {balance !== null && !error && (
          <Text>
            Balance: <strong>{balance}</strong> ETH
          </Text>
        )}
      </VStack>
    </Box>
  );
}

export default App;
