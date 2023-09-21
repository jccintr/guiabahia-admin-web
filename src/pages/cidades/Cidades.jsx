import React, { useEffect,useState } from 'react';
import { Flex,Box,useColorModeValue,Heading,Button,useDisclosure,InputGroup,InputLeftElement,useToast,Input } from '@chakra-ui/react';
import {database} from '../../firebaseConfig';
import { addDoc,collection,onSnapshot, orderBy, query,doc,updateDoc,where,getDocs,deleteDoc } from 'firebase/firestore';
import DataTable from 'react-data-table-component';
import ModalConfirm from '../../components/modals/ModalConfirm';
import { FaSearch } from 'react-icons/fa';

const paginationComponentOptions = {
  rowsPerPageText: 'Registros por Página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};


const Cidades = () => {
  const toast = useToast();
  const [cidades,setCidades] = useState([]);
  const [searchText,setSearchText] = useState('');


  const customStyles = {
   
    headCells: {
      style: {
        color: '#000000',
        fontSize: '14px',
        fontWeight: 'bold',
        
      },
    },
   
  };

  const columns = [
    {
      name: 'Nome',
      selector: row => row.nome,
    },
    // {
    //   name: '',
    //   cell: row => <><Button m="2" onClick={()=>onEdit(row)} bg={'green.400'} color={'white'} _hover={{bg: 'green.500',}} size='xs'>EDITAR</Button><Button onClick={()=>onDelete(row)} bg={'red.400'} color={'white'} _hover={{bg: 'red.500',}} size='xs'>EXCLUIR</Button></>,
    // },
    
];

  useEffect(()=>{
    const collectionRef = collection(database,'Cidades');
    const q = query(collectionRef, orderBy('nome','asc'));
    const unsuscribe = onSnapshot(q,querySnapshot => {
        setCidades(querySnapshot.docs.map(doc => ( {id: doc.id, nome: doc.data().nome} )))
    })
    return unsuscribe;
  }, []);
  

  const cidadesFiltrado = cidades.filter(
		cidade => cidade.nome && cidade.nome.toLowerCase().includes(searchText.toLowerCase()),
	);

  const onAdd = () => {
    // setCategoria({nome:'',ordem:0});
    // setEditando(false); 
    // onOpen();
 
   }

  return (
    <Flex w='full' marginLeft={60} minH={'100vh'} height='100vh' direction='column' align={'center'} justify={'flex-start'} bg={['white','gray.100']} p='8'>
       <Heading color='green.400' mb='4' fontSize={['1xl','2xl']}>Cidades</Heading>
       
       <Box w={{ base: '350px', md: '500px', lg: '1200px' }} rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={['none','lg']} p={[0,8]}>
          <Button onClick={onAdd} bg={'green.400'} color={'white'} _hover={{bg: 'green.500',}} size='sm'>ADICIONAR CIDADE</Button>
          <InputGroup mt="2" mb="2">
            <InputLeftElement pointerEvents='none'>
              <FaSearch color='gray.300' />
            </InputLeftElement>
            <Input
              placeholder='Pesquisar nas cidades'
              onChange={e => setSearchText(e.target.value)}
               />
          </InputGroup>
          <DataTable
                columns={columns}
                data={cidadesFiltrado}
                highlightOnHover
                noDataComponent="Registros não encontrados."
                pagination
                paginationComponentOptions={paginationComponentOptions}
                customStyles={customStyles}
            />
       </Box>
       
    </Flex>
  )



}

export default Cidades