import React, { useEffect,useState,useContext } from 'react';
import { Flex,Box,useColorModeValue,Heading,Button,useDisclosure,InputGroup,InputLeftElement,useToast,Input } from '@chakra-ui/react';
import {database} from '../../firebaseConfig';
import { addDoc,collection,onSnapshot, orderBy, query,doc,updateDoc,where,getDocs,deleteDoc } from 'firebase/firestore';
import DataTable from 'react-data-table-component';
import ModalConfirm from '../../components/modals/ModalConfirm';
import ModalCidade from '../../components/modals/ModalCidade';
import { FaSearch } from 'react-icons/fa';
import DataContext from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';

const paginationComponentOptions = {
  rowsPerPageText: 'Registros por Página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};


const Cidades = () => {
  const navigate = useNavigate();
  const {cidade,setCidade} = useContext(DataContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenModalConfirm , onOpen: onOpenModalConfirm, onClose: onCloseModalConfirm } = useDisclosure()
  const toast = useToast();
  const [cidades,setCidades] = useState([]);
  const [searchText,setSearchText] = useState('');
  //const [cidade,setCidade] = useState({nome:''});
  const [editando,setEditando] = useState(false);



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
    {
      name: '',
      cell: row => <><Button m="2" onClick={()=>onEdit(row)} bg={'green.400'} color={'white'} _hover={{bg: 'green.500',}} size='xs'>EDITAR</Button>
                     <Button m="2" onClick={()=>onDelete(row)} bg={'red.400'} color={'white'} _hover={{bg: 'red.500',}} size='xs'>EXCLUIR</Button>
                     <Button m="2" onClick={()=>onDistritosClick(row)} bg={'blue.400'} color={'white'} _hover={{bg: 'blue.500',}} size='xs'>DISTRITOS</Button>
                     <Button m="2" onClick={()=>onContatosClick(row)} bg={'orange.400'} color={'white'} _hover={{bg: 'orange.500',}} size='xs'>CADASTROS</Button>
                   </>,
    },
    
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

  const onDistritosClick = (cidade) => {
      setCidade(cidade);
      navigate('/distritos');
  }

  const onContatosClick = (cidade) => {
    setCidade(cidade);
    navigate('/cadastros');
}


  const onAdd = () => {
    setCidade({nome:''});
    setEditando(false); 
    onOpen();
 
   }

   const onEdit = (cidade) => {
    setCidade(cidade);
    setEditando(true); 
    onOpen();
  }

  const onDelete = (cidade) => {
    setCidade(cidade);
    onOpenModalConfirm();
  }

  const onDeleteAction = async () => {
   
    onCloseModalConfirm();
    // verifica se a cidade possui distritos
    const distritosRef = collection(database,'Distritos');
    const distritos = query(distritosRef, where("cidadeId", "==", cidade.id));
    const queryDistritos = await getDocs(distritos);
    const distritosCount = queryDistritos.size;
    if(distritosCount>0){
      toast({title: 'Atenção !',description: "Esta cidade está sendo utilizada e não poderá ser excluida.",status: 'error',duration: 3000,isClosable: true,})
      return;
    }
    // verifica se a cidade possui contatos
    const contatosRef = collection(database,'Contatos');
    const contatos = query(contatosRef, where("cidadeId", "==", cidade.id));
    const queryContatos = await getDocs(contatos);
    const contatosCount = queryContatos.size;
    if(contatosCount>0){
      toast({title: 'Atenção !',description: "Esta cidade está sendo utilizada e não poderá ser excluida.",status: 'error',duration: 3000,isClosable: true,})
      return;
    }
    
      const docRef = doc(database,'Cidades',cidade.id);
      deleteDoc(docRef);
    
 
}

const onSalvar = async () => {

  if(cidade.nome.trim().length===0){
    toast({title: 'Atenção !',description: "Preencha todos os campos por favor.",status: 'error',duration: 3000,isClosable: true,})
    return;
  }
  if (!editando){ // adiciona categoria
    await addDoc(collection(database,'Cidades'),{nome: cidade.nome});
  } else {
    const docRef = doc(database,'Cidades',cidade.id);
    updateDoc(docRef,{nome: cidade.nome});
}
  onClose();
  
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
       <ModalCidade editando={editando} cidade={cidade} setCidade={setCidade} isOpen={isOpen} onClose={onClose} onSalvar={onSalvar}/>
       <ModalConfirm isOpen={isOpenModalConfirm} onClose={onCloseModalConfirm} message={'Deseja realmente excluir esta cidade ?'} onConfirm={onDeleteAction}/>
    </Flex>
  )



}

export default Cidades