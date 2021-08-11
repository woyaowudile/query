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

export default {
    add,
    del,
    update,
    echartQuery,
    query
};
