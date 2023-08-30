import { renderResults } from ".";

async function loadData(ip) {
    let response = await fetch('https://ipapi.co/json/');
    if (ip != null || ip != undefined) {
        response = await fetch(`https://ipapi.co/${ip}/json/`);
    }
    
    const data = await response.json();
    renderResults(data);
}

export { loadData }