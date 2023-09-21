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
    NumberInput,NumberInputField,NumberInputStepper,NumberIncrementStepper,NumberDecrementStepper,
  } from '@chakra-ui/react'

const ModalCategoria = ({isOpen,onClose,editando,onSalvar,categoria,setCategoria}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{editando?'Editando':'Nova'} Categoria</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
             
                <FormControl style={{marginBottom:10}} isRequired>
                    <FormLabel>
                      Nome:
                    </FormLabel>
                    <Input 
                        value={categoria.nome}
                        onChange={e => setCategoria({...categoria,nome: e.target.value})}
                        placeholder='Nome da categoria...'
                     />
                </FormControl>
                <FormControl style={{marginBottom:10}}>
                          <FormLabel>
                            Ordem:
                          </FormLabel>
                          <NumberInput
                            precision={0}
                            defaultValue={categoria.ordem}
                            onChange={(valueString) => setCategoria({...categoria,ordem: (valueString*1)})}
                          >
                            <NumberInputField value={categoria.ordem} placeholder='Ordem...'/>
                            <NumberInputStepper>
                                <NumberIncrementStepper />
                                <NumberDecrementStepper />
                            </NumberInputStepper>
                          </NumberInput>
                  </FormControl>
             
          </ModalBody>
          <ModalFooter>
            <Button  onClick={onSalvar} loadingText="Salvando"  colorScheme='green' mr={3}>Salvar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default ModalCategoria