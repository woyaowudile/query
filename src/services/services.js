let node3333 = `/node3333`;
let node3334 = `/node3334`;

function add(params) {
    return fetch(`/api/trade/add`, {
        method: 'POST',
        body: JSON.stringify(params)
    }).then(res => res.json());
}

function del(id) {
    return fetch(`/api/trade/delete?id=${id}`, {
        method: 'DELETE'
    }).then(res => res.json());
}

function update(params) {
    return fetch(`/api/trade/update`, {
        method: 'PUT',
        body: JSON.stringify(params)
    }).then(res => res.json());
}

function query() {
    return fetch(`/api/trade/query`).then(res => res.json());
}

function echartQuery(params) {
    return fetch(`/api/trade/echart/query`, {
        method: 'POST',
        body: JSON.stringify(params)
    }).then(res => res.json());
}

function beforeDownload({ type, d }) {
    let params = `type=${type}&d=${d / 1}`;
    return fetch(`${node3333}/api/before/download?${params}`).then(res => res.json());
}
function download({ d }) {
    let url = `${node3333}/api/download`;
    if (d) {
        url += `?d=${d}`;
    }
    return fetch(url).then(res => res.json());
}

//
function getquery(params) {
    let str = '';
    Object.keys(params).forEach(v => {
        str += `${v}=${params[v]}&`;
    });
    return fetch(`${node3334}/api/query?${str.slice(0, -1)}`).then(res => res.json());
}

export default {
    add,
    del,
    update,
    echartQuery,
    query,
    beforeDownload,
    getquery,
    download
};
