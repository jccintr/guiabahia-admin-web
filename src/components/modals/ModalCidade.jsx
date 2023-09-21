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

const ModalCidade = ({isOpen,onClose,editando,onSalvar,cidade,setCidade}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editando?'Editando':'Nova'} Cidade</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
             
                <FormControl style={{marginBottom:10}} isRequired>
                    <FormLabel>
                      Nome:
                    </FormLabel>
                    <Input 
                        value={cidade.nome}
                        onChange={e => setCidade({...cidade,nome: e.target.value})}
                        placeholder='Nome da cidade...'
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

export default ModalCidade