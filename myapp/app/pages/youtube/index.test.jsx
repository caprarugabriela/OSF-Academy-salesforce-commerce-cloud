import React from 'react'
import {renderWithProviders} from '../../utils/test-utils.js'
import Youtube from './index.jsx'

// chef if the youtube component renders correct video URL

test('Youtube component renders with the correct video URL', () => {
    const {getByTitle} = renderWithProviders(<Youtube />)
    const videoPlayer = getByTitle('Christmas')

    expect(videoPlayer).toBeInTheDocument()
    expect(videoPlayer).toHaveAttribute(
        'src',
        'https://www.youtube.com/embed/R6g8H13lqpE?si=2mRG01Jfe6XA4lFp'
    )
})

// chef if the youtube component renders an iframe element
test('Youtube component renders an iframe element', () => {
    const {container} = renderWithProviders(<Youtube />)
    const iframeElement = container.querySelector('iframe')

    expect(iframeElement).toBeInTheDocument()
})
