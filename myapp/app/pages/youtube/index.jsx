import React from 'react'
import {AspectRatio, Container} from '@chakra-ui/react'

const Youtube = () => {
    return (
        <Container>
            <h1 style={{textAlign: 'center', fontSize: '4rem'}}>Welcome to my Youtube page!</h1>
            <AspectRatio mt="10" maxW="980px" ratio={4 / 3}>
                <iframe
                    src="https://www.youtube.com/embed/R6g8H13lqpE?si=2mRG01Jfe6XA4lFp"
                    title="Christmas"
                    allowFullScreen
                />
            </AspectRatio>
        </Container>
    )
}
export default Youtube
