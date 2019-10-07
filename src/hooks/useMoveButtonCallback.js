const useMoveButtonCallback = (companyList, selectedCompany) => {

    const currentIndex = selectedCompany.index;
    const lastIndex = selectedCompany.length -1;
  
    const nextCompany = () => {
      return currentIndex !== lastIndex ? companyList[currentIndex + 1] : selectedCompany;
    }
    
    const prevCompany = () => {
      return currentIndex === 0 ? selectedCompany : companyList[currentIndex - 1];
    }
  
    return [nextCompany, prevCompany];
}

export default useMoveButtonCallback;
