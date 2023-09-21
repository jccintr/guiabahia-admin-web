import React from 'react';
import {Input,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Select,
    
  } from '@chakra-ui/react'

const ModalCadastro = ({isOpen,onClose,editando,onSalvar,contato,setContato,categorias,distritos}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editando?'Editando':'Novo'} Contato</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
             
                <FormControl style={{marginBottom:10}} isRequired>
                    <FormLabel>
                      Nome:
                    </FormLabel>
                    <Input 
                        value={contato.nome}
                        onChange={e => setContato({...contato,nome: e.target.value})}
                        placeholder='Nome do contato...'
                     />
                </FormControl>

                <FormControl style={{marginBottom:10}} isRequired>
                    <FormLabel>
                      WhatsApp:
                    </FormLabel>
                    <Input 
                        value={contato.telefone}
                        onChange={e => setContato({...contato,telefone: e.target.value})}
                        placeholder='WhatsApp do contato...'
                     />
                </FormControl>

                <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      Instagram:
                    </FormLabel>
                    <Input 
                        value={contato.instagram}
                        onChange={e => setContato({...contato,instagram: e.target.value})}
                        placeholder='Instagram do contato...'
                     />
                </FormControl>

                <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      Facebook:
                    </FormLabel>
                    <Input 
                        value={contato.facebook}
                        onChange={e => setContato({...contato,facebook: e.target.value})}
                        placeholder='Facebook do contato...'
                     />
                </FormControl>

                <FormControl style={{marginBottom:10}}>
                    <FormLabel>
                      WebSite:
                    </FormLabel>
                    <Input 
                        value={contato.website}
                        onChange={e => setContato({...contato,website: e.target.value})}
                        placeholder='WebSite do contato...'
                     />
                </FormControl>

                <FormControl style={{marginBottom:10}} isRequired>
                    <FormLabel>
                      Categoria:
                    </FormLabel>
                    <Select 
                        placeholder='Selecione uma categoria'
                        value={contato.categoriaId}
                        onChange={e => setContato({...contato, categoriaId: e.target.value})}>
                          {categorias.map((categoria)=> (
                            <option value={categoria.id}>{categoria.nome}</option>
                          ))}
                    </Select>
                </FormControl>

                <FormControl style={{marginBottom:10}} isRequired>
                    <FormLabel>
                      Distrito:
                    </FormLabel>
                    <Select 
                        placeholder='Selecione um distrito'
                        value={contato.distritoId}
                        onChange={e => setContato({...contato, distritoId: e.target.value})}>
                          {distritos.map((distrito)=> (
                            <option value={distrito.id}>{distrito.nome}</option>
                          ))}
                    </Select>
                </FormControl>
                
             
          </ModalBody>
          <ModalFooter>
            <Button  onClick={onSalvar} loadingText="Salvando"  colorScheme='green' mr={3}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default ModalCadastro