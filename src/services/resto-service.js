export default class RestoService {
    _apiBase = 'https://my-json-server.typicode.com/khorek/db/';

    async getResource(url) {
        const res = await fetch(`${this._apiBase}${url}`);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, received ${res.status}`)
        }
        return await res.json()
    }

    async getMenuItems () {
        return await this.getResource(`/menu`);
    }

    async getItem(id) {
        const res = await this.getResource(`/menu/${id}`);
        const item = res.find((el) => {
            return el.id === +id;
        })
        return item
    }

}