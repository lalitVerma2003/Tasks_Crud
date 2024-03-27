import React, { useEffect, useState } from 'react'
import { Box, Button, HStack, Input, Text, VStack, Select, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import TaskCard from './TaskCard';
import { useDisclosure } from '@chakra-ui/react';
import { dummyTasks } from './data.js';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

const Hero = () => {

    // You can use dummy tasks like this to check functionality and if you use below useState please comment down 2 below task useState to avoid duplicacy 
    const [tasks, setTasks] = useState(dummyTasks);
    // const [tasks, setTasks] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [title, setTitle] = useState("");
    const [filterTasks, setFilterTasks] = useState(tasks);
    const [description, setDescription] = useState("");
    const [team, setTeam] = useState("");
    const [assignees, setAssignees] = useState("");
    const [priority, setPriority] = useState("");
    const toast=useToast();

    const getDate = () => {
        const date = new Date();
        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate()}`;
    }

    const handleCreateTask = () => {
        if(!title || !description || !team || !priority || !assignees)
        {
            toast({
                title: 'Incomplete data',
                description: "Please fill all the above fields.",
                status: 'error',
                duration: 4000,
                isClosable: true,
              })
            return;
        }
        setTasks([...tasks, { title: title, description: description, team: team, assignees: assignees, priority: priority, status: "Pending", createdAt: getDate() }]);
        console.log("Original", tasks, "Filter", filterTasks);
        onClose();
    }

    useEffect(() => {
        setFilterTasks(tasks);
    }, [tasks]);

    const handleAssigneeFilter = (name) => {
        const newTasks = filterTasks.filter((tk) => {
            if (tk.assignees.includes(name))
                return tk;
        })
        console.log(newTasks);
        setFilterTasks(newTasks);
    }

    const handleFilterPriority = (priority) => {
        const newTasks = filterTasks.filter((tk) => {
            if (tk.priority.includes(priority))
                return tk;
        })
        console.log(newTasks);
        setFilterTasks(newTasks);
    }

    const handleFilterDate = (date) => {
        const newTasks = filterTasks.filter((tk) => {
            if (tk.createdAt.includes(date))
                return tk;
        })
        console.log(newTasks);
        setFilterTasks(newTasks);
    }

    const handleReset = () => {
        setFilterTasks(tasks);
    }

    return (
        <Box minH={"100vh"} >
            <HStack
                justifyContent={"space-between"}
                p={5}
            >
                <Text fontSize={"2rem"} fontWeight={"bold"} mx={5} >Task Board</Text>
            </HStack>
            <Box
                w={"95%"}
                p={5}
                margin={"auto"}
                border={"2px solid white"}
                borderRadius={10}
            >
                <Box
                    w={"100%"}
                    display={"flex"}
                    flexDir={{base:"column",md:"row"}}
                    alignItems={"center"}
                >
                    <VStack
                        w={{ md: "70%", lg: "80%" }}
                        alignItems={"flex-start"}
                    >
                        <HStack
                            w={"100%"}
                            p={4}
                            justifyContent={"space-evenly"}
                            spacing={5}
                            flexWrap={"wrap"}
                        >
                            <Text fontSize={{base:"1.5rem",sm:"1.5rem",md:"2rem"}} w={{ md: "40%", lg: "20%" }} >Filter By:</Text>
                            <Input w={{ md: "40%", lg: "20%" }} placeholder='Assignee name' border={"2px solid rgba(0, 0, 0, 0.16)"} onChange={(e) => handleAssigneeFilter(e.target.value)} />
                            <Select w={{ md: "40%", lg: "20%" }} placeholder='Priority' border={"2px solid rgba(0, 0, 0, 0.16)"} onChange={(e) => handleFilterPriority(e.target.value)} >
                                <option value='P1'>P1</option>
                                <option value='P2'>P2</option>
                                <option value='P3'>P3</option>
                            </Select>
                            <Input
                                w={{ md: "30%", lg: "20%" }}
                                placeholder="Select Date and Time"
                                size="md"
                                type="date"
                                border={"2px solid rgba(0, 0, 0, 0.16)"}
                                onChange={(e) => handleFilterDate(e.target.value)}
                            />
                        </HStack>
                        <HStack
                            w={{ base: "100%", sm: "100%", md: "100%", lg: "80%" }}
                            p={4}
                            justifyContent={"space-between"}
                        >
                            <Text fontSize={{base:"1.5rem",sm:"1.5rem",md:"2rem"}} w={"50%"} >Sort By:</Text>
                            <Select placeholder='Priority' border={"2px solid rgba(0, 0, 0, 0.16)"} >
                                <option value='P1'>P1</option>
                                <option value='P2'>P2</option>
                                <option value='P3'>P3</option>
                            </Select>
                        </HStack>
                    </VStack>
                    <VStack
                        w={{base:"70%",sm:"50%", md: "30%", lg: "20%" }}
                        p={{ base: 1, sm: 2, md: 4, lg: 5 }}
                        justifyContent={"center"}
                    >
                        <Button w={"80%"} m={2} colorScheme='blue' onClick={onOpen} >Add new task</Button>
                        <Button w={"80%"} m={2} colorScheme='blue' onClick={handleReset} >Reset</Button>
                        <>
                            <Modal isOpen={isOpen} onClose={onClose}>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader>Create a Task</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <FormControl>
                                            <FormLabel>Title</FormLabel>
                                            <Input placeholder='enter title' onChange={(e) => setTitle(e.target.value)} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Description</FormLabel>
                                            <Input placeholder='enter description' onChange={(e) => setDescription(e.target.value)} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Team</FormLabel>
                                            <Input placeholder='enter team' onChange={(e) => setTeam(e.target.value)} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Assignees</FormLabel>
                                            <Input placeholder='enter assignees' onChange={(e) => setAssignees(e.target.value)} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Select priority</FormLabel>
                                            <Select placeholder='Priority' onChange={(e) => setPriority(e.target.value)}>
                                                <option value='P1'>P1</option>
                                                <option value='P2'>P2</option>
                                                <option value='P3'>P3</option>
                                            </Select>
                                        </FormControl>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button colorScheme='blue' mr={3} margin={"auto"} onClick={handleCreateTask}>
                                            Save
                                        </Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Modal>
                        </>
                    </VStack>
                </Box>
                <HStack
                    w={"100%"}
                    py={4}
                    flexWrap={"wrap"}
                    spacing={4}
                    justifyContent={"space-evenly"}
                >
                    <TaskCard taskType={"Pending"} tasks={filterTasks} setTasks={setTasks} />
                    <TaskCard taskType={"InProgress"} tasks={filterTasks} setTasks={setTasks} />
                    <TaskCard taskType={"Completed"} tasks={filterTasks} setTasks={setTasks} />
                    <TaskCard taskType={"Deployed"} tasks={filterTasks} setTasks={setTasks} />
                    <TaskCard taskType={"Delivered"} tasks={filterTasks} setTasks={setTasks} />
                </HStack>
            </Box>
        </Box>
    )
}

export default Hero
