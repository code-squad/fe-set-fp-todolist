const useSelectedCompany = (companyList, setSelected) => {

    const handleClickCompany = ({ target }) => {
        const selectedId = target.dataset.id;
        const clickedCompany = companyList.filter(company => company.id === selectedId).pop();

        setSelected(clickedCompany);
    }

    return handleClickCompany;
}

export default useSelectedCompany;