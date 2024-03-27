import { Button, VStack, Text, HStack, FormControl, FormLabel, Input, Select } from '@chakra-ui/react'
import React, { useState } from 'react'
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';

const Task = ({ task, setTasks, taskType }) => {

  const [editModal, setEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [editPriority, setEditPriority] = useState(task.priority);
  const [editStatus, setEditStatus] = useState(task.status);

  const handleDelete = () => {
    console.log("Deleted", task);
    setTasks((tasks) => (
      tasks.filter((tk) => (
        tk.title !== task.title
      ))
    ))
    setDeleteModal(false);
  }

  const handleEditTask=()=>{
    task.status=editStatus;
    task.priority=editPriority;
    setTasks((tasks)=>(
      tasks.filter((tk)=>{
          if(tk.title===task.title)
            return task;
          return tk;
      })
    ))
    setEditModal(false);
  }

  return (
    <VStack
      w={"90%"}
      margin={"auto"}
      borderRadius={10}
      p={1}
      backgroundColor={"rgba(0, 0, 0, 0.08)"}
      alignItems={"flex-start"}
      boxSizing='border-box'
    >
      <HStack
        w={"100%"}
        borderBottom={"2px solid rgba(0, 0, 0, 0.36)"}
        justifyContent={"space-between"}
      >
        <Text p={2} fontSize={"1.3rem"} >{task.title}</Text>
        <Text p={2} >{task.priority}</Text>
      </HStack>
      <Text>{task.description}</Text>
      <HStack
        w={"100%"}
        justifyContent={"space-between"}
      >
        <Text>@{task.assignees}</Text>
        <Menu
        >
          <MenuButton as={Button} colorScheme='blue' size={"sm"} >
            :
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setEditModal(true)} >Edit</MenuItem>
            <Modal isOpen={editModal} onClose={() => setEditModal(false)} isCentered >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Edit Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <FormControl>
                    <FormLabel>Title</FormLabel>
                    <Input value={task.title} isReadOnly />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Description</FormLabel>
                    <Input value={task.description} isReadOnly />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Team</FormLabel>
                    <Input value={task.team} isReadOnly />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Assignees</FormLabel>
                    <Input value={task.assignees} isReadOnly />
                  </FormControl>
                  <FormControl>
                    <FormLabel>Priority:</FormLabel>
                    <Select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                      <option value='P1'>P1</option>
                      <option value='P2'>P2</option>
                      <option value='P3'>P3</option>
                    </Select>
                  </FormControl>
                  <FormControl>
                    <FormLabel>Status:</FormLabel>
                    <Select value={editStatus} onChange={(e) => setEditStatus(e.target.value)}>
                      <option value='Pending'>Pending</option>
                      <option value='InProgress'>InProgress</option>
                      <option value='Completed'>Completed</option>
                      <option value='Deployed'>Deployed</option>
                      <option value='Delivered'>Delivered</option>
                    </Select>
                  </FormControl>
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme='blue' mr={3} margin={"auto"} onClick={handleEditTask}>
                    Submit
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
            {taskType!=="Completed"&&<MenuItem onClick={() => setDeleteModal(true)} >Delete</MenuItem>}
            <Modal isOpen={deleteModal} onClose={() => setDeleteModal(false)} isCentered >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Delete Task</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Text fontSize={"1.5rem"} >Do you wish to delete task?</Text>
                  <HStack m={2} >
                    <Text w={"60%"} fontSize={"1.3rem"} >{task.title}</Text>
                    <Button w={"20%"} colorScheme='blue' onClick={() => handleDelete()} >Yes</Button>
                    <Button w={"20%"} colorScheme='blue' onClick={() => setDeleteModal(false)} >No</Button>
                  </HStack>
                </ModalBody>
              </ModalContent>
            </Modal>
          </MenuList>
        </Menu>
      </HStack>
      <Button colorScheme='blue' >Assign</Button>
    </VStack>
  )
}

export default Task
