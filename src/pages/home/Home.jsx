import React from 'react';
import { Flex,Text,Image } from '@chakra-ui/react';
import splash from '../../assets/splash.png';


const Home = () => {
  return (
    <Flex w='full' marginLeft={60} align={'center'} justify={'center'} bgGradient='linear(to-b, #000a14, #010e21)' >
           <Image w='270px' h='600px' src={splash} alt="logo" />
    </Flex>
  )
}

export default Home