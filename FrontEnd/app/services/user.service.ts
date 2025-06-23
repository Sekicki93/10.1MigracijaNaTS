import { User } from "../models/user.model.js";
import { UserFormData } from "../models/userFormData.model.js";


export class UserService {
    private apiUrl: string;

    constructor() {
        this.apiUrl = 'http://localhost:14117/api/korisnik';
    }

    getAll(): Promise<User[]> {
            return fetch(this.apiUrl)
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(errorMessage => {
                            throw { status: response.status, message: errorMessage }
                        })
                    }
                    return response.json()
                })
                .then((response: User[]) => {
                    return response;
                })
                .catch(error => {
                    console.error('Error:', error.status)
                    throw error
                });
        }

    getById(id: string): Promise<User> {
            return fetch(`${this.apiUrl}/${id}`)
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(errorMessage => {
                            throw { status: response.status, message: errorMessage }
                        })
                    }
                    return response.json();
                }).then((user: User) => {
                    return user;
                }).catch(error => {
                    console.error('Error:', error.status)
                    throw error
                });
        }

    addNew(formData: UserFormData): Promise<User> {
            return fetch(this.apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(errorMessage => {
                            throw { status: response.status, message: errorMessage }
                        })
                    }
                    return response.json()
                })
                .then((user: User) => {
                    return user;
                })
                .catch(error => {
                    console.error('Error:', error.status)
                    throw error
                });
        }

    update(id: string, formData: UserFormData): Promise<User> {
            return fetch(`${this.apiUrl}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })
                .then(response => {
                    if (!response.ok) {
                        return response.text().then(errorMessage => {
                            throw { status: response.status, message: errorMessage }
                        })
                    }
                    return response.json()
                })
                .then((user: User) => {
                    return user;
                })
                .catch(error => {
                    console.error('Error:', error.status)
                    throw error
                });
        }
    delete(id :string): Promise<User>{
        return fetch(`${this.apiUrl}/${id}`, {method: 'DELETE'})
            .then(response => {
                if (!response.ok) {
                    return response.text().then(errorMessage => {
                        throw { status: response.status, message: errorMessage }
                    })
                }
                const contentLength = response.headers.get('content-length');
                if (response.status === 204 || contentLength === '0') {
                    return; // nothing to return
                }
                return response.json()
                })
            .catch(error => {
                    const status = error.status ?? 'Network';
                    const message = error.message ?? error.toString();
                    console.error(`Error [${status}]: ${message}`);
                    throw { status, message }; // rethrow for UI to catch
            });   
    }
}

