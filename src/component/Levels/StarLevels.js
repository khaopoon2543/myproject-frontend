import "../Search/ResultSearch.css";
import { TbStarFilled, TbStarHalfFilled, TbStar } from "react-icons/tb";

export function StarLevels(levelScore) {

        if (levelScore=='very-difficult') {
            return  <>  <TbStarFilled/>
                        <TbStarFilled/>
                        <TbStarFilled/>
                    </>
        } else if (levelScore=='difficult') {
            return  <>  <TbStarFilled/>
                        <TbStarFilled/>
                        <TbStarHalfFilled/>
                    </>
        } else if (levelScore=='slightly-difficult') {
            return  <>  <TbStarFilled/>
                        <TbStarFilled/>
                        <TbStar/>
                    </>
        } else if (levelScore=='so-so') {
            return  <>  <TbStarFilled/>
                        <TbStarHalfFilled/>
                        <TbStar/>
                    </>
        } else if (levelScore=='easy') {
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
