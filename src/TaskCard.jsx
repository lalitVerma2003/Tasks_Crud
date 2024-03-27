import { VStack, Text } from '@chakra-ui/react'
import React from 'react'
import Task from './Task.jsx';

const TaskCard = ({ taskType, tasks, setTasks }) => {

  // Give color to Title acc to task type
  const color={Pending:"#A0AEC0",InProgress:"#F6E05E",Completed:"#48BB78",Deployed:"#63B3ED",Delivered:"#ED64A6"};

  return (
    <VStack
      w={{base:"90%",sm:"40%",md:"30%",lg:"19%"}}
      borderRadius={10}
      h={"50vh"}
      overflowY={"auto"}
      backgroundColor={"white"}
      sx={{
        '&::-webkit-scrollbar': {
          display: 'none',
        }
      }}
    >
      <Text w={"100%"} backgroundColor={color[taskType]} textAlign={"center"} fontSize={"1.5rem"} position={"sticky"} p={2} top={0} left={0} zIndex={3} color={"white"} >{taskType}</Text>
      {tasks.map((task, id) => {
        if(task.status===taskType)
          return <Task task={task} taskType={taskType} key={id} setTasks={setTasks} />
      })}
    </VStack>
  )
}

export default TaskCard
