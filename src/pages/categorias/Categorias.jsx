import React, { useEffect,useState } from 'react';
import { Flex,Box,useColorModeValue,Heading,Button,useDisclosure,InputGroup,InputLeftElement,useToast,Input } from '@chakra-ui/react';
import {database} from '../../firebaseConfig';
import { addDoc,collection,onSnapshot, orderBy, query,doc,updateDoc,where,getDocs,deleteDoc } from 'firebase/firestore';
import DataTable from 'react-data-table-component';
import ModalCategoria from '../../components/modals/ModalCategoria';
import ModalConfirm from '../../components/modals/ModalConfirm';
import { FaSearch } from 'react-icons/fa';

const paginationComponentOptions = {
  rowsPerPageText: 'Registros por Página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};


const Categorias = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenModalConfirm , onOpen: onOpenModalConfirm, onClose: onCloseModalConfirm } = useDisclosure()
  const [categorias,setCategorias] = useState([]);
  const [searchText,setSearchText] = useState('');
  const [categoria,setCategoria] = useState({nome:'',ordem:0});
  const [editando,setEditando] = useState(false);

  const categoriasFiltrado = categorias.filter(
		categoria => categoria.nome && categoria.nome.toLowerCase().includes(searchText.toLowerCase()),
	);

  const onAdd = () => {
   setCategoria({nome:'',ordem:0});
   setEditando(false); 
   onOpen();

  }

  const onEdit = (categoria) => {
    setCategoria(categoria);
    setEditando(true); 
    onOpen();
  }

  const onSalvar = async () => {

      if(categoria.nome.trim().length===0){
        toast({title: 'Atenção !',description: "Preencha todos os campos por favor.",status: 'error',duration: 3000,isClosable: true,})
        return;
      }
      if (!editando){ // adiciona categoria
        await addDoc(collection(database,'Categorias'),{nome: categoria.nome,ordem: categoria.ordem});
      } else {
        const docRef = doc(database,'Categorias',categoria.id);
        updateDoc(docRef,{nome: categoria.nome,ordem: categoria.ordem});
    }
      onClose();
      
  }

  const onDelete = (categoria) => {
    setCategoria(categoria);
    onOpenModalConfirm();
  }

  const onDeleteAction = async () => {
    //setCategoria(categoria);
    onCloseModalConfirm();
    const collectionRef = collection(database,'Contatos');
    const q = query(collectionRef, where("categoriaId", "==", categoria.id));
    const querySnapshot = await getDocs(q);
    if(querySnapshot.size===0){
      const docRef = doc(database,'Categorias',categoria.id);
      deleteDoc(docRef);
      
    } else {
      toast({title: 'Atenção !',description: "Esta categoria está sendo utilizada e não poderá ser excluida.",status: 'error',duration: 3000,isClosable: true,})
    }
 
}

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
      name: 'Ordem',
      selector: row => row.ordem,
      hide: 'md',
    },
  /*
    {
        name: 'id',
        selector: row => row.id,
        hide: 'sm',
    },*/
    {
      name: '',
      cell: row => <><Button m="2" onClick={()=>onEdit(row)} bg={'green.400'} color={'white'} _hover={{bg: 'green.500',}} size='xs'>EDITAR</Button><Button onClick={()=>onDelete(row)} bg={'red.400'} color={'white'} _hover={{bg: 'red.500',}} size='xs'>EXCLUIR</Button></>,
    },
    
   
    
];

  useEffect(()=>{
    const collectionRef = collection(database,'Categorias');
    const q = query(collectionRef, orderBy('nome','asc'));
    const unsuscribe = onSnapshot(q,querySnapshot => {
        setCategorias(querySnapshot.docs.map(doc => ( {id: doc.id, nome: doc.data().nome,ordem: doc.data().ordem})));
    })
    //setCategoriasFiltrado(categorias);
    return unsuscribe;

}, []);


  return (
    <Flex w='full' marginLeft={60} minH={'100vh'} height='100vh' direction='column' align={'center'} justify={'flex-start'} bg={['white','gray.100']} p='8'>
       <Heading color='green.400' mb='4' fontSize={['1xl','2xl']}>Categorias</Heading>
       
       <Box w={{ base: '350px', md: '500px', lg: '1200px' }} rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={['none','lg']} p={[0,8]}>
          <Button onClick={onAdd} bg={'green.400'} color={'white'} _hover={{bg: 'green.500',}} size='sm'>ADICIONAR CATEGORIA</Button>
          <InputGroup mt="2" mb="2">
            <InputLeftElement pointerEvents='none'>
              <FaSearch color='gray.300' />
            </InputLeftElement>
            <Input
              placeholder='Pesquisar nas categorias'
              onChange={e => setSearchText(e.target.value)}
               />
          </InputGroup>
          <DataTable
                columns={columns}
                data={categoriasFiltrado}
                highlightOnHover
                noDataComponent="Registros não encontrados."
                pagination
                paginationComponentOptions={paginationComponentOptions}
                customStyles={customStyles}
            />
       </Box>
       <ModalCategoria editando={editando} categoria={categoria} setCategoria={setCategoria} isOpen={isOpen} onClose={onClose} onSalvar={onSalvar}/>
       <ModalConfirm isOpen={isOpenModalConfirm} onClose={onCloseModalConfirm} message={'Deseja realmente excluir esta categoria ?'} onConfirm={onDeleteAction}/>
    </Flex>
  )
}

export default Categorias