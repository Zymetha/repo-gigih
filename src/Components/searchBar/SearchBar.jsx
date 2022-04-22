import './SearchBar.css';

function SearchBar({handleInput, handleSearch}){
    return (
        <>
        <form className="searchbar" onSubmit={handleSearch}>
            <input type="text" onChange={handleInput}/>
            <input type="submit"/>
        </form>
        </>
    );
}

export default SearchBar;       