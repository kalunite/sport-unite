const getAPIFootball = (URI, filters) => {
    const promise = fetch(`http://api.football-data.org/v2/${URI}/${filters}`, {
        headers: {
            'X-Auth-Token': '62eead0c320c4186a719809160b2fb84'
        }
    }).then(result => result.json());
    return promise;
}

const API = {
    football: {
        get: (URI, filters) => getAPIFootball(URI, filters)
    }
};

export default API;