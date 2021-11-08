export const fetchApi = (setState, apiSearch) => {
    const API = "https://opendata.paris.fr/api/v2/catalog/datasets/que-faire-a-paris-"
    fetch(`${API}/${apiSearch}`)
        .then(data => data.json())
        .then(data => {
            console.log(data)
            setState({...data});
        })
}
export const formatDate = (date)=>{
    const time = new Date(date);
    let year    = time.getFullYear();
    let month   = ('0' + time.getMonth()).slice(-2);
    let day   = ('0' + time.getDay()).slice(-2);
    return `${day}.${month}.${year}`
}