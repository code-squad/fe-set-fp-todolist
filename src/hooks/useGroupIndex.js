import {useState} from "react";

const useGroupIndex = (companyList) => {
    const offset = 18;
    const lastIndex = parseInt(companyList.length / offset);
    const [groupIndex, setGroupIndex] = useState(0);

    const changeListGroupIndex = (nextIndex) => {
        if (0 <= nextIndex && nextIndex <= lastIndex) {
            setGroupIndex(nextIndex);
        }
    }

    return { groupIndex, changeListGroupIndex, offset };
}

export default useGroupIndex;