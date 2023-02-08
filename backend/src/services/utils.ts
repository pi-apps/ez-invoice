require("dotenv").config();
const Moralis = require("moralis").default;
import fs from "fs";

const MORALIS_API_KEY = process.env.MORALIS_API_KEY;

async function uploadToIpfs(file: any) {
  await Moralis.start({
      apiKey: MORALIS_API_KEY,
  });
  const uploadArray = [
      {
          path: file.filename,
          content: fs.readFileSync(file.path, {encoding: 'base64'})
      }
  ];
  const response = await Moralis.EvmApi.ipfs.uploadFolder({
      abi: uploadArray,
  });
  
  return response.result[0].path;
}

export default { uploadToIpfs };