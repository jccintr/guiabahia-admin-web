import React, { useEffect,useState,useContext } from 'react';
import { Flex,Box,useColorModeValue,Heading,Button,useDisclosure,InputGroup,InputLeftElement,useToast,Input } from '@chakra-ui/react';
import {database} from '../../firebaseConfig';
import { addDoc,collection,onSnapshot, query,doc,updateDoc,where,getDocs,deleteDoc } from 'firebase/firestore';
import DataTable from 'react-data-table-component';
import ModalConfirm from '../../components/modals/ModalConfirm';
import ModalDistrito from '../../components/modals/ModalDistrito';
import { FaSearch } from 'react-icons/fa';
import DataContext from '../../context/DataContext';

const paginationComponentOptions = {
  rowsPerPageText: 'Registros por Página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};


const Distritos = () => {
  const {cidade} = useContext(DataContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenModalConfirm , onOpen: onOpenModalConfirm, onClose: onCloseModalConfirm } = useDisclosure()
  const toast = useToast();
  const [distritos,setDistritos] = useState([]);
  const [searchText,setSearchText] = useState('');
  const [editando,setEditando] = useState(false);
  const [distrito,setDistrito] = useState({nome:'',cidadeId: cidade.id});


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
                   
                   </>,
    },
    
];


useEffect(()=>{
  const collectionRef = collection(database,'Distritos');
  const q = query(collectionRef, where("cidadeId", "==", cidade.id));
  const unsuscribe = onSnapshot(q,querySnapshot => {
    setDistritos(querySnapshot.docs.map(doc => ( {id: doc.id, nome: doc.data().nome} )))
  })
  
  return unsuscribe;

}, []);

const distritosFiltrado = distritos.filter(
  distrito => distrito.nome && distrito.nome.toLowerCase().includes(searchText.toLowerCase()),
);

const onAdd = () => {
  setDistrito({nome:'',cidadeId: cidade.id});
  setEditando(false); 
  onOpen();

 }

 const onEdit = (distrito) => {
  setDistrito(distrito);
  setEditando(true); 
  onOpen();
}

const onDelete = (distrito) => {
  setDistrito(distrito);
  onOpenModalConfirm();
}

const onDeleteAction = async () => {
   
   onCloseModalConfirm();
   // verifica se o distrito possui cadsatros
   const contatosRef = collection(database,'Contatos');
   console.log(distrito);
   const q = query(contatosRef, where("distritoId", "==", distrito.id));
   const querySnapshot = await getDocs(q);
   const contatosCount = querySnapshot.size;
   //alert(contatosCount);
   if(contatosCount===0){
    //alert('entrou para deletar');
     const docRef = doc(database,'Distritos',distrito.id);
     deleteDoc(docRef);
     
   } else {
        toast({title: 'Atenção !',description: "Esta distrito está sendo utilizado e não poderá ser excluido.",status: 'error',duration: 3000,isClosable: true,})
  
  
   }
  
}


const onSalvar = async () => {

  if(distrito.nome.trim().length===0){
    toast({title: 'Atenção !',description: "Preencha todos os campos por favor.",status: 'error',duration: 3000,isClosable: true,})
    return;
  }
  if (!editando){ // adiciona distrito
     await addDoc(collection(database,'Distritos'),{nome: distrito.nome,cidadeId: cidade.id});
  } else {
    const docRef = doc(database,'Distritos',distrito.id);
    updateDoc(docRef,{nome: distrito.nome});
}
  onClose();
  
}




return (
  <Flex w='full' marginLeft={60} minH={'100vh'} height='100vh' direction='column' align={'center'} justify={'flex-start'} bg={['white','gray.100']} p='8'>
     <Heading color='green.400' mb='4' fontSize={['1xl','2xl']}>Distritos em {cidade.nome}</Heading>
     
     <Box w={{ base: '350px', md: '500px', lg: '1200px' }} rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={['none','lg']} p={[0,8]}>
        <Button onClick={onAdd} bg={'green.400'} color={'white'} _hover={{bg: 'green.500',}} size='sm'>ADICIONAR DISTRITO</Button>
        <InputGroup mt="2" mb="2">
          <InputLeftElement pointerEvents='none'>
            <FaSearch color='gray.300' />
          </InputLeftElement>
          <Input
            placeholder='Pesquisar nos distritos'
            onChange={e => setSearchText(e.target.value)}
             />
        </InputGroup>
        <DataTable
              columns={columns}
              data={distritosFiltrado}
              highlightOnHover
              noDataComponent="Registros não encontrados."
              pagination
              paginationComponentOptions={paginationComponentOptions}
              customStyles={customStyles}
          />
     </Box>
     <ModalDistrito editando={editando} distrito={distrito} setDistrito={setDistrito} isOpen={isOpen} onClose={onClose} onSalvar={onSalvar}/>
     <ModalConfirm isOpen={isOpenModalConfirm} onClose={onCloseModalConfirm} message={'Deseja realmente excluir este distrito ?'} onConfirm={onDeleteAction}/>
  </Flex>
)

}

export default Distritos