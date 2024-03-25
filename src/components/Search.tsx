import { Input, InputGroup, InputLeftElement, Image } from "@chakra-ui/react";
import search from "../assets/search.svg"
import { useSearch } from "../store";
import { useState } from "react";


const Search = () => {
    const setSearch = useSearch((state) => state.setSearch)

    const [input, setInput] = useState("")

    const handleInputChange = (e: any) => {
        const inputValue = e.target.value
        setInput(inputValue)
        setSearch(inputValue)
    }

    return (
        <InputGroup bg="#F9F9F9" size={"lg"} borderRadius={"lg"} >
            <InputLeftElement>
                <Image src={search} />
            </InputLeftElement>
            <Input placeholder="Search"
                value={input}
                onChange={handleInputChange} />
        </InputGroup>
    );
}

export default Search;