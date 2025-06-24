import { useState, useEffect } from 'react';

const FadeInSentence = () => {
    const sentence = "Welcome to our amazing website!";
    const words = sentence.split(" ");
    const [visibleWords, setVisibleWords] = useState([]);

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            setVisibleWords((prev) => [...prev, words[index]]);
            index++;
            if (index === words.length) clearInterval(interval);
        }, 500); // 500ms delay between words

        return () => clearInterval(interval);
    }, []);

    return (
        <h1 style={{ display: 'flex', flexWrap: 'wrap' }}>
            {words.map((word, idx) => (
                <span
                    key={idx}
                    style={{
                        opacity: visibleWords.includes(word) ? 1 : 0,
                        transition: 'opacity 0.5s ease',
                        marginRight: '5px',
                    }}
                >
          {word}
        </span>
            ))}
        </h1>
    );
};

export default FadeInSentence;
