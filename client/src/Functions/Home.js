import axios from "axios";

export const getTypeList = (lists, setGenre, type, genre) => {
    if (genre === "Genre") setGenre(null)
    if (type && genre) return lists.filter(list => list.type === type && list.genre.includes(genre))
    if (type) return lists.filter(list => list.type === type);
    return lists
}
export const getrandomMovie = async (type, setContent) => {
    try {
        const res = await axios.get(`https://netflixbackend-mhrz.onrender.com/api/movie/random?type=${type}`)
        setContent(res.data[0])
    } catch (error) {
        console.log(error);
    }
}

export const handleClickFunction = (dir,setIsMoved,listRef,slideNumber,setSlideNumber) => {
    setIsMoved(true)
    let distance = listRef.current.getBoundingClientRect().x - 50 

    if(dir === 'left' && slideNumber > 0){
        setSlideNumber(slideNumber-1)
        listRef.current.style.transform = `translateX(${230 + distance}px)`
    }
    if(dir === 'right' && slideNumber < 10 - window.innerWidth/230){
        setSlideNumber(slideNumber + 1)
        listRef.current.style.transform = `translateX(${-230 + distance}px)`
    }
}