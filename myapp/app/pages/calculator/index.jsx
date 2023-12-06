import React from 'react'
import {
    Box,
    Button,
    Container,
    Heading,
    NumberDecrementStepper,
    NumberIncrementStepper,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    Select
} from '@chakra-ui/react'
import {useState} from 'react'
import {useEffect} from 'react'

const Calculator = () => {
    const [result, setResult] = useState(null)
    const [inputFirst, setInputFirst] = useState(0)
    const [inputSecond, setInputSecond] = useState(0)
    const [operation, setOperation] = useState('+')

    // chaging the value of the first input
    const handleChangeInputFirst = (event) => {
        const value = Number(event)
        // checking if the user introduced a number
        if (!isNaN(value)) {
            setInputFirst(value)
        }
    }

    // chaging the value of the second input
    const handleChangeInputSecond = (event) => {
        const value = Number(event)
        // checking if the user introduced a number
        if (!isNaN(value)) {
            setInputSecond(value)
        }
    }

    // chaging the math operation
    const handleChangeOperations = (event) => {
        setOperation(event.target.value)
    }

    const clearCalculator = () => {
        setInputFirst(0)
        setInputSecond(0)
        setOperation('+')
    }

    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => a / b
    }

    // defining function to calculate based on the input
    const calculateResult = (firstNum, secondNum, operator) => {
        const operation = operators[operator]
        // checking to see if the operator is valid
        if (operation) {
            return operation(firstNum, secondNum)
        } else {
            // error for user
            throw new Error('Invalid operator')
        }
    }

    // Using effect to calculate the result based on the input and the operation
    // This will run every time the input or the operation changes
    useEffect(() => {
        const newResult = calculateResult(inputFirst, inputSecond, operation)
        setResult(newResult)
    }, [inputFirst, inputSecond, operation])

    return (
        <>
            <Container>
                <Box display="flex" flexDirection="column" alignItems="center">
                    <Box className="heading" mt={5}>
                        <Heading as="h1">Calculator</Heading>
                    </Box>
                    <Box className="calculator" display="flex" mt={5}>
                        <Box className="input-first" mr={3}>
                            <NumberInput
                                defaultValue={0}
                                value={inputFirst}
                                onChange={handleChangeInputFirst}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Box>
                        <Box className="input-second" mr={3}>
                            <NumberInput
                                defaultValue={0}
                                value={inputSecond}
                                onChange={handleChangeInputSecond}
                            >
                                <NumberInputField />
                                <NumberInputStepper>
                                    <NumberIncrementStepper />
                                    <NumberDecrementStepper />
                                </NumberInputStepper>
                            </NumberInput>
                        </Box>
                        <Box className="operations" mr={3}>
                            <Select
                                defaultValue={'+'}
                                onChange={handleChangeOperations}
                                value={operation}
                            >
                                <option value="+">+</option>
                                <option value="-">-</option>
                                <option value="*">*</option>
                                <option value="/">/</option>
                            </Select>
                        </Box>
                        <Box className="clear-btn">
                            <Button onClick={clearCalculator}>Clear</Button>
                        </Box>
                    </Box>
                    <Box className="result">
                        <Heading as="h3">{result}</Heading>
                    </Box>
                </Box>
            </Container>
        </>
    )
}

export default Calculator
