import React, { useEffect,useState,useContext } from 'react';
import { Flex,Box,useColorModeValue,Heading,Button,useDisclosure,InputGroup,InputLeftElement,useToast,Input,Text } from '@chakra-ui/react';
import {database} from '../../firebaseConfig';
import { addDoc,collection,onSnapshot, orderBy, query,doc,updateDoc,where,getDocs,deleteDoc } from 'firebase/firestore';
import DataTable from 'react-data-table-component';
import ModalConfirm from '../../components/modals/ModalConfirm';
import ModalCadastro from '../../components/modals/ModalCadastro';
import { FaSearch } from 'react-icons/fa';
import DataContext from '../../context/DataContext';

const paginationComponentOptions = {
  rowsPerPageText: 'Registros por Página',
  rangeSeparatorText: 'de',
  selectAllRowsItem: true,
  selectAllRowsItemText: 'Todos',
};

const Cadastros = () => {
  const {cidade} = useContext(DataContext);
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { isOpen: isOpenModalConfirm , onOpen: onOpenModalConfirm, onClose: onCloseModalConfirm } = useDisclosure()
  const toast = useToast();
  const [categorias,setCategorias] = useState([]);
  const [distritos,setDistritos] = useState([]);
  const [searchText,setSearchText] = useState('');
  const [editando,setEditando] = useState(false);
  const [contatos,setContatos] = useState([]);
  const [contato,setContato] = useState({nome:'',cidadeId: cidade.id});


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
      name: 'Categoria',
      selector: row => GetCategoryName(row.categoriaId),
    },
    {
      name: '',
      cell: row => <><Button m="2" onClick={()=>onEdit(row)} bg={'green.400'} color={'white'} _hover={{bg: 'green.500',}} size='xs'>EDITAR</Button>
                     <Button m="2" onClick={()=>onDelete(row)} bg={'red.400'} color={'white'} _hover={{bg: 'red.500',}} size='xs'>EXCLUIR</Button>
                   
                   </>,
    },
    
];

const contatosFiltrado = contatos.filter(
  contato => contato.nome && contato.nome.toLowerCase().includes(searchText.toLowerCase()),
);

const onAdd = () => {
  
  setContato({nome:'',telefone:'',instagram:'',facebook:'',website:'',cidadeId: cidade.id, categoriaId:0,distritoId:0});
  setEditando(false); 
  onOpen();

 }

 const onEdit = (contato) => {
     
  for(let i=0;i<contatos.length;i++){
     if (contato.id===contatos[i].id){
        setContato(contatos[i]);
     }
  }
  setEditando(true); 
  onOpen();
  
}

const onDelete = (distrito) => {
  /*
  setDistrito(distrito);
  onOpenModalConfirm();
  */
}

const onDeleteAction = async () => {
  /* 
  onCloseModalConfirm();
  // verifica se o distrito possui cadsatros
  const contatosRef = collection(database,'Contatos');
  console.log(distrito);
  const q = query(contatosRef, where("distritoId", "==", distrito.id));
  const querySnapshot = await getDocs(q);
  const contatosCount = querySnapshot.size;
  alert(contatosCount);
  if(contatosCount===0){
   alert('entrou para deletar');
   // const docRef = doc(database,'Distritos',distrito.id);
   // deleteDoc(docRef);
    
  } else {
       toast({title: 'Atenção !',description: "Esta distrito está sendo utilizado e não poderá ser excluido.",status: 'error',duration: 3000,isClosable: true,})
 
 
  }
 */
}


const onSalvar = async () => {

 
  
 if(contato.nome.trim().length===0){
   toast({title: 'Atenção !',description: "Preencha todos os campos por favor.",status: 'error',duration: 3000,isClosable: true,})
   return;
 }
 if (!editando){ // adiciona contato
    await addDoc(collection(database,'Contatos'),{nome: contato.nome,telefone: contato.telefone,instagram: contato.instagram, facebook: contato.facebook,website: contato.webSite, cidadeId: contato.cidadeId,distritoId: contato.distritoId,categoriaId: contato.categoriaId});
 } else {
  const docRef = doc(database,'Contatos',contato.id);
  updateDoc(docRef,{nome: contato.nome,telefone: contato.telefone,instagram: contato.instagram,facebook:contato.facebook,website: 'www',categoriaId: contato.categoriaId,distritoId: contato.distritoId});
  
}

 onClose();
 
}



useEffect(()=>{
  const collectionRef = collection(database,'Contatos');
  const q = query(collectionRef, where("cidadeId", "==", cidade.id));
 

  const unsuscribe = onSnapshot(q,querySnapshot => {
    setContatos(querySnapshot.docs.map(doc => ( {
      id: doc.id,
      nome: doc.data().nome,
      telefone: doc.data().telefone,
      instagram: doc.data().instagram ? doc.data().instagram:'',
      facebook: doc.data().facebook ? doc.data().facebook:'',
      website: doc.data().website ? doc.data().website:'',
      categoriaId: doc.data().categoriaId
    } )))
  })
  
  return unsuscribe;

}, []);


useEffect(()=>{
  const collectionRef = collection(database,'Distritos');
  const q = query(collectionRef, where("cidadeId", "==", cidade.id));
  const unsuscribe = onSnapshot(q,querySnapshot => {
    setDistritos(querySnapshot.docs.map(doc => ( {id: doc.id, nome: doc.data().nome} )))
  })
 
  return unsuscribe;

}, []);



useEffect(()=>{
  const collectionRef = collection(database,'Categorias');
  const q = query(collectionRef, orderBy('nome','asc'));
  const unsuscribe = onSnapshot(q,querySnapshot => {
    setCategorias(querySnapshot.docs.map(doc => ( {id: doc.id, nome: doc.data().nome} )))
  })
  
  return unsuscribe;

}, []);

const GetCategoryName = (categoryId) => {
  let categoryName = '' 
  for (let i=0;i<categorias.length;i++){
    if(categorias[i].id===categoryId){
      categoryName = categorias[i].nome
    }
  }
  return categoryName;
}

return (
  <Flex w='full' marginLeft={60} minH={'100vh'} height='100vh' direction='column' align={'center'} justify={'flex-start'} bg={['white','gray.100']} p='8'>
     <Heading color='green.400' mb='4' fontSize={['1xl','2xl']}>Contatos em {cidade.nome}</Heading>
     
     <Box w={{ base: '350px', md: '500px', lg: '1200px' }} rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={['none','lg']} p={[0,8]}>
        <Button onClick={onAdd} bg={'green.400'} color={'white'} _hover={{bg: 'green.500',}} size='sm'>ADICIONAR CONTATO</Button>
        <InputGroup mt="2" mb="2">
          <InputLeftElement pointerEvents='none'>
            <FaSearch color='gray.300' />
          </InputLeftElement>
          <Input
            placeholder='Pesquisar nos contatos'
            onChange={e => setSearchText(e.target.value)}
             />
        </InputGroup>
        <DataTable
              columns={columns}
              data={contatosFiltrado}
              highlightOnHover
              noDataComponent="Registros não encontrados."
              pagination
              paginationComponentOptions={paginationComponentOptions}
              customStyles={customStyles}
          />
     </Box>
     <ModalCadastro editando={editando} contato={contato} setContato={setContato} isOpen={isOpen} onClose={onClose} onSalvar={onSalvar} categorias={categorias} distritos={distritos}/>
     <ModalConfirm isOpen={isOpenModalConfirm} onClose={onCloseModalConfirm} message={'Deseja realmente excluir este contato ?'} onConfirm={onDeleteAction}/>
  </Flex>
)





}

export default Cadastros