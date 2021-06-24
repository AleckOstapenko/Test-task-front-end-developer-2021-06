export default class Service {
    _apiBase = "https://frontend-test-assignment-api.abz.agency/api/v1";
    //Common GET fetch
    getResource = async (url) => {
        const res = await fetch(`${this._apiBase}${url}`);
        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }
        return await res.json();
    }
    //Getting users
    getUsers = async (page=1, count=9) => {
        const res = await this.getResource(`/users?page=${page}&count=${count}`);
        return this._extractUsers(res);
    }
    //Getting positions
    getPositions = async () => {
        const res = await this.getResource(`/positions`);
        return this._extracPositions(res);
    }    
    //Extracting page, next page and users from json
    _extractUsers (users) {
        if (users.success) {
            return {
                nextPage : users.links.next_url,
                page: users.page,
                usersList : users.users
            }
        } else {
            return null;
        } 
    }
    //Extracting positions from json
    _extracPositions (positions) {
        if (positions.success) {
            return {
                positionList: positions.positions
            }
        } else {
            return null;
        } 
    }
    
    //Commmon POST fetch
    sendResource = async (form) => {
        const res= await this.getResource(`/token`);
        let token="";
        if (res.success) {
            token=res.token;
        } else {
            return false;
        }
        
        const response = await fetch(`${this._apiBase}/users`, {
            method: 'POST',
            headers: {
                'Token': token
            },
            body: form
        });
        
        if (!response.ok) {
            // eslint-disable-next-line eqeqeq
            if (response.status == "409") {
                return {status: 409};
            } else {
                throw new Error(`Could not fetch POST, status: ${response.status}`);
            }
        }
        
        return {status: 200};       
    }
}