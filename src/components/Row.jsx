import React, { useEffect, useState } from 'react'
import axios  from 'axios'
import MovieCard from './MovieCard'
import {MdChevronLeft, MdChevronRight} from 'react-icons/md'


const Row = ({rowID, title, fetchURL}) => {
    const [movies, setMovies] = useState([])
    
    useEffect(() => {
        axios.get(fetchURL).then((response) => {
            setMovies(response.data.results)
        })
    }, [fetchURL])

    const slideLeft = () => {
        const slider = document.getElementById('slider'+rowID)
        slider.scrollLeft = slider.scrollLeft - 500
    }

    const slideRight = () => {
        const slider = document.getElementById('slider'+rowID)
        slider.scrollLeft = slider.scrollLeft + 500
    }
     

    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex items-center group'>
                <MdChevronLeft 
                onClick={slideLeft}
                className='bg-white rounded-full absolute left-1 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
                <div id={'slider'+rowID} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-none relative'>
                    {movies.map((item, index) => (
                        <MovieCard key={item?.id} item={item}/>
                    ))}
                </div>
                <MdChevronRight
                onClick={slideRight} 
                className='bg-white rounded-full absolute right-1 opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block' size={40} />
            </div>
        </>
    )
}

export default Row
