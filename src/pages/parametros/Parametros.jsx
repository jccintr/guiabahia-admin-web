import React, {useState,useEffect} from 'react'
import { Flex,Heading,Box,useColorModeValue,FormControl,FormLabel,Input,Button,useToast } from '@chakra-ui/react'
import { collection,updateDoc, query,getDocs,doc } from 'firebase/firestore';
import { database } from '../../firebaseConfig';


const Parametros = () => {
  const toast = useToast();
  const [zap,setZap] = useState('');
  const [mensagem,setMensagem] = useState('');
  const [aviso,setAviso] = useState('');
  const [docId,setDocId] = useState('');
 



  useEffect(()=>{
    const getParametros = async () => {

      const collectionRef = collection(database,'Parametros');
      const q = query(collectionRef);
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setDocId(doc.id);
        setMensagem(doc.data().mensagem);
        setZap(doc.data().telefone);
        setAviso(doc.data().aviso);
      });
    
    }
    getParametros();
    
}, []);


  const onSalvar = async () => {
   
    const docRef = doc(database,'Parametros',docId);
    updateDoc(docRef,{telefone: zap,mensagem:mensagem,aviso:aviso});
    toast({title: 'Aviso !',description: "As alterações foram salvas com sucesso.",status: 'success',duration: 3000,isClosable: true,})

  }

  return (
    <Flex w='full' marginLeft={60} direction='column' align={'center'} pt="40" justify={'start'} >
       <Heading color='green.400' mb='4' fontSize={['1xl','2xl']}>Parâmetros</Heading>
       <Box w={['350px','800px']} rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={['none','lg']} p={[0,8]}>

            <FormControl style={{marginBottom:10}}>
                <FormLabel>Número do WhatsApp:</FormLabel>
                <Input value={zap} onChange={e => setZap(e.target.value)} placeholder="Digite o número do WhatsApp"/>
            </FormControl>

            <FormControl style={{marginBottom:10}}>
                <FormLabel>Mensagem:</FormLabel>
                <Input value={mensagem} onChange={e => setMensagem(e.target.value)} placeholder="Digite a mensagem"/>
            </FormControl>

            <FormControl style={{marginBottom:10}}>
                <FormLabel>Aviso:</FormLabel>
                <Input value={aviso} onChange={e => setAviso(e.target.value)} placeholder="Digite o aviso"/>
            </FormControl>
            <Button  w="full" onClick={onSalvar} loadingText="Salvando"  colorScheme='green' mr={3}>Salvar as alterações</Button>
       </Box> 
    </Flex>
  )
}

export default Parametros