import "../Search/ResultSearch.css";
import { TbStarFilled, TbStarHalfFilled, TbStar } from "react-icons/tb";

export default function TagLevels({ levelScore, isScreenSize }) {

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
    function checkLevelScreenSize() {
        if (6.5 <= levelScore || levelScore <= 0.4) {
            return '∞'
        } else if (0.5 <= levelScore && levelScore <= 1.49) {
            return '6'
        } else if (1.5 <= levelScore && levelScore <= 2.49) {
            return '5'
        } else if (2.5 <= levelScore && levelScore <= 3.49) {
            return '4'
        } else if (3.5 <= levelScore && levelScore <= 4.49) {
            return '3'
        } else if (4.5 <= levelScore && levelScore <= 5.49) {
            return '2'
        }
        return '1'
    }

    function checkLevelStars() {
        if (6.5 <= levelScore || levelScore <= 0.4) {
            return  <>  <TbStar/>
                        <TbStar/>
                        <TbStar/>
                    </>
        } else if (0.5 <= levelScore && levelScore <= 1.49) {
            return  <>  <TbStarFilled/>
                        <TbStarFilled/>
                        <TbStarFilled/>
                    </>
        } else if (1.5 <= levelScore && levelScore <= 2.49) {
            return  <>  <TbStarFilled/>
                        <TbStarFilled/>
                        <TbStarHalfFilled/>
                    </>
        } else if (2.5 <= levelScore && levelScore <= 3.49) {
            return  <>  <TbStarFilled/>
                        <TbStarFilled/>
                        <TbStar/>
                    </>
        } else if (3.5 <= levelScore && levelScore <= 4.49) {
            return  <>  <TbStarFilled/>
                        <TbStarHalfFilled/>
                        <TbStar/>
                    </>
        } else if (4.5 <= levelScore && levelScore <= 5.49) {
            return  <>  <TbStarFilled/>
                        <TbStar/>
                        <TbStar/>
                    </>
        }
        return  <>  <TbStarHalfFilled/>
                    <TbStar/>
                    <TbStar/>
                </>
    }
    
    return (
            <span id={checkLevel().replaceAll(" ", "-").toLowerCase()}>
                {checkLevelStars()}
            </span>
    );
}
