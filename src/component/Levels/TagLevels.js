import "../Search/ResultSearch.css";

export default function TagLevels({ levelScore }) {

    function checkLevel() {
        if (6.5 <= levelScore || levelScore <= 0.4) {
            return 'No level'
        } else if (0.5 <= levelScore && levelScore <= 1.49) {
            return 'Very difficult'
        } else if (1.5 <= levelScore && levelScore <= 2.49) {
            return 'Difficult'
        } else if (2.5 <= levelScore && levelScore <= 3.49) {
            return 'Slightly difficult'
        } else if (3.5 <= levelScore && levelScore <= 4.49) {
            return 'So so'
        } else if (4.5 <= levelScore && levelScore <= 5.49) {
            return 'Easy'
        }
        return 'Very easy'
    }
    
    return (
            <p id={checkLevel().replaceAll(" ", "-").toLowerCase()}>
                {checkLevel()}
            </p>
    );
}
