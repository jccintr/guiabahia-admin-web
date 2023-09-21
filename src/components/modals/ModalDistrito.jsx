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
    
  } from '@chakra-ui/react'

const ModalDistrito = ({isOpen,onClose,editando,onSalvar,distrito,setDistrito}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editando?'Editando':'Novo'} Distrito</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
             
                <FormControl style={{marginBottom:10}} isRequired>
                    <FormLabel>
                      Nome:
                    </FormLabel>
                    <Input 
                        value={distrito.nome}
                        onChange={e => setDistrito({...distrito,nome: e.target.value})}
                        placeholder='Nome do distrito...'
                     />
                </FormControl>
                
             
          </ModalBody>
          <ModalFooter>
            <Button  onClick={onSalvar} loadingText="Salvando"  colorScheme='green' mr={3}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default ModalDistrito