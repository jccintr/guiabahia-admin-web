'use client'

import React, { useState } from 'react'
import {IconButton, Box,CloseButton,Flex,Icon,useColorModeValue,Text,Drawer,DrawerContent,useDisclosure,BoxProps,FlexProps} from '@chakra-ui/react'
import {FiHome,FiMenu,FiSettings} from 'react-icons/fi'
import { FaCity, FaUserAlt, FaList } from 'react-icons/fa';
import { BiMap } from 'react-icons/bi';
import { IconType } from 'react-icons'
import { ReactText } from 'react'
import { useNavigate, Link } from 'react-router-dom';

const LinkItems = [
  { id: 1, name: 'Home', icon: FiHome, route: '/' },
  { id: 2, name: 'Categorias', icon: FaList, route: '/categorias' },
  { id: 3, name: 'Cidades', icon: FaCity, route: '/cidades' },
  { id: 4, name: 'Distritos', icon: BiMap, route: '/distritos' },
  { id: 5, name: 'Cadastros', icon: FaUserAlt, route: '/cadastros' },
  { id: 5, name: 'Parâmetros', icon: FiSettings, route: '/parametros' },
]


export default function SideBar() {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [selected,setSelected] = useState(1);


  const onMenu = (route) => {
    navigate(route);
  
  }
  
  

  return (
    <Box  minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} onMenu={onMenu}/>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose} returnFocusOnClose={false} onOverlayClick={onClose} size="full">
        <DrawerContent>
          <SidebarContent onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav display={{ base: 'flex', md: 'none' }} onOpen={onOpen} />
      
      

    </Box>
  )
}


const SidebarContent = ({ onMenu,onClose, ...rest }) => {
  return (
    <Box
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        <Text color="green.400" fontSize="lg" fontFamily="monospace" fontWeight="bold">
          Guia Bahia Admin
        </Text>
        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} route={link.route} icon={link.icon} onMenu={onMenu}>
          {link.name}
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ onMenu, route,icon, children, ...rest }) => {
  return (
    <Box onClick={()=>onMenu(route)} style={{ textDecoration: 'none' }} _focus={{ boxShadow: 'none' }}>
    
      <Flex align="center" p="4" mx="4" borderRadius="lg" role="group" cursor="pointer" _hover={{bg: 'green.400', color: 'white', }}{...rest}>
        {icon && (
          <Icon mr="4" fontSize="16" _groupHover={{color: 'white',}} as={icon}/>
        )}
        {children}
      </Flex>
    </Box>
  )
}


const MobileNav = ({ onOpen, ...rest }) => {
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 24 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent="flex-start"
      {...rest}>
      <IconButton
        variant="outline"
        onClick={onOpen}
        aria-label="open menu"
        icon={<FiMenu />}
      />

      <Text fontSize="2xl" ml="8" fontFamily="monospace" fontWeight="bold">
        Guia Bahia Admin
      </Text>
    </Flex>
  )
}
