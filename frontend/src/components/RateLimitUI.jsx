import React from 'react'
import {ZapIcon} from "lucide-react"

function RateLimitUI() {
    return (
        <div className='max-w-6xl mx-auto px-4 py-8'>
            <div className='bg-primary/10 border border-primary/10 rounded-lg shadow-md'>
                <div className='flex flex-col md:flex-row items-center p-g'>
                    <div className='flex-shrink-0 bg-primary/20 p-4 rounded-full mb-4 md:mb-0 md:mr-6'>
                        <ZapIcon/>
                    </div>
                    <div className='flex-1 text-center md:text-left'>
                        <h3 className='text-xl font-bold mb-2'>Rate Limit Reached</h3>
                        <p className='text-base-content mb-1'> You have made too many request in a short time. Please wait a momemt</p>
                        <p className='text-sm text-base-content/70 '>Try again in few seconds for the bext experience</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RateLimitUI
