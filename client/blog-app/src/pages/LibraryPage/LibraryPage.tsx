import React, { useEffect, useState } from "react";
import axios from "axios";
import { Image } from "../../components/Image";
import './LibraryPage.css';

export const LibraryPage = () => {
    const [books, setBooks] = useState<Array<{year: string, books: Array<string>}>>([]);

    useEffect(() => {
        const getBooks = async () => {
            const res = await axios.get('http://localhost:4000/library');
            setBooks(res.data.reverse());
        };

        getBooks();
    }, []);

    return (
        <div className="library-page-container">
            <p className="title">Books I've read</p>
            {books.map(el => {
                return (
                    <div className="library-section" key={el.year}>
                        <span className="year">{el.year}</span>
                        <div className="books">
                            {el.books.map(book => {
                                return <Image key={book} path={require(`../../assets/images/books/${el.year}/${book}`)} alt={`${el.year} ${book}`} width={212} height={284} />
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
