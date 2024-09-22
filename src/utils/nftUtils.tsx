export const isPackNFTHolder = async (
    wallet: string,
    contractAddresses: string[]
 ): Promise<boolean> => {
    const apiKey = process.env.NEXT_PUBLIC_ALCHEMY_API_KEY;
    if (!apiKey) {
       console.error('Alchemy API key is missing!');
       return false;
    }
 
    try {
       for (const contractAddress of contractAddresses) {
          const url = `https://opt-mainnet.g.alchemy.com/nft/v3/${apiKey}/isHolderOfContract?wallet=${wallet}&contractAddress=${contractAddress}`;
 
          const request = await fetch(url, {
             method: 'GET',
             headers: { accept: 'application/json' },
          });
 
          const response = await request.json();
 
          // If wallet holds an NFT from any contract, return true
          if (response.isHolderOfContract === true) {
             return true;
          }
       }
 
       // Return false if the wallet does not hold any NFTs from the given contracts
       return false;
    } catch (error) {
       console.error('Error fetching NFT holder status:', error);
       return false;
    }
 };
 